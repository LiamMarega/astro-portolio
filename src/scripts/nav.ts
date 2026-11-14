import { $, $$, onScroll } from './util';
import { scrollToY } from './smooth';

export function initNav() {
  const nav = $('[data-nav]');
  if (!nav) return;
  const pill = $('[data-nav-pill]', nav)!;
  const main = $('[data-nav-main]', nav)!;
  const indicator = $('[data-nav-indicator]', nav)!;
  const all = $$<HTMLAnchorElement>('[data-nav-key]', nav);
  // links that track an in-page section while scrolling
  const links = all.filter((l) => l.dataset.navLink && document.getElementById(l.dataset.navLink));
  const sections = links.map((l) => document.getElementById(l.dataset.navLink!)!);
  const initial = all.find((l) => l.classList.contains('is-active'))?.dataset.navKey ?? '';

  let active = '';

  const place = (key: string, animate = true) => {
    const link = all.find((l) => l.dataset.navKey === key);
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
      const on = l.dataset.navKey === key;
      l.classList.toggle('is-active', on);
      if (on) l.setAttribute('aria-current', l.dataset.navLink ? 'true' : 'page');
      else l.removeAttribute('aria-current');
    });
    place(key, animate);
  };

  const measure = () => {
    const w = Math.ceil(main.scrollWidth);
    pill.style.setProperty('--w-main', `${w}px`);
    const close = $('.nav__close', nav);
    const cta = $('[data-nav-case-cta]', nav);
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
        if (s.getBoundingClientRect().top <= line) current = links[i].dataset.navKey!;
      });
      // bottom of the page always means the last section
      if (y + vh >= document.documentElement.scrollHeight - 4) current = links[links.length - 1].dataset.navKey!;
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

  setActive(initial, false);
  measure();
  document.fonts?.ready.then(measure);
  window.addEventListener('resize', measure);
}

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
