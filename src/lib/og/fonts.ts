import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Fonts for the OG renderer. satori reads TTF/OTF/WOFF (not WOFF2), so we load the static `.woff`
 * files that the @fontsource packages already ship. Read from disk at build time: no network.
 */
const root = join(process.cwd(), 'node_modules', '@fontsource');
const woff = (pkg: string, file: string) => readFileSync(join(root, pkg, 'files', `${pkg}-latin-${file}.woff`));

type Weight = 400 | 500 | 600 | 700 | 800;
export interface OgFont {
  name: string;
  data: Buffer;
  weight: Weight;
  style: 'normal' | 'italic';
}

let cache: OgFont[] | undefined;

export function loadFonts(): OgFont[] {
  cache ??= [
    { name: 'Inter', data: woff('inter', '500-normal'), weight: 500, style: 'normal' },
    { name: 'Inter', data: woff('inter', '700-normal'), weight: 700, style: 'normal' },
    { name: 'Inter', data: woff('inter', '800-normal'), weight: 800, style: 'normal' },
    { name: 'Source Serif 4', data: woff('source-serif-4', '400-italic'), weight: 400, style: 'italic' },
    { name: 'Source Serif 4', data: woff('source-serif-4', '600-normal'), weight: 600, style: 'normal' },
    { name: 'Source Serif 4', data: woff('source-serif-4', '700-normal'), weight: 700, style: 'normal' },
    { name: 'JetBrains Mono', data: woff('jetbrains-mono', '700-normal'), weight: 700, style: 'normal' },
    { name: 'Caveat', data: woff('caveat', '700-normal'), weight: 700, style: 'normal' },
    { name: 'Modak', data: woff('modak', '400-normal'), weight: 400, style: 'normal' },
  ];
  return cache;
}
