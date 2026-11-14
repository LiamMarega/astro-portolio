import type { LeadFormConfig } from '../lib/forms';

/**
 * ─────────────────────────────────────────────────────────────────────
 *  ALL THE CONTENT OF THE LANDING LIVES HERE.
 *  (The /ecommerce sales page has its own file: src/content/ecommerce.ts)
 *  Swap names, copy, links and images and the whole page follows.
 *  Images live in /public/img — replace them with your own (same names,
 *  or point the paths below to new files). WebP/JPG/PNG/SVG all work.
 * ─────────────────────────────────────────────────────────────────────
 */

/** Multi-step form of the /contact page (main site, English). */
const contactForm: LeadFormConfig = {
  source: 'contact',
  lang: 'en',
  steps: [
    {
      title: 'What can I help you with?',
      hint: 'Pick all that apply.',
      fields: [
        {
          kind: 'choice',
          name: 'services',
          label: 'Services',
          multiple: true,
          required: true,
          options: [
            { label: 'Brand identity', icon: 'Sparkles' },
            { label: 'Website', icon: 'Globe' },
            { label: 'Product / UI design', icon: 'MousePointer2' },
            { label: 'E-commerce store', icon: 'ShoppingBag' },
            { label: 'Something else', icon: 'MessageCircle' },
          ],
        },
      ],
    },
    {
      title: 'Tell me a bit more',
      fields: [
        {
          kind: 'textarea',
          name: 'project',
          label: 'What are you building and what should it achieve?',
          placeholder: 'A few lines are perfect.',
          required: true,
          rows: 4,
          maxlength: 3000,
        },
        {
          kind: 'choice',
          name: 'budget',
          label: 'Budget',
          look: 'chips',
          required: true,
          options: [{ label: 'Under $5k' }, { label: '$5k – 10k' }, { label: '$10k – 25k' }, { label: '$25k+' }, { label: 'Not sure yet' }],
        },
        {
          kind: 'choice',
          name: 'timeline',
          label: 'Ideal launch',
          look: 'chips',
          options: [{ label: 'As soon as possible' }, { label: 'In 1–3 months' }, { label: 'Flexible' }],
        },
      ],
    },
    {
      title: 'Where can I reach you?',
      fields: [
        { kind: 'text', name: 'name', label: 'Your name', autocomplete: 'name', required: true, half: true, maxlength: 120 },
        { kind: 'email', name: 'email', label: 'Email', autocomplete: 'email', required: true, half: true, maxlength: 160 },
        { kind: 'url', name: 'website', label: 'Company or website', placeholder: 'yourbrand.com', autocomplete: 'url', maxlength: 200 },
      ],
    },
  ],
  text: {
    step: 'Step {n} of {total}',
    next: 'Next',
    back: 'Back',
    submit: 'Send message',
    sending: 'Sending…',
    optional: 'optional',
    errors: {
      required: 'This one is needed.',
      choose: 'Pick at least one option.',
      email: 'That email doesn’t look right.',
      url: 'That link doesn’t look right.',
    },
    privacy: 'Your details are only used to reply to you. No newsletters, no spam.',
    success: {
      title: 'Thanks, {name}!',
      body: 'Your message is in. I’ll get back to you at {email} within one business day.',
      steps: ['I read your answers', 'I email you to book a call', 'You get a fixed-price proposal'],
    },
    error: {
      title: 'That didn’t go through',
      body: 'Something failed on my side. Send it by email instead: your answers are already written in.',
      mail: 'Send it by email',
      retry: 'Try again',
      subject: 'New project',
      intro: 'Hi! Here are my answers from the contact form:',
    },
  },
};

