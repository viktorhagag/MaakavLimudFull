'use client';
import { useEffect, useState } from 'react';
import { getSettings, setSettings } from '@/lib/storage';

const THEMES = ['light','dark','sepia','ocean','royal'] as const;

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(getSettings().theme);
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); const s = getSettings(); setSettings({ ...s, theme }); }, [theme]);
  return (
    <div className="space-y-2">
      <div className="font-medium">ערכת נושא</div>
      <div className="flex gap-2 flex-wrap">
        {THEMES.map(t => (
          <button key={t} onClick={() => setTheme(t)} className={`px-3 py-2 rounded-2xl border ${theme===t?'border-black/70':'border-black/20'}`} aria-pressed={theme===t}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
