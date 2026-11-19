/* =========================================================
   PEAKLY · i18n-v2.js
   Textos de la versión 2 (más visual y con datos reales).
   Se SUMAN a i18n.js; si una clave ya existía, la sustituye.
   Edita aquí los textos nuevos en los dos idiomas.
   ========================================================= */
(function () {
  "use strict";
  const I = window.PEAKLY_I18N;

  Object.assign(I.es, {
    "common.sample": "Simulación",
    "real.badge": "Dato real",
    "real.trend": "Tendencia real",
    "legend.real": "productos y tendencias, con su fuente",
    "legend.simT": "Simulación",
    "legend.sim": "Peak Score, % de crecimiento, precios y curvas",

    "hero.p1": "plataformas en un solo panel", "hero.p2": "Peak Score calculado con IA", "hero.p3": "alertas en tu móvil",
    "hero.cardEyebrow": "Tendencia · Tecnología retro", "hero.cardProduct": "Cámara compacta Canon IXUS",
    "hero.cardGrowth": "+64 % de demanda en 4 semanas", "hero.sellValue": "120 €",
    "hero.chipAlertT": "Alerta Peakly", "hero.chipAlert": "Compra por debajo de 45 €",
    "hero.chipMarginV": "+75 €", "hero.chipMargin": "margen estimado",
    "hero.chipLateT": "Labubu ≈ −50 %", "hero.chipLate": "dato real · jun→sep 2025",

    "ticker.aria": "Tendencias reales del mercado", "ticker.label": "Radar en vivo",

    "market.eyebrow": "La oportunidad",
    "market.title": "La segunda mano ya no es un nicho. <span class=\"accent\">Es un mercado gigante.</span>",
    "market.lead": "Y está lleno de datos que nadie está leyendo a tiempo.",
    "market.quote": "al año puede generar un usuario medio comprando y vendiendo artículos usados.",
    "market.note": "Cifras publicadas por las empresas y estudios citados. Consultadas en noviembre de 2026.",

    "how.notifText": "Cámara compacta Canon IXUS a punto de despegar. Compra por debajo de 45 € y vende a 120 €.",
    "how.buyValue": "≤ 45 €", "how.sellValue": "120 €",

    "case.eyebrow": "Caso real",
    "case.title": "Labubu: del pico a <span class=\"accent-red\">la mitad</span> en tres meses.",
    "case.lead": "En 2025 las figuras Labubu de Pop Mart fueron uno de los juguetes más buscados del mundo. Quien compró en lo alto de la ola, perdió.",
    "case.f1": "set completo (3.ª generación) a mediados de junio de 2025",
    "case.f2": "el mismo set a principios de septiembre",
    "case.f3": "una edición rara, en solo unas semanas",
    "case.alsoT": "No es un caso aislado.",
    "case.also": "Las Adidas Samba llegaron a revenderse por hasta 500 $ en 2022 y hoy se encuentran con descuento.",
    "case.chartAria": "Precio de reventa del set completo de Labubu: 1.380 yuanes a mediados de junio de 2025 y unos 650 a principios de septiembre",
    "case.sell": "Peakly: ¡vende ahora!", "case.late": "Si compraste tarde: ≈ −50 %",
    "case.m1": "abr.", "case.m2": "may.", "case.m3": "jun.", "case.m4": "jul.", "case.m5": "ago.", "case.m6": "sep. 2025",
    "case.caption": "Los puntos son precios publicados. La línea que los une es ilustrativa.",
    "case.lesson": "La lección: cuando una tendencia ya está en todas partes, <strong>llegas tarde</strong>. Peakly está diseñada para avisarte antes del pico.",

    "faq.a1": "La web usa cifras de mercado reales, siempre con su fuente, y una simulación para la demo. Vinted y Wallapop no tienen API pública, así que la versión funcional trabajará con fuentes autorizadas, como la API oficial de eBay, y con acuerdos con las plataformas.",

    "pres.sMarket": "La oportunidad", "pres.sCase": "Caso real"
  });

  Object.assign(I.en, {
    "common.sample": "Simulation",
    "real.badge": "Real data",
    "real.trend": "Real trend",
    "legend.real": "products and trends, with their source",
    "legend.simT": "Simulation",
    "legend.sim": "Peak Score, growth %, prices and curves",

    "hero.p1": "platforms in one dashboard", "hero.p2": "AI-powered Peak Score", "hero.p3": "alerts on your phone",
    "hero.cardEyebrow": "Trending · Retro tech", "hero.cardProduct": "Canon IXUS compact camera",
    "hero.cardGrowth": "+64% demand in 4 weeks", "hero.sellValue": "€120",
    "hero.chipAlertT": "Peakly alert", "hero.chipAlert": "Buy under €45",
    "hero.chipMarginV": "+€75", "hero.chipMargin": "estimated margin",
    "hero.chipLateT": "Labubu ≈ −50%", "hero.chipLate": "real data · Jun→Sep 2025",

    "ticker.aria": "Real market trends", "ticker.label": "Live radar",

    "market.eyebrow": "The opportunity",
    "market.title": "Second-hand isn't a niche anymore. <span class=\"accent\">It's a huge market.</span>",
    "market.lead": "And it's full of data nobody is reading in time.",
    "market.quote": "a year is what an average user can make buying and selling used items.",
    "market.note": "Figures published by the companies and studies cited. Checked in November 2026.",

    "how.notifText": "Canon IXUS compact camera about to take off. Buy under €45 and sell at €120.",
    "how.buyValue": "≤ €45", "how.sellValue": "€120",

    "case.eyebrow": "Real case",
    "case.title": "Labubu: from the peak to <span class=\"accent-red\">half price</span> in three months.",
    "case.lead": "In 2025 Pop Mart's Labubu figures were among the most wanted toys in the world. Those who bought at the top of the wave lost.",
    "case.f1": "full set (3rd generation) in mid-June 2025",
    "case.f2": "the same set in early September",
    "case.f3": "a rare edition, in just a few weeks",
    "case.alsoT": "It's not a one-off.",
    "case.also": "Adidas Sambas resold for up to $500 in 2022 and today they're found on discount.",
    "case.chartAria": "Resale price of the full Labubu set: 1,380 yuan in mid-June 2025 and about 650 in early September",
    "case.sell": "Peakly: sell now!", "case.late": "If you bought late: ≈ −50%",
    "case.m1": "Apr", "case.m2": "May", "case.m3": "Jun", "case.m4": "Jul", "case.m5": "Aug", "case.m6": "Sep 2025",
    "case.caption": "Dots are published prices. The line joining them is illustrative.",
    "case.lesson": "The lesson: when a trend is already everywhere, <strong>you're late</strong>. Peakly is built to warn you before the peak.",

    "faq.a1": "The site uses real market figures, always with their source, and a simulation for the demo. Vinted and Wallapop have no public API, so the working version will use authorised sources, such as eBay's official API, and agreements with the platforms.",

    "pres.sMarket": "The opportunity", "pres.sCase": "Real case"
  });
})();
