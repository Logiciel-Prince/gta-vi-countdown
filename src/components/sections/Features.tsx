import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { Icon } from '../ui/Icon'
import featuresData from '../../data/features.json'
import type { Feature } from '../../types'

const features = featuresData as Feature[]

export function Features() {
  return (
    <section id="features" className="section">
      <SectionHeading
        eyebrow="Features"
        title="A living, breathing world"
        subtitle="From the densest open world Rockstar has ever built to systems that make every street feel alive."
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.article
            key={f.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass group relative overflow-hidden p-6"
          >
            {/* corner glow on hover */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-all duration-500 group-hover:bg-accent/25" />

            <div className="relative">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-pink/25 via-neon-purple/20 to-neon-blue/25 text-2xl text-accent shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Icon name={f.icon} />
              </div>

              <div className="mb-2 flex items-center gap-2">
                <h3 className="font-display text-2xl tracking-wide">{f.title}</h3>
                {f.badge && (
                  <span className="chip !border-neon-orange/50 !text-neon-orange">
                    {f.badge}
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-muted">{f.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
