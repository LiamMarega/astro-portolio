import { ab, site, laptop, phone, tablet, photoBg, bars, lines, logos } from './lib.mjs';

const A = [];

/* desk with a phone (linen texture) */
const linen = `background-color:#c9c4bb;background-image:repeating-linear-gradient(0deg,rgba(255,255,255,.07) 0 1px,transparent 1px 3px),repeating-linear-gradient(90deg,rgba(0,0,0,.06) 0 1px,transparent 1px 3px)`;
A.push(
  ab(
    'gallery/desk-phone',
    380,
    320,
    `
  <div class="fill" style="${linen}"></div>
  <div class="abs" style="right:-60px;top:-50px;width:250px;height:170px;border-radius:24px;background:linear-gradient(160deg,#d9dadd,#a9abb1);transform:rotate(-8deg);box-shadow:0 20px 40px rgba(0,0,0,.25)">
    <div style="position:absolute;left:18px;top:56px;right:18px;height:70px;border-radius:8px;background:repeating-linear-gradient(90deg,#2a2b30 0 26px,transparent 26px 30px),repeating-linear-gradient(0deg,#2a2b30 0 15px,transparent 15px 18px);opacity:.92"></div>
  </div>
  <div class="abs" style="left:230px;top:150px;width:46px;height:46px;border-radius:50%;background:conic-gradient(from 30deg,#ff5f9e,#ffc75f,#5ff0c8,#6a7bff,#ff5f9e);box-shadow:0 6px 12px rgba(0,0,0,.25)"><i style="position:absolute;inset:9px;border-radius:50%;background:#1a1a1f"></i></div>
  <div class="abs" style="left:262px;top:186px;width:16px;height:120px;border-radius:9px;background:linear-gradient(90deg,#fff,#cfd2da);transform:rotate(28deg);box-shadow:0 6px 10px rgba(0,0,0,.25)"></div>
  ${phone({
    x: 40,
    y: 40,
    w: 160,
    h: 330,
    rot: -14,
    screen: `<div style="height:100%;background:#f6f3ee;padding:40px 12px 0;font-family:'Instrument Serif',serif">
      <div style="font-size:24px;line-height:1;color:#111">Humans are<br>your best<br><i>investment</i></div>
      <div style="display:flex;margin-top:12px;height:46px;border-radius:6px;overflow:hidden">${['#ff5f3d', '#ffc23d', '#7a5cff', '#2ad49a', '#111'].map((c) => `<i style="flex:1;background:${c}"></i>`).join('')}</div>
      <div style="font-family:'Inter Variable';font-size:8px;line-height:1.5;color:#666;margin-top:10px">Find and attract the best talent from around the globe with a calm, human-first hiring platform.</div>
      <div style="font-family:'Inter Variable';margin-top:10px;display:inline-block;padding:5px 9px;border-radius:6px;background:#111;color:#fff;font-size:8px">Book a demo</div>
    </div>`,
  })}
  `,
    { cls: 'grain', style: '--grain:.35' },
  ),
);

/* glowing 3D wordmark site */
A.push(
  ab(
    'gallery/glow-site',
    560,
    410,
    `
  <div class="fill" style="background:radial-gradient(ellipse 80% 70% at 50% 108%,#f2ff9e 0%,#7af0a1 18%,#1d8a6a 40%,#0d2420 62%,#090c0f 82%)"></div>
  <div class="fill" style="background:repeating-conic-gradient(from 0deg at 50% 110%,rgba(255,255,255,.05) 0deg 6deg,transparent 6deg 14deg)"></div>
  <div class="abs" style="left:24px;right:24px;top:18px;display:flex;align-items:center;gap:18px;font-size:9px;color:rgba(255,255,255,.7)"><b style="color:#fff;font-size:12px;display:flex;align-items:center;gap:5px"><span style="width:14px;height:14px;display:block">${logos.orbit}</span>lumen</b><span style="margin-left:auto">Products</span><span>Infrastructure</span><span>About</span><span>Updates</span><span style="padding:4px 9px;border-radius:99px;background:#fff;color:#111;font-weight:600">Get started</span></div>
  <div class="abs" style="left:0;right:0;top:66px;text-align:center;font-size:10px;line-height:1.5;color:rgba(255,255,255,.75)">Welcome to the brightest hub for layered assets<br>built on open networks</div>
  <div class="abs" style="left:0;right:0;top:92px;text-align:center;font-family:'Instrument Serif',serif;font-style:italic;font-size:210px;line-height:1;letter-spacing:-.02em;background:linear-gradient(180deg,#ffffff 10%,#c9d3dc 45%,#7d8a96 80%);-webkit-background-clip:text;color:transparent;filter:drop-shadow(0 10px 30px rgba(0,0,0,.45)) drop-shadow(0 0 30px rgba(170,255,200,.25))">glow</div>
  `,
    { cls: 'grain', style: '--grain:.18' },
  ),
);

