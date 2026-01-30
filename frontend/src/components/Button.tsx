/**
 * Button Component
 * Reusable button with customizable color, navigation, and click handler
 * @param children - Content to render inside the button
 * @param color - Button color variant (default: 'green')
 * @param onClick - Click handler function
 * @param to - Navigation target ('home' or 'profile')
 * @param disabled - Disable the button (default: false)
 * @param className - Additional Tailwind classes
 */

import React from 'react';

// Interface TypeScript para as props do Button
interface ButtonProps {
  children: React.ReactNode;
  color?: 'green' | 'indigo' | 'gray' | 'red';
  onClick?: () => void;
  to?: 'home' | 'profile';
  disabled?: boolean;
  className?: string;
}

// Mapa de cores do Tailwind CSS - alinhado com padrões existentes no código
const colorClasses = {
  green: 'bg-green-600 hover:bg-green-700 text-white',
  indigo: 'bg-indigo-600 hover:bg-indigo-700 text-white',
  gray: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  red: 'bg-red-600 hover:bg-red-700 text-white',
};

// Componente Button funcional com estilo Tailwind
export default function Button({
  children,
  color = 'green',
  onClick,
  to,
  disabled = false,
  className = '',
}: ButtonProps) {
  // Lógica de navegação - manipula cliques e navegação padrão para "/"
  const handleClick = () => {
    // Se o botão está desabilitado, não faz nada
    if (disabled) return;

    // Executa o callback onClick fornecido pelo componente pai
    // O pai é responsável por gerenciar a navegação via setCurrentPage
    if (onClick) {
      onClick();
    }
  };

  // Classes base do botão - segue padrão do ProfilePhotoUploader.tsx
  const baseClasses = 'font-bold py-2 px-4 rounded transition-colors';

  // Classes de estado desabilitado - segue padrão da linha 170-172 do ProfilePhotoUploader.tsx
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  // Combina todas as classes
  const buttonClasses = `${baseClasses} ${colorClasses[color]} ${disabledClasses} ${className}`.trim();

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}
