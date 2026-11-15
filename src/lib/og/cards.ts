import type { OgEntry } from '../../content/og';
import { site as siteInfo } from './brand';
import { h, span, img, type VNode, type Style } from './h';
import { fitSize } from './fit';
import { photo, brandMark } from './assets';
import { C, W, H, M } from './tokens';

const INNER = W - M * 2;

/* ───────────────────────── shared pieces ───────────────────────── */

/** Footer shared by every card: brand mark + LiamDev on the left, the domain on the right. */
function footer(o: { color: string; bottom?: number; font?: string; domainStyle?: Style }): VNode {
  return h(
    { position: 'absolute', left: M, right: M, bottom: o.bottom ?? 44, alignItems: 'center', justifyContent: 'space-between' },
    h(
      { alignItems: 'center' },
      img(brandMark(), 40, 40, { borderRadius: 10 }),
      span({ marginLeft: 14, fontFamily: 'Inter', fontWeight: 800, fontSize: 28, color: o.color, letterSpacing: '-0.02em' }, siteInfo.brand),
    ),
    span({ fontFamily: o.font ?? 'Inter', fontWeight: 500, fontSize: 28, color: o.color, ...o.domainStyle }, siteInfo.domain),
  );
}

/** The wrapping title block: plain text, or words + a yellow-marker tail when `mark` is set. */
function titleBlock(entry: OgEntry, size: number, style: Style): VNode {
  if (!entry.mark) return h({ ...style, fontSize: size }, span({}, entry.title));
  const word = (w: string) => span({ marginRight: size * 0.26 }, w);
  return h(
    { ...style, fontSize: size, flexWrap: 'wrap', alignItems: 'baseline' },
    ...entry.title.split(' ').map(word),
    h({ backgroundColor: C.yellow, padding: `0 ${size * 0.16}px`, borderRadius: 8, marginTop: 2 }, span({}, entry.mark)),
  );
}

/** Title as one box per word, so a hyphenated word ("E-commerce") is never split across two lines. */
function wordsBlock(text: string, size: number, style: Style): VNode {
  return h({ ...style, fontSize: size, flexWrap: 'wrap' }, ...text.split(' ').map((w) => span({ marginRight: size * 0.26 }, w)));
}

const root = (style: Style, ...kids: (VNode | false)[]) =>
  h({ position: 'relative', width: W, height: H, overflow: 'hidden', ...style }, ...kids);

/* ───────────────────────── portfolio (home es / en) ───────────────────────── */

async function portfolio(e: OgEntry): Promise<VNode> {
  // measured wrapping (it fits when it stays on one line), drawn with nowrap so a sub-pixel difference can never wrap it
  const word = (size: number, nowrap = false) =>
    h({ fontFamily: 'Inter', fontWeight: 800, fontSize: size, letterSpacing: '-0.06em', lineHeight: 0.9, color: C.ink, ...(nowrap && { whiteSpace: 'nowrap' }) }, span({}, e.title));
  const size = await fitSize((s) => word(s), { width: INNER, lineHeight: 0.9, max: 300, min: 120, maxLines: 1 });
  const portrait = await photo(e.image!, 220, 220, 2, 'top');
  return root(
    {
      backgroundColor: C.page,
      backgroundImage: `radial-gradient(ellipse 85% 75% at 50% -8%, ${C.sun} 0%, rgba(255,214,10,0.55) 38%, rgba(255,214,10,0) 100%)`,
    },
    // availability pill
    h(
      { position: 'absolute', left: M, top: 56, alignItems: 'center', backgroundColor: C.ink, borderRadius: 999, padding: '12px 26px 12px 22px' },
      h({ width: 16, height: 16, borderRadius: 999, backgroundColor: C.green, marginRight: 14 }),
      span({ fontFamily: 'Inter', fontWeight: 700, fontSize: 24, color: C.sunText }, e.eyebrow),
    ),
    // role + stack
    h(
      { position: 'absolute', left: M, top: 148, flexDirection: 'column', width: 700 },
      span({ fontFamily: 'Inter', fontWeight: 700, fontSize: 46, color: C.ink, letterSpacing: '-0.02em', lineHeight: 1.1 }, e.subtitle ?? ''),
      span({ fontFamily: 'Inter', fontWeight: 500, fontSize: 28, color: C.inkSoft, marginTop: 14 }, e.meta ?? ''),
    ),
    // portrait sticker
    h(
      { position: 'absolute', right: M + 6, top: 44, width: 232, height: 232, borderRadius: 999, backgroundColor: '#fff', padding: 6, transform: 'rotate(5deg)', boxShadow: '0 14px 36px rgba(0,0,0,0.18)' },
      img(portrait, 220, 220, { borderRadius: 999 }),
    ),
    // wordmark, fully inside the margins
    h({ position: 'absolute', left: M, top: 312 }, word(size, true)),
    footer({ color: C.ink, bottom: 40 }),
  );
}

