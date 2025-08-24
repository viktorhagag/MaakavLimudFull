import { ProgressEntry } from '@/lib/storage';

function dayStr(d: Date) { return d.toISOString().slice(0,10); }

export function computeDailyCounts(entries: ProgressEntry[], days = 30) {
  const today = new Date();
  const map: Record<string, number> = {};
  for (let i=0; i<days; i++) { const d = new Date(today); d.setDate(today.getDate() - i); map[dayStr(d)] = 0; }
  entries.forEach(e => { if (!e.completedAt) return; const key = e.completedAt.slice(0,10); if (key in map) map[key] += 1; });
  return Object.entries(map).sort(([a],[b]) => a.localeCompare(b)).map(([date, value]) => ({ date, value as number }));
}

export function computeStreak(entries: ProgressEntry[]): { current: number; longest: number } {
  const days = computeDailyCounts(entries, 400).filter(p => p.value > 0).map(p => p.date);
  if (days.length === 0) return { current: 0, longest: 0 };
  const set = new Set(days);
  const toDate = (s: string) => new Date(s + 'T00:00:00Z');
  const addDays = (d: Date, n: number) => new Date(d.getTime() + n*86400000);

  let longest = 0;
  for (const start of days) {
    const prev = addDays(toDate(start), -1).toISOString().slice(0,10);
    if (set.has(prev)) continue;
    let len = 1;
    while (set.has(addDays(toDate(start), len).toISOString().slice(0,10))) len++;
    if (len > longest) longest = len;
  }

  let current = 0;
  let cur = new Date();
  while (set.has(cur.toISOString().slice(0,10))) { current++; cur = new Date(cur.getTime() - 86400000); }
  return { current, longest };
}
