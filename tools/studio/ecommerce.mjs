// Placeholder artwork for /ecommerce: five fictional stores (hero + 4 cases) and the share image.
// Original, hand-made mock UI. Swap the rendered WebPs in public/img/ecommerce for your real work.
import { ab, laptop, phone, photoBg, lines } from './lib.mjs';

const A = [];
const PSCR = `<style>.pscr>*{flex-shrink:0}</style>`;

/* ───────────── marks & icons ───────────── */
const mark = {
  sun: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"><path d="M24 16.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 1 0 0-15zM24 6v4.5M24 37.5V42M6 24h4.5M37.5 24H42M11.3 11.3l3.2 3.2M33.5 33.5l3.2 3.2M11.3 36.7l3.2-3.2M33.5 14.5l3.2-3.2"/></svg>`,
  bean: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"><path d="M24 9c7.6 0 12.5 6.6 12.5 15S31.6 39 24 39s-12.5-6.6-12.5-15S16.4 9 24 9zM24 9.5c-4.2 4.6-4.2 9.6 0 14.5s4.2 9.9 0 14.5"/></svg>`,
  sprout: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M24 39V22M24 27c-7.6 0-11.8-4.6-11.8-11.6 7.6 0 11.8 4.6 11.8 11.6zM24 22c0-7 4.2-11.6 11.8-11.6 0 7-4.2 11.6-11.8 11.6z"/></svg>`,
  pulse: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 25h8l4.5-10.5 7.5 20 5-13 3 3.5h5"/></svg>`,
  house: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 22.5 24 11l14 11.5M14 19.5V37h20V19.5M21 37v-8.5h6V37"/></svg>`,
};
const ico = {
  search: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>`,
  user: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5c1.2-4 4-6 7.5-6s6.3 2 7.5 6"/></svg>`,
  bag: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M5 8h14l-1 12.5H6z"/><path d="M9 10V7a3 3 0 0 1 6 0v3" stroke-linecap="round"/></svg>`,
  back: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12.5l4 4 8-9"/></svg>`,
  wa: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.5a9.4 9.4 0 0 0-8.1 14.2L2.6 21.5l4.9-1.3A9.4 9.4 0 1 0 12 2.5zm5.3 13.3c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.8-1.1-4.6-4-4.8-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.2 1 2.2 1.4 2.5 1.5.3.2.5.1.7-.1l.9-1.1c.2-.3.5-.2.7-.1l2 1c.3.1.5.2.5.4.1.1.1.8-.1 1.3z"/></svg>`,
};
const stars = (n = 5, c = '#f5b400', size = 11) =>
  `<span style="color:${c};font-size:${size}px;letter-spacing:1px">${'★'.repeat(n)}</span>`;

/* ───────────── products (SVG) ───────────── */
const coffeeBag = (body, label, ink, name = 'BRASA', sub = 'ORIGEN HUILA', size = 12.5) => `
<svg viewBox="0 0 120 160" style="width:100%;height:auto;display:block;overflow:visible">
  <ellipse cx="60" cy="156" rx="46" ry="5" fill="rgba(0,0,0,.22)"/>
  <path d="M20 26 L100 26 L106 148 Q106 155 99 155 L21 155 Q14 155 14 148 Z" fill="${body}"/>
  <path d="M24 12 L96 12 L100 28 L20 28 Z" fill="${body}" opacity=".88"/>
  <path d="M24 12 L96 12 L97 17 L23 17 Z" fill="rgba(255,255,255,.14)"/>
  <circle cx="60" cy="46" r="4.5" fill="rgba(255,255,255,.16)"/>
  <rect x="31" y="62" width="58" height="66" rx="5" fill="${label}"/>
  <text x="60" y="88" text-anchor="middle" font-family="Inter Variable" font-weight="800" font-size="${size}" letter-spacing="1.2" fill="${ink}">${name}</text>
  <text x="60" y="102" text-anchor="middle" font-family="Inter Variable" font-weight="600" font-size="6.2" letter-spacing="1" fill="${ink}" opacity=".8">${sub}</text>
  <path d="M44 114h32" stroke="${ink}" stroke-width="1.6" opacity=".45"/>
  <path d="M24 34 L27 146" stroke="rgba(255,255,255,.12)" stroke-width="5" stroke-linecap="round"/>
</svg>`;

const dropper = (glass, label, cap, name = 'FLORA', sub = 'SÉRUM C') => `
<svg viewBox="0 0 80 170" style="width:100%;height:auto;display:block;overflow:visible">
  <ellipse cx="40" cy="166" rx="26" ry="3.5" fill="rgba(0,0,0,.16)"/>
  <rect x="33" y="4" width="14" height="24" rx="7" fill="${cap}"/>
  <rect x="27" y="25" width="26" height="18" rx="3.5" fill="${cap}"/>
  <path d="M19 52 Q19 44 27 44 L53 44 Q61 44 61 52 L62 156 Q62 163 55 163 L25 163 Q18 163 18 156 Z" fill="${glass}"/>
  <rect x="24" y="86" width="32" height="48" rx="3" fill="${label}"/>
  <text x="40" y="104" text-anchor="middle" font-family="Instrument Serif" font-size="11" fill="#2f3d2c">${name.toLowerCase()}</text>
  <text x="40" y="117" text-anchor="middle" font-family="Inter Variable" font-weight="600" font-size="4.6" letter-spacing=".8" fill="#2f3d2c">${sub}</text>
  <path d="M25 56 L25 150" stroke="rgba(255,255,255,.4)" stroke-width="3.2" stroke-linecap="round"/>
</svg>`;

const jar = (body, lid, label, name = 'flora') => `
<svg viewBox="0 0 120 100" style="width:100%;height:auto;display:block;overflow:visible">
  <ellipse cx="60" cy="97" rx="44" ry="3.5" fill="rgba(0,0,0,.15)"/>
  <rect x="18" y="8" width="84" height="22" rx="6" fill="${lid}"/>
  <path d="M14 30 H106 V84 Q106 95 95 95 H25 Q14 95 14 84 Z" fill="${body}"/>
  <rect x="30" y="46" width="60" height="30" rx="4" fill="${label}"/>
  <text x="60" y="66" text-anchor="middle" font-family="Instrument Serif" font-size="15" fill="#2f3d2c">${name}</text>
  <path d="M20 36 V86" stroke="rgba(255,255,255,.35)" stroke-width="3.5" stroke-linecap="round"/>
</svg>`;

