import { useContent, homeHref, LOCALES, type Locale } from './site';

/**
 * ─────────────────────────────────────────────────────────────────────
 *  SEO + GEO data: everything search engines and AI answer engines read from <head>.
 *
 *  TRUTH RULES (same as the rest of the site): every fact comes from src/content/site.ts
 *  (name, brand, handle, role, description, email, location, socials, stack) or from the
 *  page copy passed in (ecommerce.ts / contact.ts). No ratings, prices, reviews, phone
 *  numbers or street addresses. This file does not change any visible text.
 *
 *  Entities share stable @ids so every page points at the same Person:
 *    https://www.liammarega.com/#person   → Liam Marega (also "LiamDev", "liammdev")
 *    https://www.liammarega.com/#website  → the site, published by that person
 * ─────────────────────────────────────────────────────────────────────
 */

export const SITE_URL = 'https://www.liammarega.com';
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Absolute URL of a site path. */
export const abs = (path: string) => new URL(path, SITE_URL).toString();

/**
 * Canonical URL of a page: absolute, with trailing slash (every page is built as dir/index.html and
 * vercel.json redirects the slash-less form to it). Pass `Astro.url.pathname`.
 */
export const canonicalUrl = (pathname: string) => abs(pathname.replace(/\/?$/, '/'));

/** JSON for an inline <script type="application/ld+json">: `<` is escaped so the data can never close the tag. */
export const ldJson = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');

/* ───────────────────────── Home (/ and /en/) ───────────────────────── */

/**
 * <title> and meta description of the two home pages, tuned for brand queries
 * ("Liam Marega", "LiamDev"). They only live in <head>: site.ts keeps its own title for the page body.
 */
export const homeSeo: Record<Locale, { title: string; description: string }> = {
  es: {
    title: 'Liam Marega (LiamDev) — Desarrollador Frontend y Mobile',
    description:
      'Liam Marega (LiamDev): desarrollador frontend y mobile con Flutter, React, Next.js y Supabase. Apps, e-commerce headless y SaaS con IA desde Argentina.',
  },
  en: {
    title: 'Liam Marega (LiamDev) — Frontend & Mobile Developer',
    description:
      'Liam Marega (LiamDev) is a frontend & mobile developer building apps, headless e-commerce and AI SaaS with Flutter, React, Next.js and Supabase.',
  },
};

/** The one Person every page links to. */
export function personNode(lang: Locale) {
  const { site } = useContent(lang);
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.name,
    alternateName: [site.brand, site.handle.replace(/^@/, '')],
    url: abs('/'),
    image: abs('/images/uploads/liam.jpg'),
    jobTitle: site.role,
    description: site.description,
    email: site.email,
    address: { '@type': 'PostalAddress', addressRegion: 'Entre Ríos', addressCountry: 'AR' },
    knowsAbout: ['Flutter', 'Dart', 'React', 'Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Node.js', 'Vendure', 'Headless commerce', 'AI SaaS'],
    sameAs: site.socials.map((s) => s.href),
  };
}

/** Light reference to the Person for other nodes (provider, publisher, author…). */
export function personRef(lang: Locale = 'es') {
  const { site } = useContent(lang);
  return { '@type': 'Person', '@id': PERSON_ID, name: site.name, url: abs('/') };
}

export function websiteNode(lang: Locale) {
  const { site } = useContent(lang);
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: abs('/'),
    name: site.name,
    alternateName: [site.brand, site.handle.replace(/^@/, '')],
    inLanguage: LOCALES,
    publisher: { '@id': PERSON_ID },
  };
}

/** Home pages: Person + WebSite + the profile page itself, as one graph. */
export function homeGraph(lang: Locale, image?: string) {
  const url = abs(homeHref(lang));
  const { title, description } = homeSeo[lang];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personNode(lang),
      websiteNode(lang),
      {
        '@type': 'ProfilePage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: lang,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
        ...(image && { primaryImageOfPage: { '@type': 'ImageObject', url: image, width: 1200, height: 630 } }),
      },
    ],
  };
}

/* ───────────────────────── Inner pages ───────────────────────── */

const HOME_NAME: Record<Locale, string> = { es: 'Inicio', en: 'Home' };

/** BreadcrumbList: Home → the current page. `path` is the page path with trailing slash. */
export function breadcrumbNode(lang: Locale, name: string, path: string) {
  const url = abs(path);
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: HOME_NAME[lang], item: abs(homeHref(lang)) },
      { '@type': 'ListItem', position: 2, name, item: url },
    ],
  };
}

/** The page titles end with "| Liam Marega"; node names do not need the brand suffix. */
export const stripBrand = (title: string) => title.replace(/\s*\|\s*Liam Marega$/, '');

const CRUMB: Record<'ecommerce' | 'contact', Record<Locale, string>> = {
  ecommerce: { es: 'E-commerce a medida', en: 'Custom e-commerce' },
  contact: { es: 'Contacto', en: 'Contact' },
};

const SERVICE_TYPE: Record<Locale, string> = {
  es: 'Desarrollo de e-commerce headless a medida',
  en: 'Custom headless e-commerce development',
};

/** /ecommerce and /en/ecommerce: the e-commerce development Service (no prices or offers) + breadcrumb. */
export function ecommerceGraph(lang: Locale, page: { path: string; title: string; description: string; image?: string }) {
  const url = abs(page.path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: stripBrand(page.title),
        serviceType: SERVICE_TYPE[lang],
        description: page.description,
        url,
        inLanguage: lang,
        ...(page.image && { image: page.image }),
        provider: personRef(lang),
      },
      breadcrumbNode(lang, CRUMB.ecommerce[lang], page.path),
    ],
  };
}

/** /contact and /en/contact: ContactPage + breadcrumb. */
export function contactGraph(lang: Locale, page: { path: string; title: string; description: string; image?: string }) {
  const url = abs(page.path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${url}#webpage`,
        url,
        name: stripBrand(page.title),
        description: page.description,
        inLanguage: lang,
        ...(page.image && { primaryImageOfPage: { '@type': 'ImageObject', url: page.image, width: 1200, height: 630 } }),
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
      },
      breadcrumbNode(lang, CRUMB.contact[lang], page.path),
    ],
  };
}

/* ───────────────────────── Landing PRO funnel ───────────────────────── */

export const LANDING_DESCRIPTION =
  'Diseño y desarrollo de landing pages estratégicas que convierten tráfico en oportunidades reales. Para coaches, consultores, marcas personales y negocios digitales.';

/**
 * The Landing PRO service as it already appeared on every funnel page, now with a stable @id
 * (one entity for the whole funnel instead of one per URL) and the founder linked to the Person.
 */
export function landingServiceNode(image?: string) {
  const url = abs('/landing-builder/');
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${url}#service`,
    name: 'LiamDev',
    description: LANDING_DESCRIPTION,
    url,
    ...(image && { image }),
    priceRange: '$$',
    serviceType: 'Diseño y desarrollo de landing pages',
    areaServed: 'Worldwide',
    knowsLanguage: ['es', 'en'],
    founder: personRef('es'),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '600',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        price: '600',
        unitText: 'desde',
      },
    },
  };
}
