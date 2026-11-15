// Generates responsive WebP variants next to the originals (never overwrites or edits an original).
//
//   public/img/work/ferox-b.webp  ->  ferox-b-400.webp, ferox-b-800.webp (widths snapped, see below)
//
// The components (src/lib/responsive.ts) read this naming convention and emit a srcset only for the variants that
// exist, so a missing file just falls back to the original. Idempotent: an up-to-date variant is skipped.
// Variants are never upscaled: a source narrower than a target width only gets the smaller ones.
// File names carry the real pixel width (ferox-a-408.webp is 408x374).
//
// Usage: npm run perf:images   (add `-- --force` to regenerate everything)
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const WIDTHS = [400, 800];
const GROUPS = [
  // the *-cover images are only referenced by structured data, never rendered responsively
  { dir: 'public/img/work', match: /^(?!.*-cover\.).*\.webp$/, widths: WIDTHS },
  { dir: 'public/images/works', match: /\.webp$/, widths: WIDTHS },
  { dir: 'public/images/uploads', match: /^liam\.jpg$/, widths: [600], format: 'webp' },
];
const force = process.argv.includes('--force');
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
// A variant must keep EXACTLY the aspect ratio of the original: with `height: auto` the browser lays the image out
// from the selected candidate's natural size, so a rounded height would nudge everything below by a sub-pixel.
// Widths are therefore snapped up to the nearest multiple that yields an integer height (e.g. 960x880 -> 12:11).
const snap = (w, meta) => {
  const k = meta.width / gcd(meta.width, meta.height);
  return Math.ceil(w / k) * k;
};
// a file already produced by this script is not a source
const isVariant = (f) => /-\d+\.webp$/.test(f);

let made = 0;
let skipped = 0;
let bytes = 0;
for (const g of GROUPS) {
  for (const file of fs.readdirSync(g.dir).sort()) {
    if (!g.match.test(file) || isVariant(file)) continue;
    const src = path.join(g.dir, file);
    const base = file.replace(/\.[a-z]+$/i, '');
    const meta = await sharp(src).metadata();
    // the master of a non-webp source (liam.jpg) is also emitted as webp at its full width
    const targets = g.widths.map((w) => snap(w, meta)).map((w) => [w, `${base}-${w}.webp`]);
    if (g.format === 'webp') targets.push([meta.width, `${base}.webp`]);
    for (const [w, name] of targets) {
      if (w > meta.width) continue;
      const out = path.join(g.dir, name);
      if (!force && fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) {
        skipped++;
        continue;
      }
      const info = await sharp(src)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: g.format === 'webp' ? 78 : 80, effort: 5 })
        .toFile(out);
      made++;
      bytes += info.size;
      console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
    }
  }
}
console.log(`${made} written (${(bytes / 1024).toFixed(0)} KB), ${skipped} up to date`);
