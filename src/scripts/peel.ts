/**
 * Peelable, draggable stickers rendered with WebGL2.
 * Vanilla port of the React Bits <StickerPeel /> component (same shaders and physics),
 * so it runs without React. Each sticker lives inside a positioned parent and can be
 * peeled on hover, grabbed, swung around and thrown inside it.
 */

export type PeelFinish = 'gloss' | 'matte' | 'holo';

export interface PeelOptions {
  imageSrc: string;
  width?: number;
  rotate?: number;
  peelDirection?: number;
  peelBackHoverPct?: number;
  peelBackActivePct?: number;
  curlRadius?: number;
  finish?: PeelFinish;
  backColor?: string;
  lightingIntensity?: number;
  shadowIntensity?: number;
  followPointer?: boolean;
  draggable?: boolean;
  swing?: number;
  friction?: number;
  bounce?: number;
  intro?: boolean;
  /** px offset of the sticker centre from the centre of the parent */
  initialPosition?: { x: number; y: number };
  label?: string;
  onReady?: () => void;
}

type Point = { x: number; y: number };
type Program = { program: WebGLProgram; uniforms: Record<string, WebGLUniformLocation | null> };
type Target = { texture: WebGLTexture | null; buffer: WebGLFramebuffer | null; width: number; height: number };
type Press = {
  id: number;
  grab: Point;
  origin: Point;
  pointer: Point;
  pivot: Point;
  moving: boolean;
  samples: { x: number; y: number; t: number }[];
};

const GRID = 96;
const PAD = 0.18;
const MAX_TEXTURE = 1024;
const MASK_SIZE = 96;
const LIGHT_HEIGHT = 260;
const FINISHES: Record<PeelFinish, number> = { gloss: 0, matte: 1, holo: 2 };
let stack = 10;

