import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FaQuoteLeft, FaArrowsRotate } from 'react-icons/fa6'
import { Reveal } from '../ui/Reveal'
import { randomIndex } from '../../utils/format'
import quotes from '../../data/quotes.json'

export function Quotes() {
  const [index, setIndex] = useState(() => randomIndex(quotes.length))
  const refresh = () => setIndex((prev) => randomIndex(quotes.length, prev))

  return (
    <section id="quotes" className="section !py-12">
      <Reveal>
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-neon-purple/15 via-transparent to-neon-blue/15 p-8 text-center sm:p-10">
          <div className="neon-grid pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-30" />
          <FaQuoteLeft className="mx-auto mb-5 text-3xl text-accent/70" />
          <div className="relative flex min-h-[4.5rem] items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="font-display text-2xl uppercase tracking-wide text-text sm:text-3xl"
              >
                {quotes[index]}
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted">
            Loading screen · Vice City
          </p>
          <button
            onClick={refresh}
            className="mx-auto mt-6 flex items-center gap-2 rounded-full border border-border/50 bg-surface/60 px-4 py-2 text-sm font-semibold text-muted transition-all hover:border-accent hover:text-accent"
          >
            <FaArrowsRotate /> New quote
          </button>
        </div>
      </Reveal>
    </section>
  )
}
