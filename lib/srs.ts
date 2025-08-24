// lib/srs.ts
export type SrsLevel = 0 | 1 | 2 | 3 | 4 | 5
const intervalsDays = [0, 1, 3, 7, 14, 30] as const

export function nextReviewDate(from: Date, level: SrsLevel): Date {
  const d = new Date(from)
  d.setDate(d.getDate() + intervalsDays[level])
  return d
}

const MIN: SrsLevel = 0
const MAX: SrsLevel = 5

export function promote(level: SrsLevel, success: boolean): SrsLevel {
  const next = success ? (level + 1) : (level - 1)
  const clamped = next < MIN ? MIN : (next > MAX ? MAX : next)
  return clamped as SrsLevel
}
