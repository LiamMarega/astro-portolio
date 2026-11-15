import satori from 'satori';
import { loadFonts } from './fonts';
import type { VNode } from './h';

/** Height in px that a node takes when laid out `width` px wide (satori computes it when `height` is omitted). */
export async function measureHeight(node: VNode, width: number): Promise<number> {
  const svg = await satori(node as never, { width, fonts: loadFonts() as never });
  const m = /^<svg[^>]*\sheight="([\d.]+)"/.exec(svg);
  if (!m) throw new Error('og: could not read the measured height');
  return Number(m[1]);
}

export interface FitOptions {
  /** Width available to the text. */
  width: number;
  lineHeight: number;
  max: number;
  min: number;
  maxLines: number;
  step?: number;
}

/**
 * Largest font size (max → min) at which `build(size)` wraps into at most `maxLines` lines in `width` px.
 * Falls back to `min` when even that does not fit (the registry titles are short enough that it never does).
 */
export async function fitSize(build: (size: number) => VNode, o: FitOptions): Promise<number> {
  const step = o.step ?? 2;
  for (let size = o.max; size >= o.min; size -= step) {
    const lines = Math.round((await measureHeight(build(size), o.width)) / (size * o.lineHeight));
    if (lines <= o.maxLines) return size;
  }
  return o.min;
}
