-- Enable extensions if needed
-- create extension if not exists "uuid-ossp";

-- Profiles
create table if not exists public.profiles (
  id uuid primary key,
  email text unique,
  theme text default 'light',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Progress entries
create table if not exists public.progress (
  id bigserial primary key,
  user_id uuid not null,
  book_id text not null,
  unit_id text not null,
  status boolean not null default true,
  completed_at timestamptz,
  updated_at timestamptz default now(),
  unique (user_id, book_id, unit_id)
);

-- RLS
alter table public.profiles enable row level security;
alter table public.progress enable row level security;

-- Authenticated users can only see their own rows
drop policy if exists "profiles_own" on public.profiles;
create policy "profiles_own" on public.profiles
  for all using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "progress_own" on public.progress;
create policy "progress_own" on public.progress
  for all using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