export const site = {
  /** Shown giant in the hero. Every letter gets its own hover sticker. */
  name: 'Leo Solari',
  /** Used for <title>, OG tags and the signature tag in the Story section. */
  title: 'Leo Solari — Independent product & brand designer',
  description:
    'Independent product and brand designer shaping bright, confident brands and websites for SaaS and AI startups.',
  url: 'https://www.liammarega.com',
  email: 'hello@example.com',
  lang: 'en',

  nav: [
    { id: 'hey', label: 'Hey' },
    { id: 'work', label: 'Work' },
    { id: 'story', label: 'Story' },
    { id: 'chat', label: 'Chat' },
  ],
  /** Label of the yellow button shown in the nav while a case study is open. */
  ctaLabel: 'Start new project',

  hero: {
    // Two lines on desktop. Wrap a phrase in [[ ]] to keep it together.
    taglineLines: ['Hi! I’m an independent product designer', 'shaping bright brands for SaaS and AI.'],
  },

  work: {
    note: 'since 2019, still going',
    title: 'My latest work',
  },

  story: {
    title: ['Sketchbooks, skateboards', 'and a lot of sunshine'],
    bio: [
      'Growing up by the coast, my path into design began with sketchbooks and skate graphics =) Street posters taught me storytelling, a degree in industrial design gave me structure, and digital products opened a whole new playground.',
      'These days I work from a sunny little studio, crafting web and brand experiences for tech teams who want to stand out.',
    ],
    mission: [
      'I team up with ambitious founders building what’s next, from fresh startups to global companies and indie makers.',
      'My goal: to design clear, consistent and confident brands for SaaS and AI products that earn trust, spark engagement and help businesses grow — a standard others want to follow.',
    ],
    tags: [
      { label: 'branding', icon: 'sparkle', tone: 'blue' },
      { label: 'interface', icon: 'cursor', tone: 'mint' },
      { label: 'website', icon: 'globe', tone: 'lime' },
      { label: 'animation', icon: 'bolt', tone: 'violet' },
      { label: 'illustration', icon: 'pen', tone: 'orange' },
    ],
  },

  gallery: {
    title: ['Little experiments,', 'big curiosity'],
    note: 'to sharpen my craft or just for fun',
  },

  chat: {
    note: ['Press this ‘humble’ button to', 'make your next launch shine =)'],
    button: 'Connect',
    /** every contact button goes to the form page */
    href: '/contact',
  },

  /**
   * Where the lead forms POST their answers (JSON).
   * Leave it empty until your endpoint is live:
   *  · in `npm run dev` / `npm run preview` (localhost) the form simulates a successful send
   *    and prints the payload in the browser console;
   *  · on a real domain it shows a fallback that opens the visitor's email app with every
   *    answer already written, so no lead gets lost.
   * Once Resend is connected set it to '/api/contact' (README → "Conectar Resend").
   */
  leadEndpoint: '',

  /* ───────────── /contact page ───────────── */
  contact: {
    title: 'Start a project — Leo Solari',
    description: 'Tell me about your brand, website or product. I reply within one business day.',
    note: 'three quick steps =)',
    heading: ['Let’s make your next', 'launch shine'],
    intro: 'A few questions so I can come back with something useful instead of a generic reply. I read every message myself.',
    nextTitle: 'What happens next',
    next: [
      'I read your answers and look at what you have today.',
      'Within one business day I email you to book a 30-minute call.',
      'You get a clear proposal: scope, timeline and a fixed price.',
    ],
    direct: 'Rather write an email?',
    form: contactForm,
  },

  socials: [
    { id: 'x', label: 'Thoughts', href: 'https://x.com/', name: 'X (Twitter)' },
    { id: 'dribbble', label: 'Shots', href: 'https://dribbble.com/', name: 'Dribbble' },
    { id: 'instagram', label: 'Life', href: 'https://instagram.com/', name: 'Instagram' },
    { id: 'linkedin', label: 'Career', href: 'https://linkedin.com/', name: 'LinkedIn' },
  ],
} as const;

/* ───────────────────────────── Projects ───────────────────────────── */

export type LogoId = 'leaf' | 'bolt' | 'rings' | 'loop' | 'spark' | 'shield' | 'bean' | 'sprout' | 'pulse' | 'house' | 'sun';

