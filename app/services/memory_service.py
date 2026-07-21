import json
from sqlalchemy.orm import Session
from app.models.project import Project
from app.models.chat import ChatHistory
from app.models.documentation import Documentation
from app.models.memory import Memory
from app.schemas.memory import MemoryResponse, ChatHistoryItem
from app.utils.logger import logger

class MemoryService:
    def get_project_memory(self, project_id: str, db: Session) -> MemoryResponse:
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            return MemoryResponse(
                project_id=project_id,
                previous_questions=[],
                repository_history={},
                documentation={},
                architecture="No project found"
            )

        chats = db.query(ChatHistory).filter(ChatHistory.project_id == project_id).order_by(ChatHistory.created_at.desc()).all()
        doc = db.query(Documentation).filter(Documentation.project_id == project_id).first()

        prev_questions = [
            ChatHistoryItem(question=c.question, answer=c.answer, created_at=c.created_at)
            for c in chats
        ]

        repo_history = {
            "name": project.name,
            "hash": project.hash,
            "file_count": project.file_count,
            "folder_count": project.folder_count,
            "languages": json.loads(project.languages) if project.languages else {},
            "created_at": str(project.created_at)
        }

        doc_dict = {}
        architecture_text = "Not generated yet."

        if doc:
            doc_dict = {
                "readme": doc.readme,
                "folder_structure": doc.folder_structure,
                "installation_guide": doc.installation_guide,
                "api_docs": doc.api_docs
            }
            architecture_text = doc.architecture or architecture_text

        return MemoryResponse(
            project_id=project_id,
            previous_questions=prev_questions,
            repository_history=repo_history,
            documentation=doc_dict,
            architecture=architecture_text
        )

memory_service = MemoryService()
