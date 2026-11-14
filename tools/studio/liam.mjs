import { ab, crop, card, phone, browser, laptop, mascot, dieCut, S } from './lib.mjs';
import { fs } from './screens.mjs';
import * as brand from '../../src/lib/brand-svgs.mjs';

/* ───────────── shared looks ───────────── */
const bg = {
  ferox: 'radial-gradient(ellipse 80% 70% at 50% 18%,#3f8c66 0%,#2f5843 48%,#1b3428 100%)',
  feroxLight: 'radial-gradient(ellipse 70% 80% at 50% 20%,#f3fbf6 0%,#dff1e7 55%,#c8e7d6 100%)',
  swipe: 'radial-gradient(ellipse 70% 55% at 50% 100%,rgba(237,198,75,.45) 0%,rgba(237,198,75,0) 70%),#09090b',
  sky: 'radial-gradient(ellipse 90% 80% at 30% 0%,#e3f9ff 0%,#b9effc 45%,#9fe6f6 100%)',
  mendo: 'radial-gradient(ellipse 90% 80% at 50% 0%,#fbf8f2 0%,#efe7da 55%,#e2d6c3 100%)',
  lucero: 'linear-gradient(160deg,#e3e4fd 0%,#efeafb 45%,#fdf4e4 100%)',
  guita: 'radial-gradient(ellipse 70% 60% at 50% 100%,rgba(119,222,160,.42) 0%,rgba(119,222,160,0) 70%),radial-gradient(ellipse 60% 50% at 50% 0%,#1b1f1d 0%,#070807 70%)',
};

