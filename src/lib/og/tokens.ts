/** Brand tokens, copied from src/styles/global.css and landing-builder.css (no new palette). */
export const C = {
  page: '#fdfdfd',
  ink: '#050505',
  inkSoft: '#5d5d5d',
  sun: '#ffd60a',
  sunDeep: '#fec81a',
  sunText: '#ffd84a',
  paper: '#fbfaf5',
  paperBand: '#f6f3ea',
  paperInk: '#1a1611',
  paperInk3: '#5f5849',
  yellow: '#ffe000',
  yellowDeep: '#a98700',
  green: '#4ade80',
} as const;

/** Palette of the preserved legacy pages (/newspaper, /gallery, /linktree): neon on black, kept as on those pages. */
export const L = {
  neon: '#E2FF00',
  black: '#000000',
  galleryBg: '#121212',
  galleryCard: '#1a1a1a',
  violet: '#6633ee',
} as const;

export const W = 1200;
export const H = 630;
/** Safe margin: nothing important sits closer than this to an edge. */
export const M = 64;
