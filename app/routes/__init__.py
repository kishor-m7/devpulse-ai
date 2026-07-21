from app.routes.upload import router as upload_router
from app.routes.chat import router as chat_router
from app.routes.repository import router as repository_router
from app.routes.documentation import router as documentation_router
from app.routes.bug import router as bug_router
from app.routes.health import router as health_router
from app.routes.memory import router as memory_router

__all__ = [
    "upload_router",
    "chat_router",
    "repository_router",
    "documentation_router",
    "bug_router",
    "health_router",
    "memory_router",
]