const sneaker = (upper, sole = '#fff', ink = '#111', accent = '#111') => `
<svg viewBox="0 0 200 112" style="width:100%;height:auto;display:block;overflow:visible">
  <ellipse cx="102" cy="106" rx="88" ry="5" fill="rgba(0,0,0,.22)"/>
  <path d="M14 72 C14 54 30 46 48 44 L84 40 C94 25 110 16 126 18 C140 20 144 34 152 43 C166 55 188 59 191 73 L191 85 L14 85 Z" fill="${upper}" stroke="${ink}" stroke-width="3.2" stroke-linejoin="round"/>
  <path d="M9 85 L195 85 L193 96 Q191 103 182 103 L21 103 Q12 103 10 96 Z" fill="${sole}" stroke="${ink}" stroke-width="3.2" stroke-linejoin="round"/>
  <path d="M95 42 L103 64 M109 35 L117 59 M123 30 L129 55" stroke="${ink}" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M38 66 C70 58 112 62 156 72" stroke="${accent}" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M150 44 C160 36 172 38 178 46" stroke="${ink}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>
</svg>`;

const tee = (c, ink, word = 'PULSO') => `
<svg viewBox="0 0 160 160" style="width:100%;height:auto;display:block;overflow:visible">
  <path d="M52 18 L30 27 L8 56 L31 72 L41 62 L41 148 L119 148 L119 62 L129 72 L152 56 L130 27 L108 18 C102 31 92 38 80 38 C68 38 58 31 52 18 Z" fill="${c}"/>
  <path d="M52 18 C58 31 68 38 80 38 C92 38 102 31 108 18" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="3"/>
  <text x="80" y="96" text-anchor="middle" font-family="Inter Variable" font-weight="900" font-size="20" letter-spacing="-.5" fill="${ink}">${word}</text>
</svg>`;

const cushion = (c, pattern, line = 'rgba(0,0,0,.18)') => `
<svg viewBox="0 0 140 130" style="width:100%;height:auto;display:block;overflow:visible">
  <ellipse cx="70" cy="125" rx="54" ry="4" fill="rgba(0,0,0,.14)"/>
  <path d="M14 16 Q70 4 126 16 Q138 64 126 112 Q70 124 14 112 Q2 64 14 16 Z" fill="${c}"/>
  ${pattern === 'stripes' ? `<path d="M10 44 Q70 38 130 44 M8 64 Q70 58 132 64 M10 84 Q70 78 130 84" stroke="${line}" stroke-width="5" fill="none"/>` : ''}
  ${pattern === 'dots' ? Array.from({ length: 12 }, (_, i) => `<circle cx="${32 + (i % 4) * 25}" cy="${38 + Math.floor(i / 4) * 26}" r="4" fill="${line}"/>`).join('') : ''}
  ${pattern === 'zig' ? `<path d="M16 70 L30 56 L44 70 L58 56 L72 70 L86 56 L100 70 L114 56 L126 68" stroke="${line}" stroke-width="5" fill="none" stroke-linejoin="round"/>` : ''}
  <path d="M14 16 Q70 4 126 16" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="3"/>
</svg>`;

const vase = (c, stem = '#6b6b3a') => `
<svg viewBox="0 0 90 170" style="width:100%;height:auto;display:block;overflow:visible">
  <path d="M45 76 C40 50 30 30 18 18 M45 76 C48 46 58 26 72 12 M45 76 C44 54 44 36 46 8" stroke="${stem}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <ellipse cx="18" cy="18" rx="7" ry="4" fill="${stem}" transform="rotate(-40 18 18)"/>
  <ellipse cx="72" cy="12" rx="7" ry="4" fill="${stem}" transform="rotate(30 72 12)"/>
  <ellipse cx="46" cy="8" rx="6" ry="3.5" fill="${stem}"/>
  <ellipse cx="45" cy="166" rx="30" ry="3.5" fill="rgba(0,0,0,.15)"/>
  <path d="M33 70 H57 V82 C57 90 74 98 74 124 C74 150 62 164 45 164 C28 164 16 150 16 124 C16 98 33 90 33 82 Z" fill="${c}"/>
  <path d="M24 108 C24 128 28 148 36 156" stroke="rgba(255,255,255,.3)" stroke-width="4" fill="none" stroke-linecap="round"/>
</svg>`;

const blanket = (c, stripe) => `
<svg viewBox="0 0 160 120" style="width:100%;height:auto;display:block;overflow:visible">
  <ellipse cx="80" cy="116" rx="66" ry="4" fill="rgba(0,0,0,.14)"/>
  <path d="M16 30 Q80 14 144 30 L140 104 Q80 116 20 104 Z" fill="${c}"/>
  <path d="M18 52 Q80 38 142 52 M19 74 Q80 62 141 74" stroke="${stripe}" stroke-width="7" fill="none"/>
  ${Array.from({ length: 11 }, (_, i) => `<path d="M${24 + i * 11.2} ${105 + Math.sin(i) * 1.5} v8" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`).join('')}
</svg>`;

/* ───────────── storefront mock (1280 × 800, scaled with k) ───────────── */
function store(o) {
  const vars = {
    '--bg': o.bg,
    '--ink': o.ink,
    '--muted': o.muted,
    '--line': o.line ?? 'rgba(0,0,0,.1)',
    '--accent': o.accent,
    '--accentInk': o.accentInk,
    '--sw': (o.sw ?? 1280) + 'px',
    '--sh': (o.sh ?? 800) + 'px',
    '--k': o.k,
  };
  const style = Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(';');
  const links = o.links.map((l) => `<span>${l}</span>`).join('');
  return `<div class="site" style="${style};${o.style ?? ''}">
    ${o.announce ? `<div style="height:36px;display:flex;align-items:center;justify-content:center;gap:10px;font-size:13.5px;font-weight:560;letter-spacing:.01em;background:${o.annBg};color:${o.annInk}">${o.announce}</div>` : ''}
    <div class="site__nav" style="position:relative;z-index:3;${o.navStyle ?? ''}">
      <span class="site__brand" style="${o.brandStyle ?? ''}">${o.brand}</span>
      <span class="site__links" style="${o.linksStyle ?? ''}">${links}</span>
      <span style="display:flex;gap:20px;align-items:center;color:var(--ink)">${ico.search}${ico.user}<span style="position:relative;display:flex">${ico.bag}<b style="position:absolute;right:-9px;top:-7px;min-width:17px;height:17px;padding:0 4px;border-radius:9px;background:var(--accent);color:var(--accentInk);font-size:10.5px;display:grid;place-items:center">${o.cart ?? 2}</b></span></span>
    </div>
    ${o.hero}
    ${o.after ?? ''}
  </div>`;
}

