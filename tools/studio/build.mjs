import { writeFileSync } from 'node:fs';
import { css } from './lib.mjs';
const groups = process.argv.slice(2);
const mods = groups.length ? groups : ['liam', 'og', 'clips'];
let boards = [];
for (const m of mods) {
  try {
    const mod = await import(`./${m}.mjs`);
    boards = boards.concat(mod.default);
  } catch (e) {
    if (e.code !== 'ERR_MODULE_NOT_FOUND') throw e;
  }
}
writeFileSync(new URL('./studio.html', import.meta.url), `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${boards.join('\n')}</body></html>`);
console.log('boards:', boards.length);
