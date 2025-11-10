import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@chakra-ui/react';
import type { Block } from '../types';
import { BlockRenderer } from './blocks/BlockRenderer';
import { useProjectStore } from '../store/useProjectStore';

interface SortableBlockProps {
  block: Block;
  isPreview: boolean;
}

export const SortableBlock = ({ block, isPreview }: SortableBlockProps) => {
  const { selectBlock } = useProjectStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
    disabled: isPreview,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isPreview && !isDragging) {
      e.stopPropagation();
      selectBlock(block.id);
    }
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      onClick={handleClick}
      position="relative"
      cursor={isPreview ? 'default' : isDragging ? 'grabbing' : 'pointer'}
      _hover={{
        '& .drag-handle': {
          display: !isPreview ? 'flex' : 'none',
        },
      }}
    >
      {!isPreview && (
        <Box
          className="drag-handle"
          position="absolute"
          left="0"
          top="50%"
          transform="translateY(-50%)"
          display="none"
          width="24px"
          height="24px"
          backgroundColor="#f5f5f5"
          border="1px solid #ddd"
          borderRadius="4px"
          color="#555"
          cursor="grab"
          fontSize="16px"
          zIndex={10}
          alignItems="center"
          justifyContent="center"
          onMouseDown={(e) => e.stopPropagation()}
          aria-label="Перетащить блок"
          {...attributes}
          {...listeners}
        >
          ⋮⋮
        </Box>
      )}
      <BlockRenderer block={block} isPreview={isPreview} />
    </Box>
  );
};


