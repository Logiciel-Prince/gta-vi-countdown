import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { SectionHeading } from '../ui/SectionHeading'
import { Icon } from '../ui/Icon'
import timelineData from '../../data/timeline.json'
import type { TimelineEvent } from '../../types'

const events = timelineData as TimelineEvent[]

const STATUS_STYLES: Record<TimelineEvent['status'], string> = {
  done: 'border-neon-blue/60 text-neon-blue',
  upcoming: 'border-neon-pink/60 text-neon-pink',
  future: 'border-neon-orange/60 text-neon-orange',
}

const STATUS_LABEL: Record<TimelineEvent['status'], string> = {
  done: 'Completed',
  upcoming: 'Upcoming',
  future: 'Future',
}

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  })
  const lineScale = useSpring(scrollYProgress, { stiffness: 80, damping: 24 })

  return (
    <section id="timeline" className="section">
      <SectionHeading
        eyebrow="Timeline"
        title="The road to launch"
        subtitle="From the first announcement to launch day and beyond — track every milestone."
      />

      <div ref={ref} className="relative mx-auto max-w-3xl">
        {/* center rail */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-border/40 md:left-1/2 md:-translate-x-1/2">
          <motion.div
            className="absolute inset-x-0 top-0 origin-top rounded-full"
            style={{
              scaleY: lineScale,
              height: '100%',
              backgroundImage: 'linear-gradient(rgb(var(--neon-blue)), rgb(var(--neon-pink)), rgb(var(--neon-orange)))',
              boxShadow: '0 0 12px rgb(var(--accent) / 0.6)',
            }}
          />
        </div>

        <ul className="space-y-8">
          {events.map((ev, i) => {
            const left = i % 2 === 0
            return (
              <li
                key={ev.id}
                className={`relative pl-12 md:w-1/2 md:pl-0 ${
                  left ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                }`}
              >
                {/* node */}
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className={`absolute top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 bg-bg ${STATUS_STYLES[ev.status]} left-0 ${
                    left
                      ? 'md:left-auto md:right-0 md:translate-x-1/2'
                      : 'md:left-0 md:-translate-x-1/2'
                  }`}
                >
                  <Icon name={ev.icon} className="text-sm" />
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, x: left ? -30 : 30, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  className="glass p-5"
                >
                  <div className={`mb-2 flex items-center gap-2 ${left ? 'md:justify-end' : ''}`}>
                    <span className="font-mono text-sm text-accent">{ev.date}</span>
                    <span className={`chip ${STATUS_STYLES[ev.status]} !border`}>
                      {STATUS_LABEL[ev.status]}
                    </span>
                  </div>
                  <h3 className="font-display text-xl tracking-wide">{ev.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{ev.description}</p>
                </motion.div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
