// Shared building blocks for the portfolio artwork (rendered to WebP by render.py).
// Every artboard composes Liam's real captures (tools/studio/src) into device mockups.

export const css = /* css */ `
@font-face{font-family:'Inter Variable';src:url(fonts/inter-latin-opsz-normal.woff2) format('woff2-variations');font-weight:100 900}
@font-face{font-family:'Caveat';src:url(fonts/caveat-latin-wght-normal.woff2) format('woff2-variations');font-weight:400 700}
@font-face{font-family:'Modak';src:url(fonts/modak-latin-400-normal.woff2)}
*{box-sizing:border-box}
body{margin:0;background:#777;font-family:'Inter Variable',sans-serif;font-optical-sizing:auto;-webkit-font-smoothing:antialiased;display:flex;flex-wrap:wrap;gap:24px;padding:24px}
.ab{position:relative;overflow:hidden;flex:none}
.ab.alpha{overflow:visible;background:transparent}
.abs{position:absolute}
.fill{position:absolute;inset:0}
.grain::after{content:'';position:absolute;inset:-50%;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 1.4 -0.2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");background-size:240px;mix-blend-mode:overlay;opacity:var(--grain,.22);pointer-events:none;z-index:50}
.dots{background-image:radial-gradient(rgba(255,255,255,var(--dot,.12)) 1px,transparent 1.4px);background-size:var(--ds,14px) var(--ds,14px)}
.p3d{position:absolute;inset:0;perspective:var(--persp,1600px)}
.t3d{position:absolute;transform-style:preserve-3d}

/* phone */
.ph{position:absolute;aspect-ratio:9/18.9;border-radius:15.5%/7.2%;padding:2.9%;
  background:linear-gradient(150deg,#3a3a3f 0%,#121214 22%,#09090a 60%,#26262a 100%);
  box-shadow:inset 0 0 0 1.4px #55555c,inset 0 0 0 3px #0b0b0c,0 1px 2px rgba(0,0,0,.25),var(--sh,0 34px 60px -14px rgba(0,0,0,.5))}
.ph::before,.ph::after{content:'';position:absolute;width:1.4%;border-radius:3px;background:#1b1b1e}
.ph::before{left:-1.1%;top:19%;height:9%}
.ph::after{right:-1.1%;top:24%;height:14%}
.ph__scr{position:relative;width:100%;height:100%;border-radius:12.6%/5.8%;overflow:hidden;background:var(--scr,#000)}
.ph__scr>img{display:block;width:100%;height:auto}
.ph__isl{position:absolute;top:1.8%;left:50%;width:30%;height:3.5%;border-radius:99px;background:#050505;transform:translateX(-50%);z-index:3}
.ph__fs{position:absolute;left:0;top:0;width:393px;height:852px;transform-origin:0 0;overflow:hidden}
.fs{position:absolute;inset:0;overflow:hidden}
.ph__glare{position:absolute;inset:0;border-radius:inherit;background:linear-gradient(115deg,rgba(255,255,255,.16) 0%,rgba(255,255,255,0) 32%);z-index:4;pointer-events:none}

/* browser window */
.br{position:absolute;border-radius:var(--r,12px);overflow:hidden;background:var(--chrome,#f4f4f6);
  box-shadow:0 0 0 1px var(--edge,rgba(0,0,0,.08)),0 1px 2px rgba(0,0,0,.08),var(--sh,0 36px 70px -16px rgba(0,0,0,.4))}
.br__bar{position:relative;height:var(--bh,28px);display:flex;align-items:center;gap:6px;padding:0 11px;background:var(--chrome,#f4f4f6)}
.br__bar i{width:9px;height:9px;border-radius:50%;background:#ff5f57}
.br__bar i:nth-child(2){background:#febc2e}.br__bar i:nth-child(3){background:#28c840}
.br__url{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);height:17px;min-width:34%;padding:0 12px;border-radius:6px;background:var(--urlbg,rgba(0,0,0,.055));font-size:9.5px;color:var(--urlc,#6c6c72);display:flex;align-items:center;justify-content:center;gap:5px;letter-spacing:.01em}
.br__url svg{width:9px;height:9px}
.br__img{display:block;width:100%}

/* laptop */
.lp{position:absolute}
.lp__scr{position:relative;border-radius:2.6%/4%;padding:2.2% 2.2% 2.8%;background:linear-gradient(#1c1c1f,#0b0b0d);box-shadow:inset 0 0 0 1.4px #3d3d43,var(--sh,0 30px 60px -16px rgba(0,0,0,.45))}
.lp__scr>img{display:block;width:100%;border-radius:2px}
.lp__cam{position:absolute;top:.8%;left:50%;width:.9%;aspect-ratio:1;border-radius:50%;background:#2a2a2e;transform:translateX(-50%)}
.lp__base{position:relative;height:0;padding-bottom:3.2%;margin:0 -8.5%;border-radius:0 0 50% 50%/0 0 100% 100%;background:linear-gradient(#e4e5ea 0%,#c9cbd2 45%,#8d9098 100%);box-shadow:0 18px 30px -10px rgba(0,0,0,.4)}
.lp__base::before{content:'';position:absolute;left:50%;top:0;width:15%;height:38%;border-radius:0 0 8px 8px;background:#a9abb3;transform:translateX(-50%)}

/* crops of a capture */
.crop{position:absolute;background-repeat:no-repeat}
.card{position:absolute;overflow:hidden;border-radius:var(--r,14px);box-shadow:0 0 0 1px rgba(0,0,0,.05),0 1px 2px rgba(0,0,0,.06),var(--sh,0 24px 50px -12px rgba(0,0,0,.28))}
.card>.crop{position:relative}
`;

