from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from app.database import Base

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    project_id = Column(String, ForeignKey("projects.id"), index=True, nullable=False)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    is_cached = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
