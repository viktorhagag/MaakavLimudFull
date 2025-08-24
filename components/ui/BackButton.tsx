
'use client'
import { useRouter } from 'next/navigation'
export default function BackButton(){
  const router = useRouter()
  return <button className="btn-ghost" onClick={()=>{ if(document.referrer) router.back(); else router.push('/'); }}>← חזרה</button>
}
