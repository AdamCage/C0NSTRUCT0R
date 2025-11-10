import {
  Dialog,
  Button,
  VStack,
  Text,
  Badge,
  HStack,
  Box,
} from '@chakra-ui/react';
import { useLibraryStore } from '../store/useLibraryStore';
import { useProjectStore } from '../store/useProjectStore';
import { BlockRenderer } from './blocks/BlockRenderer';
import { useNavigate } from 'react-router-dom';

interface BlockPreviewModalProps {
  blockId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const BlockPreviewModal = ({ blockId, isOpen, onClose }: BlockPreviewModalProps) => {
  const { systemBlocks, userBlocks } = useLibraryStore();
  const { addTemplateBlocks } = useProjectStore();
  const navigate = useNavigate();

  const allBlocks = [...systemBlocks, ...userBlocks];
  const block = allBlocks.find((b) => b.id === blockId);

  if (!block) {
    return null;
  }

  const handleAddToProject = () => {
    if (block.blocks.length > 0) {
      addTemplateBlocks(block.blocks);
      onClose();
      navigate('/editor');
    }
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open) onClose();
      }}
    >
      <Dialog.Backdrop />
      <Dialog.Content maxW="xl">
        <Button
          variant="ghost"
          position="absolute"
          top="3"
          right="3"
          onClick={onClose}
        >
          ✕
        </Button>
        <VStack gap="8px" align="stretch">
          <VStack gap="8px" align="stretch">
            <Text fontSize="xl" fontWeight="bold">
              {block.name}
            </Text>
            <HStack gap="8px">
              <Badge colorScheme="blue">{block.category}</Badge>
              {block.isCustom && <Badge colorScheme="green">Мой блок</Badge>}
              {block.tags && block.tags.length > 0 && (
                <HStack gap="4px">
                  {block.tags.map((tag) => (
                    <Badge key={tag} fontSize="10px" colorScheme="gray">
                      {tag}
                    </Badge>
                  ))}
                </HStack>
              )}
            </HStack>
          </VStack>

          <VStack gap="16px" align="stretch">
            {block.description && (
              <Text color="gray.600">{block.description}</Text>
            )}

            <Box
              padding="24px"
              backgroundColor="#f5f5f5"
              borderRadius="8px"
              border="1px solid"
              borderColor="gray.200"
            >
              <Text mb="12px" fontWeight="medium" fontSize="14px">
                Предпросмотр:
              </Text>
              {block.blocks.map((b) => (
                <Box key={b.id} mb="12px">
                  <BlockRenderer block={b} isPreview={true} />
                </Box>
              ))}
            </Box>

            <HStack gap="12px" justify="flex-end">
              <Button variant="outline" onClick={onClose}>
                Закрыть
              </Button>
              <Button colorScheme="blue" onClick={handleAddToProject}>
                Добавить в проект
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </Dialog.Content>
    </Dialog.Root>
  );
};


