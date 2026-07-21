from pydantic import BaseModel
from typing import Optional

class BugRequest(BaseModel):
    project_id: str
    stack_trace: str
    relevant_file: Optional[str] = None
    relevant_function: Optional[str] = None

class BugResponse(BaseModel):
    project_id: str
    analysis: str
    suggested_fix: str
