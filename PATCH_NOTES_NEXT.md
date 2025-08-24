# Next.js App Router Patch — איך מיישמים

1) התקן תלויות:
   npm i @supabase/supabase-js recharts

2) סביבה:
   העתק .env.example ל-.env.local ומלא NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY

3) קבצים:
   העתק את התיקיות/קבצים לתוך הריפו. אם יש קבצים קיימים עם אותו נתיב — למזג ידנית.

4) Recharts ב-Next:
   הקומפוננטות כבר מוגדרות כ-'use client' או נטענות דינמית ללא SSR.

5) הפעלה:
   npm run dev
