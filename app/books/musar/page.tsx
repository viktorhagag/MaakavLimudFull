// app/study/musar/page.tsx
'use client'
import Link from 'next/link'
import BackButton from '@/components/ui/BackButton'

const items = [
  { id: 'musar:מסילת ישרים', title: 'מסילת ישרים' },
  { id: 'musar:תניא', title: 'תניא – לקוטי אמרים' },
  { id: 'musar:michtav', title: 'מכתב מאליהו' },
]

export default function MusarListPage(){
  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <BackButton />
        <h1 className="text-xl font-bold">ספרי מוסר</h1>
        <a className="btn-ghost" href="/">🏠</a>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map(it => (
          <li key={it.id}>
            <Link
              href={`/study/${encodeURIComponent(it.id)}`}
              className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-blue-400 hover:bg-blue-50"
            >
              <div className="text-lg font-semibold">{it.title}</div>
              <div className="text-sm opacity-60">פרקים</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
