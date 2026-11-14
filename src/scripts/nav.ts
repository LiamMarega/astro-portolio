import { $, $$, onScroll } from './util';
import { scrollToY } from './smooth';

export function initNav() {
  const nav = $('[data-nav]');
  if (!nav) return;
  const pill = $('[data-nav-pill]', nav)!;
  const main = $('[data-nav-main]', nav)!;
  const indicator = $('[data-nav-indicator]', nav)!;
  const links = $$<HTMLAnchorElement>('[data-nav-link]', nav);
  const sections = links
    .map((l) => document.getElementById(l.dataset.navLink!))
    .filter((s): s is HTMLElement => !!s);

  let active = '';

  const place = (id: string, animate = true) => {
    const link = links.find((l) => l.dataset.navLink === id);
    if (!link) return;
    const list = link.offsetParent as HTMLElement;
    const x = link.offsetLeft + (list?.offsetLeft ?? 0);
    if (!animate) indicator.classList.add('no-anim');
    indicator.style.setProperty('--ind-x', `${x}px`);
    indicator.style.setProperty('--ind-w', `${link.offsetWidth}px`);
    if (!animate) {
      void indicator.offsetWidth;
      indicator.classList.remove('no-anim');
    }
  };

  const setActive = (id: string, animate = true) => {
    if (id === active) return;
    active = id;
    links.forEach((l) => {
      const on = l.dataset.navLink === id;
      l.classList.toggle('is-active', on);
      if (on) l.setAttribute('aria-current', 'true');
      else l.removeAttribute('aria-current');
    });
    place(id, animate);
  };

  const measure = () => {
    const w = Math.ceil(main.scrollWidth);
    pill.style.setProperty('--w-main', `${w}px`);
    const close = $('.nav__close', nav)!;
    const cta = $('.nav__cta', nav)!;
    const min = close.offsetWidth + cta.offsetWidth + 7 + 70;
    pill.style.setProperty('--w-case', `${Math.max(w + 82, min)}px`);
    if (active) place(active, false);
  };

  // section tracking
  onScroll((y, vh) => {
    if (document.documentElement.classList.contains('is-case')) return;
    let current = sections[0]?.id ?? 'hey';
    const line = vh * 0.6;
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= line) current = s.id;
    }
    // bottom of the page always means the last section
    if (y + vh >= document.documentElement.scrollHeight - 4) current = sections[sections.length - 1].id;
    setActive(current, true);
  });

  links.forEach((l) =>
    l.addEventListener('click', (e) => {
      const id = l.dataset.navLink!;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = id === 'hey' ? 0 : target.getBoundingClientRect().top + window.scrollY;
      scrollToY(top);
      history.replaceState(null, '', id === 'hey' ? location.pathname : `#${id}`);
    }),
  );

  measure();
  setActive('hey', false);
  document.fonts?.ready.then(measure);
  window.addEventListener('resize', measure);
}

/** Remember a language switch so the next page skips the sunrise intro (see Base.astro). */
document.querySelector('.nav__lang')?.addEventListener('click', () => {
  try {
    sessionStorage.setItem('lang-switch', '1');
  } catch {}
});
