
'use client'
import { useTheme, type Theme } from '@/lib/theme'
const THEMES: Theme[] = ['light','dark','sepia','ocean','royal']
export default function ThemePicker(){
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex flex-wrap gap-2">
      {THEMES.map(t=>(
        <button key={t} className={`px-3 py-1 rounded border ${theme===t?'border-[rgb(var(--accent))]':'border-gray-300'}`} onClick={()=>setTheme(t)}>{t}</button>
      ))}
    </div>
  )
}