const productCard = ({ art, name, price, was, bg, ink = '#111', muted = '#777', badge, badgeBg = '#111', badgeInk = '#fff', rating = true, w = 268, artW = '58%' }) => `
  <div style="width:${w}px;flex:none">
    <div style="position:relative;height:${Math.round(w * 0.92)}px;border-radius:16px;background:${bg};display:grid;place-items:center;overflow:hidden">
      ${badge ? `<span style="position:absolute;left:12px;top:12px;padding:5px 9px;border-radius:8px;background:${badgeBg};color:${badgeInk};font-size:11.5px;font-weight:650">${badge}</span>` : ''}
      <span style="position:absolute;right:12px;top:12px;color:${muted}">${ico.heart}</span>
      <div style="width:${artW}">${art}</div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:12px;font-size:15px;font-weight:600;color:${ink}"><span>${name}</span><span>${price}</span></div>
    <div style="display:flex;justify-content:space-between;margin-top:4px;font-size:12.5px;color:${muted}">${rating ? `<span>${stars(5, '#f5b400', 11)} <span style="margin-left:2px">4,9</span></span>` : '<span></span>'}${was ? `<s>${was}</s>` : ''}</div>
  </div>`;

/* ═════════════════════ HERO STORE · "tu marca" ═════════════════════ */
const heroStore = (k) =>
  store({
    k,
    bg: '#fffaf0',
    ink: '#141414',
    muted: '#6d6a62',
    accent: '#ffd60a',
    accentInk: '#141414',
    announce: '✦ Envío gratis desde $150.000 &nbsp;·&nbsp; Paga en cuotas sin interés',
    annBg: '#141414',
    annInk: '#ffd84a',
    brand: `<span style="width:26px;height:26px;color:#141414">${mark.sun}</span><span style="font-size:22px;font-weight:720;letter-spacing:-.03em">tu marca</span>`,
    links: ['Novedades', 'Colecciones', 'Más vendidos', 'Nosotros'],
    hero: `
    <div style="display:grid;grid-template-columns:1fr 1.08fr;gap:36px;padding:34px 48px 0">
      <div style="padding-top:34px">
        <span style="display:inline-flex;align-items:center;gap:8px;padding:7px 13px;border-radius:99px;background:#fff1b3;font-size:13.5px;font-weight:600">● Nueva colección</span>
        <h1 style="margin:22px 0 0;font-size:70px;line-height:.98;font-weight:620;letter-spacing:-.045em">Tu producto,<br>en primera fila.</h1>
        <p style="margin:20px 0 0;max-width:420px;font-size:18px;line-height:1.45;color:#6d6a62">Lo que vendes, presentado como se merece. Y comprarlo, a dos toques.</p>
        <div style="display:flex;gap:12px;margin-top:30px">
          <span style="height:54px;padding:0 26px;border-radius:14px;background:#141414;color:#ffd84a;display:flex;align-items:center;font-weight:650;font-size:16px">Comprar ahora</span>
          <span style="height:54px;padding:0 22px;border-radius:14px;border:1.5px solid rgba(0,0,0,.14);display:flex;align-items:center;font-weight:600;font-size:16px">Ver colección</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;margin-top:28px;font-size:14px;color:#6d6a62">
          <span style="display:flex">${['#ffb27a', '#bfd3b0', '#9cc7ff', '#f2b59a'].map((c, i) => `<i style="width:30px;height:30px;border-radius:50%;background:${c};border:2.5px solid #fffaf0;margin-left:${i ? -9 : 0}px"></i>`).join('')}</span>
          ${stars(5, '#f5b400', 13)} <b style="color:#141414">4,9</b> · 1.240 reseñas
        </div>
      </div>
      <div style="position:relative;height:520px;border-radius:26px;background:radial-gradient(ellipse 80% 70% at 70% 20%,#ffe46b 0%,#ffd60a 40%,#fec81a 100%);overflow:hidden">
        <div class="abs" style="left:-60px;bottom:-90px;width:380px;height:380px;border-radius:50%;background:rgba(255,255,255,.28)"></div>
        <div class="abs" style="left:60px;bottom:52px;width:150px">${coffeeBag('#141414', '#fffaf0', '#141414', 'TU MARCA', 'EDICIÓN 01', 9.6)}</div>
        <div class="abs" style="left:226px;bottom:44px;width:94px">${dropper('#fffaf0', '#141414', '#141414', 'tu marca', 'SÉRUM')}</div>
        <div class="abs" style="right:44px;bottom:50px;width:190px">${sneaker('#fffaf0', '#141414', '#141414', '#ffd60a')}</div>
        <span class="abs" style="right:28px;top:26px;padding:9px 14px;border-radius:12px;background:#141414;color:#ffd84a;font-weight:700;font-size:15px;transform:rotate(4deg)">−20% hoy</span>
        <span class="abs" style="left:28px;top:30px;display:flex;align-items:center;gap:8px;padding:9px 13px;border-radius:12px;background:#fff;font-weight:600;font-size:13.5px;box-shadow:0 10px 24px rgba(0,0,0,.12)">${stars(5, '#f5b400', 12)} “¡Llegó en 24 h!”</span>
      </div>
    </div>`,
  });

A.push(
  ab(
    'ecommerce/hero-store',
    760,
    500,
    `
  <div class="fill" style="background:linear-gradient(170deg,#fff6d6 0%,#ffe891 55%,#ffd94a 100%)"></div>
  ${photoBg([
    [82, 10, 60, 'radial-gradient(circle,#fff,transparent 70%)', 0.7],
    [10, 90, 70, 'radial-gradient(circle,#ffc400,transparent 70%)', 0.55],
  ])}
  ${laptop({ x: 92, y: 26, w: 590, h: 392, rx: 10, ry: -12, rz: 2.4, display: heroStore(0.4359) })}
  `,
    { cls: 'grain', style: '--grain:.16' },
  ),
);

