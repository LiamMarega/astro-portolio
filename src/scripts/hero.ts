import { $, $$, clamp, onScroll, reduceMotion } from './util';
import { scrollToY } from './smooth';

/** Share of the viewport width the giant name fills (matches the reference layout at 1466px). */
const FIT = 0.9535;

export function initHero() {
  const hero = $('[data-hero]');
  if (!hero) return;
  const name = $('[data-hero-name]', hero)!;
  const fit = $('[data-hero-fit]', hero)!;
  const tagline = $('[data-hero-tagline]', hero)!;
  const sky = $('[data-sky]');

  /* ── fit the giant name to the viewport width ── */
  const fitName = () => {
    name.style.setProperty('--name-size', '100px');
    const w = fit.getBoundingClientRect().width;
    if (!w) return;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    let size = (100 * vw * FIT) / w;
    size = Math.min(size, vh * 0.5, 620);
    name.style.setProperty('--name-size', `${size.toFixed(2)}px`);
  };
  fitName();
  document.fonts?.ready.then(fitName);
  let rz = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(rz);
    rz = requestAnimationFrame(fitName);
  });

  /* ── stickers ── */
  const chars = $$('.ch', name);
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

  /* ── sky + tagline fade as you scroll away ── */
  onScroll((y, vh) => {
    const p = clamp(y / (vh * 0.34));
    const e = 1 - p * p * (3 - 2 * p);
    sky?.style.setProperty('--sky-o', e.toFixed(3));
    tagline.style.opacity = (1 - clamp(y / (vh * 0.22))).toFixed(3);
  });

  /* ── replay the sunrise from the nav sun ── */
  const btn = $('[data-sunrise]');
  btn?.addEventListener('click', () => {
    if (reduceMotion()) {
      scrollToY(0);
      return;
    }
    const root = document.documentElement;
    root.classList.remove('no-intro');
    const go = () => root.classList.toggle('replay');
    if (window.scrollY > 4) {
      scrollToY(0, { duration: 1 });
      setTimeout(go, 650);
    } else go();
  });
}
