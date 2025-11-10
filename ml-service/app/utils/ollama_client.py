import httpx, os, json
from typing import Any, Dict
from .json_tools import coerce_json

class OllamaClient:
    def __init__(self, base_url: str, model: str, timeout: int = 120):
        self.base_url = base_url.rstrip("/")
        self.model = model
        self.timeout = timeout

    async def generate_json(self, system: str, user: str) -> Dict[str, Any]:
        if os.getenv("OLLAMA_MOCK", "0") == "1":
            # Deterministic minimal template for tests
            return {
                "version": "1.0",
                "meta": {
                    "title": "Тестовый сайт",
                    "description": "Сгенерированный в mock-режиме",
                    "keywords": ["test","mock"],
                    "theme": "light",
                    "palette": {"primary":"#1f77b4","accent":"#ff7f0e"}
                },
                "layout": [
                    {
                        "type":"hero",
                        "title":"Добро пожаловать",
                        "subtitle":"Это демо",
                        "blocks":[
                            {"type":"text","text":"Пример контента","size":"md","align":"center"},
                            {"type":"button","text":"Действие","href":"#","variant":"primary"}
                        ]
                    },
                    {
                        "type":"footer",
                        "blocks":[{"type":"text","text":"© Demo","size":"sm","align":"center"}]
                    }
                ]
            }

        url = f"{self.base_url}/api/generate"
        payload = {
            "model": self.model,
            "prompt": f"<<SYS>>\n{system}\n<</SYS>>\n\n{user}",
            "format": "json",
            "stream": False
        }
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            r = await client.post(url, json=payload)
            r.raise_for_status()
            data = r.json()
        # Ollama returns {"response": "...json string...", "done": true, ...}
        raw = data.get("response", "")
        return coerce_json(raw)