/* ═════════════════════ BRASA CAFÉ ═════════════════════ */
const bOr = '#e8692c';
const brasaSite = (k) =>
  store({
    k,
    bg: '#17100b',
    ink: '#f4ead9',
    muted: 'rgba(244,234,217,.62)',
    line: 'rgba(244,234,217,.16)',
    accent: bOr,
    accentInk: '#1a0f08',
    announce: 'Tostamos los lunes &nbsp;·&nbsp; Envío gratis desde $120.000',
    annBg: bOr,
    annInk: '#1a0f08',
    brand: `<span style="width:26px;height:26px;color:${bOr}">${mark.bean}</span><span style="font-size:23px;font-weight:760;letter-spacing:-.035em">brasa</span>`,
    links: ['Cafés', 'Suscripción', 'Métodos', 'Nosotros'],
    hero: `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:40px 48px 0;position:relative">
      <div style="padding-top:30px">
        <span style="display:inline-flex;padding:7px 13px;border-radius:99px;border:1px solid rgba(244,234,217,.2);font-size:13.5px;color:rgba(244,234,217,.8)">☕ Café de origen colombiano</span>
        <h1 style="margin:22px 0 0;font-size:72px;line-height:.98;font-weight:680;letter-spacing:-.045em">Café de origen,<br><span style="color:${bOr}">tostado esta semana.</span></h1>
        <p style="margin:22px 0 0;max-width:440px;font-size:18px;line-height:1.5;color:rgba(244,234,217,.7)">De fincas de Huila y Nariño directo a tu taza. Suscríbete y ahorra 15 % en cada envío.</p>
        <div style="display:flex;gap:12px;margin-top:32px">
          <span style="height:54px;padding:0 26px;border-radius:99px;background:${bOr};color:#1a0f08;display:flex;align-items:center;font-weight:700;font-size:16px">Elegir mi café</span>
          <span style="height:54px;padding:0 22px;border-radius:99px;border:1.5px solid rgba(244,234,217,.25);display:flex;align-items:center;font-weight:600;font-size:16px">Cómo funciona la suscripción</span>
        </div>
      </div>
      <div style="position:relative;height:540px">
        <div class="abs" style="left:40px;top:20px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(232,105,44,.55),rgba(232,105,44,0) 68%)"></div>
        <div class="abs" style="left:96px;top:120px;width:170px;transform:rotate(-8deg)">${coffeeBag('#2a1a12', '#f4ead9', '#2a1a12', 'BRASA', 'HUILA LAVADO')}</div>
        <div class="abs" style="left:300px;top:92px;width:190px;transform:rotate(5deg)">${coffeeBag('#f4ead9', bOr, '#1a0f08', 'BRASA', 'NARIÑO HONEY')}</div>
        <div class="abs" style="left:218px;top:250px;width:150px;transform:rotate(-2deg)">${coffeeBag('#3b2416', '#d9a441', '#1a0f08', 'BRASA', 'DESCAFEINADO')}</div>
        ${Array.from({ length: 9 }, (_, i) => `<i class="abs" style="left:${80 + ((i * 53) % 420)}px;top:${430 + ((i * 37) % 60)}px;width:16px;height:22px;border-radius:50%;background:#5a3420;transform:rotate(${i * 40}deg);box-shadow:inset -3px 0 0 #3a2012"></i>`).join('')}
      </div>
    </div>`,
  });

A.push(
  ab(
    'ecommerce/brasa-site',
    715,
    480,
    `
  <div class="fill" style="background:#0d0906"></div>
  ${photoBg([
    [80, 10, 70, 'radial-gradient(circle,#8a4a22,#3a2010 60%,transparent 70%)', 0.9],
    [100, 70, 60, 'radial-gradient(circle,#5a2e18,transparent 70%)', 0.8],
    [6, 24, 45, 'radial-gradient(circle,#2a1a10,transparent 70%)', 0.9],
  ])}
  ${laptop({ x: 146, y: 22, w: 560, h: 362, rx: 12, ry: -10, rz: 3.4, display: brasaSite(0.4125) })}
  `,
    { cls: 'grain vignette', style: '--grain:.34' },
  ),
);

const brasaPhone = `
  <div class="pscr" style="height:100%;background:#fbf6ee;font-family:'Inter Variable';color:#1a0f08;display:flex;flex-direction:column">
    <div style="display:flex;justify-content:space-between;align-items:center;padding:44px 16px 8px">${ico.back}<span style="display:flex;align-items:center;gap:5px;font-weight:760;font-size:15px;letter-spacing:-.03em"><span style="width:16px;height:16px;color:${bOr}">${mark.bean}</span>brasa</span>${ico.bag}</div>
    <div style="position:relative;margin:4px 12px 0;height:132px;border-radius:16px;background:radial-gradient(ellipse 70% 80% at 50% 60%,#ffb27a,${bOr})">
      <div class="abs" style="left:50%;top:12px;width:78px;transform:translateX(-50%) rotate(-4deg)">${coffeeBag('#2a1a12', '#f4ead9', '#2a1a12', 'BRASA', 'HUILA LAVADO')}</div>
      <span class="abs" style="left:10px;top:10px;padding:4px 8px;border-radius:7px;background:#1a0f08;color:#ffcfa8;font-size:9.5px;font-weight:650">Más vendido</span>
    </div>
    <div style="display:flex;gap:5px;justify-content:center;margin-top:8px">${[1, 0, 0, 0].map((a) => `<i style="width:${a ? 14 : 5}px;height:5px;border-radius:3px;background:${a ? '#1a0f08' : '#d8cfc2'}"></i>`).join('')}</div>
    <div style="padding:8px 16px 0">
      <div style="font-size:18px;font-weight:700;letter-spacing:-.02em">Huila Lavado</div>
      <div style="font-size:10.5px;color:#8a7d6e;margin-top:2px">340 g · Notas a panela y durazno</div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px"><span>${stars(5, '#e8a400', 10.5)} <span style="font-size:10px;color:#8a7d6e">4,9 (214)</span></span><b style="font-size:16px">$54.900</b></div>
      <div style="font-size:10.5px;font-weight:600;margin-top:10px">Molienda</div>
      <div style="display:flex;gap:6px;margin-top:5px">${['Grano', 'Espresso', 'Filtro'].map((t, i) => `<span style="padding:6px 10px;border-radius:99px;font-size:10px;font-weight:600;${i === 0 ? 'background:#1a0f08;color:#ffcfa8' : 'border:1px solid #e3d8ca'}">${t}</span>`).join('')}</div>
      <div style="margin-top:10px;display:grid;gap:6px">
        <div style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:11px;border:1px solid #e3d8ca;font-size:10.5px"><i style="width:13px;height:13px;border-radius:50%;border:1.5px solid #c9bcab"></i><span style="flex:1">Compra única</span><b>$54.900</b></div>
        <div style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:11px;border:1.6px solid ${bOr};background:#fff1e6;font-size:10.5px"><i style="width:13px;height:13px;border-radius:50%;border:4px solid ${bOr};background:#fff"></i><span style="flex:1"><b>Suscripción</b> · cada 30 días<br><span style="color:${bOr};font-weight:650">Ahorras 15 %</span></span><b>$46.665</b></div>
      </div>
      <div style="margin-top:10px;height:40px;border-radius:99px;background:#1a0f08;color:#ffcfa8;display:grid;place-items:center;font-size:12.5px;font-weight:700">Agregar al carrito</div>
      <div style="display:flex;justify-content:center;gap:10px;margin-top:8px;font-size:9px;color:#8a7d6e"><span>🚚 Llega en 24-48 h</span><span>↺ Cancela cuando quieras</span></div>
    </div>
  </div>`;

