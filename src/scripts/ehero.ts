import { $, $$, inView, reduceMotion } from './util';

interface Order {
  n: number;
  items: string;
  amount: number;
}

/** /ecommerce hero: new orders keep landing on the "phone" and the day's sales tick up. */
export function initEcoHero() {
  const list = $('[data-ehero-toasts]');
  const total = $('[data-ehero-total]');
  if (!list || !total || reduceMotion()) return;
  const orders: Order[] = JSON.parse(list.dataset.orders || '[]');
  const L = JSON.parse(list.dataset.labels || '{}') as { app: string; order: string; now: string; ago: string; currency: string };
  if (orders.length < 3) return;

  const money = (n: number) => `${L.currency}${Math.round(n).toLocaleString('es-CO')}`;
  const ago = ['', '2', '6', '11'];
  const template = list.querySelector('li')!.cloneNode(true) as HTMLLIElement;
  let next = 2;
  let value = Number(total.dataset.value) || 0;
  let timer = 0;
  let running = false;

  const max = () => (window.innerWidth < 560 ? 2 : 3);

  const tween = (from: number, to: number) => {
    const t0 = performance.now();
    const dur = 700;
    total.classList.add('is-bump');
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      total.textContent = money(from + (to - from) * e);
      if (p < 1) requestAnimationFrame(step);
      else window.setTimeout(() => total.classList.remove('is-bump'), 500);
    };
    requestAnimationFrame(step);
  };

  const push = () => {
    const o = orders[next % orders.length];
    next++;
    const li = template.cloneNode(true) as HTMLLIElement;
    li.classList.remove('is-in');
    li.classList.add('is-new');
    $('.htoast__title', li)!.textContent = `${L.order} #${o.n + Math.floor((next - 1) / orders.length) * orders.length}`;
    $('.htoast__text', li)!.textContent = `${o.items} · ${money(o.amount)}`;
    list.prepend(li);
    void li.offsetHeight;
    li.classList.add('is-in');

    // older notifications age a little
    $$('[data-when]', list).forEach((w, i) => {
      w.textContent = i === 0 ? L.now : L.ago.replace('{n}', ago[Math.min(i, ago.length - 1)]);
    });

    // keep only the newest few
    const items = $$<HTMLLIElement>('.htoast', list);
    items.slice(max()).forEach((old) => {
      old.classList.remove('is-in');
      window.setTimeout(() => old.remove(), 600);
    });

    const from = value;
    value += o.amount;
    tween(from, value);
  };

  const loop = () => {
    if (!running) return;
    push();
    timer = window.setTimeout(loop, 3000);
  };

  let onScreen = false;
  const start = () => {
    if (running || !onScreen || document.hidden) return;
    running = true;
    timer = window.setTimeout(loop, 1600);
  };
  const stop = () => {
    running = false;
    clearTimeout(timer);
  };

  inView(
    list.closest('[data-ehero-visual]') || list,
    () => {
      onScreen = true;
      start();
    },
    () => {
      onScreen = false;
      stop();
    },
  );

  // pause in background tabs so notifications don't pile up
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
}
