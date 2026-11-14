import { ab, site, laptop, phone, tablet, photoBg, bars, lines, logos } from './lib.mjs';

const A = [];

/* ═════════════════════════════ VERDANT ═════════════════════════════ */
const vGold = '#e3d89a';
A.push(
  ab(
    'work/verdant-card',
    424,
    560,
    `
  <div class="fill" style="background:linear-gradient(165deg,#1a4d3f 0%,#0e2f27 45%,#081c17 100%)"></div>
  <div class="fill" style="background:repeating-linear-gradient(90deg,rgba(10,30,24,.0) 0 6px,rgba(232,220,160,.55) 6px 8.5px);-webkit-mask-image:linear-gradient(180deg,#000 0%,#000 64%,transparent 64.1%);opacity:.9"></div>
  <div class="fill" style="background:radial-gradient(ellipse 70% 30% at 35% 42%,rgba(255,245,200,.55),transparent 70%),radial-gradient(ellipse 60% 22% at 70% 18%,rgba(255,240,190,.35),transparent 70%);mix-blend-mode:overlay"></div>
  <div class="fill" style="background:linear-gradient(118deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,0) 26%,rgba(0,0,0,0) 40%,rgba(0,0,0,.5) 58%,rgba(0,0,0,0) 74%,rgba(0,0,0,.45) 100%);-webkit-mask-image:linear-gradient(180deg,#000 0%,#000 64%,transparent 64.1%)"></div>
  <div class="abs" style="left:0;right:0;top:64%;bottom:0;background:linear-gradient(180deg,#123c31 0%,#0b2620 100%)"></div>
  <div class="abs" style="left:0;right:0;top:64%;height:46px;background:linear-gradient(180deg,rgba(232,220,160,.25),transparent)"></div>
  <div class="abs" style="left:32px;top:36px;display:flex;align-items:center;gap:10px;color:${vGold};font-size:36px;font-weight:560;letter-spacing:-.02em"><span style="width:40px;height:40px;display:block">${logos.leaf}</span>Verdant</div>
  <div class="abs" style="left:32px;top:72%;color:#efe7c9;font-size:40px;line-height:1.06;font-weight:500;letter-spacing:-.035em">Verdant gives<br>your team a full<br>suite of tools</div>
  `,
    { cls: 'grain', style: '--grain:.22' },
  ),
);

const verdantSite = (k = 0.43) =>
  site({
    k,
    sw: 1280,
    sh: 820,
    bg: '#f6f5f0',
    ink: '#0d1f1a',
    muted: '#5b6762',
    line: 'rgba(13,31,26,.14)',
    accent: vGold,
    accentInk: '#0d1f1a',
    brand: 'Verdant',
    logo: 'leaf',
    links: ['Products', 'Solutions', 'Pricing', 'Company'],
    headline: 'Banking that grows<br>with your business',
    h1: '78px',
    sub: 'Accounts, cards, invoicing and spend control for modern teams — all in one calm place.',
    form: ['Enter your work email', 'Open account'],
    inputBg: '#fff',
    after: `<div class="site__cards" style="margin-top:58px">
      <div class="card" style="width:250px;height:250px;background:linear-gradient(160deg,#3b2e24,#15100c)"><div class="abs" style="left:30px;top:60px;width:190px;height:120px;border-radius:10px;background:#f4f3ee;transform:rotate(-8deg);box-shadow:0 20px 30px rgba(0,0,0,.4)"><div style="padding:14px">${lines(4, [70, 50, 80, 40])}</div><div class="abs" style="left:14px;right:14px;bottom:12px;height:40px">${bars([40, 60, 45, 80, 55, 90, 70], '#123d33', 4, 2)}</div></div></div>
      <div class="card" style="width:250px;height:250px;background:linear-gradient(160deg,#dfe7e2,#c9d6cf)"><div class="abs" style="left:40px;top:58px;width:170px;height:110px;border-radius:12px;background:linear-gradient(135deg,#1c5544,#0b2a22);box-shadow:0 18px 26px rgba(0,0,0,.25);transform:rotate(-6deg)"><div class="abs" style="left:14px;top:12px;color:${vGold};width:22px;height:22px">${logos.leaf}</div><div class="abs" style="right:14px;bottom:14px;color:#e8dfa9;font-size:13px;font-weight:600">VIRTUAL</div></div><div class="abs" style="left:96px;top:120px;width:120px;height:56px;border-radius:10px;background:#fff;box-shadow:0 10px 20px rgba(0,0,0,.15);padding:10px;font-size:15px;font-weight:650;color:#0d1f1a">$3,400<div style="font-size:10px;color:#7a8580;font-weight:500">this month</div></div></div>
      <div class="card" style="width:250px;height:250px;background:linear-gradient(160deg,#cfd9e6,#e9eef4)"><div class="abs" style="left:78px;top:34px;width:96px;height:196px;border-radius:18px;background:#111;padding:5px;box-shadow:0 16px 26px rgba(0,0,0,.25)"><div style="width:100%;height:100%;border-radius:14px;background:#fff;padding:18px 9px">${lines(3, [80, 60, 70], 'rgba(0,0,0,.14)', 5, 6)}<div style="height:70px;margin-top:14px">${bars([30, 55, 40, 75, 60, 90], '#2f6b58', 3, 2)}</div></div></div></div>
      <div class="card" style="width:250px;height:250px;background:#efe9d8"><div class="abs" style="left:34px;top:40px;right:34px;bottom:40px;border-radius:12px;background:#fff;box-shadow:0 10px 20px rgba(0,0,0,.08);padding:16px"><div style="font-size:13px;font-weight:650;color:#0d1f1a;margin-bottom:12px">Audit results</div>${[
        ['#f0b429', '+$367'],
        ['#2f6b58', '+$127'],
        ['#7a8580', '$84'],
      ]
        .map(
          ([c, v]) =>
            `<div style="display:flex;align-items:center;gap:8px;margin-top:10px"><i style="width:20px;height:20px;border-radius:50%;background:${c}"></i><span style="flex:1">${lines(1, [70], 'rgba(0,0,0,.14)', 5)}</span><b style="font-size:11px;color:#0d1f1a">${v}</b></div>`,
        )
        .join('')}</div></div>
    </div>`,
  });

