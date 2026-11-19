# Peakly · Cómo pasar de presentación a producto funcional

Hoy la web es una **landing de presentación**:
- Las cifras de mercado son **reales** y llevan su fuente.
- La demo es una **simulación**: Peak Score, porcentajes, precios y curvas son inventados.

Este documento explica cómo está preparada para crecer y qué haría falta para que Peakly funcione de verdad.

---

## 1. Lo que ya está preparado

```
Interfaz (index.html + css + demo.js + visual.js)
        │  pide los datos SOLO a →
        ▼
js/api.js  ──  fuente "local"  → js/data.js (hoy)
           └─  fuente "remota" → vuestro servidor (mañana)
```

- La interfaz no sabe de dónde salen los datos. Para conectarla a un servidor basta con cambiar `js/config.js`:
  ```js
  datos: { fuente: "remota", url: "https://api.peakly.app" }
  ```
- Si el servidor falla o responde mal, la web vuelve sola a los datos locales y sigue funcionando.
- La lista de espera ya puede guardar emails reales (Formspree o Google Sheets) y medir el canal de origen (UTM).

## 2. Contrato de la API (lo que el servidor debe devolver)

### `GET /tendencias`
```json
{
  "productos": [
    {
      "id": "camara-compacta",
      "nombre": { "es": "Cámara Canon IXUS (2000s)", "en": "Canon IXUS camera (2000s)" },
      "categoria": "tec",
      "plataforma": "Wallapop",
      "ilustracion": "camera",
      "peakScore": 91,
      "crecimiento": 64,
      "compra": 45,
      "venta": 120,
      "semanaPico": 8,
      "motivo": { "es": "…", "en": "…" },
      "fuente": { "nombre": "PetaPixel", "url": "https://…", "fecha": { "es": "ago. 2024", "en": "Aug 2024" } }
    }
  ]
}
```
Obligatorios: `id`, `nombre`, `peakScore`, `compra`, `venta` y `semanaPico`. Los productos a los que les falte alguno se descartan.

### `GET /mercado`
```json
{ "mercado": [ { "valor": 1100, "decimales": 0, "prefijo": { "es": "", "en": "€" }, "sufijo": { "es": " M€", "en": "M" }, "etiqueta": { "es": "…", "en": "…" }, "fuente": { "nombre": "…", "url": "…" } } ] }
```

## 3. De dónde sacar datos reales (de forma legal)

| Fuente | Qué da | Estado |
|---|---|---|
| **eBay Browse API** (oficial) | Anuncios activos: precio, cantidad, categoría | Cuenta de desarrollador gratuita |
| **eBay Marketplace Insights API** (oficial) | Ventas de los últimos 90 días | Acceso restringido: eBay debe aprobar el caso de uso |
| **Vinted** | — | Sin API pública. Sus condiciones no permiten extraer datos automáticamente. Vía posible: un acuerdo o partnership |
| **Wallapop** | — | Sin API pública. Misma situación que Vinted |
| **Google Trends** | Interés de búsqueda por término y país | Público (hay librerías no oficiales) |
| **Datos de los propios usuarios** | Sus ventas y precios (exportación o conexión voluntaria) | Requiere consentimiento (RGPD) |
| **Redes sociales** (por ejemplo, TikTok Creative Center) | Tendencias de hashtags y sonidos | Público, para análisis manual o semiautomático |

> **Importante:** no hagáis *scraping* de Vinted ni de Wallapop. Además de incumplir sus condiciones, os pueden bloquear y supone un riesgo legal para la startup. La vía buena es eBay más un acuerdo con las plataformas.

## 4. Cómo se calcularía el Peak Score (propuesta)

