import { motion, useScroll, useSpring } from 'framer-motion'

/** A thin neon progress bar pinned to the top, tracking page scroll. */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[90] h-1 origin-left"
      style={{
        scaleX,
        backgroundImage: 'linear-gradient(90deg, rgb(var(--neon-pink)), rgb(var(--neon-orange)), rgb(var(--neon-blue)))',
        boxShadow: '0 0 12px rgb(var(--accent) / 0.7)',
      }}
      aria-hidden
    />
  )
}
