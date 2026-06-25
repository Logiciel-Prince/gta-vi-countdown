import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { Icon } from '../ui/Icon'
import { formatReleaseDateLabel } from '../../utils/time'
import release from '../../data/release.json'

interface InfoCard {
  icon: string
  label: string
  value: string
}

const CARDS: InfoCard[] = [
  { icon: 'date', label: 'Release Date', value: formatReleaseDateLabel(release.releaseDateISO) },
  { icon: 'modes', label: 'Platforms', value: release.platforms.join(' · ') },
  { icon: 'setting', label: 'Story Setting', value: release.setting },
  { icon: 'map', label: 'Location', value: 'Vice City, State of Leonida' },
  { icon: 'characters', label: 'Main Characters', value: release.protagonists.join(' & ') },
  { icon: 'publisher', label: 'Publisher', value: release.publisher },
  { icon: 'developer', label: 'Developer', value: release.developer },
  { icon: 'trailer', label: 'Official Trailer', value: 'Available — watch below' },
  { icon: 'genre', label: 'Genre', value: release.genre },
  { icon: 'engine', label: 'Engine', value: release.engine },
  { icon: 'modes', label: 'Game Modes', value: release.gameModes.join(' · ') },
  { icon: 'rating', label: 'Age Rating', value: release.ageRating },
]

export function LatestInfo() {
  return (
    <section id="info" className="section">
      <SectionHeading
        eyebrow="Latest Information"
        title="Everything we know"
        subtitle="The confirmed details and best-available info on Grand Theft Auto VI, all in one place."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -6 }}
            className="glass group relative flex items-start gap-4 overflow-hidden p-5"
          >
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-neon-pink/25 to-neon-blue/25 text-xl text-accent transition-transform group-hover:scale-110">
              <Icon name={card.icon} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                {card.label}
              </p>
              <p className="mt-1 font-medium text-text">{card.value}</p>
            </div>
            <span className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