export const ab = (id, w, h, inner, { cls = '', style = '', out = 0 } = {}) =>
  `<div class="ab ${cls}" id="${id}"${out ? ` data-out="${out}"` : ''} style="width:${w}px;height:${h}px;${style}">${inner}</div>`;

/** Natural size of every capture in ./src (needed for crop maths). */
export const SIZE = {
  'fmoney-tablets': [960, 720],
  'advantis-dash': [960, 720],
  'advantis-landing': [960, 720],
  'ferox-phones': [960, 720],
  'sa-map': [500, 500],
  'swipeloop-desktop': [3000, 1460],
  'mendo-hero': [2990, 1462],
  'lucero-desktop': [2990, 1470],
  'guita-login': [986, 1480],
  'guita-hoy': [986, 1486],
  'lucero-mobile': [982, 1484],
  'holo-mobile': [994, 1492],
  pomodoro: [848, 1818],
  'crm-reportes': [2458, 1484],
  'clientix-hero': [1236, 720],
  'clientix-demo': [1236, 720],
  'clientix-find': [1236, 720],
  'clientix-write': [1236, 720],
  'clientix-rubros': [1236, 720],
  'nch-alien': [2798, 1506],
  'ferox-screen': [284, 612],
  'easyhome-logo': [1461, 362],
};
export const S = (name) => `src/${name}.webp`;

/** A rectangular piece of a capture, scaled to `w` px wide. */
export function crop(name, [x, y, cw, ch], w, extra = '') {
  const [W, H] = SIZE[name];
  const k = w / cw;
  return `<div class="crop" style="width:${w}px;height:${(ch * k).toFixed(2)}px;background-image:url(${S(name)});background-size:${(W * k).toFixed(2)}px ${(H * k).toFixed(2)}px;background-position:${(-x * k).toFixed(2)}px ${(-y * k).toFixed(2)}px;${extra}"></div>`;
}

/** A crop wrapped in a rounded, shadowed card. */
export const card = (name, box, w, style = '', r = 14) =>
  `<div class="card" style="--r:${r}px;${style}">${crop(name, box, w)}</div>`;

/**
 * Phone mockup (iPhone proportions: the screen is 393×852 pt).
 * Pass `screen` — a full 393×852 composition from screens.mjs — so the screen is always filled edge to edge.
 * (`src` pins a raw capture to the top and is only kept for captures that already have phone proportions.)
 */
