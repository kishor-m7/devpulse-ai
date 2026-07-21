from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.bug import BugRequest, BugResponse
from app.services.bug_service import bug_service

router = APIRouter()

@router.post("/bug", response_model=BugResponse)
async def analyze_bug(request: BugRequest, db: Session = Depends(get_db)):
    if not request.project_id or not request.stack_trace:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="project_id and stack_trace are required."
        )

    try:
        response = bug_service.analyze_bug(request, db)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Bug analysis error: {str(e)}"
        )
