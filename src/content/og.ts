import { useContent, type Locale } from './site';
import { useEcommerce } from './ecommerce';
import { useContact } from './contact';
import { ARTICULOS } from '../data/articulos';
import { homeSeo, legacySeo, stripBrand, abs } from './seo';
import { getLinktreeCopy } from '../i18n/linktree';

/**
 * ─────────────────────────────────────────────────────────────────────
 *  OG / Twitter share cards: one registry for every route.
 *
 *  src/pages/og/[id].jpg.ts renders each entry below to /og/<id>.jpg at build time (1200x630, no runtime cost)
 *  and the layouts point og:image / twitter:image at it through ogImageFor(Astro.url.pathname).
 *
 *  ADD A ROUTE = ONE LINE in OG_ROUTES:  '/new-page/': { lang: 'es', theme: 'paper', eyebrow: '…', title: '…' }
 *  The key is the page pathname with trailing slash; the file id is derived from it (see ogId).
 *  A path that is not registered falls back to the home card of its language, so a page never gets a 404 image.
 *
 *  Titles, eyebrows and meta lines come from the page data (site.ts, ecommerce.ts, contact.ts, articulos.ts,
 *  seo.ts). Cards carry no claims: no prices, ratings, years or client counts.
 * ─────────────────────────────────────────────────────────────────────
 */

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
export const OG_TYPE = 'image/jpeg';

/**
 * portfolio: yellow sunrise + giant wordmark · ecommerce: sunrise + device frames with real screenshots
 * contact: friendly hand-written accent · paper: Landing PRO paper/serif/marker (funnel + articles)
 * legal: calmer paper variant (legal pages)
 * newspaper / gallery / hub: the preserved legacy pages, each with its own original look (neon on black, #121212 + Bebas Neue,
 * black-to-violet hub background)
 */
export type OgTheme = 'portfolio' | 'ecommerce' | 'contact' | 'paper' | 'legal' | 'newspaper' | 'gallery' | 'hub';

export interface OgEntry {
  lang: Locale;
  theme: OgTheme;
  /** Small label above the title (rendered upper-case on the paper themes). */
  eyebrow: string;
  title: string;
  /** Second line: role (portfolio), hand-written note (contact, paper). */
  subtitle?: string;
  /** Trailing words of the title drawn with the yellow marker (paper theme only). */
  mark?: string;
  /** Meta line under the title (article category, reading time…). */
  meta?: string;
  /** Screenshot / photo from /public used by the theme (ecommerce laptop, contact portrait…). */
  image?: string;
  /** og:image:alt. Defaults to "<title> · LiamDev". */
  alt?: string;
}

const L = (lang: Locale, es: string, en: string) => (lang === 'es' ? es : en);

