import { $, clamp, onScroll, reduceMotion } from './util';
import { scrollToY } from './smooth';

/** Sunrise sky shared by every page: fades as you scroll away and replays from the nav sun. */
export function initSky() {
  const sky = $('[data-sky]');
  // elements that fade out together with the sky (e.g. the hero tagline)
  const fade = $('[data-hero-tagline]');

  if (sky) {
    onScroll((y, vh) => {
      const p = clamp(y / (vh * 0.34));
      const e = 1 - p * p * (3 - 2 * p);
      sky.style.setProperty('--sky-o', e.toFixed(3));
      if (fade) fade.style.opacity = (1 - clamp(y / (vh * 0.22))).toFixed(3);
    });
  }

  const btn = $('[data-sunrise]');
  btn?.addEventListener('click', () => {
    if (reduceMotion()) {
      scrollToY(0);
      return;
    }
    const root = document.documentElement;
    const go = () => root.classList.toggle('replay');
    if (window.scrollY > 4) {
      scrollToY(0, { duration: 1 });
      setTimeout(go, 650);
    } else go();
  });
}
