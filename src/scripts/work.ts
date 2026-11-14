import { $, $$, draw, finePointer } from './util';

export function initWork() {
  $$('[data-pcard]').forEach((card) => {
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
}
