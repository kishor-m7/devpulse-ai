from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from app.database import Base

class Memory(Base):
    __tablename__ = "memory"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    project_id = Column(String, ForeignKey("projects.id"), index=True, nullable=False)
    memory_type = Column(String, nullable=False, index=True) # e.g. 'chat', 'insight', 'architecture'
    key = Column(String, nullable=False)
    value = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
