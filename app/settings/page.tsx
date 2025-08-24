'use client';
import { useEffect, useState } from 'react';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { exportBundle, importBundle, resetAll, getSettings, setSettings } from '@/lib/storage';
import { useSupabaseSync } from '@/hooks/useSupabaseSync';
import { supabase } from '@/lib/supabaseClient';

export default function SettingsPage() {
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [cloudSync, setCloudSync] = useState(getSettings().cloudSync);
  const { pullRemote, pushLocal } = useSupabaseSync();

  useEffect(() => { supabase.auth.getUser().then(({ data: { user } }) => setLoggedIn(!!user)); }, []);

  async function handleLogin() {
    if (!email) return;
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } });
    if (error) alert(error.message); else alert('נשלח מייל התחברות. בדוק את התיבה ואשר.');
  }
  async function handleLogout() { await supabase.auth.signOut(); setLoggedIn(false); }

  function handleExport() {
    const blob = new Blob([JSON.stringify(exportBundle(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'torah-tracker-export.json'; a.click(); URL.revokeObjectURL(url);
  }
  function handleImport(ev: React.ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0]; if (!file) return; const reader = new FileReader();
    reader.onload = () => { try { const obj = JSON.parse(String(reader.result)); importBundle(obj); alert('יבוא הושלם!'); } catch (e:any) { alert('ייבוא נכשל: ' + e?.message); } };
    reader.readAsText(file);
  }
  function handleReset() { const ok = confirm('לאפס את כל הנתונים המקומיים?'); if (ok) { resetAll(); alert('בוצע.'); } }
  function toggleCloudSync(next: boolean) { setCloudSync(next); const s = getSettings(); setSettings({ ...s, cloudSync: next }); }

  return (
    <main className="max-w-2xl mx-auto p-4 space-y-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-2">הגדרות</h1>
      <section className="p-4 rounded-2xl border space-y-3">
        <div className="font-semibold">סנכרון ענן (Supabase)</div>
        {!loggedIn ? (
          <div className="space-y-2">
            <input type="email" placeholder="האימייל שלך" className="w-full px-3 py-2 rounded border" value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={handleLogin} className="px-3 py-2 rounded bg-black text-white">התחברות במייל (OTP)</button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span>מחובר ✅</span>
            <button onClick={handleLogout} className="px-3 py-2 rounded border">התנתק</button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <input id="cloud" type="checkbox" checked={cloudSync} onChange={e => toggleCloudSync(e.target.checked)} />
          <label htmlFor="cloud">הפעל סנכרון אוטומטי</label>
        </div>
        <div className="flex gap-2">
          <button onClick={async () => { try { const r = await pullRemote(); alert('ייבוא מהענן: ' + JSON.stringify(r)); } catch(e:any){ alert(e.message);} }} className="px-3 py-2 rounded border">משוך מהענן</button>
          <button onClick={async () => { try { const r = await pushLocal(); alert('דחיפה לענן: ' + JSON.stringify(r)); } catch(e:any){ alert(e.message);} }} className="px-3 py-2 rounded border">דחוף לענן</button>
        </div>
      </section>

      <section className="p-4 rounded-2xl border space-y-3">
        <div className="font-semibold">ייצוא / ייבוא</div>
        <div className="flex gap-2 items-center">
          <button onClick={handleExport} className="px-3 py-2 rounded border">ייצוא JSON</button>
          <input type="file" accept="application/json" onChange={handleImport} />
        </div>
      </section>

      <section className="p-4 rounded-2xl border space-y-3">
        <ThemeSwitcher />
      </section>

      <section className="p-4 rounded-2xl border space-y-3">
        <div className="font-semibold text-red-600">איפוס נתונים</div>
        <button onClick={handleReset} className="px-3 py-2 rounded border">אפס הכל</button>
      </section>
    </main>
  );
}
