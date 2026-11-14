// Shared building blocks for the placeholder artwork (rendered to WebP by render.py).
// Everything here is original, hand-made mock UI — swap the resulting images for your own work.

export const css = /* css */ `
@font-face{font-family:'Inter Variable';src:url(fonts/inter-latin-opsz-normal.woff2) format('woff2-variations');font-weight:100 900}
@font-face{font-family:'Caveat Brush';src:url(fonts/caveat-brush-latin-400-normal.woff2)}
@font-face{font-family:'Modak';src:url(fonts/modak-latin-400-normal.woff2)}
@font-face{font-family:'Instrument Serif';src:url(fonts/instrument-serif-latin-400-normal.woff2)}
@font-face{font-family:'Instrument Serif';font-style:italic;src:url(fonts/instrument-serif-latin-400-italic.woff2)}
*{box-sizing:border-box}
body{margin:0;background:#777;font-family:'Inter Variable',sans-serif;font-optical-sizing:auto;-webkit-font-smoothing:antialiased;display:flex;flex-wrap:wrap;gap:24px;padding:24px}
.ab{position:relative;overflow:hidden;flex:none}
.abs{position:absolute}
.fill{position:absolute;inset:0}
.grain::after{content:'';position:absolute;inset:-50%;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 1.4 -0.2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");background-size:240px;mix-blend-mode:overlay;opacity:var(--grain,.32);pointer-events:none;z-index:50}
.vignette::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 75% at 50% 45%,transparent 55%,rgba(0,0,0,.45));z-index:49;pointer-events:none}

/* ---------- website mock ---------- */
.site{position:absolute;left:0;top:0;width:var(--sw,1280px);height:var(--sh,800px);transform-origin:0 0;transform:scale(var(--k,.5));overflow:hidden;font-family:'Inter Variable',sans-serif;color:var(--ink);background:var(--bg)}
.site__nav{display:flex;align-items:center;gap:34px;height:76px;padding:0 48px;font-size:15px;color:var(--muted)}
.site__brand{display:flex;align-items:center;gap:9px;font-weight:650;font-size:19px;color:var(--ink);letter-spacing:-.01em;margin-right:auto}
.site__brand svg{width:24px;height:24px}
.site__links{display:flex;gap:30px;position:absolute;left:50%;transform:translateX(-50%)}
.site__btn{height:38px;padding:0 16px;border-radius:10px;display:inline-flex;align-items:center;font-weight:550;font-size:14px}
.site__btn--ghost{border:1px solid var(--line);color:var(--ink)}
.site__btn--fill{background:var(--accent);color:var(--accentInk)}
.site__hero{padding:70px 48px 0;text-align:var(--align,center)}
.site__eyebrow{display:inline-flex;gap:8px;align-items:center;padding:6px 12px;border-radius:999px;border:1px solid var(--line);font-size:13px;color:var(--muted);margin-bottom:26px}
.site__h1{font-size:var(--h1,76px);line-height:1.02;font-weight:550;letter-spacing:-.045em;margin:0 var(--mr,auto) 0 var(--ml,auto);max-width:var(--h1w,900px)}
.site__sub{margin-left:var(--ml,auto)!important}
.site__sub{font-size:19px;line-height:1.45;color:var(--muted);max-width:560px;margin:24px auto 0}
.site__form{display:flex;gap:10px;justify-content:center;margin-top:34px}
.site__input{width:300px;height:50px;border-radius:12px;border:1px solid var(--line);display:flex;align-items:center;padding:0 16px;color:var(--muted);font-size:15px;background:var(--inputBg,transparent)}
.site__cta{height:50px;padding:0 22px;border-radius:12px;background:var(--accent);color:var(--accentInk);display:flex;align-items:center;font-weight:600;font-size:15px}
.site__cards{display:flex;gap:18px;justify-content:center;margin-top:56px;padding:0 48px}
.card{border-radius:16px;overflow:hidden;position:relative;flex:none}

/* ---------- devices ---------- */
.stage3d{position:absolute;inset:0;perspective:1600px;perspective-origin:50% 40%}
.lap{position:absolute;transform-style:preserve-3d}
.lap__screen{position:absolute;inset:0;border-radius:22px;background:#0b0b0c;padding:16px;box-shadow:inset 0 0 0 2px #2a2a2c, 0 40px 80px rgba(0,0,0,.55)}
.lap__display{position:relative;width:100%;height:100%;overflow:hidden;border-radius:8px;background:#fff}
.lap__deck{position:absolute;left:-6%;right:-6%;top:100%;height:70%;transform-origin:50% 0;transform:rotateX(78deg);border-radius:0 0 28px 28px;background:linear-gradient(#3a3b40,#1d1e22);box-shadow:inset 0 2px 0 rgba(255,255,255,.15)}
.lap__keys{position:absolute;left:9%;right:9%;top:9%;height:52%;background:repeating-linear-gradient(90deg,#111214 0 7.2%,transparent 7.2% 7.7%),repeating-linear-gradient(0deg,#111214 0 17%,transparent 17% 20%);opacity:.9;border-radius:6px}
.phone{position:absolute;border-radius:16%/7.6%;background:#0d0d0f;padding:3.2%;box-shadow:inset 0 0 0 2px #39393d,0 30px 60px rgba(0,0,0,.35)}
.phone__screen{position:relative;width:100%;height:100%;border-radius:13%/6.2%;overflow:hidden;background:#fff}
.phone__screen::before{content:'';position:absolute;top:2%;left:50%;width:32%;height:3.9%;border-radius:99px;background:#0d0d0f;transform:translateX(-50%);z-index:5}
.tablet{position:absolute;border-radius:6%/8.6%;background:#0d0d0f;padding:2.6%;box-shadow:inset 0 0 0 2px #3a3a3e,0 40px 80px rgba(0,0,0,.5)}
.tablet__screen{position:relative;width:100%;height:100%;border-radius:3.6%/5.4%;overflow:hidden}
`;

