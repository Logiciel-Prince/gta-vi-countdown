import { linearGradient } from '../../utils/format'
import { Icon } from './Icon'

interface PlaceholderArtProps {
  gradient: string[]
  label?: string
  iconName?: string
  className?: string
}

/**
 * A copyright-safe stand-in for screenshots/art: an animated neon
 * gradient with a faint grid, a sun glow and a type label.
 */
export function PlaceholderArt({ gradient, label, iconName, className }: PlaceholderArtProps) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className ?? ''}`}
      style={{ backgroundImage: linearGradient(gradient) }}
    >
      {/* sun glow */}
      <div
        className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full opacity-70 blur-xl"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.7), transparent 70%)' }}
      />
      {/* grid floor */}
      <div className="neon-grid absolute inset-x-0 bottom-0 h-1/2 opacity-60" />
      {/* horizon line */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-white/40" />
      {/* grain / vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10" />

      {iconName && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name={iconName} className="text-5xl text-white/85 drop-shadow-lg" />
        </div>
      )}
      {label && (
        <span className="absolute left-3 top-3 rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  )
}
