# PUBLIK Web App Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the multi-tenant PUBLIK web app — agents sign in, create a property once (fields + photos), see a per-portal publication status board, and expose a read API the browser extension consumes.

**Architecture:** Next.js (App Router) + TypeScript front-to-back. Supabase provides multi-tenant auth, Postgres (with Row Level Security per agency), and Storage for photos. Pure domain logic (validation, types) is isolated from framework code so it can be unit-tested in TDD. This is Plan 1 of 3; Meta auto-post and the browser extension are separate plans that depend on the data model and API defined here.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Supabase (`@supabase/supabase-js`, `@supabase/ssr`), Zod (validation), Vitest + @testing-library/react (tests).

---

## File Structure

```
publik/
  package.json
  vitest.config.ts
  .env.local                      # Supabase keys (gitignored)
  .env.example                    # template, committed
  supabase/
    migrations/
      0001_init.sql               # tables + RLS
  src/
    domain/
      property.ts                 # canonical types + enums
      property-schema.ts          # Zod schema + validate()
      property-schema.test.ts
    lib/
      supabase/
        client.ts                 # browser client
        server.ts                 # server client (RSC/route handlers)
    app/
      layout.tsx
      page.tsx                    # redirect to /dashboard or /login
      login/page.tsx
      dashboard/
        page.tsx                  # property list + status board
        properties/
          new/page.tsx            # intake form
      api/
        properties/[id]/route.ts  # GET property for the extension
    components/
      property-form.tsx
      photo-uploader.tsx
      status-board.tsx
```

---

## Task 1: Project scaffold

**Files:**
- Create: `publik/` (Next.js app), `vitest.config.ts`, `.env.example`

- [ ] **Step 1: Scaffold Next.js app**

Run:
```bash
npx create-next-app@latest publik --typescript --tailwind --app --src-dir --eslint --no-import-alias --use-npm
cd publik
```
Expected: app created, `npm run dev` works at localhost:3000.

- [ ] **Step 2: Add dependencies**

Run:
```bash
npm install @supabase/supabase-js @supabase/ssr zod
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
```
Expected: installs succeed.

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
```

Create `vitest.setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
```

Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 4: Create `.env.example`**

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Add `.env.local` to `.gitignore` (create-next-app already ignores `.env*`).

- [ ] **Step 5: Verify test runner**

Run: `npm run test`
Expected: "No test files found" (exit 0) — runner works.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app with Supabase, Zod, Vitest"
```

---

## Task 2: Canonical property types

**Files:**
- Create: `src/domain/property.ts`

- [ ] **Step 1: Write the types and enums**

```ts
export const OPERACIONES = ["venta", "alquiler", "alquiler_temporal"] as const;
export type Operacion = (typeof OPERACIONES)[number];

export const TIPOS = [
  "casa", "departamento", "terreno", "local", "oficina", "deposito",
] as const;
export type Tipo = (typeof TIPOS)[number];

export const MONEDAS = ["USD", "PYG"] as const;
export type Moneda = (typeof MONEDAS)[number];

export const PORTALES = [
  "infocasas", "marketplace", "clasipar", "fb_page", "instagram",
] as const;
export type Portal = (typeof PORTALES)[number];

export type EstadoPublicacion =
  | "pendiente" | "publicando" | "publicada" | "error";

export interface Property {
  id: string;
  agencyId: string;
  agentId: string;
  operacion: Operacion;
  tipo: Tipo;
  precio: number;
  moneda: Moneda;
  dormitorios: number;
  banos: number;
  cocheras: number;
  superficieTerrenoM2: number | null;
  superficieConstruidaM2: number | null;
  pais: string;
  ciudad: string;
  barrio: string | null;
  direccion: string | null;
  lat: number | null;
  lng: number | null;
  titulo: string;
  descripcion: string;
  amenities: string[];
  estado: "borrador" | "publicando" | "publicada";
}

export interface Photo {
  id: string;
  propertyId: string;
  storageUrl: string;
  orden: number;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/domain/property.ts
git commit -m "feat: add canonical property domain types"
```

---

## Task 3: Property validation schema (TDD)

