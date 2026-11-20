import { $, $$, clamp, draw, finePointer, onScroll, reduceMotion, refreshScroll } from './util';

const docOffsetTop = (el: HTMLElement) => {
  let top = 0;
  let cur: HTMLElement | null = el;
  while (cur) {
    top += cur.offsetTop;
    const parent = cur.offsetParent as HTMLElement | null;
    if (parent) top += parent.clientTop;
    cur = parent;
  }
  return top;
};

export function initWork() {
  const cards = $$('[data-pcard]');

  cards.forEach((card) => {
    const arrow = $('.pcard__arrow svg', card);
    let t = 0;
    card.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse' || !finePointer()) return;
      clearTimeout(t);
      arrow?.classList.remove('is-drawn');
      // the arrow vanishes, then is redrawn stroke by stroke
      t = window.setTimeout(() => draw(arrow), 90);
    });
    card.addEventListener('pointerleave', () => {
      clearTimeout(t);
      arrow?.classList.add('is-drawn');
    });
  });

  /* ── scroll stack: cards that get covered shrink and dim a touch ── */
  const n = cards.length;
  if (reduceMotion() || n < 2) return;

  const depth = new Float64Array(n).fill(-1);
  const arrive = new Float32Array(n);
  const flowTop = new Float64Array(n);
  const cardH = new Float64Array(n);
  const stickyTop = new Float64Array(n);
  const cbBottom = new Float64Array(n);
  const marginBottom = new Float64Array(n);
  const isSticky = new Uint8Array(n);
  let workTop = 0;
  let workBottom = 0;
  let measured = false;
  let settledZone: -1 | 0 | 1 = 0;

  const measure = () => {
    for (let i = 0; i < n; i++) {
      const cs = getComputedStyle(cards[i]);
      isSticky[i] = cs.position === 'sticky' ? 1 : 0;
      stickyTop[i] = parseFloat(cs.top) || 0;
      marginBottom[i] = parseFloat(cs.marginBottom) || 0;
    }
    // Temporarily neutralize sticky offset so offsetTop reads exact normal-flow positions
    for (let i = 0; i < n; i++) {
      if (isSticky[i]) cards[i].style.position = 'relative';
    }
    const parentCache = new Map<HTMLElement, number>();
    workTop = Infinity;
    workBottom = -Infinity;
    for (let i = 0; i < n; i++) {
      const card = cards[i];
      const ft = docOffsetTop(card);
      const h = card.offsetHeight;
      flowTop[i] = ft;
      cardH[i] = h;
      const parent = card.parentElement;
      let bottom = Infinity;
      if (parent) {
        const cached = parentCache.get(parent);
        if (cached !== undefined) {
          bottom = cached;
        } else {
          const pcs = getComputedStyle(parent);
          const pb = parseFloat(pcs.paddingBottom) || 0;
          bottom = docOffsetTop(parent) + parent.clientTop + parent.clientHeight - pb;
          parentCache.set(parent, bottom);
        }
      }
      cbBottom[i] = bottom;
      if (ft < workTop) workTop = ft;
      const maxEnd = Math.max(ft + h, Number.isFinite(bottom) ? bottom : ft + h);
      if (maxEnd > workBottom) workBottom = maxEnd;
    }
    for (let i = 0; i < n; i++) {
      if (isSticky[i]) cards[i].style.position = '';
    }
    measured = true;
    settledZone = 0;
  };

  let rzRaf = 0;
  const scheduleMeasure = () => {
    if (rzRaf) return;
    rzRaf = requestAnimationFrame(() => {
      rzRaf = 0;
      measure();
      refreshScroll();
    });
  };

  measure();
  document.fonts?.ready.then(scheduleMeasure);
  window.addEventListener('load', scheduleMeasure, { once: true });
  window.addEventListener('resize', scheduleMeasure, { passive: true });
  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(scheduleMeasure);
    ro.observe(document.body);
    const parent = cards[0].parentElement;
    if (parent) ro.observe(parent);
  }

  onScroll((y, vh) => {
    if (!measured) measure();
    const zone: -1 | 0 | 1 = y + vh < workTop - 100 ? -1 : y > workBottom + 100 ? 1 : 0;
    if (zone !== 0 && zone === settledZone) return;

    // how far each card has slid over the previous one (0 → 1)
    let prevTop = 0;
    for (let i = 0; i < n; i++) {
      const docTop = isSticky[i]
        ? Math.min(cbBottom[i] - cardH[i] - marginBottom[i], Math.max(flowTop[i], y + stickyTop[i]))
        : flowTop[i];
      const rTop = docTop - y;
      if (i === 0) {
        arrive[0] = 0;
      } else {
        const prevBottom = prevTop + cardH[i - 1];
        const top = stickyTop[i];
        const start = Math.max(prevBottom, top + 1);
        arrive[i] = clamp((start - rTop) / Math.max(1, start - top));
      }
      prevTop = rTop;
    }

    for (let i = 0; i < n; i++) {
      let d = 0;
      for (let j = i + 1; j < n; j++) d += arrive[j];
      if (d > 3) d = 3;
      if (Math.abs(d - depth[i]) > 0.002) {
        depth[i] = d;
        cards[i].style.setProperty('--stack', d.toFixed(3));
      }
    }
    settledZone = zone;
  });
}