/* ───────────── work cards: narrow (480×440) / wide (800×430) / case cover (1200×680) ───────────── */
const work = [
  // FEROX ─ Flutter social app
  ab('work/ferox-a', 480, 440, `
    <div class="fill" style="background:${bg.ferox}"></div>
    <div class="fill" style="background:radial-gradient(circle at 50% 46%,rgba(70,194,147,.55),rgba(70,194,147,0) 42%)"></div>
    ${crop('ferox-phones', [322, 28, 324, 666], 228, 'left:126px;top:30px;transform:rotate(-5deg);filter:drop-shadow(0 30px 40px rgba(0,0,0,.45))')}
  `, { cls: 'grain' }),
  ab('work/ferox-b', 800, 430, `
    <div class="fill" style="background:${bg.feroxLight}"></div>
    <img class="abs" src="${S('ferox-phones')}" style="width:600px;left:100px;top:22px;filter:drop-shadow(0 26px 34px rgba(16,60,40,.28))">
  `, { cls: 'grain', style: '--grain:.12' }),
  ab('work/ferox-cover', 1200, 680, `
    <div class="fill" style="background:${bg.ferox}"></div>
    <div class="fill" style="background:radial-gradient(ellipse 50% 45% at 50% 55%,rgba(70,194,147,.5),rgba(70,194,147,0) 70%)"></div>
    <img class="abs" src="${S('ferox-phones')}" style="width:880px;left:160px;top:24px;filter:drop-shadow(0 40px 50px rgba(0,0,0,.45))">
  `, { cls: 'grain' }),

  // SWIPELOOP ─ AI carousels SaaS
  ab('work/swipeloop-a', 480, 440, `
    <div class="fill" style="background:${bg.swipe}"></div>
    <div class="fill dots" style="--dot:.09"></div>
    ${card('swipeloop-desktop', [750, 535, 275, 345], 182, 'left:30px;top:74px;transform:rotate(-9deg)', 8)}
    ${card('swipeloop-desktop', [2255, 495, 325, 435], 200, 'left:262px;top:52px;transform:rotate(8deg)', 8)}
    ${card('swipeloop-desktop', [1985, 535, 270, 345], 214, 'left:132px;top:40px;transform:rotate(-1.5deg);--sh:0 30px 60px -10px rgba(0,0,0,.7)', 8)}
  `, { cls: 'grain' }),
  ab('work/swipeloop-cover', 1200, 680, `
    <div class="fill" style="background:${bg.swipe}"></div>
    <div class="fill dots" style="--dot:.08"></div>
    ${browser({ src: 'swipeloop-desktop', w: 1000, url: 'swipeloop.app', dark: true, style: 'left:100px;top:70px;--sh:0 40px 90px -20px rgba(0,0,0,.8)' })}
  `, { cls: 'grain' }),

  // CLIENTIX ─ lead generation SaaS
  ab('work/clientix-a', 480, 440, `
    <div class="fill" style="background:${bg.sky}"></div>
    ${card('clientix-find', [690, 340, 440, 298], 388, 'left:22px;top:30px;transform:rotate(-2.5deg)', 16)}
    ${card('clientix-demo', [330, 336, 812, 330], 392, 'left:70px;top:206px;transform:rotate(3deg)', 14)}
  `, { cls: 'grain', style: '--grain:.12' }),
  ab('work/clientix-cover', 1200, 680, `
    <div class="fill" style="background:${bg.sky}"></div>
    ${browser({ src: 'clientix-hero', w: 1000, url: 'clientix.app', style: 'left:100px;top:56px;--sh:0 40px 80px -24px rgba(20,80,110,.45)' })}
  `, { cls: 'grain', style: '--grain:.1' }),

  // HEADLESS COMMERCE ─ Mendo & co.
  ab('work/commerce-a', 480, 440, `
    <div class="fill" style="background:${bg.mendo}"></div>
    ${card('mendo-hero', [120, 150, 1120, 300], 352, 'left:32px;top:40px;transform:rotate(-2deg);--r:16px', 16)}
    ${card('mendo-hero', [2207, 870, 643, 552], 300, 'left:150px;top:150px;transform:rotate(3deg)', 16)}
  `, { cls: 'grain', style: '--grain:.14' }),
  ab('work/commerce-b', 800, 430, `
    <div class="fill" style="background:${bg.mendo}"></div>
    ${browser({ src: 'mendo-hero', w: 700, url: 'mendohomefurniture.com', style: 'left:50px;top:34px;--sh:0 34px 70px -18px rgba(70,50,20,.38)' })}
  `, { cls: 'grain', style: '--grain:.14' }),
  ab('work/commerce-cover', 1200, 680, `
    <div class="fill" style="background:${bg.mendo}"></div>
    ${browser({ src: 'mendo-hero', w: 1000, url: 'mendohomefurniture.com', style: 'left:100px;top:66px;--sh:0 40px 80px -20px rgba(70,50,20,.4)' })}
  `, { cls: 'grain', style: '--grain:.14' }),

  // LUCERO ─ Bible learning web app
  ab('work/lucero-a', 480, 440, `
    <div class="fill" style="background:${bg.lucero}"></div>
    <div class="fill" style="background:radial-gradient(circle at 70% 18%,rgba(255,214,120,.55),rgba(255,214,120,0) 40%)"></div>
    ${phone({ screen: fs.lucero, w: 262, style: 'left:109px;top:44px;transform:rotate(-4deg);--sh:0 40px 60px -16px rgba(49,60,140,.45)' })}
  `, { cls: 'grain', style: '--grain:.12' }),
  ab('work/lucero-b', 800, 430, `
    <div class="fill" style="background:${bg.lucero}"></div>
    ${browser({ src: 'lucero-desktop', w: 700, url: 'lucerobiblia.com.ar', style: 'left:50px;top:34px;--sh:0 34px 70px -18px rgba(49,60,140,.35)' })}
  `, { cls: 'grain', style: '--grain:.12' }),
  ab('work/lucero-cover', 1200, 680, `
    <div class="fill" style="background:${bg.lucero}"></div>
    ${browser({ src: 'lucero-desktop', w: 1000, url: 'lucerobiblia.com.ar', style: 'left:100px;top:66px;--sh:0 40px 80px -20px rgba(49,60,140,.38)' })}
  `, { cls: 'grain', style: '--grain:.12' }),

  // GUITA ─ personal finance app
  ab('work/guita-a', 480, 440, `
    <div class="fill" style="background:${bg.guita}"></div>
    ${phone({ screen: fs['guita-hoy'], w: 196, style: 'left:142px;top:12px;transform:rotate(-4deg);--sh:0 30px 70px -10px rgba(0,0,0,.8)' })}
    ${dieCut('dc-guita-a', 6)}
    <div class="abs" style="left:318px;top:52px;transform:rotate(12deg);filter:url(#dc-guita-a) drop-shadow(0 14px 18px rgba(0,0,0,.55))">${mascot(118, 'display:block')}</div>
  `, { cls: 'grain' }),
  ab('work/guita-b', 800, 430, `
    <div class="fill" style="background:${bg.guita}"></div>
    <div class="p3d" style="--persp:1400px">
      ${phone({ screen: fs['guita-hoy'], w: 182, style: 'left:205px;top:20px;transform:rotateY(18deg) rotateZ(-4deg);--sh:0 30px 60px -10px rgba(0,0,0,.8)' })}
      ${phone({ screen: fs['guita-login'], w: 182, style: 'left:420px;top:28px;transform:rotateY(-18deg) rotateZ(4deg);--sh:0 30px 60px -10px rgba(0,0,0,.8)' })}
    </div>
  `, { cls: 'grain' }),
  ab('work/guita-cover', 1200, 680, `
    <div class="fill" style="background:${bg.guita}"></div>
    <div class="p3d" style="--persp:1600px">
      ${phone({ screen: fs['guita-hoy'], w: 288, style: 'left:300px;top:30px;transform:rotateY(16deg) rotateZ(-4deg);--sh:0 40px 80px -10px rgba(0,0,0,.85)' })}
      ${phone({ screen: fs['guita-login'], w: 288, style: 'left:630px;top:42px;transform:rotateY(-16deg) rotateZ(4deg);--sh:0 40px 80px -10px rgba(0,0,0,.85)' })}
      ${mascot(170, 'position:absolute;left:965px;top:96px;transform:rotate(10deg);filter:drop-shadow(0 18px 24px rgba(0,0,0,.5))')}
    </div>
  `, { cls: 'grain' }),
];

