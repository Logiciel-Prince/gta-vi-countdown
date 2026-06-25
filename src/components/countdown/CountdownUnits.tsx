import { motion } from 'framer-motion'
import { AnimatedNumber } from '../ui/AnimatedNumber'
import type { TimeLeft } from '../../types'

interface CountdownUnitsProps {
  timeLeft: TimeLeft
  size?: 'lg' | 'md'
}

const UNITS: { key: keyof TimeLeft; label: string; min: number }[] = [
  { key: 'years', label: 'Years', min: 1 },
  { key: 'months', label: 'Months', min: 2 },
  { key: 'days', label: 'Days', min: 2 },
  { key: 'hours', label: 'Hours', min: 2 },
  { key: 'minutes', label: 'Minutes', min: 2 },
  { key: 'seconds', label: 'Seconds', min: 2 },
]

export function CountdownUnits({ timeLeft, size = 'lg' }: CountdownUnitsProps) {
  const numberClass =
    size === 'lg'
      ? 'font-display text-4xl sm:text-6xl md:text-7xl'
      : 'font-display text-3xl sm:text-4xl'

  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:grid-cols-6">
      {UNITS.map((u, i) => (
        <motion.div
          key={u.key}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
          className="glass group relative flex flex-col items-center justify-center gap-1 px-1 py-4 sm:py-5"
        >
          <span
            className={`${numberClass} leading-none text-text text-glow tabular-nums`}
          >
            <AnimatedNumber value={timeLeft[u.key] as number} minDigits={u.min} />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted sm:text-xs">
            {u.label}
          </span>
          <span className="pointer-events-none absolute inset-x-6 -bottom-px h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </motion.div>
      ))}
    </div>
  )
}
