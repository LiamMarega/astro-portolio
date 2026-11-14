export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const smooth = (t: number) => t * t * (3 - 2 * t);

export const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Fires `cb` once per animation frame while the page scrolls or resizes. */
type ScrollCb = (y: number, vh: number) => void;
const subs = new Set<ScrollCb>();
let queued = false;
const run = () => {
  queued = false;
  const y = window.scrollY;
  const vh = window.innerHeight;
  subs.forEach((cb) => cb(y, vh));
};
const queue = () => {
  if (!queued) {
    queued = true;
    requestAnimationFrame(run);
  }
};
window.addEventListener('scroll', queue, { passive: true });
window.addEventListener('resize', queue, { passive: true });

export function onScroll(cb: ScrollCb) {
  subs.add(cb);
  queue();
  return () => subs.delete(cb);
}
export const refreshScroll = queue;

/** Toggles `is-drawn` on a doodle svg; re-adding replays the stroke animation. */
export function draw(svg: Element | null, on = true) {
  if (!svg) return;
  if (on) {
    svg.classList.remove('is-drawn');
    // force style flush so the strokes restart from hidden
    void (svg as SVGElement).getBoundingClientRect();
    requestAnimationFrame(() => svg.classList.add('is-drawn'));
  } else {
    svg.classList.remove('is-drawn');
  }
}

/** Runs `enter`/`leave` when an element enters/leaves the viewport. */
export function inView(el: Element, enter: () => void, leave?: () => void, opts: IntersectionObserverInit = {}) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) enter();
        else leave?.();
      }
    },
    { threshold: 0, ...opts },
  );
  io.observe(el);
  return io;
}
