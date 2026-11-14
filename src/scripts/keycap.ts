import { $, $$, draw, finePointer } from './util';

/** Lights up every 3D key (Keycap.astro) on hover, keyboard focus or tap. */
export function initKeycaps() {
  $$('[data-keycap]').forEach((wrap) => {
    const btn = $('[data-keycap-btn]', wrap);
    if (!btn) return;
    const doodles = $$('.key__d', wrap);
    let lit = false;
    let t = 0;
    const on = () => {
      if (lit) return;
      lit = true;
      wrap.classList.add('is-lit');
      doodles.forEach((d) => draw(d, true));
    };
    const off = () => {
      if (!lit) return;
      lit = false;
      wrap.classList.remove('is-lit');
      doodles.forEach((d) => draw(d, false));
    };
    btn.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse' && finePointer()) on();
    });
    btn.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'mouse') off();
      btn.classList.remove('is-pressed');
    });
    btn.addEventListener('focus', () => {
      if (btn.matches(':focus-visible')) on();
    });
    btn.addEventListener('blur', off);
    btn.addEventListener('pointerdown', (e) => {
      btn.classList.add('is-pressed');
      if (e.pointerType !== 'mouse') {
        on();
        clearTimeout(t);
        t = window.setTimeout(off, 1800);
      }
    });
    const release = () => btn.classList.remove('is-pressed');
    btn.addEventListener('pointerup', release);
    btn.addEventListener('pointercancel', release);
  });
}
