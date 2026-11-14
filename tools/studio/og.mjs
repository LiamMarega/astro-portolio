import { ab } from './lib.mjs';
// Social share image (1200×630) — regenerate after changing the name/tagline.
const name = 'Leo Solari';
const tagline = ['Hi! I’m an independent product designer', 'shaping bright brands for SaaS and AI.'];
export default [
  ab(
    'og',
    600,
    315,
    `
  <div class="fill" style="background:radial-gradient(ellipse 64% 72% at 50% -12%,#ffc400 0%,#fed334 26%,#fce562 44%,#fdf4a6 65%,#fbf8d9 85%,#fdfdfd 110%)"></div>
  <div class="abs" style="left:22px;bottom:150px;font-size:17px;line-height:1.3;font-weight:470;color:rgba(0,0,0,.5)">${tagline.join('<br>')}</div>
  <div class="abs" style="left:0;right:0;bottom:-4px;text-align:center;font-size:148px;font-weight:500;letter-spacing:-.07em;line-height:1;color:#050505;white-space:nowrap">${name}</div>
  `,
  ),
];
