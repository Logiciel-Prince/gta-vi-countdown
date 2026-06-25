/** Copy text to the clipboard with a legacy fallback. Returns success. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.focus()
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

interface SharePayload {
  title: string
  text: string
  url?: string
}

/**
 * Share via the Web Share API when available, otherwise copy a
 * formatted string to the clipboard. Returns the method used.
 */
export async function shareOrCopy(payload: SharePayload): Promise<'shared' | 'copied' | 'failed'> {
  const url = payload.url ?? window.location.href
  if (navigator.share) {
    try {
      await navigator.share({ title: payload.title, text: payload.text, url })
      return 'shared'
    } catch (err) {
      // User cancelled the native sheet — not an error worth surfacing.
      if (err instanceof DOMException && err.name === 'AbortError') return 'failed'
    }
  }
  const ok = await copyToClipboard(`${payload.text} ${url}`)
  return ok ? 'copied' : 'failed'
}
