
'use client'
import { GEMARA_INDEX } from '@/lib/gemaraPages'

export default function GemaraIndexPage(){
  const grouped: Record<string, [string, {seder:string; lastDaf:string}][]> = {}
  Object.entries(GEMARA_INDEX).forEach(([name, info]) => {
    (grouped[info.seder] ||= []).push([name, info])
  })
  // Sort seder and tractates alphabetically by Hebrew string (basic)
  const sederOrder = Object.keys(grouped).sort((a,b)=>a.localeCompare(b))

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <a className="btn-ghost" href="/">← חזרה</a>
        <h1 className="text-xl font-bold">תלמוד בבלי – מסכתות</h1>
        <a className="btn-ghost" href="/">🏠</a>
      </div>

      {sederOrder.map(seder => {
        const items = grouped[seder].sort((a,b)=>a[0].localeCompare(b[0]))
        return (
          <section key={seder} className="card">
            <h2 className="mb-3 text-lg font-semibold">{seder}</h2>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {items.map(([name, info]) => (
                <li key={name} className="flex items-center justify-between rounded border p-3">
                  <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-xs opacity-70">דף אחרון: {info.lastDaf}</div>
                  </div>
                  <a className="btn" href={`/study/${encodeURIComponent('gemara:'+name)}`}>פתח</a>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </main>
  )
}
