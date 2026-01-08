/**
 * Toast Component
 *
 * Displays temporary notification messages to users.
 * Supports different types: success, error, warning, and info.
 *
 * @component
 * @example
 * ```tsx
 * <Toast
 *   message="Operação realizada com sucesso!"
 *   type="success"
 *   onClose={() => console.log('Toast closed')}
 * />
 * ```
 */

import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Auto-dismiss after duration
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, 300); // Match animation duration
  };

  if (!isVisible) return null;

  /**
   * Get toast styles based on type
   */
  const getToastStyles = () => {
    const baseStyles = 'fixed top-4 right-4 max-w-md w-full shadow-lg rounded-lg pointer-events-auto flex items-center p-4 transition-all duration-300';

    const typeStyles = {
      success: 'bg-green-50 border-l-4 border-green-500',
      error: 'bg-red-50 border-l-4 border-red-500',
      warning: 'bg-yellow-50 border-l-4 border-yellow-500',
      info: 'bg-blue-50 border-l-4 border-blue-500',
    };

    return `${baseStyles} ${typeStyles[type]} ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}`;
  };

  /**
   * Get icon based on type
   */
  const getIcon = () => {
    const iconStyles = 'flex-shrink-0 w-6 h-6';

    switch (type) {
      case 'success':
        return (
          <svg
            className={`${iconStyles} text-green-500`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'error':
        return (
          <svg
            className={`${iconStyles} text-red-500`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg
            className={`${iconStyles} text-yellow-500`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case 'info':
        return (
          <svg
            className={`${iconStyles} text-blue-500`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  /**
   * Get text color based on type
   */
  const getTextColor = () => {
    const colors = {
      success: 'text-green-800',
      error: 'text-red-800',
      warning: 'text-yellow-800',
      info: 'text-blue-800',
    };
    return colors[type];
  };

  return (
    <div className={getToastStyles()} role="alert" aria-live="polite">
      <div className="flex-shrink-0">{getIcon()}</div>
      <div className="ml-3 flex-1">
        <p className={`text-sm font-medium ${getTextColor()}`}>{message}</p>
      </div>
      <div className="flex-shrink-0 ml-4 flex">
        <button
          onClick={handleClose}
          className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            type === 'success'
              ? 'text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50'
              : type === 'error'
              ? 'text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50'
              : type === 'warning'
              ? 'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50'
              : 'text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50'
          }`}
          aria-label="Fechar notificação"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
