from pydantic import BaseModel
from typing import Dict, List, Optional

class UploadResponse(BaseModel):
    project_id: str
    project_name: str
    file_count: int
    folder_count: int
    languages: Dict[str, int]
    hash: str
    message: str
