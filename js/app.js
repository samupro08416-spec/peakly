/* =========================================================
   PEAKLY · app.js
   Lógica general: idioma, navbar, animaciones al hacer
   scroll, hero, «Cómo funciona» y FAQ.
   La demo está en demo.js, la lista de espera en
   lista-espera.js, la medición en medicion.js y el modo
   presentación en presentacion.js. Textos: i18n.js.
   ========================================================= */
(function () {
  "use strict";

  const root = document.documentElement;
  const DATA = window.PEAKLY_DATA;
  const I18N = window.PEAKLY_I18N;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* ---------- 1. IDIOMA (ES / EN) ---------- */
  let lang = "es";
  try {
    const saved = window.localStorage.getItem("peakly-lang");
    if (saved && I18N[saved]) lang = saved;
  } catch (e) { /* almacenamiento bloqueado: seguimos en español */ }

  // Traduce una clave y rellena los huecos {nombre}
  function t(key, vars) {
    let text = (I18N[lang] && I18N[lang][key]) || I18N.es[key] || key;
    if (vars) text = text.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m));
    return text;
  }
  // Formato de dinero: «45 €» en español, «€45» en inglés
  function money(n) {
    return new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  }
  function weeks(n) { return n === 1 ? t("demo.weeks1") : t("demo.weeksN", { n: n }); }

  function applyLang() {
    root.lang = lang;
    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); }); // solo textos propios de i18n.js
    $$("[data-i18n-attr]").forEach((el) => {
      el.dataset.i18nAttr.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":");
        el.setAttribute(attr.trim(), t(key.trim()));
      });
    });
    $$(".lang__btn").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    document.title = lang === "es" ? "Peakly · Compra antes del pico" : "Peakly · Buy before the peak";
    renderScan();
    updateMenuLabel();
    document.dispatchEvent(new CustomEvent("peakly:lang", { detail: { lang: lang } }));
  }
  function setLang(next) {
    if (!I18N[next] || next === lang) return;
    lang = next;
    try { window.localStorage.setItem("peakly-lang", lang); } catch (e) { /* sin almacenamiento */ }
    applyLang();
  }
  $$(".lang__btn").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

  /* ---------- 2. ANILLOS DE PEAK SCORE ---------- */
  function setRing(circle, value) {
    if (!circle) return;
    const c = 2 * Math.PI * Number(circle.getAttribute("r"));
    circle.style.strokeDasharray = c.toFixed(1);
    circle.style.strokeDashoffset = (c * (1 - value / 100)).toFixed(1);
  }

  /* ---------- 3. NAVBAR: opaca al hacer scroll + menú móvil ---------- */
  const navbar = $("#navbar");
  const menuBtn = $("#menuBtn");
  const navLinks = $("#navLinks");
  let scrollTicking = false;
  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      navbar.classList.toggle("is-scrolled", window.scrollY > 24);
      updateHowFromScroll();
      scrollTicking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  function updateMenuLabel() {
    const open = navLinks.classList.contains("is-open");
    menuBtn.setAttribute("aria-label", t(open ? "nav.menuClose" : "nav.menu"));
  }
  function toggleMenu(force) {
    const open = typeof force === "boolean" ? force : !navLinks.classList.contains("is-open");
    navLinks.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    updateMenuLabel();
  }
  menuBtn.addEventListener("click", () => toggleMenu());
  $$("a", navLinks).forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("is-open")) { toggleMenu(false); menuBtn.focus(); }
  });

  /* ---------- 4. APARICIÓN AL HACER SCROLL ---------- */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach((el) => io.observe(el));
  } else {
    $$(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- 5. HERO: gráfico que se dibuja + contador del Peak Score ---------- */
  const heroCard = $("#heroCard");
  const heroScore = $("#heroScore");
  const heroRing = $("#heroRingValue");
  const HERO_TARGET = 87;
  function startHero() {
    heroCard.classList.add("is-drawn");
    if (reduceMotion) { heroScore.textContent = HERO_TARGET; setRing(heroRing, HERO_TARGET); return; }
    const start = performance.now() + 500;
    const duration = 1800;
    function tick(now) {
      const p = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(HERO_TARGET * eased);
      heroScore.textContent = value;
      setRing(heroRing, value);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  setRing(heroRing, 0);
  // Arranca un poco después de cargar para que se vea la entrada
  window.setTimeout(startHero, reduceMotion ? 0 : 250);

  /* ---------- 6. CÓMO FUNCIONA: sección fijada que cambia de paso ---------- */
  const how = $("#como-funciona");
  const howSteps = $$(".how-step");
  const howPanels = $$(".how-panel");
  const howProgress = $("#howProgress");
  const pinnedQuery = window.matchMedia("(min-width: 900px) and (min-height: 660px)");
  let howStep = 0;

  function setHowStep(i) {
    howStep = Math.max(0, Math.min(howSteps.length - 1, i));
    howSteps.forEach((b, n) => {
      b.classList.toggle("is-active", n === howStep);
      if (n === howStep) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
    });
    howPanels.forEach((p, n) => p.classList.toggle("is-active", n === howStep));
  }
  function isPinned() { return pinnedQuery.matches && !root.classList.contains("is-presenting"); }
  function updateHowFromScroll() {
    if (!isPinned()) return;
    const total = how.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    const progress = Math.min(1, Math.max(0, -how.getBoundingClientRect().top / total));
    howProgress.style.transform = "scaleX(" + progress.toFixed(3) + ")";
    const step = Math.min(howSteps.length - 1, Math.floor(progress * howSteps.length));
    if (step !== howStep) setHowStep(step);
  }
  howSteps.forEach((btn, i) => btn.addEventListener("click", () => {
    if (isPinned()) {
      // Lleva el scroll al tramo de ese paso
      const total = how.offsetHeight - window.innerHeight;
      const y = how.getBoundingClientRect().top + window.scrollY + total * ((i + 0.5) / howSteps.length);
      window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
    }
    setHowStep(i);
  }));
  setRing($("#howRingValue"), 87);

  // Paso 1: lista de anuncios «escaneados» (datos de ejemplo)
  function renderScan() {
    const list = $("#scanList");
    if (!list) return;
    list.textContent = "";
    DATA.escaneo.forEach((item) => {
      const li = document.createElement("li");
      li.className = "scan-item";
      const plat = document.createElement("span"); plat.className = "scan-item__plat"; plat.textContent = item.plataforma;
      const name = document.createElement("span"); name.className = "scan-item__name"; name.textContent = item.nombre[lang] || item.nombre.es;
      const trend = document.createElement("span");
      trend.className = "scan-item__trend" + (item.tendencia < 0 ? " is-down" : "");
      trend.textContent = (item.tendencia > 0 ? "+" : "−") + Math.abs(item.tendencia) + (lang === "es" ? " %" : "%");
      li.append(plat, name, trend);
      list.append(li);
    });
  }

  /* ---------- 7. FAQ: acordeón (una pregunta abierta a la vez) ---------- */
  const faqButtons = $$(".faq__q");
  faqButtons.forEach((btn) => btn.addEventListener("click", () => {
    const willOpen = btn.getAttribute("aria-expanded") !== "true";
    faqButtons.forEach((other) => {
      other.setAttribute("aria-expanded", "false");
      document.getElementById(other.getAttribute("aria-controls")).hidden = true;
    });
    if (willOpen) {
      btn.setAttribute("aria-expanded", "true");
      document.getElementById(btn.getAttribute("aria-controls")).hidden = false;
    }
  }));

  /* ---------- 8. API compartida con el resto de archivos ----------
     (la lista de espera está en lista-espera.js y la medición en medicion.js) */
  window.Peakly = {
    t: t,
    money: money,
    weeks: weeks,
    setRing: setRing,
    reduceMotion: reduceMotion,
    getLang: () => lang,
    how: { setStep: setHowStep, getStep: () => howStep, count: howSteps.length, update: updateHowFromScroll }
  };

  applyLang();
  onScroll();
})();
