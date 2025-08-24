
import type { Section, Book } from './types'
import { numberToHebrewLetters } from './hebrew'

// ניתן להתאים את מספר הפרקים לכל כרך לפי המהדורה שלך
export const MICHTAV_VOL_CHAPTERS: Record<number, number> = {
  1: 30,
  2: 30,
  3: 30,
  4: 30,
  5: 30,
}

export function genHebChapters(count: number, prefix = 'פרק'): Section[] {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    label: `${prefix} ${numberToHebrewLetters(i + 1)}`,
    done: false,
  }))
}

export function michtavParentBook(): Book {
  const vols: Section[] = [1,2,3,4,5].map(v => ({
    id: String(v),
    label: `כרך ${numberToHebrewLetters(v)}`,
    done: false,
  }))
  return {
    id: 'musar:michtav',
    title: 'מכתב מאליהו',
    category: 'Musar',
    sections: vols,
    progress: 0,
    parentPath: 'musar',
  }
}
