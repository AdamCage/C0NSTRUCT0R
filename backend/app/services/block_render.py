from typing import List, Dict, Any


class BlockRenderService:
    """Сервис для подготовки финального JSON лендинга"""
    
    @staticmethod
    def combine_blocks(generated_blocks: List[Dict[str, Any]], user_blocks: List[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        """
        Объединяет сгенерированные блоки с пользовательскими
        
        Args:
            generated_blocks: Блоки, сгенерированные LLM
            user_blocks: Пользовательские блоки для добавления
            
        Returns:
            Объединенный список блоков
        """
        result = generated_blocks.copy()
        
        if user_blocks:
            result.extend(user_blocks)
        
        return result
    
    @staticmethod
    def validate_block(block: Dict[str, Any]) -> bool:
        """
        Валидирует структуру блока
        
        Args:
            block: JSON конфигурация блока
            
        Returns:
            True если блок валиден
        """
        required_fields = ["id", "type"]
        
        if not all(field in block for field in required_fields):
            return False
        
        valid_types = ["text", "image", "button", "video", "container", "grid"]
        if block["type"] not in valid_types:
            return False
        
        # Валидация для конкретных типов
        if block["type"] == "text" and "content" not in block:
            return False
        
        if block["type"] == "image" and "url" not in block:
            return False
        
        if block["type"] == "button" and "text" not in block:
            return False
        
        if block["type"] == "container" and "children" not in block:
            return False
        
        return True
    
    @staticmethod
    def prepare_final_json(
        blocks: List[Dict[str, Any]],
        palette: Dict[str, str] = None
    ) -> Dict[str, Any]:
        """
        Подготавливает финальный JSON для лендинга
        
        Args:
            blocks: Список блоков
            palette: Цветовая палитра
            
        Returns:
            Финальный JSON структура лендинга
        """
        # Валидируем все блоки
        valid_blocks = [block for block in blocks if BlockRenderService.validate_block(block)]
        
        result = {
            "blocks": valid_blocks,
            "palette": palette or {},
            "version": "1.0.0"
        }
        
        return result


