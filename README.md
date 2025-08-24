
# Torah Tracker (מעקב לימוד תורה)
PWA רספונסיבית לניהול ומעקב לימוד: תלמוד בבלי (דפים), משנה ברורה (סימנים/סעיפים), ספרי מוסר (פרקים באותיות).
## התקנה והפעלה
```bash
pnpm i   # או npm i / yarn
pnpm dev # או npm run dev
```
פתחו: http://localhost:3000
## קבצים חשובים
- `lib/gemaraPages.ts` – מפה למסכתות וטווח דפים. מלא את כל המסכתות.
- `lib/mbIndex.ts` – סימן→מספר סעיפים במשנה ברורה.
- `lib/initData.ts` – יצירת ספרים ראשונית.
- `lib/storage.ts` – לוקאלי + גיבוי Supabase.
- `lib/theme.ts` – ערכות נושא.
- `public/sw.js` + `public/manifest.json` – PWA.
