import { $, $$, draw, inView, reduceMotion } from './util';
import { isPagePaused, onPagePause } from './smooth';

/* ── rotating wheel of polaroids (RotatingCards-style) ── */
export function initRing() {
  const ring = $('[data-ring]');
  const wheel = ring && $('[data-ring-wheel]', ring);
  if (!ring || !wheel) return;
  const pols = $$<HTMLElement>('.pol', ring);
  const n = pols.length;
  const reduce = reduceMotion();
  const SPEED = 360 / 38; // degrees per second: a new polaroid every ~2.4 s

  let rot = 0;
  let vel = 0; // inertia after a flick, deg/s
  let factor = 1; // 1 = turning, 0 = held under the pointer
  let target = 1;
  let visible = false;
  let raf = 0;
  let last = 0;

  const layout = () => {
    const W = ring.clientWidth;
    const H = ring.clientHeight;
    const narrow = window.innerWidth < 761;
    const cw = narrow ? Math.max(118, Math.min(190, W * 0.42)) : Math.max(130, Math.min(300, W * 0.315));
    const R = (n * cw * 1.1) / (2 * Math.PI);
    ring.style.setProperty('--cw', `${cw.toFixed(1)}px`);
    ring.style.setProperty('--R', `${R.toFixed(1)}px`);
    ring.style.setProperty('--cy', `${(H * (narrow ? 0.5 : 0.44) + R).toFixed(1)}px`);
  };
  layout();
  new ResizeObserver(layout).observe(ring);

  const kick = () => {
    if (!raf && visible && !isPagePaused()) raf = requestAnimationFrame(frame);
  };
  function frame(t: number) {
    raf = 0;
    if (!visible || isPagePaused()) return;
    const dt = last ? Math.min((t - last) / 1000, 0.1) : 1 / 60;
    last = t;
    factor += (target - factor) * (1 - Math.exp(-dt / (target < factor ? 0.16 : 0.45)));
    if (!drag?.moved) {
      rot += (reduce ? 0 : SPEED * factor) * dt + vel * dt;
      vel *= Math.exp(-dt / 0.55);
      if (Math.abs(vel) < 1) vel = 0;
    }
    wheel!.style.transform = `rotate(${rot.toFixed(3)}deg)`;
    if (!reduce || vel || drag) kick();
  }

  /* hover / focus holds the wheel */
  ring.addEventListener('pointerover', (e) => {
    if (e.pointerType !== 'touch' && (e.target as Element).closest('.pol')) target = 0;
  });
  ring.addEventListener('pointerout', (e) => {
    if (e.pointerType !== 'touch' && !(e.relatedTarget as Element | null)?.closest?.('.pol')) target = 1;
  });
  ring.addEventListener('focusin', () => (target = 0));
  ring.addEventListener('focusout', () => (target = 1));

  /* drag to spin, with a flick */
  let drag: { id: number; x: number; y: number; cx: number; cy: number; ang: number; moved: boolean; samples: { t: number; d: number }[] } | null = null;
  let suppressClick = false;
  const angleFrom = (cx: number, cy: number, x: number, y: number) => (Math.atan2(y - cy, x - cx) * 180) / Math.PI;
  ring.addEventListener('pointerdown', (e) => {
    if (!e.isPrimary || e.button > 0) return;
    const c = wheel.getBoundingClientRect();
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, cx: c.left, cy: c.top, ang: angleFrom(c.left, c.top, e.clientX, e.clientY), moved: false, samples: [] };
  });
  ring.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.moved) {
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 6) return;
      drag.moved = true;
      vel = 0;
      ring.classList.add('is-dragging');
      try {
        ring.setPointerCapture(e.pointerId);
      } catch {}
    }
    const a = angleFrom(drag.cx, drag.cy, e.clientX, e.clientY);
    const d = ((a - drag.ang + 540) % 360) - 180;
    drag.ang = a;
    rot += d;
    const t = performance.now();
    drag.samples.push({ t, d });
    while (drag.samples.length > 2 && t - drag.samples[0].t > 110) drag.samples.shift();
    kick();
  });
  const end = (e: PointerEvent) => {
    if (!drag || e.pointerId !== drag.id) return;
    if (drag.moved) {
      suppressClick = true;
      window.setTimeout(() => (suppressClick = false), 0);
      const t = performance.now();
      const recent = drag.samples.filter((s) => t - s.t < 110);
      if (recent.length && t - recent[recent.length - 1].t < 60) {
        const span = Math.max((t - recent[0].t) / 1000, 1 / 60);
        vel = Math.max(-260, Math.min(260, recent.reduce((sum, s) => sum + s.d, 0) / span));
      }
      ring.classList.remove('is-dragging');
    }
    drag = null;
    kick();
  };
  ring.addEventListener('pointerup', end);
  ring.addEventListener('pointercancel', end);
  // a drag that ends over a polaroid must not open its case study
  ring.addEventListener(
    'click',
    (e) => {
      if (!suppressClick) return;
      e.preventDefault();
      e.stopPropagation();
      suppressClick = false;
    },
    true,
  );

  /* polaroids that link to a project work from the keyboard too */
  pols.forEach((p) => {
    if (!p.dataset.openCase) return;
    p.tabIndex = 0;
    p.setAttribute('role', 'link');
    p.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        p.click();
      }
    });
  });

  /* fetch every photo a bit before the wheel shows up (most of them start off-card) */
  inView(
    ring,
    () => $$<HTMLImageElement>('img', ring).forEach((img) => (img.loading = 'eager')),
    () => {},
    { rootMargin: '700px 0px' },
  );
  inView(
    ring,
    () => {
      visible = true;
      last = 0;
      $$('.ring__d', ring).forEach((d) => draw(d, true));
      kick();
    },
    () => {
      visible = false;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      last = 0;
    },
  );
  onPagePause((paused) => {
    if (paused) {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      last = 0;
    } else {
      last = 0;
      kick();
    }
  });
}

