/* =========================================================
   PEAKLY · data.js
   Datos de la web. Hay DOS tipos y la web los distingue:
   ✅ DATOS REALES: cifras de mercado y tendencias investigadas
      en fuentes públicas (cada una con su fuente y fecha).
   🧪 SIMULACIÓN: Peak Score, % de crecimiento, precios y curvas
      de la demo. Así funcionaría Peakly, pero son inventados.

   Vinted y Wallapop no tienen API pública y sus condiciones no
   permiten extraer datos de forma automática, por eso aquí no se
   conectan en directo. Para la versión funcional, ver
   docs/ARQUITECTURA.md y js/api.js.
   Investigación hecha en noviembre de 2026.
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

  /* ---------- 🧪 Productos de la demo ----------
     Los productos y su «motivo» son tendencias REALES (con fuente).
     peakScore, crecimiento, compra, venta y semanaPico son SIMULACIÓN.
     ilustracion: sneaker | shirt | camera | cards | figure          */
  productos: [
    {
      id: "camara-compacta", ilustracion: "camera", categoria: "tec", plataforma: "Wallapop",
      nombre: { es: "Cámara Canon IXUS (2000s)", en: "Canon IXUS camera (2000s)" },
      peakScore: 91, crecimiento: 64, compra: 45, venta: 120, semanaPico: 8,
      motivo: {
        es: "Las compactas de los 2000 vuelven gracias a la Gen Z y a las redes: los fabricantes no estaban preparados para tanta demanda.",
        en: "2000s compacts are back thanks to Gen Z and social media: manufacturers weren't ready for the demand."
      },
      fuente: { nombre: "PetaPixel", url: "https://petapixel.com/2024/08/30/manufacturers-were-unprepared-for-the-point-and-shoot-camera-revival", fecha: { es: "ago. 2024", en: "Aug 2024" } }
    },
    {
      id: "camiseta-retro", ilustracion: "shirt", categoria: "ropa", plataforma: "Vinted",
      nombre: { es: "Camiseta de fútbol retro 90s", en: "90s retro football shirt" },
      peakScore: 86, crecimiento: 48, compra: 25, venta: 70, semanaPico: 9,
      motivo: {
        es: "El «blokecore» ha convertido las camisetas retro en moda de diario. En el Mundial de 2022 sus ventas casi se duplicaron en Catawiki.",
        en: "“Blokecore” turned retro shirts into everyday fashion. During the 2022 World Cup their sales almost doubled on Catawiki."
      },
      fuente: { nombre: "Catawiki", url: "https://auction.catawiki.com/en/press/1779-experts-predict-euros-to-boost-resale-of-football-shirts", fecha: { es: "2024", en: "2024" } }
    },
    {
      id: "adidas-sl72", ilustracion: "sneaker", categoria: "zap", plataforma: "Vinted",
      nombre: { es: "Adidas SL 72", en: "Adidas SL 72" },
      peakScore: 82, crecimiento: 39, compra: 55, venta: 95, semanaPico: 9,
      motivo: {
        es: "Tras el boom de la Samba, la moda se mueve hacia siluetas finas de perfil bajo como la SL 72.",
        en: "After the Samba boom, fashion is moving to slim low-profile silhouettes like the SL 72."
      },
      fuente: { nombre: "Footwear Plus", url: "https://footwearplusmagazine.com/?p=29753", fecha: { es: "2025", en: "2025" } }
    },
    {
      id: "cartas-japonesas", ilustracion: "cards", categoria: "col", plataforma: "eBay",
      nombre: { es: "Cartas: cajas japonesas", en: "Cards: Japanese boxes" },
      peakScore: 77, crecimiento: 31, compra: 90, venta: 160, semanaPico: 10,
      motivo: {
        es: "Algunas cajas japonesas de edición limitada de 2025 se revenden muy por encima de su precio oficial (datos de un marketplace de reventa).",
        en: "Some limited 2025 Japanese boxes resell far above their official price (data from a resale marketplace)."
      },
      fuente: { nombre: "SNKRDUNK Magazine", url: "https://snkrdunk.com/en/magazine/2026/04/24/the-30th-anniversary-gold-rush-why-japanese-pokemon-boxes-are-hitting-all-time-highs/", fecha: { es: "abr. 2026", en: "Apr 2026" } }
    },
    {
      id: "adidas-samba", ilustracion: "sneaker", categoria: "zap", plataforma: "Vinted",
      nombre: { es: "Adidas Samba OG", en: "Adidas Samba OG" },
      peakScore: 18, crecimiento: -22, compra: 60, venta: 90, semanaPico: 2,
      motivo: {
        es: "Llegó a revenderse por hasta 500 $ en 2022; hoy se encuentra con descuento. Una señal clara de saturación.",
        en: "It resold for up to $500 in 2022; today it's found on discount. A clear sign of saturation."
      },
      fuente: { nombre: "Gear Patrol", url: "https://www.gearpatrol.com/?p=858853", fecha: { es: "", en: "" } }
    },
    {
      id: "labubu", ilustracion: "figure", categoria: "col", plataforma: "Wallapop",
      nombre: { es: "Labubu · set completo", en: "Labubu · full set" },
      peakScore: 9, crecimiento: -47, compra: 40, venta: 95, semanaPico: 1,
      motivo: {
        es: "Los sets completos pasaron de 1.380 ¥ en junio de 2025 a unos 600-700 ¥ en septiembre: quien compró en el pico perdió cerca de la mitad.",
        en: "Full sets went from ¥1,380 in June 2025 to about ¥600-700 in September: buying at the peak lost about half."
      },
      fuente: { nombre: "Shanghai Daily", url: "https://www.citynewsservice.cn/news/From-boom-to-bust-Labubu-tumbles-on-resale-market-as-hype-fades-ekdqbzom", fecha: { es: "sep. 2025", en: "Sep 2025" } }
    }
  ],

  /* ---------- ✅ El mercado en cifras (DATOS REALES) ---------- */
  mercado: [
    {
      valor: 1100, decimales: 0, prefijo: { es: "", en: "€" }, sufijo: { es: " M€", en: "M" },
      etiqueta: { es: "facturó Vinted en 2025, un 38 % más que en 2024", en: "Vinted revenue in 2025, up 38% on 2024" },
      fuente: { nombre: "FashionUnited", url: "https://fashionunited.com/news/business/vinted-reaches-1-1-billion-euros-in-revenue-for-2025-accepting-a-strategic-drop-in-profits/2026040971654", fecha: { es: "abr. 2026", en: "Apr 2026" } }
    },
    {
      valor: 19, decimales: 0, prefijo: { es: "", en: "" }, sufijo: { es: " M", en: "M" },
      etiqueta: { es: "usuarios al mes en Wallapop (España, Italia y Portugal)", en: "monthly Wallapop users (Spain, Italy and Portugal)" },
      fuente: { nombre: "Wallapop · La Red del Cambio 2025", url: "https://www.bolsamania.com/noticias/ultimas/economia--los-espanoles-pueden-obtener-hasta-1112-euros-al-ano-comprando-y-vendiendo-articulos-usados-segun-wallapop--21106578", fecha: { es: "oct. 2025", en: "Oct 2025" } }
    },
    {
      valor: 7, decimales: 0, prefijo: { es: "", en: "" }, sufijo: { es: " de 10", en: " in 10" },
      etiqueta: { es: "españoles ya ha comprado algo de segunda mano", en: "Spaniards have already bought second-hand" },
      fuente: { nombre: "Observatorio Cetelem 2025", url: "https://elobservatoriocetelem.es/app/uploads/sites/3/2025/06/ndp_observatorio-cetelem_sostenibilidad-y-consumo-2025.pdf", fecha: { es: "jun. 2025", en: "Jun 2025" } }
    },
    {
      valor: 367, decimales: 0, prefijo: { es: "", en: "$" }, sufijo: { es: " mil M$", en: "B" },
      etiqueta: { es: "valdrá la ropa de segunda mano en el mundo en 2029", en: "global second-hand apparel market by 2029" },
      fuente: { nombre: "ThredUp Resale Report 2025", url: "https://www.businesswire.com/news/home/20250319230685/en/", fecha: { es: "mar. 2025", en: "Mar 2025" } }
    }
  ],

  /* ---------- ✅ Cinta de tendencias (señales REALES, ver fuentes de arriba) ---------- */
  ticker: [
    { es: "Cámaras compactas 2000s", en: "2000s compact cameras", dir: "up", nota: { es: "Gen Z", en: "Gen Z" } },
    { es: "Camisetas de fútbol retro", en: "Retro football shirts", dir: "up", nota: { es: "blokecore", en: "blokecore" } },
    { es: "Labubu", en: "Labubu", dir: "down", nota: { es: "≈ −50 % jun→sep 2025", en: "≈ −50% Jun→Sep 2025" } },
    { es: "Adidas SL 72", en: "Adidas SL 72", dir: "up", nota: { es: "perfil bajo", en: "low profile" } },
    { es: "Adidas Samba", en: "Adidas Samba", dir: "down", nota: { es: "saturada", en: "saturated" } },
    { es: "Cajas japonesas de cartas", en: "Japanese card boxes", dir: "up", nota: { es: "ediciones limitadas", en: "limited editions" } },
    { es: "Vinted", en: "Vinted", dir: "up", nota: { es: "+38 % ingresos 2025", en: "+38% revenue 2025" } },
    { es: "Segunda mano en España", en: "Second-hand in Spain", dir: "up", nota: { es: "7 de cada 10 ya compran", en: "7 in 10 already buy" } }
  ],

  // Escaneo del paso 1 de «Cómo funciona» (🧪 simulación con productos reales)
  escaneo: [
    { plataforma: "Wallapop", nombre: { es: "Cámara compacta Canon IXUS", en: "Canon IXUS compact camera" }, tendencia: 64 },
    { plataforma: "Vinted", nombre: { es: "Camiseta de fútbol retro", en: "Retro football shirt" }, tendencia: 48 },
    { plataforma: "Vinted", nombre: { es: "Adidas SL 72", en: "Adidas SL 72" }, tendencia: 39 },
    { plataforma: "Vinted", nombre: { es: "Adidas Samba OG", en: "Adidas Samba OG" }, tendencia: -22 },
    { plataforma: "eBay", nombre: { es: "Cajas japonesas de cartas", en: "Japanese card boxes" }, tendencia: 31 },
    { plataforma: "Wallapop", nombre: { es: "Figura Labubu", en: "Labubu figure" }, tendencia: -47 }
  ],

  // Calculadora: cómo cambian los precios si compras DESPUÉS del pico (🧪)
  calculadora: {
    subidaCompraTarde: 1.55, // pagas un 55 % más porque ya es tendencia
    caidaVentaTarde: 0.62    // vendes al 62 % del precio de pico (mercado saturado)
  }
};
