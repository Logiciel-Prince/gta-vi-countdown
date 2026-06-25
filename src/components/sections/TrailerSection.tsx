import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { YouTubeEmbed } from '../ui/YouTubeEmbed'
import release from '../../data/release.json'

export function TrailerSection() {
  return (
    <section id="trailer" className="section">
      <SectionHeading
        eyebrow="Official Trailer"
        title="Watch the reveal"
        subtitle="Press play and take a ride through the neon streets of Vice City."
      />
      <Reveal>
        <div className="glass-strong relative mx-auto max-w-4xl overflow-hidden p-3 sm:p-4">
          <div className="pointer-events-none absolute -left-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-neon-pink/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-neon-blue/20 blur-3xl" />
          <div className="relative">
            <YouTubeEmbed id={release.trailerId} title="Grand Theft Auto VI — Official Trailer" />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
