# LiamDev — portfolio de Liam Marega (Astro)

Landing personal de Liam Marega (@liammdev), developer frontend y mobile. Mantiene la estética y las animaciones de la referencia (amanecer al cargar, nombre gigante con stickers, tarjetas de proyecto, bento, galería tipo tablero y botón 3D), con contenido 100 % real: proyectos, métricas, stack, links y contacto de Liam. Está en **español** (`/`) e **inglés** (`/en/`).

## Arrancar

Necesitás Node 22.23 o superior (lo pide Astro 7).

```bash
npm install
npm run dev       # http://localhost:4321  (inglés en /en/)
npm run build     # genera /dist, sitio 100 % estático
npm run preview   # sirve /dist para probar el build
```

Para publicar sirve cualquier hosting estático (Vercel, Netlify, Cloudflare Pages): comando `npm run build`, carpeta `dist`. El dominio está configurado como `https://www.liammarega.com` en `astro.config.mjs` (`site`) y en `src/content/site.ts` (`url`); se usa para la URL canónica, los `hreflang` y la tarjeta de Open Graph.

## Dónde se edita cada cosa

**Todo el contenido vive en un solo archivo: `src/content/site.ts`.** Cada texto bilingüe se escribe una sola vez con `t('español', 'english')`; si un texto es igual en los dos idiomas alcanza con `t('texto')`.

| Qué | Dónde |
| --- | --- |
| Nombre, rol, descripción, email, ubicación, menú y textos de la interfaz | `siteData` |
| Frase del hero, títulos de Proyectos e Historia, bio, misión, chips, stickers despegables | `siteData.hero`, `.work`, `.story` |
| Métricas de impacto y stack por grupos | `siteData.impact`, `siteData.stack` |
| Galería, nota del botón, texto del botón y link a Landing PRO | `siteData.gallery`, `siteData.chat` |
| Redes (Instagram, YouTube, GitHub, LinkedIn) | `siteData.socials` |
| Proyectos: tarjeta, badge, colores, métricas, stack o palabras clave, funcionalidades, links, imágenes y videos | `projectData` |
| Polaroids de la rueda (foto, epígrafe y, si querés, `case` para que abran ese proyecto) | `polaroidData` |
| Piezas de la galería (imagen o clip en loop, título y subtítulo que aparecen al abrirlas) | `sheetData` |
| Logos de los proyectos y de las redes (SVG reales) | `src/lib/brand-svgs.mjs` y `src/lib/logos.ts` |

Para poner una foto tuya en una polaroid, copiala a `public/img/story/` (cuadrada, ~480 px) y cambiá el `src` de esa polaroid en `polaroidData`.

Imágenes en `public/img` (`work/`, `gallery/`, `story/`, `stickers/`, `logos/`), videos en `public/media` (MP4 H.264 sin audio + póster WebP; los clips de la galería están en `public/media/gallery`), imagen para redes en `public/og.jpg` e ícono en `public/favicon.svg`.

## Stack

- **Astro 7**, HTML estático, estilos con scope por componente y ruteo i18n (`es` por defecto sin prefijo, `en` en `/en/`).
- **TypeScript vanilla** para las interacciones; no hay React en el cliente.
- **Lenis** para el scroll suave.
- **Fuentes** de Fontsource: Inter Variable (eje óptico), Caveat (manuscrita) y Modak (stickers burbuja).
- **lucide-static** para los íconos (se incrustan como SVG en el build).
- **React Bits, portados a JS liviano** (sin React, GSAP, Motion ni three.js), cada uno se descarga recién cuando su sección está por aparecer:
  - **StickerPeel** → `src/scripts/peel.ts` (WebGL): los stickers despegables.
  - **ContactSheet** → `src/scripts/sheet.ts` (WebGL 2): la galería. Mismos shaders y física; además acepta videos como texturas y respeta la proporción de cada pieza.
  - **RotatingCards** → `initRing()` en `src/scripts/story.ts` (CSS + rAF): la rueda de polaroids.
- **View Transitions** nativas: entre ES y EN (cross-document) y al abrir un proyecto (same-document).

```
src/
  content/site.ts        ← todo el contenido (ES + EN)
  layouts/Base.astro     ← <head>, fuentes, SEO (canonical, hreflang, Open Graph, JSON-LD)
  pages/index.astro      ← español
  pages/en/index.astro   ← inglés
  components/            ← Page, Sky, TopBlur, Nav, Hero, Work, ProjectCard, Brand, VideoFrame, CaseStudy,
                           Story, Polaroids (rueda), TagsArt, Gallery (contact sheet), Chat, Doodle, Sticker
  lib/                   ← trazos de los garabatos, íconos y logos reales (brand-svgs.mjs, logos.ts)
  scripts/               ← una pieza de JS por sección + peel.ts (stickers), sheet.ts (galería) y media.ts (videos)
  styles/global.css      ← tokens de diseño y utilidades
tools/studio/            ← generador de mockups e imágenes (ver abajo)
```

## Animaciones e interacciones

