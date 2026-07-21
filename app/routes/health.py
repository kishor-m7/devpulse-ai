import os
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.health import HealthResponse
from app.services.health_service import health_service
from app.models.project import Project
from app.config import settings

router = APIRouter()

@router.get("/health/{project_id}", response_model=HealthResponse)
async def get_project_health(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project {project_id} not found."
        )

    # Path to uploads directory if exists, otherwise temporary root
    repo_path = os.path.join(settings.UPLOAD_DIR, project.name)
    if not os.path.exists(repo_path):
        repo_path = settings.UPLOAD_DIR

    try:
        response = health_service.analyze_health(project_id, repo_path, db)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Health analysis error: {str(e)}"
        )
