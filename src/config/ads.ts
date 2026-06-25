/**
 * AdSense configuration, driven entirely by environment variables so no
 * code changes are needed to go live. Set these in Vercel → Project →
 * Settings → Environment Variables (or a local .env file), then redeploy.
 *
 *   VITE_ADSENSE_CLIENT = ca-pub-XXXXXXXXXXXXXXXX   (your publisher ID)
 *
 * When VITE_ADSENSE_CLIENT is unset, the site renders with no ads at all
 * (and shows labeled placeholders only during local development).
 */
const DEFAULT_CLIENT = 'ca-pub-2451118269373873'

export const ADSENSE_CLIENT =
  (import.meta.env.VITE_ADSENSE_CLIENT as string | undefined)?.trim() || DEFAULT_CLIENT

/** True once a publisher ID is configured. */
export const adsEnabled = Boolean(ADSENSE_CLIENT && ADSENSE_CLIENT.startsWith('ca-pub-'))

/** A manual ad slot is "real" only when it's the numeric ID from the dashboard. */
export function isRealSlot(slot: string): boolean {
  return /^\d{6,}$/.test(slot)
}
