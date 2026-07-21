from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.documentation import DocumentationRequest, DocumentationResponse
from app.services.documentation_service import documentation_service

router = APIRouter()

@router.post("/documentation", response_model=DocumentationResponse)
async def generate_documentation(request: DocumentationRequest, db: Session = Depends(get_db)):
    if not request.project_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="project_id is required."
        )

    try:
        response = documentation_service.generate_documentation(request.project_id, db)
        return response
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Documentation generation error: {str(e)}"
        )
