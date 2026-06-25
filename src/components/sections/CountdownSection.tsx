import { motion } from 'framer-motion'
import { FaRegHeart, FaHeart, FaShareNodes, FaRegCopy, FaRegClock, FaLocationDot } from 'react-icons/fa6'
import { CountdownUnits } from '../countdown/CountdownUnits'
import { ReleasedBanner } from '../countdown/ReleasedBanner'
import { Reveal } from '../ui/Reveal'
import { useClock } from '../../hooks/useClock'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useToast } from '../../context/ToastContext'
import {
  formatLocalTime,
  formatReleaseDateLabel,
  formatReleaseInUserTz,
  getTimezoneLabel,
  getUserTimezone,
} from '../../utils/time'
import { copyToClipboard, shareOrCopy } from '../../utils/share'
import release from '../../data/release.json'
import type { TimeLeft } from '../../types'

interface CountdownSectionProps {
  timeLeft: TimeLeft
}

export function CountdownSection({ timeLeft }: CountdownSectionProps) {
  const now = useClock()
  const notify = useToast()
  const [favorited, setFavorited] = useLocalStorage('gta6-favorite', false)

  const tz = getUserTimezone()
  const tzLabel = getTimezoneLabel(now)
  const localReleaseDate = formatReleaseDateLabel(release.releaseDateISO)
  const progressPct = (timeLeft.progress * 100).toFixed(2)

  const handleShare = async () => {
    const text = timeLeft.isReleased
      ? `GTA VI is finally out! 🎉`
      : `Only ${timeLeft.years}y ${timeLeft.months}m ${timeLeft.days}d until GTA VI drops in Vice City! 🌴`
    const result = await shareOrCopy({ title: 'GTA VI Countdown', text })
    if (result === 'copied') notify('Countdown copied to clipboard')
    else if (result === 'shared') notify('Thanks for sharing!')
  }

  const handleCopyDate = async () => {
    const ok = await copyToClipboard(`GTA VI releases on ${localReleaseDate}`)
    notify(ok ? 'Release date copied' : 'Could not copy')
  }

  const handleFavorite = () => {
    setFavorited((v) => !v)
    notify(favorited ? 'Removed from favorites' : 'Added to favorites ❤️')
  }

  return (
    <section id="countdown" className="section pt-28">
      <Reveal>
        <div className="glass-strong relative mx-auto max-w-5xl overflow-hidden p-6 sm:p-10">
          {/* glow accents */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-neon-pink/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-60 w-60 rounded-full bg-neon-blue/20 blur-3xl" />

          <div className="relative">
            {/* header row */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="chip mb-2">Release Countdown</span>
                <h2 className="font-display text-3xl uppercase tracking-wide sm:text-4xl">
                  <span className="text-gradient">{localReleaseDate}</span>
                </h2>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                  <FaLocationDot className="text-accent" />
                  {formatReleaseInUserTz(release.releaseDateISO)}
                </p>
              </div>

              <button
                onClick={handleFavorite}
                aria-pressed={favorited}
                className={`btn-ghost self-start sm:self-auto ${favorited ? '!border-neon-pink !text-neon-pink' : ''}`}
              >
                {favorited ? <FaHeart /> : <FaRegHeart />}
                {favorited ? 'Favorited' : 'Favorite'}
              </button>
            </div>

            {timeLeft.isReleased ? (
              <ReleasedBanner />
            ) : (
              <>
                <CountdownUnits timeLeft={timeLeft} size="md" />

                {/* progress */}
                <div className="mt-8">
                  <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted">
                    <span>Announcement</span>
                    <span className="text-accent">{progressPct}% there</span>
                    <span>Launch</span>
                  </div>
                  <div className="relative h-3 overflow-hidden rounded-full bg-surface-2/70">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        backgroundImage:
                          'linear-gradient(90deg, rgb(var(--neon-pink)), rgb(var(--neon-orange)), rgb(var(--neon-blue)))',
                        boxShadow: '0 0 14px rgb(var(--accent) / 0.7)',
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${timeLeft.progress * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <div className="neon-grid absolute inset-0 opacity-30" />
                  </div>
                </div>
              </>
            )}

            {/* meta + actions */}
            <div className="mt-8 flex flex-col gap-4 border-t border-border/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <span className="flex items-center gap-2 text-muted">
                  <FaRegClock className="text-accent" />
                  Local time:{' '}
                  <span className="font-mono text-text">{formatLocalTime(now)}</span>
                </span>
                <span className="flex items-center gap-2 text-muted">
                  <FaLocationDot className="text-accent" />
                  {tz} <span className="text-text">({tzLabel})</span>
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button onClick={handleShare} className="btn-ghost !px-4 !py-2 text-sm">
                  <FaShareNodes /> Share
                </button>
                <button onClick={handleCopyDate} className="btn-ghost !px-4 !py-2 text-sm">
                  <FaRegCopy /> Copy Date
                </button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
