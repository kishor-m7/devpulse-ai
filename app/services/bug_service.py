from sqlalchemy.orm import Session
from app.models.bug import BugReport
from app.services.openai_service import openai_service
from app.services.rag_service import rag_service
from app.schemas.bug import BugRequest, BugResponse
from app.utils.logger import logger

class BugService:
    def analyze_bug(self, request: BugRequest, db: Session) -> BugResponse:
        context_str = ""
        # If relevant file/function provided, search specifically for that chunk in ChromaDB
        if request.relevant_file or request.relevant_function:
            search_query = f"{request.relevant_file or ''} {request.relevant_function or ''} {request.stack_trace[:200]}"
            chunks = rag_service.retrieve_top_chunks(request.project_id, search_query, top_k=2)
            context_str = "\n".join([f"Snippet from {c['file_name']}:\n{c['content']}" for c in chunks])

        prompt = f"""
Analyze the following error stack trace and relevant code context.

Stack Trace:
{request.stack_trace}

Target File: {request.relevant_file or 'Not specified'}
Target Function: {request.relevant_function or 'Not specified'}

Code Snippet (if available):
{context_str}

Please provide:
1. Analysis of what caused the error.
2. Suggested fix with code modification.
"""

        system_prompt = "You are an expert debugging assistant. Only analyze the provided stack trace and code snippet. Do not hallucinate external codebase details."
        ai_response = openai_service.get_completion(prompt, system_prompt=system_prompt)

        # Split into analysis and fix if possible
        if "Suggested fix:" in ai_response:
            parts = ai_response.split("Suggested fix:")
            analysis = parts[0].strip()
            suggested_fix = parts[1].strip()
        else:
            analysis = ai_response
            suggested_fix = "Refer to analysis above for recommended changes."

        # Store bug report in database
        bug_report = BugReport(
            project_id=request.project_id,
            stack_trace=request.stack_trace,
            relevant_file=request.relevant_file,
            relevant_function=request.relevant_function,
            analysis=analysis,
            suggested_fix=suggested_fix
        )
        db.add(bug_report)
        db.commit()

        return BugResponse(
            project_id=request.project_id,
            analysis=analysis,
            suggested_fix=suggested_fix
        )

bug_service = BugService()
