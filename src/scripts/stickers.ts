import { $$ } from './util';

/**
 * Letters that swap for a die-cut sticker on hover (tap on touch screens).
 * Works for every `.ch` inside `root` (the giant hero name, the /ecommerce headline word…).
 */
export function initStickers(root: ParentNode = document) {
  const chars = $$('.ch', root);
  if (!chars.length) return;
  let current: HTMLElement | null = null;
  let touchTimer = 0;
  const show = (ch: HTMLElement) => {
    if (current && current !== ch) current.classList.remove('is-on');
    current = ch;
    ch.classList.add('is-on');
  };
  const hide = (ch: HTMLElement) => {
    ch.classList.remove('is-on');
    if (current === ch) current = null;
  };
  chars.forEach((ch) => {
    ch.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') show(ch);
    });
    ch.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') hide(ch);
    });
    ch.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') {
        show(ch);
        clearTimeout(touchTimer);
        touchTimer = window.setTimeout(() => hide(ch), 1600);
      }
    });
  });
  // warm the bubble font so the first sticker renders with it
  const warm = () => document.fonts?.load('400 100px Modak').catch(() => {});
  if ('requestIdleCallback' in window) (window as any).requestIdleCallback(warm, { timeout: 2500 });
  else setTimeout(warm, 1500);
}
