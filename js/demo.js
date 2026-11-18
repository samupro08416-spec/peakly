/* =========================================================
   PEAKLY · demo.js
   Dashboard simulado: filtros, lista con sparklines, ficha
   con gráfico y Peak Score, simulador de tiempo, alerta en
   el móvil, calculadora y demo guiada automática.
   Todo funciona con los datos de ejemplo de data.js.
   ========================================================= */
(function () {
  "use strict";

  const P = window.Peakly;
  const DATA = window.PEAKLY_DATA;
  const $ = (id) => document.getElementById(id);
  const SVG_NS = "http://www.w3.org/2000/svg";
  const TODAY = DATA.semanaActual;
  const MAX_W = DATA.totalSemanas;
  const CHART = { W: 600, H: 190, TOP: 22 };          // área del gráfico grande
  const SPARK = { W: 76, H: 24, TOP: 3 };            // minigráfico de la lista
  const COLORS = { buy: "#22D98A", sell: "#F5B841", late: "#FF8A8A" };

  const first = DATA.productos[0];
  const state = {
    query: "", cat: "all", plat: "all",
    sel: first.id, week: TODAY, alertFor: null,
    buy: first.compra, units: 10,
    touring: false, tourKey: ""
  };

  /* ---------- Utilidades ---------- */
  const t = (k, v) => P.t(k, v);
  const money = (n) => P.money(n);
  const lang = () => P.getLang();
  const nameOf = (p) => p.nombre[lang()] || p.nombre.es;
  const catOf = (id) => { const c = DATA.categorias.find((x) => x.id === id); return c ? (c[lang()] || c.es) : id; };
  const pct = (n) => "+" + n + (lang() === "es" ? " %" : "%");
  const signed = (n) => (n >= 0 ? "+" : "−") + money(Math.abs(n));
  const selected = () => DATA.productos.find((p) => p.id === state.sel) || first;

  // Curva de demanda simulada (campana centrada en la semana del pico)
  function demand(p, w) { return 0.1 + 0.9 * Math.exp(-Math.pow(w - p.semanaPico, 2) / (2 * 2.3 * 2.3)); }
  // Traza un path SVG de la curva entre dos semanas
  function curvePath(p, from, to, width, height, top, scaleWeeks) {
    const pts = [];
    for (let w = from; w <= to + 0.001; w += 0.25) {
      pts.push((w * width / scaleWeeks).toFixed(1) + "," + (top + height - demand(p, w) * height).toFixed(1));
    }
    return "M" + pts.join(" L");
  }
  // Precio de mercado según la semana (sube hasta el pico y luego baja)
  function marketPrice(p, w) {
    const d0 = demand(p, 0);
    const norm = (demand(p, w) - d0) / (demand(p, p.semanaPico) - d0);
    return Math.round(p.compra + (p.venta - p.compra) * norm);
  }
  function statusFor(p, w) {
    const d = w - p.semanaPico;
    if (d <= -2) return { key: "buy", label: t("demo.statusBuy"), tip: t("demo.tipBuy", { weeks: P.weeks(-d), buy: money(p.compra) }) };
    if (d <= 1) return { key: "sell", label: t("demo.statusSell"), tip: t("demo.tipSell", { price: money(marketPrice(p, w)) }) };
    return { key: "late", label: t("demo.statusLate"), tip: t("demo.tipLate") };
  }

  /* ---------- Filtros ---------- */
  function chip(label, pressed, onClick) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = label;
    b.setAttribute("aria-pressed", String(pressed));
    b.addEventListener("click", onClick);
    return b;
  }
  function renderFilters() {
    const plat = $("platFilters"), cat = $("catFilters");
    plat.textContent = ""; cat.textContent = "";
    [["all", t("demo.all")]].concat(DATA.plataformas.map((x) => [x, x])).forEach(([id, label]) => {
      plat.append(chip(label, state.plat === id, () => { state.plat = id; renderFilters(); renderList(); focusChip(plat, label); }));
    });
    [["all", t("demo.all")]].concat(DATA.categorias.map((c) => [c.id, catOf(c.id)])).forEach(([id, label]) => {
      cat.append(chip(label, state.cat === id, () => { state.cat = id; renderFilters(); renderList(); focusChip(cat, label); }));
    });
  }
  // Mantiene el foco del teclado en el filtro pulsado tras redibujar
  function focusChip(group, label) {
    const b = Array.from(group.children).find((x) => x.textContent === label);
    if (b) b.focus();
  }
  function filtered() {
    const q = state.query.trim().toLowerCase();
    return DATA.productos.filter((p) =>
      (state.cat === "all" || p.categoria === state.cat) &&
      (state.plat === "all" || p.plataforma === state.plat) &&
      (!q || nameOf(p).toLowerCase().includes(q) || p.nombre.es.toLowerCase().includes(q)));
  }

  /* ---------- Lista de tendencias ---------- */
  function renderList() {
    const list = $("demoList");
    const items = filtered();
    list.textContent = "";
    $("demoCount").textContent = items.length === 1 ? t("demo.countOne") : t("demo.count", { n: items.length });
    $("demoEmpty").hidden = items.length > 0;
    items.forEach((p, i) => {
      const li = document.createElement("li");
      const b = document.createElement("button");
      b.type = "button";
      b.className = "product";
      b.dataset.id = p.id;
      b.style.animationDelay = (i * 0.04) + "s";
      b.setAttribute("aria-pressed", String(p.id === state.sel));

      const info = document.createElement("span"); info.className = "product__info";
      const nm = document.createElement("span"); nm.className = "product__name"; nm.textContent = nameOf(p);
      const meta = document.createElement("span"); meta.className = "product__meta"; meta.textContent = p.plataforma + " · " + catOf(p.categoria);
      info.append(nm, meta);

      const svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttribute("class", "product__spark");
      svg.setAttribute("viewBox", "0 0 " + SPARK.W + " 30");
      svg.setAttribute("aria-hidden", "true");
      const path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("d", curvePath(p, 0, TODAY + 1, SPARK.W * MAX_W / (TODAY + 1), SPARK.H, SPARK.TOP, MAX_W));
      svg.append(path);

      const nums = document.createElement("span"); nums.className = "product__nums";
      const sc = document.createElement("span"); sc.className = "product__score"; sc.textContent = p.peakScore;
      sc.setAttribute("aria-label", t("demo.scoreAria", { n: p.peakScore }));
      const gr = document.createElement("span"); gr.className = "product__growth"; gr.textContent = pct(p.crecimiento);
      nums.append(sc, gr);

      b.append(info, svg, nums);
      b.addEventListener("click", () => selectProduct(p.id, true));
      li.append(b);
      list.append(li);
    });
  }
  function selectProduct(id, keepFocus) {
    const p = DATA.productos.find((x) => x.id === id);
    if (!p) return;
    state.sel = id;
    state.week = TODAY;
    state.buy = p.compra;
    $("calcBuy").value = p.compra;
    renderList();
    renderDetail(true);
    if (keepFocus) {
      const btn = document.querySelector('.product[data-id="' + id + '"]');
      if (btn) btn.focus();
    }
  }

  /* ---------- Ficha de producto + simulador ---------- */
  function renderDetail(animate) {
    const p = selected();
    const w = state.week;
    const st = statusFor(p, w);
    const detail = $("detail");
    const xOf = (week) => week * CHART.W / MAX_W;
    const yOf = (week) => CHART.TOP + CHART.H - demand(p, week) * CHART.H;

    detail.style.setProperty("--status", COLORS[st.key]);
    $("dMeta").textContent = p.plataforma + " · " + catOf(p.categoria);
    $("dName").textContent = nameOf(p);
    $("dStatusText").textContent = st.label;
    $("dScore").textContent = p.peakScore;
    $("dRing").setAttribute("aria-label", t("demo.scoreAria", { n: p.peakScore }));
    P.setRing($("dRingValue"), p.peakScore);

    // Gráfico: zona del pico, curva completa (futuro) y tramo recorrido
    $("dChart").setAttribute("aria-label", t("demo.chartAria", { name: nameOf(p), n: p.semanaPico + 1 }));
    $("dZone").setAttribute("x", (xOf(p.semanaPico) - 38).toFixed(1));
    $("dZoneLabel").setAttribute("x", xOf(p.semanaPico).toFixed(1));
    $("dFull").setAttribute("d", curvePath(p, 0, MAX_W, CHART.W, CHART.H, CHART.TOP, MAX_W));
    $("dPast").setAttribute("d", curvePath(p, 0, w, CHART.W, CHART.H, CHART.TOP, MAX_W));
    ["dNowLine"].forEach((id) => { $(id).setAttribute("x1", xOf(w).toFixed(1)); $(id).setAttribute("x2", xOf(w).toFixed(1)); });
    $("dNowDot").setAttribute("cx", xOf(w).toFixed(1));
    $("dNowDot").setAttribute("cy", yOf(w).toFixed(1));
    $("dAx1").textContent = t("demo.weekShort", { n: 1 });
    $("dAx7").textContent = t("demo.weekShort", { n: Math.round(MAX_W / 2) + 1 });
    $("dAx13").textContent = t("demo.weekShort", { n: MAX_W + 1 });

    const range = $("weekRange");
    range.max = MAX_W;
    range.value = w;
    const weekText = t("demo.week", { n: w + 1 }) + (w === TODAY ? t("demo.today") : "");
    range.setAttribute("aria-valuetext", weekText + ": " + st.label);
    $("weekLabel").textContent = weekText;
    $("weekTip").textContent = st.tip;

    $("dBuy").textContent = "≤ " + money(p.compra);
    $("dSell").textContent = money(p.venta);
    $("dMargin").textContent = "+" + money(p.venta - p.compra);
    $("dMarket").textContent = money(marketPrice(p, w));

    renderAlert();
    renderCalc();

    if (animate && !P.reduceMotion) {
      detail.classList.remove("is-changing");
      void detail.offsetWidth; // reinicia la animación
      detail.classList.add("is-changing");
    }
  }

  /* ---------- Alerta + móvil ---------- */
  function renderAlert() {
    const p = selected();
    const on = state.alertFor === p.id;
    const btn = $("alertBtn");
    btn.setAttribute("aria-pressed", String(on));
    $("alertBtnText").textContent = t(on ? "demo.alertOn" : "demo.alertOff");
    const notif = $("phoneNotif");
    const wasHidden = notif.hidden;
    notif.hidden = !on;
    if (on) {
      $("phoneNotifText").textContent = t("demo.notif", { name: nameOf(p), buy: money(p.compra), weeks: P.weeks(Math.max(1, p.semanaPico - TODAY)) });
      if (wasHidden) { notif.style.animation = "none"; void notif.offsetWidth; notif.style.animation = ""; }
    }
    $("phoneHint").textContent = on ? t("demo.phoneActive", { name: nameOf(p) }) : t("demo.phoneHint");
    $("phoneScore").textContent = p.peakScore;
  }

  /* ---------- Calculadora de beneficio ---------- */
  function renderCalc() {
    const p = selected();
    const cfg = DATA.calculadora;
    const buy = Math.max(1, Number(state.buy) || 1);
    const units = Math.max(1, Math.round(Number(state.units) || 1));
    const early = (p.venta - buy) * units;
    const lateBuy = Math.round(buy * cfg.subidaCompraTarde);
    const lateSell = Math.round(p.venta * cfg.caidaVentaTarde);
    const late = (lateSell - lateBuy) * units;
    const max = Math.max(Math.abs(early), Math.abs(late), 1);

    $("calcSub").textContent = t("calc.sub", { name: nameOf(p) });
    setBar("calcEarly", early, max, early >= 0 ? COLORS.buy : COLORS.late);
    setBar("calcLate", late, max, late >= 0 ? COLORS.sell : COLORS.late);
    $("calcEarlyDetail").textContent = t("calc.earlyDetail", { buy: money(buy), sell: money(p.venta) });
    $("calcLateDetail").textContent = t("calc.lateDetail", { buy: money(lateBuy), sell: money(lateSell) });
  }
  function setBar(id, value, max, color) {
    const el = $(id);
    el.textContent = signed(value);
    el.style.color = color;
    const bar = $(id + "Bar");
    bar.style.background = color;
    bar.style.transform = "scaleX(" + (Math.abs(value) / max).toFixed(3) + ")";
  }

  /* ---------- Demo guiada (tour automático) ---------- */
  const timers = [];
  // Desplaza la página hasta un elemento, dejando sitio para la navbar fija
  function scrollToEl(el) {
    const presenting = document.documentElement.classList.contains("is-presenting");
    const offset = presenting ? 16 : 88;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      behavior: presenting || P.reduceMotion ? "instant" : "smooth"
    });
  }
  function setTourMsg(key) {
    state.tourKey = key;
    $("tourMsg").textContent = key ? t(key) : "";
  }
  function setTourButton() {
    $("tourBtnText").textContent = t(state.touring ? "demo.tourStop" : "demo.tour");
  }
  function stopTour() {
    const wasTouring = state.touring;
    timers.forEach(clearTimeout);
    timers.length = 0;
    state.touring = false;
    setTourButton();
    setTourMsg("");
    if (wasTouring) document.dispatchEvent(new CustomEvent("peakly:tour", { detail: { touring: false } }));
  }
  function startTour() {
    stopTour();
    state.touring = true;
    setTourButton();
    document.dispatchEvent(new CustomEvent("peakly:tour", { detail: { touring: true } }));
    const best = DATA.productos.reduce((a, b) => (b.peakScore > a.peakScore ? b : a));
    const pk = best.semanaPico;
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const setWeek = (w) => { state.week = Math.max(0, Math.min(MAX_W, w)); renderDetail(false); };

    at(0, () => {
      state.query = ""; state.cat = "all"; state.plat = "all"; state.alertFor = null; state.week = TODAY;
      $("demoSearch").value = "";
      renderFilters(); renderList(); renderDetail(false);
      setTourMsg("demo.tour1");
      // Encuadra el dashboard (en móvil, la ficha) para que se vea todo el recorrido
      const stacked = $("detail").offsetTop > document.querySelector(".demo__list").offsetTop + 40;
      scrollToEl(stacked ? $("detail") : document.querySelector(".demo__layout"));
    });
    at(1300, () => selectProduct(best.id, false));
    at(3000, () => setTourMsg("demo.tour2"));
    at(3600, () => setWeek(TODAY + 1));
    at(4300, () => setWeek(pk));
    at(5800, () => setTourMsg("demo.tour3"));
    at(6400, () => setWeek(pk + 2));
    at(7100, () => setWeek(pk + 3));
    at(7800, () => setWeek(MAX_W));
    at(9400, () => { setTourMsg("demo.tour4"); setWeek(TODAY); });
    at(10600, () => {
      state.alertFor = best.id; renderAlert();
      // En móvil el teléfono queda debajo de la ficha: lo traemos a la vista
      const phone = document.querySelector(".phone");
      const r = phone.getBoundingClientRect();
      if (r.top < 0 || r.bottom > window.innerHeight) scrollToEl(phone);
    });
    at(12600, () => setTourMsg("demo.tourEnd"));
    at(15500, () => stopTour());
  }

  /* ---------- Eventos ---------- */
  $("tourBtn").addEventListener("click", () => (state.touring ? stopTour() : startTour()));
  // Si el usuario toca la demo durante el tour, el tour se para
  $("demo").addEventListener("pointerdown", (e) => {
    if (state.touring && e.isTrusted && !e.target.closest("#tourBtn")) stopTour();
  });
  $("demoSearch").addEventListener("input", (e) => { state.query = e.target.value; renderList(); });
  $("weekRange").addEventListener("input", (e) => { state.week = Number(e.target.value); renderDetail(false); });
  $("alertBtn").addEventListener("click", () => {
    const id = selected().id;
    state.alertFor = state.alertFor === id ? null : id;
    renderAlert();
  });
  $("calcBuy").addEventListener("input", (e) => { state.buy = e.target.value; renderCalc(); });
  $("calcUnits").addEventListener("input", (e) => { state.units = e.target.value; renderCalc(); });
  document.addEventListener("peakly:lang", () => {
    renderFilters(); renderList(); renderDetail(false);
    setTourButton();
    if (state.tourKey) setTourMsg(state.tourKey);
  });

  /* ---------- Arranque ---------- */
  $("calcBuy").value = state.buy;
  $("calcUnits").value = state.units;
  renderFilters();
  renderList();
  renderDetail(false);

  // API para el modo presentación
  window.PeaklyDemo = { startTour: startTour, stopTour: stopTour, isTouring: () => state.touring };
})();
