import { ab } from './lib.mjs';

// Illustrated "film photo" scenes for the polaroids (300×300 → 600×600)
const A = [];
const rnd = (seed) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

A.push(
  ab(
    'story/hikes',
    300,
    300,
    `<svg class="fill" viewBox="0 0 300 300">
    <defs>
      <linearGradient id="hs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fb7e8"/><stop offset=".5" stop-color="#e9c3b4"/><stop offset=".72" stop-color="#ffd4a0"/></linearGradient>
      <radialGradient id="hg" cx=".66" cy=".48" r=".35"><stop offset="0" stop-color="#fff6dc" stop-opacity=".95"/><stop offset="1" stop-color="#fff6dc" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="300" height="300" fill="url(#hs)"/>
    <rect width="300" height="300" fill="url(#hg)"/>
    <circle cx="198" cy="146" r="20" fill="#fff6dc"/>
    <path d="M0 170 L40 128 L70 150 L118 96 L160 140 L196 112 L240 150 L280 120 L300 134 V300 H0Z" fill="#9aa8cc" opacity=".85"/>
    <path d="M0 196 L52 150 L92 182 L140 136 L186 178 L228 148 L272 184 L300 170 V300 H0Z" fill="#6a7aa8"/>
    <path d="M118 96 L132 110 L124 112 L140 122 L160 140 L150 128 Z" fill="#fff" opacity=".8"/>
    <path d="M0 236 C60 214 120 226 170 210 C220 194 260 206 300 198 V300 H0Z" fill="#3c4a6e"/>
    <path d="M0 270 C70 250 140 262 200 246 C240 236 270 240 300 236 V300 H0Z" fill="#26304a"/>
    <path d="M150 300 C150 280 120 268 138 252 C156 236 196 238 206 222" fill="none" stroke="#ead7bd" stroke-width="3.2" stroke-dasharray="7 6" stroke-linecap="round"/>
    <g transform="translate(206 206)" fill="#141a2a"><circle cx="0" cy="-12" r="3.6"/><path d="M-3 -8 h6 l2 12 h-3 l-1 10 h-2 l-1 -10 h-3z"/><path d="M4 -6 l8 14" stroke="#141a2a" stroke-width="1.6"/></g>
  </svg>`,
    { cls: 'grain vignette', style: '--grain:.4' },
  ),
);

A.push(
  ab(
    'story/studio',
    300,
    300,
    `
  <div class="fill" style="background:linear-gradient(135deg,#d7b083,#c1935f);"></div>
  <div class="fill" style="background:repeating-linear-gradient(100deg,rgba(90,50,20,.08) 0 2px,transparent 2px 13px),repeating-linear-gradient(100deg,rgba(255,255,255,.05) 0 1px,transparent 1px 7px)"></div>
  <div class="abs" style="left:58px;top:58px;width:170px;height:200px;border-radius:6px;background:#fbf8f1;transform:rotate(-10deg);box-shadow:6px 10px 18px rgba(60,30,10,.35)">
    <svg viewBox="0 0 170 200" style="width:100%;height:100%" fill="none" stroke="#2b2b2b" stroke-width="2" stroke-linecap="round">
      <circle cx="58" cy="62" r="22"/><path d="M58 30v-8M84 40l6-6M90 62h8M26 62h-8M32 40l-6-6"/>
      <path d="M30 120c20-16 40-16 60 0s40 16 60 0" /><path d="M30 146c20-16 40-16 60 0s40 16 60 0" opacity=".6"/>
      <path d="M110 50l26 0M110 64l18 0M110 78l22 0" opacity=".5"/>
      <rect x="22" y="168" width="60" height="16" rx="8" fill="#ffd60a" stroke="none"/>
    </svg>
  </div>
  <div class="abs" style="left:150px;top:200px;width:120px;height:9px;border-radius:5px;background:linear-gradient(90deg,#ffcf3d 0 82%,#f6c7a0 82% 90%,#333 90%);transform:rotate(-28deg);box-shadow:2px 4px 6px rgba(60,30,10,.35)"></div>
  <div class="abs" style="left:190px;top:22px;width:92px;height:92px;border-radius:50%;background:#f4f1ea;box-shadow:4px 8px 14px rgba(60,30,10,.35)">
    <div style="position:absolute;inset:12px;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 3px #eee"></div>
    <div style="position:absolute;inset:20px;border-radius:50%;background:radial-gradient(circle at 50% 45%,#d8b48c 0 22%,#8a5a34 24%,#5a361c 70%)"></div>
  </div>
  <div class="abs" style="left:-18px;top:180px;width:130px;height:130px">
    ${[[40, 60, -30], [60, 40, 10], [70, 70, 50], [30, 30, -60], [80, 90, 80]]
      .map(([x, y, r]) => `<i style="position:absolute;left:${x}px;top:${y}px;width:52px;height:22px;border-radius:50%;background:linear-gradient(90deg,#2f7a45,#5fb36a);transform:rotate(${r}deg);box-shadow:2px 4px 6px rgba(20,40,10,.3)"></i>`)
      .join('')}
  </div>
  <div class="fill" style="background:linear-gradient(118deg,transparent 18%,rgba(255,244,214,.38) 18.5%,rgba(255,244,214,.38) 34%,transparent 34.5%,transparent 42%,rgba(255,244,214,.32) 42.5%,rgba(255,244,214,.32) 58%,transparent 58.5%);mix-blend-mode:soft-light"></div>
  `,
    { cls: 'grain vignette', style: '--grain:.35' },
  ),
);

