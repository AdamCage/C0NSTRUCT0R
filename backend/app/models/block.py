from sqlalchemy import Column, String, Integer, Boolean, DateTime, JSON, Text
from sqlalchemy.sql import func
from app.core.database import Base


class Block(Base):
    __tablename__ = "blocks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    author = Column(String(255), nullable=True, index=True)
    category = Column(String(100), nullable=False, index=True)
    tags = Column(JSON, nullable=True)  # Список тегов в JSON формате
    json_config = Column(JSON, nullable=False)  # JSON конфигурация блока
    description = Column(Text, nullable=True)
    preview = Column(String(500), nullable=True)  # URL превью изображения
    is_public = Column(Boolean, default=True)  # Системный блок или пользовательский
    is_custom = Column(Boolean, default=False)  # Пользовательский блок
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