/* isometric steps illustration */
A.push(
  ab(
    'gallery/steps-illo',
    380,
    300,
    `
  <div class="fill" style="background:#ece0d9"></div>
  <svg class="fill" viewBox="0 0 380 300" font-family="Inter Variable" font-weight="700">
    ${[
      [70, 210, '#7a5cff', 'ideas'],
      [140, 170, '#ff8a3d', 'plan'],
      [210, 130, '#ff4f5a', 'launch'],
    ]
      .map(
        ([x, y, c, t], i) => `<g>
      <path d="M${x} ${y} l70 -35 l70 35 l-70 35 z" fill="#fff" stroke="#111" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M${x} ${y} l70 35 l0 ${40 + i * 40} l-70 -35 z" fill="${c}" stroke="#111" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M${x + 70} ${y + 35} l70 -35 l0 ${40 + i * 40} l-70 35 z" fill="${c}" stroke="#111" stroke-width="2.4" stroke-linejoin="round" style="filter:brightness(.8)"/>
      <text x="${x + 14}" y="${y + 22}" font-size="15" fill="#fff" transform="rotate(26 ${x + 14} ${y + 22})">${t}</text>
    </g>`,
      )
      .join('')}
    <path d="M292 102 L292 40" stroke="#111" stroke-width="3" stroke-linecap="round"/>
    <path d="M292 42 L330 52 L292 64 Z" fill="#ffd60a" stroke="#111" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M40 70 c10-18 34-18 40 0 c14-6 26 4 22 16 h-66 c-8-6-4-16 4-16z" fill="#fff" stroke="#111" stroke-width="2.4"/>
    <path d="M40 250 c6 -10 14 -10 18 0 M60 270 l14 -6 M36 274 l-12 -6" stroke="#111" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  </svg>
  `,
    { cls: 'grain', style: '--grain:.15' },
  ),
);

