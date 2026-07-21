from pydantic import BaseModel
from typing import List, Dict, Any

class HealthResponse(BaseModel):
    project_id: str
    maintainability_score: float
    security_score: float
    complexity_score: float
    documentation_score: float
    code_quality: str
    unused_imports: List[str]
    duplicate_code: List[str]
    large_components: List[str]
    metrics: Dict[str, Any]