export const ab = (id, w, h, inner, { cls = '', style = '' } = {}) =>
  `<div class="ab ${cls}" id="${id}" style="width:${w}px;height:${h}px;${style}">${inner}</div>`;

export const logos = {
  leaf: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M24 37c-8.5-4.6-12.8-10.4-12.8-17.1C11.2 13.6 16.4 10 24 10s12.8 3.6 12.8 9.9C36.8 26.6 32.5 32.4 24 37z M24 37V20"/></svg>`,
  bolt: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M27.5 8.5 14.5 26h9l-3 13.5L33.5 22h-9z"/></svg>`,
  rings: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.6"><circle cx="24" cy="24" r="12.5"/><circle cx="24" cy="24" r="6.2"/></svg>`,
  loop: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 30.5a8.5 8.5 0 1 1 6-14.5l8 8a8.5 8.5 0 1 0 6-2.5M30.5 30h4.5v4.5"/></svg>`,
  spark: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M24 9.5c1.3 7.5 5 11.2 12.5 12.5C29 23.3 25.3 27 24 34.5 22.7 27 19 23.3 11.5 22 19 20.7 22.7 17 24 9.5z"/></svg>`,
  shield: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M24 8.5 36 13v9.2c0 7.6-4.9 13.6-12 16.3-7.1-2.7-12-8.7-12-16.3V13zM18.5 23.5l4 4 7-8"/></svg>`,
  dot: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="12" fill="currentColor"/></svg>`,
  orbit: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.6"><ellipse cx="24" cy="24" rx="16" ry="8" transform="rotate(-30 24 24)"/><circle cx="24" cy="24" r="4.5" fill="currentColor"/></svg>`,
};

