import { initSmooth } from './smooth';
import { initNav, initAnchors } from './nav';
import { initSky } from './sky';
import { initReveal } from './reveal';
import { initEcoStickers } from './eco-stickers';
import { initKeycaps } from './keycap';
import { initTags } from './story';
import { initLeadForms } from './leadform';
import { initEcoHero } from './ehero';
import { $, $$, inView, reduceMotion } from './util';

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

/** "¿Te suena alguna?": tap the pains that apply; they travel with the lead. */
function initPains() {
  const box = $('[data-pains]');
  if (!box) return;
  const copy = JSON.parse(box.dataset.copy || '{}') as Record<string, string>;
  const msg = $('[data-pains-msg]', box);
  const items = $$<HTMLButtonElement>('[data-pain]', box);
  const paint = () => {
    const on = items.filter((b) => b.getAttribute('aria-pressed') === 'true');
    const n = on.length;
    if (msg) {
      msg.textContent = n === 0 ? copy.idle : n === 1 ? copy.one : n === items.length ? copy.all : copy.some.replace('{n}', String(n));
      msg.classList.toggle('is-on', n > 0);
    }
    document.dispatchEvent(new CustomEvent('lf:set', { detail: { name: 'pains', value: on.map((b) => b.dataset.pain).join(' · ') } }));
  };
  items.forEach((b) =>
    b.addEventListener('click', () => {
      b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      paint();
    }),
  );
}

/** Phones: a call-to-action bar shows up after the hero and hides near the form. */
function initSticky() {
  const bar = $('[data-esticky]');
  const hero = $('[data-ehero]');
  const form = $('#aplicar');
  if (!bar || !hero || !form) return;
  let pastHero = false;
  let nearForm = false;
  const paint = () => {
    const on = pastHero && !nearForm;
    bar.classList.toggle('is-on', on);
    if (on) {
      bar.removeAttribute('inert');
      bar.removeAttribute('aria-hidden');
      $('a', bar)?.removeAttribute('tabindex');
    } else {
      bar.setAttribute('inert', '');
      bar.setAttribute('aria-hidden', 'true');
    }
  };
  new IntersectionObserver(([e]) => {
    pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
    paint();
  }).observe(hero);
  inView(
    form.closest('section') || form,
    () => {
      nearForm = true;
      paint();
    },
    () => {
      nearForm = false;
      paint();
    },
  );
}

/** FAQ: smooth open/close for <details> (works without JS too). */
function initFaq() {
  $$<HTMLDetailsElement>('[data-qa]').forEach((d) => {
    const summary = $('summary', d)!;
    const body = $('.qa__a', d)!;
    summary.addEventListener('click', (e) => {
      if (reduceMotion()) return;
      e.preventDefault();
      if (d.open) {
        const h = body.offsetHeight;
        body.animate([{ height: `${h}px`, opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 300, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' }).onfinish = () => {
          d.open = false;
        };
      } else {
        d.open = true;
        const h = body.offsetHeight;
        body.animate([{ height: '0px', opacity: 0 }, { height: `${h}px`, opacity: 1 }], { duration: 380, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
      }
    });
  });
}

const boot = () => {
  initSmooth();
  initNav();
  initAnchors();
  initSky();
  initReveal();
  initEcoStickers($('[data-ehero]') ?? document);
  initKeycaps();
  initTags();
  initLeadForms();
  initEcoHero();
  initPains();
  initSticky();
  initFaq();
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
