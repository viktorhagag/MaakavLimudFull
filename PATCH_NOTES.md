# Mega Update Pack — How to Apply

1) Install deps:
   npm i @supabase/supabase-js recharts

2) Env:
   - Copy .env.example to .env.local and set VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY

3) Supabase:
   - Create a new project, run SQL in supabase/schema.sql

4) Files:
   - Copy the /src files into your repo (merge with existing).
   - Ensure router is react-router-dom v6+ and index.tsx renders <App />

5) Optional:
   - Add GitHub Actions workflow from .github/workflows/ci.yml

6) Run:
   npm run dev

If any paths conflict with your existing structure, prefer your originals and move the logic into those files.