/** A website mock. Rendered at design size then scaled with --k. */
export function site(o) {
  const vars = {
    '--bg': o.bg ?? '#fff',
    '--ink': o.ink ?? '#0f0f10',
    '--muted': o.muted ?? '#6b6b70',
    '--line': o.line ?? 'rgba(0,0,0,.12)',
    '--accent': o.accent ?? '#111',
    '--accentInk': o.accentInk ?? '#fff',
    '--align': o.align ?? 'center',
    '--h1': o.h1 ?? '76px',
    '--h1w': o.h1w ?? '900px',
    '--sw': (o.sw ?? 1280) + 'px',
    '--sh': (o.sh ?? 800) + 'px',
    '--k': o.k ?? 0.5,
    '--inputBg': o.inputBg ?? 'transparent',
    ...(o.align === 'left' ? { '--ml': '0', '--mr': 'auto' } : {}),
  };
  const style = Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(';') + ';' + (o.style ?? '');
  const links = (o.links ?? ['Product', 'Solutions', 'Pricing', 'Company']).map((l) => `<span>${l}</span>`).join('');
  return `<div class="site" style="${style}">
    ${o.backdrop ?? ''}
    <div class="site__nav" style="position:relative;z-index:2">
      <span class="site__brand">${logos[o.logo ?? 'dot']}${o.brand}</span>
      <span class="site__links">${links}</span>
      ${o.login === false ? '' : `<span class="site__btn site__btn--ghost">${o.login ?? 'Log in'}</span>`}
      <span class="site__btn site__btn--fill">${o.cta ?? 'Get started'}</span>
    </div>
    <div class="site__hero" style="position:relative;z-index:2">
      ${o.eyebrow ? `<div class="site__eyebrow">${o.eyebrow}</div>` : ''}
      <h1 class="site__h1" style="${o.h1Style ?? ''}">${o.headline}</h1>
      ${o.sub ? `<p class="site__sub" style="${o.subStyle ?? ''}">${o.sub}</p>` : ''}
      ${o.form ? `<div class="site__form" style="justify-content:${o.align === 'left' ? 'flex-start' : 'center'}"><span class="site__input">${o.form[0]}</span><span class="site__cta">${o.form[1]}</span></div>` : ''}
      ${o.buttons ? `<div class="site__form" style="justify-content:${o.align === 'left' ? 'flex-start' : 'center'}">${o.buttons}</div>` : ''}
    </div>
    ${o.after ?? ''}
  </div>`;
}

/** Laptop in perspective. `display` is the html shown on screen (sized to dw×dh css px). */
export function laptop({ x, y, w, h, rx = 16, ry = -18, rz = 3, display, deck = true }) {
  return `<div class="stage3d"><div class="lap" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform:rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)">
    <div class="lap__screen"><div class="lap__display">${display}</div></div>
    ${deck ? `<div class="lap__deck"><div class="lap__keys"></div></div>` : ''}
  </div></div>`;
}

export function phone({ x, y, w, h, rot = 0, screen, style = '' }) {
  return `<div class="phone" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform:rotate(${rot}deg);${style}"><div class="phone__screen">${screen}</div></div>`;
}

export function tablet({ x, y, w, h, transform = '', screen, style = '' }) {
  return `<div class="tablet" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform:${transform};${style}"><div class="tablet__screen">${screen}</div></div>`;
}

/** Soft "photo" backdrop made of blurred light blobs + grain */
export function photoBg(stops) {
  return stops
    .map(([x, y, r, c, o = 1]) => `<div class="abs" style="left:${x}%;top:${y}%;width:${r}%;aspect-ratio:1;border-radius:50%;background:${c};opacity:${o};filter:blur(${Math.round(r * 0.9)}px);transform:translate(-50%,-50%)"></div>`)
    .join('');
}

export const bars = (vals, color, gap = 4, radius = 3) =>
  `<div style="display:flex;align-items:flex-end;gap:${gap}px;height:100%">${vals
    .map((v) => `<i style="flex:1;height:${v}%;border-radius:${radius}px;background:${color}"></i>`)
    .join('')}</div>`;

export const lines = (n, w = [90, 70, 80, 60], color = 'rgba(0,0,0,.12)', h = 6, gap = 7) =>
  Array.from({ length: n }, (_, i) => `<i style="display:block;height:${h}px;width:${w[i % w.length]}%;border-radius:${h}px;background:${color};margin-top:${i ? gap : 0}px"></i>`).join('');
