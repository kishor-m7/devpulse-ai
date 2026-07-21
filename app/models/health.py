from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey
from app.database import Base

class HealthReport(Base):
    __tablename__ = "health_reports"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    project_id = Column(String, ForeignKey("projects.id"), index=True, nullable=False)
    maintainability_score = Column(Float, default=0.0)
    security_score = Column(Float, default=0.0)
    complexity_score = Column(Float, default=0.0)
    documentation_score = Column(Float, default=0.0)
    metrics_json = Column(Text, nullable=False, default="{}")
    created_at = Column(DateTime, default=datetime.utcnow)
