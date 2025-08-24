
'use client'
import Link from 'next/link'
import ProgressBar from '@/components/ui/ProgressBar'
import { useBooks } from '@/lib/useBooks'

export default function Page(){
  const { books } = useBooks()
  const total = books.reduce((a,b)=>a+(b.sections?.length||0),0)
  const done = books.reduce((a,b)=>a+(b.sections?.filter(s=>s.done).length||0),0)
  const pct = total? done/total : 0

  return (
    <main className="space-y-6">
      <section className="card">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-semibold">התמונה הכללית</h2>
          <span className="text-sm opacity-80">{Math.round(pct*100)}%</span>
        </div>
        <ProgressBar value={pct} />
      </section>

      {/* Main categories */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link href="/books/gemara" className="card transition hover:opacity-90">
          <h3 className="mb-2 text-lg font-bold">תלמוד בבלי</h3>
          <p className="opacity-70 text-sm">סדרים → מסכתות → דפים</p>
        </Link>
        <Link href={`/study/${encodeURIComponent('mb')}`} className="card transition hover:opacity-90">
          <h3 className="mb-2 text-lg font-bold">משנה ברורה</h3>
          <p className="opacity-70 text-sm">סימנים (א׳–תרפ״ז) → סעיפים</p>
        </Link>
        <Link href={`/study/${encodeURIComponent('musar:mesilat-yasharim')}`} className="card transition hover:opacity-90">
          <h3 className="mb-2 text-lg font-bold">ספרי מוסר</h3>
          <p className="opacity-70 text-sm">מסילת ישרים (ברירת מחדל) → פרקים</p>
        </Link>
      </section>
    </main>
  )
}
