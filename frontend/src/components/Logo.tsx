/**
 * Logo Component
 * Displays the Kanbino logo with tagline
 */

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'lg' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h1 className={`${sizeClasses[size]} font-bold text-indigo-600`}>
        Kanbino
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        Gerencie seus projetos com eficiência
      </p>
    </div>
  );
}