A.push(
  ab(
    'ecommerce/brasa-phone',
    424,
    480,
    `
  <div class="fill" style="background:linear-gradient(165deg,#f6e6d2,#ebcfae)"></div>
  <div class="abs" style="right:-60px;top:-50px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,#ffb27a,transparent 70%);opacity:.85"></div>
  ${PSCR}${phone({ x: 96, y: 14, w: 236, h: 500, rot: -4, screen: brasaPhone })}
  `,
  ),
);

/* ═════════════════════ FLORA BOTÁNICA ═════════════════════ */
const fSage = '#9bb08f';
const fForest = '#2f3d2c';
const floraSite = (k) =>
  store({
    k,
    bg: '#f6f2ea',
    ink: '#23301f',
    muted: '#6b7565',
    accent: fForest,
    accentInk: '#f6f2ea',
    announce: 'Rutinas con 15 % OFF &nbsp;·&nbsp; Muestras gratis en cada pedido',
    annBg: '#dfe7d6',
    annInk: '#23301f',
    brand: `<span style="width:26px;height:26px;color:${fForest}">${mark.sprout}</span><span style="font-family:'Instrument Serif';font-size:28px;font-weight:400;letter-spacing:-.01em">flora botánica</span>`,
    links: ['Rostro', 'Cuerpo', 'Rutinas', 'Ingredientes'],
    hero: `
    <div style="display:grid;grid-template-columns:1.05fr 1fr;gap:30px;padding:30px 48px 0">
      <div style="padding-top:44px">
        <h1 style="margin:0;font-family:'Instrument Serif';font-weight:400;font-size:84px;line-height:.98;letter-spacing:-.02em">Tu piel, con<br>ingredientes que<br><i>puedes pronunciar.</i></h1>
        <p style="margin:22px 0 0;max-width:430px;font-size:18px;line-height:1.5;color:#6b7565">Cosmética natural hecha en pequeños lotes. Sin rellenos ni perfumes raros.</p>
        <div style="display:flex;gap:12px;margin-top:30px">
          <span style="height:54px;padding:0 26px;border-radius:99px;background:${fForest};color:#f6f2ea;display:flex;align-items:center;font-weight:650;font-size:16px">Armar mi rutina</span>
          <span style="height:54px;padding:0 22px;border-radius:99px;border:1.5px solid rgba(35,48,31,.2);display:flex;align-items:center;font-weight:600;font-size:16px">Ver más vendidos</span>
        </div>
      </div>
      <div style="position:relative;height:560px;border-radius:280px 280px 24px 24px;background:linear-gradient(180deg,#c7d4bb,${fSage});overflow:hidden">
        <svg class="abs" viewBox="0 0 300 300" style="left:-30px;top:40px;width:300px;opacity:.5"><path d="M20 280 C60 200 120 140 220 100 M80 230 C70 190 80 160 110 140 M140 180 C150 150 170 130 200 120" stroke="#6f8a62" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="110" cy="140" rx="26" ry="11" fill="#7f9a71" transform="rotate(-40 110 140)"/><ellipse cx="200" cy="118" rx="28" ry="12" fill="#7f9a71" transform="rotate(-20 200 118)"/><ellipse cx="80" cy="228" rx="24" ry="10" fill="#7f9a71" transform="rotate(-70 80 228)"/></svg>
        <div class="abs" style="left:64px;bottom:60px;width:104px">${dropper('#c98b5a', '#f6f2ea', fForest)}</div>
        <div class="abs" style="left:188px;bottom:58px;width:170px">${jar('#f6f2ea', fForest, '#e8efe0')}</div>
        <div class="abs" style="right:44px;bottom:60px;width:76px">${dropper('#e9e3d5', '#c7d4bb', '#c9876b', 'FLORA', 'ACEITE')}</div>
        <span class="abs" style="left:24px;top:110px;padding:9px 13px;border-radius:12px;background:#f6f2ea;font-size:13px;font-weight:600;color:${fForest};box-shadow:0 10px 24px rgba(35,48,31,.12)">${stars(5, '#d9a400', 12)} 2.380 reseñas</span>
      </div>
    </div>`,
  });

A.push(
  ab(
    'ecommerce/flora-site',
    715,
    480,
    `
  <div class="fill" style="background:linear-gradient(160deg,#f3efe6,#e3dccd)"></div>
  ${photoBg([
    [88, 18, 60, 'radial-gradient(circle,#fff,transparent 70%)', 0.8],
    [12, 80, 55, 'radial-gradient(circle,#c7d4bb,transparent 70%)', 0.7],
  ])}
  <svg class="abs" viewBox="0 0 200 200" style="left:-40px;top:-30px;width:280px;opacity:.13"><path d="M10 190 C50 120 90 80 190 40 M60 140 C40 100 50 70 80 50 M110 100 C120 70 140 50 170 40" stroke="#23301f" stroke-width="7" fill="none"/></svg>
  ${laptop({ x: 140, y: 26, w: 560, h: 362, rx: 11, ry: -11, rz: 2.8, display: floraSite(0.4125) })}
  `,
    { cls: 'grain', style: '--grain:.16' },
  ),
);

