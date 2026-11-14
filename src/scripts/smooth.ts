import Lenis from 'lenis';
import { reduceMotion } from './util';

let lenis: Lenis | null = null;

export function initSmooth() {
  if (reduceMotion()) return null;
  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.105,
    wheelMultiplier: 0.95,
    smoothWheel: true,
    syncTouch: false,
  });
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
  if (!lenis) {
    document.documentElement.style.overflow = paused ? 'hidden' : '';
    return;
  }
  if (paused) lenis.stop();
  else lenis.start();
}