/* language learning app site */
A.push(
  ab(
    'gallery/lingo-app',
    480,
    380,
    `
  <div class="fill" style="background:#fbfbfb"></div>
  <div class="abs" style="left:18px;right:18px;top:14px;display:flex;align-items:center;gap:14px;font-size:8px;color:#777"><b style="color:#111;font-size:11px">lingo</b><span>Features</span><span>Company</span><span>Pricing</span><span style="margin-left:auto">Log in</span><span style="padding:4px 8px;border-radius:5px;background:#111;color:#fff">Try for free</span></div>
  <div class="abs" style="left:20px;top:46px;width:118px;height:110px;border-radius:12px;background:#fff;box-shadow:0 8px 20px rgba(0,0,0,.08);padding:10px;transform:rotate(-4deg)"><div style="height:16px;border-radius:5px;background:#fff59a;font-size:7px;padding:3px 5px;font-weight:600">Learn efficiently with AI</div><div style="display:flex;align-items:center;gap:6px;margin-top:12px"><i style="width:18px;height:18px;border-radius:50%;background:#111"></i><span style="flex:1;height:14px;background:repeating-linear-gradient(90deg,#111 0 1.5px,transparent 1.5px 3.5px)"></span></div><div style="font-size:8px;line-height:1.3;margin-top:10px;font-weight:600">Yes! Spanish is my favourite language in the world ☀️</div></div>
  <div class="abs" style="left:150px;top:40px;width:100px;height:96px;border-radius:12px;background:#fff;box-shadow:0 8px 20px rgba(0,0,0,.08);padding:9px;transform:rotate(3deg)"><div style="height:14px;border-radius:5px;background:#b5f0ff;font-size:7px;padding:2px 5px;font-weight:600">Know your progress</div><div style="font-size:11px;font-weight:700;margin-top:8px">🔥 Rookie</div><div style="display:flex;justify-content:space-between;margin-top:14px;font-size:12px;font-weight:700"><span>420</span><span>4420</span></div></div>
  <div class="abs" style="left:240px;top:64px;width:108px;height:110px;border-radius:12px;background:#fff;box-shadow:0 8px 20px rgba(0,0,0,.08);padding:9px;transform:rotate(-6deg)"><div style="height:14px;border-radius:5px;background:#f0c2ff;font-size:7px;padding:2px 5px;font-weight:600">Plan your lessons</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-top:8px">${Array.from({ length: 28 }, (_, i) => `<i style="height:8px;border-radius:2px;background:${[3, 9, 12, 17, 22].includes(i) ? '#111' : '#eee'}"></i>`).join('')}</div></div>
  <div class="abs" style="left:356px;top:46px;width:108px;height:130px;border-radius:12px;background:#fff;box-shadow:0 8px 20px rgba(0,0,0,.08);padding:9px;transform:rotate(4deg)"><div style="height:14px;border-radius:5px;background:#b9f5c8;font-size:7px;padding:2px 5px;font-weight:600">Compete with others</div>${['Ana R.', 'Leo S.', 'Mia K.', 'Tom B.'].map((n, i) => `<div style="display:flex;align-items:center;gap:5px;margin-top:8px;font-size:8px"><i style="width:12px;height:12px;border-radius:50%;background:${['#ffcf5a', '#7a5cff', '#2ad49a', '#ff7a7a'][i]}"></i><span style="flex:1">${n}</span><b>${[24231, 16742, 15819, 14634][i]}</b></div>`).join('')}</div>
  <div class="abs" style="left:36px;top:206px;font-size:34px;line-height:1.08;font-weight:600;letter-spacing:-.035em;color:#111">Your pocket coach for<br>learning any language</div>
  <div class="abs" style="left:36px;top:292px;width:300px;font-size:9.5px;line-height:1.5;color:#777">Lingo makes learning languages easy with AI conversations, realistic voices, progress tracking and custom schedules.</div>
  <div class="abs" style="right:40px;bottom:36px;font-family:'Caveat Brush';font-size:15px;color:#999;transform:rotate(-6deg)">try it for 2 min ↗</div>
  `,
  ),
);

