from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.block import Block
from app.schemas.block import BlockCreate, BlockUpdate, BlockResponse
from app.services.block_render import BlockRenderService

router = APIRouter()


@router.get("/blocks", response_model=List[BlockResponse])
async def get_blocks(
    category: Optional[str] = Query(None, description="Фильтр по категории"),
    tags: Optional[str] = Query(None, description="Фильтр по тегам (через запятую)"),
    author: Optional[str] = Query(None, description="Фильтр по автору"),
    is_custom: Optional[bool] = Query(None, description="Фильтр пользовательских блоков"),
    db: Session = Depends(get_db)
):
    """
    Возвращает список системных и пользовательских блоков
    
    Поддерживает фильтрацию по:
    - category: категория блока
    - tags: теги (через запятую)
    - author: автор блока
    - is_custom: пользовательские блоки (true/false)
    """
    query = db.query(Block)
    
    # Применяем фильтры
    if category:
        query = query.filter(Block.category == category)
    
    if author:
        query = query.filter(Block.author == author)
    
    if is_custom is not None:
        query = query.filter(Block.is_custom == is_custom)
    
    if tags:
        tag_list = [tag.strip() for tag in tags.split(",")]
        # Фильтрация по тегам (теги хранятся в JSON)
        # Для SQLite используем простую проверку
        blocks = query.all()
        filtered_blocks = []
        for block in blocks:
            if block.tags:
                block_tags = block.tags if isinstance(block.tags, list) else []
                if any(tag in block_tags for tag in tag_list):
                    filtered_blocks.append(block)
        blocks = filtered_blocks
    else:
        blocks = query.all()
    
    # Преобразуем в ответ
    result = []
    for block in blocks:
        result.append(BlockResponse(
            id=block.id,
            name=block.name,
            description=block.description,
            category=block.category,
            tags=block.tags if isinstance(block.tags, list) else [],
            author=block.author,
            preview=block.preview,
            blocks=block.json_config if isinstance(block.json_config, list) else [],
            is_custom=block.is_custom,
            created_at=block.created_at
        ))
    
    return result


@router.get("/ready", response_model=List[BlockResponse])
async def get_ready_blocks(
    category: Optional[str] = Query(None, description="Фильтр по категории"),
    tags: Optional[str] = Query(None, description="Фильтр по тегам (через запятую)"),
    author: Optional[str] = Query(None, description="Фильтр по автору"),
    db: Session = Depends(get_db)
):
    """
    Возвращает список готовых (системных) блоков из БД
    """
    query = db.query(Block).filter(Block.is_custom == False)

    if category:
        query = query.filter(Block.category == category)
    if author:
        query = query.filter(Block.author == author)

    if tags:
        tag_list = [tag.strip() for tag in tags.split(",")]
        blocks = query.all()
        filtered_blocks = []
        for block in blocks:
            if block.tags:
                block_tags = block.tags if isinstance(block.tags, list) else []
                if any(tag in block_tags for tag in tag_list):
                    filtered_blocks.append(block)
        blocks = filtered_blocks
    else:
        blocks = query.all()

    return [
        BlockResponse(
            id=b.id,
            name=b.name,
            description=b.description,
            category=b.category,
            tags=b.tags if isinstance(b.tags, list) else [],
            author=b.author,
            preview=b.preview,
            blocks=b.json_config if isinstance(b.json_config, list) else [],
            is_custom=b.is_custom,
            created_at=b.created_at,
        )
        for b in blocks
    ]


@router.get("/block/{block_id}", response_model=BlockResponse)
async def get_block(block_id: int, db: Session = Depends(get_db)):
    """
    Возвращает полные данные конкретного блока по ID
    """
    block = db.query(Block).filter(Block.id == block_id).first()
    
    if not block:
        raise HTTPException(status_code=404, detail="Блок не найден")
    
    return BlockResponse(
        id=block.id,
        name=block.name,
        description=block.description,
        category=block.category,
        tags=block.tags if isinstance(block.tags, list) else [],
        author=block.author,
        preview=block.preview,
        blocks=block.json_config if isinstance(block.json_config, list) else [],
        is_custom=block.is_custom,
        created_at=block.created_at
    )


