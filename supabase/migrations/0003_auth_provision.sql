-- Fix RLS recursion: current_agency_id() reads app_users, but app_users'
-- own policy calls current_agency_id() -> infinite recursion. SECURITY
-- DEFINER makes the helper bypass RLS so policies can use it safely.
create or replace function current_agency_id() returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select agency_id from app_users where id = auth.uid()
$$;

-- Auto-provision: every new auth user gets their own agency and an
-- app_users row, so login lands on a working (empty) dashboard with no
-- manual seeding. Runs as definer to write past RLS.
create or replace function handle_new_auth_user() returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  new_agency_id uuid;
begin
  insert into agencies (name)
  values (coalesce(split_part(new.email, '@', 1), 'Mi agencia'))
  returning id into new_agency_id;

  insert into app_users (id, agency_id, email, role)
  values (new.id, new_agency_id, new.email, 'owner');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function handle_new_auth_user();

-- Backfill: any existing auth user without an app_users row gets its own
-- agency + app_users row, linked together.
do $$
declare
  u record;
  new_agency_id uuid;
begin
  for u in
    select au.id, au.email
    from auth.users au
    left join app_users a on a.id = au.id
    where a.id is null
  loop
    insert into agencies (name)
    values (coalesce(split_part(u.email, '@', 1), 'Mi agencia'))
    returning id into new_agency_id;

    insert into app_users (id, agency_id, email, role)
    values (u.id, new_agency_id, u.email, 'owner');
  end loop;
end $$;
