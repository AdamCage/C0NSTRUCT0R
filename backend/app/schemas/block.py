from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime


class BlockSchema(BaseModel):
    """Схема блока (JSON конфигурация)"""
    id: str
    type: str
    style: Optional[Dict[str, Any]] = None
    props: Optional[Dict[str, Any]] = None
    children: Optional[List["BlockSchema"]] = None

    class Config:
        from_attributes = True


class BlockCreate(BaseModel):
    """Схема для создания блока"""
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    category: str = Field(..., min_length=1, max_length=100)
    tags: Optional[List[str]] = []
    blocks: List[Dict[str, Any]] = Field(..., description="JSON конфигурация блоков")
    preview: Optional[str] = None
    author: Optional[str] = None


class BlockUpdate(BaseModel):
    """Схема для обновления блока"""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    category: Optional[str] = Field(None, min_length=1, max_length=100)
    tags: Optional[List[str]] = None
    blocks: Optional[List[Dict[str, Any]]] = None
    preview: Optional[str] = None


class BlockResponse(BaseModel):
    """Схема ответа с блоком"""
    id: int
    name: str
    description: Optional[str]
    category: str
    tags: Optional[List[str]]
    author: Optional[str]
    preview: Optional[str]
    blocks: List[Dict[str, Any]]
    is_custom: bool
    created_at: datetime

    class Config:
        from_attributes = True


