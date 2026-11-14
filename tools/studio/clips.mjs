// Looping clips for the gallery contact sheet. Each board is a CSS animation with a period that divides
// its duration, so the first and last frames meet. record.py steps the animations frame by frame
// (Web Animations currentTime) and encodes them to MP4 with ffmpeg.
import { ab, crop, phone, laptop, dieCut, S } from './lib.mjs';
import { fs } from './screens.mjs';
import * as brand from '../../src/lib/brand-svgs.mjs';

const style = /* css */ `<style>
.clip *{animation-play-state:paused!important}
@keyframes float{0%,100%{translate:0 0}50%{translate:0 -10px}}
@keyframes floatB{0%,100%{translate:0 -8px}50%{translate:0 4px}}
@keyframes sway{0%,100%{rotate:-1.6deg}50%{rotate:1.6deg}}
@keyframes strip{0%,38%{transform:translateX(0)}50%,88%{transform:translateX(-393px)}100%{transform:translateX(-786px)}}
@keyframes pop{0%{scale:0;opacity:0}5%{scale:1.14;opacity:1}8.5%{scale:.97}11%{scale:1}80%{scale:1;opacity:1}86%{scale:0;opacity:0}100%{scale:0;opacity:0}}
@keyframes pulse{0%,100%{scale:1;opacity:.85}50%{scale:1.12;opacity:1}}
.strip{position:absolute;left:0;top:0;width:1179px;height:852px;display:flex;animation:strip 4s infinite}
.strip>div{position:relative;width:393px;height:852px;flex:none}
.strip .s1,.strip .s2,.strip .s3{position:relative}
.chip{position:absolute;border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(0,0,0,.1),0 16px 30px -8px rgba(20,10,60,.45)}
.chip>.crop{position:relative}
</style>`;

/** A full screen that slides to a second one and back (as a strip of three panels). */
const slide = (a, b) => `<div class="fs" style="background:#000"><div class="strip">${[a, b, a].map((n) => `<div>${fs[n]}</div>`).join('')}</div></div>`;
const L = 4; // seconds per loop
const clip = (id, w, h, inner, bg) => ab(`clips/${id}`, w, h, inner, { cls: 'clip', style: `background:${bg};--L:${L}s` });