/* ───────────────────────── ecommerce ───────────────────────── */

async function ecommerce(e: OgEntry): Promise<VNode> {
  const colW = 500;
  const title = (size: number) =>
    wordsBlock(e.title, size, { fontFamily: 'Inter', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.06, color: C.ink, width: colW });
  const size = await fitSize(title, { width: colW, lineHeight: 1.06, max: 64, min: 38, maxLines: 4 });

  const lapW = 560;
  const lapShot = await photo(e.image!, lapW, 350, 1.5, 'top');
  const phoneShot = await photo('/img/ecommerce/romeoflorida-phone.webp', 150, 324, 1.5, 'top');

  const laptop = h(
    { position: 'absolute', left: 592, top: 62, width: lapW, flexDirection: 'column', backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 26px 60px rgba(60,40,0,0.28)', border: '1px solid rgba(0,0,0,0.10)' },
    h(
      { height: 36, alignItems: 'center', padding: '0 16px', backgroundColor: '#f1efe6' },
      h({ width: 12, height: 12, borderRadius: 999, backgroundColor: '#ff5f57', marginRight: 8 }),
      h({ width: 12, height: 12, borderRadius: 999, backgroundColor: '#febc2e', marginRight: 8 }),
      h({ width: 12, height: 12, borderRadius: 999, backgroundColor: '#28c840', marginRight: 16 }),
      h({ flexGrow: 1, height: 20, borderRadius: 999, backgroundColor: '#fff' }),
    ),
    img(lapShot, lapW, 350),
  );
  const phone = h(
    { position: 'absolute', left: 972, top: 150, width: 170, height: 344, padding: 10, backgroundColor: C.ink, borderRadius: 34, boxShadow: '0 22px 50px rgba(0,0,0,0.35)', transform: 'rotate(3deg)' },
    img(phoneShot, 150, 324, { borderRadius: 24 }),
  );

  return root(
    {
      backgroundColor: C.page,
      backgroundImage: `radial-gradient(ellipse 80% 95% at 12% -5%, ${C.sun} 0%, rgba(255,214,10,0.5) 42%, rgba(255,214,10,0) 100%)`,
    },
    h(
      { position: 'absolute', left: M, top: 56, alignItems: 'center' },
      span({ fontFamily: 'Inter', fontWeight: 700, fontSize: 24, color: C.ink }, e.eyebrow),
    ),
    h({ position: 'absolute', left: M, top: 126 }, title(size)),
    e.meta
      ? h(
          { position: 'absolute', left: M, top: 432, backgroundColor: C.ink, borderRadius: 999, padding: '12px 26px' },
          span({ fontFamily: 'Inter', fontWeight: 700, fontSize: 26, color: C.sunText }, e.meta),
        )
      : false,
    laptop,
    phone,
    footer({ color: C.ink }),
  );
}

/* ───────────────────────── contact ───────────────────────── */

async function contact(e: OgEntry): Promise<VNode> {
  const colW = 650;
  const title = (size: number) =>
    h({ fontFamily: 'Inter', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.02, color: C.ink, width: colW, fontSize: size }, span({}, e.title));
  const size = await fitSize(title, { width: colW, lineHeight: 1.02, max: 104, min: 56, maxLines: 3 });
  const portrait = await photo(e.image!, 300, 300, 2, 'top');
  return root(
    {
      backgroundColor: C.sun,
      backgroundImage: `radial-gradient(ellipse 75% 85% at 88% 105%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%), radial-gradient(ellipse 70% 60% at 0% 0%, ${C.sunDeep} 0%, rgba(254,200,26,0) 100%)`,
    },
    h(
      { position: 'absolute', left: M, top: 56, alignItems: 'center' },
      span({ fontFamily: 'Inter', fontWeight: 700, fontSize: 24, color: C.ink }, e.eyebrow),
    ),
    h({ position: 'absolute', left: M, top: 150 }, title(size)),
    e.subtitle
      ? h(
          { position: 'absolute', left: M + 4, bottom: 130, transform: 'rotate(-3deg)', alignItems: 'center' },
          span({ fontFamily: 'Caveat', fontWeight: 700, fontSize: 64, color: C.ink }, e.subtitle),
        )
      : false,
    h(
      { position: 'absolute', right: M + 20, top: 130, width: 316, height: 316, borderRadius: 999, backgroundColor: '#fff', padding: 8, transform: 'rotate(4deg)', boxShadow: '0 18px 44px rgba(90,60,0,0.30)' },
      img(portrait, 300, 300, { borderRadius: 999 }),
    ),
    footer({ color: C.ink }),
  );
}

/* ───────────────────────── paper (Landing PRO funnel + articles) ───────────────────────── */

async function polaroid(e: OgEntry, size: number): Promise<VNode> {
  const inner = size - 24;
  const shot = await photo(e.image!, inner, inner, 2, 'top');
  return h(
    { position: 'absolute', right: M + 6, top: 66, width: size, flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff', padding: '12px 12px 0 12px', transform: 'rotate(3.5deg)', boxShadow: '0 16px 38px rgba(40,30,0,0.22)', border: '1px solid rgba(26,22,17,0.12)' },
    img(shot, inner, inner),
    h({ height: Math.round(size * 0.2), alignItems: 'center', justifyContent: 'center' }, span({ fontFamily: 'Caveat', fontWeight: 700, fontSize: Math.round(size * 0.115), color: C.paperInk }, 'Liam Marega')),
    h({ position: 'absolute', top: -16, left: size / 2 - 58, width: 116, height: 32, backgroundColor: 'rgba(255,224,0,0.6)', transform: 'rotate(-3deg)' }),
  );
}

function eyebrowRow(text: string): VNode {
  return h(
    { position: 'absolute', left: M, top: 56, alignItems: 'center' },
    h({ width: 44, height: 4, backgroundColor: C.yellowDeep, marginRight: 16 }),
    span({ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 22, letterSpacing: '0.14em', color: C.yellowDeep }, text.toUpperCase()),
  );
}

const paperFooter = () => [
  h({ position: 'absolute', left: 0, right: 0, bottom: 0, height: 96, backgroundColor: C.paperBand }),
  footer({ color: C.paperInk, bottom: 28, font: 'Source Serif 4', domainStyle: { fontStyle: 'italic', fontWeight: 400, fontSize: 30, color: C.paperInk3 } }),
];

async function paper(e: OgEntry): Promise<VNode> {
  const funnel = Boolean(e.mark);
  const pol = funnel ? 330 : 270;
  const colW = INNER - pol - 76;
  const top = e.subtitle ? 164 : 128;
  const build = (size: number) =>
    titleBlock(e, size, { fontFamily: 'Source Serif 4', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, color: C.paperInk, width: colW, textWrap: 'balance' });
  const size = await fitSize(build, { width: colW, lineHeight: 1.1, max: funnel ? 76 : 70, min: 38, maxLines: funnel ? 4 : 3 });
  return root(
    { backgroundColor: C.paper },
    eyebrowRow(e.eyebrow),
    e.subtitle
      ? h({ position: 'absolute', left: M, top: 104 }, span({ fontFamily: 'Caveat', fontWeight: 700, fontSize: 40, color: C.paperInk3, borderBottom: `6px solid ${C.yellow}` }, e.subtitle))
      : false,
    h({ position: 'absolute', left: M, top }, build(size)),
    e.meta
      ? h(
          { position: 'absolute', left: M, bottom: 130, alignItems: 'center' },
          h({ width: 14, height: 14, borderRadius: 999, backgroundColor: C.yellow, border: `2px solid ${C.paperInk}`, marginRight: 14 }),
          span({ fontFamily: 'Inter', fontWeight: 700, fontSize: 26, color: C.paperInk3 }, e.meta),
        )
      : false,
    await polaroid(e, pol),
    ...paperFooter(),
  );
}

/* ───────────────────────── legal ───────────────────────── */

async function legal(e: OgEntry): Promise<VNode> {
  const colW = 860;
  const build = (size: number) =>
    h({ fontFamily: 'Source Serif 4', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.12, color: C.paperInk, width: colW, fontSize: size, textWrap: 'balance' }, span({}, e.title));
  const size = await fitSize(build, { width: colW, lineHeight: 1.12, max: 72, min: 40, maxLines: 3 });
  return root(
    { backgroundColor: C.paper },
    // calm decoration: a large pale section sign, cropped by nothing (fully inside the card)
    h({ position: 'absolute', right: 96, top: 70, fontFamily: 'Source Serif 4', fontWeight: 700, fontSize: 380, lineHeight: 1, color: 'rgba(255,224,0,0.45)' }, span({}, '§')),
    eyebrowRow(e.eyebrow),
    h({ position: 'absolute', left: M, top: 150 }, build(size)),
    h(
      { position: 'absolute', left: M, bottom: 130, alignItems: 'center' },
      h({ width: 14, height: 14, borderRadius: 999, backgroundColor: C.yellow, border: `2px solid ${C.paperInk}`, marginRight: 14 }),
      span({ fontFamily: 'Inter', fontWeight: 700, fontSize: 26, color: C.paperInk3 }, `${siteInfo.name} · ${siteInfo.brand}`),
    ),
    ...paperFooter(),
  );
}

export function buildCard(e: OgEntry): Promise<VNode> {
  switch (e.theme) {
    case 'portfolio': return portfolio(e);
    case 'ecommerce': return ecommerce(e);
    case 'contact': return contact(e);
    case 'paper': return paper(e);
    case 'legal': return legal(e);
  }
}
