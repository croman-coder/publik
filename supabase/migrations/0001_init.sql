-- Agencies (tenants)
create table agencies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text not null default 'free',
  created_at timestamptz not null default now()
);

-- App users belong to one agency; mirrors auth.users
create table app_users (
  id uuid primary key references auth.users (id) on delete cascade,
  agency_id uuid not null references agencies (id) on delete cascade,
  email text not null,
  role text not null default 'agent',
  created_at timestamptz not null default now()
);

create table properties (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies (id) on delete cascade,
  agent_id uuid not null references app_users (id),
  operacion text not null,
  tipo text not null,
  precio numeric not null,
  moneda text not null,
  dormitorios int not null default 0,
  banos int not null default 0,
  cocheras int not null default 0,
  superficie_terreno_m2 numeric,
  superficie_construida_m2 numeric,
  pais text not null,
  ciudad text not null,
  barrio text,
  direccion text,
  lat double precision,
  lng double precision,
  titulo text not null,
  descripcion text not null,
  amenities text[] not null default '{}',
  estado text not null default 'borrador',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table photos (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties (id) on delete cascade,
  storage_url text not null,
  orden int not null default 0
);

create table portal_publications (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties (id) on delete cascade,
  portal text not null,
  estado text not null default 'pendiente',
  url_publicada text,
  error_msg text,
  fecha timestamptz,
  unique (property_id, portal)
);

-- Helper: current user's agency
create or replace function current_agency_id() returns uuid
language sql stable as $$
  select agency_id from app_users where id = auth.uid()
$$;

alter table agencies enable row level security;
alter table app_users enable row level security;
alter table properties enable row level security;
alter table photos enable row level security;
alter table portal_publications enable row level security;

create policy agency_self on agencies
  for select using (id = current_agency_id());

create policy users_same_agency on app_users
  for select using (agency_id = current_agency_id());

create policy properties_tenant on properties
  for all using (agency_id = current_agency_id())
  with check (agency_id = current_agency_id());

create policy photos_tenant on photos
  for all using (
    property_id in (select id from properties where agency_id = current_agency_id())
  ) with check (
    property_id in (select id from properties where agency_id = current_agency_id())
  );

create policy pubs_tenant on portal_publications
  for all using (
    property_id in (select id from properties where agency_id = current_agency_id())
  ) with check (
    property_id in (select id from properties where agency_id = current_agency_id())
  );
