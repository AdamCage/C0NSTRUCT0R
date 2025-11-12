from sqlalchemy import Column, String, Integer, DateTime, JSON, ForeignKey, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base


class Palette(Base):
    __tablename__ = "palettes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    project_id = Column(Integer, nullable=True, index=True)  # Привязка к проекту (опционально)
    # Цветовая схема
    primary = Column(String(7), nullable=False)  # HEX цвет
    secondary = Column(String(7), nullable=True)
    background = Column(String(7), nullable=False)
    text = Column(String(7), nullable=False)
    accent = Column(String(7), nullable=False)
    surface = Column(String(7), nullable=True)
    border = Column(String(7), nullable=True)
    # Дополнительные цвета в JSON
    additional_colors = Column(JSON, nullable=True)
    # Метаданные
    description = Column(String(500), nullable=True)
    is_preset = Column(Boolean, default=False)  # Предустановленная палитра
    created_at = Column(DateTime(timezone=True), server_default=func.now())


