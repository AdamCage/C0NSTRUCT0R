from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
import os

class Settings(BaseSettings):
    host: str = "0.0.0.0"
    port: int = 8088
    log_level: str = "info"

    cors_origins: List[str] = []
    cors_allow_credentials: bool = True
    cors_allow_headers: str = "*"
    cors_allow_methods: str = "*"

    ollama_base_url: str = "http://localhost:11434"
    ollama_model: str = os.getenv("OLLAMA_MODEL", "qwen2.5:3b")
    ollama_timeout: int = 120

    model_config = SettingsConfigDict(env_prefix="", env_file=".env", env_file_encoding="utf-8", case_sensitive=False)

settings = Settings()
