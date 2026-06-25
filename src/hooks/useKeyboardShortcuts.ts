import { useEffect } from 'react'

type ShortcutMap = Record<string, (e: KeyboardEvent) => void>

/**
 * Registers single-key shortcuts (case-insensitive). Ignores key events
 * fired while typing in inputs, textareas or contenteditable elements,
 * and ignores combos with modifier keys.
 */
export function useKeyboardShortcuts(shortcuts: ShortcutMap): void {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      ) {
        return
      }
      const fn = shortcuts[e.key.toLowerCase()]
      if (fn) {
        fn(e)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [shortcuts])
}