A.push(
  ab(
    'work/verdant-site',
    715,
    480,
    `
  <div class="fill" style="background:#0d0a08"></div>
  ${photoBg([
    [78, 8, 70, 'radial-gradient(circle,#7a5a3a,#3a2a1c 60%,transparent 70%)', 0.9],
    [100, 60, 60, 'radial-gradient(circle,#5a3c26,transparent 70%)', 0.8],
    [8, 20, 45, 'radial-gradient(circle,#2a2018,transparent 70%)', 0.9],
  ])}
  ${laptop({ x: 148, y: 18, w: 560, h: 362, rx: 12, ry: -10, rz: 3.6, display: verdantSite(0.4245) })}
  `,
    { cls: 'grain vignette', style: '--grain:.35' },
  ),
);

A.push(
  ab(
    'work/verdant-wide',
    1200,
    680,
    `
  <div class="fill" style="background:linear-gradient(160deg,#dfe8e1,#cbd9cf)"></div>
  <div class="abs" style="left:90px;top:70px;right:90px;bottom:-30px;border-radius:22px;background:#fbfbf8;box-shadow:0 40px 80px rgba(13,31,26,.18);display:flex;overflow:hidden">
    <div style="width:220px;background:#0e2f27;padding:28px 22px;color:#cfe0d6">
      <div style="display:flex;align-items:center;gap:8px;color:${vGold};font-weight:600;font-size:19px"><span style="width:24px;height:24px">${logos.leaf}</span>Verdant</div>
      ${['Overview', 'Accounts', 'Cards', 'Invoices', 'Payroll', 'Insights']
        .map((t, i) => `<div style="margin-top:${i ? 14 : 34}px;padding:9px 12px;border-radius:9px;font-size:14px;${i === 0 ? 'background:rgba(227,216,154,.14);color:#f2ebc8' : ''}">${t}</div>`)
        .join('')}
    </div>
    <div style="flex:1;padding:30px 34px">
      <div style="display:flex;justify-content:space-between;align-items:center"><div style="font-size:26px;font-weight:600;color:#0d1f1a;letter-spacing:-.02em">Good morning, Ana</div><div style="height:38px;padding:0 16px;border-radius:10px;background:${vGold};display:flex;align-items:center;font-weight:600;font-size:14px;color:#0d1f1a">New payment</div></div>
      <div style="display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:16px;margin-top:24px">
        <div style="border-radius:16px;background:#0e2f27;padding:20px;color:#e9e2c2"><div style="font-size:13px;opacity:.75">Total balance</div><div style="font-size:34px;font-weight:600;letter-spacing:-.03em;margin-top:8px">$248,560.20</div><div style="height:70px;margin-top:16px">${bars([30, 45, 38, 60, 52, 70, 64, 82, 75, 90, 84, 96], 'rgba(227,216,154,.85)', 6, 3)}</div></div>
        <div style="border-radius:16px;background:#eef2ee;padding:20px"><div style="font-size:13px;color:#5b6762">Money in</div><div style="font-size:26px;font-weight:600;color:#0d1f1a;margin-top:8px">$82,140</div><div style="margin-top:16px">${lines(3, [90, 60, 75], 'rgba(13,31,26,.12)')}</div></div>
        <div style="border-radius:16px;background:#f5f0dd;padding:20px"><div style="font-size:13px;color:#5b6762">Money out</div><div style="font-size:26px;font-weight:600;color:#0d1f1a;margin-top:8px">$31,905</div><div style="margin-top:16px">${lines(3, [70, 90, 50], 'rgba(13,31,26,.12)')}</div></div>
      </div>
      <div style="margin-top:20px;border-radius:16px;background:#fff;border:1px solid #e6ebe7;padding:18px 20px">
        ${[
          ['Studio rent', 'Today', '-$4,200', '#c96a4a'],
          ['Client invoice #1042', 'Yesterday', '+$12,800', '#2f6b58'],
          ['Cloud services', 'Mon', '-$980', '#c96a4a'],
          ['Card cashback', 'Sun', '+$146', '#2f6b58'],
        ]
          .map(
            ([a, b, c, col], i) =>
              `<div style="display:flex;align-items:center;gap:14px;padding:11px 0;${i ? 'border-top:1px solid #eef1ee' : ''}"><i style="width:32px;height:32px;border-radius:10px;background:#eef2ee"></i><div style="flex:1"><div style="font-size:14px;font-weight:550;color:#0d1f1a">${a}</div><div style="font-size:12px;color:#8a948f">${b}</div></div><b style="font-size:14px;color:${col}">${c}</b></div>`,
          )
          .join('')}
      </div>
    </div>
  </div>
  `,
  ),
);

