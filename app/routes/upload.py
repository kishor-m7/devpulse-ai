import os
import shutil
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.upload import UploadResponse
from app.services.repository_service import repository_service
from app.config import settings

router = APIRouter()

@router.post("/upload", response_model=UploadResponse, status_code=status.HTTP_201_CREATED)
async def upload_repository(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".zip"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only .zip files are supported."
        )

    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    temp_zip_path = os.path.join(settings.UPLOAD_DIR, file.filename)

    try:
        with open(temp_zip_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        project = repository_service.process_upload(temp_zip_path, file.filename, db)

        import json
        langs = json.loads(project.languages) if project.languages else {}

        return UploadResponse(
            project_id=project.id,
            project_name=project.name,
            file_count=project.file_count,
            folder_count=project.folder_count,
            languages=langs,
            hash=project.hash,
            message="Repository successfully uploaded, parsed, and indexed."
        )

    except Exception as e:
        if os.path.exists(temp_zip_path):
            os.remove(temp_zip_path)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process repository: {str(e)}"
        )
