from pydantic import BaseModel
from typing import Dict, List, Any

class RepositoryStatsResponse(BaseModel):
    project_id: str
    file_count: int
    folder_count: int
    languages: Dict[str, int]
    components_count: int
    routes_count: int
    unused_imports: List[str]
    duplicate_imports: List[str]
    tree_structure: Any
