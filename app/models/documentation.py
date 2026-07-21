from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from app.database import Base

class Documentation(Base):
    __tablename__ = "documentation"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    project_id = Column(String, ForeignKey("projects.id"), index=True, nullable=False)
    readme = Column(Text, nullable=True)
    architecture = Column(Text, nullable=True)
    folder_structure = Column(Text, nullable=True)
    installation_guide = Column(Text, nullable=True)
    deployment_guide = Column(Text, nullable=True)
    api_docs = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
