import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { FaBars, FaXmark } from 'react-icons/fa6'
import { ThemeToggle } from './ThemeToggle'

const LINKS = [
  { href: '#countdown', label: 'Countdown' },
  { href: '#info', label: 'Info' },
  { href: '#features', label: 'Features' },
  { href: '#trailer', label: 'Trailer' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-[80] transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 ${
          scrolled ? '' : ''
        }`}
      >
        <a
          href="#top"
          className="group flex items-center gap-2 font-display text-2xl tracking-wider"
        >
          <span className="text-gradient text-glow">GTA VI</span>
          <span className="hidden text-xs font-sans font-medium uppercase tracking-[0.3em] text-muted sm:inline">
            Countdown
          </span>
        </a>

        {/* Desktop links */}
        <div
          className={`hidden items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur-xl lg:flex ${
            scrolled ? 'border-border/40 bg-surface/60' : 'border-transparent bg-transparent'
          }`}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface-2/70 hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-surface/60 text-lg backdrop-blur-md lg:hidden"
          >
            {open ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-4 mt-2 overflow-hidden lg:hidden"
          >
            <div className="glass-strong grid grid-cols-2 gap-1 p-3">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-surface-2/70 hover:text-text"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