A.push(
  ab(
    'story/coast',
    300,
    300,
    `<svg class="fill" viewBox="0 0 300 300">
    <defs>
      <linearGradient id="cs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a73b8"/><stop offset=".38" stop-color="#c98aa2"/><stop offset=".56" stop-color="#ffb07a"/><stop offset=".62" stop-color="#ffd38a"/></linearGradient>
      <linearGradient id="cw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e79a7a"/><stop offset=".2" stop-color="#5a6a9a"/><stop offset="1" stop-color="#25335a"/></linearGradient>
    </defs>
    <rect width="300" height="300" fill="url(#cs)"/>
    <path d="M20 60 C60 50 90 70 140 58 M170 40 C200 34 240 46 290 38" stroke="#f3c1b7" stroke-width="5" stroke-linecap="round" opacity=".55"/>
    <circle cx="150" cy="178" r="26" fill="#fff1c8"/>
    <rect y="182" width="300" height="118" fill="url(#cw)"/>
    ${[190, 198, 207, 218, 230].map((y, i) => `<rect x="${150 - (30 - i * 4)}" y="${y}" width="${60 - i * 8}" height="2.4" rx="1.2" fill="#ffe2b0" opacity="${0.9 - i * 0.12}"/>`).join('')}
    ${[[30, 206, 40], [220, 214, 50], [90, 236, 30], [250, 250, 34]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="1.6" rx=".8" fill="#fff" opacity=".35"/>`).join('')}
    <path d="M0 250 C20 238 40 232 58 240 C76 230 96 236 110 252 C130 248 140 262 150 300 H0Z" fill="#1c1a22"/>
    <path d="M200 300 C214 270 236 262 252 268 C266 254 286 256 300 262 V300Z" fill="#1c1a22"/>
    <path d="M0 262 C30 256 60 262 90 258" stroke="#fff" stroke-width="2" opacity=".4" fill="none"/>
  </svg>`,
    { cls: 'grain vignette', style: '--grain:.42' },
  ),
);

{
  const r = rnd(11);
  const drips = Array.from({ length: 9 }, () => `<rect x="${(30 + r() * 240).toFixed(0)}" y="${(175 + r() * 20).toFixed(0)}" width="5" height="${(18 + r() * 40).toFixed(0)}" rx="2.5" fill="${['#ff4fa3', '#ffd23f', '#3ad1ff', '#7a5cff'][Math.floor(r() * 4)]}"/>`).join('');
  A.push(
    ab(
      'story/wall',
      300,
      300,
      `
    <div class="fill" style="background-color:#b9b2a8;background-image:repeating-linear-gradient(0deg,rgba(70,60,50,.35) 0 2px,transparent 2px 26px),repeating-linear-gradient(90deg,rgba(70,60,50,.28) 0 2px,transparent 2px 52px)"></div>
    <div class="fill" style="background-image:repeating-linear-gradient(90deg,transparent 0 26px,rgba(70,60,50,.28) 26px 28px,transparent 28px 52px);-webkit-mask-image:repeating-linear-gradient(0deg,transparent 0 26px,#000 26px 52px)"></div>
    <svg class="fill" viewBox="0 0 300 300">
      <defs><linearGradient id="wg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd23f"/><stop offset=".4" stop-color="#ff4fa3"/><stop offset=".75" stop-color="#7a5cff"/><stop offset="1" stop-color="#3ad1ff"/></linearGradient></defs>
      <path d="M10 210 C50 120 120 90 170 110 C230 60 290 110 292 170 C296 230 220 250 150 236 C90 252 20 260 10 210Z" fill="#141414" opacity=".85"/>
      ${drips}
      <text x="150" y="196" text-anchor="middle" font-family="Modak" font-size="150" fill="#fff" stroke="#fff" stroke-width="18" stroke-linejoin="round">hey</text>
      <text x="150" y="196" text-anchor="middle" font-family="Modak" font-size="150" fill="url(#wg)" stroke="#111" stroke-width="5" stroke-linejoin="round" paint-order="stroke">hey</text>
      <path d="M246 60l6 14 15 2-11 10 3 15-13-7-13 7 3-15-11-10 15-2z" fill="#ffd23f" stroke="#111" stroke-width="3" stroke-linejoin="round"/>
      <path d="M36 70 l20 -12 M30 90 l24 -4 M44 108 l16 6" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    </svg>
    `,
      { cls: 'grain vignette', style: '--grain:.45' },
    ),
  );
}

A.push(
  ab(
    'story/buddy',
    300,
    300,
    `
  <div class="fill" style="background:linear-gradient(180deg,#e9d6be,#d9bfa0)"></div>
  <div class="abs" style="left:-40px;top:40px;width:400px;height:300px;background:linear-gradient(90deg,transparent 0 10%,rgba(255,240,210,.65) 10% 46%,transparent 46% 50%,rgba(255,240,210,.65) 50% 86%,transparent 86%);transform:skewX(-24deg);filter:blur(3px)"></div>
  <svg class="fill" viewBox="0 0 300 300">
    <ellipse cx="150" cy="232" rx="100" ry="18" fill="rgba(90,50,20,.25)"/>
    <path d="M60 220 C40 180 80 140 140 142 C200 144 246 170 240 212 C236 236 200 240 150 238 C110 238 74 238 60 220Z" fill="#f29a3d"/>
    <path d="M90 160 C100 176 104 196 100 214 M130 146 C140 166 142 190 138 214 M170 150 C178 170 180 194 176 216" stroke="#d7742a" stroke-width="7" stroke-linecap="round" fill="none"/>
    <path d="M232 214 C262 216 270 190 252 182" stroke="#f29a3d" stroke-width="16" stroke-linecap="round" fill="none"/>
    <circle cx="96" cy="176" r="38" fill="#f6a64a"/>
    <path d="M66 156 L64 120 L90 142Z M110 140 L128 112 L130 150Z" fill="#f6a64a"/>
    <path d="M70 150 L69 130 L84 143Z M112 142 L124 124 L124 148Z" fill="#ffd0b0"/>
    <path d="M78 176 q8 6 16 0 M102 176 q8 6 16 0" stroke="#3a2010" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M94 188 l4 4 4 -4z" fill="#d25a5a"/>
    <path d="M70 190 h-22 M70 196 h-20 M122 190 h22 M122 196 h20" stroke="#fff" stroke-width="1.6" opacity=".7"/>
    <text x="214" y="96" font-family="Caveat Brush" font-size="26" fill="#3a2010" opacity=".6">z z z</text>
  </svg>
  `,
    { cls: 'grain vignette', style: '--grain:.38' },
  ),
);

{
  const r = rnd(5);
  const buildings = [];
  let x = -6;
  while (x < 300) {
    const w = 24 + Math.floor(r() * 30);
    const h = 70 + Math.floor(r() * 120);
    const top = 236 - h;
    let win = '';
    for (let yy = top + 8; yy < 228; yy += 11) for (let xx = x + 5; xx < x + w - 6; xx += 8) if (r() > 0.55) win += `<rect x="${xx}" y="${yy}" width="4" height="6" fill="#ffd27a" opacity="${(0.6 + r() * 0.4).toFixed(2)}"/>`;
    buildings.push(`<rect x="${x}" y="${top}" width="${w}" height="${h + 10}" fill="${['#15183a', '#1b1f48', '#11132e'][Math.floor(r() * 3)]}"/>${win}`);
    x += w + 2;
  }
  A.push(
    ab(
      'story/city',
      300,
      300,
      `<svg class="fill" viewBox="0 0 300 300">
      <defs><linearGradient id="ns" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1030"/><stop offset=".55" stop-color="#3a2a6a"/><stop offset=".78" stop-color="#ff8a6a"/></linearGradient>
      <linearGradient id="nw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2550"/><stop offset="1" stop-color="#0c0d22"/></linearGradient></defs>
      <rect width="300" height="300" fill="url(#ns)"/>
      <circle cx="230" cy="60" r="18" fill="#fff4d6"/><circle cx="238" cy="54" r="16" fill="#1a1d48" opacity=".0"/>
      ${Array.from({ length: 30 }, () => `<circle cx="${(r() * 300).toFixed(0)}" cy="${(r() * 120).toFixed(0)}" r="${(0.6 + r()).toFixed(1)}" fill="#fff" opacity="${(0.4 + r() * 0.6).toFixed(2)}"/>`).join('')}
      ${buildings.join('')}
      <rect y="236" width="300" height="64" fill="url(#nw)"/>
      ${Array.from({ length: 26 }, () => `<rect x="${(r() * 290).toFixed(0)}" y="${(242 + r() * 50).toFixed(0)}" width="${(6 + r() * 16).toFixed(0)}" height="1.6" rx=".8" fill="#ffd27a" opacity="${(0.25 + r() * 0.5).toFixed(2)}"/>`).join('')}
    </svg>`,
      { cls: 'grain vignette', style: '--grain:.4' },
    ),
  );
}

export default A;
