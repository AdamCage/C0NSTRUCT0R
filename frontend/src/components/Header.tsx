import { Box, HStack, Image, Text } from '@chakra-ui/react';
import { useProjectStore } from '../store/useProjectStore';

export const Header = () => {
  const { project, selectBlock, isPreviewMode } = useProjectStore();
  const { header } = project;

  const handleClick = () => {
    if (!isPreviewMode) {
      selectBlock('header');
    }
  };

  return (
    <Box
      backgroundColor={header.backgroundColor || '#ffffff'}
      color={header.textColor || '#000000'}
      padding="15px 20px"
      borderBottom="1px solid #e0e0e0"
      cursor={isPreviewMode ? 'default' : 'pointer'}
      onClick={handleClick}
      _hover={{
        outline: !isPreviewMode ? '1px dashed #ccc' : 'none',
      }}
    >
      <HStack gap="15px">
        {header.logoUrl && (
          <Image src={header.logoUrl} alt="Logo" height="40px" objectFit="contain" />
        )}
        <Text fontSize="20px" fontWeight="bold">
          {header.companyName || 'Моя компания'}
        </Text>
      </HStack>
    </Box>
  );
};




