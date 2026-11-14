import { $ } from './util';
import { initStickers } from './stickers';

/** Share of the viewport width the giant name fills (matches the reference layout at 1466px). */
const FIT = 0.9535;

export function initHero() {
  const hero = $('[data-hero]');
  if (!hero) return;
  const name = $('[data-hero-name]', hero)!;
  const fit = $('[data-hero-fit]', hero)!;

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
  initStickers(name);
}
