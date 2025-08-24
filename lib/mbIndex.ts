
// lib/mbIndex.ts
'use client'
import { numberToHebrewLetters } from './hebrew'

/** יוצר רשימת סימנים 1..697 עם תווית 'סימן א׳' וכו' */
export function generateMbSimanim(){
  const lastSiman = 697 // תרפ"ז
  return Array.from({length:lastSiman}, (_,i)=>{
    const n = i+1
    return { id: String(n), label: `סימן ${numberToHebrewLetters(n)}`, done: false }
  })
}

/** —— טעינה דינמית של סעיפים לכל סימן (מספראיה) + קאש מקומי —— */
type CacheMap = Record<string, number>

function loadCache(): CacheMap {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem('mb-seif-counts') || '{}') as CacheMap } catch { return {} }
}
function saveCache(cache: CacheMap){
  if (typeof window === 'undefined') return
  localStorage.setItem('mb-seif-counts', JSON.stringify(cache))
}

async function fetchSeifCountFromSefaria(siman:number): Promise<number|undefined> {
  try{
    const url = `https://www.sefaria.org/api/texts/Shulchan_Arukh,_Orach_Chayim.${siman}`
    const res = await fetch(url, { headers:{'Accept':'application/json'} })
    if(!res.ok) return
    const j = await res.json() as any
    if (Array.isArray(j?.text)) return j.text.length
    if (Array.isArray(j?.he))   return j.he.length
  }catch{}
}

export async function getSeifCount(siman:number): Promise<number> {
  const cache = loadCache()
  const key = String(siman)
  if (cache[key]) return cache[key]
  const fetched = await fetchSeifCountFromSefaria(siman)
  const count = fetched && fetched>0 ? fetched : 10
  cache[key] = count
  saveCache(cache)
  return count
}

export async function sectionsForSimanDynamic(siman:number){
  const count = await getSeifCount(siman)
  return Array.from({ length: count }, (_, i) => ({
    id: `${siman}:${i+1}`,
    label: `סעיף ${i+1}`,
    done: false,
  }))
}
