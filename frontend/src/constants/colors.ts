/**
 * Kanbino Color Palette
 * Centralized color constants for consistent theming
 */

export const colors = {
  // Primary colors - Indigo based
  primary: {
    DEFAULT: '#4f46e5', // indigo-600
    light: '#eef2ff', // indigo-50
    dark: '#4338ca', // indigo-700
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },

  // Secondary colors
  secondary: {
    DEFAULT: '#a855f7', // purple-500
    light: '#faf5ff', // purple-50
    dark: '#9333ea', // purple-600
  },

  // Accent colors
  accent: {
    blue: '#3b82f6', // blue-500
    green: '#22c55e', // green-500
    purple: '#a855f7', // purple-500
    pink: '#ec4899', // pink-500
    orange: '#f97316', // orange-500
  },

  // Neutral colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Semantic colors
  success: '#22c55e', // green-500
  warning: '#f59e0b', // amber-500
  error: '#ef4444', // red-500
  info: '#3b82f6', // blue-500

  // Background colors
  background: '#f9fafb', // gray-50
  surface: '#ffffff', // white
};

/**
 * Tailwind custom colors configuration
 */
export const tailwindColors = {
  primary: colors.primary.DEFAULT,
  'primary-light': colors.primary.light,
  'primary-dark': colors.primary.dark,
  secondary: colors.secondary.DEFAULT,
  'secondary-light': colors.secondary.light,
  'secondary-dark': colors.secondary.dark,
  success: colors.success,
  warning: colors.warning,
  error: colors.error,
  info: colors.info,
};

export default colors;
