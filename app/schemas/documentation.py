from pydantic import BaseModel
from typing import Optional

class DocumentationRequest(BaseModel):
    project_id: str

class DocumentationResponse(BaseModel):
    project_id: str
    readme: str
    architecture: str
    folder_explanation: str
    installation_guide: str
    deployment_guide: str
    api_docs: str
    is_cached: bool = False
