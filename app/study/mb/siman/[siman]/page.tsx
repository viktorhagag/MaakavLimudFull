
// app/study/mb/siman/[siman]/page.tsx
'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useBooks } from '@/lib/useBooks'
import BackButton from '@/components/ui/BackButton'
import ProgressBar from '@/components/ui/ProgressBar'
import { sectionsForSimanDynamic } from '@/lib/mbIndex'

export default function MbSimanPage(){
  const params = useParams<{ siman: string }>()
  const siman = Number(params.siman)
  const { books, ensureMbSiman, mark, rename } = useBooks()
  const bookId = ensureMbSiman(siman)
  const book = books.find(b => b.id === bookId)
  const [ready, setReady] = useState(false)

  useEffect(()=>{
    async function ensureSections(){
      if (!book) return
      if (!book.sections || book.sections.length === 0) {
        const sections = await sectionsForSimanDynamic(siman)
        const raw = localStorage.getItem('torah-tracker-v1') || '[]'
        const arr = JSON.parse(raw)
        const idx = arr.findIndex((x:any)=>x.id===bookId)
        if (idx>=0){ arr[idx].sections = sections; localStorage.setItem('torah-tracker-v1', JSON.stringify(arr)); location.reload() }
      } else {
        setReady(true)
      }
    }
    ensureSections()
  }, [book, bookId, siman])

  if (!book || !book.sections || !ready) return <div className="card">טוען…</div>

  const total = book.sections?.length || 0
  const done = book.sections?.filter(s=>s.done).length || 0
  const pct = total ? done/total : 0

  const handleRename = (sid: string) => {
    const current = book.sections?.find(s=>s.id===sid)?.label || ''
    const next = prompt('שם חדש לסעיף', current)
    if (next) rename(book.id, sid, next)
  }

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <BackButton />
        <h1 className="text-xl font-bold">משנה ברורה – סימן {siman}</h1>
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
        {(book.sections||[]).map(s => (
          <li key={s.id} className="card flex items-center justify-between gap-2">
            <div className="font-medium">{s.label}</div>
            <div className="flex items-center gap-2">
              <button className="btn-ghost" onClick={() => handleRename(s.id)} title="שינוי שם">✏️</button>
              <input type="checkbox" checked={!!s.done} onChange={e=>mark(book.id, s.id, e.target.checked)} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
