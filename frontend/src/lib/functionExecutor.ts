/**
 * Исполнитель функций для блоков
 * Выполняет привязанные функции при срабатывании событий
 */

import { useFunctionsStore } from '../store/useFunctionsStore';
import { executeAction } from './actions';
import type { ProjectFunction, TriggerType } from '../types';

/**
 * Выполняет функции, привязанные к событию блока
 */
export function executeBlockFunctions(
  blockId: string,
  trigger: TriggerType,
  functions: ProjectFunction[]
): void {
  // Получаем все функции, которые должны выполниться для этого блока и события
  const block = document.querySelector(`[data-block-id="${blockId}"]`);
  if (!block) return;

  // Находим функции, привязанные к этому блоку и событию
  const relevantFunctions = functions.filter((fn) => {
    if (!fn.enabled) return false;
    
    // Функция должна соответствовать триггеру
    if (fn.trigger !== trigger) return false;
    
    // Функция должна быть привязана к этому блоку или быть глобальной
    if (fn.blockId && fn.blockId !== blockId) return false;
    if (!fn.blockId) {
      // Глобальная функция - проверяем, есть ли она в events блока
      // Если функция глобальная, она выполнится только если явно указана в events
      return false; // Глобальные функции не выполняются автоматически через events
    }
    
    return true;
  });

  // Выполняем каждую функцию
  relevantFunctions.forEach((fn) => {
    try {
      // Выполняем условия (если есть)
      let shouldExecute = true;
      
      if (fn.conditions && fn.conditions.length > 0) {
        // Простая проверка условий (можно расширить)
        shouldExecute = fn.conditions.every((condition) => {
          if (condition.expression) {
            // Выполняем кастомное выражение (осторожно с eval!)
            try {
              return eval(condition.expression);
            } catch {
              return false;
            }
          }
          return true;
        });
      }
      
      if (shouldExecute) {
        // Выполняем действия
        fn.actions.forEach((action) => {
          if (action.type === 'custom' && action.code) {
            // Выполняем кастомный код
            try {
              const func = new Function('block', 'event', action.code);
              func(block, trigger);
            } catch (error) {
              console.error('Ошибка выполнения кастомного действия:', error);
            }
          } else {
            // Выполняем стандартное действие
            executeAction(action.type, {
              ...action.args,
              selector: `[data-block-id="${blockId}"]`,
            });
          }
        });
      }
    } catch (error) {
      console.error(`Ошибка выполнения функции ${fn.name}:`, error);
    }
  });
}

/**
 * Получает функции, привязанные к блоку через events
 */
export function getBlockEventFunctions(
  trigger: TriggerType,
  functions: ProjectFunction[],
  blockEvents?: { [key in TriggerType]?: string[] }
): ProjectFunction[] {
  if (!blockEvents || !blockEvents[trigger]) {
    return [];
  }
  
  const functionIds = blockEvents[trigger] || [];
  return functions.filter((fn) => functionIds.includes(fn.id) && fn.enabled);
}

/**
 * Выполняет функции из events блока
 */
export function executeBlockEventFunctions(
  blockId: string,
  trigger: TriggerType,
  blockEvents?: { [key in TriggerType]?: string[] }
): void {
  const { functions } = useFunctionsStore.getState();
  const relevantFunctions = getBlockEventFunctions(trigger, functions, blockEvents);
  
  relevantFunctions.forEach((fn) => {
    try {
      // Проверяем условия
      let shouldExecute = true;
      
      if (fn.conditions && fn.conditions.length > 0) {
        shouldExecute = fn.conditions.every((condition) => {
          if (condition.expression) {
            try {
              return eval(condition.expression);
            } catch {
              return false;
            }
          }
          return true;
        });
      }
      
      if (shouldExecute) {
        // Выполняем действия
        fn.actions.forEach((action) => {
          if (action.type === 'custom' && action.code) {
            const block = document.querySelector(`[data-block-id="${blockId}"]`);
            if (block) {
              try {
                const func = new Function('block', 'event', action.code);
                func(block, trigger);
              } catch (error) {
                console.error('Ошибка выполнения кастомного действия:', error);
              }
            }
          } else {
            executeAction(action.type, {
              ...action.args,
              selector: `[data-block-id="${blockId}"]`,
            });
          }
        });
      }
    } catch (error) {
      console.error(`Ошибка выполнения функции ${fn.name}:`, error);
    }
  });
}


