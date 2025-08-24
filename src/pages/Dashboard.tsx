import { useEffect, useMemo, useState } from 'react';
import { getProgress } from '../lib/storage';
import { computeDailyCounts, computeStreak } from '../utils/progress';
import ProgressAreaChart from '../components/Charts/ProgressAreaChart';

export default function Dashboard() {
  const [tick, setTick] = useState(0);

  // re-render on focus to pick up local changes
  useEffect(() => {
    const onFocus = () => setTick(t => t + 1);
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  const entries = useMemo(() => getProgress(), [tick]);
  const total = entries.length;
  const done = entries.filter(e => e.done).length;
  const streak = computeStreak(entries);
  const series = computeDailyCounts(entries, 30);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-2">לוח מחוונים</h1>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl border">
          <div className="text-sm text-black/60">סך יחידות</div>
          <div className="text-2xl font-bold">{total}</div>
        </div>
        <div className="p-4 rounded-2xl border">
          <div className="text-sm text-black/60">הושלמו</div>
          <div className="text-2xl font-bold">{done}</div>
        </div>
        <div className="p-4 rounded-2xl border">
          <div className="text-sm text-black/60">רצף נוכחי</div>
          <div className="text-2xl font-bold">{streak.current} ימים</div>
        </div>
      </div>

      <div className="p-4 rounded-2xl border">
        <div className="mb-2 font-medium">פעילות 30 הימים האחרונים</div>
        <ProgressAreaChart data={series} />
      </div>
    </div>
  );
}
