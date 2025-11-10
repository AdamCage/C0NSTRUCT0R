import { useEffect, useRef } from 'react';
import { useWebSocketStore } from '../store/useWebSocketStore';
import { useProjectStore } from '../store/useProjectStore';

/**
 * Хук отправляет позицию курсора и текущий выбранный блок раз в 500мс.
 * Используются координаты viewport (clientX/clientY).
 */
export function usePresence(enabled: boolean = true) {
  const { sendMessage, isConnected, userId, userName } = useWebSocketStore();
  const { selectedBlockId } = useProjectStore();
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const lastSent = useRef<{ x: number; y: number; blockId: string | null } | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      lastPos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => {
      if (!isConnected) return;
      const pos = lastPos.current;
      if (!pos) return;
      const payload = {
        userId,
        userName,
        x: pos.x,
        y: pos.y,
        blockId: selectedBlockId ?? undefined,
      };
      // Skip if unchanged to reduce noise
      if (
        lastSent.current &&
        lastSent.current.x === pos.x &&
        lastSent.current.y === pos.y &&
        lastSent.current.blockId === (selectedBlockId ?? null)
      ) {
        return;
      }
      lastSent.current = { x: pos.x, y: pos.y, blockId: selectedBlockId ?? null };
      sendMessage({ type: 'cursor_update', payload });
    }, 500);
    return () => clearInterval(interval);
  }, [enabled, isConnected, sendMessage, selectedBlockId, userId, userName]);
}