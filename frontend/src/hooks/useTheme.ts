import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark' | 'system'

const THEME_STORAGE_KEY = 'kanbino-theme'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  // Efeito para carregar tema salvo
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
    if (savedTheme) {
      setThemeState(savedTheme)
    }
  }, [])

  // Efeito para aplicar tema ao DOM
  useEffect(() => {
    const root = window.document.documentElement

    // Remover classe dark existente
    root.classList.remove('dark')

    // Determinar tema final
    let finalTheme: 'light' | 'dark' = resolvedTheme

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      finalTheme = systemTheme
      setResolvedTheme(systemTheme)
    } else {
      finalTheme = theme
      setResolvedTheme(theme)
    }

    // Aplicar classe dark se necessário
    if (finalTheme === 'dark') {
      root.classList.add('dark')
    }
  }, [theme])

  // Efeito para ouvir mudanças no sistema
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? 'dark' : 'light')
      const root = window.document.documentElement
      if (e.matches) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const toggleTheme = () => {
    setThemeState((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem(THEME_STORAGE_KEY, newTheme)
      return newTheme
    })
  }

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    setThemeState(newTheme)
  }

  return {
    theme: resolvedTheme,
    rawTheme: theme,
    toggleTheme,
    setTheme,
  }
}
