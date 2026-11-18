/* =========================================================
   PEAKLY · data.js
   DATOS DE EJEMPLO (ficticios). Puedes editarlos sin tocar
   la lógica: añade, quita o cambia productos aquí.

   Campos de cada producto:
   - id: identificador único (sin espacios)
   - nombre: { es, en }
   - categoria: id de una de las categorías de abajo
   - plataforma: "Vinted" | "Wallapop" | "eBay"
   - peakScore: 0-100 (cuánto potencial queda hasta el pico)
   - crecimiento: % de subida de la demanda en 4 semanas
   - compra: precio de compra recomendado (€)
   - venta: precio de venta recomendado en el pico (€)
   - semanaPico: semana (0-12) en la que llega el pico
   ========================================================= */
window.PEAKLY_DATA = {
  // Semana actual dentro del gráfico (0 = semana 1). El simulador empieza aquí.
  semanaActual: 5,
  totalSemanas: 12,

  categorias: [
    { id: "zap", es: "Zapatillas", en: "Sneakers" },
    { id: "ropa", es: "Ropa vintage", en: "Vintage clothing" },
    { id: "tec", es: "Tecnología retro", en: "Retro tech" },
    { id: "col", es: "Coleccionables", en: "Collectibles" }
  ],

  plataformas: ["Vinted", "Wallapop", "eBay"],

  productos: [
    { id: "zap-terraza", nombre: { es: "Zapatillas retro de terraza", en: "Retro terrace sneakers" }, categoria: "zap", plataforma: "Vinted", peakScore: 87, crecimiento: 142, compra: 45, venta: 95, semanaPico: 8 },
    { id: "cam-2000", nombre: { es: "Cámara digital compacta 2000s", en: "2000s compact digital camera" }, categoria: "tec", plataforma: "eBay", peakScore: 91, crecimiento: 210, compra: 40, venta: 110, semanaPico: 7 },
    { id: "chaq-90", nombre: { es: "Chaqueta vintage años 90", en: "90s vintage jacket" }, categoria: "ropa", plataforma: "Wallapop", peakScore: 74, crecimiento: 88, compra: 25, venta: 60, semanaPico: 9 },
    { id: "sud-uni", nombre: { es: "Sudadera universitaria vintage", en: "Vintage college sweatshirt" }, categoria: "ropa", plataforma: "Vinted", peakScore: 81, crecimiento: 97, compra: 18, venta: 45, semanaPico: 8 },
    { id: "zap-basket", nombre: { es: "Zapatillas de baloncesto 2000s", en: "2000s basketball sneakers" }, categoria: "zap", plataforma: "eBay", peakScore: 69, crecimiento: 63, compra: 60, venta: 120, semanaPico: 9 },
    { id: "cartas", nombre: { es: "Cartas coleccionables (sobres clásicos)", en: "Trading cards (classic packs)" }, categoria: "col", plataforma: "eBay", peakScore: 63, crecimiento: 54, compra: 12, venta: 28, semanaPico: 10 },
    { id: "consola", nombre: { es: "Consola portátil retro", en: "Retro handheld console" }, categoria: "tec", plataforma: "Wallapop", peakScore: 58, crecimiento: 41, compra: 55, venta: 95, semanaPico: 11 },
    { id: "figura", nombre: { es: "Figuras de acción años 80", en: "80s action figures" }, categoria: "col", plataforma: "Wallapop", peakScore: 72, crecimiento: 76, compra: 15, venta: 38, semanaPico: 9 }
  ],

  // Anuncios que aparecen en el paso 1 de «Cómo funciona»
  escaneo: [
    { plataforma: "Vinted", nombre: { es: "Zapatillas retro de terraza", en: "Retro terrace sneakers" }, tendencia: 142 },
    { plataforma: "eBay", nombre: { es: "Cámara digital compacta 2000s", en: "2000s compact digital camera" }, tendencia: 210 },
    { plataforma: "Wallapop", nombre: { es: "Chaqueta vintage años 90", en: "90s vintage jacket" }, tendencia: 88 },
    { plataforma: "Vinted", nombre: { es: "Vaqueros pitillo 2010s", en: "2010s skinny jeans" }, tendencia: -34 },
    { plataforma: "eBay", nombre: { es: "Cartas coleccionables", en: "Trading cards" }, tendencia: 54 },
    { plataforma: "Wallapop", nombre: { es: "Gafas de sol ovaladas", en: "Oval sunglasses" }, tendencia: -12 }
  ],

  // Calculadora: cómo cambian los precios si compras DESPUÉS del pico
  calculadora: {
    subidaCompraTarde: 1.55, // pagas un 55 % más porque ya es tendencia
    caidaVentaTarde: 0.62    // vendes al 62 % del precio de pico (mercado saturado)
  }
};
