/* =========================================================
   PEAKLY · visual.js  (capa visual v2)
   - Cinta de tendencias reales (data.js → ticker)
   - Cifras del mercado con contador animado (api.js → mercado)
   - Gráficos que se dibujan al aparecer (.draw-on-view)
   - Brillo que sigue al ratón (.spot) e inclinación 3D del hero
   ========================================================= */
(function () {
  "use strict";

  const P = window.Peakly;
  const DATA = window.PEAKLY_DATA;
  const SVG_NS = "http://www.w3.org/2000/svg";
  const reduce = P.reduceMotion;
  const lang = () => P.getLang();
  const pick = (obj) => (obj && typeof obj === "object" ? (obj[lang()] !== undefined ? obj[lang()] : obj.es) : obj || "");

  function icon(id) {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS(SVG_NS, "use");
    use.setAttribute("href", "#" + id);
    svg.append(use);
    return svg;
  }
  function onVisible(el, fn, threshold) {
    if (!el) return;
    if (!("IntersectionObserver" in window)) { fn(); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); fn(); }
    }, { threshold: threshold || 0.25 });
    io.observe(el);
  }

  /* ---------- 1. Cinta de tendencias ---------- */
  function renderTicker() {
    const track = document.getElementById("tickerTrack");
    if (!track || !DATA.ticker) return;
    track.textContent = "";
    // Dos copias seguidas para que el bucle no tenga saltos; la segunda se oculta a lectores de pantalla
    [false, true].forEach((copy) => {
      DATA.ticker.forEach((item) => {
        const el = document.createElement("span");
        el.className = "ticker__item " + (item.dir === "down" ? "is-down" : "is-up");
        if (copy) el.setAttribute("aria-hidden", "true");
        const dir = document.createElement("span");
        dir.className = "ticker__dir";
        dir.append(icon(item.dir === "down" ? "i-down" : "i-up"));
        const name = document.createElement("span");
        name.textContent = pick(item);
        const note = document.createElement("span");
        note.className = "ticker__note";
        note.textContent = pick(item.nota);
        el.append(dir, name, note);
        track.append(el);
      });
    });
  }

  /* ---------- 2. Contadores ---------- */
  // «1.100» con punto de miles también en español (useGrouping "always")
  function format(value, decimals) {
    return new Intl.NumberFormat(lang() === "es" ? "es-ES" : "en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: "always" }).format(value);
  }
  // Número grande + unidad más pequeña (M€, M$, de 10…) para que no se parta en dos líneas
  function setCounter(el, value) {
    const d = Number(el.dataset.decimals || 0);
    const key = lang() === "es" ? "Es" : "En";
    const unit = document.createElement("span");
    unit.className = "counter__unit";
    unit.textContent = (el.dataset["suffix" + key] || "").trim();
    el.replaceChildren(document.createTextNode((el.dataset["prefix" + key] || "") + format(value, d)), unit);
  }
  function animateCounter(el) {
    const to = Number(el.dataset.to);
    el.dataset.done = "1";
    if (reduce) { setCounter(el, to); return; }
    const start = performance.now();
    const duration = 1600;
    (function tick(now) {
      const p = Math.min(1, (now - start) / duration);
      setCounter(el, to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick); else setCounter(el, to);
    })(start);
  }
  // Al cambiar de idioma, los contadores ya terminados se reescriben con el nuevo formato
  function refreshCounters() {
    document.querySelectorAll(".counter[data-to]").forEach((el) => setCounter(el, el.dataset.done ? Number(el.dataset.to) : 0));
  }

  /* ---------- 3. El mercado en cifras ---------- */
  let marketData = [];
  let marketShown = false;
  function renderMarket() {
    const grid = document.getElementById("marketStats");
    if (!grid) return;
    grid.textContent = "";
    marketData.forEach((s) => {
      const card = document.createElement("article");
      card.className = "stat-card spot";
      const num = document.createElement("p");
      num.className = "stat-card__num counter";
      num.dataset.to = s.valor;
      num.dataset.decimals = s.decimales || 0;
      num.dataset.prefixEs = s.prefijo ? s.prefijo.es || "" : "";
      num.dataset.prefixEn = s.prefijo ? s.prefijo.en || "" : "";
      num.dataset.suffixEs = s.sufijo ? s.sufijo.es || "" : "";
      num.dataset.suffixEn = s.sufijo ? s.sufijo.en || "" : "";
      if (marketShown) num.dataset.done = "1";
      const label = document.createElement("p");
      label.className = "stat-card__label";
      label.textContent = pick(s.etiqueta);
      card.append(num, label);
      if (s.fuente && s.fuente.url) {
        const a = document.createElement("a");
        a.className = "source-link";
        a.href = s.fuente.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.append(icon("i-link"), document.createTextNode(s.fuente.nombre + (pick(s.fuente.fecha) ? " · " + pick(s.fuente.fecha) : "")));
        card.append(a);
      }
      grid.append(card);
      setCounter(num, marketShown ? s.valor : 0);
    });
  }
  function initMarket() {
    const grid = document.getElementById("marketStats");
    if (!grid) return;
    const source = window.PeaklyAPI ? window.PeaklyAPI.getMercado() : Promise.resolve(DATA.mercado);
    source.then((list) => {
      marketData = list || [];
      renderMarket();
      onVisible(grid, () => {
        marketShown = true;
        grid.classList.add("is-visible");
        grid.querySelectorAll(".counter").forEach(animateCounter);
      }, 0.2);
    });
    document.querySelectorAll(".market-quote .counter").forEach((el) => {
      setCounter(el, 0);
      onVisible(el, () => animateCounter(el), 0.5);
    });
  }

  /* ---------- 4. Gráficos que se dibujan al aparecer ---------- */
  document.querySelectorAll(".draw-on-view").forEach((el) => onVisible(el, () => el.classList.add("is-drawn"), 0.35));

  /* ---------- 5. Brillo que sigue al ratón ---------- */
  // (los productos de la demo ya se crean con la clase «spot» en demo.js)
  document.querySelectorAll(".card, .plan, .how-step, .faq__item, .panel").forEach((el) => el.classList.add("spot"));
  let spotFrame = 0;
  document.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" || spotFrame) return;
    spotFrame = requestAnimationFrame(() => {
      spotFrame = 0;
      const el = e.target.closest && e.target.closest(".spot");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (e.clientX - r.left) + "px");
      el.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  }, { passive: true });

  /* ---------- 6. Inclinación 3D de la tarjeta del hero ---------- */
  const hero = document.getElementById("inicio");
  const heroCard = document.getElementById("heroCard");
  const canTilt = !reduce && window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 900px)").matches;
  if (hero && heroCard && canTilt) {
    heroCard.classList.add("tilt");
    let tiltFrame = 0;
    hero.addEventListener("pointermove", (e) => {
      if (tiltFrame || document.documentElement.classList.contains("is-presenting")) return;
      tiltFrame = requestAnimationFrame(() => {
        tiltFrame = 0;
        const r = heroCard.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
        const y = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
        heroCard.style.setProperty("--ry", (x * 10).toFixed(2) + "deg");
        heroCard.style.setProperty("--rx", (-y * 8).toFixed(2) + "deg");
      });
    });
    hero.addEventListener("pointerleave", () => {
      heroCard.style.setProperty("--rx", "0deg");
      heroCard.style.setProperty("--ry", "0deg");
    });
  }

  /* ---------- Arranque e idioma ---------- */
  renderTicker();
  initMarket();
  document.addEventListener("peakly:lang", () => {
    renderTicker();
    renderMarket();
    refreshCounters();
  });
})();