/* ───────────── gallery tiles (sizes keep the board layout) ───────────── */
const gallery = [
  ab('gallery/pomodoro', 380, 320, `
    <div class="fill" style="background:radial-gradient(ellipse 80% 80% at 50% 30%,#8a4b1c 0%,#5a2f12 55%,#341a09 100%)"></div>
    ${phone({ screen: fs.pomodoro, w: 146, style: 'left:118px;top:12px;transform:rotate(7deg);--sh:0 26px 40px -8px rgba(0,0,0,.6)' })}
  `, { cls: 'grain' }),
  ab('gallery/advantis-landing', 560, 410, `
    <div class="fill" style="background:radial-gradient(ellipse 80% 70% at 30% 20%,#174a8c 0%,#0b2245 50%,#050c19 100%)"></div>
    <div class="fill" style="background:radial-gradient(circle at 62% 64%,rgba(39,168,240,.45),rgba(39,168,240,0) 45%)"></div>
    <img class="abs" src="${S('advantis-landing')}" style="width:600px;left:-22px;top:-12px;filter:drop-shadow(0 30px 40px rgba(0,0,0,.55))">
  `, { cls: 'grain' }),
  ab('gallery/clientix', 380, 300, `${crop('clientix-demo', [150, 0, 912, 720], 380, 'left:0;top:0')}`),
  ab('gallery/fmoney', 480, 380, `
    <div class="fill" style="background:radial-gradient(ellipse 80% 80% at 50% 30%,#f6f4ff 0%,#e7e2ff 60%,#d9d2fb 100%)"></div>
    <img class="abs" src="${S('fmoney-tablets')}" style="width:500px;left:-10px;top:4px;filter:drop-shadow(0 24px 30px rgba(60,40,140,.25))">
  `, { cls: 'grain', style: '--grain:.1' }),
  ab('gallery/crm', 550, 360, `${crop('crm-reportes', [0, 0, 2268, 1484], 550, 'left:0;top:0')}`),
  ab('gallery/swipeloop-posters', 544, 400, `${crop('swipeloop-desktop', [760, 170, 1480, 1088], 544, 'left:0;top:0')}`),
  ab('gallery/advantis-dash', 530, 360, `
    <div class="fill" style="background:radial-gradient(ellipse 80% 70% at 70% 20%,#1c2140 0%,#0b0f1f 55%,#04060d 100%)"></div>
    <div class="fill" style="background:radial-gradient(circle at 70% 40%,rgba(140,90,255,.35),rgba(140,90,255,0) 45%)"></div>
    <img class="abs" src="${S('advantis-dash')}" style="width:560px;left:-16px;top:-26px;filter:drop-shadow(0 28px 36px rgba(0,0,0,.6))">
  `, { cls: 'grain' }),
  ab('gallery/lucero-laptop', 420, 340, `
    <div class="fill" style="background:${bg.lucero}"></div>
    <div class="fill" style="background:radial-gradient(circle at 78% 16%,rgba(255,214,120,.6),rgba(255,214,120,0) 42%)"></div>
    ${laptop({ src: 'lucero-desktop', w: 352, style: 'left:34px;top:70px;--sh:0 26px 44px -14px rgba(49,60,140,.45)' })}
  `, { cls: 'grain', style: '--grain:.1' }),
];

