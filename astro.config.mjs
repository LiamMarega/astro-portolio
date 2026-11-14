// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Your real domain (used for canonical, hreflang and social-card URLs).
  site: 'https://www.liammarega.com',
  integrations: [
    react(),
    // sitemap-index.xml + sitemap-0.xml. The i18n block adds xhtml:link alternates to the bilingual pairs
    // (/ ↔ /en/, /contact/ ↔ /en/contact/, /ecommerce/ ↔ /en/ecommerce/); es-only pages are listed on their own.
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-AR', en: 'en-US' },
      },
    }),
  ],
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
