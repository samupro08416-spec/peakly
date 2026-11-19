/* =========================================================
   PEAKLY · api.js
   Capa de datos: el resto de la web pide los datos AQUÍ y no
   sabe de dónde salen. Así, para hacer Peakly funcional solo
   hay que cambiar la fuente, no la interfaz.

   - fuente "local"  → datos de js/data.js (funciona sin internet)
   - fuente "remota" → los pide a vuestro servidor (config.js → datos.url)
       GET {url}/tendencias  → { productos: [...] }  (mismo formato que data.js)
       GET {url}/mercado     → { mercado: [...] }
   Si el servidor falla, vuelve a los datos locales y lo indica.
   Formato completo y plan de la versión funcional: docs/ARQUITECTURA.md
   ========================================================= */
(function () {
  "use strict";

  const LOCAL = window.PEAKLY_DATA;
  const CFG = (window.PEAKLY_CONFIG && window.PEAKLY_CONFIG.datos) || {};
  const TIMEOUT_MS = 8000;
  let origen = "local"; // «local» o «remota»: la interfaz lo muestra en la etiqueta de datos

  function useRemote() {
    const url = String(CFG.url || "").trim();
    return CFG.fuente === "remota" && (/^https:\/\//i.test(url) || /^http:\/\/localhost(:\d+)?/i.test(url));
  }

  // Pide un recurso al servidor con límite de tiempo
  function getJSON(path) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const base = String(CFG.url).replace(/\/+$/, "");
    return fetch(base + path, { headers: { Accept: "application/json" }, signal: controller.signal })
      .then((res) => { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
      .finally(() => clearTimeout(timer));
  }

  // Comprueba que un producto tiene lo mínimo para dibujarse
  function isValidProduct(p) {
    return p && typeof p.id === "string" && p.nombre && typeof p.peakScore === "number" &&
      typeof p.compra === "number" && typeof p.venta === "number" && typeof p.semanaPico === "number";
  }

  function getTendencias() {
    if (!useRemote()) return Promise.resolve(LOCAL.productos);
    return getJSON("/tendencias")
      .then((json) => {
        const list = (json && Array.isArray(json.productos) ? json.productos : []).filter(isValidProduct);
        if (!list.length) throw new Error("sin productos válidos");
        origen = "remota";
        return list;
      })
      .catch((err) => {
        if (window.PEAKLY_CONFIG && window.PEAKLY_CONFIG.debug) console.warn("[Peakly] Servidor no disponible, uso datos locales:", err.message);
        origen = "local";
        return LOCAL.productos;
      });
  }

  function getMercado() {
    if (!useRemote()) return Promise.resolve(LOCAL.mercado);
    return getJSON("/mercado")
      .then((json) => (json && Array.isArray(json.mercado) && json.mercado.length ? json.mercado : LOCAL.mercado))
      .catch(() => LOCAL.mercado);
  }

  window.PeaklyAPI = {
    getTendencias: getTendencias,
    getMercado: getMercado,
    getOrigen: () => origen
  };
})();