/* ───────────── polaroid photos (300×300 → 600×600) ───────────── */
const pol = (id, inner, style = '') => ab(`story/${id}`, 300, 300, inner, { cls: 'grain', style: `--grain:.16;${style}`, out: 480 });
const story = [
  pol('map', `
    <div class="fill" style="background:radial-gradient(circle at 40% 30%,#fffdf8,#efe9dc)"></div>
    <img class="abs" src="${S('sa-map')}" style="width:300px;left:6px;top:4px">
    <svg class="abs" viewBox="0 0 40 52" style="width:30px;left:164px;top:142px;filter:drop-shadow(0 4px 3px rgba(0,0,0,.35))"><path d="M20 2C10 2 3 9.5 3 19c0 12 17 31 17 31s17-19 17-31C37 9.5 30 2 20 2z" fill="#ff4b3a" stroke="#fff" stroke-width="3"/><circle cx="20" cy="19" r="6" fill="#fff"/></svg>
  `),
  pol('knight', crop('pomodoro', [100, 832, 664, 664], 300, 'left:0;top:0')),
  pol('guita', `
    <div class="fill" style="background:radial-gradient(circle at 50% 40%,#1c2a22 0%,#0b100d 75%)"></div>
    <div class="fill" style="background:radial-gradient(circle at 50% 60%,rgba(119,222,160,.35),rgba(119,222,160,0) 55%)"></div>
    ${mascot(232, 'position:absolute;left:34px;top:80px;transform:rotate(-6deg)')}
  `),
  pol('posters', crop('swipeloop-desktop', [1990, 470, 600, 600], 300, 'left:0;top:0')),
  pol('alien', crop('nch-alien', [1040, 300, 760, 760], 300, 'left:0;top:0')),
  pol('lucero', crop('lucero-mobile', [46, 150, 890, 890], 300, 'left:0;top:0')),
  // more projects for the rotating wheel
  pol('ferox', crop('ferox-screen', [6, 88, 272, 272], 300, 'left:0;top:0')),
  pol('ferox-logo', `
    <div class="fill" style="background:radial-gradient(circle at 50% 38%,#1d5238 0%,#0c2117 62%,#07130d 100%)"></div>
    <div class="abs" style="left:103px;top:44px;width:94px;filter:drop-shadow(0 14px 18px rgba(0,0,0,.45))">${brand.ferox.replace('<svg', '<svg style="display:block;width:100%;height:auto"')}</div>
    <div class="abs" style="left:0;right:0;top:222px;text-align:center;font:800 30px/1 'Inter Variable';letter-spacing:.06em;color:#00bc74">FEROX</div>
  `),
  pol('swipeloop-logo', `
    <div class="fill" style="background:radial-gradient(circle at 50% 40%,#2b2510 0%,#0b0b0c 72%)"></div>
    <div class="fill" style="background:radial-gradient(circle at 50% 42%,rgba(245,197,24,.45),rgba(245,197,24,0) 45%)"></div>
    <div class="abs" style="left:88px;top:52px;width:124px;filter:drop-shadow(0 16px 22px rgba(0,0,0,.55))">${brand.swipeloop.replace('<svg', '<svg style="display:block;width:100%;height:auto"')}</div>
    <div class="abs" style="left:0;right:0;top:212px;text-align:center;font:750 30px/1 'Inter Variable';letter-spacing:-.03em;color:#fff">Swipe<span style="color:#f5c518">Loop</span></div>
  `),
  pol('clientix-logo', `
    <div class="fill" style="background:radial-gradient(circle at 50% 36%,#13385c 0%,#081a2e 60%,#050f1c 100%)"></div>
    <div class="fill" style="background:radial-gradient(circle at 50% 38%,rgba(59,202,251,.35),rgba(59,202,251,0) 42%)"></div>
    <div class="abs" style="left:100px;top:46px;width:100px;filter:drop-shadow(0 12px 18px rgba(0,0,0,.45))">${brand.clientix.replace('<svg', '<svg style="display:block;width:100%;height:auto"')}</div>
    <div class="abs" style="left:66px;top:192px;width:168px;color:#fff">${brand.clientixWordmark.replace('<svg', '<svg style="display:block;width:100%;height:auto"')}</div>
  `),
  pol('easyhome', `
    <div class="fill" style="background:radial-gradient(circle at 50% 40%,#ffffff 0%,#f3f1ec 100%)"></div>
    <img class="abs" src="${S('easyhome-logo')}" style="left:26px;top:112px;width:248px">
  `),
  pol('clientix', crop('clientix-rubros', [338, 50, 330, 330], 300, 'left:0;top:0')),
  pol('mendo', crop('mendo-hero', [1020, 560, 760, 760], 300, 'left:0;top:0')),
  pol('holo', crop('holo-mobile', [0, 110, 994, 994], 300, 'left:0;top:0')),
  pol('advantis', `
    <div class="fill" style="background:radial-gradient(ellipse 80% 70% at 30% 20%,#174a8c 0%,#0b2245 50%,#050c19 100%)"></div>
    <img class="abs" src="${S('advantis-landing')}" style="width:430px;left:-70px;top:-24px">
  `),
  pol('crm', crop('crm-reportes', [1360, 300, 1098, 1098], 300, 'left:0;top:0')),
];

