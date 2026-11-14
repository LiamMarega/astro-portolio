import { $, reduceMotion } from './util';

type Connection = { saveData?: boolean; effectiveType?: string };

/** Data-saver or a 2G-class connection: keep the poster, never download the recording. */
function lowData() {
  const c = (navigator as Navigator & { connection?: Connection }).connection;
  return Boolean(c?.saveData) || ['slow-2g', '2g'].includes(c?.effectiveType ?? '');
}

/**
 * /ecommerce hero: a silent screen recording of a real storefront inside the browser frame.
 * The poster (an <img> in the markup) is the LCP element, so the video costs nothing until it is needed:
 *  - sources are attached only once the hero is on screen, and never with `prefers-reduced-motion`, data-saver or 2G;
 *  - it pauses when the hero leaves the viewport or the tab is hidden, and resumes when both are fine again;
 *  - until it really plays the poster stays visible (the video fades in on `playing`).
 */
export function initEcoHero() {
  const root = $('[data-ehero-visual]');
  const video = $<HTMLVideoElement>('[data-ehero-video]', root ?? document);
  if (!root || !video || reduceMotion() || lowData()) return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let onScreen = false;
  let attached = false;

  const attach = () => {
    attached = true;
    // WebM (VP9) first: it is the smaller file; MP4 (H.264) covers Safari and older browsers
    (
      [
        [video.dataset.webm, 'video/webm; codecs="vp9"'],
        [video.dataset.mp4, 'video/mp4; codecs="avc1.640028"'],
      ] as const
    ).forEach(([src, type]) => {
      if (!src) return;
      const source = document.createElement('source');
      source.src = src;
      source.type = type;
      video.append(source);
    });
    video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
    video.load();
  };

  const play = () => {
    if (!onScreen || document.hidden || motion.matches) return;
    if (!attached) attach();
    // autoplay can still be refused (iOS low-power mode): the poster simply stays
    video.play().catch(() => {});
  };
  const pause = () => {
    if (attached) video.pause();
  };

  new IntersectionObserver(
    ([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) play();
      else pause();
    },
    { threshold: 0.25 },
  ).observe(root);

  document.addEventListener('visibilitychange', () => (document.hidden ? pause() : play()));
  motion.addEventListener('change', () => (motion.matches ? pause() : play()));
}