/* ═════════════════════════════ SPARK ═════════════════════════════ */
A.push(
  ab(
    'work/spark-brand',
    712,
    450,
    `
  <div class="fill" style="background:radial-gradient(ellipse 80% 75% at 50% 112%,#ffb35a 0%,#ff7b54 18%,#b04bff 42%,#4a2fd8 60%,#17123d 82%,#0c0a22 100%)"></div>
  <div class="fill" style="background:radial-gradient(ellipse 40% 30% at 50% 100%,rgba(255,220,150,.75),transparent 70%)"></div>
  <div class="abs" style="left:0;right:0;top:50%;transform:translateY(-55%);display:flex;align-items:center;justify-content:center;gap:22px;color:#fff">
    <span style="width:118px;height:118px;display:block;filter:drop-shadow(0 6px 18px rgba(0,0,0,.25))">${logos.bolt.replace('stroke-width="3.6"', 'stroke-width="5.2"')}</span>
    <span style="font-size:124px;font-weight:650;letter-spacing:-.055em;line-height:1">Spark</span>
  </div>
  `,
    { cls: 'grain', style: '--grain:.18' },
  ),
);

const envelope = (x, y, s, r, fill = '#fff') => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
  <rect x="-30" y="-20" width="60" height="40" rx="5" fill="${fill}" stroke="#111" stroke-width="2.4"/>
  <path d="M-28 -17 L0 4 L28 -17" fill="none" stroke="#111" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M-28 18 L-8 0 M28 18 L8 0" fill="none" stroke="#111" stroke-width="1.6" opacity=".5"/>
