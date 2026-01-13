/**
 * LoadingSpinner Component
 *
 * Displays an animated loading spinner with optional text and size variations.
 *
 * @param size - Size of the spinner ('sm' | 'md' | 'lg')
 * @param text - Optional text to display below the spinner
 *
 * @example
 * ```tsx
 * <LoadingSpinner size="lg" text="Carregando dados..." />
 * ```
 */

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner = ({ size = 'md', text }: LoadingSpinnerProps) => {
  // Size mappings
  const sizes = {
    sm: {
      spinner: 'w-6 h-6',
      text: 'text-sm',
    },
    md: {
      spinner: 'w-10 h-10',
      text: 'text-base',
    },
    lg: {
      spinner: 'w-14 h-14',
      text: 'text-lg',
    },
  };

  const currentSize = sizes[size];

  return (
    <div className="flex flex-col items-center justify-center p-8" role="status" aria-label="Loading">
      <svg
        className={`animate-spin ${currentSize.spinner} text-indigo-600`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && (
        <p className={`mt-4 ${currentSize.text} text-gray-600 font-medium`}>{text}</p>
      )}
      <span className="sr-only">Carregando...</span>
    </div>
  );
};

export default LoadingSpinner;
