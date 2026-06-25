import { motion } from 'framer-motion'
import { FaSun, FaMoon } from 'react-icons/fa6'
import { MdOutlineWbTwilight } from 'react-icons/md'
import { useTheme } from '../../context/ThemeContext'
import type { ThemeName } from '../../types'

const OPTIONS: { id: ThemeName; label: string; icon: JSX.Element }[] = [
  { id: 'light', label: 'Light', icon: <FaSun /> },
  { id: 'dark', label: 'Dark', icon: <FaMoon /> },
  { id: 'vice', label: 'Vice', icon: <MdOutlineWbTwilight /> },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <div
      className="relative flex items-center gap-1 rounded-full border border-border/50 bg-surface/60 p-1 backdrop-blur-md"
      role="radiogroup"
      aria-label="Theme"
    >
      {OPTIONS.map((opt) => {
        const active = theme === opt.id
        return (
          <button
            key={opt.id}
            role="radio"
            aria-checked={active}
            aria-label={`${opt.label} theme`}
            title={`${opt.label} theme`}
            onClick={() => setTheme(opt.id)}
            className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors ${
              active ? 'text-white' : 'text-muted hover:text-text'
            }`}
          >
            {active && (
              <motion.span
                layoutId="theme-pill"
                className="absolute inset-0 -z-10 rounded-full"
                style={{ backgroundImage: 'linear-gradient(120deg, rgb(var(--neon-pink)), rgb(var(--neon-purple)))' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {opt.icon}
          </button>
        )
      })}
    </div>
  )
}
