import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import faqData from '../../data/faq.json'
import type { FaqItem } from '../../types'

const faqs = faqData as FaqItem[]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="section">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions & answers"
        subtitle="The things everyone's asking about Grand Theft Auto VI."
      />
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((item, i) => {
          const isOpen = open === i
          return (
            <Reveal key={item.q} delay={i * 0.04}>
              <div className={`glass overflow-hidden transition-colors ${isOpen ? '!border-accent/50' : ''}`}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-lg tracking-wide sm:text-xl">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border ${
                      isOpen ? 'border-accent text-accent' : 'border-border/50 text-muted'
                    }`}
                  >
                    <FaPlus />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
