// Full-screen phone compositions (393×852 pt, iPhone 15 Pro), built only from Liam's real captures.
// Every screen fills the phone edge to edge: status bar on top, the capture, and — where the capture is
// shorter than a phone — a faithful continuation (the Guita list keeps going, the login keeps its code rain).
// Lucero and Holo are landing pages shot at a shorter viewport: their screens are meant for "bleed" layouts,
// where the phone leaves the frame before the capture ends.
import { crop, S } from './lib.mjs';

const W = 393, H = 852;

export const statusBar = (c = '#fff', bg = 'transparent') => `
<svg class="abs" viewBox="0 0 393 54" width="393" height="54" style="left:0;top:0;z-index:5;background:${bg}">
  <text x="64" y="36.2" text-anchor="middle" font-family="Inter Variable" font-weight="620" font-size="16.6" letter-spacing="-.2" fill="${c}">9:41</text>
  <g fill="${c}">
    <rect x="296.5" y="31" width="3.2" height="4.4" rx="1"/><rect x="301.5" y="28.6" width="3.2" height="6.8" rx="1"/>
    <rect x="306.5" y="26.2" width="3.2" height="9.2" rx="1"/><rect x="311.5" y="23.8" width="3.2" height="11.6" rx="1"/>
  </g>
  <g fill="none" stroke="${c}" stroke-width="1.9" stroke-linecap="round">
    <path d="M320.3 28.1a10 10 0 0 1 14.2 0"/><path d="M322.9 30.8a6.2 6.2 0 0 1 9 0"/>
  </g>
  <path d="M325.6 33.4a2.6 2.6 0 0 1 3.6 0l-1.8 2z" fill="${c}"/>
  <rect x="341.5" y="23.9" width="25" height="12.2" rx="3.8" fill="none" stroke="${c}" stroke-opacity=".38" stroke-width="1"/>
  <rect x="343.5" y="25.9" width="21" height="8.2" rx="2.3" fill="${c}"/>
  <path d="M368 28.4v3.6a1.9 1.9 0 0 0 0-3.6z" fill="${c}" fill-opacity=".45"/>
</svg>`;

export const homeBar = (c = '#fff', o = 0.92) =>
  `<span class="abs" style="left:${(W - 134) / 2}px;bottom:8px;width:134px;height:5px;border-radius:3px;background:${c};opacity:${o};z-index:6"></span>`;

const fade = (px) => `-webkit-mask-image:linear-gradient(transparent,#000 ${px}px);mask-image:linear-gradient(transparent,#000 ${px}px);`;

/** Guita "Hoy": the list of (privacy-blurred) gastos hormiga keeps going down to the tab bar. */
function guitaHoy() {
  const k = W / 986;
  const topH = 1340 * k;                 // capture down to just above the floating + button
  const band = [0, 1185, 986, 155];      // blurred rows (a third person's data is blurred at the source)
  const bandH = band[3] * k;
  const tail = [0, 1300, 986, 186];      // last rows + tab bar with the + button
  const tailTop = H - 34 - tail[3] * k;  // 34 pt home-indicator area under the tab bar
  let tiles = '';
  for (let y = 54 + topH - 6; y < tailTop + 8; y += bandH - 6) {
    tiles += crop('guita-hoy', band, W, `left:0;top:${y.toFixed(2)}px;${fade(6)}`);
  }
  return `<div class="fs" style="background:#000">
    ${statusBar('#fff')}
    ${crop('guita-hoy', [0, 0, 986, 1340], W, 'left:0;top:54px')}
    ${tiles}
    ${crop('guita-hoy', tail, W, `left:0;top:${tailTop.toFixed(2)}px;${fade(10)}`)}
    <div class="abs" style="left:0;right:0;bottom:0;height:35px;background:#161618"></div>
    ${homeBar('#fff')}
  </div>`;
}

/** Deterministic "code rain" like the one behind Guita's login: word-like clusters of #/8 at the bottom,
 *  thinning out into scattered x, + and = towards the top. */
