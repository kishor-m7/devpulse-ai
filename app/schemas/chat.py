from pydantic import BaseModel
from typing import List, Optional

class ChatRequest(BaseModel):
    project_id: str
    question: str

class ChunkMetadata(BaseModel):
    file_name: str
    chunk_index: int
    score: Optional[float] = None

class ChatResponse(BaseModel):
    answer: str
    source_chunks: List[str] = []
    is_cached: bool = False
    source_type: str = "local" # "local" or "rag_openai"
