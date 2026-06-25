import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaKeyboard, FaXmark } from 'react-icons/fa6'
import { useLocalStorage } from '../../hooks/useLocalStorage'

/** Small dismissible hint advertising the keyboard shortcuts. */
export function ShortcutHint() {
  const [dismissed, setDismissed] = useLocalStorage('gta6-hint-dismissed', false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (dismissed) return
    const t = window.setTimeout(() => setShow(true), 2500)
    return () => window.clearTimeout(t)
  }, [dismissed])

  const close = () => {
    setShow(false)
    setDismissed(true)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30, x: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="glass-strong fixed bottom-5 left-5 z-[70] hidden max-w-xs items-center gap-3 rounded-2xl p-4 pr-10 sm:flex"
        >
          <FaKeyboard className="text-xl text-accent" />
          <p className="text-sm text-muted">
            Press{' '}
            <kbd className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-text">V</kbd>{' '}
            for Vice mode ·{' '}
            <kbd className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-text">R</kbd>{' '}
            for a random fact
          </p>
          <button
            onClick={close}
            aria-label="Dismiss"
            className="absolute right-2 top-2 text-muted hover:text-text"
          >
            <FaXmark />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
