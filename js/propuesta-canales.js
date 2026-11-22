/* =========================================================
   PEAKLY · propuesta-canales.js
   - Diferencial: comparador «Otras herramientas» vs «Peakly»
     (al aparecer en pantalla se cambia solo a «Peakly» una vez)
   - Canales: post semanal «Lo que va a petar» con el top 3
   - Referidos: enlace personal con UTM para copiar o compartir
   ========================================================= */
(function () {
  "use strict";

  const P = window.Peakly;
  const M = window.PeaklyMedicion;
  const DATA = window.PEAKLY_DATA;
  const $ = (id) => document.getElementById(id);
  const SVG_NS = "http://www.w3.org/2000/svg";
  const lang = () => P.getLang();

  /* ---------- 1. Diferencial: comparador ---------- */
  const box = $("diffBox");
  const caption = $("diffCaption");
  const buttons = box ? Array.from(box.querySelectorAll(".segmented__btn")) : [];
  let userChose = false;

  function setMode(mode) {
    if (!box) return;
    box.dataset.mode = mode;
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === mode)));
    caption.textContent = P.t(mode === "peakly" ? "value.capPeakly" : "value.capOthers");
  }
  buttons.forEach((b) => b.addEventListener("click", () => {
    userChose = true;
    setMode(b.dataset.mode);
    if (M) M.track("diferencial/" + b.dataset.mode);
  }));
  // La primera vez que se ve: empieza en «Otras» y a los 2,6 s pasa a «Peakly»
  if (box && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      setTimeout(() => { if (!userChose) setMode("peakly"); }, 2600);
    }, { threshold: 0.5 });
    io.observe(box);
  }

  /* ---------- 2. Post semanal: top 3 de productos en alza ---------- */
  let products = DATA.productos;
  function renderPost() {
    const list = $("postList");
    if (!list) return;
    list.textContent = "";
    products
      .filter((p) => p.crecimiento > 0)
      .sort((a, b) => b.peakScore - a.peakScore)
      .slice(0, 3)
      .forEach((p, i) => {
        const li = document.createElement("li");
        li.className = "post__item";
        const rank = document.createElement("span");
        rank.className = "post__rank";
        rank.textContent = i + 1;
        const ill = document.createElement("span");
        ill.className = "ill ill--" + p.categoria;
        ill.setAttribute("aria-hidden", "true");
        const svg = document.createElementNS(SVG_NS, "svg");
        const use = document.createElementNS(SVG_NS, "use");
        use.setAttribute("href", "#ill-" + (p.ilustracion || "cards"));
        svg.append(use);
        ill.append(svg);
        const name = document.createElement("span");
        name.className = "post__name";
        name.textContent = p.nombre[lang()] || p.nombre.es;
        const score = document.createElement("span");
        score.className = "post__score";
        score.textContent = p.peakScore;
        score.setAttribute("aria-label", P.t("demo.scoreAria", { n: p.peakScore }));
        li.append(rank, ill, name, score);
        list.append(li);
      });
  }
  if (window.PeaklyAPI) window.PeaklyAPI.getTendencias().then((list) => { products = list; renderPost(); });

  /* ---------- 3. Referidos: enlace personal ---------- */
  const refInput = $("refLink");
  const refMsg = $("refMsg");
  const shareBtn = $("refShare");
  let msgKey = "";

  // Código de invitación: se crea una vez y se recuerda en este navegador
  function getCode() {
    let code = "";
    try { code = window.localStorage.getItem("peakly-ref") || ""; } catch (e) { /* sin almacenamiento */ }
    if (!/^[a-z0-9]{6}$/.test(code)) {
      const chars = "abcdefghjkmnpqrstuvwxyz23456789";
      const bytes = new Uint8Array(6);
      if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(bytes);
      else for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
      code = Array.from(bytes, (b) => chars[b % chars.length]).join("");
      try { window.localStorage.setItem("peakly-ref", code); } catch (e) { /* sin almacenamiento */ }
    }
    return code;
  }
  // Enlace = esta misma web + UTM de referido (así se mide como canal «referido»)
  function buildLink() {
    const base = window.location.href.split("#")[0].split("?")[0];
    return base + "?utm_source=referido&utm_medium=amigo&utm_campaign=referidos&utm_content=" + getCode();
  }
  function showMsg(key) {
    msgKey = key;
    refMsg.textContent = key ? P.t(key) : "";
    if (key) setTimeout(() => { if (msgKey === key) showMsg(""); }, 3000);
  }
  function fallbackCopy() {
    refInput.select();
    try { return document.execCommand("copy"); } catch (e) { return false; }
  }
  if (refInput) {
    refInput.value = buildLink();
    refInput.addEventListener("focus", () => refInput.select());
    $("refCopy").addEventListener("click", () => {
      const text = refInput.value;
      const done = () => showMsg("ch.refCopied");
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, () => (fallbackCopy() ? done() : showMsg("ch.refCopyFail")));
      } else {
        fallbackCopy() ? done() : showMsg("ch.refCopyFail");
      }
    });
    // «Compartir» solo aparece si el navegador lo permite (sobre todo en móvil)
    if (navigator.share) {
      shareBtn.hidden = false;
      shareBtn.addEventListener("click", () => {
        navigator.share({ title: "Peakly", text: P.t("ch.refShareText"), url: refInput.value }).catch(() => { /* cancelado */ });
      });
    }
  }

  /* ---------- 4. Newsletter: lleva al formulario y pone el cursor en el email ---------- */
  const newsletter = $("newsletterLink");
  if (newsletter) {
    newsletter.addEventListener("click", () => {
      setTimeout(() => { const email = $("waitEmail"); if (email) email.focus({ preventScroll: true }); }, P.reduceMotion ? 0 : 700);
    });
  }

  /* ---------- Arranque e idioma ---------- */
  setMode("otras");
  renderPost();
  document.addEventListener("peakly:lang", () => {
    setMode(box ? box.dataset.mode : "otras");
    renderPost();
    if (msgKey) refMsg.textContent = P.t(msgKey);
  });
})();
