/**
 * Real brand marks (projects + social networks), inlined as SVG.
 * Every call can pass a `uid` so gradient ids stay unique when a logo shows up several times on a page.
 */
import { ferox, swipeloop, clientix, lucero, guita, github, youtube, instagram, linkedin } from './brand-svgs.mjs';

export { clientixWordmark } from './brand-svgs.mjs';

const uniq = (svg: string, uid = '') =>
  uid
    ? svg
        .replace(/id="([^"]+)"/g, (_, id) => `id="${id}-${uid}"`)
        .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${id}-${uid})`)
        .replace(/href="#([^"]+)"/g, (_, id) => `href="#${id}-${uid}"`)
    : svg;

/* ───────────── projects ───────────── */

const img = (src: string) => `<img src="${src}" alt="" width="160" height="160" loading="lazy" decoding="async" draggable="false">`;

/** Logo tiles: background of the tile, size of the mark inside it, and the mark itself. */
const PROJECT: Record<string, { bg: string; size: string; mark: string }> = {
  ferox: { bg: 'radial-gradient(circle at 50% 30%,#163a29,#0b1d14)', size: '70%', mark: ferox },
  swipeloop: { bg: '#f5c518', size: '100%', mark: swipeloop },
  commerce: { bg: '#fff', size: '80%', mark: img('/img/logos/easyhome-mark.webp') },
  clientix: { bg: 'radial-gradient(circle at 50% 35%,#0f2a47,#071426)', size: '64%', mark: clientix },
  lucero: { bg: 'radial-gradient(circle at 50% 40%,#25307a,#121852)', size: '86%', mark: lucero },
  guita: { bg: 'radial-gradient(circle at 50% 40%,#16221b,#070a08)', size: '84%', mark: guita },
};

export function projectLogo(slug: string, uid = '') {
  const p = PROJECT[slug];
  if (!p) return null;
  return { bg: p.bg, size: p.size, html: uniq(p.mark, uid ? `${slug}-${uid}` : '') };
}

/** Store logos for the headless-commerce case study. */
export const storeLogos: Record<string, { src: string; w: number; h: number }> = {
  'https://www.easyhomeappliancesbr.com/': { src: '/img/logos/easyhome.webp', w: 360, h: 89 },
  'https://www.mendohomefurniture.com/': { src: '/img/logos/mendo.webp', w: 290, h: 66 },
};

/* ───────────── social networks ───────────── */

const SOCIAL: Record<string, string> = { github, youtube, instagram, linkedin };
export const socialLogo = (id: string, uid = '') => (SOCIAL[id] ? uniq(SOCIAL[id], uid ? `${id}-${uid}` : '') : '');
