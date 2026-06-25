import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { FaDice, FaLightbulb } from 'react-icons/fa6'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { randomIndex } from '../../utils/format'
import facts from '../../data/facts.json'

export function FunFacts() {
  const [index, setIndex] = useState(() => randomIndex(facts.length))

  const next = useCallback(() => {
    setIndex((prev) => randomIndex(facts.length, prev))
  }, [])

  // React to the global "R" keyboard shortcut.
  useEffect(() => {
    const handler = () => next()
    window.addEventListener('gta6:random-fact', handler)
    return () => window.removeEventListener('gta6:random-fact', handler)
  }, [next])

  return (
    <section id="facts" className="section">
      <SectionHeading
        eyebrow="Fun Facts"
        title="Did you know?"
        subtitle="Hit the dice for another nugget of GTA VI trivia. (Tip: press R anywhere.)"
      />
      <Reveal>
        <div className="glass-strong relative mx-auto flex max-w-3xl flex-col items-center gap-6 overflow-hidden p-8 text-center sm:p-12">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-pink/30 to-neon-blue/30 text-3xl text-accent shadow-glow">
            <FaLightbulb />
          </div>

          <div className="relative flex min-h-[6rem] items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg font-medium leading-relaxed text-text sm:text-2xl"
              >
                “{facts[index]}”
              </motion.p>
            </AnimatePresence>
          </div>

          <button onClick={next} className="btn-primary">
            <FaDice /> Random Fact
          </button>
          <span className="text-xs text-muted">
            Fact {index + 1} of {facts.length}
          </span>
        </div>
      </Reveal>
    </section>
  )
}
