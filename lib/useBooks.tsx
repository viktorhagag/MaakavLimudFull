'use client'
import * as React from 'react'
import type { Book } from './types'
import { loadLocal, saveLocal, markSection, renameSection } from './storage'
import { initialBooks } from './initData'

type BooksCtx = {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  mark: (bookId: string, sectionId: string, done: boolean) => void;
  rename: (bookId: string, sectionId: string, label: string) => void;
  ensureMbSiman: (siman: number) => string; // מחזיר את ה-ID של הספרון
}

const Ctx = React.createContext<BooksCtx | null>(null);

// פלייסהולדר – 10 סעיפים לסימן, לשימוש באתחול
function placeholderSeifim(siman: number) {
  const count = 10
  return Array.from({ length: count }, (_, i) => ({
    id: `${siman}:${i + 1}`,
    label: `סעיף ${i + 1}`,
    done: false,
  }))
}

export function BooksProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = React.useState<Book[]>([])

  React.useEffect(() => {
    const local = loadLocal()
    setBooks(local.length ? local : initialBooks())
  }, [])

  React.useEffect(() => {
    if (books.length) saveLocal(books)
  }, [books])

  const markFn = React.useCallback((bookId: string, sectionId: string, done: boolean) => {
    setBooks(prev => markSection(prev, bookId, sectionId, done))
  }, [])

  const renameFn = React.useCallback((bookId: string, sectionId: string, label: string) => {
    setBooks(prev => renameSection(prev, bookId, sectionId, label))
  }, [])

  const ensureMbSiman = React.useCallback((siman: number) => {
    const id = `mb-siman-${siman}`
    setBooks(prev => {
      if (prev.find(b => b.id === id)) return prev
      const seifim = placeholderSeifim(siman) // מחולל סעיפים זמני
      const newBook: Book = {
        id,
        title: `משנה ברורה – סימן ${siman}`,
        category: 'MB',
        sections: seifim,
        progress: 0,
        parentPath: 'mb',
      }
      return [...prev, newBook]
    })
    return id
  }, [])

  return (
    <Ctx.Provider value={{ books, setBooks, mark: markFn, rename: renameFn, ensureMbSiman }}>
      {children}
    </Ctx.Provider>
  )
}

export function useBooks() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error('useBooks must be used within BooksProvider')
  return ctx
}
