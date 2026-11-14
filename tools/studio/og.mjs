import { ab } from './lib.mjs';
// Social share image (1200×630) — regenerate after changing the name/tagline.
const name = 'Liam Marega';
const tagline = ['Frontend & Mobile Developer', 'Flutter · React · Next.js · Supabase'];
export default [
  ab(
    'og',
    600,
    315,
    `
  <div class="fill" style="background:radial-gradient(ellipse 64% 72% at 50% -12%,#ffc400 0%,#fed334 26%,#fce562 44%,#fdf4a6 65%,#fbf8d9 85%,#fdfdfd 110%)"></div>
  <div class="abs" style="left:24px;top:22px;display:flex;align-items:center;gap:8px;padding:6px 12px 6px 8px;border-radius:999px;background:#000;color:#ffd84a;font-size:12px;font-weight:500"><span style="width:8px;height:8px;border-radius:50%;background:#5ee39a"></span>Disponible para proyectos · Open to work</div>
  <div class="abs" style="left:24px;bottom:142px;font-size:18px;line-height:1.3;font-weight:470;color:rgba(0,0,0,.55)">${tagline.join('<br>')}</div>
  <div class="abs" style="left:0;right:0;bottom:-2px;text-align:center;font-size:126px;font-weight:500;letter-spacing:-.07em;line-height:1;color:#050505;white-space:nowrap">${name}</div>
  `,
  ),
];
