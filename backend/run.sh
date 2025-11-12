#!/bin/bash

# Скрипт для запуска backend сервера

# Активация виртуального окружения (если существует)
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Запуск сервера
uvicorn main:app --reload --host 0.0.0.0 --port 8000