const VERTEX = `#version 300 es
in vec2 aGrid;
uniform vec2 uCanvas;
uniform vec2 uMesh;
uniform vec2 uCenter;
uniform vec2 uDir;
uniform float uFold;
uniform float uRadius;
uniform float uAngle;
uniform float uScale;
uniform float uLift;
uniform int uPass;
uniform vec2 uShadowOffset;
uniform vec2 uShadowSlope;
out vec2 vUv;
out float vFold;
out vec3 vNormal;
out vec3 vPos;
out float vHeight;
out float vCurl;
const float PI = 3.14159265;

void main() {
  vec2 local = (aGrid - 0.5) * uMesh;
  float s = dot(local, uDir);
  float d = uFold - s;
  vec3 normal = vec3(0.0, 0.0, 1.0);
  float z = 0.0;
  vec2 p = local;
  if (d > 0.0) {
    float theta = d / uRadius;
    float along = uFold + d - PI * uRadius;
    z = 2.0 * uRadius;
    normal = vec3(0.0, 0.0, -1.0);
    if (theta < PI) {
      along = uFold - uRadius * sin(theta);
      z = uRadius * (1.0 - cos(theta));
      normal = vec3(uDir * sin(theta), cos(theta));
    }
    p += (along - s) * uDir;
  }
  float c = cos(uAngle);
  float sn = sin(uAngle);
  vec2 turned = vec2(c * p.x - sn * p.y, sn * p.x + c * p.y) * uScale;
  vNormal = vec3(c * normal.x - sn * normal.y, sn * normal.x + c * normal.y, normal.z);
  vUv = aGrid;
  vFold = d;
  vCurl = z * uScale;
  float height = z * uScale + uLift;
  vec2 screen = uCenter + turned;
  float depth = 0.0;
  if (uPass == 0 || uPass == 2) {
    vHeight = uPass == 0 ? height : z * uScale;
    screen += uShadowOffset + uShadowSlope * vHeight;
  } else {
    vHeight = height;
    depth = clamp(-height / 1000.0, -1.0, 1.0);
  }
  vPos = vec3(uCenter + turned, height);
  gl_Position = vec4(screen.x / uCanvas.x * 2.0 - 1.0, 1.0 - screen.y / uCanvas.y * 2.0, depth, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uImage;
uniform int uPass;
uniform int uFinish;
uniform vec3 uBack;
uniform vec3 uLight;
uniform float uShine;
uniform float uShadow;
uniform float uTexel;
uniform float uLod;
uniform float uRadius;
uniform vec2 uGlint;
in vec2 vUv;
in float vFold;
in vec3 vNormal;
in vec3 vPos;
in float vHeight;
in float vCurl;
out vec4 outColor;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

vec3 spectrum(float t) {
  t = fract(t) * 6.0;
  vec3 a = vec3(1.0, 0.478, 0.46);
  vec3 b = vec3(1.0, 0.928, 0.38);
  vec3 c = vec3(0.659, 1.0, 0.38);
  vec3 d = vec3(0.52, 1.0, 0.968);
  vec3 e = vec3(0.48, 0.584, 1.0);
  vec3 f = vec3(0.68, 0.52, 1.0);
  if (t < 1.0) return mix(a, b, t);
  if (t < 2.0) return mix(b, c, t - 1.0);
  if (t < 3.0) return mix(c, d, t - 2.0);
  if (t < 4.0) return mix(d, e, t - 3.0);
  if (t < 5.0) return mix(e, f, t - 4.0);
  return mix(f, a, t - 5.0);
}

float bars(float t) {
  t = fract(t) * 12.0;
  if (t < 3.8) return mix(0.08, 0.6, t / 3.8);
  if (t < 4.5) return mix(0.6, 0.72, (t - 3.8) / 0.7);
  if (t < 5.2) return mix(0.72, 0.6, (t - 4.5) / 0.7);
  if (t < 10.0) return mix(0.6, 0.08, (t - 5.2) / 4.8);
  return 0.08;
}

void main() {
  if (uPass == 0) {
    float alpha;
    if (vFold > 0.0) {
      alpha = textureLod(uImage, vUv, log2(max(1.5 * uTexel, 1.0))).a * (1.0 - smoothstep(0.0, uRadius, vCurl));
    } else {
      alpha = textureLod(uImage, vUv, log2(max((1.2 + vHeight * 0.55) * uTexel, 1.0))).a;
    }
    outColor = vec4(0.0, 0.0, 0.0, alpha * uShadow / (1.0 + vHeight * 0.03));
    return;
  }
  if (uPass == 2) {
    if (vFold <= 0.0) discard;
    float alpha = textureLod(uImage, vUv, log2(max(uTexel, 1.0))).a * smoothstep(0.0, uRadius, vCurl);
    outColor = vec4(alpha);
    return;
  }
  if (uPass == 1 && vFold > 0.0) discard;
  if (uPass == 3 && vFold <= 0.0) discard;
  vec4 art = textureLod(uImage, vUv, uLod);
  if (art.a < 0.004) discard;
  bool front = vNormal.z >= 0.0;
  vec3 n = normalize(front ? vNormal : -vNormal);
  vec3 toLight = normalize(uLight - vPos);
  vec3 halfway = normalize(toLight + vec3(0.0, 0.0, 1.0));
  float diffuse = max(dot(n, toLight), 0.0);
  float nh = max(dot(n, halfway), 0.0);
  vec3 key = normalize(vec3(-0.45, -0.6, 0.66));
  float shade = clamp(0.5 + 0.25 * dot(n, key) / key.z + 0.25 * n.z, 0.5, front ? 1.0 : 1.08);
  if (uPass == 1) shade = 1.0;
  vec3 color;
  if (!front) {
    float grain = hash(floor(vUv * 700.0)) * 0.06 - 0.03;
    color = uBack * (0.7 + 0.3 * diffuse + grain) * art.a + vec3(pow(nh, 24.0) * 0.2 * uShine) * art.a;
  } else if (uFinish == 1) {
    color = art.rgb * (0.8 + 0.22 * diffuse) + vec3(pow(nh, 8.0) * 0.08 * uShine) * art.a;
  } else if (uFinish == 2) {
    vec3 albedo = art.rgb / art.a;
    float lum = dot(albedo, vec3(0.299, 0.587, 0.114));
    float foil = smoothstep(0.5, 0.92, lum);
    vec2 q = vUv - uGlint;
    float near = exp(-dot(q, q) * 3.0);
    float tilt = dot(n.xy, vec2(0.6, 0.8)) * 1.6;
    vec3 rainbow = spectrum((vUv.x + vUv.y) * 0.85 - (uGlint.x + uGlint.y) * 1.2 + tilt);
    float streak = bars((vUv.x - vUv.y) * 2.6 + uGlint.x * 1.8 - uGlint.y * 0.6 + tilt * 0.5);
    float band = smoothstep(0.32, 0.7, streak);
    vec3 silver = vec3(0.8, 0.82, 0.86) * (0.88 + 0.16 * diffuse);
    vec3 film = mix(silver, rainbow * 1.08, clamp(band * (0.55 + 0.45 * near) + 0.18 * near, 0.0, 1.0));
    vec3 ink = albedo * (0.86 + 0.14 * diffuse) + rainbow * band * 0.22 * (0.4 + 0.6 * near);
    vec3 base = mix(albedo * (0.86 + 0.14 * diffuse), mix(ink, film, foil), uShine * 0.6 + 0.4);
    vec2 cell = floor(vUv * 180.0);
    vec2 jitter = vec2(hash(cell), hash(cell + 7.3)) * 0.6 + 0.2;
    float dist = length(fract(vUv * 180.0) - jitter);
    vec3 facet = normalize(vec3(vec2(hash(cell + 2.1), hash(cell + 5.7)) * 2.0 - 1.0, 1.6));
    float glint = pow(max(dot(facet, halfway), 0.0), 60.0) * smoothstep(0.32, 0.05, dist) * step(0.55, hash(cell + 3.1)) * (0.15 + 0.85 * foil);
    color = (base + spectrum(hash(cell) + uGlint.x) * glint * 1.6 * uShine + vec3(pow(nh, 140.0) * 0.4 * uShine)) * art.a;
  } else {
    color = art.rgb * (0.86 + 0.16 * diffuse) + vec3(pow(nh, 220.0) * 0.4 + pow(nh, 24.0) * 0.03) * uShine * art.a;
  }
  float bend = uPass == 3 ? smoothstep(0.0, uRadius * 0.6, vCurl) : 0.0;
  float glare = pow(max(dot(n, normalize(key + vec3(0.0, 0.0, 1.0))), 0.0), 28.0) * bend * (0.18 + 0.3 * uShine);
  outColor = vec4(min(color * shade + vec3(glare) * art.a, vec3(art.a)), art.a);
}`;