export interface MediaItem {
  src: string;
  alt: string;
  /** natural size of the image (used for aspect ratio) */
  w: number;
  h: number;
  /** placement inside the card media strip (desktop), % of the strip width */
  left: number;
  width: number;
  /** px offset from the top of the media strip at 1466px viewport (scales with vw) */
  top: number;
  rotate: number;
  /** hover pose */
  hover?: { x?: number; y?: number; rotate?: number; scale?: number };
}

export interface Project {
  slug: string;
  name: string;
  logo: LogoId;
  summary: string;
  credit?: string;
  palette: { name: string; color: string; ink: string }[];
  caseStudy: {
    intro: string[];
    tags: string[];
  };
  media: MediaItem[];
  /** Big hero visual shown at the top of the case study gallery. */
  cover: { src: string; alt: string; w: number; h: number };
  /** Lucide icon names (https://lucide.dev/icons) shown in the case study icon grid. */
  icons: string[];
}

export const projects: Project[] = [
  {
    slug: 'verdant',
    name: 'Verdant',
    logo: 'leaf',
    summary:
      'Rethinking a business banking platform with a calm, premium look built for modern finance teams.',
    palette: [
      { name: 'Paper white', color: '#f7f6f1', ink: '#111' },
      { name: 'Harvest gold', color: '#e3d89a', ink: '#111' },
      { name: 'Forest green', color: '#123d33', ink: '#f3f0dc' },
      { name: 'Night black', color: '#0b1512', ink: '#f3f0dc' },
    ],
    caseStudy: {
      intro: [
        'Verdant, a fast-growing fintech for small businesses, wanted a brand that felt as solid as a bank and as friendly as a modern app. Their founders asked for a look that could win over finance teams without feeling cold.',
        'We started from a strong brand foundation, refined their symbol and built a calm visual language around deep greens and soft gold. After two rounds of exploration the team had a confident, premium identity, followed by a new marketing website.',
        'Today Verdant looks ready for bigger customers — and the new site turns visitors into accounts at almost twice the previous rate.',
      ],
      tags: ['ui/ux research', 'design system', 'brand identity', 'web design', 'product design', 'mobile design', 'illustrations', 'art direction'],
    },
    media: [
      {
        src: '/img/work/verdant-card.webp',
        alt: 'Verdant brand card with gold stripes on deep green',
        w: 848,
        h: 1120,
        left: 0,
        width: 37.4,
        top: 46,
        rotate: -2,
        hover: { x: -12, y: -78, rotate: -4.4, scale: 1.07 },
      },
      {
        src: '/img/work/verdant-site.webp',
        alt: 'Verdant website on a laptop in a warm, dimly lit room',
        w: 1430,
        h: 960,
        left: 38.1,
        width: 63,
        top: 13,
        rotate: 1.2,
        hover: { x: 10, y: -44, rotate: 3.2, scale: 1.03 },
      },
    ],
    cover: { src: '/img/work/verdant-wide.webp', alt: 'Verdant dashboard overview', w: 2400, h: 1360 },
    icons: ['Landmark', 'Wallet', 'CreditCard', 'Receipt', 'PiggyBank', 'ChartNoAxesColumn', 'ShieldCheck', 'ArrowLeftRight', 'Building2', 'BadgeDollarSign', 'Calculator', 'FileCheck2'],
  },
  {
    slug: 'spark',
    name: 'Spark',
    logo: 'bolt',
    summary: 'Bold new identity for a growth marketing studio helping online stores keep their customers.',
    palette: [
      { name: 'Midnight', color: '#14123a', ink: '#fff' },
      { name: 'Electric violet', color: '#7b4dff', ink: '#fff' },
      { name: 'Sunset', color: '#ff9a3d', ink: '#111' },
      { name: 'Cloud', color: '#f1eee6', ink: '#111' },
    ],
    caseStudy: {
      intro: [
        'Spark is a full-cycle growth studio that helps e-commerce brands turn first-time buyers into loyal fans. They had outgrown their template look and needed something with real energy.',
        'I designed a vibrant identity around a lightning mark and a sunrise gradient, then extended it into an illustration system, social templates and a fast new website.',
        'The rebrand gave the team a voice as loud as their results, and their pitch-to-win rate went up within the first quarter.',
      ],
      tags: ['brand identity', 'logo design', 'illustrations', 'web design', 'social templates', 'motion'],
    },
    media: [
      {
        src: '/img/work/spark-brand.webp',
        alt: 'Spark logo on a violet to orange gradient',
        w: 1424,
        h: 900,
        left: 0,
        width: 62.7,
        top: 0,
        rotate: -0.6,
        hover: { x: -10, y: -60, rotate: -2.6, scale: 1.04 },
      },
      {
        src: '/img/work/spark-illo.webp',
        alt: 'Isometric laptop with floating envelopes',
        w: 848,
        h: 820,
        left: 63.1,
        width: 37.4,
        top: 22,
        rotate: 1.4,
        hover: { x: 12, y: -70, rotate: 4.2, scale: 1.06 },
      },
    ],
    cover: { src: '/img/work/spark-wide.webp', alt: 'Spark website hero', w: 2400, h: 1360 },
    icons: ['Zap', 'Mail', 'Megaphone', 'Target', 'ShoppingBag', 'Rocket', 'Heart', 'ChartLine', 'Users', 'Gift', 'Send', 'Sparkles'],
  },
  {
    slug: 'nimbus',
    name: 'Nimbus',
    logo: 'rings',
    summary: 'A trustworthy digital presence and marketing site for a privacy-first crypto savings app.',
    palette: [
      { name: 'Deep space', color: '#0b1030', ink: '#fff' },
      { name: 'Signal blue', color: '#3a5bff', ink: '#fff' },
      { name: 'Glow', color: '#a9b8ff', ink: '#111' },
      { name: 'Frost', color: '#eef1fb', ink: '#111' },
    ],
    caseStudy: {
      intro: [
        'Nimbus lets people earn, borrow and save in crypto without giving up their privacy. Their old site looked like every other exchange, and trust was the number one blocker for new users.',
        'I rebuilt their visual direction around calm blues, honest numbers and clear product shots, then designed and shipped a modular marketing site the team can grow on their own.',
        'Sign-ups grew steadily after launch, and Nimbus now has a look that matches the security of its product.',
      ],
      tags: ['web design', 'art direction', 'product marketing', 'design system', 'mobile design'],
    },
    media: [
      {
        src: '/img/work/nimbus-phone.webp',
        alt: 'Nimbus app showing an interest account',
        w: 848,
        h: 900,
        left: 0,
        width: 37.4,
        top: 30,
        rotate: -1.6,
        hover: { x: -12, y: -74, rotate: -4, scale: 1.06 },
      },
      {
        src: '/img/work/nimbus-tablet.webp',
        alt: 'Nimbus website on a tablet held in two hands',
        w: 1430,
        h: 900,
        left: 38.1,
        width: 63,
        top: 4,
        rotate: 1.4,
        hover: { x: 10, y: -46, rotate: 3.4, scale: 1.03 },
      },
    ],
    cover: { src: '/img/work/nimbus-wide.webp', alt: 'Nimbus landing page', w: 2400, h: 1360 },
    icons: ['Bitcoin', 'Lock', 'KeyRound', 'Coins', 'Fingerprint', 'ChartCandlestick', 'ShieldCheck', 'Wallet', 'Globe', 'RefreshCw', 'Eye', 'Vault'],
  },
  {
    slug: 'loop',
    name: 'Loop Rewards',
    logo: 'loop',
    summary:
      'Brand sprint with a logo and playful 3D illustrations for a cashback app that pays shoppers back on every purchase.',
    palette: [
      { name: 'Lilac', color: '#e9e3ff', ink: '#111' },
      { name: 'Ink', color: '#14121c', ink: '#fff' },
      { name: 'Lemon', color: '#f6f08a', ink: '#111' },
      { name: 'Grape', color: '#7a4dff', ink: '#fff' },
    ],
    caseStudy: {
      intro: [
        'Loop Rewards gives people cash back from hundreds of stores. In a crowded market they needed a mark people would remember after a single scroll.',
        'In a two-week brand sprint I explored three directions, landed a looping logo that reads as a coin and an arrow, and created a set of playful 3D illustrations for the app and campaigns.',
        'The new identity launched with the app store release and became the face of every Loop campaign since.',
      ],
      tags: ['brand sprint', 'logo design', '3d illustrations', 'app icons', 'campaigns'],
    },
    media: [
      {
        src: '/img/work/loop-logo.webp',
        alt: 'Loop Rewards logo with floating coins',
        w: 1200,
        h: 840,
        left: 0,
        width: 61,
        top: 18,
        rotate: -1.2,
        hover: { x: -10, y: -60, rotate: -3, scale: 1.04 },
      },
      {
        src: '/img/work/loop-3d.webp',
        alt: 'Playful 3D gift box illustration',
        w: 848,
        h: 820,
        left: 61.5,
        width: 39,
        top: 6,
        rotate: 1.8,
        hover: { x: 12, y: -70, rotate: 4.6, scale: 1.06 },
      },
    ],
    cover: { src: '/img/work/loop-wide.webp', alt: 'Loop Rewards app screens', w: 2400, h: 1360 },
    icons: ['Gift', 'Coins', 'RefreshCcw', 'ShoppingCart', 'Star', 'Tag', 'Percent', 'Trophy', 'Store', 'Smile', 'Sparkles', 'CreditCard'],
  },
  {
    slug: 'mindly',
    name: 'Mindly',
    logo: 'spark',
    summary:
      'Visualizing a thinker’s journey for an AI note-taking tool across a new website, mobile app and browser extension.',
    palette: [
      { name: 'Carbon', color: '#0d0f0e', ink: '#fff' },
      { name: 'Aurora', color: '#3ddc84', ink: '#111' },
      { name: 'Moss', color: '#1d3b2c', ink: '#fff' },
      { name: 'Mist', color: '#eef3ef', ink: '#111' },
    ],
    caseStudy: {
      intro: [
        'Mindly remembers everything your team writes and turns it into answers. The challenge: make an invisible AI feel tangible and calm.',
        'I created a dark, focused interface with soft aurora greens, designed the extension and mobile flows and built a website that shows the product thinking alongside you.',
        'The launch hit the top of Product Hunt on day one and the brand has scaled into every new feature since.',
      ],
      tags: ['product design', 'web design', 'browser extension', 'mobile app', 'design system'],
    },
    media: [
      {
        src: '/img/work/mindly-app.webp',
        alt: 'Mindly dark app interface with floating controls',
        w: 848,
        h: 700,
        left: 0,
        width: 37.4,
        top: 26,
        rotate: -1.4,
        hover: { x: -12, y: -70, rotate: -3.6, scale: 1.06 },
      },
      {
        src: '/img/work/mindly-site.webp',
        alt: 'Mindly website with an aurora glow',
        w: 1430,
        h: 860,
        left: 38.1,
        width: 63,
        top: 12,
        rotate: 1,
        hover: { x: 10, y: -46, rotate: 3, scale: 1.03 },
      },
    ],
    cover: { src: '/img/work/mindly-wide.webp', alt: 'Mindly product overview', w: 2400, h: 1360 },
    icons: ['Brain', 'NotebookPen', 'MessageSquare', 'Search', 'Lightbulb', 'Bot', 'Bookmark', 'Layers', 'Clock', 'Puzzle', 'Share2', 'Sparkles'],
  },
  {
    slug: 'fortline',
    name: 'Fortline',
    logo: 'shield',
    summary:
      'Designing a new website style and an illustration set for a security platform that protects fast-growing teams.',
    credit: 'made together with the Northstar crew',
    palette: [
      { name: 'Obsidian', color: '#09090c', ink: '#fff' },
      { name: 'Bubblegum', color: '#ff8de8', ink: '#111' },
      { name: 'Volt blue', color: '#2f4dff', ink: '#fff' },
      { name: 'Chalk', color: '#f4f4f6', ink: '#111' },
    ],
    caseStudy: {
      intro: [
        'Fortline finds vulnerabilities before attackers do. Their audience is technical and skeptical, so the brand had to be sharp, bold and never generic.',
        'Together with the Northstar crew we designed a new website language with high-contrast pink and blue accents, plus an illustration set that explains complex attacks in seconds.',
        'The new site doubled average time on page and gave sales a story they can tell in one scroll.',
      ],
      tags: ['web design', 'illustrations', 'art direction', 'motion', 'design system'],
    },
    media: [
      {
        src: '/img/work/fortline-laptop.webp',
        alt: 'Fortline website on a laptop',
        w: 1424,
        h: 900,
        left: 0,
        width: 62.6,
        top: 2,
        rotate: -1.2,
        hover: { x: -8, y: -56, rotate: -3, scale: 1.04 },
      },
      {
        src: '/img/work/fortline-card.webp',
        alt: 'Fortline continuous protection card',
        w: 560,
        h: 600,
        left: 63.2,
        width: 24.6,
        top: 26,
        rotate: 1.6,
        hover: { x: 6, y: -72, rotate: 4.4, scale: 1.06 },
      },
      {
        src: '/img/work/fortline-mini.webp',
        alt: 'Fortline cost-effective plan card',
        w: 300,
        h: 600,
        left: 88.4,
        width: 13,
        top: 10,
        rotate: 2.4,
        hover: { x: 12, y: -40, rotate: 6, scale: 1.05 },
      },
    ],
    cover: { src: '/img/work/fortline-wide.webp', alt: 'Fortline landing page', w: 2400, h: 1360 },
    icons: ['Shield', 'Bug', 'Radar', 'ScanSearch', 'Lock', 'Siren', 'ServerCog', 'Fingerprint', 'TriangleAlert', 'Activity', 'Network', 'CircleCheck'],
  },
];

