import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const OFFSET = 40

function buildVariants(direction: Direction): Variants {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y'
  const sign = direction === 'down' || direction === 'right' ? 1 : -1
  const from = direction === 'none' ? 0 : sign * OFFSET
  return {
    hidden: { opacity: 0, [axis]: from },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }
}

interface RevealProps {
  children: ReactNode
  direction?: Direction
  delay?: number
  className?: string
  amount?: number
}

/** Fade/slide content into view on scroll. Honors reduced-motion globally. */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className,
  amount = 0.2,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={buildVariants(direction)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
