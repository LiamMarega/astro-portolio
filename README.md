# Sunny Portfolio — landing en Astro

Tres páginas con la misma estética:

| Página | Qué es |
| --- | --- |
| `/` | El portfolio (réplica de la landing del video). |
| `/contact` | Formulario de contacto paso a paso. Todos los botones de contacto del portfolio llevan acá. |
| `/ecommerce` | Página de venta para conseguir marcas que necesitan una tienda online, con su propio formulario al final. |

Réplica de la landing del video: mismo layout, colores, tipografías, tamaños y animaciones, calibrada cuadro por cuadro contra la grabación (a 1466 px de ancho, 1 px del video ≈ 1 px CSS). La identidad del diseñador original (nombre, fotos, bio, clientes y proyectos) **no** está incluida: todo el contenido es de relleno, ficticio y original, con la misma estructura y largo, listo para que lo reemplaces por el tuyo.

## Arrancar

Necesitás Node 22.23 o superior (lo pide Astro 7).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera /dist (sitio 100 % estático)
npm run preview   # sirve /dist para probar el build
```

Para publicar, cualquier hosting estático sirve (Vercel, Netlify, Cloudflare Pages, GitHub Pages): comando de build `npm run build`, carpeta de salida `dist`. Antes de publicar, cambiá `site` en `astro.config.mjs` y `url` en `src/content/site.ts` por tu dominio real (se usan para la URL canónica y las tarjetas de Open Graph).

## Dónde se edita cada cosa

**Todo el contenido vive en un solo archivo: `src/content/site.ts`.**

| Qué | Dónde |
| --- | --- |
| Nombre gigante, título, descripción, email, idioma | `site` (arriba de todo) |
| Frase del hero, nota y título de Work | `site.hero`, `site.work` |
| Textos de Story, chips del dibujo (branding, interface…) | `site.story` |
| Título y nota de la galería | `site.gallery` |
| Nota del botón y texto del botón Connect | `site.chat` |
| Redes sociales (link y etiqueta que aparece al pasar el mouse) | `site.socials` |
| Proyectos: tarjeta, imágenes, colores, logo, case study, íconos | `projects` |
| Polaroids (foto, epígrafe y los dos garabatos de cada una) | `polaroids` |
| Fichas de la galería: posición en desktop (`cx`, `cy`, `width`, `rotate`) y en celular (`m`) | `tiles` |
| Página `/contact`: textos, pasos y preguntas del formulario | `site.contact` y `contactForm` |
| A dónde se envían los formularios | `site.leadEndpoint` |
| **Toda la página `/ecommerce`** (textos, casos, precios, preguntas del formulario) | **`src/content/ecommerce.ts`** |

Las imágenes están en `public/img` (`work/`, `gallery/`, `story/`). Podés pisarlas con archivos del mismo nombre o apuntar las rutas de `site.ts` a archivos nuevos (WebP, JPG, PNG o SVG). La imagen para compartir en redes es `public/og.png` y el ícono es `public/favicon.svg`.

## Formularios de contacto

Hay dos: el de `/contact` (en inglés, como el resto del portfolio) y el del final de `/ecommerce` (en español). Son el mismo componente (`src/components/LeadForm.astro` + `src/scripts/leadform.ts`) con preguntas distintas, y todo lo que dicen se edita en el archivo de contenido de cada página.

- **Paso a paso**, con barra de progreso. Cada paso se valida antes de avanzar (campos obligatorios, email y link), los errores aparecen debajo de cada campo y el foco va al primero que falta.
- Las opciones son radios y checkboxes de verdad: funcionan con teclado y con lector de pantalla. Si un paso tiene una sola pregunta de opción única, al tocarla avanza solo.
- **Borrador**: si la persona recarga o vuelve atrás, lo que escribió sigue ahí (solo durante esa visita).
- **Campos ocultos** que viajan con el lead: en `/ecommerce`, el plan que eligió en los precios (aparece como una etiqueta arriba del formulario) y los problemas que marcó en "¿Te suena alguna?".
- **Cada lead lleva**: página, referrer, parámetros `utm_*`/`gclid`/`fbclid` de la visita, zona horaria y cuántos segundos tardó.
- **Anti-spam** sin captcha: un campo trampa invisible (`company_site`); si viene lleno, se descarta en silencio.
- **Al enviarse** se dispara `window` → `lead:submitted` (con todo el payload) y, si existen en la página, `dataLayer.push({ event: 'generate_lead' })`, `gtag('event', 'generate_lead')`, `fbq('track', 'Lead')` y `ttq.track('SubmitForm')`. O sea: si instalás el píxel de Meta o Google Tag Manager, la conversión ya queda medida.

**Mientras no haya endpoint** (`site.leadEndpoint` vacío):

- En `npm run dev` y `npm run preview` (localhost) el envío se simula: ves el estado "enviando" y la pantalla de éxito, y el payload completo sale en la consola del navegador. Agregá `?lf-fail` a la URL para ver la pantalla de error.
- En un dominio real muestra la pantalla de error con un botón que abre el mail de la persona **con todas sus respuestas ya escritas**. Así, si publicás antes de conectar Resend, no perdés leads.

El payload que recibe el endpoint (JSON):

```json
{
  "source": "ecommerce",
  "lang": "es",
  "name": "Ana Pérez",
  "email": "ana@marca.com",
  "answers": [
    { "name": "plan", "label": "Plan elegido", "value": "Crecimiento" },
    { "name": "need", "label": "Qué necesita", "value": "Una tienda nueva desde cero" }
  ],
  "meta": { "page": "/ecommerce/", "url": "…", "referrer": "…", "utm": { "utm_source": "meta" }, "submittedAt": "…", "timeZone": "…", "secondsOnForm": 48 },
  "company_site": ""
}
```

## Conectar Resend

El endpoint ya está escrito en `src/pages/api/_contact.ts`, apagado (el `_` hace que Astro lo ignore, porque hoy el sitio es 100 % estático). Valida los datos, frena bots y abusos, arma un email prolijo con todas las respuestas y lo manda por la API de Resend con `reply_to` = el email del cliente (le respondés directo desde tu bandeja). Para prenderlo:

1. Agregá un adapter de servidor: `npx astro add vercel` (o `netlify`, `node`, `cloudflare`). El resto de las páginas sigue siendo estático.
2. Renombrá `src/pages/api/_contact.ts` a `src/pages/api/contact.ts`.
3. Cargá las variables de `.env.example` en tu hosting (o en un `.env` para probar local): `RESEND_API_KEY`, `LEADS_TO` (tu email) y `LEADS_FROM` (un remitente de un dominio verificado en Resend).
4. En `src/content/site.ts` poné `leadEndpoint: '/api/contact'`.

Respuestas del endpoint: `200 {ok:true}`, `422` datos inválidos, `429` demasiados envíos, `500` faltan variables, `502` Resend no aceptó el email. Cualquier cosa que no sea 2xx hace que el formulario muestre el plan B (mail con las respuestas).

## Página `/ecommerce`

Es una página de venta pensada como embudo: cada bloque responde la duda que aparece justo después del anterior.

1. **Inicio**: la promesa ("Una tienda a tu medida que *vende.*", con stickers en cada letra), el botón 3D y una tienda de ejemplo con pedidos que van llegando.
2. **Números** de credibilidad.
3. **¿Te suena alguna?**: problemas que la persona toca; los que marca viajan en el lead.
4. **Método** (el "mapa de compra"): por qué funciona.
5. **Casos** con resultados + llamado a la acción.
6. **Testimonios**.
7. **Qué incluye** la tienda.
8. **Proceso** con plazos.
9. **Quién está del otro lado**.
10. **Comparación** con plantilla y agencia.
11. **Planes** (cada botón preselecciona el plan en el formulario).
12. **Garantía**.
13. **Preguntas frecuentes**.
14. **Cierre + formulario**.

En el celular aparece una barra fija con el botón de propuesta después del inicio, y se esconde cuando llegás al formulario.

**Antes de publicar**, buscá en `src/content/ecommerce.ts`:

- `[RELLENO]`: números, casos, testimonios y pedidos de ejemplo. Cambialos por los tuyos o borralos. Nunca publiques resultados que no son reales.
- `[CONFIRMAR]`: cupos, precios, plazos, formas de pago y la garantía. Dejalos solo si los vas a cumplir.
- `pricing.showPrices: false` cambia los precios por "Cotización en 48 h".
- `hero.availability: ''` esconde el aviso de cupos.
- Los textos usan "tú" (español neutro). Pasarlos a "vos" es editar solo ese archivo.

Las imágenes de los casos y la tienda del inicio están en `public/img/ecommerce/` (son de ejemplo, como las del portfolio) y la imagen para compartir es `public/og-ecommerce.png`. Para regenerarlas: `node tools/studio/build.mjs ecommerce` y `python3 tools/studio/render.py ecommerce/ og-ecommerce` (si no tenés el Chromium de Playwright, `CHROME=/ruta/a/chrome python3 tools/studio/render.py …`).

## Stack

- **Astro 7** con HTML estático y estilos con scope por componente.
- **TypeScript vanilla** para las interacciones (≈ 9 KB gzip). No hay React en el cliente: ninguno de los efectos de los componentes de React Bits aparece en el video, así que sumarlos solo agregaba peso.
- **Lenis** para el scroll suave.
- **Fuentes** (Fontsource, se descarga solo el subset que la página usa): Inter Variable (eje óptico, como Inter Display), Caveat (letra manuscrita) y Modak (stickers de burbuja).
- **lucide-static** para los íconos de los case studies (se incrustan como SVG en el build).

```
src/
  content/site.ts       ← contenido del portfolio y de /contact
  content/ecommerce.ts  ← todo el contenido de /ecommerce
  layouts/Base.astro    ← <head>, fuentes, meta tags
  pages/index.astro     ← el portfolio
  pages/contact.astro   ← formulario de contacto
  pages/ecommerce.astro ← página de venta
  pages/api/_contact.ts ← endpoint de Resend (apagado hasta que lo conectes)
  components/           ← Sky, TopBlur, Nav, Hero, Work, ProjectCard, CaseStudy, Story, Polaroids,
                          TagsArt, Gallery, Chat, ContactBar, LeadForm, Keycap, StickerWord,
                          Doodle, Sticker, Logo
  components/eco/       ← los bloques de /ecommerce
  lib/                  ← garabatos (doodles.ts), tipos del formulario (forms.ts), stickers
  scripts/              ← una pieza de JS por sección; main.ts, contact.ts y ecommerce.ts arman cada página
  styles/global.css     ← tokens de diseño (colores, radios, easing) y utilidades
  styles/ecommerce.css  ← títulos, botones y secciones de /ecommerce