**Files:**
- Create: `src/domain/property-schema.ts`
- Test: `src/domain/property-schema.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import { propertyInputSchema, validatePropertyInput } from "./property-schema";

const valid = {
  operacion: "venta",
  tipo: "departamento",
  precio: 85000,
  moneda: "USD",
  dormitorios: 2,
  banos: 1,
  cocheras: 1,
  superficieConstruidaM2: 75,
  pais: "Paraguay",
  ciudad: "Asunción",
  titulo: "Depto 2 dorm en Villa Morra",
  descripcion: "Luminoso, a estrenar.",
  amenities: ["pileta"],
};

describe("validatePropertyInput", () => {
  it("accepts a valid input", () => {
    const result = validatePropertyInput(valid);
    expect(result.success).toBe(true);
  });

  it("rejects a negative price", () => {
    const result = validatePropertyInput({ ...valid, precio: -1 });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown tipo", () => {
    const result = validatePropertyInput({ ...valid, tipo: "castillo" });
    expect(result.success).toBe(false);
  });

  it("requires a non-empty titulo", () => {
    const result = validatePropertyInput({ ...valid, titulo: "" });
    expect(result.success).toBe(false);
  });

  it("defaults optional numeric fields to 0/null", () => {
    const result = propertyInputSchema.parse({
      operacion: "alquiler", tipo: "casa", precio: 500, moneda: "PYG",
      pais: "Paraguay", ciudad: "Luque",
      titulo: "Casa", descripcion: "x",
    });
    expect(result.dormitorios).toBe(0);
    expect(result.amenities).toEqual([]);
    expect(result.superficieTerrenoM2).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/domain/property-schema.test.ts`
Expected: FAIL — cannot find module `./property-schema`.

- [ ] **Step 3: Write the schema**

```ts
import { z } from "zod";
import { OPERACIONES, TIPOS, MONEDAS } from "./property";

export const propertyInputSchema = z.object({
  operacion: z.enum(OPERACIONES),
  tipo: z.enum(TIPOS),
  precio: z.number().positive(),
  moneda: z.enum(MONEDAS),
  dormitorios: z.number().int().min(0).default(0),
  banos: z.number().int().min(0).default(0),
  cocheras: z.number().int().min(0).default(0),
  superficieTerrenoM2: z.number().positive().nullable().default(null),
  superficieConstruidaM2: z.number().positive().nullable().default(null),
  pais: z.string().min(1),
  ciudad: z.string().min(1),
  barrio: z.string().nullable().default(null),
  direccion: z.string().nullable().default(null),
  lat: z.number().nullable().default(null),
  lng: z.number().nullable().default(null),
  titulo: z.string().min(1),
  descripcion: z.string().min(1),
  amenities: z.array(z.string()).default([]),
});

export type PropertyInput = z.infer<typeof propertyInputSchema>;

export function validatePropertyInput(input: unknown) {
  return propertyInputSchema.safeParse(input);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/domain/property-schema.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/domain/property-schema.ts src/domain/property-schema.test.ts
git commit -m "feat: add property input validation schema with tests"
```

---

## Task 4: Database schema + RLS

**Files:**
- Create: `supabase/migrations/0001_init.sql`

- [ ] **Step 1: Write the migration**

```sql
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
```

- [ ] **Step 2: Apply the migration**

Apply via the Supabase SQL editor (paste the file) or `supabase db push` if the Supabase CLI is linked. Then create a Storage bucket named `property-photos` (private) in the Supabase dashboard.
Expected: tables visible under Database → Tables; bucket visible under Storage.

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/0001_init.sql
git commit -m "feat: add initial DB schema with multi-tenant RLS"
```

---

## Task 5: Supabase clients

**Files:**
- Create: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`

- [ ] **Step 1: Browser client**

```ts
// src/lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
```

- [ ] **Step 2: Server client**

```ts
// src/lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet) =>
          toSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          ),
      },
    },
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/supabase/
git commit -m "feat: add Supabase browser and server clients"
```

---

## Task 6: Login page + auth gate

