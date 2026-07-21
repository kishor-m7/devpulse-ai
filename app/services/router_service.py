import re
import json
from sqlalchemy.orm import Session
from app.models.project import Project
from app.models.chat import ChatHistory
from app.services.cache_service import cache_service
from app.services.openai_service import openai_service
from app.services.rag_service import rag_service
from app.services.parser_service import parser_service
from app.schemas.chat import ChatRequest, ChatResponse
from app.utils.logger import logger

LOCAL_INTENTS = [
    r"how many files",
    r"file count",
    r"folder count",
    r"how many folders",
    r"languages used",
    r"what languages",
    r"unused imports",
    r"duplicate imports",
    r"routes",
    r"endpoints",
    r"components",
    r"tree structure",
    r"folder structure",
    r"repo stats",
    r"repository statistics"
]

class RouterService:
    def process_chat_query(self, request: ChatRequest, db: Session) -> ChatResponse:
        cache_key = f"chat_{request.project_id}_{request.question.strip().lower()}"
        
        # 1. Check cache first
        cached_answer = cache_service.get(cache_key)
        if cached_answer:
            logger.info(f"Cache hit for chat question: '{request.question}'")
            return ChatResponse(
                answer=cached_answer,
                source_chunks=[],
                is_cached=True,
                source_type="local_cache"
            )

        q_lower = request.question.lower()

        # 2. Check if query can be answered locally without OpenAI
        is_local = any(re.search(pattern, q_lower) for pattern in LOCAL_INTENTS)
        
        if is_local:
            logger.info(f"Query '{request.question}' routed to LOCAL analysis (No OpenAI).")
            project = db.query(Project).filter(Project.id == request.project_id).first()
            if not project:
                answer = f"Project {request.project_id} not found."
            else:
                langs = json.loads(project.languages) if project.languages else {}
                lang_str = ", ".join([f"{k}: {v}" for k, v in langs.items()])
                answer = f"**Local Repository Analysis:**\n- **Project Name:** {project.name}\n- **Total Files:** {project.file_count}\n- **Total Folders:** {project.folder_count}\n- **Languages Detected:** {lang_str or 'N/A'}"

            cache_service.set(cache_key, answer)
            
            # Save chat history
            chat_rec = ChatHistory(
                project_id=request.project_id,
                question=request.question,
                answer=answer,
                is_cached=False
            )
            db.add(chat_rec)
            db.commit()

            return ChatResponse(
                answer=answer,
                source_chunks=[],
                is_cached=False,
                source_type="local"
            )

        # 3. NO local match -> Use RAG + OpenAI (Top 5 Chunks, Max 2000 context tokens)
        logger.info(f"Query '{request.question}' routed to RAG + OpenAI.")
        top_chunks = rag_service.retrieve_top_chunks(request.project_id, request.question, top_k=5)
        
        context_str = "\n\n".join([f"--- Snippet ({c['file_name']}) ---\n{c['content']}" for c in top_chunks])
        source_files = list(set([c['file_name'] for c in top_chunks]))

        prompt = f"""
You are DevPulse AI engineering assistant. Answer the user's question using ONLY the provided code snippets.

Context:
{context_str or 'No relevant code snippets found in repository.'}

Question:
{request.question}
"""
        system_prompt = "You are a senior software engineer assistant. Keep your response clear, concise, and technical."
        ai_answer = openai_service.get_completion(prompt, system_prompt=system_prompt)

        # Cache response
        cache_service.set(cache_key, ai_answer)

        # Save chat history
        chat_rec = ChatHistory(
            project_id=request.project_id,
            question=request.question,
            answer=ai_answer,
            is_cached=False
        )
        db.add(chat_rec)
        db.commit()

        return ChatResponse(
            answer=ai_answer,
            source_chunks=source_files,
            is_cached=False,
            source_type="rag_openai"
        )

router_service = RouterService()