- **Amanecer al cargar** (el sol del menú lo repite) y **nombre gigante** con un sticker por letra al pasar el mouse.
- **Scroll stack** en Proyectos: cada tarjeta queda fija bajo el menú y la siguiente se apila encima; las de atrás se achican y oscurecen un poco.
- **Case study** en una hoja fija (URL `#work/slug`, botón atrás y Escape para cerrar) con métricas, stack, funcionalidades, links en vivo y videos. Al abrirlo, la tarjeta crece hasta convertirse en la hoja y el logo y el título vuelan al encabezado (al cerrar hacen el camino inverso; desde una polaroid, la polaroid se expande). "Siguiente proyecto" hace crecer su logo hasta el encabezado nuevo.
- **Videos** que se reproducen solo mientras se ven; el video y su póster se descargan recién cuando están cerca.
- **Stickers despegables** (WebGL) en las tarjetas de Historia: Argentina, Guita, 60K+ y Ship it.
- **Rueda de polaroids**: 16 fotos de proyectos, logos y momentos girando en un arco; se frena al pasar el mouse, se puede arrastrar con inercia y las polaroids de proyectos abren su case study.
- **Números de impacto** que cuentan hacia arriba, garabatos que se dibujan solos, polaroids en carrusel y chips que se desarman y se vuelven a armar.
- **Galería tipo contact sheet**: mockups y clips en loop (celulares que cambian de pantalla, el hero del alien, HoloContent, Lucero, el stack en stickers…) salen del centro y se "revelan" como fotos; se frenan bajo el mouse, se arrastran para girarlas y al hacer clic se abren grandes con su título. Los videos solo se reproducen mientras se ven. Sin WebGL 2 se muestra un collage estático.
- **Botón Hablemos** 3D tipo tecla, link a Landing PRO e íconos sociales reales (Instagram, YouTube, GitHub, LinkedIn) que saltan.
- **Cambio de idioma** con transición entre páginas: el menú queda fijo y el resto funde, sin repetir el amanecer.

Con "reducir movimiento" activado en el sistema, todo se muestra quieto y legible.

## Responsive

Probado en 360, 390, 414, 768, 820, 1024, 1280, 1466, 1920 y 2560 px de ancho: el nombre se ajusta al ancho, las tarjetas y el bento pasan a una columna, la rueda de polaroids y la galería ajustan su tamaño (la galería nunca es más alta que la pantalla) y el botón y la barra de contacto se reacomodan. En celular la rueda y la galería se arrastran de costado sin trabar el scroll vertical. No hay scroll horizontal en ningún ancho.

## Mockups e imágenes (`tools/studio`)

Todas las mockups (celulares, navegadores, notebook, polaroids, stickers y la imagen para redes) se arman en HTML/CSS a partir de capturas reales y se exportan a WebP al doble de resolución. Los celulares usan pantallas completas de 393 × 852 pt (`tools/studio/screens.mjs`), así la captura llena la pantalla de borde a borde. Las landings capturadas en un viewport más bajo que un teléfono (Lucero y HoloContent) se muestran con el celular saliendo del cuadro, para que nunca quede un espacio vacío.

Privacidad: antes de componer nada, `prep_sources.py` desenfoca los montos de ingresos del CRM y una fila de Guita con datos de otra persona, saca el cursor del mouse de los cuadros de ClientiX y la etiqueta del dock de la captura de Mendo.

Los clips de la galería (`tools/studio/clips.mjs`) son mesas de trabajo animadas con CSS: `record.py` las graba cuadro por cuadro y las codifica en MP4 con ffmpeg (4 s en loop), y además arma versiones livianas de tus grabaciones (No Cool Hats, SwipeLoop, ClientiX).

Para regenerarlas necesitás Python 3 con `playwright` y `pillow`, y `ffmpeg`:

```bash
pip install playwright pillow && python -m playwright install chromium
python3 tools/studio/prep_sources.py   # capturas originales → tools/studio/src (ya vienen incluidas, redactadas)
node tools/studio/build.mjs            # arma tools/studio/studio.html con todas las mesas de trabajo
python3 tools/studio/render.py         # imágenes fijas → public/img (o un prefijo: work/guita, story/…)
python3 tools/studio/record.py         # clips → public/media/gallery (o un nombre: phones, holo…)
```

`prep_sources.py` lee las capturas desde `/mnt/user-data/uploads`: si querés regenerar las fuentes, cambiá `UP` por tu carpeta. Las licencias de las fuentes del estudio están en `tools/studio/fonts/LICENSES.md`.

Los videos de `public/media` son tus grabaciones recortadas y comprimidas (H.264, sin audio, en loop). Para sumar uno nuevo:

```bash
ffmpeg -i grabacion.mov -an -vf "scale=1280:-2,fps=30" -c:v libx264 -preset veryfast -crf 26 -pix_fmt yuv420p -movflags +faststart public/media/nuevo.mp4
ffmpeg -i public/media/nuevo.mp4 -frames:v 1 -c:v libwebp -quality 80 public/media/nuevo.webp   # póster
```