const POST_VERTEX = `#version 300 es
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const POST_FRAGMENT = `#version 300 es
precision highp float;
uniform sampler2D uSource;
uniform vec2 uStep;
uniform float uSigma;
uniform float uStrength;
uniform int uMode;
in vec2 vUv;
out vec4 outColor;

void main() {
  if (uMode == 1) {
    outColor = vec4(0.0, 0.0, 0.0, texture(uSource, vUv).a * uStrength);
    return;
  }
  vec4 sum = vec4(0.0);
  float total = 0.0;
  for (int i = -8; i <= 8; i++) {
    float offset = float(i);
    float weight = exp(-0.5 * offset * offset / (uSigma * uSigma));
    sum += texture(uSource, vUv + uStep * offset) * weight;
    total += weight;
  }
  outColor = sum / total;
}`;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const wrapAngle = (angle: number) => Math.atan2(Math.sin(angle), Math.cos(angle));
const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

type Spring = { swing: number; swingV: number; peel: number; peelV: number; lift: number; liftV: number };
const spring = (state: Spring, key: 'swing' | 'peel' | 'lift', target: number, frequency: number, damping: number, dt: number) => {
  const omega = 2 * Math.PI * frequency;
  const v = `${key}V` as 'swingV' | 'peelV' | 'liftV';
  state[v] += (omega * omega * (target - state[key]) - 2 * damping * omega * state[v]) * dt;
  state[key] += state[v] * dt;
};

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
};

const link = (gl: WebGL2RenderingContext, vs: string, fs: string): Program | null => {
  const vertex = compile(gl, gl.VERTEX_SHADER, vs);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fs);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.bindAttribLocation(program, 0, 'aGrid');
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  const uniforms: Record<string, WebGLUniformLocation | null> = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i);
    if (info) uniforms[info.name] = gl.getUniformLocation(program, info.name);
  }
  return { program, uniforms };
};

const convexHull = (points: [number, number][]) => {
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (sorted.length < 3) return sorted;
  const cross = (o: [number, number], a: [number, number], b: [number, number]) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: [number, number][] = [];
  sorted.forEach((p) => {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  });
  const upper: [number, number][] = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  return lower.slice(0, -1).concat(upper.slice(0, -1));
};

export const peelSupported = () => {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
};

/** Mounts a sticker inside `parent` (which must be positioned). Returns null when WebGL2 is missing. */
export function createPeel(parent: HTMLElement, options: PeelOptions) {
  const s = {
    imageSrc: options.imageSrc,
    width: Math.max(16, options.width ?? 200),
    rotate: toRadians(options.rotate ?? 0),
    peelDirection: toRadians(options.peelDirection ?? 0),
    hoverPeel: clamp(options.peelBackHoverPct ?? 25, 0, 100) / 100,
    activePeel: clamp(options.peelBackActivePct ?? 40, 0, 100) / 100,
    curlRadius: Math.max(2, options.curlRadius ?? 12),
    finish: FINISHES[options.finish ?? 'gloss'] ?? 0,
    backColor: options.backColor ?? '#d4d4d8',
    lighting: clamp(options.lightingIntensity ?? 0.5, 0, 1),
    shadow: clamp(options.shadowIntensity ?? 0.6, 0, 1),
    followPointer: options.followPointer ?? true,
    draggable: options.draggable ?? true,
    swing: clamp(options.swing ?? 1, 0, 3),
    friction: clamp(options.friction ?? 0.5, 0, 1),
    bounce: clamp(options.bounce ?? 0.35, 0, 1),
    intro: options.intro ?? true,
    initialPosition: options.initialPosition ?? { x: 0, y: 0 },
  };

  const root = document.createElement('div');
  root.className = 'peel';
  root.style.cssText = 'position:absolute;left:0;top:0;pointer-events:none;will-change:transform;z-index:4';
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'display:block;width:100%;height:100%;pointer-events:none;opacity:0';
  const hit = document.createElement('div');
  hit.className = 'peel__hit';
  hit.style.cssText =
    'position:absolute;left:50%;top:50%;pointer-events:auto;touch-action:none;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none';
  if (options.label) {
    hit.setAttribute('role', 'img');
    hit.setAttribute('aria-label', options.label);
  }
  root.append(canvas, hit);

  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: true, depth: true, stencil: false });
  if (!gl) return null;
  const program = link(gl, VERTEX, FRAGMENT);
  const post = link(gl, POST_VERTEX, POST_FRAGMENT);
  if (!program || !post) return null;
  parent.appendChild(root);

  const u = program.uniforms;
  const pu = post.uniforms;
  const view = { ratio: 1, size: 1, density: 0 };
  const targets: Target[] = [0, 1].map(() => {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return { texture, buffer: gl.createFramebuffer(), width: 0, height: 0 };
  });
  const sizeTargets = () => {
    const width = Math.max(1, Math.round(view.size / 2));
    targets.forEach((t) => {
      if (t.width === width && t.height === width) return;
      t.width = width;
      t.height = width;
      gl.bindTexture(gl.TEXTURE_2D, t.texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, width, width, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, t.buffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t.texture, 0);
    });
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  };

  const vertices = new Float32Array((GRID + 1) * (GRID + 1) * 2);
  for (let y = 0; y <= GRID; y++) {
    for (let x = 0; x <= GRID; x++) {
      const i = (y * (GRID + 1) + x) * 2;
      vertices[i] = x / GRID;
      vertices[i + 1] = y / GRID;
    }
  }
  const indices = new Uint16Array(GRID * GRID * 6);
  let cursor = 0;
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const a = y * (GRID + 1) + x;
      const b = a + 1;
      const c = a + GRID + 1;
      const d = c + 1;
      indices.set([a, b, d, a, d, c], cursor);
      cursor += 6;
    }
  }
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  const texture = gl.createTexture();
  const scratch = document.createElement('canvas');
  const scratchContext = scratch.getContext('2d', { willReadFrequently: true });
  const backRGB = (() => {
    const probe = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    if (!probe) return [0.83, 0.83, 0.85];
    probe.fillStyle = '#d4d4d8';
    probe.fillStyle = s.backColor;
    probe.fillRect(0, 0, 1, 1);
    const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
    return [r / 255, g / 255, b / 255];
  })();

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const sticker = {
    ready: false,
    aspect: 1,
    meshX: 1,
    meshY: 1,
    texel: 1,
    mask: null as Uint8Array | null,
    maskW: 1,
    maskH: 1,
    hull: [] as [number, number][],
  };
  const bounds = { width: 1, height: 1 };
  const state = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    placed: false,
    swing: 0,
    swingV: 0,
    peel: 0,
    peelV: 0,
    lift: 0,
    liftV: 0,
    dir: s.peelDirection,
    hover: false,
    local: { x: 0, y: 0 },
    press: null as Press | null,
    pivotV: { x: 0, y: 0 },
    light: { x: 0, y: 0, z: LIGHT_HEIGHT },
    pointer: { x: 0, y: 0, inside: false },
    intro: s.intro && !reduce ? 0 : 1,
  };
  if (state.intro < 1) {
    state.lift = 1.5;
    state.peel = 0.3;
    state.swing = 0.1;
    state.dir += 0.6;
  }
  let raf = 0;
  let last = 0;
  let visible = true;
  let alive = true;
  let resizePending = false;

  const height = () => s.width * sticker.aspect;

  const extentAlong = (dx: number, dy: number): [number, number] => {
    const w = s.width;
    const h = height();
    if (!sticker.hull.length) {
      const half = (Math.abs(dx) * w + Math.abs(dy) * h) / 2;
      return [-half, half];
    }
    let min = Infinity;
    let max = -Infinity;
    sticker.hull.forEach(([px, py]) => {
      const v = px * w * dx + py * h * dy;
      if (v < min) min = v;
      if (v > max) max = v;
    });
    return [min, max];
  };

  const load = (src: string) => {
    sticker.ready = false;
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      if (!alive || !scratchContext) return;
      const iw = image.naturalWidth || 1;
      const ih = image.naturalHeight || 1;
      const fit = Math.min(1, MAX_TEXTURE / (Math.max(iw, ih) * (1 + 2 * PAD)));
      const w = Math.max(1, Math.round(iw * fit));
      const h = Math.max(1, Math.round(ih * fit));
      const padX = Math.round(w * PAD);
      const padY = Math.round(h * PAD);
      scratch.width = w + padX * 2;
      scratch.height = h + padY * 2;
      scratchContext.clearRect(0, 0, scratch.width, scratch.height);
      scratchContext.drawImage(image, padX, padY, w, h);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, scratch);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      sticker.aspect = ih / iw;
      sticker.meshX = scratch.width / w;
      sticker.meshY = scratch.height / h;
      sticker.texel = scratch.width;
      const maskW = Math.max(8, Math.round(MASK_SIZE * Math.min(1, iw / ih)));
      const maskH = Math.max(8, Math.round(MASK_SIZE * Math.min(1, ih / iw)));
      scratch.width = maskW;
      scratch.height = maskH;
      scratchContext.clearRect(0, 0, maskW, maskH);
      scratchContext.drawImage(image, 0, 0, maskW, maskH);
      const pixels = scratchContext.getImageData(0, 0, maskW, maskH).data;
      const mask = new Uint8Array(maskW * maskH).fill(255);
      const queue: number[] = [];
      const visit = (x: number, y: number) => {
        const i = y * maskW + x;
        if (mask[i] === 0 || pixels[i * 4 + 3] > 100) return;
        mask[i] = 0;
        queue.push(i);
      };
      for (let x = 0; x < maskW; x++) {
        visit(x, 0);
        visit(x, maskH - 1);
      }
      for (let y = 0; y < maskH; y++) {
        visit(0, y);
        visit(maskW - 1, y);
      }
      while (queue.length) {
        const i = queue.pop() as number;
        const x = i % maskW;
        const y = (i - x) / maskW;
        if (x > 0) visit(x - 1, y);
        if (x < maskW - 1) visit(x + 1, y);
        if (y > 0) visit(x, y - 1);
        if (y < maskH - 1) visit(x, y + 1);
      }
      const points: [number, number][] = [];
      for (let y = 0; y < maskH; y++) {
        for (let x = 0; x < maskW; x++) {
          if (pixels[(y * maskW + x) * 4 + 3] > 127) points.push([(x + 0.5) / maskW - 0.5, (y + 0.5) / maskH - 0.5]);
        }
      }
      sticker.mask = mask;
      sticker.maskW = maskW;
      sticker.maskH = maskH;
      sticker.hull = convexHull(points);
      sticker.ready = true;
      options.onReady?.();
      layout();
      wake();
    };
    image.src = src;
  };

  const reach = () => {
    const angle = s.rotate + state.swing;
    const grow = 1 + 0.07 * Math.max(0, state.lift);
    const w = (s.width / 2) * grow;
    const h = (height() / 2) * grow;
    const c = Math.abs(Math.cos(angle));
    const sn = Math.abs(Math.sin(angle));
    return { x: w * c + h * sn, y: w * sn + h * c };
  };

  const confine = () => {
    const half = reach();
    const minX = Math.min(half.x, bounds.width / 2);
    const maxX = Math.max(bounds.width - half.x, bounds.width / 2);
    const minY = Math.min(half.y, bounds.height / 2);
    const maxY = Math.max(bounds.height - half.y, bounds.height / 2);
    if (state.x < minX) {
      state.x = minX;
      if (state.vx < 0) state.vx = -state.vx * s.bounce;
    } else if (state.x > maxX) {
      state.x = maxX;
      if (state.vx > 0) state.vx = -state.vx * s.bounce;
    }
    if (state.y < minY) {
      state.y = minY;
      if (state.vy < 0) state.vy = -state.vy * s.bounce;
    } else if (state.y > maxY) {
      state.y = maxY;
      if (state.vy > 0) state.vy = -state.vy * s.bounce;
    }
  };

  const applyLayout = () => {
    view.ratio = Math.min(window.devicePixelRatio || 1, 2);
    const prevW = bounds.width;
    const prevH = bounds.height;
    bounds.width = Math.max(1, parent.clientWidth);
    bounds.height = Math.max(1, parent.clientHeight);
    const h = height();
    const size = Math.ceil(Math.hypot(s.width, h) * 1.16 + 2 * (36 + s.curlRadius));
    if (size !== view.size || view.ratio !== view.density) {
      view.size = size;
      view.density = view.ratio;
      root.style.width = `${size}px`;
      root.style.height = `${size}px`;
      canvas.width = Math.round(size * view.ratio);
      canvas.height = Math.round(size * view.ratio);
    }
    hit.style.width = `${s.width}px`;
    hit.style.height = `${h}px`;
    if (!state.placed) {
      const start = s.initialPosition;
      state.x = bounds.width / 2 + start.x;
      state.y = bounds.height / 2 + start.y;
      state.light = { x: state.x - s.width * 0.45, y: state.y - h * 0.9, z: LIGHT_HEIGHT * 1.6 };
      state.placed = true;
    } else if (prevW > 1 && (prevW !== bounds.width || prevH !== bounds.height)) {
      // keep the sticker at the same relative spot when the card resizes
      state.x *= bounds.width / prevW;
      state.y *= bounds.height / prevH;
    }
    confine();
  };

  const layout = () => {
    resizePending = true;
    wake();
  };

  const toParent = (e: PointerEvent): Point => {
    const rect = parent.getBoundingClientRect();
    return { x: e.clientX - rect.left - parent.clientLeft, y: e.clientY - rect.top - parent.clientTop };
  };

  const toLocal = (p: Point): Point => {
    const angle = -(s.rotate + state.swing);
    const scale = 1 + 0.07 * Math.max(0, state.lift);
    const dx = p.x - state.x;
    const dy = p.y - state.y;
    return {
      x: (Math.cos(angle) * dx - Math.sin(angle) * dy) / scale,
      y: (Math.sin(angle) * dx + Math.cos(angle) * dy) / scale,
    };
  };

  const solid = (local: Point) => {
    if (!sticker.mask) return false;
    const mx = Math.floor((local.x / s.width + 0.5) * sticker.maskW);
    const my = Math.floor((local.y / height() + 0.5) * sticker.maskH);
    if (mx < 0 || my < 0 || mx >= sticker.maskW || my >= sticker.maskH) return false;
    return sticker.mask[my * sticker.maskW + mx] > 100;
  };

  const draw = () => {
    const size = view.size;
    root.style.transform = `translate3d(${state.x - size / 2}px, ${state.y - size / 2}px, 0)`;
    const angle = s.rotate + state.swing;
    const scale = 1 + 0.07 * Math.max(0, state.lift);
    hit.style.transform = `translate(-50%, -50%) rotate(${angle}rad) scale(${scale})`;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clearDepth(1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if (!sticker.ready) return;
    const w = s.width;
    const h = height();
    const dx = -Math.sin(state.dir);
    const dy = Math.cos(state.dir);
    const [start, end] = extentAlong(dx, dy);
    const peel = clamp(state.peel, 0, 1);
    const fold = start + peel * (end - start);
    const lift = Math.max(0, state.lift);
    const center = size / 2;
    const count = GRID * GRID * 6;
    const peeled = peel > 0.001;
    gl.useProgram(program.program);
    gl.bindVertexArray(vao);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(u.uImage, 0);
    gl.uniform2f(u.uCanvas, size, size);
    gl.uniform2f(u.uMesh, w * sticker.meshX, h * sticker.meshY);
    gl.uniform2f(u.uCenter, center, center);
    gl.uniform2f(u.uDir, dx, dy);
    gl.uniform1f(u.uFold, fold);
    gl.uniform1f(u.uRadius, s.curlRadius);
    gl.uniform1f(u.uAngle, angle);
    gl.uniform1f(u.uScale, scale);
    gl.uniform1f(u.uLift, lift * 26);
    gl.uniform2f(u.uShadowOffset, 1.2, 2.4);
    gl.uniform2f(u.uShadowSlope, 0.28, 0.55);
    gl.uniform1i(u.uFinish, s.finish);
    gl.uniform3fv(u.uBack, backRGB);
    gl.uniform3f(u.uLight, state.light.x - (state.x - center), state.light.y - (state.y - center), state.light.z);
    gl.uniform1f(u.uShine, s.lighting);
    gl.uniform1f(u.uShadow, s.shadow * 0.55);
    gl.uniform1f(u.uTexel, sticker.texel / (w * sticker.meshX));
    gl.uniform1f(u.uLod, Math.max(0, Math.log2(sticker.texel / (w * sticker.meshX * scale * view.ratio))));
    const glint = toLocal(state.light);
    gl.uniform2f(u.uGlint, glint.x / (w * sticker.meshX) + 0.5, glint.y / (h * sticker.meshY) + 0.5);
    gl.disable(gl.DEPTH_TEST);
    if (peeled) {
      sizeTargets();
      const [first, second] = targets;
      gl.bindFramebuffer(gl.FRAMEBUFFER, first.buffer);
      gl.viewport(0, 0, first.width, first.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.disable(gl.BLEND);
      gl.uniform1i(u.uPass, 2);
      gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
      gl.useProgram(post.program);
      gl.uniform1i(pu.uSource, 1);
      gl.uniform1i(pu.uMode, 0);
      gl.uniform1f(pu.uSigma, Math.min(4, (2.5 + s.curlRadius * 0.15) / 2));
      gl.activeTexture(gl.TEXTURE1);
      gl.bindFramebuffer(gl.FRAMEBUFFER, second.buffer);
      gl.bindTexture(gl.TEXTURE_2D, first.texture);
      gl.uniform2f(pu.uStep, 1 / first.width, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.bindFramebuffer(gl.FRAMEBUFFER, first.buffer);
      gl.bindTexture(gl.TEXTURE_2D, second.texture);
      gl.uniform2f(pu.uStep, 0, 1 / first.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program.program);
      gl.activeTexture(gl.TEXTURE0);
    }
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniform1i(u.uPass, 0);
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
    gl.uniform1i(u.uPass, 1);
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
    if (peeled) {
      gl.useProgram(post.program);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, targets[0].texture);
      gl.uniform1i(pu.uMode, 1);
      gl.uniform1f(pu.uStrength, s.shadow * 0.6);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.useProgram(program.program);
      gl.activeTexture(gl.TEXTURE0);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LESS);
      gl.uniform1i(u.uPass, 3);
      gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
      gl.disable(gl.DEPTH_TEST);
    }
  };

  const frame = (now: number) => {
    raf = 0;
    if (resizePending) {
      resizePending = false;
      applyLayout();
    }
    if (!visible || document.hidden) return;
    const dt = last ? clamp((now - last) / 1000, 0.001, 1 / 30) : 1 / 60;
    last = now;
    const h = height();
    if (state.intro < 1 && sticker.ready) state.intro = Math.min(1, state.intro + dt / 1.1);
    const press = state.press;
    const drag = press && press.moving ? press : null;
    if (drag) {
      const target = drag.pointer;
      const prev = drag.pivot;
      const smoothing = 1 - Math.exp(-dt / 0.045);
      const vx = state.pivotV.x + ((target.x - prev.x) / dt - state.pivotV.x) * smoothing;
      const vy = state.pivotV.y + ((target.y - prev.y) / dt - state.pivotV.y) * smoothing;
      const ax = (vx - state.pivotV.x) / dt;
      const ay = (vy - state.pivotV.y) / dt;
      state.pivotV.x = vx;
      state.pivotV.y = vy;
      drag.pivot = { x: target.x, y: target.y };
      const angle = s.rotate + state.swing;
      const rx = -(Math.cos(angle) * drag.grab.x - Math.sin(angle) * drag.grab.y);
      const ry = -(Math.sin(angle) * drag.grab.x + Math.cos(angle) * drag.grab.y);
      const inertia = (s.width * s.width + h * h) / 12 + rx * rx + ry * ry;
      const torque = (rx * -clamp(ay, -24000, 24000) - ry * -clamp(ax, -24000, 24000)) / inertia;
      const omega = 2 * Math.PI * 1.5;
      state.swingV += (torque * 1.1 * s.swing - omega * omega * state.swing - 2 * 0.45 * omega * state.swingV) * dt;
      state.swing = clamp(state.swing + state.swingV * dt, -1.2, 1.2);
      const turned = s.rotate + state.swing;
      const grip = 1 + 0.07 * Math.max(0, state.lift);
      state.x = target.x - (Math.cos(turned) * drag.grab.x - Math.sin(turned) * drag.grab.y) * grip;
      state.y = target.y - (Math.sin(turned) * drag.grab.x + Math.cos(turned) * drag.grab.y) * grip;
      confine();
    } else {
      spring(state, 'swing', 0, 1.4, 0.32, dt);
      const decay = Math.exp(-dt * (1.5 + 9 * s.friction));
      state.vx *= decay;
      state.vy *= decay;
      if (Math.hypot(state.vx, state.vy) < 4) {
        state.vx = 0;
        state.vy = 0;
      }
      state.x += state.vx * dt;
      state.y += state.vy * dt;
      confine();
    }
    const introHold = state.intro < 0.2;
    const peelTarget = introHold ? 0.3 : press ? s.activePeel : state.hover ? s.hoverPeel : 0;
    spring(state, 'peel', peelTarget, press || state.hover ? 3 : 3.6, press || state.hover ? 0.7 : 0.62, dt);
    spring(state, 'lift', drag ? 1 : 0, 3.2, 0.55, dt);
    let dirTarget = s.peelDirection;
    if (press && Math.hypot(press.grab.x, press.grab.y) > Math.min(s.width, h) * 0.12) {
      dirTarget = Math.atan2(press.grab.x, -press.grab.y);
    } else if (s.followPointer && state.hover && Math.hypot(state.local.x, state.local.y) > Math.min(s.width, h) * 0.12) {
      dirTarget = Math.atan2(state.local.x, -state.local.y);
    }
    if (!introHold) state.dir += wrapAngle(dirTarget - state.dir) * (1 - Math.exp(-dt / 0.12));
    const lightTarget = state.pointer.inside
      ? { x: state.pointer.x, y: state.pointer.y, z: LIGHT_HEIGHT }
      : { x: state.x - s.width * 0.45, y: state.y - h * 0.9, z: LIGHT_HEIGHT * 1.6 };
    const follow = 1 - Math.exp(-dt / 0.08);
    state.light.x += (lightTarget.x - state.light.x) * follow;
    state.light.y += (lightTarget.y - state.light.y) * follow;
    state.light.z += (lightTarget.z - state.light.z) * follow;
    canvas.style.opacity = String(clamp(state.intro / 0.12, 0, 1));
    draw();
    const moving =
      (state.intro < 1 && sticker.ready) ||
      !!press ||
      Math.abs(state.peel - peelTarget) > 0.0005 ||
      Math.abs(state.peelV) > 0.0005 ||
      Math.abs(state.lift - (drag ? 1 : 0)) > 0.0005 ||
      Math.abs(state.liftV) > 0.0005 ||
      Math.abs(state.swing) > 0.0005 ||
      Math.abs(state.swingV) > 0.0005 ||
      state.vx !== 0 ||
      state.vy !== 0 ||
      Math.abs(wrapAngle(dirTarget - state.dir)) > 0.002 ||
      Math.hypot(lightTarget.x - state.light.x, lightTarget.y - state.light.y, lightTarget.z - state.light.z) > 0.5;
    if (moving) raf = requestAnimationFrame(frame);
    else last = 0;
  };

  function wake() {
    if (!raf && visible && !document.hidden && alive) raf = requestAnimationFrame(frame);
  }

  const updateHover = (e: PointerEvent) => {
    state.local = toLocal(toParent(e));
    const over = solid(state.local);
    if (over !== state.hover) state.hover = over;
    hit.style.cursor = over && s.draggable ? (state.press ? 'grabbing' : 'grab') : '';
  };

  const onPointerMove = (e: PointerEvent) => {
    const p = toParent(e);
    const was = state.pointer.inside;
    state.pointer.x = p.x;
    state.pointer.y = p.y;
    state.pointer.inside = p.x >= 0 && p.y >= 0 && p.x <= bounds.width && p.y <= bounds.height;
    // only animate while the pointer is around this card (keeps idle stickers at 0 fps)
    if (state.pointer.inside || was || state.press) wake();
  };

  const onHitMove = (e: PointerEvent) => {
    const press = state.press;
    if (!press) {
      updateHover(e);
    } else if (press.id === e.pointerId) {
      const p = toParent(e);
      press.pointer = p;
      if (!press.moving && Math.hypot(p.x - press.origin.x, p.y - press.origin.y) > 3) press.moving = s.draggable;
      press.samples.push({ x: p.x, y: p.y, t: performance.now() });
      if (press.samples.length > 8) press.samples.shift();
    }
    wake();
  };

  const onHitLeave = () => {
    if (state.press) return;
    state.hover = false;
    hit.style.cursor = '';
    wake();
  };

  const onHitDown = (e: PointerEvent) => {
    if (e.button !== 0 || !sticker.ready) return;
    updateHover(e);
    if (!state.hover) return;
    const p = toParent(e);
    state.press = { id: e.pointerId, grab: toLocal(p), origin: p, pointer: p, pivot: p, moving: false, samples: [] };
    state.pivotV = { x: 0, y: 0 };
    state.vx = 0;
    state.vy = 0;
    hit.setPointerCapture?.(e.pointerId);
    if (s.draggable) {
      hit.style.cursor = 'grabbing';
      stack += 1;
      root.style.zIndex = String(stack);
    }
    e.preventDefault();
    wake();
  };

  const onHitUp = (e: PointerEvent) => {
    const press = state.press;
    if (!press || press.id !== e.pointerId) return;
    state.press = null;
    if (hit.hasPointerCapture?.(e.pointerId)) hit.releasePointerCapture(e.pointerId);
    const now = performance.now();
    const recent = press.samples.filter((p) => now - p.t < 90);
    if (press.moving && recent.length > 1 && !reduce) {
      const a = recent[0];
      const b = recent[recent.length - 1];
      const span = Math.max(b.t - a.t, 16) / 1000;
      const speed = 2600;
      state.vx = clamp((b.x - a.x) / span, -speed, speed);
      state.vy = clamp((b.y - a.y) / span, -speed, speed);
    }
    updateHover(e);
    if (e.pointerType !== 'mouse') state.hover = false;
    wake();
  };

  const onLeaveWindow = () => {
    state.pointer.inside = false;
    wake();
  };
  const onVisibility = () => {
    last = 0;
    wake();
  };

  const resizeObserver = new ResizeObserver(layout);
  resizeObserver.observe(parent);
  const intersection = new IntersectionObserver((entries) => {
    visible = entries.some((en) => en.isIntersecting);
    if (visible) {
      last = 0;
      wake();
    }
  });
  intersection.observe(parent);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeaveWindow);
  document.addEventListener('visibilitychange', onVisibility);
  hit.addEventListener('pointermove', onHitMove);
  hit.addEventListener('pointerleave', onHitLeave);
  hit.addEventListener('pointerdown', onHitDown);
  hit.addEventListener('pointerup', onHitUp);
  hit.addEventListener('pointercancel', onHitUp);
  load(s.imageSrc);
  layout();
  wake();

  return {
    /** Change the sticker size (e.g. on resize). */
    setWidth(width: number) {
      if (Math.abs(width - s.width) < 1) return;
      s.width = Math.max(16, width);
      layout();
    },
    destroy() {
      alive = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onLeaveWindow);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteTexture(texture);
      targets.forEach((t) => {
        gl.deleteTexture(t.texture);
        gl.deleteFramebuffer(t.buffer);
      });
      gl.deleteProgram(post.program);
      gl.deleteBuffer(vertexBuffer);
      gl.deleteBuffer(indexBuffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program.program);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      root.remove();
    },
  };
}
