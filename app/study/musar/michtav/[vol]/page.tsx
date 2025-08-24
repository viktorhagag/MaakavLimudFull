
// app/study/musar/michtav/[vol]/page.tsx
'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useBooks } from '@/lib/useBooks'
import BackButton from '@/components/ui/BackButton'
import ProgressBar from '@/components/ui/ProgressBar'
import { MICHTAV_VOL_CHAPTERS, genHebChapters } from '@/lib/musar'

export default function MichtavVolumePage(){
  const params = useParams<{ vol: string }>()
  const vol = Number(params.vol || '1')
  const volCount = MICHTAV_VOL_CHAPTERS[vol] ?? 30

  const { books, mark, rename } = useBooks()
  const parent = books.find(b => b.id === 'musar:michtav')
  // בונים מקומית את הפרקים לפי config (ללא יצירת ספר נוסף בזיכרון)
  const chapters = genHebChapters(volCount)

  const total = chapters.length
  const done = 0 // אם תרצה לשמר per-chapter state, אפשר ליצור book id: michtav:<vol> ולאכלס sections בלוקאל-סטורג'
  const pct = total ? done/total : 0

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <BackButton />
        <h1 className="text-xl font-bold">מכתב מאליהו — כרך {vol}</h1>
        <a className="btn-ghost" href="/">🏠</a>
      </div>

      {/* Tabs for volumes */}
      <div className="flex gap-2 overflow-x-auto rounded-xl border p-2 bg-white">
        {[1,2,3,4,5].map(v => (
          <Link
            key={v}
            href={`/study/musar/michtav/${v}`}
            className={`px-3 py-1 rounded-lg border transition ${
              v===vol ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-400'
            }`}
          >
            כרך {v}
          </Link>
        ))}
      </div>

      <div className="card">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium">התקדמות</span>
          <span className="text-sm opacity-75">{Math.round(pct*100)}%</span>
        </div>
        <ProgressBar value={pct} />
      </div>

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {chapters.map((s) => (
          <li key={s.id}>
            <div
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-blue-400 hover:bg-blue-50"
            >
              <div className="font-medium">{s.label}</div>
              {/* ניתן להחליף ל-RoundCheckbox ולחבר ל-state אם נייצר entities לסימון */}
              <input type="checkbox" className="h-5 w-5 rounded-full border-2 border-gray-300 text-green-600 focus:ring-2 focus:ring-green-400" />
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
