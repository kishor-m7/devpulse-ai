from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from app.database import Base

class BugReport(Base):
    __tablename__ = "bug_reports"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    project_id = Column(String, ForeignKey("projects.id"), index=True, nullable=False)
    stack_trace = Column(Text, nullable=False)
    relevant_file = Column(String, nullable=True)
    relevant_function = Column(String, nullable=True)
    analysis = Column(Text, nullable=False)
    suggested_fix = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
