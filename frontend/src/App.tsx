import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Flex, ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { useProjectStore } from './store/useProjectStore';
import { useTemplatesStore } from './store/useTemplatesStore';
import { useFunctionsStore } from './store/useFunctionsStore';
import { Toolbar } from './components/Toolbar';
import { BlocksPanel } from './components/BlocksPanel';
import { Workspace } from './components/Workspace';
import { PropertiesPanel } from './components/PropertiesPanel';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DndProvider } from './components/DndProvider';
import { RoomConnection } from './components/RoomConnection';
import { useWebSocketSync } from './lib/useWebSocketSync';
import { GeneratePage } from './pages/GeneratePage';
import { LibraryPage } from './pages/LibraryPage';
import { AddBlockPage } from './pages/AddBlockPage';

function EditorLayout() {
  const { loadFromLocalStorage, isPreviewMode } = useProjectStore();
  const { loadFromLocalStorage: loadTemplates } = useTemplatesStore();
  const { loadFromLocalStorage: loadFunctions } = useFunctionsStore();
  
  // Инициализация синхронизации через WebSocket
  useWebSocketSync();

  useEffect(() => {
    // Загружаем проект из LocalStorage при старте
    loadFromLocalStorage();
    // Загружаем шаблоны из LocalStorage при старте
    loadTemplates();
    // Загружаем функции из LocalStorage при старте
    loadFunctions();
  }, [loadFromLocalStorage, loadTemplates, loadFunctions]);

  if (isPreviewMode) {
    // Режим предпросмотра - только контент без панелей
    return (
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <Header />
        <Workspace />
        <Footer />
      </Box>
    );
  }

  // Режим редактора - все панели
  return (
    <DndProvider>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <RoomConnection />
        <Toolbar />
        <Flex flex="1" overflow="hidden">
          <BlocksPanel />
          <Box flex="1" display="flex" flexDirection="column" overflow="hidden">
            <Header />
            <Workspace />
            <Footer />
          </Box>
          <PropertiesPanel />
        </Flex>
      </Box>
    </DndProvider>
  );
}

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <Routes>
          <Route path="/editor" element={<EditorLayout />} />
          <Route path="/generate" element={<GeneratePage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/library/add" element={<AddBlockPage />} />
          <Route path="/" element={<Navigate to="/editor" replace />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