**Files:**
- Create: `src/app/login/page.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Login page (magic link)**

```tsx
// src/app/login/page.tsx
"use client";
import { useState } from "react";
import { createClient } from "@/../src/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createClient();
    await supabase.auth.signInWithOtp({ email });
    setSent(true);
  }

  return (
    <main className="max-w-sm mx-auto mt-24 p-6">
      <h1 className="text-2xl font-semibold mb-4">PUBLIK</h1>
      {sent ? (
        <p>Revisá tu email para el enlace de acceso.</p>
      ) : (
        <form onSubmit={signIn} className="space-y-3">
          <input
            type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full border rounded px-3 py-2"
          />
          <button className="w-full bg-orange-600 text-white rounded py-2">
            Ingresar
          </button>
        </form>
      )}
    </main>
  );
}
```

> Note: imports use a relative path because the scaffold was created with
> `--no-import-alias`. If you enabled the `@/` alias, use `@/lib/supabase/client`.

- [ ] **Step 2: Root redirect**

```tsx
// src/app/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  redirect(data.user ? "/dashboard" : "/login");
}
```

- [ ] **Step 3: Manual verify**

Run: `npm run dev`, open `/`. Logged-out → `/login`. Submit email → "Revisá tu email". (In Supabase Auth settings, enable email OTP for testing.)
Expected: redirect + magic-link email flow works.

- [ ] **Step 4: Commit**

```bash
git add src/app/login/page.tsx src/app/page.tsx
git commit -m "feat: add magic-link login and root auth redirect"
```

---

## Task 7: Property form component (TDD)

**Files:**
- Create: `src/components/property-form.tsx`
- Test: `src/components/property-form.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PropertyForm } from "./property-form";

