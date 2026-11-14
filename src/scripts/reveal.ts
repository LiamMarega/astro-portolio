import { $$, draw } from './util';

/** One-shot reveals: cards, headings that "ink in", soft fades and doodles. */
export function initReveal() {
  const once = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        if (el.matches('[data-reveal], [data-fade]')) el.classList.add('is-in');
        if (el.matches('[data-ink]')) el.classList.add('is-inked');
        if (el.matches('[data-draw]')) draw(el);
        once.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0 },
  );
  $$('[data-reveal], [data-fade], [data-ink], [data-draw]').forEach((el) => once.observe(el));
}
