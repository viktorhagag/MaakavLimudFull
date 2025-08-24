
// lib/initData.ts – מוסר עם לשונית 'מכתב מאליהו' + כרכים
import type { Book, Section } from './types'
import { GEMARA_INDEX, generateDappim } from './gemaraPages'
import { generateMbSimanim } from './mbIndex'
import { numberToHebrewLetters } from './hebrew'
import { genHebChapters, michtavParentBook } from './musar'

function musarMesilatYesharim(): Book {
  return {
    id: 'musar:מסילת ישרים',
    title: 'מסילת ישרים',
    category: 'Musar',
    sections: genHebChapters(26),
    progress: 0,
    parentPath: 'musar',
  }
}

function musarTanya(): Book {
  return {
    id: 'musar:תניא',
    title: 'תניא – לקוטי אמרים',
    category: 'Musar',
    sections: genHebChapters(53),
    progress: 0,
    parentPath: 'musar',
  }
}

export function initialBooks(): Book[] {
  const gemaraBooks: Book[] = Object.entries(GEMARA_INDEX).map(([name, info]) => ({
    id: `gemara:${name}`,
    title: `מסכת ${name}`,
    category: 'Gemara',
    sections: generateDappim(info.lastDaf),
    progress: 0,
    parentPath: 'gemara',
  }))

  const mb: Book = {
    id: 'mb',
    title: 'משנה ברורה',
    category: 'MB',
    sections: generateMbSimanim(),
    progress: 0,
    parentPath: 'mb',
  }

  const mesilat = musarMesilatYesharim()
  const tanya = musarTanya()
  const michtav = michtavParentBook()

  return [mb, mesilat, tanya, michtav, ...gemaraBooks]
}
