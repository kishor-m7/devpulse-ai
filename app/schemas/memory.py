from pydantic import BaseModel
from typing import List, Dict, Any
from datetime import datetime

class ChatHistoryItem(BaseModel):
    question: str
    answer: str
    created_at: datetime

class MemoryResponse(BaseModel):
    project_id: str
    previous_questions: List[ChatHistoryItem]
    repository_history: Dict[str, Any]
    documentation: Dict[str, Any]
    architecture: str
