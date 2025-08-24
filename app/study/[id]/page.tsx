
// app/study/[id]/page.tsx (קטע רלוונטי למכתב מאליהו)
'use client'
import { useParams } from 'next/navigation'
import { useBooks } from '@/lib/useBooks'
import BackButton from '@/components/ui/BackButton'
import ProgressBar from '@/components/ui/ProgressBar'
import Link from 'next/link'

export default function StudyPage() {
  const params = useParams<{ id: string }>()
  const id = decodeURIComponent(params.id)
  const { books, mark, rename } = useBooks()
  const book = books.find(b => b.id === id)
  if (!book) return <div className="card">לא נמצא.</div>

  const total = book.sections?.length || 0
  const done = book.sections?.filter(s=>s.done).length || 0
  const pct = total ? done/total : 0

  const handleRename = (sid: string) => {
    const current = book.sections?.find(s=>s.id===sid)?.label || ''
    const next = prompt('שם חדש לפרק/סעיף', current)
    if (next) rename(book.id, sid, next)
  }

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <BackButton />
        <h1 className="text-xl font-bold">{book.title}</h1>
        <a className="btn-ghost" href="/">🏠</a>
      </div>

      <div className="card">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium">התקדמות</span>
          <span className="text-sm opacity-75">{Math.round(pct*100)}%</span>
        </div>
        <ProgressBar value={pct} />
      </div>

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {(book.sections||[]).map((s) => {
          // משנה ברורה – ניווט לעמוד סימן
          if (book.id === 'mb') {
            const siman = Number((s.id))
            return (
              <li key={s.id}>
                <Link
                  href={`/study/mb/siman/${siman}`}
                  className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-blue-400 hover:bg-blue-50"
                >
                  <div className="font-medium">{s.label}</div>
                </Link>
              </li>
            )
          }

          // מכתב מאליהו – כל כרטיס הוא כרך, נכנסים ללשונית הכרכים
          if (book.id === 'musar:michtav') {
            const vol = Number(s.id)
            return (
              <li key={s.id}>
                <Link
                  href={`/study/musar/michtav/${vol}`}
                  className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-blue-400 hover:bg-blue-50"
                >
                  <div className="font-medium">{s.label}</div>
                </Link>
              </li>
            )
          }

          // ברירת מחדל – כרטיס לסימון
          return (
            <li key={s.id}>
              <div className="card flex items-center justify-between gap-2">
                <div className="font-medium">{s.label}</div>
                <div className="flex items-center gap-2">
                  <button className="btn-ghost" onClick={() => handleRename(s.id)} title="שינוי שם">✏️</button>
                  <input
                    type="checkbox"
                    checked={!!s.done}
                    onChange={e => mark(book.id, s.id, e.target.checked)}
                    title="סימון ביצוע"
                  />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
