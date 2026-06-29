# PUBLIK — Multi-Portal Property Publisher (Design Spec)

**Date:** 2026-06-29
**Status:** Approved design, pending implementation plan

## Purpose

SaaS for real estate agents in Paraguay. Today an agent re-enters the same
property — fields and photos — one by one into every portal (Infocasas,
Facebook Marketplace, Facebook Page, Instagram, Clasipar). PUBLIK lets the
agent load a property **once** and publish it across all portals from a single
dashboard, without jumping screen to screen.

Built to be packaged and sold as a multi-tenant product.

## Core constraint (defines the architecture)

Only **Facebook Page** and **Instagram Business** offer official posting APIs.
**Facebook Marketplace, Infocasas, and Clasipar have no public posting API.**

Decision: **hybrid model**.
- Portals with API (FB Page + IG) → auto-post from the backend.
- Portals without API → a **browser extension** that autofills the portal's own
  form, running in the agent's already-logged-in session. Agent reviews and
  clicks publish.

Rejected: server-side browser bot (Playwright). The killer reason is not ban
risk but that it would require storing each agent's **Facebook/portal password**
on the server — a security liability that also breaks on 2FA and captchas.

## What the app actually does

The value is **not** writing copy. The agent loads the data, text, and photos.
The app's job is to **map that structured data into each portal's form fields**
(rooms, m², price, type, zone) and attach the images.

## Architecture

Three pieces communicating over well-defined interfaces:

1. **Dashboard (Next.js + TypeScript + Tailwind).** Property intake (single
   form), photo upload, per-property publication status board.
2. **Backend (Supabase: multi-tenant auth + Postgres + Storage; Next.js API
   routes).** Stores the canonical property + photos + per-portal mapping.
   Exposes an API the extension reads. Calls Meta API for FB/IG.
3. **Meta integration.** Reuses the user's **existing approved Meta app
   "Botik"** (already has publish permissions) → no Meta app-review wait.
   Auto-posts to FB Page + Instagram.
4. **Browser extension (Chrome MV3).** One engine + per-portal **adapters**
   (selectors + fill logic). Detects a portal's "publish" form, fetches the
   property from the backend, autofills fields + attaches photos, reports the
   result back to the backend.

```
Dashboard (Next.js) ──▶ Backend (Supabase + Next API) ──▶ Meta API (Botik): FB Page + IG
        ▲                          │
        └────────── Extension (Chrome MV3) ◀── reads property, autofills
                    Infocasas / Marketplace / Clasipar forms
```

## Data model

```
Agency (tenant)
  id, name, plan

User (agent)
  id, agency_id, email, role

Property
  id, agency_id, agent_id
  operacion: venta | alquiler | alquiler_temporal
  tipo: casa | departamento | terreno | local | oficina | ...
  precio, moneda (USD | PYG)
  dormitorios, banos, cocheras
  superficie_terreno_m2, superficie_construida_m2
  pais, ciudad, barrio, direccion, lat, lng
  titulo, descripcion
  amenities[]            (pileta, quincho, ...)
  estado: borrador | publicando | publicada
  created_at, updated_at

Photo
  id, property_id, storage_url, orden

PortalPublication
  id, property_id
  portal: infocasas | marketplace | clasipar | fb_page | instagram
  estado: pendiente | publicando | publicada | error
  url_publicada, error_msg, fecha
```

Per-portal field/dropdown mappings (e.g. `tipo`, `moneda`, `zona` codes) live in
each adapter, translating from the canonical model above.

## Key flows

- **Load property:** agent fills the single form + uploads photos → saved to
  Supabase (Postgres + Storage), `estado = borrador`.
- **Publish FB/IG (auto):** button → backend calls Meta API via Botik → stores
  `url_publicada` / `estado` on the matching `PortalPublication`.
- **Publish Infocasas/Marketplace/Clasipar (extension):** agent opens the
  portal's publish page → extension detects the form, fetches the property from
  the backend, autofills fields + attaches photos → agent reviews and clicks
  publish → extension reports `estado` back to the backend.
- **Status board:** per property, the agent sees each portal's state
  (pendiente / publicando / publicada / error) with the published URL or error.

## Error handling

- Adapter can't find a field (portal changed its HTML) → mark that field "not
  filled", warn the agent, do not break the rest of the fill.
- Meta API failure → retry + clear message; publication left in retryable
  `error` state.
- Photos the portal blocks from JS injection → extension tells the agent
  "upload these N photos manually" and leaves everything else filled.

## MVP scope (first sellable version)

1. Multi-tenant auth + property intake + photo upload (dashboard).
2. Auto-post to Facebook Page + Instagram via Botik.
3. Extension with **one adapter: Infocasas**, working end-to-end.
4. Per-property status board.

Post-MVP: Marketplace adapter, Clasipar adapter, then additional portals.

## Out of scope (for now)

- AI-generated descriptions (agent writes the text).
- Server-side automation bots.
- Billing/subscription flow (added once usage is validated).

## Working principles

- Ship a working slice, then iterate.
- Each portal is an isolated adapter; adding a portal must not require reworking
  the engine.
- Maintain a learnings log of mistakes so they are not repeated.
