import type { APIRoute, GetStaticPaths } from 'astro';
import { OG_ROUTES, ogId, OG_TYPE } from '../../content/og';
import { renderCard } from '../../lib/og/render';

/**
 * Build-time OG cards: one static /og/<id>.jpg (1200x630) per entry of src/content/og.ts.
 * Nothing runs at request time; Vercel serves the emitted files (cache headers in vercel.json).
 */
export const getStaticPaths = (() =>
  Object.entries(OG_ROUTES).map(([path, entry]) => ({ params: { id: ogId(path) }, props: { entry } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const body = await renderCard(props.entry);
  return new Response(new Uint8Array(body), { headers: { 'Content-Type': OG_TYPE } });
};
