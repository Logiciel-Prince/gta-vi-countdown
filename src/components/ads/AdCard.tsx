import { useCallback, useState } from 'react'
import { adsEnabled, isRealSlot } from '../../config/ads'
import { AdUnit } from './AdSense'

interface AdCardProps {
  slot: string
  className?: string
}

/**
 * A tasteful, on-brand container for a manual ad unit: a centered glass card
 * with a small "Advertisement" label (required by AdSense policy — ads must
 * be clearly distinguishable from content).
 *
 * The whole card is removed when there's no ad to show — either because it's
 * not configured, or because AdSense reported the slot as "unfilled" — so the
 * page never shows an empty advertisement frame. (In local development the
 * placeholder is always shown so you can see where ads will appear.)
 */
export function AdCard({ slot, className }: AdCardProps) {
  const [unfilled, setUnfilled] = useState(false)
  const handleStatus = useCallback((filled: boolean) => setUnfilled(!filled), [])

  const configured = adsEnabled && isRealSlot(slot)

  if (!import.meta.env.DEV && (!configured || unfilled)) return null

  return (
    <div className={`mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 ${className ?? ''}`}>
      <div className="glass relative overflow-hidden p-3">
        <span className="absolute left-3 top-2 text-[10px] font-semibold uppercase tracking-widest text-muted/70">
          Advertisement
        </span>
        <div className="pt-5">
          <AdUnit slot={slot} onStatusChange={handleStatus} />
        </div>
      </div>
    </div>
  )
}
