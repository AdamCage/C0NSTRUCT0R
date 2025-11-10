import { useState } from 'react';
import {
  Box,
  VStack,
  Textarea,
  Button,
  Heading,
  Text,
  Spinner,
  Alert,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { generateLanding } from '../lib/api/generateLanding';
import { useGenerateStore } from '../store/useGenerateStore';
import { useProjectStore } from '../store/useProjectStore';
import { applyPaletteToProject } from '../lib/applyPalette';

const BLOCK_CATEGORIES = [
  { value: 'hero', label: 'Hero секция' },
  { value: 'features', label: 'Особенности' },
  { value: 'testimonials', label: 'Отзывы' },
  { value: 'pricing', label: 'Цены' },
  { value: 'cta', label: 'Призыв к действию' },
  { value: 'about', label: 'О нас' },
  { value: 'contact', label: 'Контакты' },
];

export const GeneratePage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { isLoading, error, setLoading, setError, setGenerated } = useGenerateStore();
  const { addTemplateBlocks, updateTheme } = useProjectStore();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Введите описание лендинга');
      return;
    }

    setLoading(true);
    try {
      const response = await generateLanding({
        prompt: prompt.trim(),
        categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      });

      setGenerated(response);

      // Применяем палитру к проекту
      if (response.palette) {
        applyPaletteToProject(response.palette, updateTheme);
      }

      // Добавляем блоки в проект
      if (response.blocks.length > 0) {
        addTemplateBlocks(response.blocks);
      }

      // Переходим в редактор
      navigate('/editor');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка генерации');
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <Box minHeight="100vh" backgroundColor="#f5f5f5" padding="40px 20px">
      <Box maxWidth="800px" margin="0 auto">
        <VStack gap="24px" align="stretch">
          <Heading size="xl" textAlign="center">
            🧠 Генерация лендинга с помощью AI
          </Heading>

          <Text color="gray.600" textAlign="center">
            Опишите, какой лендинг вы хотите создать, и AI сгенерирует его для вас
          </Text>

          <VStack gap="16px" align="stretch">
            <Box>
              <Text mb="8px" fontWeight="medium">
                Описание лендинга
              </Text>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Например: Создай лендинг для интернет-магазина электроники с hero-секцией, каталогом товаров и формой обратной связи"
                minHeight="120px"
                backgroundColor="white"
              />
            </Box>

            <Box>
              <Text mb="8px" fontWeight="medium">
                Категории блоков (опционально)
              </Text>
              <HStack gap="8px" flexWrap="wrap">
                {BLOCK_CATEGORIES.map((category) => (
                  <Badge
                    key={category.value}
                    as="button"
                    onClick={() => toggleCategory(category.value)}
                    padding="8px 16px"
                    borderRadius="full"
                    cursor="pointer"
                    backgroundColor={
                      selectedCategories.includes(category.value)
                        ? 'blue.500'
                        : 'gray.200'
                    }
                    color={
                      selectedCategories.includes(category.value)
                        ? 'white'
                        : 'gray.700'
                    }
                    _hover={{
                      backgroundColor: selectedCategories.includes(category.value)
                        ? 'blue.600'
                        : 'gray.300',
                    }}
                  >
                    {category.label}
                  </Badge>
                ))}
              </HStack>
            </Box>

            {error && (
              <Alert.Root status="error">
                <Box as="span" marginRight="8px">⚠️</Box>
                <Alert.Description>{error}</Alert.Description>
              </Alert.Root>
            )}

            <Button
              onClick={handleGenerate}
              loading={isLoading}
              loadingText="Генерация..."
              colorScheme="blue"
              size="lg"
              width="100%"
              disabled={!prompt.trim() || isLoading}
            >
              {isLoading ? (
                <HStack gap="8px">
                  <Spinner size="sm" />
                  <Text>Генерация...</Text>
                </HStack>
              ) : (
                'Сгенерировать лендинг'
              )}
            </Button>

            <Button
              onClick={() => navigate('/editor')}
              variant="outline"
              size="md"
              width="100%"
            >
              Вернуться в редактор
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};


