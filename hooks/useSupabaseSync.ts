import { useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { ProgressEntry, getProgress, setProgress, nowISO } from '@/lib/storage';

export function useSupabaseSync() {
  const getUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }, []);

  const pullRemote = useCallback(async () => {
    const user = await getUser();
    if (!user) throw new Error('לא מחובר');
    const { data, error } = await supabase.from('progress').select('*').eq('user_id', user.id);
    if (error) throw error;

    const local = getProgress();
    const map = new Map<string, ProgressEntry>();
    for (const e of local) map.set(`${e.bookId}__${e.unitId}`, e);
    for (const r of (data || [])) {
      const key = `${r.book_id}__${r.unit_id}`;
      const remote: ProgressEntry = { bookId: r.book_id, unitId: r.unit_id, done: !!r.status, completedAt: r.completed_at ?? undefined, updatedAt: r.updated_at ?? nowISO() };
      const cur = map.get(key);
      if (!cur || (remote.updatedAt > cur.updatedAt)) map.set(key, remote);
    }
    setProgress(Array.from(map.values()));
    return { merged: true, count: map.size };
  }, [getUser]);

  const pushLocal = useCallback(async () => {
    const user = await getUser();
    if (!user) throw new Error('לא מחובר');
    const local = getProgress();
    for (const e of local) {
      const { error } = await supabase.from('progress').upsert({
        user_id: user.id, book_id: e.bookId, unit_id: e.unitId, status: e.done,
        completed_at: e.completedAt ?? null, updated_at: e.updatedAt
      });
      if (error) throw error;
    }
    return { pushed: local.length };
  }, [getUser]);

  return { pullRemote, pushLocal };
}
