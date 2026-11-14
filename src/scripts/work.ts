import { $, $$, clamp, draw, finePointer, onScroll, reduceMotion } from './util';

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
  if (reduceMotion() || cards.length < 2) return;
  const depth = new Array(cards.length).fill(-1);
  onScroll(() => {
    // how far each card has slid over the previous one (0 → 1)
    const arrive = cards.map((card, i) => {
      if (i === 0) return 0;
      const prev = cards[i - 1];
      // scale() shrinks from the top edge, so use the unscaled height for the bottom
      const prevBottom = prev.getBoundingClientRect().top + prev.offsetHeight;
      const top = parseFloat(getComputedStyle(card).top) || 0;
      const r = card.getBoundingClientRect();
      const start = Math.max(prevBottom, top + 1);
      return clamp((start - r.top) / Math.max(1, start - top));
    });
    cards.forEach((card, i) => {
      let d = 0;
      for (let j = i + 1; j < cards.length; j++) d += arrive[j];
      d = Math.min(d, 3);
      if (Math.abs(d - depth[i]) > 0.002) {
        depth[i] = d;
        card.style.setProperty('--stack', d.toFixed(3));
      }
    });
  });
}