/* ───────────── peelable stickers (transparent) ───────────── */
const stk = (id, w, h, inner) => ab(`stickers/${id}`, w, h, inner, { cls: 'alpha' });
const stickers = [
  stk('map', 240, 260, `
    ${dieCut('dc-map', 9)}
    <div class="abs" style="left:14px;top:12px;filter:url(#dc-map)">
      <img src="${S('sa-map')}" style="display:block;width:212px">
      <svg viewBox="0 0 40 52" style="position:absolute;width:26px;left:108px;top:92px"><path d="M20 2C10 2 3 9.5 3 19c0 12 17 31 17 31s17-19 17-31C37 9.5 30 2 20 2z" fill="#ff4b3a" stroke="#111" stroke-width="3"/><circle cx="20" cy="19" r="6" fill="#fff"/></svg>
    </div>
  `),
  stk('guita', 260, 180, `
    ${dieCut('dc-guita', 9)}
    <div class="abs" style="left:14px;top:16px;filter:url(#dc-guita)">${mascot(232, 'display:block', 'wow')}</div>
  `),
  stk('downloads', 220, 220, `
    ${dieCut('dc-dl', 8)}
    <div class="abs" style="left:14px;top:14px;filter:url(#dc-dl)">
      <svg viewBox="0 0 200 200" width="192" style="display:block">
        <path d="M100 6l17 22 27-8 3 28 27 9-12 25 18 22-24 15 4 28-28 2-10 26-25-13-25 13-10-26-28-2 4-28-24-15 18-22-12-25 27-9 3-28 27 8z" fill="#20b47b" stroke="#111" stroke-width="5" stroke-linejoin="round"/>
        <text x="100" y="104" text-anchor="middle" font-family="Inter Variable" font-weight="800" font-size="50" letter-spacing="-2" fill="#fff">60K+</text>
        <path d="M86 122h28M100 118v24m-10-10l10 10 10-10" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>
    </div>
  `),
  stk('ship', 220, 220, `
    ${dieCut('dc-ship', 8)}
    <div class="abs" style="left:14px;top:14px;filter:url(#dc-ship)">
      <svg viewBox="0 0 200 200" width="192" style="display:block">
        <path d="M100 8l24 52 56 8-41 39 10 56-49-27-49 27 10-56-41-39 56-8z" fill="#ffd60a" stroke="#111" stroke-width="6" stroke-linejoin="round"/>
        <g transform="rotate(-8 100 104)" font-family="Inter Variable" font-weight="850" letter-spacing="-1" fill="#111" text-anchor="middle"><text x="100" y="102" font-size="34">SHIP</text><text x="100" y="134" font-size="30">IT!</text></g>
      </svg>
    </div>
  `),
];

export default [...work, ...gallery, ...story, ...stickers];
