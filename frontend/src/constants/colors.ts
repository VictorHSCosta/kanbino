/**
 * Kanbino Color Palette
 * Centralized color constants for consistent theming
 */

export const colors = {
  /** Primary brand color - Indigo */
  primary: {
    DEFAULT: '#4f46e5', // indigo-600
    light: '#eef2ff', // indigo-50
    dark: '#4338ca', // indigo-700
  },

  /** Secondary accent color - Purple */
  secondary: '#a855f7', // purple-500

  /** Accent colors */
  accent: {
    blue: '#3b82f6', // blue-500
    green: '#22c55e', // green-500
    purple: '#a855f7', // purple-500
  },

  /** Neutral colors */
  background: '#f9fafb', // gray-50
  surface: '#ffffff', // white

  /** Semantic colors */
  success: '#22c55e', // green-500
  error: '#ef4444', // red-500
  warning: '#f59e0b', // amber-500
  info: '#3b82f6', // blue-500

  /** Text colors */
  text: {
    primary: '#111827', // gray-900
    secondary: '#6b7280', // gray-500
    disabled: '#9ca3af', // gray-400
  },

  /** Border colors */
  border: {
    DEFAULT: '#e5e7eb', // gray-200
    light: '#f3f4f6', // gray-100
  },
} as const;

export type Colors = typeof colors;
