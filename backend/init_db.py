#!/usr/bin/env python3
"""
Скрипт для инициализации базы данных
Запуск: python init_db.py
"""
from app.core.init_db import init_system_blocks, init_preset_palettes
from app.core.database import Base, engine

if __name__ == "__main__":
    print("Создание таблиц...")
    Base.metadata.create_all(bind=engine)
    
    print("Инициализация системных блоков...")
    init_system_blocks()
    
    print("Инициализация предустановленных палитр...")
    init_preset_palettes()
    
    print("✅ Инициализация базы данных завершена!")