/* ───────────────────────────── Story polaroids ───────────────────────────── */

export type DoodleId =
  | 'plane'
  | 'sparkles'
  | 'heart'
  | 'sun'
  | 'birds'
  | 'spray'
  | 'yo'
  | 'paw'
  | 'burst'
  | 'mountain'
  | 'moon'
  | 'coffee';

export const polaroids: { src: string; alt: string; caption: string; doodles: [DoodleId, DoodleId] }[] = [
  { src: '/img/story/hikes.webp', alt: 'Mountain trail at sunrise', caption: 'Sunday hikes, no wifi', doodles: ['plane', 'mountain'] },
  { src: '/img/story/studio.webp', alt: 'Sunny desk with a sketchbook and coffee', caption: 'My little studio', doodles: ['sparkles', 'heart'] },
  { src: '/img/story/coast.webp', alt: 'Sunset over a rocky coast', caption: 'Golden hour club', doodles: ['sun', 'birds'] },
  { src: '/img/story/wall.webp', alt: 'Colorful street art wall', caption: 'Street colors', doodles: ['yo', 'spray'] },
  { src: '/img/story/buddy.webp', alt: 'A sleepy cat in the sun', caption: 'Chief nap officer', doodles: ['burst', 'paw'] },
  { src: '/img/story/city.webp', alt: 'City skyline at night', caption: 'City lights', doodles: ['moon', 'sparkles'] },
];

