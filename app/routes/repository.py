from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.repository import RepositoryStatsResponse
from app.services.repository_service import repository_service
from app.services.parser_service import parser_service
from app.models.project import Project

router = APIRouter()

@router.get("/repository/{project_id}", response_model=RepositoryStatsResponse)
async def get_repository_stats(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project {project_id} not found."
        )

    import json
    langs = json.loads(project.languages) if project.languages else {}

    return RepositoryStatsResponse(
        project_id=project.id,
        file_count=project.file_count,
        folder_count=project.folder_count,
        languages=langs,
        components_count=0,
        routes_count=0,
        unused_imports=[],
        duplicate_imports=[],
        tree_structure={"name": project.name, "type": "directory"}
    )