export function phone({ src, screen, w, style = '', scr = '#000', imgStyle = '', glare = true }) {
  const k = (w * 0.942) / 393;
  const inner = screen
    ? `<div class="ph__fs" style="transform:scale(${k.toFixed(5)})">${screen}</div>`
    : `<img src="${S(src)}" style="${imgStyle}">`;
  return `<div class="ph" style="width:${w}px;--scr:${scr};${style}"><div class="ph__scr">${inner}<span class="ph__isl"></span>${glare ? '<span class="ph__glare"></span>' : ''}</div></div>`;
}

const lock = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`;

/** Browser window with a capture inside. `dark` switches the chrome to the dark theme. */
export function browser({ src, w, url = '', style = '', dark = false, img = '' }) {
  const theme = dark ? '--chrome:#1b1b1d;--urlbg:rgba(255,255,255,.08);--urlc:#9a9aa2;--edge:rgba(255,255,255,.08);' : '';
  const inner = img || `<img class="br__img" src="${S(src)}">`;
  return `<div class="br" style="width:${w}px;${theme}${style}"><div class="br__bar"><i></i><i></i><i></i><span class="br__url">${lock}${url}</span></div>${inner}</div>`;
}

/** Laptop mockup with a capture on screen. */
export function laptop({ src, w, style = '', img = '' }) {
  return `<div class="lp" style="width:${w}px;${style}"><div class="lp__scr"><span class="lp__cam"></span>${img || `<img src="${S(src)}">`}</div><div class="lp__base"></div></div>`;
}

/** Guita's mascot, redrawn as a vector so it stays crisp at any size. */
export const mascot = (w, style = '', mood = 'smile') => `
<svg viewBox="0 0 300 180" width="${w}" style="${style}" aria-hidden="true">
  <path d="M30 86c-10-4-14-18-10-30" stroke="#69cf92" stroke-width="13" stroke-linecap="round" fill="none"/>
  <path d="M270 86c10-4 14-18 10-30" stroke="#69cf92" stroke-width="13" stroke-linecap="round" fill="none"/>
  <rect x="34" y="12" width="232" height="158" rx="40" fill="#74d79c"/>
  <rect x="48" y="26" width="204" height="130" rx="30" fill="#8fe2b2"/>
  <path d="M48 56c0-16.6 13.4-30 30-30h144c16.6 0 30 13.4 30 30v14H48z" fill="#a1e8be"/>
  <circle cx="70" cy="48" r="7.5" fill="#d6f6e3"/>
  <circle cx="234" cy="136" r="7" fill="#d6f6e3"/>
  <circle cx="122" cy="84" r="13" fill="#15231b"/><circle cx="126" cy="79" r="4.2" fill="#fff"/>
  <circle cx="178" cy="84" r="13" fill="#15231b"/><circle cx="182" cy="79" r="4.2" fill="#fff"/>
  <ellipse cx="96" cy="110" rx="17" ry="10" fill="#e6a2a0" opacity=".9"/>
  <ellipse cx="204" cy="110" rx="17" ry="10" fill="#e6a2a0" opacity=".9"/>
  ${mood === 'wow'
    ? '<ellipse cx="150" cy="114" rx="9" ry="11" fill="#15231b"/>'
    : '<path d="M128 108c13 13 31 13 44 0" stroke="#15231b" stroke-width="7.5" stroke-linecap="round" fill="none"/>'}
</svg>`;

/** SVG filter that adds a die-cut white border around anything with transparency. */
export const dieCut = (id, r = 9) => `
<svg width="0" height="0" style="position:absolute"><filter id="${id}" x="-20%" y="-20%" width="140%" height="140%">
  <feMorphology in="SourceAlpha" operator="dilate" radius="${r}" result="d"/>
  <feGaussianBlur in="d" stdDeviation="1.2" result="b"/>
  <feComponentTransfer in="b" result="m"><feFuncA type="table" tableValues="0 0 1 1"/></feComponentTransfer>
  <feFlood flood-color="#fff"/><feComposite in2="m" operator="in" result="o"/>
  <feMorphology in="m" operator="dilate" radius="1" result="e"/>
  <feFlood flood-color="#000" flood-opacity=".13"/><feComposite in2="e" operator="in" result="edge"/>
  <feMerge><feMergeNode in="edge"/><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
</filter></svg>`;
