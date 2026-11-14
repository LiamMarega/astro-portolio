/**
 * Hand-drawn doodles.
 * Every doodle is a list of strokes (absolute SVG path commands: M L C Q).
 * At build time each coordinate gets a tiny seeded wobble so the lines look
 * drawn with a marker instead of a ruler. Strokes are animated in order.
 */

export interface DoodleDef {
  viewBox: string;
  strokes: string[];
  /** stroke width in viewBox units */
  width?: number;
  /** wobble amplitude in viewBox units */
  wobble?: number;
  /** filled shapes (not animated as strokes, fade in instead) */
  fills?: string[];
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Adds a small, smooth wobble to every coordinate pair of a path. */
export function rough(d: string, amp: number, seed: string) {
  const rnd = mulberry32(hash(seed));
  let i = 0;
  return d.replace(/(-?\d*\.?\d+)[ ,]+(-?\d*\.?\d+)/g, (_m, x, y) => {
    i++;
    const k = i === 1 ? 0.4 : 1; // keep starting points calm
    const nx = parseFloat(x) + (rnd() - 0.5) * 2 * amp * k;
    const ny = parseFloat(y) + (rnd() - 0.5) * 2 * amp * k;
    return `${nx.toFixed(1)} ${ny.toFixed(1)}`;
  });
}

const star4 = (cx: number, cy: number, r: number, pinch = 0.18) => {
  const p = r * pinch;
  return `M${cx} ${cy - r} C${cx + p} ${cy - p} ${cx + p} ${cy - p} ${cx + r} ${cy} C${cx + p} ${cy + p} ${cx + p} ${cy + p} ${cx} ${cy + r} C${cx - p} ${cy + p} ${cx - p} ${cy + p} ${cx - r} ${cy} C${cx - p} ${cy - p} ${cx - p} ${cy - p} ${cx} ${cy - r}`;
};

const circle = (cx: number, cy: number, r: number, gap = 0.08, start = -1.9) => {
  // drawn as 4 bezier segments, slightly open like a marker circle
  const k = 0.5523 * r;
  const a0 = start;
  const pts: string[] = [];
  const steps = 8;
  const total = Math.PI * 2 * (1 - gap);
  let d = '';
  for (let s = 0; s <= steps; s++) {
    const a = a0 + (total * s) / steps;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (s === 0) d += `M${x.toFixed(1)} ${y.toFixed(1)}`;
    else {
      const ap = a0 + (total * (s - 1)) / steps;
      const h = (4 / 3) * Math.tan(total / steps / 4) * r;
      const c1x = cx + Math.cos(ap) * r - Math.sin(ap) * h;
      const c1y = cy + Math.sin(ap) * r + Math.cos(ap) * h;
      const c2x = x + Math.sin(a) * h;
      const c2y = y - Math.cos(a) * h;
      d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
  }
  void k;
  void pts;
  return d;
};

export const doodles: Record<string, DoodleDef> = {
  /* ── Story / polaroid doodles ── */
  plane: {
    viewBox: '0 0 140 110',
    width: 3.6,
    strokes: [
      'M30 70 C52 62 92 44 118 34 C130 30 133 38 124 43 C100 55 62 70 38 80 C30 84 24 76 30 70',
      'M70 56 L58 22 L70 20 L90 48',
      'M76 66 L80 98 L90 96 L94 60',
      'M38 78 L24 60 L34 58 L48 72',
      'M6 54 L24 52',
      'M2 72 L18 71',
      'M10 90 L28 86',
    ],
  },
  sparkles: {
    viewBox: '0 0 110 110',
    width: 3.6,
    strokes: [star4(38, 66, 30, 0.14), star4(80, 26, 16, 0.14)],
  },
  heart: {
    viewBox: '0 0 140 130',
    width: 3.6,
    strokes: [
      'M62 104 C30 82 18 58 32 42 C46 26 60 38 64 50 C66 36 82 24 96 34 C114 48 100 78 62 104',
      'M16 120 L128 14',
      'M16 120 L36 117 M16 120 L19 100',
      'M118 6 L138 6 M126 20 L130 4 M110 18 L128 14',
    ],
  },
  sun: {
    viewBox: '0 0 140 110',
    width: 3.6,
    strokes: [
      circle(52, 40, 14, 0.06),
      'M52 12 L52 4 M74 22 L80 16 M80 42 L90 42 M30 22 L24 16 M24 42 L14 42 M70 60 L76 66 M34 60 L28 66',
      'M10 82 C20 72 30 72 38 82 C46 92 56 92 64 82 C72 72 82 72 90 82',
      'M40 100 C48 92 58 92 66 100 C74 108 84 108 92 100',
    ],
  },
  birds: {
    viewBox: '0 0 140 120',
    width: 3.6,
    strokes: [
      'M20 52 C30 38 40 40 46 54 C56 36 72 28 92 36',
      'M60 96 C66 88 72 88 76 96 C82 86 92 82 104 86',
    ],
  },
  spray: {
    viewBox: '0 0 130 110',
    width: 3.6,
    strokes: [
      'M58 40 L86 72 C90 77 89 82 84 86 L72 96 C67 100 62 99 58 94 L30 62 C27 58 28 54 32 51 L46 40 C50 37 55 37 58 40',
      'M48 42 L42 34 L48 29 L55 36',
      'M42 30 L36 24',
      'M30 14 L22 8 M26 24 L14 22 M38 10 L36 0 M18 34 L8 36',
      'M64 58 L76 72',
    ],
  },
  yo: {
    viewBox: '0 0 130 100',
    width: 3.8,
    strokes: [
      'M14 22 C20 34 26 44 32 52 C38 40 44 30 52 18',
      'M32 52 C30 64 28 76 26 88',
      circle(70, 64, 13, 0.04, -2.4),
      'M104 14 C102 34 100 52 98 66',
      'M97 84 C98 86 99 86 99 84',
    ],
  },
  paw: {
    viewBox: '0 0 120 120',
    width: 3.6,
    strokes: [
      'M60 64 C76 64 90 80 86 92 C82 104 70 98 60 98 C50 98 38 104 34 92 C30 80 44 64 60 64',
      circle(32, 52, 9, 0.05),
      circle(50, 34, 9, 0.05),
      circle(72, 34, 9, 0.05),
      circle(90, 52, 9, 0.05),
    ],
  },
  burst: {
    viewBox: '0 0 120 120',
    width: 3.6,
    strokes: [
      circle(60, 60, 18, 0.04),
      'M60 30 L60 12 M60 90 L60 108 M30 60 L12 60 M90 60 L108 60 M39 39 L26 26 M81 39 L94 26 M39 81 L26 94 M81 81 L94 94',
      'M52 56 C52 54 54 54 54 56 M66 56 C66 54 68 54 68 56 M52 66 C56 72 64 72 68 66',
    ],
  },
  mountain: {
    viewBox: '0 0 140 110',
    width: 3.6,
    strokes: [
      'M6 96 L44 40 L62 64 L84 26 L130 96',
      'M84 26 L84 6 L104 12 L84 18',
      'M34 56 L44 64 L52 56',
    ],
  },
  moon: {
    viewBox: '0 0 120 120',
    width: 3.6,
    strokes: [
      'M70 18 C46 22 32 44 38 66 C44 88 70 100 94 86 C70 86 54 70 56 50 C58 34 64 24 70 18',
      star4(98, 34, 10, 0.16),
      star4(20, 92, 8, 0.16),
    ],
  },
  coffee: {
    viewBox: '0 0 120 120',
    width: 3.6,
    strokes: [
      'M24 54 L92 54 C92 80 80 100 58 100 C36 100 24 80 24 54',
      'M92 62 C108 60 110 82 88 84',
      'M44 40 C38 32 50 26 44 16 M60 40 C54 32 66 26 60 16 M76 40 C70 32 82 26 76 16',
      'M18 108 L98 108',
    ],
  },

  /* ── Work section ── */
  scallop: {
    viewBox: '0 0 1140 190',
    width: 8,
    wobble: 1.2,
    strokes: [
      'M10 28 C15 27 30 24 40 22 C50 20 59 18 70 17 C81 16 95 15 105 15 C115 15 122 16 130 17 C138 18 145 21 150 24 C155 27 158 26 162 35 C166 44 171 72 173 80 C174 78 178 70 181 67 C184 64 187 62 192 60 C197 58 203 54 210 52 C217 50 228 47 235 46 C242 45 248 44 255 44 C262 44 268 44 275 45 C282 46 290 48 298 51 C306 54 313 58 320 62 C327 66 333 71 338 77 C343 83 348 90 352 98 C356 106 358 115 360 128 C362 141 364 168 365 176 C366 170 370 150 372 140 C374 130 377 122 380 115 C383 108 387 102 392 96 C397 90 402 83 408 77 C414 71 421 64 430 58 C439 52 445 47 460 42 C475 37 497 30 520 26 C543 22 570 17 600 15 C630 13 667 12 700 12 C733 12 767 14 800 17 C833 20 870 24 900 30 C930 36 957 44 980 50 C1003 56 1022 58 1040 63 C1058 68 1076 76 1090 82 C1104 88 1119 97 1125 100',
    ],
  },
  arrow: {
    viewBox: '0 0 56 44',
    width: 4.1,
    wobble: 0.5,
    strokes: ['M4 22.5 C18 21.6 32 22.4 50 21.8', 'M37 9 C42 13.6 46.5 17.8 50.5 21.8 C46.4 26 42 30.4 37.6 35'],
  },

  /* ── Chat section ── */
  connectTop: {
    viewBox: '0 0 162 84',
    width: 6.5,
    wobble: 0.35,
    strokes: [
      'M8 8 C10.7 10.2 18.7 16.3 24 21 C29.3 25.7 34.7 31.7 40 36 C45.3 40.3 50.7 43.5 56 47 C61.3 50.5 66.7 53.8 72 57 C77.3 60.2 82.7 63.3 88 66 C93.3 68.7 98.3 71.3 104 73 C109.7 74.7 116.5 76 122 76 C127.5 76 133 74.8 137 73 C141 71.2 143.7 68.5 146 65 C148.3 61.5 149.8 55.8 151 52 C152.2 48.2 152.5 45 153 42 C153.5 39 153.8 35.3 154 34',
    ],
  },
  connectBottom: {
    viewBox: '0 0 354 130',
    width: 6.5,
    wobble: 0.35,
    strokes: [
      'M8 74 C10 72 15 65.2 20 62 C25 58.8 32 56.3 38 55 C44 53.7 50 53.3 56 54 C62 54.7 68 57 74 59 C80 61 86 62.7 92 66 C98 69.3 104.7 74.7 110 79 C115.3 83.3 120 87.7 124 92 C128 96.3 131 100 134 105 C137 110 140.7 119.2 142 122 C142.5 117 144 100.8 145 92 C146 83.2 146.7 75.7 148 69 C149.3 62.3 150.3 57.5 153 52 C155.7 46.5 159.2 40.8 164 36 C168.8 31.2 175.3 26.8 182 23 C188.7 19.2 196 15.5 204 13 C212 10.5 221.7 8.8 230 8 C238.3 7.2 245.7 7.7 254 8 C262.3 8.3 271 8.5 280 10 C289 11.5 299.7 14.7 308 17 C316.3 19.3 323.7 21.8 330 24 C336.3 26.2 343.3 29 346 30',
    ],
  },

  /* ── Tags artwork ── */
  window: {
    viewBox: '0 0 520 380',
    width: 5,
    wobble: 2.5,
    strokes: [
      'M30 28 C150 22 330 20 486 26 C492 120 494 250 488 348 C340 356 170 358 34 352 C26 250 24 120 30 28',
      'M44 70 C190 66 340 64 478 68 C476 160 476 250 474 336 C330 340 180 342 48 338 C44 250 42 160 44 70',
      circle(68, 48, 8, 0.03),
      circle(94, 48, 8, 0.03),
      circle(120, 48, 8, 0.03),
    ],
  },
  tagsStar: {
    viewBox: '0 0 80 80',
    width: 5,
    wobble: 1.2,
    strokes: [star4(40, 40, 32, 0.12)],
  },
  tagsSwoosh: {
    viewBox: '0 0 200 240',
    width: 5,
    wobble: 2,
    strokes: [
      'M10 70 C40 44 60 70 80 52 C100 34 104 14 112 8 C116 60 138 80 176 74',
      'M136 102 C102 110 84 146 84 220',
      'M150 140 C128 138 110 152 104 176',
    ],
  },
  tagsScribble: {
    viewBox: '0 0 260 140',
    width: 5,
    wobble: 2,
    strokes: [
      'M8 132 C30 96 60 40 52 20 C46 8 24 22 40 40 C60 64 120 56 156 60 C190 64 196 96 172 98 C150 100 168 70 190 66',
      'M216 54 L214 124',
    ],
  },

  /* ── Nav sun icon ── */
  navSun: {
    viewBox: '0 0 32 32',
    width: 1.7,
    wobble: 0.35,
    strokes: [
      circle(16, 17, 6.4, 0.1, -0.6),
      'M16 3.5 L16 6.5 M26.5 7 L24.2 9.2 M29.5 17 L26.4 17 M5.5 7 L7.8 9.2 M2.5 17 L5.6 17 M24.4 25.4 L22.6 23.6 M7.6 25.4 L9.4 23.6 M16 28.5 L16 26.6',
    ],
  },
};

export function getDoodle(name: keyof typeof doodles | string, seed = '') {
  const def = doodles[name];
  if (!def) throw new Error(`Unknown doodle: ${name}`);
  const amp = def.wobble ?? 1.6;
  return {
    viewBox: def.viewBox,
    width: def.width ?? 3.6,
    strokes: def.strokes.map((s, i) => rough(s, amp, `${name}-${seed}-${i}`)),
  };
}
