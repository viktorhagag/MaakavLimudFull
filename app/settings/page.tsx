
'use client'
import ThemePicker from '@/components/ui/ThemePicker'
import { useBooks } from '@/lib/useBooks'
import { supabase } from '@/lib/storage'
import { useEffect, useState } from 'react'
export default function SettingsPage(){
  const { books } = useBooks()
  const [email,setEmail] = useState('')
  const [status,setStatus] = useState('')
  useEffect(()=>{ if(!supabase) return; supabase.auth.getUser().then(({data})=>{}) },[])
  async function signIn(){
    if(!supabase){ setStatus('Supabase לא מוגדר'); return; }
    const { error } = await supabase.auth.signInWithOtp({ email })
    setStatus(error? ('שגיאה: '+error.message) : 'נשלח קוד לכתובת הדוא״ל')
  }
  async function exportJSON(){
    const blob = new Blob([JSON.stringify(books, null, 2)], { type:'application/json' })
    const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='torah-tracker-backup.json'; a.click(); URL.revokeObjectURL(url);
  }
  return (
    <main className="space-y-6">
      <section className="card space-y-2">
        <h2 className="text-xl font-semibold">ערכות נושא</h2>
        <ThemePicker />
      </section>
      <section className="card space-y-3">
        <h2 className="text-xl font-semibold">גיבוי וכניסה</h2>
        <p className="opacity-80">ברירת מחדל: ללא התחברות, נתונים מקומיים בלבד. התחברות באימייל מאפשרת גיבוי בענן.</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input className="rounded border px-3 py-2" placeholder="אימייל" value={email} onChange={e=>setEmail(e.target.value)} />
          <button className="btn" onClick={signIn}>התחברות OTP</button>
        </div>
        <div className="text-sm opacity-80">{status}</div>
        <div className="flex gap-2">
          <button className="btn" onClick={exportJSON}>ייצוא JSON</button>
          <label className="btn-ghost">
            ייבוא JSON
            <input type="file" accept="application/json" className="hidden" onChange={async (e)=>{
              const f = e.target.files?.[0]; if(!f) return;
              const txt = await f.text(); localStorage.setItem('torah-tracker-v1', txt); location.reload();
            }} />
          </label>
        </div>
      </section>
    </main>
  )
}