export function initTags() {
  const tags = $('[data-tags]');
  if (!tags || reduceMotion()) return;
  let t = 0;
  let visible = false;
  let running = false;
  const loop = (stacked: boolean) => {
    if (!running) return;
    tags.classList.toggle('is-stacked', stacked);
    t = window.setTimeout(() => loop(!stacked), stacked ? 1500 : 3300);
  };
  const sync = () => {
    const active = visible && !isPagePaused();
    if (active && !running) {
      running = true;
      t = window.setTimeout(() => loop(true), 2200);
    } else if (!active && running) {
      running = false;
      clearTimeout(t);
      if (!visible) tags.classList.remove('is-stacked');
    }
  };
  inView(
    tags,
    () => {
      visible = true;
      sync();
    },
    () => {
      visible = false;
      sync();
    },
    { threshold: 0.3 },
  );
  onPagePause(sync);
}

/* ── peelable stickers on the text cards (WebGL, mounted lazily) ── */
export function initStickers() {
  const zones = $$('[data-peel-zone]');
  if (!zones.length) return;
  let mod: Promise<typeof import('./peel')> | null = null;
  const load = () => (mod ??= import('./peel'));
  const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));
  {
    const sizeFor = (w: number) => {
      const vw = window.innerWidth;
      return vw < 900 ? Math.max(96, Math.min(140, vw * 0.22)) : Math.max(84, Math.min(190, (w * vw) / 1466));
    };
    zones.forEach((zone) => {
      const io = new IntersectionObserver(
        async (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          io.disconnect();
          const { createPeel, peelSupported } = await load();
          if (!peelSupported()) return;
          const imgs = $$<HTMLImageElement>('img[data-peel]', zone);
          let ready = 0;
          const made: { base: number; peel: ReturnType<typeof createPeel> }[] = [];
          // Stagger WebGL context + texture/hull initialization across separate frames
          for (let i = 0; i < imgs.length; i++) {
            if (i > 0) await nextFrame();
            const img = imgs[i];
            const W = zone.clientWidth;
            const H = zone.clientHeight;
            const fx = parseFloat(img.dataset.x || '0');
            const fy = parseFloat(img.dataset.y || '0');
            const narrow = window.innerWidth < 900;
            const y = narrow ? Math.max(90, Math.min(140, window.innerWidth * 0.19)) - H / 2 : fy * H;
            const base = parseFloat(img.dataset.width || '130');
            made.push({
              base,
              peel: createPeel(zone, {
                imageSrc: img.currentSrc || img.src,
                width: sizeFor(base),
                rotate: parseFloat(img.dataset.rotate || '0'),
                initialPosition: { x: fx * W, y },
                label: img.alt,
                curlRadius: 10,
                peelBackHoverPct: 24,
                peelBackActivePct: 38,
                shadowIntensity: 0.55,
                onReady: () => {
                  if (++ready === imgs.length) zone.classList.add('peel-on');
                },
              }),
            });
          }
          let rzRaf = 0;
          window.addEventListener(
            'resize',
            () => {
              cancelAnimationFrame(rzRaf);
              rzRaf = requestAnimationFrame(() => made.forEach((m) => m.peel?.setWidth(sizeFor(m.base))));
            },
            { passive: true },
          );
        },
        { rootMargin: '500px 0px' },
      );
      io.observe(zone);
    });
  }
}

/* ── impact numbers count up the first time they show ── */
export function initImpact() {
  const nums = $$('[data-count]');
  if (!nums.length || reduceMotion()) return;
  nums.forEach((el) => {
    const raw = el.dataset.count || el.textContent || '';
    const m = raw.match(/^([\d.,]+)(.*)$/);
    if (!m) return;
    const sep = /[.,]\d{3}/.test(m[1]) ? m[1].match(/[.,]/)![0] : '';
    const target = parseInt(m[1].replace(/[.,]/g, ''), 10);
    const suffix = m[2];
    const fmt = (n: number) => {
      const s = String(n);
      return sep ? s.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : s;
    };
    let done = false;
    inView(
      el,
      () => {
        if (done) return;
        done = true;
        const t0 = performance.now();
        const dur = 1300;
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(Math.round(target * e)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        el.textContent = fmt(0) + suffix;
        requestAnimationFrame(tick);
      },
      undefined,
      { threshold: 0.6 },
    );
  });
}
