import { $, draw, finePointer } from './util';

export function initChat() {
  const wrap = $('[data-connect-wrap]');
  const btn = $('[data-connect]');
  if (!wrap || !btn) return;
  const doodles = Array.from(wrap.querySelectorAll('.chat__d'));
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
  });
  btn.addEventListener('focus', on);
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
  btn.addEventListener('pointerleave', release);
}
