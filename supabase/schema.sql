-- Cards table. Run this first in the Supabase SQL editor, then run seed.sql.
create table if not exists public.cards (
  id text primary key,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  description text,
  alt_description text,
  categories text[] not null default '{}',
  likes integer not null default 0,
  url text not null
);

-- Row Level Security: anyone with the public anon key may read cards, nobody may write.
alter table public.cards enable row level security;

drop policy if exists "Cards are publicly readable" on public.cards;
create policy "Cards are publicly readable"
  on public.cards for select
  to anon, authenticated
  using (true);
