import { Box, Text } from '@chakra-ui/react';
import { useProjectStore } from '../store/useProjectStore';

export const Footer = () => {
  const { project, selectBlock, isPreviewMode } = useProjectStore();
  const { footer } = project;

  const handleClick = () => {
    if (!isPreviewMode) {
      selectBlock('footer');
    }
  };

  return (
    <Box
      backgroundColor={footer.backgroundColor || '#f5f5f5'}
      color={footer.textColor || '#000000'}
      padding="20px"
      textAlign="center"
      borderTop="1px solid #e0e0e0"
      cursor={isPreviewMode ? 'default' : 'pointer'}
      onClick={handleClick}
      _hover={{
        outline: !isPreviewMode ? '1px dashed #ccc' : 'none',
      }}
    >
      <Text>{footer.text || '© 2025 My Landing'}</Text>
    </Box>
  );
};




