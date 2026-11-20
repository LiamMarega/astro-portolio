// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Your real domain (used for canonical, hreflang and social-card URLs).
  site: 'https://www.liammarega.com',
  integrations: [
    // sitemap-index.xml + sitemap-0.xml. The i18n block adds xhtml:link alternates to the bilingual pairs
    // (/ ↔ /en/, /contact/ ↔ /en/contact/, /ecommerce/ ↔ /en/ecommerce/); es-only pages are listed on their own.
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-AR', en: 'en-US' },
      },
    }),
  ],
  // Hover-intent prefetch of internal links (HTML only: no JS runs, so no extra Analytics page views).
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  compressHTML: true,
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
