from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, Text
from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    hash = Column(String, unique=True, index=True, nullable=False)
    file_count = Column(Integer, default=0)
    folder_count = Column(Integer, default=0)
    languages = Column(Text, default="{}")
    created_at = Column(DateTime, default=datetime.utcnow)
