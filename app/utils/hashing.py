import hashlib
import os

IGNORED_DIRS = {".git", "node_modules", "dist", "build", "coverage", "__pycache__", ".venv", "venv", ".idea", ".vscode"}

def compute_file_hash(filepath: str) -> str:
    hasher = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(8192):
            hasher.update(chunk)
    return hasher.hexdigest()

def compute_dir_hash(directory: str) -> str:
    hasher = hashlib.sha256()
    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]
        for names in sorted(files):
            filepath = os.path.join(root, names)
            rel_path = os.path.relpath(filepath, directory)
            hasher.update(rel_path.encode('utf-8'))
            try:
                with open(filepath, 'rb') as f:
                    while chunk := f.read(8192):
                        hasher.update(chunk)
            except Exception:
                pass
    return hasher.hexdigest()
