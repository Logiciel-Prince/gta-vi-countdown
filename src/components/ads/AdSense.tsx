import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT, adsEnabled, isRealSlot } from '../../config/ads'

/**
 * Loads the Google AdSense library once, if a publisher ID is configured.
 * This single script is all that's needed for **Auto Ads** (you enable
 * placement from the AdSense dashboard) and to power any manual <AdUnit>s.
 */
export function AdSenseLoader() {
  useEffect(() => {
    if (!adsEnabled) return
    // The script is already in index.html <head>; only inject as a fallback.
    if (document.querySelector('script[src*="adsbygoogle.js"]')) return
    const s = document.createElement('script')
    s.async = true
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`
    s.crossOrigin = 'anonymous'
    s.setAttribute('data-adsense-loader', 'true')
    document.head.appendChild(s)
  }, [])
  return null
}

interface AdUnitProps {
  /** The numeric ad-slot ID from the AdSense dashboard (manual units only). */
  slot: string
  format?: string
  responsive?: boolean
  className?: string
  style?: React.CSSProperties
  /** Reports whether AdSense actually filled this slot with an ad. */
  onStatusChange?: (filled: boolean) => void
}

/**
 * A single manual display ad. Renders the real <ins> unit only when both a
 * publisher ID and a real (numeric) slot ID are present. Otherwise it shows
 * a labeled placeholder during development and nothing in production.
 *
 * It watches AdSense's `data-ad-status` and reports back via `onStatusChange`
 * so the parent can collapse the slot when no ad is served ("unfilled").
 */
export function AdUnit({
  slot,
  format = 'auto',
  responsive = true,
  className,
  style,
  onStatusChange,
}: AdUnitProps) {
  const insRef = useRef<HTMLModElement>(null)
  const pushed = useRef(false)
  const configured = adsEnabled && isRealSlot(slot)

  useEffect(() => {
    if (!configured) return
    const ins = insRef.current
    if (!ins) return

    if (!pushed.current) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        pushed.current = true
      } catch {
        /* AdSense not ready yet — it will retry on next load */
      }
    }

    const report = () => {
      const status = ins.getAttribute('data-ad-status')
      if (status === 'filled') onStatusChange?.(true)
      else if (status === 'unfilled') onStatusChange?.(false)
    }
    report()

    const observer = new MutationObserver(report)
    observer.observe(ins, { attributes: true, attributeFilter: ['data-ad-status'] })

    // Backstop: if AdSense never fills (e.g. not approved, blocked, no demand),
    // treat the slot as empty so the container can collapse.
    const timer = window.setTimeout(() => {
      if (ins.getAttribute('data-ad-status') !== 'filled') onStatusChange?.(false)
    }, 4000)

    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [configured, onStatusChange])

  if (!configured) {
    if (!import.meta.env.DEV) return null
    return (
      <div
        className={`flex min-h-[100px] items-center justify-center rounded-2xl border border-dashed border-border/60 bg-surface/30 text-xs text-muted ${className ?? ''}`}
      >
        Ad placeholder · set VITE_ADSENSE_CLIENT &amp; slot “{slot}”
      </div>
    )
  }

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle block ${className ?? ''}`}
      style={{ display: 'block', ...style }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  )
}
