import { adsEnabled, isRealSlot } from '../../config/ads'
import { AdUnit } from './AdSense'

interface AdCardProps {
  slot: string
  className?: string
}

/**
 * A tasteful, on-brand container for a manual ad unit: a centered glass card
 * with a small "Advertisement" label (required by AdSense policy — ads must
 * be clearly distinguishable from content). Renders nothing in production
 * until a real publisher ID + slot are configured, so it never leaves a gap.
 */
export function AdCard({ slot, className }: AdCardProps) {
  if (!import.meta.env.DEV && !(adsEnabled && isRealSlot(slot))) return null

  return (
    <div className={`mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 ${className ?? ''}`}>
      <div className="glass relative overflow-hidden p-3">
        <span className="absolute left-3 top-2 text-[10px] font-semibold uppercase tracking-widest text-muted/70">
          Advertisement
        </span>
        <div className="pt-5">
          <AdUnit slot={slot} />
        </div>
      </div>
    </div>
  )
}
