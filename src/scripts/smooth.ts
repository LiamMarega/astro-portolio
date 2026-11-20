import Lenis from 'lenis';
import { reduceMotion } from './util';

let lenis: Lenis | null = null;
let scrollPaused = false;
let transitionPaused = false;
let pagePaused = typeof document !== 'undefined' ? document.hidden : false;
const pauseSubs = new Set<(paused: boolean) => void>();

const syncPause = () => {
  const hidden = typeof document !== 'undefined' && document.hidden;
  if (lenis) {
    if (scrollPaused || hidden) lenis.stop();
    else lenis.start();
  }
  const next = scrollPaused || transitionPaused || hidden;
  if (next === pagePaused) return;
  pagePaused = next;
  pauseSubs.forEach((cb) => cb(pagePaused));
};

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', syncPause);
}

export function isPagePaused() {
  return pagePaused;
}

export function onPagePause(cb: (paused: boolean) => void) {
  pauseSubs.add(cb);
  return () => {
    pauseSubs.delete(cb);
  };
}

/** Pauses background animations during View Transitions without altering scroll overflow. */
export function setTransitionPaused(paused: boolean) {
  if (transitionPaused === paused) return;
  transitionPaused = paused;
  syncPause();
}

export function initSmooth() {
  if (reduceMotion()) return null;
  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.105,
    wheelMultiplier: 0.95,
    smoothWheel: true,
    syncTouch: false,
  });
  if (scrollPaused || document.hidden) lenis.stop();
  return lenis;
}

export function scrollToY(y: number, opts: { immediate?: boolean; duration?: number } = {}) {
  if (lenis) {
    lenis.scrollTo(y, { immediate: opts.immediate, duration: opts.duration ?? 1.25, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else {
    window.scrollTo({ top: y, behavior: opts.immediate || reduceMotion() ? 'auto' : 'smooth' });
  }
}

export function pauseScroll(paused: boolean) {
  scrollPaused = paused;
  if (!lenis) {
    document.documentElement.style.overflow = paused ? 'hidden' : '';
  }
  syncPause();
}
