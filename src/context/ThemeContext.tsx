import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { ThemeName } from '../types'

interface ThemeContextValue {
  theme: ThemeName
  setTheme: (t: ThemeName) => void
  cycleTheme: () => void
  toggleVice: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const THEME_ORDER: ThemeName[] = ['vice', 'dark', 'light']
const THEME_COLORS: Record<ThemeName, string> = {
  vice: '#0a0118',
  dark: '#090b12',
  light: '#f7f5fc',
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<ThemeName>('gta6-theme', 'vice')

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', THEME_COLORS[theme])
  }, [theme])

  const cycleTheme = useCallback(() => {
    setTheme((prev) => {
      const i = THEME_ORDER.indexOf(prev)
      return THEME_ORDER[(i + 1) % THEME_ORDER.length]
    })
  }, [setTheme])

  const toggleVice = useCallback(() => {
    setTheme((prev) => (prev === 'vice' ? 'dark' : 'vice'))
  }, [setTheme])

  const value = useMemo(
    () => ({ theme, setTheme, cycleTheme, toggleVice }),
    [theme, setTheme, cycleTheme, toggleVice],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
