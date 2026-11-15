import satori from 'satori';
import sharp from 'sharp';
import type { OgEntry } from '../../content/og';
import { loadFonts } from './fonts';
import { buildCard } from './cards';
import { W, H } from './tokens';

/**
 * Renders one registry entry to a 1200x630 JPEG: satori (element tree → SVG, text turned into paths so no
 * fonts are needed afterwards) → sharp (SVG → JPEG). 4:4:4 chroma keeps thin text and the yellow edges crisp.
 */
export async function renderCard(entry: OgEntry): Promise<Buffer> {
  const svg = await satori((await buildCard(entry)) as never, { width: W, height: H, fonts: loadFonts() as never });
  return sharp(Buffer.from(svg)).jpeg({ quality: 82, chromaSubsampling: '4:4:4', mozjpeg: true }).toBuffer();
}
