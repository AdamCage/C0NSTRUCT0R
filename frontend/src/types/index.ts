export type BlockType = 'text' | 'image' | 'button' | 'video' | 'container' | 'grid';

export interface BlockStyle {
  color?: string;
  fontSize?: string;
  textAlign?: 'left' | 'center' | 'right';
  fontWeight?: 'normal' | 'bold';
  backgroundColor?: string;
  margin?: string;
  padding?: string;
  width?: string;
  borderRadius?: string; // px value like '8px'
}

export interface BaseBlock {
  id: string;
  type: BlockType;
  style: BlockStyle;
  // Пользовательский HTML id для DOM-элемента блока
  htmlId?: string;
  // Привязка функций к событиям блока
  events?: {
    [key in TriggerType]?: string[]; // Массив ID функций для каждого типа события
  };
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  content: string;
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  url: string;
}

export interface ButtonBlock extends BaseBlock {
  type: 'button';
  text: string;
  link: string;
  buttonColor?: string;
  variant?: 'solid' | 'radio' | 'checkbox';
}

export interface VideoBlock extends BaseBlock {
  type: 'video';
  url: string;
}

export interface ContainerBlock extends BaseBlock {
  type: 'container';
  children: Block[];
}

export interface GridBlock extends BaseBlock {
  type: 'grid';
  // Настройки сетки (этап 1-2 ТЗ)
  settings: {
    columns: number;
    rows: number;
    gapX: number;
    gapY: number;
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
    placementType?: 'auto' | 'fixed' | 'fraction';
    // Границы ячеек
    showCellBorders?: boolean;
    cellBorderColor?: string;
    cellBorderWidth?: number; // px
  };
  // Ячейки сетки с индивидуальными настройками
  cells: GridCell[];
}

// Ячейка сетки: одна сущность и индивидуальное выравнивание
export interface GridCell {
  block: Block | null;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'stretch';
}

export type Block = TextBlock | ImageBlock | ButtonBlock | VideoBlock | ContainerBlock | GridBlock;

export interface Header {
  logoUrl?: string;
  companyName?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface Footer {
  text: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface Project {
  projectName: string;
  header: Header;
  blocks: Block[];
  footer: Footer;
  theme: Theme;
}

// Готовые блоки (шаблоны)
export interface BlockTemplate {
  id: string;
  name: string;
  description?: string;
  category?: string;
  preview?: string; // URL превью изображения или base64
  blocks: Block[]; // Составной блок содержит массив базовых блоков
  createdAt: number;
  isCustom?: boolean; // Пользовательский шаблон или системный
}

// Глобальная тема проекта
export interface Theme {
  mode: 'light' | 'dark';
  accent: string; // Акцентный цвет (кнопки, выделения)
  text: string; // Основной цвет текста
  heading: string; // Цвет заголовков
  background: string; // Цвет фона страницы
  surface: string; // Цвет фона поверхностей (карточки, панели)
  border: string; // Цвет границ
}

// Типы для модуля функций и визуального программирования

// Типы триггеров событий
export type TriggerType = 'onClick' | 'onHover' | 'onLoad' | 'onScroll' | 'onFocus' | 'onBlur' | 'onChange' | 'onSubmit';

// Типы действий
export type ActionType = 
  | 'changeTheme' 
  | 'redirect' 
  | 'popup' 
  | 'scrollTo' 
  | 'toggle' 
  | 'show' 
  | 'hide' 
  | 'animate' 
  | 'setValue' 
  | 'log'
  | 'custom';

// Условие для выполнения действия
export interface Condition {
  id: string;
  field?: string; // Поле для проверки
  operator?: 'equals' | 'notEquals' | 'greaterThan' | 'lessThan' | 'contains' | 'isEmpty';
  value?: any; // Значение для сравнения
  expression?: string; // Кастомное выражение (для кодового режима)
}

// Действие функции
export interface Action {
  id: string;
  type: ActionType;
  name: string; // Название действия (например, "Открыть попап")
  args: Record<string, any>; // Аргументы действия
  code?: string; // Код для кастомного действия
}

// Функция проекта
export interface ProjectFunction {
  id: string;
  name: string; // Название функции
  description?: string; // Описание
  trigger: TriggerType; // Тип триггера
  blockId: string | null; // ID блока, к которому привязана функция (null = глобальная)
  conditions: Condition[]; // Условия выполнения
  actions: Action[]; // Действия для выполнения
  type: 'visual' | 'code'; // Режим редактирования
  code?: string; // Код функции (для кодового режима)
  enabled: boolean; // Включена ли функция
  createdAt: number;
  updatedAt: number;
}

