import { $, $$, onScroll } from './util';
import { scrollToY } from './smooth';

export function initNav() {
  const nav = $('[data-nav]');
  if (!nav) return;
  const pill = $('[data-nav-pill]', nav)!;
  const main = $('[data-nav-main]', nav)!;
  const indicator = $('[data-nav-indicator]', nav)!;
  // Every link has a key: `data-nav-key` on pages with their own items, the section id on the home nav.
  const keyOf = (l: HTMLElement) => l.dataset.navKey ?? l.dataset.navLink ?? '';
  const all = $$<HTMLAnchorElement>('[data-nav-key], [data-nav-link]', nav);
  // links that track an in-page section while scrolling
  const links = all.filter((l) => l.dataset.navLink && document.getElementById(l.dataset.navLink));
  const sections = links.map((l) => document.getElementById(l.dataset.navLink!)!);
  // key of the item marked active in the markup ('' = none yet)
  const initial = keyOf(all.find((l) => l.classList.contains('is-active')) ?? nav);

  let active = '';

  const place = (key: string, animate = true) => {
    const link = all.find((l) => keyOf(l) === key);
    indicator.classList.toggle('is-off', !link || link.offsetWidth === 0);
    if (!link || link.offsetWidth === 0) return;
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

  const setActive = (key: string, animate = true) => {
    if (key === active) return;
    active = key;
    all.forEach((l) => {
      const on = keyOf(l) === key;
      l.classList.toggle('is-active', on);
      if (on) l.setAttribute('aria-current', l.dataset.navLink ? 'true' : 'page');
      else l.removeAttribute('aria-current');
    });
    place(key, animate);
  };

  const measure = () => {
    const w = Math.ceil(main.scrollWidth);
    pill.style.setProperty('--w-main', `${w}px`);
    // the case-study layer only exists on the home nav
    const close = $('.nav__close', nav);
    const cta = $('.nav__cta:not(.nav__cta--main)', nav);
    if (close && cta) {
      const min = close.offsetWidth + cta.offsetWidth + 7 + 70;
      pill.style.setProperty('--w-case', `${Math.max(w + 82, min)}px`);
    }
    if (active) place(active, false);
  };

  // section tracking (only when the page has tracked sections)
  if (sections.length) {
    onScroll((y, vh) => {
      if (document.documentElement.classList.contains('is-case')) return;
      // before the first tracked section, fall back to the item marked active in the markup
      let current = initial;
      const line = vh * 0.6;
      sections.forEach((s, i) => {
        if (s.getBoundingClientRect().top <= line) current = keyOf(links[i]);
      });
      // bottom of the page always means the last section
      if (y + vh >= document.documentElement.scrollHeight - 4) current = keyOf(links[links.length - 1]);
      setActive(current, true);
    });
  }

  links.forEach((l) =>
    l.addEventListener('click', (e) => {
      const id = l.dataset.navLink!;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.closest('[data-hero]') || id === 'hey' ? 0 : target.getBoundingClientRect().top + window.scrollY - scrollOffset(target);
      scrollToY(top);
      history.replaceState(null, '', id === 'hey' ? location.pathname : `#${id}`);
    }),
  );

  measure();
  setActive(initial, false);
  document.fonts?.ready.then(measure);
  window.addEventListener('resize', measure);
}

/** Remember a language switch so the next page skips the sunrise intro (see Base.astro). */
document.querySelector('.nav__lang')?.addEventListener('click', () => {
  try {
    sessionStorage.setItem('lang-switch', '1');
  } catch {}
});

/** Honors `scroll-margin-top` so fixed UI never covers the heading we scroll to. */
export function scrollOffset(el: Element) {
  return parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
}

/**
 * Smooth-scrolls every in-page link (`href="#id"`) that is not handled elsewhere.
 * Case study links (#work/slug) and nav links keep their own handlers.
 */
export function initAnchors() {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a || a.hasAttribute('data-open-case') || a.hasAttribute('data-nav-link')) return;
    const id = decodeURIComponent(a.getAttribute('href')!.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    scrollToY(target.getBoundingClientRect().top + window.scrollY - scrollOffset(target));
    // move keyboard focus with the scroll, without jumping
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    window.setTimeout(() => target.focus({ preventScroll: true }), 650);
  });
}
