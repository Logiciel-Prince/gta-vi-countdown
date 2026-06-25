import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'

interface ParticleFieldProps {
  count?: number
}

/** Floating neon dust particles. Deterministic per-mount layout. */
export function ParticleField({ count = 28 }: ParticleFieldProps) {
  const reduce = useReducedMotion()
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        // Pseudo-random but stable spread using a simple hash of the index.
        const seed = (i * 9301 + 49297) % 233280
        const r = seed / 233280
        const r2 = ((i * 49297 + 9301) % 233280) / 233280
        return {
          left: r * 100,
          top: r2 * 100,
          size: 2 + (r * 4),
          duration: 8 + r2 * 12,
          delay: r * 6,
          hue: i % 3,
        }
      }),
    [count],
  )

  if (reduce) return null

  const colors = ['var(--neon-pink)', 'var(--neon-blue)', 'var(--neon-purple)']

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: `rgb(${colors[p.hue]})`,
            boxShadow: `0 0 ${p.size * 3}px rgb(${colors[p.hue]} / 0.8)`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
