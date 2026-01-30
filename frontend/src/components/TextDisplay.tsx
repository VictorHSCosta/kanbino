/**
 * TextDisplay Component
 * Displays text with various visual styles, sizes, and formatting options
 *
 * @example
 * // Basic usage
 * <TextDisplay text="Hello World" />
 *
 * @example
 * // With variant and size
 * <TextDisplay
 *   text="Success message"
 *   variant="success"
 *   size="lg"
 *   title="Status"
 * />
 *
 * @example
 * // With truncation
 * <TextDisplay
 *   text="Long text that will be truncated..."
 *   maxLines={2}
 * />
 */

import React from 'react';

interface TextDisplayProps {
  /** The text content to display */
  text: string;
  /** Visual variant style */
  variant?: 'default' | 'highlight' | 'success' | 'error' | 'warning';
  /** Text size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Optional title displayed above the text */
  title?: string;
  /** Additional CSS classes to apply to the root element */
  className?: string;
  /** Maximum number of lines to show before truncating (undefined = no truncation) */
  maxLines?: number;
}

// Variant styles mapping
const variantClasses: Record<string, string> = {
  default: 'bg-white border border-gray-200 text-gray-800',
  highlight: 'bg-indigo-50 border border-indigo-200 text-indigo-900',
  success: 'bg-green-50 border border-green-200 text-green-800',
  error: 'bg-red-50 border border-red-200 text-red-800',
  warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800',
};

// Size styles mapping for content text
const sizeClasses: Record<string, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

// Size styles mapping for title text
const titleSizeClasses: Record<string, string> = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
  xl: 'text-2xl',
};

// Spacing between title and content based on size
const spacingClasses: Record<string, string> = {
  sm: 'mt-2',
  md: 'mt-2',
  lg: 'mt-3',
  xl: 'mt-4',
};

// Line clamp classes for truncation
const getLineClampClass = (maxLines?: number): string => {
  if (!maxLines) return '';
  if (maxLines === 1) return 'line-clamp-1';
  if (maxLines === 2) return 'line-clamp-2';
  if (maxLines === 3) return 'line-clamp-3';
  if (maxLines === 4) return 'line-clamp-4';
  if (maxLines === 5) return 'line-clamp-5';
  if (maxLines === 6) return 'line-clamp-6';
  return 'line-clamp-none';
};

// ARIA attributes based on variant
const getAriaAttributes = (variant: string) => {
  if (variant === 'error') {
    return { role: 'alert', 'aria-live': 'assertive' as const };
  }
  if (variant === 'success') {
    return { role: 'status', 'aria-live': 'polite' as const };
  }
  return {};
};

const TextDisplay = ({
  text,
  variant = 'default',
  size = 'md',
  title,
  className = '',
  maxLines,
}: TextDisplayProps) => {
  const baseClasses = 'rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow';
  const variantClass = variantClasses[variant] || variantClasses.default;
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const titleSizeClass = titleSizeClasses[size] || titleSizeClasses.md;
  const spacingClass = spacingClasses[size] || spacingClasses.md;
  const lineClampClass = getLineClampClass(maxLines);
  const ariaAttributes = getAriaAttributes(variant);

  return (
    <article
      className={`${baseClasses} ${variantClass} ${className}`.trim()}
      data-testid="text-display"
      {...ariaAttributes}
    >
      {title && (
        <h3 className={`font-semibold ${titleSizeClass}`}>{title}</h3>
      )}
      <p
        className={`${sizeClass} ${title ? spacingClass : ''} ${lineClampClass}`.trim()}
        title={maxLines && text.length > 100 ? text : undefined}
      >
        {text}
      </p>
    </article>
  );
};

export default TextDisplay;
