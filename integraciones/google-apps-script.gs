/**
 * PEAKLY · Lista de espera en Google Sheets
 * ----------------------------------------------------------
 * Cómo usarlo (resumen; pasos completos en README.md, apartado 6):
 * 1. Crea una hoja de cálculo nueva en Google Sheets.
 * 2. Menú Extensiones → Apps Script. Borra lo que haya y pega TODO este archivo.
 * 3. Guarda (icono del disquete).
 * 4. Implementar → Nueva implementación → tipo «Aplicación web».
 *      Ejecutar como: Yo · Quién tiene acceso: Cualquier usuario.
 * 5. Autoriza los permisos y copia la URL que acaba en /exec.
 * 6. Pega esa URL en js/config.js con servicio: "googleSheets".
 *
 * Cada registro se guarda como una fila en la pestaña «Registros».
 */

const HOJA = "Registros";
const COLUMNAS = ["Fecha", "Email", "Canal (utm_source)", "Medio (utm_medium)", "Campaña (utm_campaign)", "Contenido (utm_content)", "Idioma", "Consentimiento"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000); // evita que dos registros a la vez se pisen
  try {
    const p = (e && e.parameter) || {};

    // Campo trampa relleno = robot: no guardamos nada
    if (p._gotcha) return respuesta({ ok: true });

    const email = String(p.email || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || p.consentimiento !== "si") {
      return respuesta({ ok: false, error: "datos no válidos" });
    }

    const libro = SpreadsheetApp.getActiveSpreadsheet();
    let hoja = libro.getSheetByName(HOJA);
    if (!hoja) {
      hoja = libro.insertSheet(HOJA);
      hoja.appendRow(COLUMNAS);
      hoja.setFrozenRows(1);
    }

    hoja.appendRow([
      new Date(),
      limpiar(email),
      limpiar(p.utm_source),
      limpiar(p.utm_medium),
      limpiar(p.utm_campaign),
      limpiar(p.utm_content),
      limpiar(p.idioma),
      "sí"
    ]);
    return respuesta({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// Evita que un texto que empiece por = + - @ se ejecute como fórmula en la hoja
function limpiar(valor) {
  const texto = String(valor || "").slice(0, 120);
  return /^[=+\-@]/.test(texto) ? "'" + texto : texto;
}

function respuesta(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(ContentService.MimeType.JSON);
}
