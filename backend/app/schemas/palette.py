from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime


class PaletteSchema(BaseModel):
    """Схема цветовой палитры"""
    primary: str = Field(..., pattern=r"^#[0-9A-Fa-f]{6}$")
    secondary: Optional[str] = Field(None, pattern=r"^#[0-9A-Fa-f]{6}$")
    background: str = Field(..., pattern=r"^#[0-9A-Fa-f]{6}$")
    text: str = Field(..., pattern=r"^#[0-9A-Fa-f]{6}$")
    accent: str = Field(..., pattern=r"^#[0-9A-Fa-f]{6}$")
    surface: Optional[str] = Field(None, pattern=r"^#[0-9A-Fa-f]{6}$")
    border: Optional[str] = Field(None, pattern=r"^#[0-9A-Fa-f]{6}$")
    additional_colors: Optional[Dict[str, str]] = None


class PaletteCreate(BaseModel):
    """Схема для создания палитры"""
    name: Optional[str] = None
    project_id: Optional[int] = None
    palette: PaletteSchema
    description: Optional[str] = None
    is_preset: bool = False


class PaletteResponse(BaseModel):
    """Схема ответа с палитрой"""
    id: int
    name: Optional[str]
    project_id: Optional[int]
    primary: str
    secondary: Optional[str]
    background: str
    text: str
    accent: str
    surface: Optional[str]
    border: Optional[str]
    additional_colors: Optional[Dict[str, str]]
    description: Optional[str]
    is_preset: bool
    created_at: datetime

    class Config:
        from_attributes = True


