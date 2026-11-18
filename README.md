# Peakly · Landing page

> **Compra antes del pico.** Landing de Peakly, la herramienta que detecta con IA qué productos de reventa de Vinted, Wallapop y eBay van a alcanzar su pico de demanda.
>
> Proyecto académico · Grado Superior de Marketing y Publicidad. Peakly no está afiliada a Vinted, Wallapop ni eBay. Todos los datos son de ejemplo.

---

## 1. Qué hay en la carpeta

```
peakly/
├─ index.html            Estructura de la página (todas las secciones)
├─ css/
│  ├─ base.css           Colores, tipografía, botones, navbar, piezas comunes
│  ├─ secciones.css      Hero, problema, cómo funciona, precios, FAQ, CTA, footer
│  ├─ demo.css           La demo interactiva
│  └─ presentacion.css   El modo presentación
├─ js/
│  ├─ data.js            ✏️ PRODUCTOS DE EJEMPLO (edítalos aquí)
│  ├─ i18n.js            ✏️ TODOS LOS TEXTOS en español e inglés (edítalos aquí)
│  ├─ config.js          ✏️ LISTA DE ESPERA REAL Y ANALÍTICA (apartado 6)
│  ├─ app.js             Idioma, navbar, animaciones, «Cómo funciona», FAQ
│  ├─ medicion.js        Canal de origen (UTM), analítica y eventos
│  ├─ lista-espera.js    Formulario: validación, consentimiento y envío
│  ├─ demo.js            Demo: filtros, ficha, simulador, alerta, calculadora y tour
│  └─ presentacion.js    Modo presentación (tecla P)
├─ integraciones/
│  └─ google-apps-script.gs   Código para guardar los registros en Google Sheets
├─ assets/favicon.svg    Logo/icono
├─ README.md             Este archivo
└─ GUION.md              Guion de 2 minutos para presentar
```

No hace falta instalar nada: es HTML, CSS y JavaScript puro, sin librerías.

---

## 2. Abrirla en tu ordenador

1. Descarga o copia la carpeta `peakly` entera.
2. Haz **doble clic en `index.html`**. Se abre en tu navegador (mejor Chrome o Edge).

Funciona sin internet. Lo único que necesita conexión son las fuentes (Space Grotesk e Inter); sin internet se usa la fuente del sistema y todo sigue funcionando.

---

## 3. Publicarla gratis en GitHub Pages (paso a paso, sin terminal)

1. Crea una cuenta en **https://github.com** (si no la tienes) e inicia sesión.
2. Arriba a la derecha pulsa **+ → New repository**.
3. En *Repository name* escribe `peakly`. Déjalo en **Public** y pulsa **Create repository**.
4. En la página del repositorio vacío, pulsa el enlace **uploading an existing file**.
5. Abre la carpeta `peakly` en tu ordenador, **selecciona todo su contenido** (`index.html`, las carpetas `css`, `js`, `assets` y los `.md`) y arrástralo a la ventana del navegador.
   - Importante: `index.html` tiene que quedar en la raíz del repositorio, no dentro de otra carpeta.
6. Abajo, pulsa **Commit changes**.
7. Ve a **Settings → Pages** (menú de la izquierda).
8. En *Build and deployment → Source* elige **Deploy from a branch**. En *Branch* elige **main** y **/ (root)**. Pulsa **Save**.
9. Espera 1-2 minutos y recarga la página de *Settings → Pages*. Aparecerá tu enlace:
   **`https://TU-USUARIO.github.io/peakly/`**

¿Has cambiado algo? Vuelve a subir el archivo modificado con **Add file → Upload files** y en un minuto se actualiza la web.

---

## 4. Cómo usar el modo presentación (para proyectar en clase)

| Tecla | Qué hace |
|---|---|
| **P** | Activa / desactiva el modo presentación (o usa el botón «Presentar» abajo a la derecha) |
| **→ ↓ AvPág** | Siguiente sección (en «Cómo funciona» avanza primero por sus 3 pasos) |
| **← ↑ RePág** | Sección anterior |
| **Espacio** | En la demo: lanza (o para) la demo guiada. En el resto: siguiente sección |
| **Inicio / Fin** | Primera / última sección |
| **Esc** | Salir |

