import { $, $$, inView, reduceMotion } from './util';

/**
 * /ecommerce hero: the browser window and the phone show the real stores one after another
 * (cross-fade). Paused while the hero is off screen or the tab is hidden; with
 * `prefers-reduced-motion` the first store stays put.
 */
export function initEcoHero() {
  const root = $('[data-ehero-visual]');
  if (!root || reduceMotion()) return;
  const screens = $$<HTMLElement>('.ehero__screen, .ehero__phone-screen', root);
  const count = screens[0] ? $$('.ehero__img', screens[0]).length : 0;
  if (count < 2) return;

  const url = $('[data-ehero-url]', root);
  const live = $<HTMLAnchorElement>('[data-ehero-live]', root);
  const siteImgs = $$<HTMLImageElement>('.ehero__img', screens[0]);
  const stores = JSON.parse(root.dataset.stores || '[]') as { host: string; name: string; url: string; alt: string }[];

  let index = 0;
  let timer = 0;
  let onScreen = false;

  const show = (next: number) => {
    screens.forEach((screen) => {
      $$('.ehero__img', screen).forEach((img, i) => img.classList.toggle('is-on', i === next));
    });
    // only the first image of the browser window carries alt text; keep it in sync for screen readers
    siteImgs.forEach((img, i) => (img.alt = i === next ? stores[i]?.alt ?? '' : ''));
    const s = stores[next];
    if (s) {
      if (url) url.textContent = s.host;
      if (live) {
        live.href = s.url;
        live.textContent = `${live.dataset.live} · ${s.name}`;
      }
    }
    index = next;
  };

  const tick = () => {
    show((index + 1) % count);
    timer = window.setTimeout(tick, 3800);
  };
  const start = () => {
    if (timer || !onScreen || document.hidden) return;
    timer = window.setTimeout(tick, 2600);
  };
  const stop = () => {
    clearTimeout(timer);
    timer = 0;
  };

  inView(
    root,
    () => {
      onScreen = true;
      start();
    },
    () => {
      onScreen = false;
      stop();
    },
  );
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
}
