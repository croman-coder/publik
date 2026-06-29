-- Per-agency Meta (Facebook Page + Instagram Business) connection.
-- Reuses the agency's approved Meta app "Botik". One row per agency.
create table meta_connections (
  agency_id uuid primary key references agencies (id) on delete cascade,
  page_id text not null,
  page_access_token text not null,
  ig_user_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table meta_connections enable row level security;

-- Tenant can read its own connection. Tokens are written server-side with the
-- service role, so no insert/update policy is exposed to clients.
create policy meta_conn_tenant on meta_connections
  for select using (agency_id = current_agency_id());
