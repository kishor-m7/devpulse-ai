import os
import json
import uuid
from sqlalchemy.orm import Session
from app.models.project import Project
from app.services.parser_service import parser_service
from app.services.embedding_service import embedding_service
from app.utils.hashing import compute_dir_hash
from app.utils.zip_handler import extract_zip, cleanup_directory
from app.utils.logger import logger

class RepositoryService:
    def process_upload(self, zip_path: str, filename: str, db: Session) -> Project:
        extract_dir = os.path.join("./app/uploads", f"extracted_{uuid.uuid4().hex[:8]}")
        try:
            extract_zip(zip_path, extract_dir)
            repo_hash = compute_dir_hash(extract_dir)

            # Check if project with same hash already exists
            existing = db.query(Project).filter(Project.hash == repo_hash).first()
            if existing:
                logger.info(f"Existing project found for hash {repo_hash}. Returning existing project.")
                cleanup_directory(extract_dir)
                return existing

            # Parse repository locally
            analysis = parser_service.analyze_directory(extract_dir)
            
            project_id = f"proj_{uuid.uuid4().hex[:10]}"
            project = Project(
                id=project_id,
                name=filename.replace(".zip", ""),
                hash=repo_hash,
                file_count=analysis["file_count"],
                folder_count=analysis["folder_count"],
                languages=json.dumps(analysis["languages"])
            )
            db.add(project)
            db.commit()
            db.refresh(project)

            # Embed repository chunks into ChromaDB
            embedding_service.process_and_embed_repository(project_id, extract_dir, repo_hash)

            return project
        finally:
            cleanup_directory(extract_dir)
            if os.path.exists(zip_path):
                os.remove(zip_path)

    def get_project_stats(self, project_id: str, db: Session) -> dict:
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            return None
        
        # Calculate live analysis stats if needed or retrieve cached
        return {
            "project_id": project.id,
            "name": project.name,
            "file_count": project.file_count,
            "folder_count": project.folder_count,
            "languages": json.loads(project.languages) if project.languages else {},
            "hash": project.hash
        }

repository_service = RepositoryService()
