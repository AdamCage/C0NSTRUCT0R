from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from app.schemas.block import BlockSchema
from app.schemas.palette import PaletteSchema


class GenerateLandingRequest(BaseModel):
    """Запрос на генерацию лендинга"""
    prompt: str = Field(..., min_length=1, description="Описание лендинга для генерации")
    categories: Optional[List[str]] = Field(default=[], description="Список категорий блоков")


class GenerateLandingResponse(BaseModel):
    """Ответ с сгенерированным лендингом"""
    blocks: List[Dict[str, Any]] = Field(..., description="Список блоков лендинга")
    palette: PaletteSchema = Field(..., description="Цветовая палитра")
    meta: Optional[Dict[str, Any]] = Field(
        default=None,
        description="Метаданные генерации (время, модель, версия и т.д.)"
    )


