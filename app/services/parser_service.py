import os
import re
import ast
from typing import Dict, List, Any
from app.utils.logger import logger

SKIP_DIRS = {".git", "node_modules", "dist", "build", "coverage", "__pycache__", ".venv", "venv", ".idea", ".vscode"}

LANGUAGE_EXT_MAP = {
    ".py": "Python",
    ".js": "JavaScript",
    ".jsx": "React (JSX)",
    ".ts": "TypeScript",
    ".tsx": "React (TSX)",
    ".java": "Java",
    ".cpp": "C++",
    ".c": "C",
    ".html": "HTML",
    ".css": "CSS",
    ".go": "Go",
    ".rs": "Rust",
    ".json": "JSON",
    ".md": "Markdown",
    ".sql": "SQL"
}

class ParserService:
    """
    Performs token-free local code analysis using AST, regex, and static file inspection.
    """

    def analyze_directory(self, root_dir: str) -> Dict[str, Any]:
        file_count = 0
        folder_count = 0
        languages: Dict[str, int] = {}
        unused_imports: List[str] = []
        duplicate_imports: List[str] = []
        routes_discovered: List[str] = []
        components_count = 0
        large_files: List[str] = []
        tree = {}

        for root, dirs, files in os.walk(root_dir):
            dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
            folder_count += len(dirs)

            for f in files:
                file_count += 1
                filepath = os.path.join(root, f)
                rel_path = os.path.relpath(filepath, root_dir)
                ext = os.path.splitext(f)[1].lower()

                lang = LANGUAGE_EXT_MAP.get(ext, "Other")
                languages[lang] = languages.get(lang, 0) + 1

                # Python specific AST analysis
                if ext == ".py":
                    py_analysis = self._parse_python_file(filepath, rel_path)
                    unused_imports.extend(py_analysis["unused_imports"])
                    duplicate_imports.extend(py_analysis["duplicate_imports"])
                    routes_discovered.extend(py_analysis["routes"])

                # JS/TS/React analysis
                if ext in [".js", ".jsx", ".ts", ".tsx"]:
                    js_analysis = self._parse_js_file(filepath, rel_path)
                    components_count += js_analysis["components"]
                    routes_discovered.extend(js_analysis["routes"])
                    duplicate_imports.extend(js_analysis["duplicate_imports"])

                # File size check
                try:
                    if os.path.getsize(filepath) > 50000: # ~50KB
                        large_files.append(rel_path)
                except Exception:
                    pass

        tree = self._build_tree(root_dir)

        return {
            "file_count": file_count,
            "folder_count": folder_count,
            "languages": languages,
            "components_count": components_count,
            "routes_count": len(routes_discovered),
            "routes": routes_discovered,
            "unused_imports": list(set(unused_imports)),
            "duplicate_imports": list(set(duplicate_imports)),
            "large_files": large_files,
            "tree_structure": tree
        }

    def _parse_python_file(self, filepath: str, rel_path: str) -> Dict[str, Any]:
        unused = []
        duplicates = []
        routes = []

        try:
            with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                code = f.read()

            tree = ast.parse(code)
            imported_names = {}
            used_names = set()

            for node in ast.walk(tree):
                if isinstance(node, ast.Import):
                    for alias in node.names:
                        name = alias.asname or alias.name
                        if name in imported_names:
                            duplicates.append(f"{rel_path}: {name}")
                        imported_names[name] = alias.name
                elif isinstance(node, ast.ImportFrom):
                    for alias in node.names:
                        name = alias.asname or alias.name
                        if name in imported_names:
                            duplicates.append(f"{rel_path}: {name}")
                        imported_names[name] = f"{node.module}.{alias.name}" if node.module else alias.name
                elif isinstance(node, ast.Name) and isinstance(node.ctx, ast.Load):
                    used_names.add(node.id)

                # FastAPI/Flask Route Detection via decorators
                if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                    for decorator in node.decorator_list:
                        dec_str = ast.unparse(decorator) if hasattr(ast, "unparse") else ""
                        if any(k in dec_str for k in ["get", "post", "put", "delete", "route", "api_route"]):
                            routes.append(f"{rel_path} -> {node.name}() [{dec_str}]")

            for name in imported_names:
                if name not in used_names and not name.startswith("_"):
                    unused.append(f"{rel_path}: {name}")

        except Exception as e:
            logger.debug(f"AST parse error in {rel_path}: {e}")

        return {
            "unused_imports": unused,
            "duplicate_imports": duplicates,
            "routes": routes
        }

    def _parse_js_file(self, filepath: str, rel_path: str) -> Dict[str, Any]:
        components = 0
        routes = []
        duplicates = []
        imported = set()

        try:
            with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()

            # Regex for React component function definitions (e.g. const Header = () => or function Button())
            component_matches = re.findall(r'(?:function\s+([A-Z]\w+)|const\s+([A-Z]\w+)\s*=\s*(?:\([^)]*\)|props)\s*=>)', content)
            components = len(component_matches)

            # Express / React Router routes
            router_matches = re.findall(r'\.(?:get|post|put|delete|use|path)\s*\(\s*[\'"]([^\'"]+)[\'"]', content)
            for r in router_matches:
                routes.append(f"{rel_path} -> {r}")

            # Imports check
            import_statements = re.findall(r'import\s+.*?from\s+[\'"]([^\'"]+)[\ me]', content)
            for imp in import_statements:
                if imp in imported:
                    duplicates.append(f"{rel_path}: {imp}")
                imported.add(imp)

        except Exception as e:
            logger.debug(f"Regex parse error in {rel_path}: {e}")

        return {
            "components": components,
            "routes": routes,
            "duplicate_imports": duplicates
        }

    def _build_tree(self, path: str, max_depth: int = 3) -> Dict[str, Any]:
        name = os.path.basename(path)
        if os.path.isdir(path):
            children = []
            if max_depth > 0:
                try:
                    for item in os.listdir(path):
                        if item in SKIP_DIRS:
                            continue
                        subpath = os.path.join(path, item)
                        children.append(self._build_tree(subpath, max_depth - 1))
                except Exception:
                    pass
            return {"name": name, "type": "directory", "children": children}
        return {"name": name, "type": "file"}

parser_service = ParserService()
