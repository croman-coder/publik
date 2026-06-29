# PUBLIK — Browser Extension (Chrome MV3)

Autofills a portal's "publish property" form with the data of a property the
agent already loaded in PUBLIK. Runs in the agent's own logged-in browser
session — the agent reviews the filled form and clicks publish on the portal.

## Architecture

- `src/engine.js` — generic, portal-agnostic form-fill helpers (handles
  React/Vue controlled inputs). Knows **how** to fill.
- `src/adapters/<portal>.js` — one adapter per portal. Declares **what** to
  fill: CSS selectors + dropdown value maps + canonical→portal mapping. Adding
  a portal = adding one adapter; the engine never changes.
- `src/content.js` — picks the matching adapter, loads the selected property
  from the PUBLIK API, runs the fill, shows an on-page result panel.
- `src/popup.html` / `popup.js` — agent pastes the property ID to publish.
- `src/config.js` — PUBLIK base URL.

Current adapters: **Infocasas** (selectors are best-effort and marked `TODO` —
verify against the live publish-page DOM).

## Load it (development)

1. Chrome → `chrome://extensions` → enable **Developer mode**.
2. **Load unpacked** → select this `extension/` folder.
3. Open the Infocasas publish page, open the PUBLIK popup, paste a property ID,
   click **Usar esta propiedad**. The form fills; a panel lists filled fields
   and the photos to upload manually.

## Known limitations / next slices

- **Photos are not injected programmatically.** Most portals block JS file
  injection into their uploader, so the panel lists signed photo URLs for the
  agent to upload manually. (Per the design spec's error-handling rule.)
- **Cross-origin auth.** `content.js` fetches `/api/properties/:id` with
  `credentials: "include"`. Supabase session cookies are `SameSite=Lax`, so
  they are not sent on a cross-site request from the portal's origin. The next
  slice is a token-based fetch (short-lived per-property token issued by the
  dashboard) so the extension can authenticate without cookies.
- **Selectors must be verified** against the real Infocasas form before this
  fills correctly end-to-end.