const floraPhone = `
  <div class="pscr" style="height:100%;background:#f6f2ea;font-family:'Inter Variable';color:#23301f;display:flex;flex-direction:column">
    <div style="display:flex;justify-content:space-between;align-items:center;padding:44px 16px 4px">${ico.back}<span style="font-family:'Instrument Serif';font-size:17px">flora botánica</span>${ico.bag}</div>
    <div style="padding:6px 16px 0">
      <div style="font-family:'Instrument Serif';font-size:26px;line-height:1">Arma tu rutina</div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:8px;font-size:10px;color:#6b7565"><span style="flex:1;height:5px;border-radius:3px;background:${fForest}"></span>3 de 3 pasos</div>
      ${[
        ['1 · Limpia', 'Gel limpiador suave', '$42.000', dropper('#dfe7d6', '#f6f2ea', fForest, 'FLORA', 'GEL')],
        ['2 · Trata', 'Sérum de vitamina C', '$78.000', dropper('#c98b5a', '#f6f2ea', fForest)],
        ['3 · Hidrata', 'Crema de día', '$66.000', jar('#f6f2ea', fForest, '#e8efe0')],
      ]
        .map(
          ([step, name, price, art]) => `
        <div style="display:flex;align-items:center;gap:10px;margin-top:9px;padding:8px;border-radius:13px;background:#fff;box-shadow:0 2px 8px rgba(35,48,31,.06)">
          <div style="width:46px;height:46px;border-radius:10px;background:#e8efe0;display:grid;place-items:center"><div style="width:${art.includes('120 100') ? 34 : 18}px">${art}</div></div>
          <div style="flex:1;min-width:0"><div style="font-size:9.5px;color:#6b7565;font-weight:600">${step}</div><div style="font-size:11.5px;font-weight:650">${name}</div><div style="font-size:10.5px;color:#6b7565">${price}</div></div>
          <span style="width:20px;height:20px;border-radius:50%;background:${fForest};color:#f6f2ea;display:grid;place-items:center">${ico.check}</span>
        </div>`,
        )
        .join('')}
      <div style="margin-top:11px;padding:11px 12px;border-radius:14px;background:#dfe7d6">
        <div style="display:flex;justify-content:space-between;font-size:11px"><span>Rutina completa</span><s style="color:#6b7565">$186.000</s></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px"><b style="font-size:19px;letter-spacing:-.02em">$148.000</b><span style="padding:4px 8px;border-radius:99px;background:${fForest};color:#f6f2ea;font-size:9.5px;font-weight:650">Ahorras $38.000</span></div>
      </div>
      <div style="margin-top:10px;height:40px;border-radius:99px;background:${fForest};color:#f6f2ea;display:grid;place-items:center;font-size:12.5px;font-weight:650">Agregar rutina al carrito</div>
    </div>
  </div>`;

A.push(
  ab(
    'ecommerce/flora-phone',
    424,
    480,
    `
  <div class="fill" style="background:linear-gradient(170deg,#dfe7d6,#b9c9ad)"></div>
  <div class="abs" style="left:-60px;bottom:-60px;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,#f6f2ea,transparent 70%);opacity:.8"></div>
  ${PSCR}${phone({ x: 94, y: 22, w: 236, h: 500, rot: 3.5, screen: floraPhone })}
  `,
  ),
);

/* ═════════════════════ PULSO ═════════════════════ */
const pLime = '#d7ff3a';
const pulsoSite = (k) =>
  store({
    k,
    bg: '#0c0c0c',
    ink: '#f5f5f5',
    muted: 'rgba(255,255,255,.6)',
    accent: pLime,
    accentInk: '#0c0c0c',
    announce: 'CAMBIOS GRATIS POR 30 DÍAS &nbsp;·&nbsp; ENVÍO EXPRESS',
    annBg: pLime,
    annInk: '#0c0c0c',
    brand: `<span style="width:28px;height:28px;color:${pLime}">${mark.pulse}</span><span style="font-size:24px;font-weight:900;letter-spacing:-.04em">PULSO</span>`,
    links: ['Hombre', 'Mujer', 'Running', 'Training'],
    hero: `
    <div style="position:relative;padding:26px 48px 0;height:560px">
      <h1 style="margin:0;font-size:150px;line-height:.86;font-weight:900;letter-spacing:-.06em">MUÉVETE<br><span style="color:${pLime}">DISTINTO.</span></h1>
      <p style="margin:24px 0 0;max-width:360px;font-size:18px;line-height:1.45;color:rgba(255,255,255,.65)">Ropa y zapatillas para entrenar en serio. Probadas en la calle, no en la vitrina.</p>
      <div style="display:flex;gap:12px;margin-top:26px">
        <span style="height:54px;padding:0 26px;border-radius:6px;background:${pLime};color:#0c0c0c;display:flex;align-items:center;font-weight:800;font-size:16px;letter-spacing:.02em">COMPRAR RUNNING</span>
        <span style="height:54px;padding:0 22px;border-radius:6px;border:1.5px solid rgba(255,255,255,.25);display:flex;align-items:center;font-weight:700;font-size:16px">Ver training</span>
      </div>
      <div class="abs" style="right:96px;top:-6px;width:210px;transform:rotate(10deg);opacity:.95">${tee('#262626', pLime)}</div>
      <div class="abs" style="right:70px;top:120px;width:500px;transform:rotate(-14deg)">${sneaker(pLime, '#f5f5f5', '#0c0c0c', '#0c0c0c')}</div>
      <span class="abs" style="right:84px;top:388px;padding:10px 14px;border-radius:8px;background:#f5f5f5;color:#0c0c0c;font-size:14px;font-weight:800">Volt Runner · $389.900</span>
    </div>`,
  });

A.push(
  ab(
    'ecommerce/pulso-site',
    715,
    480,
    `
  <div class="fill" style="background:#0a0b0a"></div>
  ${photoBg([
    [86, 14, 60, 'radial-gradient(circle,#3a4a12,transparent 70%)', 0.85],
    [10, 90, 70, 'radial-gradient(circle,#262626,transparent 70%)', 0.9],
  ])}
  ${laptop({ x: 140, y: 24, w: 560, h: 362, rx: 12, ry: -10, rz: 3, display: pulsoSite(0.4125) })}
  `,
    { cls: 'grain vignette', style: '--grain:.3' },
  ),
);

