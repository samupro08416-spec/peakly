/* =========================================================
   PEAKLY · medicion.js
   1. Lee los enlaces etiquetados (UTM) para saber de qué
      canal viene cada visita: TikTok, Instagram, QR de clase…
   2. Carga la analítica sin cookies (GoatCounter) si está
      configurada en config.js.
   3. Mide eventos: cualquier elemento con data-track="nombre"
      cuenta un evento al hacer clic.
   ========================================================= */
(function () {
  "use strict";

  const CFG = window.PEAKLY_CONFIG || {};
  const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
  const STORAGE_KEY = "peakly-utm";
  const events = []; // registro local de eventos (útil para depurar)

  // Limpia un valor que viene de la URL: sin caracteres raros y con longitud máxima
  function clean(value) {
    return String(value).replace(/[^\p{L}\p{N} ._\-]/gu, "").trim().slice(0, 60);
  }

  /* ---------- 1. Canal de origen (UTM) ---------- */
  function readCampaign() {
    const fromUrl = {};
    try {
      const params = new URLSearchParams(window.location.search);
      UTM_KEYS.forEach((k) => {
        const v = params.get(k);
        if (v && clean(v)) fromUrl[k] = clean(v).toLowerCase();
      });
    } catch (e) { /* URL sin parámetros válidos */ }

    // Si la URL trae UTM, las guardamos para la sesión (por si recarga la página)
    if (Object.keys(fromUrl).length) {
      try { window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl)); } catch (e) { /* sin almacenamiento */ }
      return fromUrl;
    }
    try {
      const saved = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "null");
      if (saved && typeof saved === "object") return saved;
    } catch (e) { /* sin almacenamiento */ }

    // Sin UTM: usamos la web de procedencia o «directo»
    let source = "directo";
    try {
      if (document.referrer) {
        const host = new URL(document.referrer).hostname.replace(/^www\./, "");
        if (host && host !== window.location.hostname) source = clean(host);
      }
    } catch (e) { /* referrer no válido */ }
    return { utm_source: source };
  }
  const campaign = readCampaign();

  /* ---------- 2. Analítica sin cookies (GoatCounter) ---------- */
  const gcUrl = CFG.analitica && CFG.analitica.goatcounter;
  if (gcUrl) {
    if (/^https:\/\/[a-z0-9-]+\.goatcounter\.com\/count$/i.test(gcUrl)) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://gc.zgo.at/count.js";
      s.dataset.goatcounter = gcUrl;
      document.head.append(s);
    } else if (CFG.debug) {
      console.warn("[Peakly] La URL de GoatCounter no tiene el formato https://TU-CODIGO.goatcounter.com/count");
    }
  }

  /* ---------- 3. Eventos ---------- */
  // Nombre de evento seguro: «Lista registro/TikTok» → «lista-registro/tiktok»
  function slug(part) { return clean(part).toLowerCase().replace(/ +/g, "-"); }
  function track(name) {
    const path = String(name).split("/").map(slug).filter(Boolean).join("/") || "evento";
    events.push({ evento: path, canal: campaign.utm_source, hora: new Date().toISOString() });
    if (CFG.debug) console.info("[Peakly] evento:", path, "· canal:", campaign.utm_source);
    if (window.goatcounter && typeof window.goatcounter.count === "function") {
      window.goatcounter.count({ path: path, title: path, event: true });
    }
  }

  // Clic en cualquier elemento con data-track
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-track]");
    if (el) track(el.dataset.track);
  });

  window.PeaklyMedicion = {
    track: track,
    getCampaign: () => Object.assign({}, campaign),
    getEvents: () => events.slice()
  };
})();
