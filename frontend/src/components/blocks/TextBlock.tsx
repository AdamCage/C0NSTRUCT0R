import { Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import type { TextBlock as TextBlockType } from '../../types';
import { useProjectStore } from '../../store/useProjectStore';
import { executeBlockEventFunctions } from '../../lib/functionExecutor';

interface TextBlockProps {
  block: TextBlockType;
  isSelected: boolean;
  isPreview: boolean;
}

export const TextBlock = ({ block, isSelected, isPreview }: TextBlockProps) => {
  const { selectBlock, updateBlock, deleteBlock, project } = useProjectStore();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const blockRef = useRef<HTMLDivElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (blockRef.current) {
      blockRef.current.setAttribute('data-block-id', block.id);
    }
  }, [block.id]);

  // Синхронизируем отображаемый текст с состоянием блока, когда не редактируем
  useEffect(() => {
    if (!isEditing && contentRef.current) {
      contentRef.current.textContent = block.content ?? '';
    }
  }, [block.content, isEditing]);

  const handleClick = (e: React.MouseEvent) => {
    if (isPreview) {
      if (block.events?.onClick) {
        e.stopPropagation();
        executeBlockEventFunctions(block.id, 'onClick', block.events);
      }
    } else {
      e.stopPropagation();
      selectBlock(block.id);
    }
  };

  const handleMouseEnter = () => {
    if (isPreview && block.events?.onHover) {
      executeBlockEventFunctions(block.id, 'onHover', block.events);
    }
  };

  const handleBlur = () => {
    const newContent = contentRef.current?.textContent || '';
    updateBlock(block.id, { content: newContent });
    setIsEditing(false);
  };

  return (
    <Box
      id={block.htmlId || undefined}
      ref={blockRef}
      position="relative"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      data-block-id={block.id}
      _hover={{
        '& .delete-btn': {
          display: !isPreview ? 'block' : 'none',
        },
        border: !isPreview ? '1px dashed #ccc' : 'none',
      }}
      style={{
        boxShadow: isSelected && !isPreview ? `0 0 0 2px ${project.theme.accent}` : 'none',
        cursor: isPreview && block.events?.onClick ? 'pointer' : 'default',
      }}
    >
      <Box
        contentEditable={!isPreview}
        suppressContentEditableWarning
        onInput={() => {
          // Не обновляем стор на каждый ввод, чтобы не терять позицию курсора
        }}
        onFocus={() => setIsEditing(true)}
        onBlur={handleBlur}
        fontSize={block.style.fontSize}
        color={block.style.color}
        textAlign={block.style.textAlign}
        fontWeight={block.style.fontWeight}
        backgroundColor={block.style.backgroundColor}
        padding={block.style.padding}
        margin={block.style.margin}
        width={block.style.width}
        style={{
          cursor: isPreview ? 'default' : 'text',
          minHeight: '30px',
        }}
        _hover={{
          outline: !isPreview ? '1px dashed #ccc' : 'none',
        }}
        ref={contentRef}
      >
        {/* Контент устанавливается напрямую через ref, чтобы избежать сброса курсора */}
      </Box>

      {!isPreview && (
        <Box
          className="delete-btn"
          position="absolute"
          top="5px"
          right="5px"
          backgroundColor="red"
          color="white"
          padding="5px 10px"
          borderRadius="4px"
          cursor="pointer"
          display="none"
          zIndex={10}
          onClick={(e) => {
            e.stopPropagation();
            deleteBlock(block.id);
          }}
        >
          🗑 Удалить
        </Box>
      )}
    </Box>
  );
};

