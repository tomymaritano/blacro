/**
 * Design Tokens - Centralized design system constants
 * 
 * This file contains all hard-coded values used throughout the application
 * to ensure consistency and easier maintenance.
 */

// === SPACING & LAYOUT ===
export const SPACING = {
  // Container margins
  CONTAINER_MARGIN: 120, // Used in globals.css calc(100% - 120px)
  
  // Common spacing values
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
  XXXL: 64,
  
  // Component specific
  GRID_GAP: 8,
  GRID_GAP_LG: 12,
  NAVBAR_HEIGHT: 80,
  FOOTER_PADDING: 24,
} as const;

// === TYPOGRAPHY ===
export const TYPOGRAPHY = {
  // Font sizes (in px)
  FONT_SIZES: {
    XS: 10,
    SM: 12,
    BASE: 14,
    LG: 16,
    XL: 18,
    XXL: 20,
    XXXL: 24,
    TITLE_SM: 28,
    TITLE_MD: 40,
    TITLE_LG: 48,
    HERO: 128,
  },
  
  // Line heights
  LINE_HEIGHT: {
    TIGHT: 1.25,
    NORMAL: 1.5,
    RELAXED: 1.75,
  },
  
  // Font weights
  FONT_WEIGHT: {
    LIGHT: 300,
    NORMAL: 400,
    MEDIUM: 500,
    SEMIBOLD: 600,
    BOLD: 700,
    EXTRABOLD: 800,
    BLACK: 900,
  },
} as const;

// === COLORS ===
export const COLORS = {
  // Primary colors
  PRIMARY: {
    BLACK: '#171717',
    WHITE: '#FFFFFF',
    BACKGROUND: '#FFFDF9',
    FOREGROUND: '#171717',
  },
  
  // Opacity variants
  OPACITY: {
    BLACK_80: 'rgba(23, 23, 23, 0.8)',
    BLACK_60: 'rgba(23, 23, 23, 0.6)',
    BLACK_40: 'rgba(23, 23, 23, 0.4)',
    BLACK_20: 'rgba(23, 23, 23, 0.2)',
    BLACK_10: 'rgba(23, 23, 23, 0.1)',
    WHITE_90: 'rgba(255, 255, 255, 0.9)',
    WHITE_60: 'rgba(255, 255, 255, 0.6)',
    WHITE_50: 'rgba(255, 255, 255, 0.5)',
    WHITE_25: 'rgba(255, 255, 255, 0.25)',
  },
  
  // UI colors
  UI: {
    BACKGROUND_LIGHT: '#F8F8F8',
    BORDER_LIGHT: 'rgba(0, 0, 0, 0.2)',
    ERROR: '#EF4444',
    SUCCESS: '#10B981',
  },
} as const;

// === BORDERS & RADIUS ===
export const BORDERS = {
  RADIUS: {
    NONE: 0,
    SM: 4,
    DEFAULT: 8,
    LG: 12,
    FULL: 9999,
  },
  
  WIDTH: {
    THIN: 1,
    DEFAULT: 2,
    THICK: 4,
  },
} as const;

// === ANIMATIONS ===
export const ANIMATIONS = {
  // Durations (in seconds)
  DURATION: {
    FAST: 0.2,
    DEFAULT: 0.3,
    SLOW: 0.6,
    VERY_SLOW: 2,
  },
  
  // Easing curves
  EASING: {
    EASE_OUT: 'easeOut',
    EASE_IN: 'easeIn',
    EASE_IN_OUT: 'easeInOut',
    SPRING: [0.25, 1, 0.5, 1] as const,
  },
  
  // Marquee animation durations
  MARQUEE: {
    LEFT: 30,
    RIGHT: 40,
    INFINITE: 40,
  },
} as const;

// === BREAKPOINTS ===
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;

// === FORM CONSTANTS ===
export const FORM = {
  // Validation limits
  VALIDATION: {
    NAME_MIN: 2,
    NAME_MAX: 100,
    EMAIL_MAX: 255,
    COMPANY_MIN: 2,
    COMPANY_MAX: 100,
    PHONE_MIN: 10,
    PHONE_MAX: 20,
    COUNTRY_MIN: 2,
    COUNTRY_MAX: 100,
    PROJECT_DESC_MIN: 20,
    PROJECT_DESC_MAX: 5000,
    WEBSITE_MAX: 500,
  },
  
  // Placeholders
  PLACEHOLDERS: {
    NAME: 'Tu nombre completo',
    EMAIL: 'tu@email.com',
    COMPANY: 'Nombre de tu compañía',
    WEBSITE_SOCIAL: 'https://tusitio.com o @tuusuario',
    PHONE: '+54 (11) 1234-5678',
    COUNTRY: 'Selecciona tu país',
    PROJECT_DESC: 'Describe tu proyecto, objetivos, cronograma y cualquier requerimiento específico...',
  },
} as const;

// === RATE LIMITING ===
export const RATE_LIMIT = {
  CONTACT_FORM: {
    MAX_REQUESTS: 5,
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  },
} as const;

// === SCROLLBAR ===
export const SCROLLBAR = {
  WIDTH: {
    DEFAULT: 14,
    THIN: 8,
  },
  
  COLORS: {
    TRACK: '#eaeaea',
    THUMB: '#888',
    THUMB_HOVER: '#555',
    THIN_THUMB: 'rgba(0, 0, 0, 0.2)',
    THIN_THUMB_HOVER: 'rgba(0, 0, 0, 0.3)',
  },
} as const;

// === LOGO ANIMATION ===
export const LOGO = {
  STROKE_DASHARRAY: 1000,
  ANIMATION_DURATION: 2, // seconds
} as const;

// === SOCIAL MEDIA ===
export const SOCIAL_LINKS = {
  INSTAGRAM: 'https://instagram.com/blacro.studio',
  LINKEDIN: 'https://linkedin.com/company/blacro-studio',
  BEHANCE: 'https://behance.net/blacrostudio',
  EMAIL: 'hola@blacro.com',
} as const;

// === META & SEO ===
export const META = {
  SITE_NAME: 'Blacro Studio',
  SITE_URL: 'https://blacro.com',
  DESCRIPTION: 'Creative studio specializing in branding, visual identity, and spatial design.',
  KEYWORDS: ['branding', 'creative', 'studio', 'design'] as string[],
  OG_IMAGE_WIDTH: 1200,
  OG_IMAGE_HEIGHT: 630,
} as const;

// === HELPER FUNCTIONS ===

/**
 * Convert pixel value to rem
 */
export const pxToRem = (px: number): string => `${px / 16}rem`;

/**
 * Get responsive font size classes
 */
export const getResponsiveFontSize = (sm: number, md: number, lg: number): string => 
  `text-[${sm}px] sm:text-[${md}px] lg:text-[${lg}px]`;

/**
 * Get opacity class for colors
 */
export const getOpacityClass = (opacity: number): string => `opacity-${Math.round(opacity * 100)}`;

/**
 * Convert milliseconds to seconds for CSS animations
 */
export const msToSeconds = (ms: number): number => ms / 1000;