/* CRM website */
A.push(
  ab(
    'gallery/crm-site',
    550,
    360,
    `
  <div class="fill" style="background:#f7f7f4"></div>
  <div class="abs" style="left:20px;right:20px;top:14px;display:flex;align-items:center;gap:14px;font-size:8px;color:#777"><b style="color:#111;font-size:11px">bridge</b><span>Use cases</span><span>Company</span><span>News</span><span>Careers</span><span>Pricing</span><span style="margin-left:auto">Log in</span><span style="padding:4px 9px;border-radius:99px;background:#111;color:#fff">Get started ›</span></div>
  <div class="abs" style="left:22px;top:52px;font-size:9px;color:#666;padding:3px 8px;border-radius:99px;background:#ececE6">Bridge to grow your clients ›</div>
  <div class="abs" style="left:22px;top:76px;font-size:33px;line-height:1.02;font-weight:650;letter-spacing:-.045em;color:#111">Customer<br>relationships,<br>the flexible way</div>
  <div class="abs" style="left:22px;top:212px;width:220px;font-size:9.5px;line-height:1.5;color:#666">Powerful, flexible and data-driven. Bridge makes it easy to build the exact CRM your team needs.</div>
  <div class="abs" style="left:22px;top:262px;width:200px;height:36px;border-radius:10px;background:#141418;color:#fff;font-size:11px;display:flex;align-items:center;padding:0 14px">Open Bridge for free</div>
  <div class="abs" style="left:22px;bottom:22px;display:flex;gap:18px;font-size:10px;font-weight:700;color:#999;letter-spacing:.06em"><span>HYPERLINE</span><span>OPENFIELD</span><span>NORTHWIND</span></div>
  <div class="abs" style="right:18px;top:48px;width:270px;height:290px;border-radius:18px;background:radial-gradient(circle at 30% 20%,#2fd28e,#11845a 70%);overflow:hidden">
    <div class="abs" style="left:40px;top:40px;width:190px;height:220px;border-radius:14px;background:#e9fbe6;transform:rotate(-12deg);box-shadow:0 18px 30px rgba(0,0,0,.25);padding:14px">${['#ffe14d', '#b9f5c8', '#fff', '#ffe14d'].map((c, i) => `<div style="display:flex;align-items:center;gap:8px;margin-top:${i ? 12 : 4}px"><i style="width:22px;height:22px;border-radius:7px;background:${c};border:1.5px solid #111"></i><span style="flex:1;height:7px;border-radius:4px;background:#111;opacity:.75"></span></div>`).join('')}</div>
    <svg class="abs" style="left:0;top:0;width:100%;height:100%" viewBox="0 0 270 290"><path d="M10 250 C80 200 120 230 160 170 S240 90 262 40" fill="none" stroke="#e8ff3a" stroke-width="14" stroke-linecap="round"/><path d="M10 250 C80 200 120 230 160 170 S240 90 262 40" fill="none" stroke="#111" stroke-width="2.4" stroke-dasharray="2 10" stroke-linecap="round"/></svg>
  </div>
  `,
  ),
);

/* sticker sheet */
const stk = (x, y, inner, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r})">${inner}</g>`;
const L = '#d6f34a';
const T = '#0f6b5e';
A.push(
  ab(
    'gallery/sticker-sheet',
    400,
    280,
    `
  <div class="fill" style="background:#fbfbf8"></div>
  <svg class="fill" viewBox="0 0 400 280" stroke="#111" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
    ${stk(70, 80, `<circle r="34" fill="#fff" stroke="#fff" stroke-width="16"/><path d="M-36 4h46l10 16H-14z" fill="${T}"/><circle r="26" fill="${L}"/><path d="M-26 0h52M0 -26c10 10 10 42 0 52M0 -26c-10 10-10 42 0 52" fill="none"/>`, -8)}
    ${stk(200, 76, `<rect x="-34" y="-20" width="68" height="56" rx="10" fill="${T}" stroke="#fff" stroke-width="16"/><rect x="-34" y="-20" width="68" height="56" rx="10" fill="${L}"/><path d="M-20 -20v-10a20 20 0 0 1 40 0v10" fill="none"/><path d="M-10 6c0-6 4-10 10-10s10 4 10 10v8M-4 6v10M4 4v14" fill="none" stroke="${T}"/>`, 6)}
    ${stk(330, 82, `<path d="M0-34l8 10 12-4 2 12 12 4-4 12 10 8-10 8 4 12-12 4-2 12-12-4-8 10-8-10-12 4-2-12-12-4 4-12-10-8 10-8-4-12 12-4 2-12 12 4z" fill="${L}"/><circle r="12" fill="${T}"/><path d="M-6 0l4 4 8-8" stroke="#fff" fill="none"/>`, 12)}
    ${stk(72, 206, `<ellipse cx="0" cy="-22" rx="30" ry="10" fill="${L}"/><path d="M-30-22v40c0 6 13 10 30 10s30-4 30-10v-40" fill="${T}"/><path d="M-30-2c0 6 13 10 30 10s30-4 30-10" fill="none" stroke="#fff"/><path d="M38-10a24 24 0 0 1-8 34M-38 10a24 24 0 0 1 8-34" fill="none" stroke="${L}" stroke-width="5"/>`, -6)}
    ${stk(204, 206, `<rect x="-40" y="-30" width="80" height="60" rx="8" fill="#fff"/><path d="M-40-16h80" fill="none"/><circle cx="-30" cy="-23" r="2.5" fill="#111"/><circle cx="-22" cy="-23" r="2.5" fill="#111"/><path d="M0-8l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z" fill="${L}"/><rect x="-26" y="16" width="52" height="8" rx="4" fill="${T}"/>`, 4)}
    ${stk(330, 204, `<circle cx="-6" cy="-6" r="24" fill="${L}"/><circle cx="-6" cy="-6" r="14" fill="#fff"/><path d="M12 12l20 20" stroke-width="9" stroke="${T}"/><path d="M12 12l20 20" fill="none"/><path d="M-6-14l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" fill="${T}"/>`, -10)}
  </svg>
  `,
  ),
);

