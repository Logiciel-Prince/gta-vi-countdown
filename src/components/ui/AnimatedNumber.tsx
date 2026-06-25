import { AnimatePresence, motion } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  /** Minimum digits to render (zero-padded). */
  minDigits?: number
  className?: string
}

/**
 * Renders a number where each digit animates independently with a
 * vertical slide whenever it changes — a slot-machine / flip effect.
 */
export function AnimatedNumber({ value, minDigits = 2, className }: AnimatedNumberProps) {
  const str = Math.max(0, value).toString().padStart(minDigits, '0')
  const digits = str.split('')

  return (
    <span className={`inline-flex tabular-nums ${className ?? ''}`} aria-label={String(value)}>
      {digits.map((d, i) => (
        <span
          key={`${digits.length}-${i}`}
          className="relative inline-block overflow-hidden"
          style={{ width: '0.62em', height: '1em' }}
          aria-hidden
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={d}
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {d}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  )
}
