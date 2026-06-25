import { useEffect, useState } from 'react'
import { getTimeLeft } from '../utils/time'
import type { TimeLeft } from '../types'

/** Ticks every second and recomputes the time remaining to the target. */
export function useCountdown(targetISO: string, announcementISO: string): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(targetISO, announcementISO),
  )

  useEffect(() => {
    // Recompute immediately when the target changes, then every second.
    setTimeLeft(getTimeLeft(targetISO, announcementISO))
    const id = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetISO, announcementISO))
    }, 1000)
    return () => window.clearInterval(id)
  }, [targetISO, announcementISO])

  return timeLeft
}
