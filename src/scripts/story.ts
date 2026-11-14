import { $, $$, draw, inView, reduceMotion } from './util';

const REST = [-3.2, 2.6, -2.2, 3, -2.6, 2.2, -1.8];

export function initPolaroids() {
  const box = $('[data-polaroids]');
  if (!box) return;
  const pols = $$('[data-pol]', box);
  const groups = $$('[data-pol-doodles]', box);
  const n = pols.length;
  let active = 0;
  const offsets = new Map<HTMLElement, number>();

  const wrap = (d: number) => {
    let o = ((d % n) + n) % n;
    if (o > n / 2) o -= n;
    return o;
  };

  const layout = (animate: boolean) => {
    pols.forEach((p, i) => {
      const o = wrap(i - active);
      const prev = offsets.get(p);
      const jump = prev !== undefined && Math.abs(prev - o) > 1.5;
      if (!animate || jump) p.classList.add('no-anim');
      const rot = o === 0 ? REST[i % REST.length] : o < 0 ? -7 - Math.abs(o) * 3 : 9 + o * 3;
      p.style.setProperty('--x', String(o));
      p.style.setProperty('--rot', `${rot}deg`);
      p.style.setProperty('--ty', `${Math.abs(o) * 6}px`);
      p.style.zIndex = String(10 - Math.abs(o));
      p.style.visibility = Math.abs(o) > 2 ? 'hidden' : '';
      p.setAttribute('aria-hidden', o === 0 ? 'false' : 'true');
      offsets.set(p, o);
      if (!animate || jump) {
        void p.offsetWidth;
        p.classList.remove('no-anim');
      }
    });
  };

  const doodles = (i: number, on: boolean) => {
    const g = groups[i];
    if (!g) return;
    $$('svg', g).forEach((svg) => draw(svg, on));
  };

  layout(false);

  if (reduceMotion()) {
    $$('svg', groups[0]).forEach((s) => s.classList.add('is-drawn'));
    return;
  }

  let timers: number[] = [];
  let running = false;
  const clear = () => {
    timers.forEach(clearTimeout);
    timers = [];
  };

  const cycle = () => {
    if (!running) return;
    doodles(active, true);
    timers.push(
      window.setTimeout(() => doodles(active, false), 2350),
      window.setTimeout(() => {
        active = (active + 1) % n;
        layout(true);
        timers.push(window.setTimeout(cycle, 720));
      }, 2700),
    );
  };

  const start = () => {
    if (running) return;
    running = true;
    clear();
    timers.push(window.setTimeout(cycle, 250));
  };
  const stop = () => {
    running = false;
    clear();
  };

  inView(box, start, stop, { threshold: 0.25 });

  // tap / click to skip ahead
  box.addEventListener('click', () => {
    if (!running) return;
    clear();
    doodles(active, false);
    active = (active + 1) % n;
    layout(true);
    timers.push(window.setTimeout(cycle, 720));
  });
}

export function initTags() {
  if (reduceMotion()) return;
  $$('[data-tags]').forEach((tags) => {
    let t = 0;
    let running = false;
    const loop = (stacked: boolean) => {
      if (!running) return;
      tags.classList.toggle('is-stacked', stacked);
      t = window.setTimeout(() => loop(!stacked), stacked ? 1500 : 3300);
    };
    inView(
      tags,
      () => {
        if (running) return;
        running = true;
        t = window.setTimeout(() => loop(true), 2200);
      },
      () => {
        running = false;
        clearTimeout(t);
        tags.classList.remove('is-stacked');
      },
      { threshold: 0.3 },
    );
  });
}