</g>`;

A.push(
  ab(
    'work/spark-illo',
    424,
    410,
    `
  <div class="fill" style="background:#ebe6d6"></div>
  <svg class="fill" viewBox="0 0 424 410">
    <defs>
      <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3f6dff"/><stop offset=".45" stop-color="#9a4dff"/><stop offset=".8" stop-color="#ff7d5c"/><stop offset="1" stop-color="#ffc35a"/></linearGradient>
      <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6f5bff"/><stop offset="1" stop-color="#ffb03a"/></linearGradient>
    </defs>
    <!-- base -->
    <path d="M58 286 L238 378 L392 300 L212 210 Z" fill="#fff" stroke="#111" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M58 286 L58 296 L238 388 L392 310 L392 300 L238 378 Z" fill="url(#edge)" stroke="#111" stroke-width="2.4" stroke-linejoin="round"/>
    ${Array.from({ length: 6 }, (_, r) =>
      Array.from({ length: 12 }, (_, c) => {
        const ox = 92 + c * 12.2 + r * 12.5;
        const oy = 278 - c * 6.2 + r * 6.4 - 30;
        return `<path d="M${ox} ${oy} l10 5 l9 -4.6 l-10 -5 z" fill="#f4f1ea" stroke="#111" stroke-width="1.1"/>`;
      }).join(''),
    ).join('')}
    <path d="M150 330 L186 348 L214 334 L178 316 Z" fill="#f4f1ea" stroke="#111" stroke-width="1.4"/>
    <!-- screen -->
    <path d="M212 210 L392 300 L404 140 L226 52 Z" fill="#111" stroke="#111" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M222 205 L384 286 L394 146 L234 66 Z" fill="url(#sg)"/>
    <path d="M222 205 L384 286 L394 146 L234 66 Z" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1"/>
    ${envelope(318, 70, 1.05, 18)}
    ${envelope(250, 132, 0.9, -24, '#fff')}
    ${envelope(355, 206, 0.95, 32)}
    ${envelope(300, 176, 0.62, -8, '#ffe2c4')}
    ${envelope(120, 120, 0.85, -14)}
    ${envelope(172, 52, 0.7, 12)}
    ${envelope(96, 210, 0.66, 22)}
  </svg>
  `,
  ),
);

A.push(
  ab(
    'work/spark-wide',
    1200,
    680,
    `
  <div class="fill" style="background:radial-gradient(ellipse 70% 80% at 50% 120%,#ffb35a 0%,#ff7b54 16%,#b04bff 38%,#4a2fd8 56%,#17123d 78%,#0c0a22 100%)"></div>
  ${site({
    k: 0.9375,
    sw: 1280,
    sh: 725,
    bg: 'transparent',
    ink: '#fff',
    muted: 'rgba(255,255,255,.72)',
    line: 'rgba(255,255,255,.25)',
    accent: '#fff',
    accentInk: '#17123d',
    brand: 'Spark',
    logo: 'bolt',
    links: ['Services', 'Work', 'Playbooks', 'About'],
    login: 'Case studies',
    cta: 'Book a call',
    eyebrow: '✦ Retention studio for e-commerce',
    headline: 'Campaigns your<br>customers actually open',
    h1: '96px',
    sub: 'Email, SMS and loyalty programs that turn first orders into lifelong fans.',
    buttons: '<span class="site__cta">See our work</span><span class="site__input" style="width:auto;color:#fff">Free audit →</span>',
  })}
  `,
    { cls: 'grain', style: '--grain:.16' },
  ),
);

/* ═════════════════════════════ NIMBUS ═════════════════════════════ */
const coin = (bg, label) =>
  `<i style="width:34px;height:34px;border-radius:50%;background:${bg};display:grid;place-items:center;color:#fff;font-style:normal;font-weight:700;font-size:15px">${label}</i>`;
const nimbusPhoneScreen = `
  <div style="padding:58px 20px 0;font-family:'Inter Variable'">
    <div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:17px">Interest account</b><span style="width:26px;height:26px;border-radius:50%;background:#eef1fb"></span></div>
    <div style="margin-top:20px;font-size:12px;color:#7d8597">Total balance</div>
    <div style="font-size:30px;font-weight:650;letter-spacing:-.03em">$42,580.20</div>
    <div style="display:inline-flex;margin-top:6px;padding:3px 8px;border-radius:99px;background:#e6f8ee;color:#1f9d5c;font-size:11px;font-weight:650">+ $184.06 this week</div>
    <div style="margin-top:20px;border-radius:16px;background:#f5f7fc;padding:6px 12px">
      ${[
        ['#f7931a', '₿', 'Bitcoin', '0.4821 BTC', '5.1%'],
        ['#627eea', 'Ξ', 'Ethereum', '6.120 ETH', '4.4%'],
        ['#2775ca', '$', 'USD Coin', '12,400 USDC', '8.2%'],
        ['#16c784', 'N', 'Nimbus', '3,050 NMB', '9.0%'],
      ]
        .map(
          ([c, l, n, a, apy], i) =>
            `<div style="display:flex;align-items:center;gap:10px;padding:10px 0;${i ? 'border-top:1px solid #e8ebf3' : ''}">${coin(c, l)}<div style="flex:1;min-width:0;white-space:nowrap"><div style="font-size:12.5px;font-weight:600">${n}</div><div style="font-size:10.5px;color:#8a91a3">${a}</div></div><span style="font-size:10.5px;font-weight:650;color:#3a5bff;background:#e8edff;padding:3px 6px;border-radius:99px">${apy}</span></div>`,
        )
        .join('')}
    </div>
  </div>`;
A.push(
  ab(
    'work/nimbus-phone',
    424,
    450,
    `
  <div class="fill" style="background:linear-gradient(170deg,#eef1f8,#dfe5f1)"></div>
  <div class="abs" style="left:-40px;top:-40px;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,#c8d3ff,transparent 70%);opacity:.8"></div>
  ${phone({ x: 86, y: 40, w: 250, h: 520, rot: -4, screen: nimbusPhoneScreen })}
  `,
  ),
);

const ringArt = (size) => `<div style="position:relative;width:${size}px;height:${size}px">
  ${[1, 0.78, 0.56, 0.34]
    .map((s, i) => `<i style="position:absolute;inset:${((1 - s) * size) / 2}px;border-radius:50%;border:1.5px solid rgba(169,184,255,${0.25 + i * 0.15})"></i>`)
    .join('')}
  <i style="position:absolute;inset:${size * 0.38}px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#a9b8ff 45%,#3a5bff 80%);box-shadow:0 0 ${size * 0.3}px rgba(90,120,255,.8)"></i>
</div>`;
const nimbusSite = (k) =>
  site({
    k,
    sw: 1280,
    sh: 800,
    bg: 'radial-gradient(ellipse 60% 70% at 78% 55%,#1f2f8a 0%,#0b1030 60%)',
    ink: '#fff',
    muted: 'rgba(220,228,255,.7)',
    line: 'rgba(255,255,255,.2)',
    accent: '#3a5bff',
    accentInk: '#fff',
    brand: 'Nimbus',
    logo: 'rings',
    links: ['Earn', 'Borrow', 'Card', 'Security'],
    align: 'left',
    headline: 'Earn, borrow<br>and save with<br>Nimbus',
    h1: '92px',
    h1w: '640px',
    sub: 'Up to 9% APY on your crypto. Private by default, insured and always yours.',
    subStyle: 'margin-left:0',
    buttons: '<span class="site__cta">Get the app</span><span class="site__input" style="width:auto;color:#fff">How it works</span>',
    after: `<div class="abs" style="right:90px;top:170px">${ringArt(470)}</div>`,
  });
A.push(
  ab(
    'work/nimbus-tablet',
    715,
    450,
    `
  <div class="fill" style="background:#0b0d14"></div>
  ${photoBg([
    [20, 85, 70, 'radial-gradient(circle,#2b2f45,transparent 70%)', 0.9],
    [90, 10, 60, 'radial-gradient(circle,#3a3326,transparent 70%)', 0.7],
  ])}
  ${tablet({ x: 112, y: 46, w: 520, h: 380, transform: 'perspective(1400px) rotateX(10deg) rotateY(14deg) rotateZ(-7deg)', screen: nimbusSite(0.3797) })}
  `,
    { cls: 'grain vignette', style: '--grain:.3' },
  ),
);

A.push(
  ab(
    'work/nimbus-wide',
    1200,
    680,
    `<div class="fill" style="background:#0b1030"></div>${nimbusSite(0.9375).replace('--sh:800px', '--sh:726px')}`,
    { cls: 'grain', style: '--grain:.12' },
  ),
);

/* ═════════════════════════════ LOOP REWARDS ═════════════════════════════ */
const goldCoin = (x, y, s, r = 0) => `<div class="abs" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px;border-radius:50%;transform:rotate(${r}deg);background:radial-gradient(circle at 35% 30%,#fff6c4,#ffd84a 35%,#f0a81c 75%,#c47a08);box-shadow:inset 0 -${s * 0.08}px 0 rgba(140,80,0,.35),0 ${s * 0.18}px ${s * 0.3}px rgba(90,60,160,.25)"><i style="position:absolute;inset:18%;border-radius:50%;border:${Math.max(2, s * 0.05)}px solid rgba(180,110,10,.45)"></i></div>`;
A.push(
  ab(
    'work/loop-logo',
    600,
    420,
    `
  <div class="fill" style="background:#ece7ff"></div>
  <svg class="fill" viewBox="0 0 600 420" fill="none" stroke="#b9a8ff" stroke-width="1.2" stroke-dasharray="4 6">
    <circle cx="300" cy="210" r="150"/><circle cx="300" cy="210" r="96"/><path d="M0 210 H600 M300 0 V420"/>
  </svg>
  <div class="abs" style="left:24px;top:22px;font-family:'Caveat Brush';font-size:24px;color:#8b78e6;transform:rotate(-3deg)">logo exploration v3</div>
  ${goldCoin(70, 250, 74, -12)}${goldCoin(460, 62, 58, 10)}${goldCoin(498, 300, 40, 0)}${goldCoin(120, 70, 34, 0)}
  <div class="abs" style="left:430px;top:250px;width:70px;height:70px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#d8c8ff,#7a4dff 70%);box-shadow:0 14px 24px rgba(90,60,200,.3)"></div>
  <div class="abs" style="left:0;right:0;top:50%;transform:translateY(-50%);display:flex;align-items:center;justify-content:center;gap:18px">
    <span style="width:92px;height:92px;border-radius:24px;background:#14121c;color:#f6f08a;display:grid;place-items:center;box-shadow:0 18px 30px rgba(20,18,28,.25)"><span style="width:70%;height:70%;display:block">${logos.loop}</span></span>
    <span style="font-size:62px;font-weight:680;letter-spacing:-.045em;color:#14121c;line-height:.95">Loop<br>Rewards</span>
  </div>
  `,
  ),
);

A.push(
  ab(
    'work/loop-3d',
    424,
    410,
    `
  <div class="fill" style="background:radial-gradient(circle at 70% 25%,#fffbd0,#f6f08a 45%,#e9dc4a)"></div>
  <svg class="fill" viewBox="0 0 424 410">
    <defs>
      <linearGradient id="lf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9d74ff"/><stop offset="1" stop-color="#5a2fe0"/></linearGradient>
      <linearGradient id="rf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a4dff"/><stop offset="1" stop-color="#3f1cb8"/></linearGradient>
      <linearGradient id="tp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c7b0ff"/><stop offset="1" stop-color="#9a74ff"/></linearGradient>
    </defs>
    <ellipse cx="212" cy="346" rx="130" ry="26" fill="rgba(120,100,0,.18)"/>
    <path d="M110 190 L212 240 L212 352 L110 302 Z" fill="url(#lf)"/>
    <path d="M212 240 L314 190 L314 302 L212 352 Z" fill="url(#rf)"/>
    <path d="M98 172 L212 226 L326 172 L212 118 Z" fill="url(#tp)"/>
    <path d="M98 172 L98 190 L212 244 L326 190 L326 172 L212 226 Z" fill="#6a3cf0"/>
    <path d="M150 145 L262 199 L262 216 L150 162 Z" fill="#ffd84a"/>
    <path d="M262 145 L150 199 L150 216 L262 162 Z" fill="#ffe680"/>
    <path d="M150 210 L150 322 L170 332 L170 220 Z" fill="#ffd84a"/>
    <path d="M254 220 L254 332 L274 322 L274 210 Z" fill="#e6b820"/>
    <path d="M206 120 C176 70 120 80 150 120 C162 136 190 130 206 122 Z" fill="#ffd84a" stroke="#c99b10" stroke-width="2"/>
    <path d="M218 120 C248 70 304 80 274 120 C262 136 234 130 218 122 Z" fill="#ffe680" stroke="#c99b10" stroke-width="2"/>
  </svg>
  ${goldCoin(48, 74, 64, -14)}${goldCoin(330, 252, 54, 8)}${goldCoin(318, 54, 36, 0)}
  <svg class="abs" style="left:60px;top:250px;width:44px" viewBox="0 0 40 40"><path d="M20 2c2 10 8 16 18 18-10 2-16 8-18 18-2-10-8-16-18-18 10-2 16-8 18-18z" fill="#fff"/></svg>
  `,
  ),
);

const loopScreen = (title, body, bg = '#fff') => `<div style="height:100%;background:${bg};padding:56px 18px 0">${title}${body}</div>`;
A.push(
  ab(
    'work/loop-wide',
    1200,
    680,
    `
  <div class="fill" style="background:linear-gradient(160deg,#ece7ff,#ddd3ff)"></div>
  ${phone({ x: 190, y: 90, w: 250, h: 520, rot: -6, screen: loopScreen('<div style="font-size:13px;color:#77708f">Cashback earned</div><div style="font-size:32px;font-weight:650;letter-spacing:-.03em">$318.40</div>', `<div style="margin-top:18px;height:120px;border-radius:16px;background:#14121c;padding:14px;color:#f6f08a;font-weight:650;font-size:13px">Loop card<div style="margin-top:46px;color:#fff;font-weight:500;letter-spacing:2px">•••• 4821</div></div>${['Groceries 3%', 'Travel 5%', 'Coffee 10%', 'Books 4%'].map((t) => `<div style="display:flex;justify-content:space-between;margin-top:14px;font-size:13px"><span>${t.split(' ')[0]}</span><b style="color:#7a4dff">${t.split(' ')[1]}</b></div>`).join('')}`) })}
  ${phone({ x: 476, y: 60, w: 250, h: 520, rot: 0, screen: loopScreen('<div style="font-size:20px;font-weight:650">Rewards</div>', `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px">${['#f6f08a', '#e9e3ff', '#ffd9c2', '#d4f5e5'].map((c, i) => `<div style="height:96px;border-radius:14px;background:${c};padding:10px;font-size:12px;font-weight:650">${['Coffee', 'Books', 'Travel', 'Fitness'][i]}<div style="font-size:20px;margin-top:22px">${[10, 4, 5, 6][i]}%</div></div>`).join('')}</div>`) })}
  ${phone({ x: 762, y: 100, w: 250, h: 520, rot: 6, screen: loopScreen('', `<div style="display:grid;place-items:center;height:70%;"><div style="width:120px;height:120px;border-radius:30px;background:#14121c;color:#f6f08a;display:grid;place-items:center"><span style="width:70%;height:70%;display:block">${logos.loop}</span></div><div style="font-size:22px;font-weight:680;letter-spacing:-.03em;margin-top:16px">Loop Rewards</div></div>`, '#f6f08a') })}
  `,
  ),
);

/* ═════════════════════════════ MINDLY ═════════════════════════════ */
A.push(
  ab(
    'work/mindly-app',
    424,
    350,
    `
  <div class="fill" style="background:#0e100f"></div>
  <div class="abs" style="right:-60px;bottom:-80px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(61,220,132,.35),transparent 70%)"></div>
  <div class="abs" style="left:42px;top:40px;height:54px;width:170px;border-radius:999px;background:#1a1d1b;box-shadow:inset 0 1px 0 rgba(255,255,255,.06);display:flex;align-items:center;justify-content:space-around;padding:0 12px">
    ${['M4 6h16M4 12h16M4 18h10', 'M12 3v12m-5-5a5 5 0 0 0 10 0M12 15v6', 'M6 6l12 12M18 6L6 18']
      .map((d) => `<svg viewBox="0 0 24 24" style="width:22px;height:22px" fill="none" stroke="#cfd6d1" stroke-width="2" stroke-linecap="round"><path d="${d}"/></svg>`)
      .join('')}
  </div>
  <div class="abs" style="left:42px;top:118px;width:170px;height:150px;border-radius:22px;background:#17191a;box-shadow:inset 0 1px 0 rgba(255,255,255,.05);display:grid;place-items:center">
    <div style="width:64px;height:64px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#8af0b9,#3ddc84 50%,#1a7a4a);box-shadow:0 0 40px rgba(61,220,132,.45)"></div>
  </div>
  <div class="abs" style="left:232px;top:40px;width:150px;height:228px;border-radius:22px;background:#17191a;padding:18px">
    <div style="font-size:12px;color:#7d8a83">Today</div>
    <div style="font-size:16px;color:#e8efe9;font-weight:600;margin-top:4px">Team recap</div>
    <div style="margin-top:14px">${lines(6, [92, 70, 85, 60, 78, 50], 'rgba(220,240,228,.14)', 6, 9)}</div>
    <div style="position:absolute;left:18px;right:18px;bottom:18px;height:34px;border-radius:12px;background:#3ddc84;color:#0d0f0e;font-size:12px;font-weight:700;display:grid;place-items:center">Ask Mindly</div>
  </div>
  `,
    { cls: 'grain', style: '--grain:.15' },
  ),
);

const stars = (n, w, h, seed = 1) => {
  let s = seed;
  const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: n }, () => `<i style="position:absolute;left:${(r() * w).toFixed(0)}px;top:${(r() * h).toFixed(0)}px;width:${(1 + r() * 2).toFixed(1)}px;height:${(1 + r() * 2).toFixed(1)}px;border-radius:50%;background:#fff;opacity:${(0.3 + r() * 0.6).toFixed(2)}"></i>`).join('');
};
const mindlySite = (k) =>
  site({
    k,
    sw: 1280,
    sh: 780,
    bg: 'radial-gradient(ellipse 55% 70% at 88% 92%,#3ddc84 0%,#156b43 25%,#0d2318 50%,#0b0d0c 75%)',
    ink: '#f2f7f3',
    muted: 'rgba(225,240,230,.66)',
    line: 'rgba(255,255,255,.18)',
    accent: '#3ddc84',
    accentInk: '#0b0d0c',
    brand: 'mindly',
    logo: 'spark',
    links: ['Product', 'Extension', 'Teams', 'Pricing'],
    align: 'left',
    headline: 'Long-term memory<br>for your team chats',
    h1: '88px',
    h1w: '980px',
    sub: 'Mindly remembers every decision, file and idea — and answers in seconds.',
    subStyle: 'margin-left:0',
    buttons: '<span class="site__cta">Try it free</span><span class="site__input" style="width:auto;color:#fff">Watch demo</span>',
    backdrop: `<div class="fill">${stars(80, 1280, 780, 7)}</div>`,
  });
A.push(ab('work/mindly-site', 715, 430, `<div class="fill" style="background:#0b0d0c"></div>${mindlySite(0.5586).replace('--sh:780px', '--sh:770px')}`, { cls: 'grain', style: '--grain:.14' }));
A.push(
  ab(
    'work/mindly-wide',
    1200,
    680,
    `
  <div class="fill" style="background:radial-gradient(ellipse 60% 80% at 80% 100%,#1f7a4c,#0d1612 60%,#0a0c0b)"></div>
  <div class="abs" style="left:90px;top:70px;right:90px;bottom:-30px;border-radius:22px;background:#111413;box-shadow:0 40px 80px rgba(0,0,0,.5);display:flex;overflow:hidden;border:1px solid #232826">
    <div style="width:230px;border-right:1px solid #222725;padding:26px 20px;color:#a9b6ae;font-size:14px">
      <div style="display:flex;align-items:center;gap:8px;color:#eaf3ed;font-weight:650;font-size:18px"><span style="width:22px;height:22px;color:#3ddc84">${logos.spark}</span>mindly</div>
      ${['# product', '# design-crit', '# launch-week', '# research', '# random'].map((t, i) => `<div style="margin-top:${i ? 10 : 30}px;padding:8px 10px;border-radius:8px;${i === 2 ? 'background:#1c2420;color:#eaf3ed' : ''}">${t}</div>`).join('')}
    </div>
    <div style="flex:1;padding:28px 34px;color:#eaf3ed">
      <div style="font-size:22px;font-weight:600">Ask your workspace</div>
      <div style="margin-top:18px;height:54px;border-radius:14px;background:#1a1f1d;border:1px solid #2a312e;display:flex;align-items:center;padding:0 18px;color:#93a39a;font-size:15px">What did we decide about the launch date?</div>
      <div style="margin-top:22px;border-radius:16px;background:#151a18;border:1px solid #233b2e;padding:20px">
        <div style="display:flex;align-items:center;gap:10px;color:#3ddc84;font-weight:650;font-size:14px"><i style="width:10px;height:10px;border-radius:50%;background:#3ddc84;box-shadow:0 0 12px #3ddc84"></i>Mindly</div>
        <div style="margin-top:12px;font-size:15px;line-height:1.55;color:#cdd8d1">The team agreed to launch on <b style="color:#fff">May 14</b>, after the design review on Friday. Ana owns the press kit and Leo the landing page.</div>
        <div style="display:flex;gap:10px;margin-top:16px">${['#launch-week · Mar 3', 'Kickoff doc', 'Roadmap.pdf'].map((t) => `<span style="padding:6px 10px;border-radius:8px;background:#1f2623;font-size:12px;color:#9fb1a7">${t}</span>`).join('')}</div>
      </div>
      <div style="margin-top:22px">${lines(4, [80, 64, 72, 40], 'rgba(220,240,228,.1)', 8, 12)}</div>
    </div>
  </div>
  `,
    { cls: 'grain', style: '--grain:.12' },
  ),
);

/* ═════════════════════════════ FORTLINE ═════════════════════════════ */
const swirl = `<svg viewBox="0 0 400 300" style="width:100%;height:100%"><defs><linearGradient id="fw" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2f4dff"/><stop offset=".55" stop-color="#b56bff"/><stop offset="1" stop-color="#ff8de8"/></linearGradient><radialGradient id="fg" cx=".7" cy=".55" r=".5"><stop offset="0" stop-color="#2f4dff" stop-opacity=".5"/><stop offset="1" stop-color="#2f4dff" stop-opacity="0"/></radialGradient></defs>
  <rect width="400" height="300" fill="#07070a"/><rect width="400" height="300" fill="url(#fg)"/>
  ${[60, 90, 120, 150].map((r) => `<circle cx="300" cy="170" r="${r}" fill="none" stroke="rgba(255,255,255,.08)"/>`).join('')}
  <path d="M60 120 C120 40 210 60 200 120 C190 180 110 170 150 210 C190 250 280 200 330 170" fill="none" stroke="url(#fw)" stroke-width="38" stroke-linecap="round"/>
  <circle cx="330" cy="170" r="16" fill="#fff"/>
  <path d="M120 230 l16-10 16 10-16 10z" fill="#9aa3b5"/><path d="M250 70 l12-8 12 8-12 8z" fill="#9aa3b5"/>
</svg>`;
const fortSite = (k) =>
  site({
    k,
    sw: 1280,
    sh: 800,
    bg: '#fbfbfc',
    ink: '#0a0a0d',
    muted: '#6b6e78',
    accent: '#0a0a0d',
    accentInk: '#fff',
    brand: 'Fortline',
    logo: 'shield',
    links: ['Platform', 'Pentests', 'Customers', 'Docs'],
    align: 'left',
    headline: 'Find weak spots<br>before attackers do',
    h1: '66px',
    h1w: '600px',
    sub: 'Continuous pentesting for fast teams. Real hackers, real reports, zero noise.',
    subStyle: 'margin-left:0;max-width:440px',
    buttons: '<span class="site__cta">Book a demo</span>',
    after: `<div class="abs" style="right:48px;top:110px;width:540px;height:430px;border-radius:24px;overflow:hidden">${swirl}</div>
      <div class="abs" style="left:48px;right:48px;bottom:40px;display:flex;gap:16px">${['#ff8de8', '#2f4dff', '#f1f1f4'].map((c, i) => `<div style="flex:1;height:120px;border-radius:18px;background:${c};padding:20px;color:${i === 1 ? '#fff' : '#0a0a0d'};font-weight:650;font-size:18px">${['Continuous protection', 'Attack surface map', 'Compliance ready'][i]}</div>`).join('')}</div>`,
  });
A.push(
  ab(
    'work/fortline-laptop',
    712,
    450,
    `
  <div class="fill" style="background:#0b0c12"></div>
  ${photoBg([
    [10, 90, 70, 'radial-gradient(circle,#232a4a,transparent 70%)', 0.9],
    [92, 12, 55, 'radial-gradient(circle,#3a2238,transparent 70%)', 0.8],
  ])}
  ${laptop({ x: 70, y: 30, w: 560, h: 350, rx: 14, ry: 14, rz: -6, display: fortSite(0.4245) })}
  `,
    { cls: 'grain vignette', style: '--grain:.3' },
  ),
);
A.push(
  ab(
    'work/fortline-card',
    280,
    300,
    `
  <div class="fill" style="background:linear-gradient(160deg,#ffa6ee,#ff7fe2)"></div>
  <div class="abs" style="left:24px;top:24px;width:46px;height:46px;border-radius:14px;background:rgba(255,255,255,.55);display:grid;place-items:center;color:#7a1663"><span style="width:28px;height:28px;display:block">${logos.shield}</span></div>
  <div class="abs" style="left:24px;right:24px;top:96px;font-size:26px;line-height:1.05;font-weight:650;letter-spacing:-.03em;color:#3a0830">Continuous<br>protection</div>
  <div class="abs" style="left:24px;right:24px;top:170px;font-size:13px;line-height:1.45;color:#5d1550">Ongoing pentests that find and fix vulnerabilities before they can be exploited.</div>
  <div class="abs" style="left:24px;bottom:22px;font-size:13px;font-weight:650;color:#3a0830">Learn more →</div>
  `,
  ),
);
A.push(
  ab(
    'work/fortline-mini',
    150,
    300,
    `
  <div class="fill" style="background:#0d0d10"></div>
  <div class="abs" style="left:16px;top:18px;width:30px;height:30px;border-radius:9px;background:#1d1d24;display:grid;place-items:center;color:#ff8de8"><span style="width:18px;height:18px;display:block">${logos.bolt}</span></div>
  <div class="abs" style="left:16px;right:12px;top:66px;font-size:17px;line-height:1.08;font-weight:650;color:#fff;letter-spacing:-.02em">Cost-<br>effective<br>plans</div>
  <div class="abs" style="left:16px;right:14px;top:150px;font-size:10px;line-height:1.45;color:#9a9aa8">Pay for results, not for seats. Cancel anytime.</div>
  <div class="abs" style="left:16px;right:16px;bottom:16px;height:30px;border-radius:9px;background:#2f4dff;color:#fff;font-size:11px;font-weight:650;display:grid;place-items:center">Compare</div>
  `,
  ),
);
A.push(ab('work/fortline-wide', 1200, 680, `<div class="fill" style="background:#fbfbfc"></div>${fortSite(0.9375).replace('--sh:800px', '--sh:726px')}`));

export default A;