export default [
  // two phones swiping through Guita, Ferox and the Pomodoro
  clip('phones', 560, 460, `${style}
    <div class="fill" style="background:radial-gradient(ellipse 70% 60% at 50% 100%,rgba(119,222,160,.28),rgba(119,222,160,0) 70%),radial-gradient(ellipse 80% 70% at 50% 0%,#232327 0%,#0c0c0e 75%)"></div>
    <div class="abs" style="left:92px;top:40px;animation:float 4s ease-in-out infinite">
      ${phone({ screen: slide('guita-hoy', 'ferox'), w: 178, style: 'position:relative;transform:rotate(-5deg);--sh:0 30px 50px -10px rgba(0,0,0,.8)' })}
    </div>
    <div class="abs" style="left:296px;top:62px;animation:floatB 4s ease-in-out infinite">
      ${phone({ screen: slide('guita-login', 'pomodoro').replace('class="strip"', 'class="strip" style="animation-delay:-2s"'), w: 178, style: 'position:relative;transform:rotate(5deg);--sh:0 30px 50px -10px rgba(0,0,0,.8)' })}
    </div>
  `, '#0c0c0e'),

  // HoloContent: the landing in a phone, with its own chips floating around
  clip('holo', 520, 460, `${style}
    <div class="fill" style="background:radial-gradient(ellipse 80% 80% at 50% 20%,#7d6bff 0%,#5543e6 50%,#2c1f9c 100%)"></div>
    <div class="fill" style="background:radial-gradient(circle at 82% 88%,rgba(220,255,90,.5),rgba(220,255,90,0) 40%)"></div>
    <div class="abs" style="left:135px;top:110px;animation:float 4s ease-in-out infinite">
      <div style="animation:sway 4s ease-in-out infinite">${phone({ screen: fs.holo, w: 250, style: 'position:relative;--sh:0 34px 60px -14px rgba(20,10,80,.7)' })}</div>
    </div>
    <div class="chip" style="left:18px;top:214px;rotate:-7deg;border-radius:11px;animation:floatB 4s ease-in-out infinite">${crop('holo-mobile', [272, 567, 191, 47], 168)}</div>
    <div class="chip" style="left:310px;top:120px;rotate:6deg;border-radius:9px;animation:float 4s ease-in-out infinite;animation-delay:-1s">${crop('holo-mobile', [526, 719, 346, 44], 196)}</div>
    <div class="chip" style="left:326px;top:338px;rotate:-5deg;border-radius:10px;animation:floatB 4s ease-in-out infinite;animation-delay:-2.4s">${crop('holo-mobile', [487, 567, 282, 47], 180)}</div>
  `, '#5543e6'),

  // Lucero: notebook + phone, with the gold star breathing
  clip('lucero', 560, 430, `${style}
    <div class="fill" style="background:linear-gradient(160deg,#e3e4fd 0%,#efeafb 45%,#fdf4e4 100%)"></div>
    <div class="fill" style="background:radial-gradient(circle at 80% 18%,rgba(255,214,120,.6),rgba(255,214,120,0) 42%)"></div>
    <div class="abs" style="left:24px;top:84px;animation:floatB 4s ease-in-out infinite">${laptop({ src: 'lucero-desktop', w: 380, style: 'position:relative;--sh:0 26px 44px -14px rgba(49,60,140,.4)' })}</div>
    <div class="abs" style="left:346px;top:182px;animation:float 4s ease-in-out infinite;animation-delay:-1.2s">
      <div style="animation:sway 4s ease-in-out infinite">${phone({ screen: fs.lucero, w: 170, style: 'position:relative;--sh:0 30px 50px -12px rgba(49,60,140,.5)' })}</div>
    </div>
    <div class="abs" style="left:452px;top:46px;width:84px;animation:pulse 2s ease-in-out infinite">${brand.lucero.replace('<svg', '<svg style="display:block;width:100%;height:auto"')}</div>
  `, '#efeafb'),

  // my stack, popping in as stickers
  clip('stack', 520, 380, `${style}
    <div class="fill" style="background:#f4efe4"></div>
    <div class="fill" style="background:radial-gradient(circle at 30% 20%,rgba(255,255,255,.75),rgba(255,255,255,0) 60%)"></div>
    ${dieCut('dc-clip', 5)}
    <div class="fill" style="filter:url(#dc-clip) drop-shadow(0 6px 8px rgba(80,60,20,.18))">
      ${[
        ['Flutter', '#3fa6f2', '#fff', 40, 40, -8, 34],
        ['React', '#14171d', '#7fe0ff', 270, 30, 6, 34],
        ['Next.js', '#fff', '#111', 380, 104, -5, 30],
        ['TypeScript', '#2f6bd8', '#fff', 52, 138, 4, 30],
        ['Supabase', '#1d1f1e', '#5ee39a', 262, 176, -6, 30],
        ['Riverpod', '#ffd60a', '#111', 40, 254, -3, 28],
        ['Node.js', '#3f8b44', '#fff', 236, 270, 7, 28],
        ['Dart', '#0f2a4a', '#5ec8ff', 172, 92, -10, 30],
      ]
        .map(([t, b, c, x, y, r, f], i) => `<span class="abs" style="left:${x}px;top:${y}px;rotate:${r}deg;padding:7px 18px 9px;border-radius:999px;background:${b};color:${c};font:700 ${f}px/1 'Inter Variable';letter-spacing:-.02em;animation:pop 4s infinite;animation-delay:${(-(L - 0.25 - i * 0.16)).toFixed(2)}s">${t}</span>`)
        .join('')}
      <span class="abs" style="left:392px;top:236px;rotate:12deg;width:96px;height:96px;display:grid;place-items:center;border-radius:50%;background:#ff5a36;color:#fff;font:800 25px/0.95 'Inter Variable';text-align:center;animation:pop 4s infinite;animation-delay:${(-(L - 0.25 - 8 * 0.16)).toFixed(2)}s">ship<br>it!</span>
    </div>
  `, '#f4efe4'),

  // Ferox: the three phones floating, a light sweep and the 60K+ sticker
  clip('ferox', 540, 420, `${style}
    <div class="fill" style="background:radial-gradient(ellipse 80% 70% at 50% 18%,#3f8c66 0%,#2f5843 48%,#1b3428 100%)"></div>
    <div class="fill" style="background:radial-gradient(ellipse 50% 45% at 50% 55%,rgba(70,194,147,.45),rgba(70,194,147,0) 70%)"></div>
    <div class="abs" style="left:-6px;top:4px;width:552px;animation:float 4s ease-in-out infinite">
      <div style="position:relative;overflow:hidden">
        <img src="${S('ferox-phones')}" style="display:block;width:100%;filter:drop-shadow(0 26px 34px rgba(0,0,0,.45))">
      </div>
    </div>
    <img class="abs" src="../../public/img/stickers/downloads.webp" style="left:410px;top:262px;width:112px;rotate:-10deg;animation:floatB 4s ease-in-out infinite;animation-delay:-1.5s">
  `, '#2f5843'),
];
