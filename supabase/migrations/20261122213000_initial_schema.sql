create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  phone_number text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) >= 3),
  description text not null check (char_length(trim(description)) > 0),
  category text not null,
  location text,
  starts_at timestamptz not null,
  author_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.profiles
  add column if not exists first_name text not null default '',
  add column if not exists last_name text not null default '',
  add column if not exists phone_number text not null default '',
  add column if not exists updated_at timestamptz not null default now();

alter table public.activities
  add column if not exists title text,
  add column if not exists description text,
  add column if not exists category text,
  add column if not exists location text,
  add column if not exists starts_at timestamptz,
  add column if not exists author_id uuid references auth.users (id) on delete cascade,
  add column if not exists created_at timestamptz not null default now();

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'activities'
      and column_name = 'date_time'
  ) then
    execute '
      update public.activities
      set starts_at = nullif(date_time::text, '''')::timestamptz
      where starts_at is null and date_time is not null
    ';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'activities'
      and column_name = 'date'
  ) then
    execute '
      update public.activities
      set starts_at = nullif(date::text, '''')::timestamptz
      where starts_at is null and date is not null
    ';
  end if;
end;
$$;

create index if not exists activities_starts_at_idx
  on public.activities (starts_at);
create index if not exists activities_author_id_idx
  on public.activities (author_id);

alter table public.profiles enable row level security;
alter table public.activities enable row level security;

grant select, insert, update on public.profiles to authenticated;
grant select on public.activities to anon, authenticated;
grant insert, update, delete on public.activities to authenticated;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "Users can create their own profile" on public.profiles;
create policy "Users can create their own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Activities are visible to everyone" on public.activities;
create policy "Activities are visible to everyone"
  on public.activities for select
  to anon, authenticated
  using (true);

drop policy if exists "Signed-in users can create activities as themselves"
  on public.activities;
create policy "Signed-in users can create activities as themselves"
  on public.activities for insert
  to authenticated
  with check (auth.uid() = author_id);

drop policy if exists "Users can update their own activities" on public.activities;
create policy "Users can update their own activities"
  on public.activities for update
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

drop policy if exists "Users can delete their own activities" on public.activities;
create policy "Users can delete their own activities"
  on public.activities for delete
  to authenticated
  using (auth.uid() = author_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
