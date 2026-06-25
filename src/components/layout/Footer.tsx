import { FaGithub, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { formatReleaseDateLabel } from '../../utils/time'
import release from '../../data/release.json'

export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-border/30 bg-bg-soft/50">
      <div className="neon-grid pointer-events-none absolute inset-x-0 top-0 h-24 opacity-30" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6 lg:px-8">
        <a href="#top" className="font-display text-3xl tracking-wider">
          <span className="text-gradient">GTA VI</span>{' '}
          <span className="text-muted">COUNTDOWN</span>
        </a>
        <p className="max-w-xl text-sm text-muted">
          Every second brings us closer to Vice City. Built by fans, for fans —
          counting down to {formatReleaseDateLabel(release.releaseDateISO)}.
        </p>
        <div className="flex items-center gap-3">
          {[
            { icon: <FaYoutube />, label: 'YouTube', href: 'https://www.youtube.com/' },
            { icon: <FaXTwitter />, label: 'X', href: 'https://x.com/' },
            { icon: <FaGithub />, label: 'GitHub', href: 'https://github.com/' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-surface/60 text-lg text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-glow"
            >
              {s.icon}
            </a>
          ))}
        </div>
        <p className="max-w-2xl text-xs leading-relaxed text-muted/70">
          This is an unofficial, non-commercial fan project. It is not affiliated
          with, endorsed by, or sponsored by Rockstar Games or Take-Two Interactive.
          “Grand Theft Auto”, “GTA” and all related marks are trademarks of their
          respective owners. No official assets are used.
        </p>
        <p className="text-xs text-muted/60">
          © {new Date().getFullYear()} GTA VI Countdown · Made with neon &amp; nostalgia.
        </p>
      </div>
    </footer>
  )
}
