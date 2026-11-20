/**
 * Contact sheet — a vanilla WebGL2 port of React Bits' ContactSheet (no React, no three.js).
 * Photos (and looping clips) stream outward from the centre, "develop" like prints as they travel,
 * slow down under the pointer, and open big with a caption on click. Drag to spin / push the stream.
 *
 * Differences from the original: every card keeps its own media aspect (landscape mockups aren't
 * cropped to portrait), items can be videos (uploaded as textures only while on screen), and the
 * mouse wheel is left alone so the page keeps scrolling.
 */

import { isPagePaused, onPagePause } from './smooth';

export interface SheetItem {
  src: string; // image, or poster when `video` is set
  video?: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

export interface SheetOptions {
  count?: number;
  speed?: number;
  rush?: number;
  spiral?: number;
  blankArea?: number;
  size?: number;
  sizeVariance?: number;
  radius?: number;
  border?: number;
  borderColor?: [number, number, number];
  background?: [number, number, number];
  rim?: number;
  roll?: number;
  develop?: number;
  edgeFade?: number;
  shadow?: number;
  hoverSlow?: number;
  catchOnHover?: boolean;
  draggable?: boolean;
  captions?: boolean;
  dpr?: number;
  reduced?: boolean;
  onOpen?: (index: number) => void;
  onClose?: () => void;
}

export interface SheetController {
  open: (index?: number) => void;
  close: () => void;
  destroy: () => void;
}

const MAX_CARDS = 48;
const TAU = Math.PI * 2;
const CAPTION_SPACE = 64;
const AREF = 0.8; // reference aspect: every card keeps the area a 0.8 portrait card would have

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smooth = (e0: number, e1: number, v: number) => {
  const t = clamp((v - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};
const springOut: [number, number] = [0, 0];
const springTo = (value: number, velocity: number, target: number, dt: number, response: number, ratio: number) => {
  const omega = TAU / Math.max(response, 0.02);
  const sub = Math.max(1, Math.ceil(dt / (1 / 240)));
  const h = dt / sub;
  let v = velocity;
  let x = value;
  for (let i = 0; i < sub; i++) {
    v += (omega * omega * (target - x) - 2 * ratio * omega * v) * h;
    x += v * h;
  }
  springOut[0] = x;
  springOut[1] = v;
  return springOut;
};
const advance = (w: number, distance: number, rush: number) => {
  if (rush < 1e-3) return w * Math.exp(-distance);
  const base = Math.pow(w, rush) - rush * distance;
  if (base <= 1e-6) return 1e-4;
  return Math.pow(base, 1 / rush);
};

const VERT = `#version 300 es
in vec2 aPos;
uniform vec2 uView;
uniform vec2 uCenter;
uniform vec2 uQuad;
uniform float uRot;
out vec2 vUv;
void main() {
  vUv = aPos + 0.5;
  vec2 q = aPos * uQuad;
  float c = cos(uRot);
  float s = sin(uRot);
  vec2 r = vec2(c * q.x + s * q.y, -s * q.x + c * q.y);
  vec2 pos = vec2(uCenter.x - uView.x * 0.5 + r.x, uView.y * 0.5 - uCenter.y + r.y);
  gl_Position = vec4(pos / (uView * 0.5), 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
uniform sampler2D uImage;
uniform float uImageAspect;
uniform vec2 uSize;
uniform float uMargin;
uniform float uRadius;
uniform float uBorder;
uniform vec3 uBorderColor;
uniform float uRim;
uniform float uReveal;
uniform float uDevelop;
uniform float uAlpha;
uniform float uShadow;
uniform float uLift;
uniform vec3 uBackground;
uniform vec2 uResolution;
uniform float uEdge;
in vec2 vUv;
out vec4 outColor;

float roundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec2 full = uSize + 2.0 * uMargin;
  vec2 p = (vUv - 0.5) * full;
  float radius = min(uRadius, 0.5 * min(uSize.x, uSize.y));
  float d = roundBox(p, 0.5 * uSize, radius);
  float px = max(fwidth(d), 1e-4);
  float card = 1.0 - smoothstep(-0.7 * px, 0.7 * px, d);

  vec2 frag = gl_FragCoord.xy;
  float edgeDistance = min(min(frag.x, uResolution.x - frag.x), min(frag.y, uResolution.y - frag.y));
  float edge = uEdge > 0.5 ? smoothstep(0.0, uEdge, edgeDistance) : 1.0;

  float height = uSize.y;
  float sd = roundBox(p - vec2(0.0, -height * (0.03 + 0.03 * uLift)), 0.5 * uSize * 0.96, radius);
  float blur = height * (0.08 + 0.06 * uLift);
  float shade = (1.0 - smoothstep(-blur * 0.6, blur, sd)) * uShadow * (0.42 + 0.22 * uLift);

  float inner = min(uBorder, 0.45 * min(uSize.x, uSize.y));
  vec2 box = max(uSize - 2.0 * inner, vec2(1.0));
  float di = roundBox(p, 0.5 * box, max(radius - inner * 0.6, 0.0));
  float photo = 1.0 - smoothstep(-0.7 * px, 0.7 * px, di);
  float boxAspect = box.x / box.y;
  vec2 uv = p / box;
  if (boxAspect > uImageAspect) {
    uv.y *= uImageAspect / boxAspect;
  } else {
    uv.x *= boxAspect / uImageAspect;
  }
  uv += 0.5;
  vec3 image = texture(uImage, uv).rgb;

  float luma = dot(image, vec3(0.2126, 0.7152, 0.0722));
  float print = step(0.5, uBorder);
  vec3 ground = mix(uBackground, uBorderColor, print);
  float base = dot(ground, vec3(0.2126, 0.7152, 0.0722));
  float dark = step(base, 0.5);
  float contrast = abs(luma - base) / max(max(base, 1.0 - base), 0.25);
  float window = 0.3;
  float threshold = 1.0 - uReveal * (1.0 + window);
  float tonal = smoothstep(threshold, threshold + window, contrast);
  vec3 mono = vec3(luma);
  vec3 tinted = mix(mono, image, smoothstep(0.5, 0.95, uReveal));
  vec3 developedImage = mix(image, tinted, uDevelop);
  vec3 paper = mix(mix(uBackground, vec3(dark), 0.07), uBorderColor, print);
  float develop = mix(smoothstep(0.0, 1.0, uReveal), tonal, uDevelop);
  float paperShown = uDevelop * max(1.0 - dark, print);
  vec3 photoColor = mix(paper, developedImage, develop);
  float paperIn = mix(develop, smoothstep(0.0, 0.18, uReveal), paperShown);
  photoColor = mix(developedImage, photoColor, paperShown);

  vec3 color3 = mix(uBorderColor, photoColor, photo);
  float rimMask = card * (1.0 - smoothstep(0.0, 1.6 * px, -d));
  color3 = mix(color3, mix(vec3(1.0), vec3(0.0), 1.0 - dark), rimMask * uRim * smoothstep(0.3, 1.0, uReveal));
  float amount = mix(mix(smoothstep(0.0, 1.0, uReveal), paperIn, photo), smoothstep(0.0, 0.18, uReveal), print * uDevelop);
  float alpha = card * uAlpha * edge * amount;
  float shadowAlpha = (1.0 - card) * shade * uAlpha * edge * uReveal;
  float total = alpha + shadowAlpha * (1.0 - alpha);
  if (total < 0.002) discard;
  outColor = vec4(color3 * alpha, total);
}`;

interface Picture {
  el: HTMLImageElement | HTMLVideoElement;
  video: boolean;
  tex: WebGLTexture;
  aspect: number;
  ready: boolean;
  uploaded: boolean;
  dirty: boolean;
  fade: number;
  used: number;
  inUse: boolean; // on a card that is in the stream
  wanted: boolean; // and visible enough to deserve live video frames
  promoted: boolean; // whether video preload has been promoted to auto
  size: number; // biggest card currently showing it (video upload priority)
  lastUp: number;
}

interface Card {
  w: number;
  rho0: number;
  theta: number;
  scale: number;
  roll: number;
  image: number;
  grip: number;
  x: number;
  y: number;
  sw: number;
  sh: number;
  rot: number;
  alpha: number;
  reveal: number;
  shown: boolean;
  visible: boolean;
}

export interface SheetDom {
  root: HTMLElement; // focusable region (keyboard + cursor)
  stage: HTMLElement; // pointer surface; the canvas goes in here
  caption?: { box: HTMLElement; title: HTMLElement; subtitle: HTMLElement };
}

export function sheetSupported() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

export function createSheet(dom: SheetDom, items: SheetItem[], options: SheetOptions = {}): SheetController | null {
  const o = {
    count: 18,
    speed: 0.1,
    rush: 0.35,
    spiral: 0,
    blankArea: 0.2,
    size: 0.17,
    sizeVariance: 0.25,
    radius: 12,
    border: 0,
    borderColor: [1, 1, 1] as [number, number, number],
    background: [0.95, 0.95, 0.95] as [number, number, number],
    rim: 0.12,
    roll: 0,
    develop: 0.85,
    edgeFade: 0.35,
    shadow: 0.5,
    hoverSlow: 0.6,
    catchOnHover: true,
    draggable: true,
    captions: true,
    dpr: 2,
    reduced: false,
    ...options,
  };
  const { root, stage } = dom;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
  const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: 'high-performance' });
  if (!gl) return null;

  const compile = (type: number, src: string) => {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) || 'shader');
    return sh;
  };
  let prog: WebGLProgram;
  try {
    prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.bindAttribLocation(prog, 0, 'aPos');
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || 'link');
  } catch {
    return null;
  }
  stage.appendChild(canvas);

  const U = (n: string) => gl.getUniformLocation(prog, n);
  const u = {
    view: U('uView'),
    center: U('uCenter'),
    quad: U('uQuad'),
    rot: U('uRot'),
    image: U('uImage'),
    imageAspect: U('uImageAspect'),
    size: U('uSize'),
    margin: U('uMargin'),
    radius: U('uRadius'),
    border: U('uBorder'),
    borderColor: U('uBorderColor'),
    rim: U('uRim'),
    reveal: U('uReveal'),
    develop: U('uDevelop'),
    alpha: U('uAlpha'),
    shadow: U('uShadow'),
    lift: U('uLift'),
    background: U('uBackground'),
    resolution: U('uResolution'),
    edge: U('uEdge'),
  };

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  gl.useProgram(prog);
  gl.uniform1i(u.image, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.disable(gl.DEPTH_TEST);
  gl.clearColor(0, 0, 0, 0);

  const aniso = gl.getExtension('EXT_texture_filter_anisotropic');
  const maxAniso = aniso ? Math.min(8, gl.getParameter(aniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT)) : 0;

  const makeTexture = () => {
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([128, 128, 128, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    return tex;
  };
  const blank = makeTexture();

  const upload = (pic: Picture, first: boolean) => {
    gl.bindTexture(gl.TEXTURE_2D, pic.tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    try {
      if (first) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pic.el);
      else gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, pic.el);
    } catch {
      return false;
    }
    pic.lastUp = performance.now();
    if (pic.video) return true; // video frames change every upload: no mipmaps
    gl.generateMipmap(gl.TEXTURE_2D);
    if (first) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      if (aniso) gl.texParameterf(gl.TEXTURE_2D, aniso.TEXTURE_MAX_ANISOTROPY_EXT, maxAniso);
    }
    return true;
  };

  /* ── media ── */
  const shelf = document.createElement('div'); // videos must live in the DOM for some mobile browsers
  shelf.setAttribute('aria-hidden', 'true');
  // kept inside the visible area (2 px, almost transparent): some mobile browsers pause off-screen or hidden videos
  shelf.style.cssText = 'position:absolute;left:0;bottom:0;width:2px;height:2px;overflow:hidden;opacity:0.01;pointer-events:none';
  root.appendChild(shelf);

  let destroyed = false;
  const pictures: Picture[] = items.map((item) => {
    const video = !!item.video;
    const el = video ? document.createElement('video') : new Image();
    const pic: Picture = { el, video, tex: makeTexture(), aspect: 1, ready: false, uploaded: false, dirty: false, fade: 0, used: -1, inUse: false, wanted: false, promoted: false, size: 0, lastUp: 0 };
    if (el instanceof HTMLVideoElement) {
      el.muted = true;
      el.loop = true;
      el.playsInline = true;
      el.setAttribute('playsinline', '');
      el.preload = 'metadata';
      el.style.cssText = 'display:block;width:2px;height:2px';
      el.addEventListener('loadedmetadata', () => {
        if (destroyed) return;
        if (el.videoWidth && el.videoHeight) pic.aspect = el.videoWidth / el.videoHeight;
      });
      el.addEventListener('loadeddata', () => {
        if (destroyed) return;
        pic.aspect = el.videoWidth / Math.max(el.videoHeight, 1);
        pic.ready = true;
        pic.dirty = true;
        schedule();
      });
      const rvfc = (el as HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number }).requestVideoFrameCallback;
      if (rvfc) {
        const onFrame = () => {
          pic.dirty = true;
          if (!destroyed) rvfc.call(el, onFrame);
        };
        rvfc.call(el, onFrame);
      }
      el.src = item.video!;
      shelf.appendChild(el);
    } else {
      el.decoding = 'async';
      el.onload = () => {
        const finish = () => {
          if (destroyed || pic.ready) return;
          pic.aspect = el.naturalWidth / Math.max(el.naturalHeight, 1);
          pic.ready = true;
          pic.dirty = true;
          schedule();
        };
        el.decode().then(finish, finish);
      };
      el.src = item.src;
    }
    return pic;
  });

  /* ── stream state ── */
  const cards: Card[] = Array.from({ length: MAX_CARDS }, () => ({
    w: 1,
    rho0: 0.2,
    theta: 0,
    scale: 1,
    roll: 0,
    image: 0,
    grip: 0,
    x: 0,
    y: 0,
    sw: 0,
    sh: 0,
    rot: 0,
    alpha: 0,
    reveal: 0,
    shown: false,
    visible: false,
  }));

  let width = 0;
  let height = 0;
  let dpr = 1;
  let sized = false;
  let seeded = false;
  let phi = 0;
  let spinVelocity = 0;
  let zoomVelocity = 0;
  let inside = 0;
  let pointerInside = false;
  let pointerX = 0;
  let pointerY = 0;
  let hovered = -1;
  let openId = -1;
  let openTarget = 0;
  let openT = 0;
  let openV = 0;
  let shownCaption = -1;
  let captionOpacity = -1;
  let captionY = -1;
  let raf = 0;
  let last = 0;
  let visible = false;
  let lost = false;
  let held = false;
  let consumed = false;
  let clock = 0;
  const order: Card[] = [];
  const draws: Card[] = [];
  const onScreenBuf = new Uint8Array(pictures.length);
  const dueBuf: Picture[] = [];
  const byWDesc = (a: Card, b: Card) => b.w - a.w;
  const lowEnd = typeof navigator !== 'undefined' && (navigator.hardwareConcurrency || 8) <= 4;
  let rectLeft = 0;
  let rectTop = 0;
  let rectDirty = true;
  const invalidateRect = () => {
    rectDirty = true;
  };
  let press: { id: number; x: number; y: number; moved: boolean; radius: number; angle: number; samples: { t: number; zoom: number; angle: number }[] } | null = null;

  let seed = (Math.random() * 4294967296) | 0;
  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (const card of cards) card.image = Math.floor(random() * pictures.length);

  const count = () => clamp(Math.round(o.count), 1, MAX_CARDS);
  const halfDiagonal = () => Math.hypot(width, height) / 2;
  const minSide = () => Math.min(width, height);
  const aspectOf = (card: Card) => clamp(pictures[card.image]?.aspect ?? AREF, 0.55, 1.9);

  const readSize = () => {
    rectDirty = true;
    const w = Math.round(root.clientWidth);
    const h = Math.round(root.clientHeight);
    if (w < 2 || h < 2) {
      sized = false;
      return false;
    }
    const maxDpr = Math.max(lowEnd ? Math.min(o.dpr, 1.5) : o.dpr, 0.5);
    const d = Math.min(window.devicePixelRatio || 1, maxDpr);
    if (sized && w === width && h === height && d === dpr) return false;
    sized = true;
    width = w;
    height = h;
    dpr = d;
    canvas.width = Math.round(w * d);
    canvas.height = Math.round(h * d);
    gl.viewport(0, 0, canvas.width, canvas.height);
    return true;
  };

  const pickImage = () => {
    const n = pictures.length;
    if (!n) return 0;
    onScreenBuf.fill(0);
    for (let i = 0; i < count(); i++) {
      const c = cards[i];
      if (c.shown && c.image < n) onScreenBuf[c.image] += 1;
    }
    let best = 0;
    let score = Infinity;
    for (let k = 0; k < n; k++) {
      const p = pictures[k];
      const s = onScreenBuf[k] * 1000 + p.used + random() * 0.5 + (p.ready ? 0 : 500);
      if (s < score) {
        score = s;
        best = k;
      }
    }
    pictures[best].used = clock;
    return best;
  };

  const exitRadius = (card: Card, angle: number) => {
    const R = halfDiagonal();
    const c = Math.abs(Math.cos(angle));
    const s = Math.abs(Math.sin(angle));
    const reach = Math.min(c > 1e-4 ? width / 2 / c : Infinity, s > 1e-4 ? height / 2 / s : Infinity);
    const a = aspectOf(card);
    const grow = 2 * clamp(o.size, 0.03, 0.8) * minSide() * card.scale * 0.5 * Math.hypot(Math.sqrt(AREF * a), Math.sqrt(AREF / a)) * 1.05;
    const room = R - grow;
    return room > R * 0.08 ? reach / room : 1.6;
  };

  const pickAngle = (w = 1) => {
    let best = random() * TAU;
    let bestScore = -1;
    for (let k = 0; k < 12; k++) {
      const angle = random() * TAU;
      let nearest = TAU;
      for (let i = 0; i < count(); i++) {
        const c = cards[i];
        if (!c.shown) continue;
        const near = Math.abs(Math.log(Math.max(c.w, 1e-4) / Math.max(w, 1e-4)));
        if (near > 0.9) continue;
        const delta = Math.abs(Math.atan2(Math.sin(angle - c.theta - phi), Math.cos(angle - c.theta - phi)));
        nearest = Math.min(nearest, delta + near * 0.9);
      }
      if (nearest > bestScore) {
        bestScore = nearest;
        best = angle;
      }
    }
    return best;
  };

  const respawn = (card: Card, inward: boolean, w = 1) => {
    card.theta = pickAngle(w) - phi;
    card.rho0 = clamp(o.blankArea, 0.02, 0.7) * (1 + random() * 0.45);
    card.scale = 1 + clamp(o.sizeVariance, 0, 0.9) * (random() * 2 - 1);
    card.roll = random() * 2 - 1;
    card.image = pickImage();
    card.grip = 0;
    if (inward) {
      const out = exitRadius(card, card.theta + phi);
      card.w = clamp(card.rho0 / out, 1e-3, 0.999);
    } else {
      card.w = 1;
    }
  };

  const seedCard = (card: Card, fraction: number) => {
    const rush = clamp(o.rush, 0, 1);
    const R = halfDiagonal();
    const typicalOut = (width + height) / 4 / Math.max(R * 0.9, 1);
    const typicalEnd = clamp((clamp(o.blankArea, 0.02, 0.7) * 1.22) / Math.max(typicalOut, 0.05), 0.05, 0.95);
    const lifeGuess = rush < 1e-3 ? Math.log(1 / typicalEnd) : (1 - Math.pow(typicalEnd, rush)) / rush;
    card.shown = false;
    respawn(card, false, advance(1, lifeGuess * fraction, rush));
    const out = exitRadius(card, card.theta + phi);
    const wEnd = clamp(card.rho0 / out, 1e-3, 1);
    const life = rush < 1e-3 ? Math.log(1 / wEnd) : (1 - Math.pow(wEnd, rush)) / rush;
    card.w = advance(1, life * fraction, rush);
    card.shown = true;
  };

  const seedStream = () => {
    for (let i = 0; i < MAX_CARDS; i++) cards[i].shown = false;
    for (let i = 0; i < count(); i++) seedCard(cards[i], (i + random() * 0.85) / count());
    seeded = true;
  };

  const schedule = () => {
    if (destroyed || lost || !visible || isPagePaused() || raf) return;
    raf = requestAnimationFrame(frame);
  };

  const focusRect = (card: Card) => {
    const aspect = aspectOf(card);
    const reserve = o.captions ? CAPTION_SPACE : 0;
    const room = Math.max(height - reserve, height * 0.6);
    let fh = room * 0.74;
    if (fh * aspect > width * 0.86) fh = (width * 0.86) / aspect;
    return { x: width / 2, y: (height - reserve) / 2 + 6, w: fh * aspect, h: fh, aspect };
  };

  const openCard = (id: number) => {
    openId = id;
    openTarget = 1;
    cards[id].grip = 1;
    o.onOpen?.(cards[id].image);
    schedule();
  };

  const open = (index?: number) => {
    let id = -1;
    if (typeof index === 'number' && pictures.length) {
      const target = ((Math.round(index) % pictures.length) + pictures.length) % pictures.length;
      for (const c of order) if (c.image === target && c.alpha > 0.2) id = cards.indexOf(c);
      if (id < 0) {
        let size = -1;
        for (let i = 0; i < count(); i++) {
          if (cards[i].shown && cards[i].sh > size) {
            size = cards[i].sh;
            id = i;
          }
        }
        if (id >= 0) cards[id].image = target;
      }
    } else {
      let score = -Infinity;
      for (let i = 0; i < count(); i++) {
        const c = cards[i];
        if (!c.shown || c.alpha < 0.3) continue;
        const value = c.sh - Math.hypot(c.x - width / 2, c.y - height / 2) * 0.2;
        if (value > score) {
          score = value;
          id = i;
        }
      }
    }
    if (id >= 0) openCard(id);
  };

  const close = () => {
    if (openId < 0 || openTarget === 0) return;
    openTarget = 0;
    o.onClose?.();
    schedule();
  };

  /** One image upload per frame (big textures can stall); a few video frames per frame, biggest cards first. */
  let tick = 0;
  const VIDEO_BUDGET = window.innerWidth < 761 ? 2 : 4;
  const uploads = () => {
    let busy = false;
    let imageDone = false;
    for (const card of cards) {
      if (!card.shown) continue;
      const p = pictures[card.image];
      if (!p || !p.ready) continue;
      if (!p.video && !p.uploaded && !imageDone) {
        p.uploaded = upload(p, true);
        imageDone = true;
        busy = true;
      }
    }
    if (!imageDone) {
      const p = pictures.find((x) => !x.video && x.ready && !x.uploaded);
      if (p) {
        p.uploaded = upload(p, true);
        busy = true;
      }
    }
    tick++;
    const now = performance.now();
    const paused = isPagePaused();
    dueBuf.length = 0;
    for (const p of pictures) {
      if (!p.video) continue;
      const v = p.el as HTMLVideoElement;
      if (p.inUse && visible && !paused && !p.promoted) {
        p.promoted = true;
        v.preload = 'auto';
        if (v.readyState < 2) v.load();
      }
      if (p.wanted && visible && !paused && !o.reduced) {
        if (v.paused) v.play().catch(() => {});
      } else if (!v.paused) v.pause();
      if (!p.ready || v.readyState < 2) continue;
      if (!p.uploaded) {
        // first frame as soon as a card needs it, so the card can fade in like a photo
        if (p.inUse) {
          p.uploaded = upload(p, true);
          p.dirty = false;
          busy = true;
        }
        continue;
      }
      if (!p.wanted) continue;
      busy = true;
      if (p.dirty || (!('requestVideoFrameCallback' in v) && !v.paused && tick % 2 === 0)) dueBuf.push(p);
    }
    const focusPic = openId >= 0 ? pictures[cards[openId].image] : null;
    if (dueBuf.length > 1) {
      dueBuf.sort((a, b) => (b === focusPic ? 1e12 : b.size * (now - b.lastUp)) - (a === focusPic ? 1e12 : a.size * (now - a.lastUp)));
    }
    const limit = Math.min(dueBuf.length, VIDEO_BUDGET);
    for (let i = 0; i < limit; i++) {
      const p = dueBuf[i];
      upload(p, false);
      p.dirty = false;
    }
    return busy;
  };

  function frame(time: number) {
    raf = 0;
    if (destroyed || lost || !visible || isPagePaused()) return;
    if (!sized) {
      readSize();
      if (!sized) return;
    }
    const dt = last ? Math.min(Math.max((time - last) / 1000, 0), 0.05) : 1 / 60;
    last = time;
    clock += dt;
    const reduced = o.reduced;
    let busy = false;

    if (!seeded) seedStream();

    const active = count();
    for (let i = active; i < MAX_CARDS; i++) cards[i].shown = false;
    for (let i = 0; i < active; i++) if (!cards[i].shown) seedCard(cards[i], random() * 0.92);

    // which media are on screen (videos only play while someone can see them)
    for (const p of pictures) {
      p.inUse = p.wanted = false;
      p.size = 0;
    }
    for (let i = 0; i < active; i++) {
      const c = cards[i];
      if (!c.shown) continue;
      const p = pictures[c.image];
      p.inUse = true;
      if (c.alpha > 0.01 && c.reveal > 0.02) {
        p.wanted = true;
        p.size = Math.max(p.size, c.sh);
      }
    }
    if (openId >= 0) pictures[cards[openId].image].wanted = true;
    if (uploads()) busy = true;
    for (const p of pictures) {
      if (p.uploaded && p.fade < 1) {
        p.fade = reduced ? 1 : Math.min(1, p.fade + dt / 0.6);
        busy = true;
      }
    }

    const rush = clamp(o.rush, 0, 1);
    const target = pointerInside && !press ? 1 : 0;
    inside += (target - inside) * (1 - Math.exp(-dt / (target > inside ? 0.35 : 0.6)));
    const stopped = held || reduced;
    const cruise = stopped ? 0 : o.speed;
    const slow = 1 - clamp(o.hoverSlow, 0, 1) * inside * (o.catchOnHover ? 1 : 0.6);

    [openT, openV] = springTo(openT, openV, openTarget, dt, reduced ? 0.06 : 0.62, 0.88);
    if (Math.abs(openT - openTarget) > 1e-4 || Math.abs(openV) > 1e-4) busy = true;
    else {
      openT = openTarget;
      openV = 0;
      if (openTarget === 0 && openId >= 0) openId = -1;
    }
    const calm = 1 - 0.9 * openT;

    if (!press || !press.moved) {
      zoomVelocity *= Math.exp(-dt / (reduced ? 0.05 : 0.7));
      spinVelocity *= Math.exp(-dt / (reduced ? 0.05 : 1.1));
    }
    if (Math.abs(zoomVelocity) < 1e-4) zoomVelocity = 0;
    if (Math.abs(spinVelocity) < 1e-4) spinVelocity = 0;
    if (zoomVelocity || spinVelocity) busy = true;
    if (!press || !press.moved) phi += spinVelocity * dt;

    const flow = cruise * slow * calm;
    const extra = press && press.moved ? 0 : zoomVelocity * dt;
    if (flow !== 0) busy = true;

    const R = halfDiagonal();
    const side = minSide();
    const baseSize = 2 * clamp(o.size, 0.03, 0.8) * side;
    const rollMax = (clamp(o.roll, 0, 30) * Math.PI) / 180;
    const maxDim = Math.max(width, height);

    for (let i = 0; i < active; i++) {
      const card = cards[i];
      const isHeld = i === openId;
      const gripTarget = isHeld ? 1 : o.catchOnHover && i === hovered ? 1 : 0;
      card.grip += (gripTarget - card.grip) * (1 - Math.exp(-dt / (gripTarget > card.grip ? 0.16 : 0.5)));
      if (Math.abs(card.grip - gripTarget) < 1e-3) card.grip = gripTarget;
      else busy = true;
      if (!isHeld) {
        const travel = flow * (1 - card.grip) * dt + extra * (1 - card.grip * 0.85);
        if (travel !== 0) card.w = advance(card.w, travel, rush);
      }
      const rho = card.rho0 / card.w;
      const angle = card.theta + phi + o.spiral * Math.log(Math.max(rho / card.rho0, 1e-4));
      const s = baseSize * rho * card.scale;
      const a = aspectOf(card);
      card.sh = s * Math.sqrt(AREF / a);
      card.sw = card.sh * a;
      card.x = width / 2 + Math.cos(angle) * rho * R;
      card.y = height / 2 + Math.sin(angle) * rho * R;
      card.rot = rollMax * card.roll;
      const out = exitRadius(card, angle);
      if (!isHeld && rho > out && card.grip < 0.5) {
        respawn(card, false);
        continue;
      }
      if (!isHeld && card.w > 1.0001) {
        respawn(card, true);
        continue;
      }
      const p = pictures[card.image];
      card.reveal = Math.max(smooth(card.rho0, card.rho0 * 1.5, rho), card.grip);
      const giant = 1 - smooth(maxDim * 0.7, maxDim * 1.05, card.sh);
      card.alpha = (p ? p.fade : 0) * giant;
    }

    order.length = active;
    for (let i = 0; i < active; i++) order[i] = cards[i];
    order.sort(byWDesc);
    if (pointerInside && !press) refreshHover();

    const focus = openId >= 0 ? cards[openId] : null;
    const rect = focus ? focusRect(focus) : null;
    const ease = openT;
    const radiusPx = Math.max(0, o.radius);
    const edgePx = clamp(o.edgeFade, 0, 1) * side * 0.22 * dpr;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(u.view, width, height);
    gl.uniform2f(u.resolution, width * dpr, height * dpr);
    gl.uniform3f(u.borderColor, o.borderColor[0], o.borderColor[1], o.borderColor[2]);
    gl.uniform3f(u.background, o.background[0], o.background[1], o.background[2]);
    gl.uniform1f(u.develop, clamp(o.develop, 0, 1));
    gl.uniform1f(u.shadow, clamp(o.shadow, 0, 1));
    gl.activeTexture(gl.TEXTURE0);

    draws.length = 0;
    for (let i = 0; i < order.length; i++) {
      const c = order[i];
      if (c !== focus) draws.push(c);
    }
    if (focus) draws.push(focus);
    for (const card of draws) {
      const isFocus = card === focus;
      let x = card.x;
      let y = card.y;
      let w = card.sw;
      let h = card.sh;
      let rot = card.rot;
      let alpha = card.alpha * (isFocus ? 1 : 1 - 0.72 * ease);
      let reveal = card.reveal;
      let lift = card.grip;
      let radius = radiusPx * Math.min(1, card.sh / Math.max(baseSize * 0.5, 1));
      const p = pictures[card.image];
      let imageAspect = p?.aspect ?? AREF;
      if (isFocus && rect) {
        x += (rect.x - x) * ease;
        y += (rect.y - y) * ease;
        w += (rect.w - w) * ease;
        h += (rect.h - h) * ease;
        rot *= 1 - ease;
        alpha = Math.max(alpha, ease);
        reveal = 1;
        lift = 1;
        radius += (Math.max(radiusPx, 10) - radius) * ease;
        imageAspect = rect.aspect;
      }
      card.visible = alpha > 0.003 && w > 0.5;
      if (!card.visible) continue;
      const scale = 1 + 0.05 * card.grip * (1 - (isFocus ? ease : 0));
      w *= scale;
      h *= scale;
      const margin = Math.max(8, h * 0.22);
      gl.bindTexture(gl.TEXTURE_2D, p?.uploaded ? p.tex : blank);
      gl.uniform2f(u.center, x, y);
      gl.uniform2f(u.quad, w + 2 * margin, h + 2 * margin);
      gl.uniform1f(u.rot, rot);
      gl.uniform1f(u.imageAspect, imageAspect);
      gl.uniform2f(u.size, w, h);
      gl.uniform1f(u.margin, margin);
      gl.uniform1f(u.radius, radius);
      gl.uniform1f(u.border, clamp(o.border, 0, 0.3) * Math.min(w, h));
      gl.uniform1f(u.rim, clamp(o.rim, 0, 1) * (0.6 + 0.4 * lift));
      gl.uniform1f(u.reveal, reveal);
      gl.uniform1f(u.alpha, alpha);
      gl.uniform1f(u.lift, lift);
      gl.uniform1f(u.edge, isFocus ? edgePx * (1 - ease) : edgePx);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    paintCaption(focus, rect, ease);
    if (busy || press || pointerInside || flow !== 0) schedule();
  }

  function paintCaption(focus: Card | null, rect: ReturnType<typeof focusRect> | null, ease: number) {
    const cap = dom.caption;
    if (!cap) return;
    if (!o.captions || !focus || !rect) {
      if (captionOpacity !== 0) {
        captionOpacity = 0;
        cap.box.style.opacity = '0';
      }
      return;
    }
    if (focus.image !== shownCaption) {
      shownCaption = focus.image;
      const item = items[focus.image];
      cap.title.textContent = item ? item.title ?? item.alt : '';
      cap.subtitle.textContent = item?.subtitle ?? '';
      cap.subtitle.style.display = item?.subtitle ? '' : 'none';
    }
    const opacity = smooth(0.55, 1, ease);
    const y = rect.y + rect.h / 2 + 22 + (1 - opacity) * 8;
    if (Math.abs(opacity - captionOpacity) > 0.002 || Math.abs(y - captionY) > 0.05) {
      captionOpacity = opacity;
      captionY = y;
      cap.box.style.opacity = opacity.toFixed(3);
      cap.box.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    }
  }

  const hitTest = (px: number, py: number) => {
    for (let k = order.length - 1; k >= 0; k--) {
      const c = order[k];
      if (!c.visible || c.alpha < 0.3 || c.reveal < 0.45) continue;
      const dx = px - c.x;
      const dy = py - c.y;
      const cs = Math.cos(-c.rot);
      const sn = Math.sin(-c.rot);
      const lx = dx * cs - dy * sn;
      const ly = dx * sn + dy * cs;
      const pad = c.grip * 6;
      if (Math.abs(lx) <= c.sw / 2 + pad && Math.abs(ly) <= c.sh / 2 + pad) return cards.indexOf(c);
    }
    return -1;
  };

  function refreshHover() {
    if (openTarget > 0) {
      hovered = -1;
      if (root.style.cursor !== 'pointer') root.style.cursor = 'pointer';
      return;
    }
    hovered = hitTest(pointerX, pointerY);
    const cursor = hovered >= 0 ? 'pointer' : o.draggable ? 'grab' : '';
    if (root.style.cursor !== cursor) root.style.cursor = cursor;
  }

  const local = (e: PointerEvent | MouseEvent) => {
    if (rectDirty) {
      const r = root.getBoundingClientRect();
      rectLeft = r.left;
      rectTop = r.top;
      rectDirty = false;
    }
    return { x: e.clientX - rectLeft, y: e.clientY - rectTop };
  };

  const onMove = (e: PointerEvent) => {
    const pt = local(e);
    if (e.pointerType !== 'touch') {
      pointerInside = true;
      pointerX = pt.x;
      pointerY = pt.y;
    }
    if (press && press.id === e.pointerId) {
      const dx = pt.x - width / 2;
      const dy = pt.y - height / 2;
      const radius = Math.max(Math.hypot(dx, dy), minSide() * 0.08);
      const angle = Math.atan2(dy, dx);
      if (!press.moved && Math.hypot(e.clientX - press.x, e.clientY - press.y) > 6) {
        press.moved = true;
        hovered = -1;
        root.style.cursor = 'grabbing';
        zoomVelocity = 0;
        spinVelocity = 0;
        try {
          stage.setPointerCapture(e.pointerId);
        } catch {}
      }
      if (press.moved) {
        const zoom = clamp(Math.log(radius / press.radius), -0.3, 0.3);
        const turn = Math.atan2(Math.sin(angle - press.angle), Math.cos(angle - press.angle));
        const rush = clamp(o.rush, 0, 1);
        for (let i = 0; i < count(); i++) if (i !== openId) cards[i].w = advance(cards[i].w, zoom, rush);
        phi += turn;
        press.radius = radius;
        press.angle = angle;
        const t = performance.now();
        press.samples.push({ t, zoom, angle: turn });
        while (press.samples.length > 2 && t - press.samples[0].t > 110) press.samples.shift();
      }
    }
    schedule();
  };

  const onDown = (e: PointerEvent) => {
    if (!e.isPrimary || e.button > 0) return;
    consumed = false;
    if (!o.draggable) return;
    const pt = local(e);
    const dx = pt.x - width / 2;
    const dy = pt.y - height / 2;
    press = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false, radius: Math.max(Math.hypot(dx, dy), minSide() * 0.08), angle: Math.atan2(dy, dx), samples: [] };
    schedule();
  };

  const finish = (e: PointerEvent) => {
    if (!press || press.id !== e.pointerId) return;
    const ended = press;
    press = null;
    try {
      if (stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId);
    } catch {}
    if (ended.moved) {
      consumed = true;
      const t = performance.now();
      const recent = ended.samples.filter((s) => t - s.t < 110);
      if (recent.length && t - recent[recent.length - 1].t < 60 && !o.reduced) {
        const span = Math.max((t - recent[0].t) / 1000, 1 / 60);
        zoomVelocity = clamp(recent.reduce((sum, s) => sum + s.zoom, 0) / span, -3, 3);
        spinVelocity = clamp(recent.reduce((sum, s) => sum + s.angle, 0) / span, -4, 4);
      }
      root.style.cursor = o.draggable ? 'grab' : '';
    }
    schedule();
  };

  const onClick = (e: MouseEvent) => {
    if (consumed) {
      consumed = false;
      return;
    }
    if (openTarget > 0) {
      close();
      return;
    }
    const pt = local(e);
    const hit = hitTest(pt.x, pt.y);
    if (hit >= 0) openCard(hit);
  };

  const onLeave = (e: PointerEvent) => {
    if (press && press.id === e.pointerId) return;
    pointerInside = false;
    hovered = -1;
    root.style.cursor = '';
    schedule();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.target !== root) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      if (openTarget > 0) close();
      else open();
    } else if (e.key === 'Escape' && openTarget > 0) {
      e.preventDefault();
      close();
    } else if (e.key === ' ') {
      e.preventDefault();
      held = !held;
      schedule();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      zoomVelocity += 0.9;
      schedule();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      zoomVelocity -= 0.9;
      schedule();
    }
  };

  stage.addEventListener('pointerdown', onDown);
  stage.addEventListener('pointermove', onMove);
  stage.addEventListener('pointerup', finish);
  stage.addEventListener('pointercancel', finish);
  stage.addEventListener('pointerleave', onLeave);
  stage.addEventListener('click', onClick);
  root.addEventListener('keydown', onKey);

  const resizer = new ResizeObserver(() => {
    if (readSize()) schedule();
  });
  resizer.observe(root);

  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        rectDirty = true;
        last = 0;
        schedule();
      } else {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        last = 0;
        for (const p of pictures) if (p.video) (p.el as HTMLVideoElement).pause();
      }
    },
    { rootMargin: '80px' },
  );
  io.observe(root);

  window.addEventListener('scroll', invalidateRect, { passive: true });
  window.addEventListener('resize', invalidateRect, { passive: true });
  stage.addEventListener('pointerenter', invalidateRect, { passive: true });

  const unsubPause = onPagePause((paused) => {
    if (paused) {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      for (const p of pictures) if (p.video) (p.el as HTMLVideoElement).pause();
    } else {
      rectDirty = true;
      last = 0;
      schedule();
    }
  });

  const onLost = (e: Event) => {
    e.preventDefault();
    lost = true;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };
  canvas.addEventListener('webglcontextlost', onLost);

  readSize();
  schedule();

  return {
    open,
    close,
    destroy: () => {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
      unsubPause();
      io.disconnect();
      resizer.disconnect();
      window.removeEventListener('scroll', invalidateRect);
      window.removeEventListener('resize', invalidateRect);
      stage.removeEventListener('pointerenter', invalidateRect);
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerup', finish);
      stage.removeEventListener('pointercancel', finish);
      stage.removeEventListener('pointerleave', onLeave);
      stage.removeEventListener('click', onClick);
      root.removeEventListener('keydown', onKey);
      for (const p of pictures) {
        if (p.video) (p.el as HTMLVideoElement).pause();
        gl.deleteTexture(p.tex);
      }
      shelf.remove();
      canvas.remove();
    },
  };
}
