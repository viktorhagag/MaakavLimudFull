'use client';
import { useEffect, useMemo, useState } from 'react';
import { getProgress } from '@/lib/storage';
import { computeDailyCounts, computeStreak } from '@/utils/progress';
import dynamic from 'next/dynamic';
const ProgressAreaChart = dynamic(() => import('@/components/Charts/ProgressAreaChart'), { ssr: false });

export default function Page() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const onFocus = () => setTick(t => t + 1); window.addEventListener('focus', onFocus); return () => window.removeEventListener('focus', onFocus); }, []);
  const entries = useMemo(() => getProgress(), [tick]);
  const total = entries.length; const done = entries.filter(e => e.done).length; const streak = computeStreak(entries);
  const series = computeDailyCounts(entries, 30);

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-2">לוח מחוונים</h1>
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl border"><div className="text-sm text-black/60">סך יחידות</div><div className="text-2xl font-bold">{total}</div></div>
        <div className="p-4 rounded-2xl border"><div className="text-sm text-black/60">הושלמו</div><div className="text-2xl font-bold">{done}</div></div>
        <div className="p-4 rounded-2xl border"><div className="text-sm text-black/60">רצף נוכחי</div><div className="text-2xl font-bold">{streak.current} ימים</div></div>
      </div>
      <div className="p-4 rounded-2xl border">
        <div className="mb-2 font-medium">פעילות 30 הימים האחרונים</div>
        <ProgressAreaChart data={series} />
      </div>
    </main>
  );
}
