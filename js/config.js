/* =========================================================
   PEAKLY · config.js
   ✏️ CONFIGURACIÓN DE LA LISTA DE ESPERA Y LA ANALÍTICA
   Mientras esté vacío, la web funciona en «modo demo»:
   el formulario no envía nada a ningún sitio.
   Pasos para rellenarlo: README.md, apartado 6.
   ========================================================= */
window.PEAKLY_CONFIG = {
  listaEspera: {
    // "demo"         → no se envía nada (como en clase sin internet)
    // "formspree"    → los emails llegan a tu panel de Formspree
    // "googleSheets" → los emails se guardan en una hoja de Google Sheets
    servicio: "demo",

    // Pega aquí la URL que te da el servicio. Ejemplos:
    //   Formspree:     "https://formspree.io/f/abcdwxyz"
    //   Google Sheets: "https://script.google.com/macros/s/AKfy.../exec"
    url: ""
  },

  analitica: {
    // GoatCounter (gratis para proyectos no comerciales y sin cookies).
    // Ejemplo: "https://peakly-clase.goatcounter.com/count"
    goatcounter: ""
  },

  datos: {
    // "local"  → usa los datos de js/data.js (lo actual)
    // "remota" → los pide a vuestro servidor cuando Peakly sea funcional
    //            (formato en docs/ARQUITECTURA.md). Si falla, vuelve a "local".
    fuente: "local",
    url: "" // ej.: "https://api.peakly.app"
  },

  // true = muestra en la consola del navegador cada evento medido (útil para probar)
  debug: false
};
