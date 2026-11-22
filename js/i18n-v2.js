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

    /* Propuesta de valor y diferencial */
    "value.eyebrow": "Propuesta de valor", "value.title": "Todo para revender con ventaja.",
    "value.v1t": "Detecta antes", "value.v1d": "Productos en alza antes de que se saturen.",
    "value.v2t": "Peak Score", "value.v2d": "Predice cuándo llegará el pico de demanda.",
    "value.v3t": "Precio ideal", "value.v3d": "Precio recomendado de compra y de venta.",
    "value.v4t": "Alertas al momento", "value.v4d": "Un aviso en tu móvil en cuanto algo despega.",
    "value.v5t": "Todo en un panel", "value.v5d": "Vinted, Wallapop y eBay juntos y en español.",
    "value.diffEyebrow": "Nuestro diferencial",
    "value.diffTitle": "Otras herramientas miran el pasado. <span class=\"accent\">Peakly mira hacia delante.</span>",
    "value.diffAria": "Comparar Peakly con otras herramientas",
    "value.optOthers": "Otras herramientas", "value.optPeakly": "Peakly",
    "value.capOthers": "Analizan lo que ya se ha vendido. Cuando lo ves, la tendencia ya está saturada.",
    "value.capPeakly": "Predice la demanda de las próximas semanas y te avisa antes del pico.",
    "value.today": "Hoy", "value.past": "Ventas pasadas", "value.noForecast": "Sin predicción",
    "value.buyNow": "Compra ahora", "value.peak": "Pico previsto",

    /* Canales y relación con el cliente */
    "ch.eyebrow": "Canales y comunidad", "ch.title": "Nos encontrarás donde ya estás.",
    "ch.reachT": "Cómo llegamos a ti",
    "ch.c1t": "Web y app móvil", "ch.c1d": "Tu panel siempre a mano.",
    "ch.c2t": "TikTok e Instagram", "ch.c2d": "Cada semana, «lo que va a petar».",
    "ch.c3t": "Creadores de reventa", "ch.c3d": "Colaboraciones con quien ya habla del tema.",
    "ch.c4t": "Programa de referidos", "ch.c4d": "Trae a un amigo y llévate una ventaja.",
    "ch.postKicker": "Esta semana", "ch.postTitle": "Lo que va a petar", "ch.postFoot": "Así serán nuestros posts semanales.",
    "ch.relT": "Cómo te acompañamos",
    "ch.r1t": "Autoservicio", "ch.r1d": "La app hace el trabajo; tú decides.",
    "ch.r2t": "Comunidad", "ch.r2d": "Discord y Telegram para compartir hallazgos.", "ch.soon": "Próximamente",
    "ch.r3t": "Newsletter semanal", "ch.r3d": "Las tendencias de la semana en tu email.", "ch.r3cta": "Apúntate",
    "ch.r4t": "Soporte por chat", "ch.r4d": "Te respondemos cuando lo necesites.",
    "ch.refT": "Invita a un amigo", "ch.refD": "Comparte tu enlace: cuando tu amigo se apunte, tú te llevas una ventaja.",
    "ch.refLabel": "Tu enlace de invitación", "ch.refCopy": "Copiar", "ch.refShare": "Compartir",
    "ch.refCopied": "¡Enlace copiado!", "ch.refCopyFail": "No se ha podido copiar: selecciona el enlace y cópialo a mano.",
    "ch.refShareText": "Mira Peakly: te avisa de lo que va a petar en la reventa antes de que se sature.",

    "pres.sMarket": "La oportunidad", "pres.sCase": "Caso real",
    "pres.sValue": "Propuesta de valor", "pres.sChannels": "Canales y comunidad"
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

    /* Value proposition and differentiator */
    "value.eyebrow": "Value proposition", "value.title": "Everything you need to resell ahead.",
    "value.v1t": "Spot it early", "value.v1d": "Rising products before they get saturated.",
    "value.v2t": "Peak Score", "value.v2d": "Predicts when demand will peak.",
    "value.v3t": "Ideal price", "value.v3d": "Recommended buy and sell price.",
    "value.v4t": "Instant alerts", "value.v4d": "A phone alert as soon as something takes off.",
    "value.v5t": "One dashboard", "value.v5d": "Vinted, Wallapop and eBay together, in Spanish.",
    "value.diffEyebrow": "Our differentiator",
    "value.diffTitle": "Other tools look at the past. <span class=\"accent\">Peakly looks ahead.</span>",
    "value.diffAria": "Compare Peakly with other tools",
    "value.optOthers": "Other tools", "value.optPeakly": "Peakly",
    "value.capOthers": "They analyse what has already sold. By the time you see it, the trend is saturated.",
    "value.capPeakly": "It predicts demand for the coming weeks and alerts you before the peak.",
    "value.today": "Today", "value.past": "Past sales", "value.noForecast": "No forecast",
    "value.buyNow": "Buy now", "value.peak": "Predicted peak",

    /* Channels and customer relationship */
    "ch.eyebrow": "Channels and community", "ch.title": "You'll find us where you already are.",
    "ch.reachT": "How we reach you",
    "ch.c1t": "Web and mobile app", "ch.c1d": "Your dashboard always at hand.",
    "ch.c2t": "TikTok and Instagram", "ch.c2d": "Every week, “what's about to blow up”.",
    "ch.c3t": "Resale creators", "ch.c3d": "Collabs with people who already talk about it.",
    "ch.c4t": "Referral programme", "ch.c4d": "Bring a friend and get a perk.",
    "ch.postKicker": "This week", "ch.postTitle": "What's about to blow up", "ch.postFoot": "This is what our weekly posts will look like.",
    "ch.relT": "How we support you",
    "ch.r1t": "Self-service", "ch.r1d": "The app does the work; you decide.",
    "ch.r2t": "Community", "ch.r2d": "Discord and Telegram to share finds.", "ch.soon": "Coming soon",
    "ch.r3t": "Weekly newsletter", "ch.r3d": "The week's trends in your inbox.", "ch.r3cta": "Sign up",
    "ch.r4t": "Chat support", "ch.r4d": "We answer whenever you need us.",
    "ch.refT": "Invite a friend", "ch.refD": "Share your link: when your friend joins, you get a perk.",
    "ch.refLabel": "Your invite link", "ch.refCopy": "Copy", "ch.refShare": "Share",
    "ch.refCopied": "Link copied!", "ch.refCopyFail": "Couldn't copy: select the link and copy it by hand.",
    "ch.refShareText": "Check out Peakly: it tells you what's about to blow up in resale before it gets saturated.",

    "pres.sMarket": "The opportunity", "pres.sCase": "Real case",
    "pres.sValue": "Value proposition", "pres.sChannels": "Channels and community"
  });
})();
