
'use client'
import * as React from 'react'
export type Theme = 'light'|'dark'|'sepia'|'ocean'|'royal'
const ThemeCtx = React.createContext<{theme:Theme; setTheme:(t:Theme)=>void}|null>(null)
export function ThemeProvider({children}:{children:React.ReactNode}){
  const [theme,setTheme]=React.useState<Theme>(()=> typeof window==='undefined' ? 'light' : (localStorage.getItem('tt-theme') as Theme) || 'light')
  React.useEffect(()=>{ if(typeof document!=='undefined'){ document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('tt-theme', theme) } },[theme])
  return <ThemeCtx.Provider value={{theme,setTheme}}>{children}</ThemeCtx.Provider>
}
export function useTheme(){ const ctx=React.useContext(ThemeCtx); if(!ctx) throw new Error('useTheme must be used within ThemeProvider'); return ctx }