const pulsoPhone = `
  <div class="pscr" style="height:100%;background:#f3f3f1;font-family:'Inter Variable';color:#0c0c0c;display:flex;flex-direction:column">
    <div style="display:flex;justify-content:space-between;align-items:center;padding:44px 16px 6px;background:#0c0c0c;color:#f5f5f5">${ico.back}<span style="display:flex;align-items:center;gap:4px;font-weight:900;font-size:15px;letter-spacing:-.04em"><span style="width:17px;height:17px;color:${pLime}">${mark.pulse}</span>PULSO</span>${ico.bag}</div>
    <div style="padding:10px 14px 0">
      <div style="display:flex;align-items:baseline;justify-content:space-between"><b style="font-size:21px;font-weight:900;letter-spacing:-.04em">RUNNING</b><span style="font-size:10px;color:#777">126 productos</span></div>
      <div style="display:flex;gap:6px;margin-top:8px">${['Talle 42', 'Negro', 'Precio'].map((t, i) => `<span style="white-space:nowrap;padding:6px 10px;border-radius:99px;font-size:9.5px;font-weight:700;${i < 2 ? `background:#0c0c0c;color:${pLime}` : 'background:#fff;border:1px solid #ddd'}">${t}${i < 2 ? ' ✕' : ' ▾'}</span>`).join('')}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px">
        ${[
          ['Volt Runner', '$389.900', pLime, 'Nuevo'],
          ['Pace 2', '$329.900', '#ff6b4a', ''],
          ['Night Run', '$359.900', '#262626', '−15%'],
          ['Pace 2 Lite', '$299.900', '#8fd0ff', ''],
        ]
          .map(
            ([n, p, c, b]) => `
          <div>
            <div style="position:relative;height:96px;border-radius:12px;background:#e6e6e2;display:grid;place-items:center">
              ${b ? `<span class="abs" style="left:7px;top:7px;padding:3px 6px;border-radius:5px;background:#0c0c0c;color:${pLime};font-size:8.5px;font-weight:800">${b}</span>` : ''}
              <div style="width:84%;transform:rotate(-10deg)">${sneaker(c, '#fff', '#0c0c0c', c === '#262626' ? pLime : '#0c0c0c')}</div>
            </div>
            <div style="font-size:10.5px;font-weight:700;margin-top:5px">${n}</div>
            <div style="font-size:10px;color:#555">${p}</div>
          </div>`,
          )
          .join('')}
      </div>
    </div>
    <div style="margin:auto 14px 34px;height:38px;border-radius:8px;background:#0c0c0c;color:${pLime};display:grid;place-items:center;font-size:12px;font-weight:800;letter-spacing:.02em">FILTRAR (2)</div>
  </div>`;

A.push(
  ab(
    'ecommerce/pulso-phone',
    424,
    480,
    `
  <div class="fill" style="background:linear-gradient(170deg,#1a1c14,#0c0c0c)"></div>
  <div class="abs" style="right:-70px;top:-60px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(215,255,58,.55),transparent 70%)"></div>
  ${PSCR}${phone({ x: 94, y: 26, w: 236, h: 500, rot: -3, screen: pulsoPhone })}
  `,
    { cls: 'grain', style: '--grain:.2' },
  ),
);

/* ═════════════════════ NIDO CASA ═════════════════════ */
const nTerra = '#c8643b';
const nInk = '#2b2118';
const nidoSite = (k) =>
  store({
    k,
    bg: '#f4ece1',
    ink: nInk,
    muted: '#7a6a5a',
    accent: nTerra,
    accentInk: '#fff',
    announce: 'Hecho a mano en Colombia &nbsp;·&nbsp; Envíos a todo el país',
    annBg: nInk,
    annInk: '#f4ece1',
    brand: `<span style="width:26px;height:26px;color:${nTerra}">${mark.house}</span><span style="font-family:'Instrument Serif';font-size:29px;letter-spacing:-.01em">nido casa</span>`,
    links: ['Cojines', 'Mantas', 'Mesa', 'Deco'],
    hero: `
    <div style="display:grid;grid-template-columns:1.25fr 1fr;gap:26px;padding:26px 48px 0">
      <div style="position:relative;height:560px;border-radius:24px;background:linear-gradient(180deg,#e9d5bf,#dcbf9f);overflow:hidden">
        <div class="abs" style="left:46px;right:46px;bottom:70px;height:190px;border-radius:40px 40px 18px 18px;background:#b98a5f"></div>
        <div class="abs" style="left:30px;right:30px;bottom:40px;height:110px;border-radius:26px;background:#a87a50"></div>
        <div class="abs" style="left:90px;bottom:150px;width:170px;transform:rotate(-8deg)">${cushion(nTerra, 'stripes', 'rgba(255,240,220,.55)')}</div>
        <div class="abs" style="left:240px;bottom:146px;width:160px;transform:rotate(6deg)">${cushion('#efe3d0', 'dots', '#c8643b')}</div>
        <div class="abs" style="left:380px;bottom:150px;width:150px;transform:rotate(-4deg)">${cushion('#6b6b3a', 'zig', 'rgba(255,240,220,.6)')}</div>
        <span class="abs" style="left:24px;top:24px;padding:8px 13px;border-radius:99px;background:#f4ece1;font-size:13px;font-weight:600">Colección Tierra · 2026</span>
      </div>
      <div style="padding-top:60px">
        <h1 style="margin:0;font-family:'Instrument Serif';font-weight:400;font-size:76px;line-height:1;letter-spacing:-.015em">Textiles hechos<br>a mano para<br><i>tu casa.</i></h1>
        <p style="margin:22px 0 0;max-width:380px;font-size:18px;line-height:1.5;color:#7a6a5a">Piezas tejidas por artesanas, en series cortas. Cada una es un poco distinta.</p>
        <div style="display:flex;gap:12px;margin-top:30px">
          <span style="height:54px;padding:0 26px;border-radius:99px;background:${nTerra};color:#fff;display:flex;align-items:center;font-weight:650;font-size:16px">Ver colección</span>
        </div>
        <div style="display:flex;gap:14px;margin-top:34px">
          <div style="width:118px;height:118px;border-radius:16px;background:#efe3d0;display:grid;place-items:center"><div style="width:62%">${vase('#c8643b')}</div></div>
          <div style="width:118px;height:118px;border-radius:16px;background:#e3d3bd;display:grid;place-items:center"><div style="width:82%">${blanket('#efe3d0', '#c8643b')}</div></div>
        </div>
      </div>
    </div>
    <span class="abs" style="right:40px;bottom:40px;width:58px;height:58px;border-radius:50%;background:#25d366;color:#fff;display:grid;place-items:center;box-shadow:0 10px 24px rgba(0,0,0,.2);z-index:4"><span style="transform:scale(1.5);display:flex">${ico.wa}</span></span>`,
  });

