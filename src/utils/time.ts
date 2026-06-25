import type { TimeLeft } from '../types'

/** The user's auto-detected IANA timezone, e.g. "America/New_York". */
export function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  } catch {
    return 'UTC'
  }
}

/** Short timezone label like "GMT+5:30" or "PDT" for display. */
export function getTimezoneLabel(date = new Date()): string {
  try {
    const parts = new Intl.DateTimeFormat(undefined, {
      timeZoneName: 'short',
    }).formatToParts(date)
    return parts.find((p) => p.type === 'timeZoneName')?.value ?? ''
  } catch {
    return ''
  }
}

/**
 * Compute the calendar-accurate breakdown between now and the target.
 * Years/months are derived by walking the calendar so they respect
 * variable month lengths and leap years.
 */
export function getTimeLeft(targetISO: string, announcementISO: string, now = new Date()): TimeLeft {
  const target = new Date(targetISO)
  const announcement = new Date(announcementISO)
  const totalMs = target.getTime() - now.getTime()

  const span = target.getTime() - announcement.getTime()
  const elapsed = now.getTime() - announcement.getTime()
  const progress = span <= 0 ? 1 : Math.min(1, Math.max(0, elapsed / span))

  if (totalMs <= 0) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0,
      isReleased: true,
      progress: 1,
    }
  }

  // Walk calendar units from `now` up to `target`.
  let years = target.getFullYear() - now.getFullYear()
  let months = target.getMonth() - now.getMonth()
  let days = target.getDate() - now.getDate()
  let hours = target.getHours() - now.getHours()
  let minutes = target.getMinutes() - now.getMinutes()
  let seconds = target.getSeconds() - now.getSeconds()

  if (seconds < 0) {
    seconds += 60
    minutes -= 1
  }
  if (minutes < 0) {
    minutes += 60
    hours -= 1
  }
  if (hours < 0) {
    hours += 24
    days -= 1
  }
  if (days < 0) {
    // Borrow days from the previous month relative to target.
    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0).getDate()
    days += prevMonth
    months -= 1
  }
  if (months < 0) {
    months += 12
    years -= 1
  }

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    total: totalMs,
    isReleased: false,
    progress,
  }
}

export function formatLocalTime(date = new Date()): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date)
}

export function formatLocalDate(date = new Date()): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

/**
 * Localized calendar date of the release instant (e.g. "November 19, 2026"),
 * rendered in the viewer's own timezone. Because the instant is fixed (UTC),
 * the label naturally shifts to the correct local date wherever you are.
 */
export function formatReleaseDateLabel(targetISO: string): string {
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(targetISO))
}

/** Format the release date in the user's locale + timezone. */
export function formatReleaseInUserTz(targetISO: string): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(new Date(targetISO))
}
