import { $, $$ } from './util';
import { pauseScroll } from './smooth';

export function initCase() {
  const root = document.documentElement;
  const wrap = $('[data-case]');
  if (!wrap) return;
  const scroller = $('[data-case-scroller]', wrap)!;
  const panels = $$('[data-case-panel]', wrap);
  const navMain = $('[data-nav-main]');
  const navCase = $('[data-nav-case]');
  let openSlug = '';
  let opener: HTMLElement | null = null;
  let pushed = false;

  const setInert = (el: Element | null, on: boolean) => {
    if (!el) return;
    if (on) {
      el.setAttribute('inert', '');
      el.setAttribute('aria-hidden', 'true');
    } else {
      el.removeAttribute('inert');
      el.removeAttribute('aria-hidden');
    }
  };

  const show = (slug: string) => {
    const panel = panels.find((p) => p.dataset.casePanel === slug);
    if (!panel) return false;
    panels.forEach((p) => (p.hidden = p !== panel));
    scroller.scrollTop = 0;
    return true;
  };

  const open = (slug: string, from?: HTMLElement | null) => {
    if (!show(slug)) return;
    if (!openSlug) {
      opener = from ?? (document.activeElement as HTMLElement);
      root.classList.add('is-case');
      setInert(wrap, false);
      setInert(navCase, false);
      setInert(navMain, true);
      setInert($('main'), true);
      pauseScroll(true);
    }
    openSlug = slug;
    requestAnimationFrame(() => scroller.focus({ preventScroll: true }));
  };

  const close = () => {
    if (!openSlug) return;
    openSlug = '';
    root.classList.remove('is-case');
    setInert(wrap, true);
    setInert(navCase, true);
    setInert(navMain, false);
    setInert($('main'), false);
    pauseScroll(false);
    opener?.focus({ preventScroll: true });
    opener = null;
  };

  const slugFromHash = () => {
    const m = location.hash.match(/^#work\/([\w-]+)/);
    return m ? m[1] : '';
  };

  document.addEventListener('click', (e) => {
    const link = (e.target as Element).closest<HTMLElement>('[data-open-case]');
    if (!link) return;
    e.preventDefault();
    const slug = link.dataset.openCase!;
    if (openSlug) {
      history.replaceState({ case: slug }, '', `#work/${slug}`);
      open(slug);
    } else {
      history.pushState({ case: slug }, '', `#work/${slug}`);
      pushed = true;
      open(slug, link);
    }
  });

  const requestClose = () => {
    if (pushed && history.state?.case) {
      history.back();
    } else {
      history.replaceState(null, '', location.pathname + location.search);
      close();
    }
    pushed = false;
  };

  $$('[data-case-close]').forEach((b) => b.addEventListener('click', requestClose));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && openSlug) requestClose();
  });

  window.addEventListener('popstate', () => {
    const slug = slugFromHash();
    if (slug) open(slug);
    else close();
  });

  const initial = slugFromHash();
  if (initial) open(initial);
}