Consejos para el día de la presentación:
- Pon el navegador a pantalla completa con **F11** antes de pulsar **P**.
- Abajo verás la barra de progreso (por ejemplo **4/8 · Demo interactiva**).
- La demo guiada dura unos 15 segundos y sola: elige el producto, avanza el tiempo, enseña qué pasa si llegas tarde y activa la alerta en el móvil. Si tocas la demo mientras se reproduce, se para.
- El idioma se cambia con **ES / EN** en la barra de arriba y se recuerda para la próxima vez.

---

## 5. Cambios rápidos

- **Nombres del equipo:** en `index.html`, busca `CAMBIA AQUÍ LOS NOMBRES DEL EQUIPO` (ahora pone «Izan · Samu»).
- **Textos:** en `js/i18n.js`. Cada texto está en español (`es`) y en inglés (`en`); cambia los dos.
- **Productos de la demo:** en `js/data.js`. Copia una línea de producto, cambia el `id` (sin espacios) y sus datos. La lista, los filtros y los gráficos se actualizan solos.
- **Colores:** en `css/base.css`, apartado *1. Variables*. Cambiando `--green` cambia el acento de toda la web.

---

## 6. Lista de espera real y medición por canal

Por defecto la web está en **modo demo**: el formulario funciona pero no guarda nada (y lo dice al apuntarse). Para recoger emails de verdad y saber **de qué canal viene cada persona**, rellena `js/config.js` siguiendo una de estas dos opciones. Las cuentas son vuestras: créalas con el email del grupo.

### Opción A · Formspree (la más rápida, sin código)
1. Crea una cuenta gratis en **https://formspree.io**.
2. Pulsa **New form**, llámalo «Peakly · lista de espera» y créalo.
3. Copia la URL del formulario (tipo `https://formspree.io/f/abcdwxyz`).
4. En `js/config.js` pon:
   ```js
   servicio: "formspree",
   url: "https://formspree.io/f/abcdwxyz"
   ```
5. Sube el cambio a GitHub y haz un registro de prueba. La primera vez, Formspree puede pedirte que confirmes tu email.

Cada registro aparece en tu panel de Formspree con los campos `utm_source`, `utm_medium`, `utm_campaign` e `idioma`. El plan gratuito tiene un límite mensual de envíos: de sobra para el proyecto.

### Opción B · Google Sheets (gratis, ideal para analizar por canal)
1. Crea una hoja de cálculo nueva en **Google Sheets** (por ejemplo, «Peakly · registros»).
2. Menú **Extensiones → Apps Script**. Borra el código que aparece y pega **todo** el archivo `integraciones/google-apps-script.gs`. Guarda.
3. Pulsa **Implementar → Nueva implementación**. En el engranaje elige **Aplicación web**.
   - *Ejecutar como:* **Yo**
   - *Quién tiene acceso:* **Cualquier usuario**
4. Pulsa **Implementar**, autoriza los permisos con tu cuenta de Google y copia la **URL de la aplicación web** (acaba en `/exec`).
5. En `js/config.js` pon:
   ```js
   servicio: "googleSheets",
   url: "https://script.google.com/macros/s/AKfy.../exec"
   ```
6. Sube el cambio y haz un registro de prueba: aparecerá una pestaña **Registros** con fecha, email, canal, medio, campaña e idioma.

Si algún día cambias el código de Apps Script, ve a **Implementar → Gestionar implementaciones → Editar → Nueva versión**, o seguirá funcionando la versión antigua.

**Registros por canal en 1 minuto:** en la hoja, *Insertar → Tabla dinámica* → Filas: **Canal (utm_source)** → Valores: **Email** (resumir por *COUNTA*). Después, *Insertar → Gráfico*.

### Analítica de visitas sin cookies · GoatCounter (opcional)
1. Crea una cuenta gratis en **https://www.goatcounter.com** (gratis para proyectos no comerciales). Elige un código, por ejemplo `peakly-clase`.
2. En `js/config.js` pon: `goatcounter: "https://peakly-clase.goatcounter.com/count"`.
3. Publica y entra en tu panel `https://peakly-clase.goatcounter.com`.

Verás las **visitas**, de qué **web o campaña** vienen y estos **eventos** (clics):

| Evento | Qué mide |
|---|---|
| `cta/hero-lista`, `cta/navbar-lista`, `cta/hero-demo` | Qué botón de llamada a la acción funciona mejor |
| `plan/gratis`, `plan/pro`, `plan/business` | Interés por cada plan de precios |
| `demo/tour`, `demo/alerta` | Cuánta gente juega con la demo |
| `lista-registro/tiktok`, `lista-registro/instagram`… | **Registros por canal** |
| `idioma/en` | Cuánta gente cambia a inglés |

