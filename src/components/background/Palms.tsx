import { motion, useReducedMotion } from 'framer-motion'

function Palm({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 120 220" className="h-full w-full" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      {/* trunk */}
      <path
        d="M58 220 C 54 160, 50 110, 60 70 C 62 60, 66 56, 70 54"
        stroke="rgb(var(--bg-soft))"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      {/* fronds */}
      <g fill="rgb(var(--bg-soft))">
        <path d="M68 54 C 40 40, 18 44, 4 56 C 28 50, 50 54, 68 60 Z" />
        <path d="M70 54 C 78 26, 96 12, 116 8 C 96 22, 82 38, 74 58 Z" />
        <path d="M70 56 C 96 46, 116 50, 120 64 C 100 58, 82 60, 72 64 Z" />
        <path d="M66 54 C 52 28, 36 16, 16 14 C 40 24, 56 38, 66 60 Z" />
        <path d="M68 56 C 70 30, 64 12, 52 2 C 64 20, 66 40, 68 60 Z" />
      </g>
    </svg>
  )
}

/** 80s palm-tree silhouettes — Vice mode only (controlled by caller). */
export function Palms() {
  const reduce = useReducedMotion()
  const sway = reduce ? undefined : { rotate: [-1.5, 1.5, -1.5] }
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] hidden h-72 justify-between px-2 [[data-theme='vice']_&]:flex" aria-hidden>
      <motion.div
        className="h-full w-28 origin-bottom opacity-90 sm:w-40"
        animate={sway}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Palm />
      </motion.div>
      <motion.div
        className="h-full w-28 origin-bottom opacity-90 sm:w-40"
        animate={sway}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      >
        <Palm flip />
      </motion.div>
    </div>
  )
}
