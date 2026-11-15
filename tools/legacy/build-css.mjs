#!/usr/bin/env node
/**
 * Regenerates the precompiled Tailwind v3 CSS of the preserved legacy pages into src/styles/legacy/.
 *
 *   npm run legacy:css
 *
 * Why precompiled: the new site has no Tailwind in its build (Astro 7 is not supported by @astrojs/tailwind),
 * but /newspaper, /gallery and the /linktree hub were designed with Tailwind v3 utilities and relied on its
 * preflight reset. Compiling once with the v3 CLI keeps their look identical (including v3 quirks such as
 * dropping unknown opacity steps like `bg-white/8`) without adding Tailwind to the pipeline.
 *
 * Each page group gets its own file so a page only ships the utilities it uses. The files are imported only
 * by the legacy layouts / pages, never by the new site's Base layout.
 * Re-run it (and commit the output) whenever the classes of a legacy page change.
 */
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const TAILWIND = 'tailwindcss@3.4.19';
const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

/** output name → files Tailwind scans for class names (comma separated globs, relative to the repo root). */
const targets = {
  // gallery.astro is plain CSS: it only needs the preflight reset, so nothing is scanned for utilities
  gallery: 'tools/legacy/no-content.html',
  newspaper: 'src/pages/newspaper/**/*.astro,src/layouts/MinimalLayout.astro',
  linktree:
    'src/layouts/LinktreeLayout.astro,src/components/linktree/**/*.astro,src/pages/linktree/**/*.astro,src/pages/en/linktree/**/*.astro,src/components/ui/**/*.tsx',
};

for (const [name, content] of Object.entries(targets)) {
  execFileSync(
    'npx',
    ['-y', TAILWIND, '-c', 'tools/legacy/tailwind.config.cjs', '-i', 'tools/legacy/input.css', '-o', `src/styles/legacy/${name}.css`, '--content', content, '--minify'],
    { cwd: root, stdio: 'inherit' },
  );
}
