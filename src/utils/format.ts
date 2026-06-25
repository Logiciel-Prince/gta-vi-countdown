export function pad2(n: number): string {
  return n.toString().padStart(2, '0')
}

export function pct(value: number): string {
  return `${(value * 100).toFixed(4)}%`
}

/** Pick a random item, optionally avoiding the current one. */
export function randomItem<T>(arr: readonly T[], avoid?: T): T {
  if (arr.length <= 1) return arr[0]
  let next = arr[Math.floor(Math.random() * arr.length)]
  let guard = 0
  while (next === avoid && guard < 10) {
    next = arr[Math.floor(Math.random() * arr.length)]
    guard++
  }
  return next
}

/** Pick a random index, optionally avoiding the current one. */
export function randomIndex(length: number, avoid?: number): number {
  if (length <= 1) return 0
  let next = Math.floor(Math.random() * length)
  let guard = 0
  while (next === avoid && guard < 10) {
    next = Math.floor(Math.random() * length)
    guard++
  }
  return next
}

export function linearGradient(colors: string[], angle = 135): string {
  return `linear-gradient(${angle}deg, ${colors.join(', ')})`
}
