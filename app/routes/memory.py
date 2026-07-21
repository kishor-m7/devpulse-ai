from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.memory import MemoryResponse
from app.services.memory_service import memory_service

router = APIRouter()

@router.get("/memory/{project_id}", response_model=MemoryResponse)
async def get_project_memory(project_id: str, db: Session = Depends(get_db)):
    if not project_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="project_id is required."
        )

    try:
        response = memory_service.get_project_memory(project_id, db)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Memory retrieval error: {str(e)}"
        )