/* ───────────────────────────── Gallery board ─────────────────────────────
   cx / cy = centre of the tile in % of the board, w = % of the board width.
   z = stacking order, speed = parallax depth. Kinds: image | shapes | phones | headline
--------------------------------------------------------------------------- */

interface TileBase {
  cx: number;
  cy: number;
  width: number;
  rotate: number;
  z: number;
  speed: number;
  /** phone layout (taller board, clear band in the middle for the headline) */
  m: { cx: number; cy: number; width: number; rotate?: number };
}
export type Tile =
  | (TileBase & { kind: 'image'; src: string; alt: string; w: number; h: number })
  | (TileBase & { kind: 'shapes' | 'phones' | 'headline'; ratio: number });

export const tiles: Tile[] = [
  { kind: 'image', src: '/img/gallery/desk-phone.webp', alt: 'Phone with a finance app on a linen desk', w: 760, h: 640, cx: 16.3, cy: 10.6, width: 25, rotate: -9, z: 2, speed: 0.06, m: { cx: 17, cy: 7, width: 36 } },
  { kind: 'image', src: '/img/gallery/glow-site.webp', alt: 'Website hero with a glowing 3D wordmark', w: 1120, h: 820, cx: 48.2, cy: 17.2, width: 39.4, rotate: -4.5, z: 3, speed: 0.1, m: { cx: 57, cy: 12, width: 56 } },
  { kind: 'image', src: '/img/gallery/steps-illo.webp', alt: 'Illustration of a character climbing idea steps', w: 760, h: 600, cx: 82.7, cy: 8.6, width: 24, rotate: 12, z: 3, speed: 0.04, m: { cx: 88, cy: 4.5, width: 30 } },
  { kind: 'image', src: '/img/gallery/lingo-app.webp', alt: 'Language learning app website', w: 960, h: 760, cx: 14.1, cy: 28.6, width: 31, rotate: 6, z: 4, speed: 0.11, m: { cx: 20, cy: 27, width: 44 } },
  { kind: 'image', src: '/img/gallery/crm-site.webp', alt: 'CRM website hero', w: 1100, h: 720, cx: 79.4, cy: 27.6, width: 37.6, rotate: 5.5, z: 4, speed: 0.076, m: { cx: 73, cy: 29, width: 52 } },
  { kind: 'phones', cx: 88.2, cy: 45.3, width: 25, ratio: 0.98, rotate: -12, z: 6, speed: 0.14, m: { cx: 88, cy: 66, width: 30 } },
  { kind: 'shapes', cx: 12.8, cy: 56.4, width: 24.6, ratio: 0.96, rotate: 3, z: 5, speed: 0.06, m: { cx: 13, cy: 66, width: 28 } },
  { kind: 'image', src: '/img/gallery/sticker-sheet.webp', alt: 'Sticker sheet of illustrated icons', w: 800, h: 560, cx: 18.9, cy: 65.6, width: 29, rotate: -3, z: 4, speed: 0.03, m: { cx: 22, cy: 82, width: 42 } },
  { kind: 'headline', cx: 47.8, cy: 77.3, width: 38, ratio: 1.36, rotate: 5, z: 6, speed: 0.12, m: { cx: 52, cy: 71.5, width: 46 } },
  { kind: 'image', src: '/img/gallery/stack-site.webp', alt: 'Developer platform website in deep blue', w: 1060, h: 720, cx: 82.1, cy: 70.2, width: 34.2, rotate: -5, z: 5, speed: 0.07, m: { cx: 80, cy: 82, width: 46 } },
  { kind: 'image', src: '/img/gallery/orb-tablet.webp', alt: 'Tablet with a glowing orb held by a hand', w: 840, h: 680, cx: 28, cy: 89.4, width: 25, rotate: 31, z: 5, speed: 0.1, m: { cx: 34, cy: 94, width: 34 } },
  { kind: 'image', src: '/img/gallery/blobs-illo.webp', alt: 'Hands holding colorful 3D blobs', w: 720, h: 720, cx: 75.8, cy: 87.6, width: 22, rotate: -12, z: 7, speed: 0.05, m: { cx: 74, cy: 95, width: 28 } },
];
