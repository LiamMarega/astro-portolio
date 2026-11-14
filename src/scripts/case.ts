import { $, $$, reduceMotion } from './util';
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

  /* ── view transitions: the card grows into the case-study sheet while its logo and title fly to the header ── */
  type Trio = { sheet?: Element | null; logo?: Element | null; title?: Element | null };
  const NAMES = { sheet: 'vt-sheet', logo: 'vt-logo', title: 'vt-title' } as const;
  const named: HTMLElement[] = [];
  const hidden: HTMLElement[] = [];
  const visibleEnough = (el: Element | null | undefined) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.bottom > 0 && r.top < innerHeight;
  };
  const name = (t: Trio, onlyVisible = false) => {
    for (const k of ['sheet', 'logo', 'title'] as const) {
      const el = t[k];
      if (!(el instanceof HTMLElement) || (onlyVisible && !visibleEnough(el))) continue;
      el.style.viewTransitionName = NAMES[k];
      named.push(el);
    }
  };
  const unname = () => named.splice(0).forEach((el) => (el.style.viewTransitionName = ''));
  const panelOf = (slug: string) => panels.find((p) => p.dataset.casePanel === slug);
  const panelTrio = (slug: string): Trio => {
    const panel = panelOf(slug);
    return { sheet: scroller, logo: panel?.querySelector('.case__logo'), title: panel?.querySelector('.case__title') };
  };
  const cardTrio = (slug: string): Trio => {
    const card = $(`[data-pcard="${slug}"]`);
    return { sheet: card, logo: card?.querySelector('.pcard__logo'), title: card?.querySelector('.pcard__title') };
  };
  /** Where a click came from: a project card, or a polaroid of the wheel (which grows into the sheet on its own). */
  const sourceTrio = (slug: string, link: HTMLElement | null): Trio => {
    const pol = link?.closest<HTMLElement>('.pol');
    return pol ? { sheet: pol } : cardTrio(slug);
  };
  let current = 0;
  const morph = (from: Trio, update: () => void, to: () => Trio, mode: 'case' | 'swap', hide?: Element | null) => {
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
    if (!doc.startViewTransition || reduceMotion() || !Object.values(from).some(visibleEnough)) {
      update();
      return;
    }
    const token = ++current;
    unname();
    root.classList.remove('vt-case', 'vt-swap');
    root.classList.add(`vt-${mode}`);
    name(from, true);
    const vt = doc.startViewTransition(() => {
      unname();
      update();
      // the source stays in the page under the fading overlay: hide it so it doesn't show twice
      if (hide instanceof HTMLElement) {
        hide.style.visibility = 'hidden';
        hidden.push(hide);
      }
      name(to(), true);
    });
    vt.finished.finally(() => {
      if (token !== current) return; // a newer transition took over (it cleans up after itself)
      unname();
      hidden.splice(0).forEach((el) => (el.style.visibility = ''));
      root.classList.remove(`vt-${mode}`);
    });
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
      // "next project": its little logo grows into the new header
      morph({ logo: link.querySelector('.case__next-logo') }, () => open(slug), () => ({ logo: panelTrio(slug).logo }), 'swap');
    } else {
      history.pushState({ case: slug }, '', `#work/${slug}`);
      pushed = true;
      const from = sourceTrio(slug, link);
      const to = from.logo ? () => panelTrio(slug) : () => ({ sheet: scroller });
      morph(from, () => open(slug, link), to, 'case', from.sheet);
    }
  });

  /** Closes with the reverse flight (header → card) when the card is on screen behind the sheet. */
  const closeAnimated = () => {
    const slug = openSlug;
    if (!slug) return;
    const back = sourceTrio(slug, opener);
    morph(back.logo ? panelTrio(slug) : { sheet: scroller }, close, () => back, 'case');
  };

  const requestClose = () => {
    if (pushed && history.state?.case) {
      history.back();
    } else {
      history.replaceState(null, '', location.pathname + location.search);
      closeAnimated();
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
    else closeAnimated();
  });

  const initial = slugFromHash();
  if (initial) open(initial);
}
