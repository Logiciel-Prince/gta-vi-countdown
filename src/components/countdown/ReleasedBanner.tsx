import { motion } from 'framer-motion'

export function ReleasedBanner() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="flex flex-col items-center gap-4 py-6 text-center"
    >
      <motion.h2
        className="font-display text-5xl uppercase tracking-wide text-glow sm:text-7xl"
        animate={{
          backgroundPositionX: ['0%', '200%'],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgb(var(--neon-pink)), rgb(var(--neon-orange)), rgb(var(--neon-blue)), rgb(var(--neon-pink)))',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        🎉 GTA VI is out now!
      </motion.h2>
      <p className="max-w-lg text-lg text-muted">
        The wait is over. Welcome back to Vice City — go make some bad decisions.
      </p>
      <a
        href="https://www.rockstargames.com/VI"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
      >
        Play Now
      </a>
    </motion.div>
  )
}