/* deep blue developer site */
A.push(
  ab(
    'gallery/stack-site',
    530,
    360,
    `
  <div class="fill" style="background:radial-gradient(ellipse 70% 60% at 50% 0%,#5b7a4a 0%,#2c4a5a 30%,#132a4a 60%,#0b1830 100%)"></div>
  <div class="fill" style="background:repeating-linear-gradient(90deg,rgba(255,255,255,.035) 0 1px,transparent 1px 36px),repeating-linear-gradient(0deg,rgba(255,255,255,.035) 0 1px,transparent 1px 36px)"></div>
  <div class="abs" style="left:20px;right:20px;top:14px;display:flex;align-items:center;gap:12px;font-size:8px;color:rgba(255,255,255,.75)"><b style="color:#fff;font-size:11px">▲ Restack</b><span>Platform</span><span>Docs</span><span>Company</span><span>Pricing</span><span style="margin-left:auto;padding:4px 8px;border-radius:5px;background:#fff;color:#111">Get started</span></div>
  <div class="abs" style="left:0;right:0;top:56px;text-align:center;font-size:9px;color:rgba(255,255,255,.7)">Downtime ends today with Restack</div>
  <div class="abs" style="left:0;right:0;top:74px;text-align:center;font-size:44px;line-height:1.04;font-weight:600;letter-spacing:-.04em;color:#fff">Deep dive into<br>any stack</div>
  <div class="abs" style="left:0;right:0;top:182px;display:flex;justify-content:center;gap:8px;font-size:9px"><span style="padding:6px 11px;border-radius:6px;background:#fff;color:#111;font-weight:600">Start for free</span><span style="padding:6px 11px;border-radius:6px;background:rgba(255,255,255,.12);color:#fff">Show demo</span></div>
  <div class="abs" style="left:40px;right:40px;top:226px;bottom:-20px;border-radius:12px;background:rgba(8,16,32,.75);border:1px solid rgba(255,255,255,.12);padding:14px">
    <div style="display:flex;gap:16px;font-size:8px;color:rgba(255,255,255,.6)"><span>Logs</span><span>Traces</span><span>Metrics</span><b style="margin-left:auto;color:#9fe08a">● healthy</b></div>
    <div style="height:70px;margin-top:12px">${bars([30, 50, 40, 70, 45, 60, 80, 55, 65, 90, 70, 50, 75, 60, 85, 66, 72, 58, 94, 70, 62, 80, 54, 68], 'linear-gradient(#9fe08a,#3a8f6a)', 3, 1)}</div>
    <div style="display:flex;gap:20px;margin-top:10px;color:#fff;font-size:15px;font-weight:600"><span>396<small style="display:block;font-size:8px;color:rgba(255,255,255,.55);font-weight:400">deploys</small></span><span>322<small style="display:block;font-size:8px;color:rgba(255,255,255,.55);font-weight:400">services</small></span><span>99.98%<small style="display:block;font-size:8px;color:rgba(255,255,255,.55);font-weight:400">uptime</small></span></div>
  </div>
  `,
    { cls: 'grain', style: '--grain:.15' },
  ),
);