GoatCounter no usa cookies, así que no hace falta banner de cookies. Las visitas desde tu propio ordenador (localhost) normalmente no se cuentan: pruébalo con la web ya publicada. Para ver cada evento en la consola del navegador mientras pruebas, pon `debug: true` en `config.js`.

### Enlaces etiquetados por canal (UTM)
Usa un enlace distinto en cada canal; así sabrás cuál trae más registros. Cambia `TU-USUARIO` por tu usuario de GitHub:

| Canal | Enlace |
|---|---|
| TikTok (bio y vídeos) | `https://TU-USUARIO.github.io/peakly/?utm_source=tiktok&utm_medium=social&utm_campaign=lanzamiento` |
| Instagram (bio y stories) | `https://TU-USUARIO.github.io/peakly/?utm_source=instagram&utm_medium=social&utm_campaign=lanzamiento` |
| Creadores de contenido | `https://TU-USUARIO.github.io/peakly/?utm_source=creadores&utm_medium=colaboracion&utm_campaign=lanzamiento&utm_content=NOMBRE-CREADOR` |
| Discord / Telegram | `https://TU-USUARIO.github.io/peakly/?utm_source=discord&utm_medium=comunidad&utm_campaign=lanzamiento` |
| Newsletter | `https://TU-USUARIO.github.io/peakly/?utm_source=newsletter&utm_medium=email&utm_campaign=lanzamiento` |
| QR en la presentación | `https://TU-USUARIO.github.io/peakly/?utm_source=clase&utm_medium=qr&utm_campaign=presentacion` |

Para el QR de clase, pega el último enlace en cualquier generador de códigos QR y ponlo en tu última diapositiva.

### KPIs para comentar en clase
- **Visitas por canal** (GoatCounter).
- **Registros por canal** (tabla dinámica de Sheets o eventos `lista-registro/…`).
- **Tasa de conversión** = registros ÷ visitas × 100, por canal. Así sabréis qué canal merece más inversión.
- **CTA ganadora**: compara los clics de `cta/hero-lista` y `cta/navbar-lista`.

### Privacidad (RGPD)
- El formulario pide **consentimiento expreso** (casilla obligatoria) y solo guarda email, canal e idioma.
- Lleva un **campo trampa** invisible contra robots de spam.
- Borrad la hoja o el formulario al terminar el curso, tal como promete la web.
- Para un proyecto de clase es suficiente; una empresa real necesitaría además una política de privacidad completa.

---

## 7. Accesibilidad y rendimiento

- Navegable con teclado y con foco visible. Se puede saltar al contenido (enlace oculto al pulsar Tab).
- Contraste de texto AA o superior sobre el fondo azul marino.
- Respeta «reducir movimiento» del sistema (Windows: *Configuración → Accesibilidad → Efectos visuales → Efectos de animación*).
- Las animaciones solo usan `transform` y `opacity` (y el trazo de los gráficos SVG).
- Sin librerías y sin scraping: la demo funciona con datos simulados. Las únicas conexiones externas son las que actives en `config.js` (Formspree o Google Sheets, y GoatCounter).
- En modo demo el formulario **no envía ni guarda ningún email**.

---

## 8. Checklist revisada

- [x] Sin errores en la consola.
- [x] La demo responde a todos los clics: filtros, buscador, productos, simulador, alerta, calculadora y demo guiada.
- [x] Se ve bien en móvil (375 px), portátil (1440 px) y proyector (1920 px), sin scroll horizontal.
- [x] Modo presentación: P, flechas, pasos de «Cómo funciona», Espacio en la demo y Esc.
- [x] Español e inglés completos (las dos versiones tienen las mismas claves).
- [x] Lista de espera probada con un servidor de pruebas: modo demo, envío tipo Formspree, envío tipo Google Sheets, error del servidor (mensaje y reintento), consentimiento obligatorio y campo trampa.
- [x] El canal (UTM) se guarda al llegar, se mantiene al recargar y se limpia si el enlace trae caracteres extraños.
- [ ] Pendiente de probar por vosotros: el envío real a vuestra cuenta de Formspree o Google Sheets y el panel de GoatCounter (necesitan vuestras cuentas).
