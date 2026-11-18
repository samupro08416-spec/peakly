/* =========================================================
   PEAKLY · lista-espera.js
   Formulario de la lista de espera.
   - Modo «demo»: no envía nada (por defecto).
   - Modo «formspree» o «googleSheets»: envía el email junto
     con el canal de origen (UTM) al servicio de config.js.
   Incluye casilla de consentimiento (RGPD) y un campo trampa
   anti-spam que las personas no ven.
   ========================================================= */
(function () {
  "use strict";

  const P = window.Peakly;
  const M = window.PeaklyMedicion;
  const CFG = (window.PEAKLY_CONFIG && window.PEAKLY_CONFIG.listaEspera) || {};
  const $ = (id) => document.getElementById(id);

  const form = $("waitForm");
  const email = $("waitEmail");
  const consent = $("waitConsent");
  const honeypot = $("waitHp");
  const submit = $("waitSubmit");
  const submitText = $("waitSubmitText");
  const msg = $("waitMsg");
  const success = $("waitSuccess");
  const okText = $("waitOkText");
  const demoNote = $("waitDemoNote");
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const TIMEOUT_MS = 12000;

  let errorKey = "";     // clave del mensaje de error visible (para traducirlo)
  let sending = false;
  let savedEmail = "";

  // Servicio activo: solo se envía si hay una URL https válida (o localhost para pruebas)
  function activeService() {
    const url = String(CFG.url || "").trim();
    const validUrl = /^https:\/\/[^\s]+$/i.test(url) || /^http:\/\/localhost(:\d+)?\//i.test(url);
    if ((CFG.servicio === "formspree" || CFG.servicio === "googleSheets") && validUrl) return CFG.servicio;
    return "demo";
  }

  function showError(key, field) {
    errorKey = key;
    msg.textContent = P.t(key);
    if (field) { field.setAttribute("aria-invalid", "true"); field.focus(); }
  }
  function clearError() {
    errorKey = "";
    msg.textContent = "";
    email.removeAttribute("aria-invalid");
    consent.removeAttribute("aria-invalid");
  }
  function setSending(on) {
    sending = on;
    submit.disabled = on;
    submit.setAttribute("aria-busy", String(on));
    submitText.textContent = P.t(on ? "cta.sending" : "cta.button");
  }

  // Datos que se envían: email + canal de origen + idioma
  function buildData(value) {
    const c = M.getCampaign();
    return {
      email: value,
      utm_source: c.utm_source || "",
      utm_medium: c.utm_medium || "",
      utm_campaign: c.utm_campaign || "",
      utm_content: c.utm_content || "",
      idioma: P.getLang(),
      consentimiento: "si",
      _gotcha: honeypot.value
    };
  }

  // Envío al servicio configurado. Devuelve una promesa que falla si no se pudo enviar.
  function send(data) {
    const service = activeService();
    if (service === "demo") return Promise.resolve();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    let request;
    if (service === "formspree") {
      const body = new FormData();
      Object.keys(data).forEach((k) => body.append(k, data[k]));
      body.append("_subject", "Nuevo registro en la lista de espera de Peakly");
      request = fetch(CFG.url, { method: "POST", body: body, headers: { Accept: "application/json" }, signal: controller.signal })
        .then((res) => { if (!res.ok) throw new Error("HTTP " + res.status); });
    } else {
      // Google Apps Script no permite leer la respuesta desde otra web (modo no-cors):
      // si la petición sale sin error de red, la damos por buena.
      request = fetch(CFG.url, { method: "POST", mode: "no-cors", body: new URLSearchParams(data), signal: controller.signal })
        .then(() => undefined);
    }
    return request.finally(() => clearTimeout(timer));
  }

  function showSuccess() {
    form.hidden = true;
    success.hidden = false;
    okText.textContent = P.t("cta.okText", { email: savedEmail });
    demoNote.hidden = activeService() !== "demo";
    $("waitAgain").focus();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (sending) return;
    clearError();
    const value = email.value.trim();
    if (!EMAIL_RE.test(value)) { showError("cta.error", email); return; }
    if (!consent.checked) { showError("cta.errorConsent", consent); return; }

    savedEmail = value;
    // Campo trampa relleno = robot: fingimos éxito sin enviar nada
    if (honeypot.value) { showSuccess(); return; }

    setSending(true);
    send(buildData(value))
      .then(() => {
        const canal = M.getCampaign().utm_source || "directo";
        M.track("lista-registro/" + canal);
        showSuccess();
      })
      .catch(() => { showError("cta.errorSend"); })
      .finally(() => setSending(false));
  });

  email.addEventListener("input", () => { if (errorKey === "cta.error") clearError(); });
  consent.addEventListener("change", () => { if (errorKey === "cta.errorConsent") clearError(); });

  $("waitAgain").addEventListener("click", () => {
    success.hidden = true;
    form.hidden = false;
    form.reset();
    clearError();
    email.focus();
  });

  // Al cambiar de idioma, traducimos también los mensajes que estén a la vista
  document.addEventListener("peakly:lang", () => {
    if (errorKey) msg.textContent = P.t(errorKey);
    if (sending) submitText.textContent = P.t("cta.sending");
    if (!success.hidden) okText.textContent = P.t("cta.okText", { email: savedEmail });
  });
})();
