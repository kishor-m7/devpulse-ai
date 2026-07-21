import json
from sqlalchemy.orm import Session
from app.models.project import Project
from app.models.health import HealthReport
from app.services.parser_service import parser_service
from app.schemas.health import HealthResponse
from app.utils.logger import logger

class HealthService:
    def analyze_health(self, project_id: str, repo_path: str, db: Session) -> HealthResponse:
        project = db.query(Project).filter(Project.id == project_id).first()
        
        # Analyze repo locally using parser service (NO GPT CALLS!)
        analysis = parser_service.analyze_directory(repo_path)
        
        file_count = analysis["file_count"]
        unused = analysis["unused_imports"]
        duplicates = analysis["duplicate_imports"]
        large_files = analysis["large_files"]

        # Calculate metrics locally
        maintainability = max(0.0, 100.0 - (len(unused) * 2.0 + len(duplicates) * 3.0 + len(large_files) * 5.0))
        security = 100.0 - (len(large_files) * 2.0)
        complexity = min(100.0, (file_count * 1.5 + len(analysis.get("routes", [])) * 2))
        doc_score = 85.0 if any("readme" in f.lower() for f in large_files + ["README.md"]) else 40.0

        code_quality = "A+" if maintainability > 85 else "B" if maintainability > 70 else "C"

        metrics = {
            "file_count": file_count,
            "folder_count": analysis["folder_count"],
            "routes_count": analysis["routes_count"],
            "components_count": analysis["components_count"],
            "large_files_count": len(large_files)
        }

        # Save to DB
        report = HealthReport(
            project_id=project_id,
            maintainability_score=maintainability,
            security_score=security,
            complexity_score=complexity,
            documentation_score=doc_score,
            metrics_json=json.dumps(metrics)
        )
        db.add(report)
        db.commit()

        return HealthResponse(
            project_id=project_id,
            maintainability_score=maintainability,
            security_score=security,
            complexity_score=complexity,
            documentation_score=doc_score,
            code_quality=code_quality,
            unused_imports=unused,
            duplicate_code=duplicates,
            large_components=large_files,
            metrics=metrics
        )

health_service = HealthService()
