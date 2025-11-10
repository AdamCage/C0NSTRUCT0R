import type { Block } from '../../types';

export interface LibraryBlock {
  id: string;
  name: string;
  description?: string;
  category: string;
  tags?: string[];
  author?: string;
  preview?: string;
  blocks: Block[];
  isCustom?: boolean;
  createdAt: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function getSystemBlocks(): Promise<LibraryBlock[]> {
  const response = await fetch(`${API_BASE_URL}/api/library/system-blocks`);
  if (!response.ok) {
    throw new Error('Ошибка загрузки системных блоков');
  }
  return response.json();
}

export async function getUserBlocks(): Promise<LibraryBlock[]> {
  const response = await fetch(`${API_BASE_URL}/api/library/user-blocks`);
  if (!response.ok) {
    throw new Error('Ошибка загрузки пользовательских блоков');
  }
  return response.json();
}

export interface UploadBlockRequest {
  name: string;
  description?: string;
  category: string;
  tags?: string[];
  blocks: Block[];
}

export async function uploadBlock(request: UploadBlockRequest): Promise<LibraryBlock> {
  const response = await fetch(`${API_BASE_URL}/api/library/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Ошибка загрузки блока' }));
    throw new Error(error.message || 'Ошибка загрузки блока');
  }

  return response.json();
}


