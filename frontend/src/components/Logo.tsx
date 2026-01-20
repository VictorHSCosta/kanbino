import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon - Modern geometric design */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${sizeClasses[size]}`}
        >
          {/* Background circle */}
          <circle cx="24" cy="24" r="24" fill="url(#gradient1)" />

          {/* Modern kanban board representation */}
          <rect x="12" y="14" width="8" height="20" rx="2" fill="white" opacity="0.95" />
          <rect x="22" y="10" width="8" height="24" rx="2" fill="white" opacity="0.85" />
          <rect x="32" y="16" width="8" height="18" rx="2" fill="white" opacity="0.95" />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient1" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}>
            Kanbino
          </span>
          {size === 'lg' && (
            <span className="text-xs text-gray-500 font-medium tracking-wide">
              Project Management
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default Logo
