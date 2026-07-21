from typing import List, Dict, Any
from app.services.embedding_service import embedding_service
from app.services.openai_service import openai_service
from app.utils.token_counter import count_tokens
from app.config import settings
from app.utils.logger import logger

class RAGService:
    def __init__(self):
        self.collection = embedding_service.collection

    def retrieve_top_chunks(self, project_id: str, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        query_emb = openai_service.get_embedding(query)
        
        try:
            results = self.collection.query(
                query_embeddings=[query_emb],
                n_results=top_k,
                where={"project_id": project_id}
            )
        except Exception as e:
            logger.error(f"Error querying ChromaDB: {e}")
            return []

        chunks = []
        if results and results.get("documents") and len(results["documents"]) > 0:
            docs = results["documents"][0]
            metas = results["metadatas"][0]
            distances = results["distances"][0] if "distances" in results and results["distances"] else [0]*len(docs)
            
            total_tokens = 0
            for doc, meta, dist in zip(docs, metas, distances):
                doc_tokens = count_tokens(doc)
                if total_tokens + doc_tokens > settings.MAX_CONTEXT_TOKENS:
                    break
                total_tokens += doc_tokens
                chunks.append({
                    "content": doc,
                    "file_name": meta.get("file_name", "unknown"),
                    "chunk_index": meta.get("chunk_index", 0),
                    "distance": dist
                })
        return chunks

rag_service = RAGService()