/** Card id (file name without extension) of a page path: '/' → home, '/en/contact/' → en--contact. */
export function ogId(pathname: string): string {
  const slug = pathname.replace(/^\/+|\/+$/g, '').replace(/\//g, '--');
  return slug || 'home';
}

const home = (lang: Locale): OgEntry => {
  const { site } = useContent(lang);
  return {
    lang,
    theme: 'portfolio',
    eyebrow: site.available,
    title: site.name,
    // same role the <title> uses (src/content/seo.ts)
    subtitle: homeSeo[lang].title.split(' — ')[1],
    meta: 'Flutter · React · Next.js · Supabase',
    image: '/images/uploads/liam.jpg',
    alt: `${site.name} (${site.brand}) — ${homeSeo[lang].title.split(' — ')[1]}`,
  };
};

const ecommerce = (lang: Locale): OgEntry => {
  const { site } = useContent(lang);
  const e = useEcommerce(lang);
  return {
    lang,
    theme: 'ecommerce',
    eyebrow: `${site.brand} · ${site.name}`,
    title: stripBrand(e.meta.title),
    meta: e.hero.trust[0],
    image: '/img/ecommerce/mendohome-site.webp',
    alt: `${stripBrand(e.meta.title)} — ${site.brand}`,
  };
};

const contact = (lang: Locale): OgEntry => {
  const { site } = useContent(lang);
  const c = useContact(lang);
  return {
    lang,
    theme: 'contact',
    eyebrow: `${site.brand} · ${site.name}`,
    title: L(lang, 'Contame tu proyecto', 'Tell me about your project'),
    subtitle: c.note,
    image: '/images/uploads/liam.jpg',
  };
};

const PAPER = 'Landing PRO';

/** Hub cards (/linktree/, /en/linktree/): copy comes from the hub's own dictionary (src/i18n/linktree.ts). */
const hub = (lang: Locale): OgEntry => {
  const t = getLinktreeCopy(lang);
  const { site } = useContent(lang);
  return {
    lang,
    theme: 'hub',
    eyebrow: t.hero.availability,
    title: site.name,
    subtitle: t.hero.tagline.split(' — ')[0],
    meta: [t.paths.company.cta, t.paths.client.cta, t.builder.title, t.socials.title].join(' · '),
    image: '/images/avatar.webp',
    alt: t.meta.title,
  };
};

/** Article cards: one per entry of src/data/articulos.ts. */
const articles = Object.fromEntries(
  ARTICULOS.map((a): [string, OgEntry] => [
    `/landing-builder/articulos/${a.slug}/`,
    {
      lang: 'es',
      theme: 'paper',
      eyebrow: `${PAPER} · Artículo`,
      title: a.title,
      meta: `${a.category} · ${a.reading} min de lectura`,
      image: '/images/uploads/liam.jpg',
      alt: `${a.title} — LiamDev`,
    },
  ]),
);

export const OG_ROUTES: Record<string, OgEntry> = {
  '/': home('es'),
  '/en/': home('en'),
  '/ecommerce/': ecommerce('es'),
  '/en/ecommerce/': ecommerce('en'),
  '/contact/': contact('es'),
  '/en/contact/': contact('en'),

  // Landing PRO funnel (hero copy of /landing-builder, same headline the old share card used)
  '/landing-builder/': {
    lang: 'es',
    theme: 'paper',
    eyebrow: `${PAPER} · LiamDev`,
    title: 'Páginas web que convierten visitas en',
    mark: 'clientes reales.',
    subtitle: 'Más que una página linda, una que trae clientes.',
    image: '/images/uploads/liam.jpg',
    alt: 'LiamDev: landing pages que convierten',
  },
  '/landing-builder/articulos/': {
    lang: 'es',
    theme: 'paper',
    eyebrow: `${PAPER} · Artículos`,
    title: 'Artículos sobre landing pages y conversión',
    meta: `${ARTICULOS.length} guías de LiamDev`,
    image: '/images/uploads/liam.jpg',
  },
  ...articles,

  // preserved legacy pages (original design): LIAM TIMES, project gallery and the links hub
  '/newspaper/': {
    lang: 'es',
    theme: 'newspaper',
    eyebrow: 'liammarega.com/newspaper',
    title: 'LIAM_TIMES',
    subtitle: legacySeo.newspaper.title.split(' — ')[1],
    meta: 'Frontend — Tecnología — Diseño digital — Estrategia',
    alt: legacySeo.newspaper.title,
  },
  '/gallery/': {
    lang: 'en',
    theme: 'gallery',
    eyebrow: 'Liam Marega · Frontend Developer',
    title: 'Project Gallery',
    subtitle: 'Featured projects and creative works',
    alt: legacySeo.gallery.title,
  },
  '/linktree/': hub('es'),
  '/en/linktree/': hub('en'),

  // legal pages (titles = the page titles without the brand suffix)
  '/politica-de-privacidad/': { lang: 'es', theme: 'legal', eyebrow: 'Legal', title: 'Política de privacidad y protección de datos' },
  '/terminos-y-condiciones/': { lang: 'es', theme: 'legal', eyebrow: 'Legal', title: 'Términos y condiciones de contratación' },
  '/politica-de-reembolso/': { lang: 'es', theme: 'legal', eyebrow: 'Legal', title: 'Política de entregas y reembolsos' },
  '/landing/builder/privacy/': { lang: 'es', theme: 'legal', eyebrow: `${PAPER} · Legal`, title: 'Privacidad y términos de Landing PRO' },
};

const normalize = (pathname: string) => pathname.replace(/\/?$/, '/');

/** The entry that draws the card of a page; unknown paths get the home card of their language. */
export function ogEntryFor(pathname: string): OgEntry & { id: string } {
  const path = normalize(pathname);
  const key = path in OG_ROUTES ? path : path.startsWith('/en/') ? '/en/' : '/';
  return { ...OG_ROUTES[key], id: ogId(key) };
}

/** Public path of the card file, e.g. '/og/en--ecommerce.jpg'. */
export const ogPathFor = (pathname: string) => `/og/${ogEntryFor(pathname).id}.jpg`;

/** Absolute URL of the card of a page (og:image, twitter:image, JSON-LD image). */
export const ogUrlFor = (pathname: string) => abs(ogPathFor(pathname));

/** Everything a layout needs for the og:image / twitter:image tags of a page. */
export function ogImageFor(pathname: string) {
  const entry = ogEntryFor(pathname);
  return {
    url: abs(`/og/${entry.id}.jpg`),
    width: OG_WIDTH,
    height: OG_HEIGHT,
    type: OG_TYPE,
    alt: entry.alt ?? `${entry.title} · LiamDev`,
  };
}
