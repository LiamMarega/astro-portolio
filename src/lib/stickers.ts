import type { StickerType } from '../components/Sticker.astro';

/** Size (em) and vertical centre (em, from the baseline) of each sticker when it covers a letter. */
export const stickerGeo: Record<StickerType, { s: number; y: number }> = {
  bubble: { s: 0.96, y: -0.36 },
  laptop: { s: 0.84, y: -0.33 },
  cards: { s: 0.78, y: -0.38 },
  hello: { s: 0.7, y: -0.33 },
  polaroid: { s: 0.62, y: -0.36 },
  star: { s: 0.64, y: -0.36 },
  smiley: { s: 0.56, y: -0.33 },
  heart: { s: 0.58, y: -0.32 },
  bolt: { s: 0.62, y: -0.36 },
  bag: { s: 0.66, y: -0.36 },
  cart: { s: 0.74, y: -0.34 },
  card: { s: 0.72, y: -0.34 },
  box: { s: 0.66, y: -0.36 },
  tag: { s: 0.64, y: -0.36 },
};
