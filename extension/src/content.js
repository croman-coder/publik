// PUBLIK content script.
// Runs on a portal publish page. Picks the matching adapter, loads the
// property the agent selected in the popup, fills the form, and shows an
// on-page panel summarising what was filled and which photos need manual
// upload (programmatic photo injection is portal-dependent and unreliable).

(function () {
  const PUBLIK = window.__PUBLIK__ || {};
  const CONFIG = window.__PUBLIK_CONFIG__ || {};

  function pickAdapter(url) {
    const adapters = PUBLIK.adapters || {};
    return Object.values(adapters).find((a) => a.match(url)) || null;
  }

  async function loadProperty(propertyId) {
    const res = await fetch(
      `${CONFIG.baseUrl}/api/properties/${propertyId}`,
      { credentials: "include" },
    );
    if (!res.ok) {
      throw new Error(
        res.status === 401
          ? "Sesión no encontrada. Iniciá sesión en PUBLIK en otra pestaña."
          : `No se pudo cargar la propiedad (HTTP ${res.status}).`,
      );
    }
    return res.json();
  }

  function summarise(results) {
    const counts = { filled: 0, missing: 0 };
    for (const r of results) {
      if (r.status === "filled") counts.filled++;
      else if (r.status !== "skipped") counts.missing++;
    }
    return counts;
  }

  function showPanel(html) {
    let panel = document.getElementById("publik-panel");
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "publik-panel";
      panel.style.cssText =
        "position:fixed;bottom:20px;right:20px;z-index:2147483647;max-width:320px;" +
        "background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;" +
        "box-shadow:0 10px 30px rgba(0,0,0,.15);font:14px/1.5 system-ui,sans-serif;color:#0f172a;";
      document.body.appendChild(panel);
    }
    panel.innerHTML = html;
    const close = panel.querySelector("[data-close]");
    if (close) close.onclick = () => panel.remove();
  }

  async function run() {
    const adapter = pickAdapter(location.href);
    if (!adapter) return;

    const { publikPropertyId } = await chrome.storage.local.get(
      "publikPropertyId",
    );
    if (!publikPropertyId) {
      showPanel(
        '<b style="color:#ea580c">PUBLIK</b><p>Abrí la extensión y elegí ' +
          "qué propiedad publicar.</p>",
      );
      return;
    }

    try {
      const { property, photos } = await loadProperty(publikPropertyId);
      const steps = adapter.build(property);
      const results = PUBLIK.engine.fillForm(steps);
      const { filled, missing } = summarise(results);
      const photoUrls = (photos || [])
        .map((p) => p.url)
        .filter(Boolean);

      showPanel(
        '<div style="display:flex;justify-content:space-between;align-items:center">' +
          '<b style="color:#ea580c">PUBLIK</b>' +
          '<button data-close style="border:0;background:none;cursor:pointer;font-size:18px">×</button>' +
          "</div>" +
          `<p>${filled} campos completados` +
          (missing ? `, <span style="color:#dc2626">${missing} no encontrados</span>` : "") +
          ".</p>" +
          `<p><b>Subí estas ${photoUrls.length} fotos manualmente</b> ` +
          "(el portal no permite carga automática):</p>" +
          '<ul style="margin:4px 0;padding-left:18px">' +
          photoUrls
            .map(
              (u, i) =>
                `<li><a href="${u}" target="_blank" rel="noopener">Foto ${i + 1}</a></li>`,
            )
            .join("") +
          "</ul>" +
          '<p style="color:#64748b;font-size:12px">Revisá los datos y publicá desde el portal.</p>',
      );
    } catch (e) {
      showPanel(
        '<b style="color:#ea580c">PUBLIK</b>' +
          `<p style="color:#dc2626">${e.message}</p>`,
      );
    }
  }

  // Re-run when the popup stores a new property id.
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.publikPropertyId) run();
  });

  run();
})();
