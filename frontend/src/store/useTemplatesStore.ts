import { create } from 'zustand';
import type { BlockTemplate, Block } from '../types';
import { theme } from '../styles/theme';

const TEMPLATES_STORAGE_KEY = 'landing-constructor-templates';

// Системные готовые блоки по умолчанию (переработаны: более сложные, многосекционные)
const defaultTemplates: BlockTemplate[] = [
  {
    id: 'template-hero-1',
    name: 'Hero — Split + CTA',
    description: 'Двухколоночный hero: текст + изображение',
    category: 'Hero',
    blocks: [
      {
        id: 'temp-container-hero-1',
        type: 'container',
        style: {
          padding: theme.spacing['3xl'],
          backgroundColor: theme.colors.surfaceAlt,
          margin: `${theme.spacing.xl} 0`,
          width: '100%'
        },
        children: [
          {
            id: 'temp-grid-hero-1',
            type: 'grid',
            style: { margin: '0', padding: '0', width: '100%' },
            settings: {
              columns: 2,
              rows: 1,
              gapX: 16,
              gapY: 16,
              align: 'stretch',
              justify: 'start',
              placementType: 'fraction',
              showCellBorders: false,
            },
            cells: [
              {
                block: {
                  id: 'temp-hero-1-left',
                  type: 'container',
                  style: { padding: theme.spacing.md, backgroundColor: theme.colors.surface, margin: '0', width: '100%' },
                  children: [
                    {
                      id: 'temp-hero-1-title',
                      type: 'text',
                      content: 'Создайте идеальный сайт',
                      style: { fontSize: '48px', fontWeight: 'bold', textAlign: 'left', color: theme.colors.textPrimary, margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs },
                    } as Block,
                    {
                      id: 'temp-hero-1-subtitle',
                      type: 'text',
                      content: 'Профессиональный конструктор для красивых лендингов',
                      style: { fontSize: '18px', textAlign: 'left', color: theme.colors.textSecondary, margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs },
                    } as Block,
                    {
                      id: 'temp-hero-1-cta',
                      type: 'button',
                      text: 'Попробовать бесплатно',
                      link: '#',
                      buttonColor: theme.colors.primary,
                      style: { textAlign: 'left', margin: `${theme.spacing.sm} 0`, padding: theme.spacing.md },
                    } as Block,
                  ],
                } as Block,
              },
              {
                block: {
                  id: 'temp-hero-1-right-img',
                  type: 'image',
                  url: '',
                  style: { width: '100%', margin: '0', padding: '0' },
                } as Block,
              },
            ],
          } as Block,
        ],
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-cta-1',
    name: 'CTA блок',
    description: 'Призыв к действию',
    category: 'CTA',
    blocks: [
      {
        id: 'temp-container-cta-1',
        type: 'container',
        style: {
          padding: theme.spacing.lg,
          backgroundColor: theme.colors.highlightBlue,
          margin: `${theme.spacing.lg} 0`,
          width: '100%'
        },
        children: [
          {
            id: 'temp-text-2',
            type: 'text',
            content: 'Готовы начать?',
            style: {
              fontSize: '32px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: theme.colors.textPrimary,
              margin: `${theme.spacing.lg} 0`,
              padding: theme.spacing.lg,
            },
          } as Block,
          {
            id: 'temp-button-2',
            type: 'button',
            text: 'Связаться с нами',
            link: '#',
            buttonColor: theme.colors.success,
            style: {
              textAlign: 'center',
              margin: `${theme.spacing.md} 0`,
              padding: theme.spacing.md,
            },
          } as Block,
        ],
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-text-image-1',
    name: 'Текст + Изображение',
    description: 'Текстовый блок с изображением',
    category: 'Content',
    blocks: [
      {
        id: 'temp-container-text-image-1',
        type: 'container',
        style: {
          padding: theme.spacing.md,
          backgroundColor: theme.colors.surface,
          margin: `${theme.spacing.lg} 0`,
          width: '100%'
        },
        children: [
          {
            id: 'temp-text-3',
            type: 'text',
            content: 'О нас',
            style: {
              fontSize: '36px',
              fontWeight: 'bold',
              textAlign: 'left',
              color: theme.colors.textPrimary,
              margin: `${theme.spacing.lg} 0`,
              padding: theme.spacing.sm,
            },
          } as Block,
          {
            id: 'temp-text-4',
            type: 'text',
            content: 'Мы команда профессионалов, которая создает качественные решения.',
            style: {
              fontSize: '18px',
              textAlign: 'left',
              color: theme.colors.textSecondary,
              margin: `${theme.spacing.sm} 0`,
              padding: theme.spacing.sm,
            },
          } as Block,
          {
            id: 'temp-image-1',
            type: 'image',
            url: '',
            style: {
              width: '100%',
              margin: `${theme.spacing.lg} 0`,
              padding: theme.spacing.sm,
            },
          } as Block,
        ],
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-features-1',
    name: 'Преимущества — сетка 3×2',
    description: 'Шесть карточек с иконкой и описанием',
    category: 'Features',
    blocks: [
      {
        id: 'temp-container-features-1',
        type: 'container',
        style: { padding: theme.spacing['2xl'], backgroundColor: theme.colors.surface, margin: `${theme.spacing.xl} 0`, width: '100%' },
        children: [
          {
            id: 'temp-features-title',
            type: 'text',
            content: 'Наши преимущества',
            style: { fontSize: '36px', fontWeight: 'bold', textAlign: 'center', color: theme.colors.textPrimary, margin: `${theme.spacing.sm} 0`, padding: theme.spacing.sm },
          } as Block,
      {
        id: 'temp-features-grid',
        type: 'grid',
        style: { margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs, width: '100%' },
        settings: { columns: 3, rows: 2, gapX: 16, gapY: 16, align: 'stretch', justify: 'start', placementType: 'fraction', showCellBorders: true, cellBorderColor: theme.colors.border, cellBorderWidth: 1 },
            cells: Array.from({ length: 6 }).map((_, i) => ({
              block: {
                id: `temp-feature-card-${i + 1}`,
                type: 'container',
                 style: { padding: theme.spacing.sm, backgroundColor: theme.colors.surfaceMuted, margin: '0', width: '100%' },
                children: [
                   { id: `temp-feature-icon-${i + 1}`, type: 'image', url: '', style: { width: '100%', margin: '0', padding: theme.spacing.xs } } as Block,
                   { id: `temp-feature-title-${i + 1}`, type: 'text', content: `Преимущество ${i + 1}`, style: { fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: theme.colors.textPrimary, margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs } } as Block,
                   { id: `temp-feature-desc-${i + 1}`, type: 'text', content: 'Краткое описание преимущества', style: { fontSize: '14px', textAlign: 'center', color: theme.colors.textSecondary, margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs } } as Block,
                ],
              } as Block,
            })),
          } as Block,
        ],
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-video-1',
    name: 'Видео блок',
    description: 'Блок с видео',
    category: 'Media',
    blocks: [
      {
        id: 'temp-container-video-1',
        type: 'container',
        style: {
          padding: theme.spacing.lg,
          backgroundColor: theme.colors.surface,
          margin: `${theme.spacing.lg} 0`,
          width: '100%'
        },
        children: [
          {
            id: 'temp-text-7',
            type: 'text',
            content: 'Посмотрите наше видео',
            style: {
              fontSize: '32px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: theme.colors.textPrimary,
              margin: `${theme.spacing.lg} 0`,
              padding: theme.spacing.lg,
            },
          } as Block,
          {
            id: 'temp-video-1',
            type: 'video',
            url: '',
            style: {
              width: '100%',
              margin: `${theme.spacing.lg} 0`,
              padding: theme.spacing.md,
            },
          } as Block,
        ],
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-hero-2',
    name: 'Hero с подзаголовком',
    description: 'Большой заголовок с описанием и кнопкой',
    category: 'Hero',
    blocks: [
      {
        id: 'temp-container-hero-2',
        type: 'container',
        style: {
          padding: theme.spacing.xl,
          backgroundColor: theme.colors.surfaceAlt,
          margin: `${theme.spacing.lg} 0`,
          width: '100%'
        },
        children: [
          {
            id: 'temp-text-8',
            type: 'text',
            content: 'Создайте свой идеальный сайт',
            style: {
              fontSize: '56px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: theme.colors.textPrimary,
              margin: `${theme.spacing['2xl']} 0`,
              padding: theme.spacing.lg,
            },
          } as Block,
          {
            id: 'temp-text-9',
            type: 'text',
            content: 'Профессиональный конструктор для создания красивых лендингов',
            style: {
              fontSize: '20px',
              textAlign: 'center',
              color: theme.colors.textMuted,
              margin: `${theme.spacing.md} 0`,
              padding: theme.spacing.md,
            },
          } as Block,
          {
            id: 'temp-button-3',
            type: 'button',
            text: 'Попробовать бесплатно',
            link: '#',
            buttonColor: theme.colors.primary,
            style: {
              textAlign: 'center',
              margin: `${theme.spacing.lg} 0`,
              padding: theme.spacing.md,
            },
          } as Block,
        ],
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-gallery-1',
    name: 'Галерея — сетка 3×2',
    description: 'Шесть изображений в сетке',
    category: 'Media',
    blocks: [
      {
        id: 'temp-container-gallery-1',
        type: 'container',
        style: { padding: theme.spacing.md, backgroundColor: theme.colors.surface, margin: `${theme.spacing.xl} 0`, width: '100%' },
        children: [
          { id: 'temp-gallery-title', type: 'text', content: 'Наша галерея', style: { fontSize: '32px', fontWeight: 'bold', textAlign: 'center', color: theme.colors.textPrimary, margin: `${theme.spacing.sm} 0`, padding: theme.spacing.sm } } as Block,
          {
            id: 'temp-grid-gallery-1',
            type: 'grid',
            style: { margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs, width: '100%' },
            settings: { columns: 3, rows: 2, gapX: 12, gapY: 12, align: 'stretch', justify: 'start', placementType: 'fraction', showCellBorders: true, cellBorderColor: '#e0e0e0', cellBorderWidth: 1 },
            cells: Array.from({ length: 6 }).map((_, i) => ({ block: { id: `temp-image-g-${i + 1}`, type: 'image', url: '', style: { width: '100%', margin: '0', padding: '0' } } as Block })),
          } as Block,
        ],
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-testimonials-1',
    name: 'Отзывы — сетка 3×1',
    description: 'Три карточки отзывов',
    category: 'Content',
    blocks: [
      {
        id: 'temp-container-testimonials-1',
        type: 'container',
        style: { padding: theme.spacing.xl, backgroundColor: theme.colors.surface, margin: `${theme.spacing.xl} 0`, width: '100%' },
        children: [
          { id: 'temp-testimonials-title', type: 'text', content: 'Что говорят наши клиенты', style: { fontSize: '32px', fontWeight: 'bold', textAlign: 'center', color: theme.colors.textPrimary, margin: `${theme.spacing.sm} 0`, padding: theme.spacing.sm } } as Block,
          {
            id: 'temp-testimonials-grid',
            type: 'grid',
            style: { margin: '8px 0', padding: '8px', width: '100%' },
            settings: { columns: 3, rows: 1, gapX: 16, gapY: 16, align: 'stretch', justify: 'start', placementType: 'fraction', showCellBorders: true, cellBorderColor: theme.colors.border, cellBorderWidth: 1 },
            cells: Array.from({ length: 3 }).map((_, i) => ({
              block: {
                id: `temp-testimonial-card-${i + 1}`,
                type: 'container',
                style: { padding: theme.spacing.sm, backgroundColor: theme.colors.surfaceMuted, margin: '0', width: '100%' },
                children: [
                  { id: `temp-testimonial-quote-${i + 1}`, type: 'text', content: 'Отличный сервис! Всё быстро и качественно.', style: { fontSize: '16px', textAlign: 'left', color: theme.colors.textSecondary, margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs } } as Block,
                  { id: `temp-testimonial-author-${i + 1}`, type: 'text', content: 'Иван Иванов', style: { fontSize: '14px', fontWeight: 'bold', textAlign: 'left', color: theme.colors.textPrimary, margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs } } as Block,
                ],
              } as Block,
            })),
          } as Block,
        ],
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-pricing-1',
    name: 'Тарифы — 3 карточки',
    description: 'Три тарифа с кнопкой',
    category: 'Content',
    blocks: [
      {
        id: 'temp-container-pricing-1',
        type: 'container',
        style: { padding: theme.spacing['2xl'], backgroundColor: theme.colors.surface, margin: `${theme.spacing.xl} 0`, width: '100%' },
        children: [
          { id: 'temp-pricing-title', type: 'text', content: 'Наши тарифы', style: { fontSize: '36px', fontWeight: 'bold', textAlign: 'center', color: theme.colors.textPrimary, margin: `${theme.spacing.sm} 0`, padding: theme.spacing.sm } } as Block,
          {
            id: 'temp-pricing-grid',
            type: 'grid',
            style: { margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs, width: '100%' },
            settings: { columns: 3, rows: 1, gapX: 16, gapY: 16, align: 'stretch', justify: 'start', placementType: 'fraction', showCellBorders: true, cellBorderColor: '#e0e0e0', cellBorderWidth: 1 },
            cells: Array.from({ length: 3 }).map((_, i) => ({
              block: {
                id: `temp-pricing-card-${i + 1}`,
                type: 'container',
                style: { padding: theme.spacing.sm, backgroundColor: theme.colors.surfaceMuted, margin: '0', width: '100%' },
                children: [
                  { id: `temp-pricing-name-${i + 1}`, type: 'text', content: ['Базовый', 'Стандарт', 'Премиум'][i], style: { fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: theme.colors.textPrimary, margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs } } as Block,
                  { id: `temp-pricing-price-${i + 1}`, type: 'text', content: ['$9/мес', '$19/мес', '$49/мес'][i], style: { fontSize: '24px', fontWeight: 'bold', textAlign: 'center', color: theme.colors.primary, margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs } } as Block,
                  { id: `temp-pricing-feats-${i + 1}`, type: 'text', content: '✓ Функция 1\n✓ Функция 2\n✓ Функция 3', style: { fontSize: '14px', textAlign: 'center', color: theme.colors.textSecondary, margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs } } as Block,
                  { id: `temp-pricing-cta-${i + 1}`, type: 'button', text: 'Выбрать', link: '#', buttonColor: theme.colors.primary, style: { textAlign: 'center', margin: `${theme.spacing.xs} 0`, padding: theme.spacing.sm } } as Block,
                ],
              } as Block,
            })),
          } as Block,
        ],
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-contact-1',
    name: 'Контакты — 2 колонки',
    description: 'Контакты и форма-рыба',
    category: 'Content',
    blocks: [
      {
        id: 'temp-container-contact-1',
        type: 'container',
        style: { padding: theme.spacing.xl, backgroundColor: theme.colors.surface, margin: `${theme.spacing.xl} 0`, width: '100%' },
        children: [
          { id: 'temp-contact-title', type: 'text', content: 'Свяжитесь с нами', style: { fontSize: '32px', fontWeight: 'bold', textAlign: 'center', color: theme.colors.textPrimary, margin: `${theme.spacing.sm} 0`, padding: theme.spacing.sm } } as Block,
          {
            id: 'temp-contact-grid',
            type: 'grid',
            style: { margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs, width: '100%' },
            settings: { columns: 2, rows: 1, gapX: 16, gapY: 16, align: 'stretch', justify: 'start', placementType: 'fraction', showCellBorders: true, cellBorderColor: '#e0e0e0', cellBorderWidth: 1 },
            cells: [
              { block: { id: 'temp-contact-info', type: 'text', content: 'Email: info@example.com\nТелефон: +7 (999) 123-45-67\nАдрес: Москва, ул. Примерная, 1', style: { fontSize: '16px', textAlign: 'left', color: theme.colors.textSecondary, margin: '0', padding: theme.spacing.xs } } as Block },
              {
                block: {
                  id: 'temp-contact-form',
                  type: 'container',
            style: { padding: theme.spacing.sm, backgroundColor: theme.colors.surfaceMuted, margin: '0', width: '100%' },
                  children: [
              { id: 'temp-form-name', type: 'text', content: 'Имя', style: { fontSize: '14px', textAlign: 'left', color: theme.colors.textPrimary, margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs } } as Block,
              { id: 'temp-form-email', type: 'text', content: 'Email', style: { fontSize: '14px', textAlign: 'left', color: theme.colors.textPrimary, margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs } } as Block,
              { id: 'temp-form-message', type: 'text', content: 'Сообщение', style: { fontSize: '14px', textAlign: 'left', color: theme.colors.textPrimary, margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs } } as Block,
              { id: 'temp-form-send', type: 'button', text: 'Отправить', link: '#', buttonColor: theme.colors.success, style: { textAlign: 'left', margin: `${theme.spacing.xs} 0`, padding: theme.spacing.sm } } as Block,
                  ],
                } as Block,
              },
            ],
          } as Block,
        ],
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-about-1',
    name: 'О компании',
    description: 'О компании — текст + изображение',
    category: 'Content',
    blocks: [
      {
        id: 'temp-container-about-1',
        type: 'container',
        style: { padding: theme.spacing.xl, backgroundColor: theme.colors.surface, margin: `${theme.spacing.xl} 0`, width: '100%' },
        children: [
          { id: 'temp-about-title', type: 'text', content: 'О нашей компании', style: { fontSize: '32px', fontWeight: 'bold', textAlign: 'left', color: theme.colors.textPrimary, margin: `${theme.spacing.sm} 0`, padding: theme.spacing.sm } } as Block,
          {
            id: 'temp-about-grid',
            type: 'grid',
            style: { margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs, width: '100%' },
            settings: { columns: 2, rows: 1, gapX: 16, gapY: 16, align: 'stretch', justify: 'start', placementType: 'fraction', showCellBorders: false },
            cells: [
              { block: { id: 'temp-about-text', type: 'text', content: 'Мы более 10 лет создаём качественные веб‑решения и помогаем бизнесу расти.', style: { fontSize: '18px', textAlign: 'left', color: theme.colors.textSecondary, margin: '0', padding: theme.spacing.xs } } as Block },
              { block: { id: 'temp-about-image', type: 'image', url: '', style: { width: '100%', margin: '0', padding: '0' } } as Block },
            ],
          } as Block,
        ],
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-services-1',
    name: 'Услуги',
    description: '6 услуг — сетка 3×2 с иконками',
    category: 'Content',
    blocks: [
      {
        id: 'temp-container-services-1',
        type: 'container',
        style: { padding: theme.spacing['2xl'], backgroundColor: theme.colors.surface, margin: `${theme.spacing.xl} 0`, width: '100%' },
        children: [
          {
            id: 'temp-services-title',
            type: 'text',
            content: 'Наши услуги',
            style: { fontSize: '36px', fontWeight: 'bold', textAlign: 'center', color: theme.colors.textPrimary, margin: `${theme.spacing.sm} 0`, padding: theme.spacing.sm },
          } as Block,
          {
            id: 'temp-services-grid',
            type: 'grid',
            style: { margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs, width: '100%' },
            settings: { columns: 3, rows: 2, gapX: 16, gapY: 16, align: 'stretch', justify: 'start', placementType: 'fraction', showCellBorders: true, cellBorderColor: theme.colors.border, cellBorderWidth: 1 },
            cells: Array.from({ length: 6 }).map((_, i) => ({
              block: {
                id: `temp-service-card-${i + 1}`,
                type: 'container',
                style: { padding: theme.spacing.sm, backgroundColor: theme.colors.surfaceMuted, margin: '0', width: '100%' },
                children: [
                  { id: `temp-service-icon-${i + 1}`, type: 'image', url: '', style: { width: '100%', margin: '0', padding: theme.spacing.xs } } as Block,
                  { id: `temp-service-title-${i + 1}`, type: 'text', content: `Услуга ${i + 1}`, style: { fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: theme.colors.textPrimary, margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs } } as Block,
                  { id: `temp-service-desc-${i + 1}`, type: 'text', content: 'Краткое описание услуги', style: { fontSize: '14px', textAlign: 'center', color: theme.colors.textSecondary, margin: `${theme.spacing.xs} 0`, padding: theme.spacing.xs } } as Block,
                ],
              } as Block,
            })),
          } as Block,
        ],
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-cta-2',
    name: 'CTA с описанием',
    description: 'Призыв к действию с подробным описанием',
    category: 'CTA',
    blocks: [
      {
        id: 'temp-text-21',
        type: 'text',
        content: 'Начните прямо сейчас',
        style: {
          fontSize: '32px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: theme.colors.textPrimary,
          margin: `${theme.spacing.md} 0`,
          padding: theme.spacing.md,
        },
      } as Block,
      {
        id: 'temp-text-22',
        type: 'text',
        content: 'Присоединяйтесь к тысячам довольных клиентов',
        style: {
          fontSize: '18px',
          textAlign: 'center',
          color: theme.colors.textSecondary,
          margin: `${theme.spacing.xs} 0`,
          padding: theme.spacing.xs,
        },
      } as Block,
      {
        id: 'temp-button-5',
        type: 'button',
        text: 'Начать работу',
        link: '#',
        buttonColor: theme.colors.success,
        style: {
          textAlign: 'center',
          margin: `${theme.spacing.md} 0`,
          padding: theme.spacing.xs,
        },
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-faq-1',
    name: 'FAQ',
    description: 'Блок с часто задаваемыми вопросами',
    category: 'Content',
    blocks: [
      {
        id: 'temp-text-23',
        type: 'text',
        content: 'Часто задаваемые вопросы',
        style: {
          fontSize: '36px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: theme.colors.textPrimary,
          margin: `${theme.spacing.lg} 0`,
          padding: theme.spacing.lg,
        },
      } as Block,
      {
        id: 'temp-text-24',
        type: 'text',
        content: 'Вопрос: Как это работает?\nОтвет: Очень просто!',
        style: {
          fontSize: '16px',
          textAlign: 'left',
          color: theme.colors.textSecondary,
          margin: `${theme.spacing.sm} 0`,
          padding: theme.spacing.lg,
          backgroundColor: theme.colors.surfaceAlt,
        },
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-team-1',
    name: 'Команда',
    description: 'Блок с информацией о команде',
    category: 'Content',
    blocks: [
      {
        id: 'temp-text-25',
        type: 'text',
        content: 'Наша команда',
        style: {
          fontSize: '36px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: theme.colors.textPrimary,
          margin: `${theme.spacing.lg} 0`,
          padding: theme.spacing.lg,
        },
      } as Block,
      {
        id: 'temp-image-5',
        type: 'image',
        url: '',
        style: {
          width: '100%',
          margin: `${theme.spacing.sm} 0`,
          padding: theme.spacing.sm,
        },
      } as Block,
      {
        id: 'temp-text-26',
        type: 'text',
        content: 'Иван Иванов\nРуководитель проекта',
        style: {
          fontSize: '18px',
          textAlign: 'center',
          color: theme.colors.textSecondary,
          margin: `${theme.spacing.sm} 0`,
          padding: theme.spacing.sm,
        },
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-stats-1',
    name: 'Статистика',
    description: 'Блок с цифрами и статистикой',
    category: 'Content',
    blocks: [
      {
        id: 'temp-text-27',
        type: 'text',
        content: '1000+\nДовольных клиентов',
        style: {
          fontSize: '48px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: theme.colors.primary,
          margin: `${theme.spacing.lg} 0`,
          padding: theme.spacing.lg,
          backgroundColor: theme.colors.highlightBlue,
        },
      } as Block,
      {
        id: 'temp-text-28',
        type: 'text',
        content: '500+\nЗавершенных проектов',
        style: {
          fontSize: '48px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: theme.colors.success,
          margin: `${theme.spacing.lg} 0`,
          padding: theme.spacing.lg,
          backgroundColor: theme.colors.highlightGreen,
        },
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-newsletter-1',
    name: 'Подписка',
    description: 'Блок подписки на рассылку',
    category: 'CTA',
    blocks: [
      {
        id: 'temp-text-29',
        type: 'text',
        content: 'Подпишитесь на нашу рассылку',
        style: {
          fontSize: '28px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: theme.colors.textPrimary,
          margin: `${theme.spacing.lg} 0`,
          padding: theme.spacing.lg,
        },
      } as Block,
      {
        id: 'temp-text-30',
        type: 'text',
        content: 'Получайте последние новости и обновления',
        style: {
          fontSize: '16px',
          textAlign: 'center',
          color: theme.colors.textMuted,
          margin: `${theme.spacing.sm} 0`,
          padding: theme.spacing.sm,
        },
      } as Block,
      {
        id: 'temp-button-6',
        type: 'button',
        text: 'Подписаться',
        link: '#',
        buttonColor: theme.colors.primary,
        style: {
          textAlign: 'center',
          margin: `${theme.spacing.lg} 0`,
          padding: theme.spacing.sm,
        },
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-footer-cta-1',
    name: 'Финальный CTA',
    description: 'Призыв к действию перед футером',
    category: 'CTA',
    blocks: [
      {
        id: 'temp-text-31',
        type: 'text',
        content: 'Готовы начать?',
        style: {
          fontSize: '40px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: theme.colors.surface,
          margin: `${theme.spacing['4xl']} 0`,
          padding: theme.spacing['3xl'],
          backgroundColor: theme.colors.primary,
        },
      } as Block,
      {
        id: 'temp-button-7',
        type: 'button',
        text: 'Создать проект',
        link: '#',
        buttonColor: theme.colors.surface,
        style: {
          textAlign: 'center',
          margin: `${theme.spacing.lg} 0`,
          padding: theme.spacing.md,
        },
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
  {
    id: 'template-hero-3',
    name: 'Hero с изображением',
    description: 'Hero секция с фоновым изображением',
    category: 'Hero',
    blocks: [
      {
        id: 'temp-image-6',
        type: 'image',
        url: '',
        style: {
          width: '100%',
          margin: '0',
          padding: '0',
        },
      } as Block,
      {
        id: 'temp-text-32',
        type: 'text',
        content: 'Добро пожаловать',
        style: {
          fontSize: '48px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: theme.colors.textPrimary,
          margin: `${theme.spacing.md} 0`,
          padding: theme.spacing.md,
        },
      } as Block,
      {
        id: 'temp-button-8',
        type: 'button',
        text: 'Узнать больше',
        link: '#',
        buttonColor: theme.colors.primary,
        style: {
          textAlign: 'center',
          margin: `${theme.spacing.xs} 0`,
          padding: theme.spacing.xs,
        },
      } as Block,
    ],
    createdAt: Date.now(),
    isCustom: false,
  },
];

interface TemplatesStore {
  templates: BlockTemplate[];
  
  // Actions
  addTemplate: (template: Omit<BlockTemplate, 'id' | 'createdAt'>) => void;
  removeTemplate: (id: string) => void;
  getTemplate: (id: string) => BlockTemplate | undefined;
  getTemplatesByCategory: (category?: string) => BlockTemplate[];
  importCustomTemplates: (templates: BlockTemplate[]) => void;
  
  // Persistence
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  resetToDefaults: () => void;
}

export const useTemplatesStore = create<TemplatesStore>((set, get) => ({
  templates: defaultTemplates,

  addTemplate: (templateData) => {
    const newTemplate: BlockTemplate = {
      ...templateData,
      id: `template-custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      isCustom: true,
    };
    
    set((state) => ({
      templates: [...state.templates, newTemplate],
    }));
    
    get().saveToLocalStorage();
  },

  removeTemplate: (id) => {
    set((state) => ({
      templates: state.templates.filter((t) => t.id !== id),
    }));
    get().saveToLocalStorage();
  },

  getTemplate: (id) => {
    return get().templates.find((t) => t.id === id);
  },

  getTemplatesByCategory: (category) => {
    if (!category) return get().templates;
    return get().templates.filter((t) => t.category === category);
  },

  importCustomTemplates: (templates) => {
    // Очистить только кастомные шаблоны и заменить на импортированные
    const systemTemplates = defaultTemplates;
    const customTemplates = (templates || []).map((t) => ({ ...t, isCustom: true }));
    set({ templates: [...systemTemplates, ...customTemplates] });
    get().saveToLocalStorage();
  },

  saveToLocalStorage: () => {
    try {
      const { templates } = get();
      // Сохраняем только пользовательские шаблоны
      const customTemplates = templates.filter((t) => t.isCustom);
      localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(customTemplates));
    } catch (error) {
      console.error('Ошибка сохранения шаблонов в LocalStorage:', error);
    }
  },

  loadFromLocalStorage: () => {
    try {
      const stored = localStorage.getItem(TEMPLATES_STORAGE_KEY);
      if (stored) {
        const customTemplates = JSON.parse(stored) as BlockTemplate[];
        // Объединяем системные и пользовательские шаблоны
        set(() => ({
          templates: [...defaultTemplates, ...customTemplates],
        }));
      }
    } catch (error) {
      console.error('Ошибка загрузки шаблонов из LocalStorage:', error);
    }
  },

  resetToDefaults: () => {
    set({ templates: defaultTemplates });
    localStorage.removeItem(TEMPLATES_STORAGE_KEY);
  },
}));

