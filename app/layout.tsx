
import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/lib/theme'
import { BooksProvider } from '@/lib/useBooks'
export const metadata: Metadata = {
  title: 'מעקב לימוד תורה',
  description: 'PWA למעקב לימוד: תלמוד בבלי, משנה ברורה, ספרי מוסר',
  manifest: '/manifest.json',
  icons: [{ rel: 'icon', url: '/icon.png' }]
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <ThemeProvider>
          <BooksProvider>
            <div className="mx-auto max-w-3xl px-4 py-6">
              <header className="mb-4 flex items-center justify-between">
                <a href="/" className="text-lg font-bold">📖 מעקב לימוד תורה</a>
                <nav className="flex items-center gap-2">
                  <a className="btn-ghost" href="/settings" title="הגדרות">⚙️</a>
                  <a className="btn-ghost" href="/" title="דף הבית">🏠</a>
                </nav>
              </header>
              {children}
            </div>
            <script dangerouslySetInnerHTML={{__html:`
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch(()=>{})
                })
              }`}} />
          </BooksProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
