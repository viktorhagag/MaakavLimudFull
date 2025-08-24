
'use client'
export default function ProgressBar({ value }: { value:number }) {
  const pct = Math.round((value||0) * 100)
  return <div className="progress"><span style={{width:`${pct}%`}} /></div>
}
