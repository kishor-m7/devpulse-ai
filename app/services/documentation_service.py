from sqlalchemy.orm import Session
from app.models.documentation import Documentation
from app.models.project import Project
from app.services.openai_service import openai_service
from app.services.cache_service import cache_service
from app.services.rag_service import rag_service
from app.schemas.documentation import DocumentationResponse
from app.utils.logger import logger

class DocumentationService:
    def generate_documentation(self, project_id: str, db: Session) -> DocumentationResponse:
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            raise ValueError(f"Project {project_id} not found")

        # Check database cache first
        existing_doc = db.query(Documentation).filter(Documentation.project_id == project_id).first()
        if existing_doc:
            logger.info(f"Returning cached documentation for project {project_id}")
            return DocumentationResponse(
                project_id=project_id,
                readme=existing_doc.readme or "",
                architecture=existing_doc.architecture or "",
                folder_explanation=existing_doc.folder_structure or "",
                installation_guide=existing_doc.installation_guide or "",
                deployment_guide=existing_doc.deployment_guide or "",
                api_docs=existing_doc.api_docs or "",
                is_cached=True
            )

        # Check disk cache
        cache_key = f"doc_{project.hash}"
        cached_data = cache_service.get(cache_key)
        if cached_data:
            doc = Documentation(
                project_id=project_id,
                readme=cached_data["readme"],
                architecture=cached_data["architecture"],
                folder_structure=cached_data["folder_explanation"],
                installation_guide=cached_data["installation_guide"],
                deployment_guide=cached_data["deployment_guide"],
                api_docs=cached_data["api_docs"]
            )
            db.add(doc)
            db.commit()
            return DocumentationResponse(project_id=project_id, is_cached=True, **cached_data)

        # Retrieve key context chunks (top 5) from RAG
        context_chunks = rag_service.retrieve_top_chunks(project_id, "main entry points, setup, API routes, architecture", top_k=5)
        context_str = "\n".join([f"--- {c['file_name']} ---\n{c['content']}" for c in context_chunks])

        prompt = f"""
You are a technical documentation writer.
Based on the code snippets below from project '{project.name}', generate complete documentation.

Code snippets:
{context_str}

Respond in JSON format with keys:
"readme", "architecture", "folder_explanation", "installation_guide", "deployment_guide", "api_docs"
"""

        response_str = openai_service.get_completion(prompt, system_prompt="Respond only in valid JSON format.")
        
        import json
        try:
            doc_json = json.loads(response_str)
        except Exception:
            doc_json = {
                "readme": response_str,
                "architecture": "Architecture generated from repository context.",
                "folder_explanation": f"Project contains {project.file_count} files across {project.folder_count} folders.",
                "installation_guide": "Install dependencies using package manager.",
                "deployment_guide": "Deploy using standard server environment.",
                "api_docs": "API routes documented in code."
            }

        # Cache data
        cache_service.set(cache_key, doc_json)

        # Save in database
        doc = Documentation(
            project_id=project_id,
            readme=doc_json.get("readme", ""),
            architecture=doc_json.get("architecture", ""),
            folder_structure=doc_json.get("folder_explanation", ""),
            installation_guide=doc_json.get("installation_guide", ""),
            deployment_guide=doc_json.get("deployment_guide", ""),
            api_docs=doc_json.get("api_docs", "")
        )
        db.add(doc)
        db.commit()

        return DocumentationResponse(
            project_id=project_id,
            readme=doc.readme,
            architecture=doc.architecture,
            folder_explanation=doc.folder_structure,
            installation_guide=doc.installation_guide,
            deployment_guide=doc.deployment_guide,
            api_docs=doc.api_docs,
            is_cached=False
        )

documentation_service = DocumentationService()