1. **Señales semanales por producto:** nuevos anuncios, ventas, precio medio, tiempo hasta la venta, búsquedas en Google Trends y menciones en redes.
2. **Modelo de series temporales** (por ejemplo, Prophet o un modelo de *gradient boosting* con variables de tendencia) que predice la demanda de las próximas 4 a 8 semanas.
3. **Peak Score (0-100):** cuánto recorrido le queda a la subida antes del pico previsto, ajustado por la saturación (oferta frente a demanda).
4. **Validación:** probar el modelo con casos pasados reales (Labubu, Adidas Samba…) y ver si habría avisado a tiempo.

## 5. Hoja de ruta sugerida

| Fase | Qué | Tecnología orientativa |
|---|---|---|
| 0 · Hoy | Landing de presentación y lista de espera real | GitHub Pages, Formspree o Sheets, GoatCounter |
| 1 · MVP | Servidor con la API de arriba usando datos de eBay y Google Trends | Node.js o Python (FastAPI), base de datos Supabase o PostgreSQL |
| 2 · IA | Primer modelo de Peak Score y validación con casos históricos | Python (pandas, Prophet o scikit-learn) |
| 3 · Producto | Cuentas de usuario, alertas reales y planes de pago | Supabase Auth, notificaciones web push o bot de Telegram, Stripe |
| 4 · Escala | Acuerdos con plataformas y app móvil | Partnerships, React Native o Flutter |

## 6. Fuentes de las cifras reales usadas en la web

Consultadas en noviembre de 2026:
- Vinted, resultados de 2025: ingresos de 1.100 M€ (+38 %) y ventas entre usuarios de 10.800 M€ (+47 %). [FashionUnited, abr. 2026](https://fashionunited.com/news/business/vinted-reaches-1-1-billion-euros-in-revenue-for-2025-accepting-a-strategic-drop-in-profits/2026040971654)
- Wallapop: unos 19 millones de usuarios al mes (España, Italia y Portugal), y hasta 1.112 € al año por usuario. [Bolsamanía / Europa Press, oct. 2025](https://www.bolsamania.com/noticias/ultimas/economia--los-espanoles-pueden-obtener-hasta-1112-euros-al-ano-comprando-y-vendiendo-articulos-usados-segun-wallapop--21106578)
- 7 de cada 10 españoles han comprado de segunda mano. [Observatorio Cetelem, jun. 2025](https://elobservatoriocetelem.es/app/uploads/sites/3/2025/06/ndp_observatorio-cetelem_sostenibilidad-y-consumo-2025.pdf)
- Mercado mundial de ropa de segunda mano: 367.000 M$ previstos para 2029. [ThredUp Resale Report 2025](https://www.businesswire.com/news/home/20250319230685/en/)
- Labubu: de 1.380 ¥ (junio de 2025) a unos 600-700 ¥ (septiembre de 2025). [Shanghai Daily, sep. 2025](https://www.citynewsservice.cn/news/From-boom-to-bust-Labubu-tumbles-on-resale-market-as-hype-fades-ekdqbzom)
- Adidas Samba: hasta 500 $ en reventa en 2022 y hoy con descuento. [Gear Patrol](https://www.gearpatrol.com/?p=858853)
- Vuelta de las cámaras compactas. [PetaPixel, ago. 2024](https://petapixel.com/2024/08/30/manufacturers-were-unprepared-for-the-point-and-shoot-camera-revival)
- Camisetas de fútbol retro (Catawiki). [Catawiki](https://auction.catawiki.com/en/press/1779-experts-predict-euros-to-boost-resale-of-football-shirts)
- Perfil bajo tras la Samba. [Footwear Plus](https://footwearplusmagazine.com/?p=29753)
- Cajas japonesas de cartas. [SNKRDUNK Magazine, abr. 2026](https://snkrdunk.com/en/magazine/2026/04/24/the-30th-anniversary-gold-rush-why-japanese-pokemon-boxes-are-hitting-all-time-highs/) (fuente de un marketplace de reventa: tomadla con cautela)
- APIs de eBay. [eBay Developers](https://developer.ebay.com/api-docs/buy/marketplace-insights/overview.html)
