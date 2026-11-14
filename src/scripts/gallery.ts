import { $, $$, clamp, finePointer, inView, onScroll, reduceMotion } from './util';

export function initGallery() {
  const board = $('[data-gallery]');
  if (!board) return;
  const tiles = $$('[data-tile]', board);
  const reduce = reduceMotion();
  let visible = false;

  /* ── parallax: every tile drifts at its own speed while the board scrolls past ── */
  const speeds = tiles.map((t) => parseFloat(getComputedStyle(t).getPropertyValue('--speed')) || 0);
  if (!reduce) {
    onScroll((_y, vh) => {
      if (!visible) return;
      const r = board.getBoundingClientRect();
      const p = clamp((vh - r.top) / (vh + r.height));
      const span = r.height;
      tiles.forEach((t, i) => {
        t.style.setProperty('--py', `${((0.5 - p) * speeds[i] * span * 1.15).toFixed(1)}px`);
      });
    });
  }

  /* ── drag tiles around like stickers on a board ── */
  let z = 20;
  tiles.forEach((tile) => {
    let sx = 0;
    let sy = 0;
    let bx = 0;
    let by = 0;
    let id = -1;

    tile.addEventListener('pointerdown', (e) => {
      tile.style.zIndex = String(++z);
      if (e.pointerType === 'touch' || !finePointer()) {
        tile.firstElementChild?.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.045)' }, { transform: 'scale(1)' }], {
          duration: 420,
          easing: 'cubic-bezier(.3,1.5,.5,1)',
        });
        return;
      }
      if (e.button !== 0) return;
      e.preventDefault();
      id = e.pointerId;
      tile.setPointerCapture(id);
      sx = e.clientX;
      sy = e.clientY;
      bx = parseFloat(tile.style.getPropertyValue('--dx')) || 0;
      by = parseFloat(tile.style.getPropertyValue('--dy')) || 0;
      tile.classList.add('is-dragging');
    });
    tile.addEventListener('pointermove', (e) => {
      if (e.pointerId !== id) return;
      tile.style.setProperty('--dx', `${bx + e.clientX - sx}px`);
      tile.style.setProperty('--dy', `${by + e.clientY - sy}px`);
    });
    const end = (e: PointerEvent) => {
      if (e.pointerId !== id) return;
      id = -1;
      tile.classList.remove('is-dragging');
      if (tile.hasPointerCapture(e.pointerId)) tile.releasePointerCapture(e.pointerId);
    };
    tile.addEventListener('pointerup', end);
    tile.addEventListener('pointercancel', end);
  });

  /* ── live tiles ── */
  const phones = $$('.phone', board);
  const words = $$('.hl__word', board);
  let tick = 0;
  let timer = 0;
  const step = () => {
    tick++;
    phones.forEach((ph, pi) => {
      const screens = $$('.scr', ph);
      const k = (tick + pi * 2) % screens.length;
      screens.forEach((s, si) => s.classList.toggle('is-on', si === k));
    });
    if (words.length) {
      const k = tick % words.length;
      words.forEach((w, wi) => w.classList.toggle('is-on', wi === k));
    }
  };
  // second phone starts on a different screen
  phones.forEach((ph, pi) => {
    const screens = $$('.scr', ph);
    screens.forEach((s, si) => s.classList.toggle('is-on', si === (pi * 2) % screens.length));
  });

  inView(
    board,
    () => {
      visible = true;
      if (!reduce && !timer) timer = window.setInterval(step, 2300);
    },
    () => {
      visible = false;
      clearInterval(timer);
      timer = 0;
    },
    { rootMargin: '10% 0px' },
  );
}
