import os
import hashlib
import chromadb
from app.config import settings
from app.utils.token_counter import chunk_text_by_tokens
from app.utils.logger import logger
from app.services.openai_service import openai_service

SUPPORTED_EXTENSIONS = {
    ".py", ".js", ".jsx", ".ts", ".tsx", ".java", ".cpp", ".c", ".h", ".hpp",
    ".cs", ".go", ".rs", ".php", ".rb", ".html", ".css", ".json", ".md", ".yml", ".yaml"
}

SKIP_DIRS = {"node_modules", ".git", "dist", "build", "coverage", "__pycache__", ".venv", "venv"}

class EmbeddingService:
    def __init__(self):
        os.makedirs(settings.CHROMA_DB_PATH, exist_ok=True)
        self.chroma_client = chromadb.PersistentClient(path=settings.CHROMA_DB_PATH)
        self.collection = self.chroma_client.get_or_create_collection(name="code_chunks")

    def process_and_embed_repository(self, project_id: str, repo_path: str, repo_hash: str):
        ids = []
        embeddings = []
        metadatas = []
        documents = []

        for root, dirs, files in os.walk(repo_path):
            dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext not in SUPPORTED_EXTENSIONS:
                    continue
                
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, repo_path)
                
                try:
                    with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                except Exception as e:
                    logger.warning(f"Failed to read {full_path}: {e}")
                    continue
                
                if not content.strip():
                    continue

                chunks = chunk_text_by_tokens(
                    content,
                    min_tokens=settings.CHUNK_MIN_TOKENS,
                    max_tokens=settings.CHUNK_MAX_TOKENS
                )

                for idx, chunk in enumerate(chunks):
                    chunk_hash = hashlib.sha256(chunk.encode('utf-8')).hexdigest()
                    doc_id = f"{project_id}_{chunk_hash[:16]}_{idx}"
                    
                    try:
                        emb = openai_service.get_embedding(chunk)
                    except Exception as e:
                        logger.error(f"Embedding error for chunk in {rel_path}: {e}")
                        emb = [0.0] * 1536

                    ids.append(doc_id)
                    embeddings.append(emb)
                    documents.append(chunk)
                    metadatas.append({
                        "project_id": project_id,
                        "file_name": rel_path,
                        "chunk_index": idx,
                        "chunk_hash": chunk_hash,
                        "repo_hash": repo_hash
                    })

        if ids:
            # Batch upsert into ChromaDB
            batch_size = 100
            for i in range(0, len(ids), batch_size):
                self.collection.upsert(
                    ids=ids[i:i+batch_size],
                    embeddings=embeddings[i:i+batch_size],
                    documents=documents[i:i+batch_size],
                    metadatas=metadatas[i:i+batch_size]
                )
            logger.info(f"Embedded {len(ids)} chunks for project {project_id}")

embedding_service = EmbeddingService()
