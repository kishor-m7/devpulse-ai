import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "DevPulse AI Backend"
    VERSION: str = "1.0.0"
    
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "your api key")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./devpulse.db")
    CHROMA_DB_PATH: str = os.getenv("CHROMA_DB_PATH", "./app/vector_db")
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "./app/uploads")
    CACHE_DIR: str = os.getenv("CACHE_DIR", "./app/cache")
    LOGS_DIR: str = "./app/logs"
    
    EMBEDDING_MODEL: str = "text-embedding-3-small"
    COMPLETION_MODEL: str = "gpt-4.1-mini"
    
    CHUNK_MIN_TOKENS: int = 400
    CHUNK_MAX_TOKENS: int = 600
    MAX_CONTEXT_TOKENS: int = 2000

settings = Settings()
