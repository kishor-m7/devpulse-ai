from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import init_db
from app.utils.logger import logger

from app.routes.upload import router as upload_router
from app.routes.chat import router as chat_router
from app.routes.repository import router as repository_router
from app.routes.documentation import router as documentation_router
from app.routes.bug import router as bug_router
from app.routes.health import router as health_router
from app.routes.memory import router as memory_router

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description="DevPulse AI - AI Software Engineering Command Center Backend"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Register API Routers
    app.include_router(upload_router, prefix="/api", tags=["Upload"])
    app.include_router(chat_router, prefix="/api", tags=["AI Chat"])
    app.include_router(repository_router, prefix="/api", tags=["Repository"])
    app.include_router(documentation_router, prefix="/api", tags=["Documentation"])
    app.include_router(bug_router, prefix="/api", tags=["Bug Detective"])
    app.include_router(health_router, prefix="/api", tags=["Project Health"])
    app.include_router(memory_router, prefix="/api", tags=["Project Memory"])

    @app.on_event("startup")
    async def on_startup():
        logger.info("Initializing DevPulse AI Backend...")
        init_db()
        logger.info("Database initialized successfully.")

    @app.get("/")
    async def root():
        return {
            "name": settings.PROJECT_NAME,
            "version": settings.VERSION,
            "status": "online",
            "docs": "/docs"
        }

    return app

app = create_app()
