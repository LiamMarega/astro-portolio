import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const pub = (p: string) => join(process.cwd(), 'public', p.replace(/^\//, ''));

const cache = new Map<string, string>();

/**
 * Local image from /public as a JPEG data URI sized for the card. satori cannot decode WebP, so every
 * photo goes through sharp (decode → resize → JPEG). `scale` over-samples a little so edges stay crisp.
 */
export async function photo(path: string, w: number, h: number, scale = 1.5, position: string = 'top'): Promise<string> {
  const key = `${path}|${w}x${h}|${scale}|${position}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const buf = await sharp(readFileSync(pub(path)))
    .resize(Math.round(w * scale), Math.round(h * scale), { fit: 'cover', position })
    .jpeg({ quality: 86 })
    .toBuffer();
  const uri = `data:image/jpeg;base64,${buf.toString('base64')}`;
  cache.set(key, uri);
  return uri;
}

/** The favicon mark (black tile, white L, yellow dot) as a data URI. */
export function brandMark(): string {
  const svg = readFileSync(pub('/favicon.svg'), 'utf8');
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}
