import React from 'react'

interface LogoProps {
  variant?: 'full' | 'icon' | 'compact'
  className?: string
  width?: number
  height?: number
  showText?: boolean
  animated?: boolean
}

const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  className = '',
  width,
  height,
  showText = true,
  animated = true
}) => {
  // Dimensões padrão baseadas no variant
  const getDefaultSize = () => {
    switch (variant) {
      case 'icon': return { w: 32, h: 32 }
      case 'compact': return { w: 40, h: 40 }
      default: return { w: 48, h: 48 }
    }
  }

  const finalWidth = width || getDefaultSize().w
  const finalHeight = height || getDefaultSize().h

  // Classes de animação
  const animationClass = animated ? 'transition-transform duration-300 hover:scale-105 cursor-pointer' : ''

  // SVG inline da logo - design moderno com ícone de fluxo/tarefas
  const logoIcon = (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={animationClass}
      aria-label="Logo do TaskFlow Pro"
    >
      {/* Background circle com gradiente */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" /> {/* indigo-500 */}
          <stop offset="100%" stopColor="#8b5cf6" /> {/* violet-500 */}
        </linearGradient>
      </defs>

      {/* Círculo de fundo */}
      <circle cx="24" cy="24" r="22" fill="url(#logoGradient)" opacity="0.1" />

      {/* Ícone principal - representando fluxo de tarefas */}
      <g>
        {/* Primeira tarefa/flow line */}
        <rect
          x="12"
          y="14"
          width="10"
          height="3"
          rx="1.5"
          fill="url(#logoGradient)"
        />
        <circle cx="13" cy="15.5" r="2" fill="url(#logoGradient)" />

        {/* Segunda tarefa/flow line */}
        <rect
          x="12"
          y="22"
          width="18"
          height="3"
          rx="1.5"
          fill="url(#logoGradient)"
          opacity="0.8"
        />
        <circle cx="13" cy="23.5" r="2" fill="url(#logoGradient)" opacity="0.8" />

        {/* Terceira tarefa/flow line */}
        <rect
          x="12"
          y="30"
          width="14"
          height="3"
          rx="1.5"
          fill="url(#logoGradient)"
          opacity="0.6"
        />
        <circle cx="13" cy="31.5" r="2" fill="url(#logoGradient)" opacity="0.6" />

        {/* Checkmark indicando conclusão */}
        <path
          d="M34 20 L38 24 L46 16"
          stroke="url(#logoGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  )

  // Se for apenas ícone, retornar sem texto
  if (variant === 'icon' || !showText) {
    return (
      <div className="flex items-center justify-center">
        {logoIcon}
      </div>
    )
  }

  // Classes responsivas para texto
  const textClasses = variant === 'full'
    ? 'text-lg sm:text-xl font-bold'
    : 'text-base sm:text-lg font-bold'

  // Logo completa com texto
  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <div className={animationClass}>
        {logoIcon}
      </div>
      <div className={`flex flex-col ${textClasses}`}>
        <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          TaskFlow Pro
        </span>
        {variant === 'full' && (
          <span className="text-xs text-gray-500 font-medium tracking-wide">
            Gerenciamento de Fluxos
          </span>
        )}
      </div>
    </div>
  )
}

export default Logo
