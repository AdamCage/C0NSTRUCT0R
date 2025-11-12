import random
from typing import Dict, Optional
from app.schemas.palette import PaletteSchema


class PaletteGenerator:
    """Генератор цветовых палитр"""
    
    # Предустановленные палитры
    PRESET_PALETTES = [
        {
            "name": "Ocean Blue",
            "primary": "#007bff",
            "secondary": "#6c757d",
            "background": "#ffffff",
            "text": "#212529",
            "accent": "#28a745",
            "surface": "#f8f9fa",
            "border": "#dee2e6"
        },
        {
            "name": "Purple Dream",
            "primary": "#6f42c1",
            "secondary": "#e83e8c",
            "background": "#ffffff",
            "text": "#343a40",
            "accent": "#fd7e14",
            "surface": "#f8f9fa",
            "border": "#dee2e6"
        },
        {
            "name": "Green Fresh",
            "primary": "#20c997",
            "secondary": "#17a2b8",
            "background": "#ffffff",
            "text": "#212529",
            "accent": "#ffc107",
            "surface": "#f8f9fa",
            "border": "#dee2e6"
        },
        {
            "name": "Red Energy",
            "primary": "#dc3545",
            "secondary": "#6c757d",
            "background": "#ffffff",
            "text": "#212529",
            "accent": "#fd7e14",
            "surface": "#f8f9fa",
            "border": "#dee2e6"
        },
        {
            "name": "Dark Mode",
            "primary": "#0d6efd",
            "secondary": "#6c757d",
            "background": "#212529",
            "text": "#ffffff",
            "accent": "#ffc107",
            "surface": "#343a40",
            "border": "#495057"
        }
    ]
    
    @staticmethod
    def generate_from_description(description: str) -> PaletteSchema:
        """
        Генерирует палитру на основе описания (mock)
        
        Args:
            description: Описание темы/настроения
            
        Returns:
            PaletteSchema
        """
        # Простая логика: выбираем палитру на основе ключевых слов
        description_lower = description.lower()
        
        if "dark" in description_lower or "night" in description_lower:
            palette_data = PaletteGenerator.PRESET_PALETTES[4]  # Dark Mode
        elif "purple" in description_lower or "violet" in description_lower:
            palette_data = PaletteGenerator.PRESET_PALETTES[1]  # Purple Dream
        elif "green" in description_lower or "nature" in description_lower:
            palette_data = PaletteGenerator.PRESET_PALETTES[2]  # Green Fresh
        elif "red" in description_lower or "energy" in description_lower:
            palette_data = PaletteGenerator.PRESET_PALETTES[3]  # Red Energy
        else:
            palette_data = random.choice(PaletteGenerator.PRESET_PALETTES)
        
        return PaletteSchema(**{k: v for k, v in palette_data.items() if k != "name"})
    
    @staticmethod
    def get_preset_palettes() -> list:
        """Возвращает список предустановленных палитр"""
        return PaletteGenerator.PRESET_PALETTES