tools/studio/           ← generador de las imágenes de relleno (opcional)
```

## Animaciones e interacciones

- **Amanecer al cargar**: noche → alba → cielo amarillo. El sol del menú lo vuelve a reproducir.
- **Nombre gigante** que ocupa todo el ancho, con un sticker distinto por letra al pasar el mouse (al tocar en celular).
- Títulos que se "entintan" y bloques que aparecen al hacer scroll.
- **Garabatos** que se dibujan solos (guirnalda de Work, flechas, polaroids, botón Connect).
- **Tarjetas de proyecto** con imágenes que se levantan al pasar el mouse; al hacer clic se abre el **case study** en una hoja que queda fija bajo el menú (URL `#work/slug`, botón atrás del navegador y tecla Escape para cerrar).
- **Polaroids** en carrusel automático, con sus garabatos.
- Dibujo de **chips** que se desarma y se vuelve a armar en loop.
- **Galería** tipo tablero: cada ficha tiene su propio parallax y se puede arrastrar; las pantallas de los teléfonos y el titular cambian solos.
- **Botón Connect** 3D tipo tecla: al pasar el mouse se enciende en amarillo con su resplandor y aparecen los trazos.
- **Íconos sociales** que saltan y muestran su etiqueta.

Con "reducir movimiento" activado en el sistema, todo se muestra quieto y legible.

## Responsive

Calibrado contra el video en desktop y adaptado a tablet y celular: el nombre se ajusta al ancho, las tarjetas y el bento pasan a una columna, la galería usa un tablero más alto con su propia distribución (campo `m` de cada ficha) y el botón y la barra de contacto se reacomodan. No hay scroll horizontal en ningún ancho.

## Regenerar las imágenes de relleno (opcional)

Las mockups, fotos de polaroids y piezas de la galería son ilustraciones originales armadas en HTML/CSS y exportadas a WebP. Para modificarlas necesitás además Python 3 con `playwright` y `pillow`:

```bash
pip install playwright pillow && python -m playwright install chromium
node tools/studio/build.mjs              # arma tools/studio/studio.html (o: work | gallery | story | og)
python3 tools/studio/render.py           # exporta todo a public/img (o un prefijo: work/spark, gallery/…)
```

Las fuentes de `tools/studio/fonts` son de licencia SIL Open Font License 1.1 (Inter, Caveat Brush, Modak, Instrument Serif).
