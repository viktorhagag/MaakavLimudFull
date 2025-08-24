
'use client'
import { createClient } from '@supabase/supabase-js'
import type { Book } from './types'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
const LS_KEY = 'torah-tracker-v1';
export type CloudSnapshot = { version:number; books:Book[]; updatedAt:string }
export function loadLocal(): Book[] { if (typeof window==='undefined') return []; const raw=localStorage.getItem(LS_KEY); if(!raw) return []; try{return JSON.parse(raw) as Book[]}catch{return[]} }
export function saveLocal(books:Book[]){ if (typeof window==='undefined') return; localStorage.setItem(LS_KEY, JSON.stringify(books)) }
export async function syncToCloud(userId:string, books:Book[]){ if(!supabase) throw new Error('Supabase not configured'); const payload:CloudSnapshot={version:1,books,updatedAt:new Date().toISOString()}; const {error}=await supabase.from('backups').upsert({ user_id:userId, data:payload }); if(error) throw error; }
export async function loadFromCloud(userId:string){ if(!supabase) throw new Error('Supabase not configured'); const {data,error}=await supabase.from('backups').select('data').eq('user_id', userId).maybeSingle(); if(error) throw error; if(!data?.data) return null; return (data.data as CloudSnapshot).books; }
export function markSection(books:Book[], bookId:string, sectionId:string, done:boolean): Book[]{ return books.map(b=>{ if(b.id!==bookId) return b; const sections=(b.sections||[]).map(s=> s.id===sectionId? {...s,done,last:new Date().toISOString()}:s); const progress = sections.length? sections.filter(s=>s.done).length/sections.length:0; return {...b,sections,progress}; }) }
export function renameSection(books:Book[], bookId:string, sectionId:string, newLabel:string): Book[]{ return books.map(b=>{ if(b.id!==bookId) return b; const sections=(b.sections||[]).map(s=> s.id===sectionId? {...s,label:newLabel}:s); return {...b,sections}; }) }