/* glowing orb tablet */
A.push(
  ab(
    'gallery/orb-tablet',
    420,
    340,
    `
  <div class="fill" style="background:#050507"></div>
  <div class="abs" style="left:0;right:0;top:0;bottom:0;background:radial-gradient(circle at 46% 44%,rgba(255,90,120,.35),transparent 40%)"></div>
  ${[150, 110, 74].map((r, i) => `<div class="abs" style="left:${195 - r}px;top:${150 - r * 0.45}px;width:${r * 2}px;height:${r * 0.9}px;border-radius:50%;border:1px solid rgba(255,160,180,${0.15 + i * 0.1});transform:rotate(-10deg)"></div>`).join('')}
  <div class="abs" style="left:160px;top:116px;width:72px;height:72px;border-radius:50%;background:radial-gradient(circle at 40% 38%,#fff 0%,#ffe0e6 30%,#ff6b8a 70%,rgba(255,60,100,0) 72%);box-shadow:0 0 60px 20px rgba(255,90,130,.45)"></div>
  <div class="abs" style="left:96px;top:92px;width:10px;height:10px;border-radius:50%;background:#fff;box-shadow:0 0 14px #fff"></div>
  <div class="abs" style="left:300px;top:150px;width:8px;height:8px;border-radius:50%;background:#fff;box-shadow:0 0 12px #fff"></div>
  <div class="abs" style="left:150px;top:228px;width:20px;height:20px;border-radius:50%;background:radial-gradient(circle,#fff,#ffb3c4 60%,transparent 70%)"></div>
  <div class="abs" style="left:26px;bottom:28px;font-size:26px;line-height:1.05;font-weight:550;letter-spacing:-.03em;color:#fff">Your growth,<br>in your hands</div>
  <div class="abs" style="right:24px;bottom:30px;font-size:9px;color:rgba(255,255,255,.55);text-align:right">Swipe to explore →</div>
  `,
    { cls: 'grain', style: '--grain:.22' },
  ),
);

/* colourful 3D blobs */
const blob = (x, y, w, h, c1, c2, r = 0, br = '50%') => `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:${br};transform:rotate(${r}deg);background:radial-gradient(circle at 32% 28%,#fff 0%,${c1} 18%,${c2} 85%);box-shadow:inset -10px -14px 24px rgba(0,0,0,.18),0 14px 24px rgba(0,0,0,.12)"></div>`;
A.push(
  ab(
    'gallery/blobs-illo',
    360,
    360,
    `
  <div class="fill" style="background:#e6d8be"></div>
  <svg class="fill" viewBox="0 0 360 360" fill="none" stroke="#3a2f22" stroke-width="2" stroke-linecap="round" opacity=".55"><path d="M20 320 C60 300 80 330 120 310 M240 40 c30 -10 60 10 90 0 M30 60 c10 20 30 20 40 0"/></svg>
  ${blob(70, 70, 150, 130, '#d9a8ff', '#8a3dff', -18, '58% 42% 55% 45%')}
  ${blob(190, 56, 120, 120, '#ffd27a', '#ff8a1f', 12, '46% 54% 48% 52%')}
  ${blob(150, 170, 150, 140, '#9ff7e0', '#18b8a0', 8, '52% 48% 60% 40%')}
  ${blob(60, 190, 120, 120, '#9fb8ff', '#2f4dff', -6, '50% 50% 42% 58%')}
  <svg class="abs" style="left:110px;top:110px;width:26px" viewBox="0 0 40 40"><path d="M20 2c2 10 8 16 18 18-10 2-16 8-18 18-2-10-8-16-18-18 10-2 16-8 18-18z" fill="#fff"/></svg>
  <svg class="abs" style="left:240px;top:230px;width:20px" viewBox="0 0 40 40"><path d="M20 2c2 10 8 16 18 18-10 2-16 8-18 18-2-10-8-16-18-18 10-2 16-8 18-18z" fill="#fff"/></svg>
  `,
    { cls: 'grain', style: '--grain:.2' },
  ),
);

export default A;