describe("PropertyForm", () => {
  it("calls onSubmit with parsed values", () => {
    const onSubmit = vi.fn();
    render(<PropertyForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: "Depto Villa Morra" },
    });
    fireEvent.change(screen.getByLabelText(/descripción/i), {
      target: { value: "Luminoso" },
    });
    fireEvent.change(screen.getByLabelText(/precio/i), {
      target: { value: "85000" },
    });
    fireEvent.change(screen.getByLabelText(/ciudad/i), {
      target: { value: "Asunción" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /guardar/i }));

    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit.mock.calls[0][0].precio).toBe(85000);
    expect(onSubmit.mock.calls[0][0].titulo).toBe("Depto Villa Morra");
  });

  it("does not submit when price is empty", () => {
    const onSubmit = vi.fn();
    render(<PropertyForm onSubmit={onSubmit} />);
    fireEvent.submit(screen.getByRole("button", { name: /guardar/i }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/property-form.test.tsx`
Expected: FAIL — cannot find `./property-form`.

- [ ] **Step 3: Implement the form**

```tsx
// src/components/property-form.tsx
"use client";
import { useState } from "react";
import {
  validatePropertyInput, type PropertyInput,
} from "../domain/property-schema";
import { OPERACIONES, TIPOS, MONEDAS } from "../domain/property";

export function PropertyForm({
  onSubmit,
}: {
  onSubmit: (p: PropertyInput) => void;
}) {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const num = (k: string) =>
      f.get(k) ? Number(f.get(k)) : undefined;
    const raw = {
      operacion: f.get("operacion"),
      tipo: f.get("tipo"),
      precio: num("precio"),
      moneda: f.get("moneda"),
      dormitorios: num("dormitorios"),
      banos: num("banos"),
      cocheras: num("cocheras"),
      superficieConstruidaM2: num("superficieConstruidaM2") ?? null,
      pais: f.get("pais") || "Paraguay",
      ciudad: f.get("ciudad"),
      titulo: f.get("titulo"),
      descripcion: f.get("descripcion"),
    };
    const result = validatePropertyInput(raw);
    if (!result.success) {
      setError("Revisá los campos obligatorios.");
      return;
    }
    setError(null);
    onSubmit(result.data);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-xl">
      <label className="block">Título
        <input name="titulo" className="w-full border rounded px-2 py-1" />
      </label>
      <label className="block">Descripción
        <textarea name="descripcion" className="w-full border rounded px-2 py-1" />
      </label>
      <label className="block">Precio
        <input name="precio" type="number" className="w-full border rounded px-2 py-1" />
      </label>
      <label className="block">Moneda
        <select name="moneda" className="w-full border rounded px-2 py-1">
          {MONEDAS.map((m) => <option key={m}>{m}</option>)}
        </select>
      </label>
      <label className="block">Operación
        <select name="operacion" className="w-full border rounded px-2 py-1">
          {OPERACIONES.map((o) => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="block">Tipo
        <select name="tipo" className="w-full border rounded px-2 py-1">
          {TIPOS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <div className="grid grid-cols-3 gap-2">
        <label>Dormitorios
          <input name="dormitorios" type="number" className="w-full border rounded px-2 py-1" />
        </label>
        <label>Baños
          <input name="banos" type="number" className="w-full border rounded px-2 py-1" />
        </label>
        <label>Cocheras
          <input name="cocheras" type="number" className="w-full border rounded px-2 py-1" />
        </label>
      </div>
      <label className="block">Sup. construida (m²)
        <input name="superficieConstruidaM2" type="number" className="w-full border rounded px-2 py-1" />
      </label>
      <label className="block">Ciudad
        <input name="ciudad" className="w-full border rounded px-2 py-1" />
      </label>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button className="bg-orange-600 text-white rounded px-4 py-2">
        Guardar
      </button>
    </form>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/property-form.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/property-form.tsx src/components/property-form.test.tsx
git commit -m "feat: add validated property intake form with tests"
```

---

## Task 8: Create-property page (persist + photos)

**Files:**
- Create: `src/app/dashboard/properties/new/page.tsx`
- Create: `src/components/photo-uploader.tsx`

- [ ] **Step 1: Photo uploader component**

```tsx
// src/components/photo-uploader.tsx
"use client";
import { useState } from "react";

export function PhotoUploader({
  onFiles,
}: {
  onFiles: (files: File[]) => void;
}) {
  const [names, setNames] = useState<string[]>([]);
  return (
    <div className="space-y-2">
      <input
        type="file" accept="image/*" multiple
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          setNames(files.map((f) => f.name));
          onFiles(files);
        }}
      />
      <ul className="text-sm text-gray-600">
        {names.map((n) => <li key={n}>{n}</li>)}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: New-property page wiring**

```tsx
// src/app/dashboard/properties/new/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PropertyForm } from "../../../../components/property-form";
import { PhotoUploader } from "../../../../components/photo-uploader";
import { createClient } from "../../../../lib/supabase/client";
import type { PropertyInput } from "../../../../domain/property-schema";

export default function NewPropertyPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);

  async function save(input: PropertyInput) {
    const supabase = createClient();
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const { data: au } = await supabase
      .from("app_users").select("agency_id").eq("id", u.user.id).single();

    const { data: prop, error } = await supabase
      .from("properties")
      .insert({
        agency_id: au!.agency_id,
        agent_id: u.user.id,
        operacion: input.operacion, tipo: input.tipo,
        precio: input.precio, moneda: input.moneda,
        dormitorios: input.dormitorios, banos: input.banos,
        cocheras: input.cocheras,
        superficie_construida_m2: input.superficieConstruidaM2,
        superficie_terreno_m2: input.superficieTerrenoM2,
        pais: input.pais, ciudad: input.ciudad,
        titulo: input.titulo, descripcion: input.descripcion,
        amenities: input.amenities,
      })
      .select("id").single();
    if (error || !prop) return;

    for (let i = 0; i < files.length; i++) {
      const path = `${prop.id}/${i}-${files[i].name}`;
      const up = await supabase.storage
        .from("property-photos").upload(path, files[i]);
      if (!up.error) {
        await supabase.from("photos").insert({
          property_id: prop.id, storage_url: up.data.path, orden: i,
        });
      }
    }
    router.push("/dashboard");
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Nueva propiedad</h1>
      <PhotoUploader onFiles={setFiles} />
      <PropertyForm onSubmit={save} />
    </main>
  );
}
```

- [ ] **Step 3: Manual verify**

Run: `npm run dev`, sign in, go to `/dashboard/properties/new`, fill the form, attach photos, save.
Expected: row in `properties`, files in `property-photos` bucket, rows in `photos`, redirect to `/dashboard`. (Requires an `app_users` row for your auth user — insert one manually for now, pointing at an `agencies` row.)

- [ ] **Step 4: Commit**

```bash
git add src/app/dashboard/properties/new/page.tsx src/components/photo-uploader.tsx
git commit -m "feat: create-property page with photo upload to Storage"
```

---

## Task 9: Dashboard list + status board

**Files:**
- Create: `src/app/dashboard/page.tsx`
- Create: `src/components/status-board.tsx`

- [ ] **Step 1: Status board component (TDD)**

Test `src/components/status-board.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBoard } from "./status-board";

describe("StatusBoard", () => {
  it("shows a chip per portal with its state", () => {
    render(
      <StatusBoard
        publications={[
          { portal: "fb_page", estado: "publicada" },
          { portal: "infocasas", estado: "pendiente" },
        ]}
      />,
    );
    expect(screen.getByText(/fb_page/)).toBeInTheDocument();
    expect(screen.getByText(/publicada/)).toBeInTheDocument();
    expect(screen.getByText(/pendiente/)).toBeInTheDocument();
  });

  it("renders all 5 portals, defaulting missing ones to pendiente", () => {
    render(<StatusBoard publications={[]} />);
    expect(screen.getAllByText(/pendiente/)).toHaveLength(5);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/status-board.test.tsx`
Expected: FAIL — cannot find `./status-board`.

- [ ] **Step 3: Implement the status board**

```tsx
// src/components/status-board.tsx
import { PORTALES, type Portal, type EstadoPublicacion } from "../domain/property";

export function StatusBoard({
  publications,
}: {
  publications: { portal: Portal; estado: EstadoPublicacion }[];
}) {
  const byPortal = new Map(publications.map((p) => [p.portal, p.estado]));
  return (
    <div className="flex flex-wrap gap-2">
      {PORTALES.map((portal) => {
        const estado = byPortal.get(portal) ?? "pendiente";
        return (
          <span key={portal} className="text-xs border rounded px-2 py-1">
            {portal}: {estado}
          </span>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/status-board.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Dashboard page lists properties with boards**

```tsx
// src/app/dashboard/page.tsx
import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import { StatusBoard } from "../../components/status-board";
import type { Portal, EstadoPublicacion } from "../../domain/property";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: props } = await supabase
    .from("properties")
    .select("id, titulo, ciudad, estado, portal_publications(portal, estado)")
    .order("created_at", { ascending: false });

  return (
    <main className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Mis propiedades</h1>
        <Link href="/dashboard/properties/new"
          className="bg-orange-600 text-white rounded px-4 py-2">
          Nueva propiedad
        </Link>
      </div>
      <ul className="space-y-4">
        {(props ?? []).map((p) => (
          <li key={p.id} className="border rounded p-4 space-y-2">
            <div className="font-medium">{p.titulo} — {p.ciudad}</div>
            <StatusBoard
              publications={
                (p.portal_publications ?? []) as {
                  portal: Portal; estado: EstadoPublicacion;
                }[]
              }
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/status-board.tsx src/components/status-board.test.tsx src/app/dashboard/page.tsx
git commit -m "feat: dashboard property list with per-portal status board"
```

---

## Task 10: Extension read API

**Files:**
- Create: `src/app/api/properties/[id]/route.ts`

This endpoint is what the browser extension (Plan 3) calls to fetch a property's
canonical data + photo URLs. It must respect the agent's session (RLS), so it
uses the cookie-based server client.

- [ ] **Step 1: Write the route**

```ts
// src/app/api/properties/[id]/route.ts
import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const { data: property, error } = await supabase
    .from("properties")
    .select("*, photos(storage_url, orden)")
    .eq("id", id)
    .single();

  if (error || !property) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  // Sign photo URLs so the extension can fetch them.
  const photos = await Promise.all(
    (property.photos ?? [])
      .sort((a: { orden: number }, b: { orden: number }) => a.orden - b.orden)
      .map(async (ph: { storage_url: string; orden: number }) => {
        const { data } = await supabase.storage
          .from("property-photos")
          .createSignedUrl(ph.storage_url, 3600);
        return { url: data?.signedUrl ?? null, orden: ph.orden };
      }),
  );

  return NextResponse.json({ property, photos });
}
```

- [ ] **Step 2: Manual verify**

Run: `npm run dev`, sign in via browser, then in the same browser hit
`/api/properties/<an-existing-id>`.
Expected: 200 with `property` + signed `photos` URLs. Logged out → 401. Other
agency's id → 404 (RLS blocks it).

- [ ] **Step 3: Commit**

```bash
git add src/app/api/properties/
git commit -m "feat: add property read API for the browser extension"
```

---

## Task 11: Full test + typecheck gate

- [ ] **Step 1: Run the whole suite**

Run: `npm run test`
Expected: all tests PASS (property-schema, property-form, status-board).

- [ ] **Step 2: Typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: no type errors, build succeeds.

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "chore: pass full test, typecheck and build gate"
```

---

## Self-Review notes

- **Spec coverage:** multi-tenant auth (Tasks 4–6), property data model (Tasks 2,4), single-form intake (Tasks 7–8), photo upload to Storage (Task 8), status board (Task 9), extension read API (Task 10). Meta auto-post and the extension itself are intentionally separate plans.
- **Type consistency:** `Portal`, `EstadoPublicacion`, `Property`, `PropertyInput` defined in Task 2/3 and reused in Tasks 7,9,10 with matching names.
- **No placeholders:** every code step contains full code; manual-verify steps used only where automated tests need live Supabase (auth, Storage, RLS), which cannot be unit-tested without infrastructure.
- **Known follow-ups (out of scope, deliberate):** auto-provisioning `agencies`/`app_users` on signup (Task 8 notes manual insert for now); these belong to a later auth-onboarding slice.
