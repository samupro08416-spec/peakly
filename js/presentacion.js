/* =========================================================
   PEAKLY · presentacion.js
   Modo presentación para proyectar en clase.
   - P: activar / desactivar      - Esc: salir
   - → ↓ AvPág: siguiente          - ← ↑ RePág: anterior
   - Inicio / Fin: primera / última sección
   - Espacio en la demo: lanza la demo guiada
   En «Cómo funciona», las flechas recorren primero sus 3 pasos.
   ========================================================= */
(function () {
  "use strict";

  const P = window.Peakly;
  const root = document.documentElement;
  const stops = Array.from(document.querySelectorAll("main > section[data-pres-title]"));
  const hud = document.getElementById("presHud");
  const hint = document.getElementById("presHint");
  const countEl = document.getElementById("presCount");
  const titleEl = document.getElementById("presTitle");
  const barEl = document.getElementById("presBar");
  const toggleBtn = document.getElementById("presToggle");
  let index = 0;
  let autoScrollTimer = null;

  const isOn = () => root.classList.contains("is-presenting");
  const isHow = (i) => stops[i] && stops[i].id === "como-funciona";
  const isDemo = (i) => stops[i] && stops[i].id === "demo";

  function updateHud() {
    countEl.textContent = (index + 1) + "/" + stops.length;
    titleEl.textContent = P.t(stops[index].dataset.presTitle);
    barEl.style.transform = "scaleX(" + ((index + 1) / stops.length).toFixed(3) + ")";
    let hintKey = "";
    if (isDemo(index) && !(window.PeaklyDemo && window.PeaklyDemo.isTouring())) hintKey = "pres.tourHint";
    else if (isHow(index) && P.how.getStep() < P.how.count - 1) hintKey = "pres.stepHint";
    hint.hidden = !hintKey;
    hint.textContent = hintKey ? P.t(hintKey) : "";
  }

  // Salto instantáneo a la sección: la transición la hace la animación CSS de entrada
  // (más fiable en un proyector que un scroll suave largo).
  function scrollToStop(i) {
    clearTimeout(autoScrollTimer);
    autoScrollTimer = setTimeout(() => { autoScrollTimer = null; }, 300);
    const top = stops[i].getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top, behavior: "instant" });
  }

  function goTo(i, fromEnd) {
    const next = Math.max(0, Math.min(stops.length - 1, i));
    if (isDemo(index) && next !== index && window.PeaklyDemo) window.PeaklyDemo.stopTour();
    index = next;
    stops.forEach((s, n) => s.classList.toggle("is-current", n === index));
    // Al entrar en «Cómo funciona» empezamos por el paso 1 (o por el 3 si venimos de atrás)
    if (isHow(index)) P.how.setStep(fromEnd ? P.how.count - 1 : 0);
    scrollToStop(index);
    updateHud();
  }

  function next() {
    if (isHow(index) && P.how.getStep() < P.how.count - 1) { P.how.setStep(P.how.getStep() + 1); updateHud(); return; }
    if (index < stops.length - 1) goTo(index + 1);
  }
  function prev() {
    if (isHow(index) && P.how.getStep() > 0) { P.how.setStep(P.how.getStep() - 1); updateHud(); return; }
    if (index > 0) goTo(index - 1, true);
  }

  // Sección que ocupa la parte de arriba de la pantalla (funciona también
  // cuando «Cómo funciona» está fijada y su borde superior queda muy arriba)
  function nearestStop() {
    let best = 0;
    stops.forEach((s, n) => { if (s.getBoundingClientRect().top <= window.innerHeight * 0.4) best = n; });
    return best;
  }

  function enter() {
    if (isOn()) return;
    const start = nearestStop();
    root.classList.add("is-presenting");
    hud.hidden = false;
    toggleBtn.setAttribute("aria-pressed", "true");
    goTo(start);
  }
  function exit() {
    if (!isOn()) return;
    const current = stops[index];
    root.classList.remove("is-presenting");
    stops.forEach((s) => s.classList.remove("is-current"));
    hud.hidden = true;
    hint.hidden = true;
    toggleBtn.setAttribute("aria-pressed", "false");
    // La página cambia de altura al salir: volvemos a la misma sección sin animación
    window.scrollTo({ top: current.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
    P.how.update();
    toggleBtn.focus();
  }

  /* ---------- Teclado ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const el = e.target;
    const typing = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);
    if (typing && !(isOn() && e.key === "Escape")) return; // no robamos teclas mientras se escribe o se mueve el slider

    if ((e.key === "p" || e.key === "P") && !e.repeat) { e.preventDefault(); isOn() ? exit() : enter(); return; }
    if (!isOn()) return;

    switch (e.key) {
      case "ArrowRight": case "ArrowDown": case "PageDown":
        e.preventDefault(); next(); break;
      case "ArrowLeft": case "ArrowUp": case "PageUp":
        e.preventDefault(); prev(); break;
      case "Home": e.preventDefault(); goTo(0); break;
      case "End": e.preventDefault(); goTo(stops.length - 1); break;
      case "Escape": e.preventDefault(); exit(); break;
      case " ":
        e.preventDefault();
        if (isDemo(index) && window.PeaklyDemo) {
          window.PeaklyDemo.isTouring() ? window.PeaklyDemo.stopTour() : window.PeaklyDemo.startTour();
          updateHud();
        } else { next(); }
        break;
    }
  });

  /* ---------- Botones ---------- */
  toggleBtn.addEventListener("click", enter);
  document.getElementById("presNext").addEventListener("click", next);
  document.getElementById("presPrev").addEventListener("click", prev);
  document.getElementById("presExit").addEventListener("click", exit);
  // Cuando el tour empieza o acaba, actualizamos la pista de la barra
  document.addEventListener("peakly:tour", () => { if (isOn()) updateHud(); });

  // Si se hace scroll con la rueda durante la presentación, seguimos la sección visible
  window.addEventListener("scroll", () => {
    if (!isOn() || autoScrollTimer) return;
    const n = nearestStop();
    if (n !== index) {
      if (isDemo(index) && window.PeaklyDemo) window.PeaklyDemo.stopTour();
      index = n;
      stops.forEach((s, k) => s.classList.toggle("is-current", k === index));
      updateHud();
    }
  }, { passive: true });

  document.addEventListener("peakly:lang", () => { if (isOn()) updateHud(); });
})();
