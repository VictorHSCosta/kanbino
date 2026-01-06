/**
 * ToastContainer Component
 *
 * Manages and displays multiple toast notifications.
 * Should be placed once at the root of the application.
 *
 * @component
 * @example
 * ```tsx
 * // In App.tsx
 * const [toasts, setToasts] = useState<ToastData[]>([]);
 *
 * const addToast = (message: string, type: ToastType) => {
 *   const id = Date.now();
 *   setToasts(prev => [...prev, { id, message, type }]);
 * };
 *
 * return (
 *   <>
 *     <YourAppContent />
 *     <ToastContainer toasts={toasts} onRemove={(id) => {
 *       setToasts(prev => prev.filter(t => t.id !== id));
 *     }} />
 *   </>
 * );
 * ```
 */

import React from 'react';
import Toast, { ToastType } from './Toast';

export interface ToastData {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  toasts: ToastData[];
  onRemove: (id: number) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