function rain(rows = 20, cols = 50, seed = 11) {
  let t = seed >>> 0;
  const rnd = () => { t += 0x6d2b79f5; let r = Math.imul(t ^ (t >>> 15), 1 | t); r ^= r + Math.imul(r ^ (r >>> 7), 61 | r); return ((r ^ (r >>> 14)) >>> 0) / 4294967296; };
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  let out = '';
  for (let r = 0; r < rows; r++) {
    const tt = r / (rows - 1);                       // 0 = top of the rain, 1 = bottom of the screen
    const density = 0.08 + 0.78 * Math.pow(tt, 1.25);
    let line = '', inRun = false;
    for (let c = 0; c < cols; c++) {
      inRun = inRun ? rnd() < 0.72 + 0.2 * tt : rnd() < density * 0.62;
      if (!inRun) { line += ' '; continue; }
      const v = tt + (rnd() - 0.5) * 0.55;
      const ch = v > 0.78 ? pick(['#', '#', '8', '#', '8']) : v > 0.6 ? pick(['8', 'S', '#', '0']) : v > 0.42 ? pick(['X', '0', 'S', 'x']) : v > 0.25 ? pick(['x', 'X', '+']) : pick(['+', '=', 'x']);
      const a = '#8'.includes(ch) ? 0.9 : 'S0X'.includes(ch) ? 0.7 : 0.5;
      line += `<i style="opacity:${a}">${ch}</i>`;
    }
    out += `<div style="opacity:${(0.18 + 0.82 * Math.pow(tt, 0.9)).toFixed(2)}">${line}</div>`;
  }
  return out;
}

/** Guita login: card centred on a full-height black page, code rain anchored to the bottom. */
function guitaLogin() {
  const k = W / 986;
  const cw = 770 * k, ch = 1095 * k;
  const top = 440 - ch / 2;
  return `<div class="fs" style="background:#000">
    <div class="abs" style="left:-40px;right:-40px;bottom:0;height:340px;background:radial-gradient(ellipse 70% 75% at 50% 100%,rgba(64,170,108,.55) 0%,rgba(38,110,68,.26) 48%,rgba(0,0,0,0) 78%)"></div>
    <div class="abs" style="left:1px;bottom:-1px;width:393px;font:400 12.8px/13.3px 'DejaVu Sans Mono',Menlo,monospace;color:#93dfb1;white-space:pre;letter-spacing:.2px;text-shadow:0 0 5px rgba(110,230,160,.4)">${rain()}</div>
    <div class="abs" style="left:${(107 * k).toFixed(2)}px;top:${top.toFixed(2)}px;width:${cw.toFixed(2)}px;height:${ch.toFixed(2)}px;border-radius:22px;overflow:hidden;box-shadow:0 0 0 1px rgba(255,255,255,.04),0 30px 60px -10px rgba(0,0,0,.9)">
      ${crop('guita-login', [107, 194, 770, 1095], cw, 'left:0;top:0')}
    </div>
    ${statusBar('#fff')}
    ${homeBar('#fff')}
  </div>`;
}

/** A web capture under the status bar. Only for bleed layouts (the capture covers ~76% of the screen). */
const webTop = (src, [cw, chh], barBg, barInk, below) => `<div class="fs" style="background:${below}">
    ${statusBar(barInk, barBg)}
    ${crop(src, [0, 0, cw, chh], W, 'left:0;top:54px')}
  </div>`;

const cover = (src, extra = '') => `<div class="abs" style="inset:0;background:url(${S(src)}) top center/cover no-repeat;${extra}"></div>`;

export const fs = {
  'guita-hoy': guitaHoy(),
  'guita-login': guitaLogin(),
  lucero: webTop('lucero-mobile', [982, 1484], 'linear-gradient(90deg,#dae4f7,#eae7de)', '#14141a', '#ece8f4'),
  holo: webTop('holo-mobile', [994, 1492], '#2f2d37', '#fff', '#f4f3f9'),
  ferox: `<div class="fs" style="background:#25412f">${cover('ferox-screen')}</div>`,
  pomodoro: `<div class="fs" style="background:#3b2412">${cover('pomodoro')}
    <div class="abs" style="left:0;right:0;top:0;height:64px;background:linear-gradient(rgba(20,10,4,.55),rgba(20,10,4,0));z-index:4"></div>
    ${statusBar('#fff')}${homeBar('#fff', 0.8)}</div>`,
};

/** Fraction of the screen height a bleed layout may show for the web captures (with a safety margin). */
export const WEB_VISIBLE = 0.74;
