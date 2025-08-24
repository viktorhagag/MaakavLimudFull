// lib/gemaraPages.ts
export type TractateInfo = { seder: string; lastDaf: string }
import { numberToHebrewLetters } from './hebrew'

// מסכת → {סדר, דף אחרון} (וילנה)
export const GEMARA_INDEX: Record<string, TractateInfo> = {
  'ברכות': { seder: 'זרעים', lastDaf: 'סד׳' },

  'שבת': { seder: 'מועד', lastDaf: 'קנז׳' },
  'עירובין': { seder: 'מועד', lastDaf: 'קה׳' },
  'פסחים': { seder: 'מועד', lastDaf: 'קכא׳' },
  'ראש השנה': { seder: 'מועד', lastDaf: 'לה׳' },
  'ביצה': { seder: 'מועד', lastDaf: 'מ׳' },
  'תענית': { seder: 'מועד', lastDaf: 'לא׳' },
  'מגילה': { seder: 'מועד', lastDaf: 'לב׳' },
  'מועד קטן': { seder: 'מועד', lastDaf: 'כט׳' },
  'חגיגה': { seder: 'מועד', lastDaf: 'כז׳' },

  'יבמות': { seder: 'נשים', lastDaf: 'קכב׳' },
  'כתובות': { seder: 'נשים', lastDaf: 'קיב׳' },
  'נדרים': { seder: 'נשים', lastDaf: 'צא׳' },
  'נזיר': { seder: 'נשים', lastDaf: 'סו׳' },
  'סוטה': { seder: 'נשים', lastDaf: 'מט׳' },
  'גיטין': { seder: 'נשים', lastDaf: 'צ׳' },
  'קידושין': { seder: 'נשים', lastDaf: 'פב׳' },

  'בבא קמא': { seder: 'נזיקין', lastDaf: 'קיט׳' },
  'בבא מציעא': { seder: 'נזיקין', lastDaf: 'קיט׳' },
  'בבא בתרא': { seder: 'נזיקין', lastDaf: 'קעו׳' },
  'סנהדרין': { seder: 'נזיקין', lastDaf: 'קיג׳' },
  'מכות': { seder: 'נזיקין', lastDaf: 'כד׳' },
  'שבועות': { seder: 'נזיקין', lastDaf: 'מט׳' },
  'עבודה זרה': { seder: 'נזיקין', lastDaf: 'עו׳' },
  'הוריות': { seder: 'נזיקין', lastDaf: 'יד׳' },

  'זבחים': { seder: 'קדשים', lastDaf: 'קכ׳' },
  'מנחות': { seder: 'קדשים', lastDaf: 'קי׳' },
  'חולין': { seder: 'קדשים', lastDaf: 'קמב׳' },
  'בכורות': { seder: 'קדשים', lastDaf: 'סא׳' },
  'ערכין': { seder: 'קדשים', lastDaf: 'לד׳' },
  'תמורה': { seder: 'קדשים', lastDaf: 'לד׳' },
  'כריתות': { seder: 'קדשים', lastDaf: 'כח׳' },
  'מעילה': { seder: 'קדשים', lastDaf: 'כב׳' },
  'קינים': { seder: 'קדשים', lastDaf: 'ג׳' },
  'תמיד': { seder: 'קדשים', lastDaf: 'י׳' },
  'מידות': { seder: 'קדשים', lastDaf: 'ג׳' },

  'נדה': { seder: 'טהרות', lastDaf: 'עג׳' },
}

// המרה מאותיות למספר
const table: Record<string, number> = {
  'א':1,'ב':2,'ג':3,'ד':4,'ה':5,'ו':6,'ז':7,'ח':8,'ט':9,'י':10,
  'כ':20,'ל':30,'מ':40,'נ':50,'ס':60,'ע':70,'פ':80,'צ':90,
  'ק':100,'ר':200,'ש':300,'ת':400
}
function hebrewToNumber(heb: string): number {
  const clean = heb.replace(/["׳״]/g, '')
  if (clean === 'טו') return 15
  if (clean === 'טז') return 16
  return clean.split('').reduce((s, ch) => s + (table[ch] || 0), 0)
}

/** יוצר רשימת דפים למסכת (מ־דף ב׳ ועד האחרון) עם תווית "דף א׳" וכו׳ */
export function generateDappim(lastDafHeb: string) {
  const last = hebrewToNumber(lastDafHeb)
  const arr = [] as { id: string; label: string; done: boolean }[]
  for (let i = 2; i <= last; i++) {
    arr.push({ id: String(i), label: `דף ${numberToHebrewLetters(i)}`, done: false })
  }
  return arr
}