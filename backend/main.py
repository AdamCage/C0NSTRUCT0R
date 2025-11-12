from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1 import ai, library, palette
from app.ws.rooms import router as ws_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: создаем таблицы
    Base.metadata.create_all(bind=engine)
    
    # Инициализация системных данных (опционально, можно вынести в отдельный скрипт)
    try:
        from app.core.init_db import init_system_blocks, init_preset_palettes
        init_system_blocks()
        init_preset_palettes()
    except Exception as e:
        print(f"Предупреждение: не удалось инициализировать системные данные: {e}")
    
    yield
    # Shutdown: очистка ресурсов (если нужно)


app = FastAPI(
    title="Constructor Landing API",
    description="API для конструктора лендингов с LLM интеграцией",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключение роутеров
app.include_router(ai.router, prefix="/api/ai", tags=["AI"])
app.include_router(library.router, prefix="/api/library", tags=["Library"])
app.include_router(palette.router, prefix="/api/palette", tags=["Palette"])
app.include_router(ws_router, tags=["WebSocket"])


@app.get("/")
async def root():
    return {"message": "Constructor Landing API", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "ok"}