@router.post("/upload", response_model=BlockResponse)
async def upload_block(block_data: BlockCreate, db: Session = Depends(get_db)):
    """
    Загружает пользовательский блок
    
    Принимает:
    - name: название блока
    - description: описание
    - category: категория
    - tags: список тегов
    - blocks: JSON конфигурация блоков
    - preview: URL превью (опционально)
    - author: автор (опционально)
    """
    # Валидация блоков
    for block in block_data.blocks:
        if not BlockRenderService.validate_block(block):
            raise HTTPException(
                status_code=400,
                detail=f"Некорректная структура блока: {block.get('id', 'unknown')}"
            )
    
    # Создаем новый блок
    new_block = Block(
        name=block_data.name,
        description=block_data.description,
        category=block_data.category,
        tags=block_data.tags or [],
        json_config=block_data.blocks,
        preview=block_data.preview,
        author=block_data.author or "user",
        is_custom=True,
        is_public=True
    )
    
    db.add(new_block)
    db.commit()
    db.refresh(new_block)
    
    return BlockResponse(
        id=new_block.id,
        name=new_block.name,
        description=new_block.description,
        category=new_block.category,
        tags=new_block.tags if isinstance(new_block.tags, list) else [],
        author=new_block.author,
        preview=new_block.preview,
        blocks=new_block.json_config if isinstance(new_block.json_config, list) else [],
        is_custom=new_block.is_custom,
        created_at=new_block.created_at
    )


@router.post("/ready", response_model=BlockResponse)
async def create_ready_block(block_data: BlockCreate, db: Session = Depends(get_db)):
    """
    Создает готовый (системный) блок на основе JSON-конфигурации
    """
    for block in block_data.blocks:
        if not BlockRenderService.validate_block(block):
            raise HTTPException(
                status_code=400,
                detail=f"Некорректная структура блока: {block.get('id', 'unknown')}"
            )

    new_block = Block(
        name=block_data.name,
        description=block_data.description,
        category=block_data.category,
        tags=block_data.tags or [],
        json_config=block_data.blocks,
        preview=block_data.preview,
        author=block_data.author or "system",
        is_custom=False,
        is_public=True,
    )

    db.add(new_block)
    db.commit()
    db.refresh(new_block)

    return BlockResponse(
        id=new_block.id,
        name=new_block.name,
        description=new_block.description,
        category=new_block.category,
        tags=new_block.tags if isinstance(new_block.tags, list) else [],
        author=new_block.author,
        preview=new_block.preview,
        blocks=new_block.json_config if isinstance(new_block.json_config, list) else [],
        is_custom=new_block.is_custom,
        created_at=new_block.created_at,
    )


@router.put("/block/{block_id}", response_model=BlockResponse)
async def update_block(
    block_id: int,
    block_data: BlockUpdate,
    db: Session = Depends(get_db)
):
    """
    Обновляет пользовательский блок
    """
    block = db.query(Block).filter(Block.id == block_id).first()
    
    if not block:
        raise HTTPException(status_code=404, detail="Блок не найден")
    
    if not block.is_custom:
        raise HTTPException(status_code=403, detail="Нельзя редактировать системные блоки")
    
    # Обновляем поля
    if block_data.name is not None:
        block.name = block_data.name
    if block_data.description is not None:
        block.description = block_data.description
    if block_data.category is not None:
        block.category = block_data.category
    if block_data.tags is not None:
        block.tags = block_data.tags
    if block_data.blocks is not None:
        # Валидация блоков
        for b in block_data.blocks:
            if not BlockRenderService.validate_block(b):
                raise HTTPException(
                    status_code=400,
                    detail=f"Некорректная структура блока: {b.get('id', 'unknown')}"
                )
        block.json_config = block_data.blocks
    if block_data.preview is not None:
        block.preview = block_data.preview
    
    db.commit()
    db.refresh(block)
    
    return BlockResponse(
        id=block.id,
        name=block.name,
        description=block.description,
        category=block.category,
        tags=block.tags if isinstance(block.tags, list) else [],
        author=block.author,
        preview=block.preview,
        blocks=block.json_config if isinstance(block.json_config, list) else [],
        is_custom=block.is_custom,
        created_at=block.created_at
    )


@router.delete("/block/{block_id}")
async def delete_block(block_id: int, db: Session = Depends(get_db)):
    """
    Удаляет пользовательский блок
    """
    block = db.query(Block).filter(Block.id == block_id).first()
    
    if not block:
        raise HTTPException(status_code=404, detail="Блок не найден")
    
    if not block.is_custom:
        raise HTTPException(status_code=403, detail="Нельзя удалять системные блоки")
    
    db.delete(block)
    db.commit()
    
    return {"message": "Блок успешно удален"}