A.push(
  ab(
    'ecommerce/nido-site',
    715,
    480,
    `
  <div class="fill" style="background:#2a1c13"></div>
  ${photoBg([
    [80, 12, 70, 'radial-gradient(circle,#a8683e,#4a2e1c 60%,transparent 70%)', 0.85],
    [8, 80, 60, 'radial-gradient(circle,#5a3a24,transparent 70%)', 0.8],
  ])}
  ${laptop({ x: 146, y: 22, w: 560, h: 362, rx: 12, ry: -10, rz: 3.4, display: nidoSite(0.4125) })}
  `,
    { cls: 'grain vignette', style: '--grain:.3' },
  ),
);

const nidoPhone = `
  <div class="pscr" style="height:100%;background:#f4ece1;font-family:'Inter Variable';color:${nInk};display:flex;flex-direction:column">
    <div style="display:flex;justify-content:space-between;align-items:center;padding:44px 16px 6px"><b style="font-size:17px;letter-spacing:-.02em">Tu carrito (2)</b><span style="font-size:18px;color:#7a6a5a">✕</span></div>
    <div style="margin:4px 14px 0;padding:9px 10px;border-radius:12px;background:#efe3d0;font-size:9.5px">
      <div>Te faltan <b>$30.000</b> para el envío gratis</div>
      <div style="margin-top:5px;height:5px;border-radius:3px;background:#e2cfb6"><i style="display:block;width:78%;height:100%;border-radius:3px;background:${nTerra}"></i></div>
    </div>
    <div style="padding:4px 14px 0">
      ${[
        ['Cojín Terracota', '45 × 45 cm', '$89.000', cushion(nTerra, 'stripes', 'rgba(255,240,220,.55)')],
        ['Manta Arena', '130 × 170 cm', '$169.000', blanket('#efe3d0', '#c8643b')],
      ]
        .map(
          ([n, d, p, art]) => `
        <div style="display:flex;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid #e6d8c6">
          <div style="width:50px;height:50px;border-radius:12px;background:#e9d5bf;display:grid;place-items:center"><div style="width:38px">${art}</div></div>
          <div style="flex:1"><div style="font-size:12px;font-weight:650">${n}</div><div style="font-size:9.5px;color:#7a6a5a">${d}</div>
            <div style="display:flex;align-items:center;gap:8px;margin-top:5px;font-size:10px"><span style="display:flex;align-items:center;gap:9px;padding:3px 8px;border-radius:99px;border:1px solid #d9c8b2">− <b>1</b> +</span></div></div>
          <b style="font-size:12px">${p}</b>
        </div>`,
        )
        .join('')}
      <div style="display:flex;justify-content:space-between;margin-top:10px;font-size:10.5px;color:#7a6a5a"><span>Envío a tu ciudad</span><span>$12.000</span></div>
      <div style="display:flex;justify-content:space-between;margin-top:5px;font-size:15px;font-weight:750"><span>Total</span><span>$270.000</span></div>
      <div style="margin-top:10px;height:38px;border-radius:99px;background:${nTerra};color:#fff;display:grid;place-items:center;font-size:12.5px;font-weight:650">Finalizar compra</div>
      <div style="margin-top:6px;height:38px;border-radius:99px;background:#25d366;color:#fff;display:flex;align-items:center;justify-content:center;gap:7px;font-size:12.5px;font-weight:650">${ico.wa} Pedir por WhatsApp</div>
      <div style="text-align:center;margin-top:8px;font-size:9px;color:#7a6a5a">Paga con tarjeta, PSE o en efectivo</div>
    </div>
  </div>`;

A.push(
  ab(
    'ecommerce/nido-phone',
    424,
    480,
    `
  <div class="fill" style="background:linear-gradient(165deg,#efe0cc,#d9b996)"></div>
  <div class="abs" style="left:-50px;top:-40px;width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,#fff3e3,transparent 70%);opacity:.9"></div>
  ${PSCR}${phone({ x: 94, y: 12, w: 236, h: 500, rot: 3, screen: nidoPhone })}
  `,
  ),
);

/* ═════════════════════ SHARE IMAGE (1200 × 630) ═════════════════════ */
const notif = (n, d, a) => `<div style="display:flex;gap:9px;align-items:flex-start;padding:10px 11px;border-radius:15px;background:rgba(255,255,255,.86);box-shadow:0 6px 16px rgba(0,0,0,.08)">
  <i style="flex:none;width:24px;height:24px;border-radius:7px;background:#ffd60a;display:grid;place-items:center;color:#111">${ico.bag.replace('width="20" height="20"', 'width="14" height="14"')}</i>
  <div style="flex:1;font-size:11px;line-height:1.3"><div style="display:flex;justify-content:space-between;color:#777;font-size:9.5px"><span>TU TIENDA</span><span>${a}</span></div><b style="color:#111">Nuevo pedido #${n}</b><div style="color:#555">${d}</div></div>
</div>`;
A.push(
  ab(
    'og-ecommerce',
    600,
    315,
    `
  <div class="fill" style="background:radial-gradient(ellipse 70% 80% at 50% -14%,#ffc400 0%,#fed334 26%,#fce562 44%,#fdf4a6 65%,#fbf8d9 85%,#fdfdfd 110%)"></div>
  <div class="abs" style="left:30px;top:34px;font-family:'Caveat Brush';font-size:21px;color:#7d7d7d;transform:rotate(-3deg)">sin plantillas =)</div>
  <div class="abs" style="left:28px;top:66px;width:330px;font-size:44px;line-height:1;font-weight:540;letter-spacing:-.045em;color:#050505">Una tienda a tu medida que <span style="font-size:74px;display:block;margin-top:4px;letter-spacing:-.06em">vende.</span></div>
  <div class="abs" style="left:30px;bottom:26px;font-size:13px;font-weight:500;color:rgba(0,0,0,.55)">Leo Solari · Tiendas online a medida</div>
  ${phone({
    x: 388,
    y: 26,
    w: 186,
    h: 380,
    rot: 5,
    screen: `<div style="height:100%;background:linear-gradient(180deg,#ffe46b,#fff4c2 55%,#fffdf2);padding:44px 10px 0;font-family:'Inter Variable'">
      <div style="text-align:center;font-size:44px;font-weight:300;letter-spacing:-.04em;color:#111">9:41</div>
      <div style="display:grid;gap:7px;margin-top:12px">${notif(1048, '4 productos · $312.800', 'ahora')}${notif(1047, '1 producto · $72.500', 'hace 3 min')}${notif(1046, 'Rutina completa · $148.000', 'hace 9 min')}</div>
    </div>`,
  })}
  `,
  ),
);

export default A;
