/**
 * ─────────────────────────────────────────────────────────────────────
 *  ALL THE CONTENT OF THE PORTFOLIO LIVES HERE — in Spanish and English.
 *
 *  Every text is written as t('español', 'english'). Edit either side and
 *  both versions of the site follow: "/" is Spanish, "/en/" is English.
 *  Images live in /public/img (regenerate them with tools/studio) and the
 *  looping videos in /public/media.
 * ─────────────────────────────────────────────────────────────────────
 */

export type Locale = 'es' | 'en';
export const LOCALES: Locale[] = ['es', 'en'];

type T = { es: string; en: string };
const t = (es: string, en: string = es): T => ({ es, en });

/* ───────────────────────────── Site ───────────────────────────── */

const siteData = {
  /** Shown giant in the hero. Every letter gets its own hover sticker. */
  name: 'Liam Marega',
  brand: 'LiamDev',
  handle: '@liammdev',
  role: t('Developer Frontend & Mobile', 'Frontend & Mobile Developer'),
  title: t(
    'Liam Marega — Developer Frontend & Mobile · Flutter, React, Next.js',
    'Liam Marega — Frontend & Mobile Developer · Flutter, React, Next.js',
  ),
  description: t(
    'Desarrollo apps mobile y productos web listos para producción con Flutter, React, Next.js y Supabase: de la arquitectura a los pagos, el deploy y la observabilidad. Desde Entre Ríos, Argentina, trabajando remoto.',
    'I build production-ready mobile and web products with Flutter, React, Next.js and Supabase — from architecture to payments, deployment and observability. Based in Argentina, working remotely.',
  ),
  /** Your real domain (used for canonical, hreflang and social cards). */
  url: 'https://www.liammarega.com',
  email: 'liammaregadevelop@gmail.com',
  location: 'Entre Ríos, Argentina',
  available: t('Disponible para proyectos', 'Open to new projects'),

  nav: [
    { id: 'hey', label: t('Hola', 'Hey') },
    { id: 'work', label: t('Proyectos', 'Work') },
    { id: 'story', label: t('Historia', 'Story') },
    { id: 'chat', label: t('Chat', 'Chat') },
  ],
  /** Yellow button shown in the nav while a case study is open. */
  ctaLabel: t('Empecemos un proyecto', 'Start a project'),

  ui: {
    replaySunrise: t('Repetir el amanecer', 'Replay the sunrise'),
    sections: t('Secciones', 'Sections'),
    closeProject: t('Cerrar proyecto', 'Close project'),
    openCase: t('Ver el caso de', 'Open the case study for'),
    nextProject: t('Siguiente proyecto', 'Next project'),
    visit: t('Ver en vivo', 'Visit live site'),
    metrics: t('En números', 'In numbers'),
    stack: t('Stack', 'Stack'),
    product: t('Producto', 'Product'),
    features: t('Lo que construí', 'What I built'),
    role: t('Rol', 'Role'),
    stores: t('Tiendas', 'Stores'),
    switchTo: t('Read in English', 'Leer en español'),
    langShort: t('EN', 'ES'),
    stickerHint: t('Despegame y arrastrame', 'Peel me and drag me around'),
  },

  hero: {
    taglineLines: [t('¡Hola! Soy developer frontend y mobile:', 'Hi! I’m a frontend & mobile developer'), t('llevo apps y webs de la idea a producción.', 'taking apps and webs from idea to production.')],
  },

  work: {
    note: t('4+ años y contando', '4+ years and counting'),
    title: t('Cosas que lancé', 'Things I shipped'),
  },

  story: {
    title: [t('De Argentina al mundo,', 'From Argentina to the world,'), t('una app a la vez', 'one app at a time')],
    bio: [
      t(
        'Soy developer frontend y mobile, con más de 4 años lanzando productos a producción. Empecé en el frontend y hoy me hago cargo de features completas: arquitectura, UI, estado, APIs, tiempo real, pagos, deploy y observabilidad.',
        'I’m a frontend & mobile engineer with 4+ years shipping production products. I started in frontend and now own complete features: architecture, UI, state, APIs, real-time systems, payments, deployment and observability.',
      ),
      t(
        'Trabajo sobre todo con Flutter, React, Next.js y TypeScript, armando apps mobile, e-commerce headless y SaaS con IA.',
        'Today I work mostly across Flutter, React, Next.js and TypeScript, building mobile apps, headless commerce and AI-native SaaS.',
      ),
    ],
    mission: [
      t(
        'Me gusta trabajar donde la ingeniería se cruza con el producto: entender el problema, diseñar el sistema que lo resuelve y llevar la experiencia final a manos de usuarios reales.',
        'I enjoy working where engineering meets product: understanding the problem, designing the system behind it and getting the final experience into users’ hands.',
      ),
      t(
        'Me sumo a productos que necesitan más que una interfaz linda: apps mobile, SaaS, tiempo real, plataformas a medida y e-commerce headless. Disponible full-time, freelance o para colaborar.',
        'I’m into products that need more than a nice interface — mobile apps, SaaS, real-time experiences, custom platforms and headless commerce. Open to full-time, freelance and collaborations.',
      ),
    ],
    /** Chips of the hand-drawn window (Lucide icon names). Ordered short → long to fit the poses. */
    tags: [
      { label: 'React', icon: 'Atom', tone: 'blue' },
      { label: 'Flutter', icon: 'Smartphone', tone: 'violet' },
      { label: 'Next.js', icon: 'Globe', tone: 'lime' },
      { label: 'Supabase', icon: 'Database', tone: 'mint' },
      { label: 'TypeScript', icon: 'Braces', tone: 'orange' },
    ],
    tagsLabel: t('Mi stack principal', 'My core stack'),
    /** Peelable stickers (WebGL) stuck on the two text cards. */
    stickers: {
      bio: [
        { src: '/img/stickers/map.webp', width: 132, x: -0.27, y: -0.2, rotate: -8, alt: t('Mapa de Sudamérica con un pin en Entre Ríos', 'Map of South America with a pin on Entre Ríos') },
        { src: '/img/stickers/guita.webp', width: 150, x: 0.2, y: -0.29, rotate: 9, alt: t('La mascota de Guita', 'Guita’s mascot') },
      ],
      mission: [
        { src: '/img/stickers/downloads.webp', width: 124, x: -0.25, y: -0.26, rotate: -10, alt: t('60K+ descargas', '60K+ downloads') },
        { src: '/img/stickers/ship.webp', width: 124, x: 0.24, y: -0.22, rotate: 12, alt: 'Ship it!' },
      ],
    },
  },

  impact: {
    title: t('Impacto', 'Impact'),
    items: [
      { value: '60K+', label: t('descargas de apps mobile', 'mobile app downloads') },
      { value: '4+', label: t('años lanzando software a producción', 'years shipping production software') },
      { value: t('1.000+', '1,000+'), label: t('productos migrados a e-commerce headless', 'products migrated into headless commerce') },
      { value: '500+', label: t('visitas por día en mi SaaS con IA', 'visits a day on my AI SaaS') },
    ],
  },

  stack: {
    title: t('Con lo que trabajo', 'What I work with'),
    groups: [
      { name: 'Mobile', items: ['Flutter', 'Dart', 'Riverpod', 'GoRouter', 'Dio', 'Firebase', 'Push notifications', 'iOS & Android'] },
      { name: 'Web', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Astro', 'Tailwind CSS', 'Zustand', 'Redux'] },
      { name: t('Producto y plataforma', 'Product & platform'), items: ['Node.js', 'PostgreSQL', 'Supabase', 'Prisma', 'WebSockets', 'Docker', 'Vercel', 'Railway', 'Sentry', 'PostHog', 'Stripe'] },
    ],
    flow: t('Idea → producto → arquitectura → código → integraciones → producción → medir → mejorar → lanzar de nuevo', 'Idea → product → architecture → code → integrations → production → observe → improve → ship again'),
  },

  gallery: {
    title: [t('Pequeños experimentos,', 'Little experiments,'), t('mucha curiosidad', 'big curiosity')],
    note: t('para afilar el oficio o solo por diversión', 'to sharpen my craft or just for fun'),
  },

  chat: {
    note: [t('Tocá este botón ‘humilde’ y', 'Press this ‘humble’ button and'), t('construyamos algo útil =)', 'let’s build something useful =)')],
    button: t('Hablemos', 'Connect'),
    landing: {
      text: t('¿Necesitás una landing que venda?', 'Need a landing page that sells?'),
      cta: t('Conocé Landing PRO', 'Meet Landing PRO'),
      href: 'https://www.liammarega.com/landing-builder',
    },
  },

  socials: [
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/liammdev', name: 'Instagram · @liammdev' },
    { id: 'youtube', label: 'YouTube', href: 'https://youtube.com/@liammdev', name: 'YouTube · @liammdev' },
    { id: 'github', label: 'GitHub', href: 'https://github.com/liamMarega', name: 'GitHub · liamMarega' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/liam-marega/', name: 'LinkedIn · Liam Marega' },
  ],
};

/* ───────────────────────────── Projects ───────────────────────────── */

export interface MediaItem {
  /** image path, or the poster frame when `video` is set */
  src: string;
  alt: T;
  /** natural size of the image (used for the aspect ratio) */
  w: number;
  h: number;
  /** looping, muted clip shown inside a browser frame */
  video?: { src: string; url: string; dark?: boolean };
  /** placement inside the card media strip (desktop), % of the strip width */
  left: number;
  width: number;
  /** px offset from the top of the media strip at a 1466px viewport (scales with vw) */
  top: number;
  rotate: number;
  hover?: { x?: number; y?: number; rotate?: number; scale?: number };
}

interface ProjectData {
  slug: string;
  name: string;
  /** Lucide icon (https://lucide.dev/icons) used as the project mark */
  icon: string;
  url: string;
  urlLabel: string;
  summary: T;
  /** handwritten line under the summary */
  credit?: T;
  /** die-cut badge stuck on the card */
  badge?: { text: T; tone: 'yellow' | 'mint' | 'blue' | 'pink' | 'black' };
  role: T;
  /** case-study colours: [dark, accent, light, extra] */
  palette: [string, string, string, string];
  intro: T[];
  metrics: { value: T; label: T }[];
  /** technologies (shown as "Stack"); when the stack is private we show product keywords instead */
  stack?: string[];
  keywords?: T[];
  features: { icon: string; label: T }[];
  links?: { label: string; url: string }[];
  media: [MediaItem, MediaItem];
  cover: { src: string; alt: T; w: number; h: number };
}

const projectData: ProjectData[] = [
  {
    slug: 'ferox',
    name: 'Ferox',
    icon: 'Crosshair',
    url: 'https://www.feroxapp.com/',
    urlLabel: 'feroxapp.com',
    summary: t(
      'Red social para cazadores con 60K+ descargas: feeds en tiempo real, chat y tienda, en iOS y Android.',
      'A social network for hunters with 60K+ downloads: real-time feeds, chat and a store on iOS & Android.',
    ),
    credit: t('Flutter dev del equipo · 2023 — hoy', 'Flutter dev on the team · 2023 — today'),
    badge: { text: t('60K+ descargas', '60K+ downloads'), tone: 'mint' },
    role: t('Flutter Mobile Developer · 2023 — hoy', 'Flutter Mobile Developer · 2023 — present'),
    palette: ['#1f3d2f', '#46c293', '#eef7f1', '#2f5843'],
    intro: [
      t(
        'Ferox es la red social de los cazadores: un lugar para unificar el sector, compartir experiencias y crear vínculos entre ellos.',
        'Ferox is the social network for hunters: a place to bring the whole sector together, share experiences and build real connections.',
      ),
      t(
        'Desde 2023 desarrollo la app en Flutter: feeds en tiempo real con follows, likes, reposts, comentarios y búsqueda, y una mensajería tolerante a la falta de conexión construida sobre WebSockets.',
        'Since 2023 I’ve been building the Flutter app: real-time feeds with follows, likes, reposts, comments and search, plus offline-tolerant messaging built around WebSockets.',
      ),
      t(
        'También sumé subida de media y contenido vertical, listings de e-commerce, flujos de suscripción, notificaciones push y cada release en App Store y Play Store. Más de 60K descargas y contando.',
        'I also shipped media uploads and vertical content, e-commerce listings, subscription flows, push notifications and every App Store & Play Store release. 60K+ downloads and counting.',
      ),
    ],
    metrics: [
      { value: t('60K+'), label: t('descargas', 'downloads') },
      { value: t('iOS + Android'), label: t('en producción', 'in production') },
      { value: t('2023 — hoy', '2023 — today'), label: t('en el equipo', 'on the team') },
      { value: t('Tiempo real', 'Real-time'), label: t('feeds y chat con WebSockets', 'feeds & chat over WebSockets') },
    ],
    stack: ['Flutter', 'Dart', 'Riverpod', 'GoRouter', 'WebSockets', 'Firebase', 'REST', 'JWT'],
    features: [
      { icon: 'Rss', label: t('Feeds en tiempo real', 'Real-time feeds') },
      { icon: 'MessagesSquare', label: t('Mensajería offline', 'Offline-tolerant chat') },
      { icon: 'ImagePlay', label: t('Media y contenido vertical', 'Media & vertical content') },
      { icon: 'Search', label: t('Búsqueda', 'Search') },
      { icon: 'Store', label: t('Tienda y listings', 'Store & listings') },
      { icon: 'CreditCard', label: t('Suscripciones', 'Subscriptions') },
      { icon: 'Bell', label: t('Push notifications', 'Push notifications') },
      { icon: 'Rocket', label: t('Releases en las stores', 'Store releases') },
    ],
    media: [
      {
        src: '/img/work/ferox-a.webp',
        alt: t('Pantalla Discovery de la app Ferox en un teléfono', 'Ferox Discovery screen on a phone'),
        w: 960,
        h: 880,
        left: 0,
        width: 37.4,
        top: 44,
        rotate: -2,
        hover: { x: -12, y: -70, rotate: -4.4, scale: 1.06 },
      },
      {
        src: '/img/work/ferox-b.webp',
        alt: t('Tres pantallas de Ferox: tienda, Discovery y perfil', 'Three Ferox screens: store, Discovery and profile'),
        w: 1600,
        h: 860,
        left: 38.1,
        width: 62.6,
        top: 10,
        rotate: 1.2,
        hover: { x: 10, y: -44, rotate: 3, scale: 1.03 },
      },
    ],
    cover: { src: '/img/work/ferox-cover.webp', alt: t('Tres pantallas de la app Ferox', 'Three screens of the Ferox app'), w: 2400, h: 1360 },
  },
  {
    slug: 'swipeloop',
    name: 'SwipeLoop',
    icon: 'GalleryHorizontalEnd',
    url: 'https://swipeloop.app/',
    urlLabel: 'swipeloop.app',
    summary: t(
      'SaaS con IA que convierte un tema o la URL de tu marca en carruseles para Instagram, LinkedIn y TikTok.',
      'AI SaaS that turns a topic or your brand’s URL into ready-to-post carousels for Instagram, LinkedIn & TikTok.',
    ),
    credit: t('mi propio SaaS, de punta a punta', 'my own SaaS, built end to end'),
    badge: { text: t('en vivo · 500+ visitas/día', 'live · 500+ visits/day'), tone: 'yellow' },
    role: t('Founder & Engineer', 'Founder & Engineer'),
    palette: ['#09090b', '#edc64b', '#f6f1e1', '#2a2613'],
    intro: [
      t(
        'SwipeLoop es mi propio SaaS: describís un tema o pegás la URL de tu marca y genera carruseles editables para Instagram, LinkedIn y TikTok, con tu Brand Kit y tu tono.',
        'SwipeLoop is my own SaaS: describe a topic or paste your brand’s URL and it generates editable carousels for Instagram, LinkedIn and TikTok, with your Brand Kit and tone.',
      ),
      t(
        'Lo diseñé y construí solo, de punta a punta: autenticación, suscripciones, facturación por créditos, storage, analytics y toda la infraestructura de generación con IA.',
        'I designed and built it solo, end to end: authentication, subscriptions, credit billing, storage, analytics and the whole AI generation infrastructure.',
      ),
      t(
        'La generación corre en un pipeline asíncrono multi-agente, con agentes especializados en investigación, estrategia, narrativa, copy, QA y dirección visual. Es un producto en vivo con usuarios reales, no una demo.',
        'Generation runs on an asynchronous multi-agent pipeline, with specialized agents for research, strategy, narrative, copy, QA and visual direction. A live product with real users, not a demo.',
      ),
    ],
    metrics: [
      { value: t('500+'), label: t('visitas por día', 'visits a day') },
      { value: t('6 agentes', '6 agents'), label: t('en el pipeline de IA', 'in the AI pipeline') },
      { value: t('3 formatos', '3 formats'), label: t('feed 4:5, PDF y 9:16', '4:5 feed, PDF and 9:16') },
      { value: t('Solo', 'Solo'), label: t('diseño, código y producto', 'design, code and product') },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Supabase', 'OpenRouter', 'PostHog', 'Vercel'],
    features: [
      { icon: 'Bot', label: t('Pipeline multi-agente', 'Multi-agent pipeline') },
      { icon: 'Palette', label: t('Brand Kit automático', 'Automatic Brand Kit') },
      { icon: 'GalleryHorizontalEnd', label: t('Carruseles editables', 'Editable carousels') },
      { icon: 'Layers', label: t('9 variantes creativas', '9 creative variants') },
      { icon: 'Download', label: t('Export PNG y PDF', 'PNG & PDF export') },
      { icon: 'Coins', label: t('Créditos y suscripciones', 'Credits & subscriptions') },
      { icon: 'Lock', label: t('Auth y storage', 'Auth & storage') },
      { icon: 'ChartLine', label: t('Analytics', 'Analytics') },
    ],
    media: [
      {
        src: '/img/work/swipeloop-a.webp',
        alt: t('Carruseles generados con SwipeLoop', 'Carousels generated with SwipeLoop'),
        w: 960,
        h: 880,
        left: 0,
        width: 37.4,
        top: 40,
        rotate: -1.6,
        hover: { x: -12, y: -74, rotate: -4, scale: 1.06 },
      },
      {
        src: '/media/swipeloop.webp',
        alt: t('La home de SwipeLoop en movimiento', 'SwipeLoop’s home page in motion'),
        w: 1216,
        h: 720,
        video: { src: '/media/swipeloop.mp4', url: 'swipeloop.app', dark: true },
        left: 38.1,
        width: 62.6,
        top: 12,
        rotate: 1.4,
        hover: { x: 10, y: -44, rotate: 3, scale: 1.03 },
      },
    ],
    cover: { src: '/img/work/swipeloop-cover.webp', alt: t('La landing de SwipeLoop', 'SwipeLoop landing page'), w: 2400, h: 1360 },
  },
  {
    slug: 'commerce',
    name: 'Headless Commerce',
    icon: 'ShoppingBag',
    url: 'https://www.mendohomefurniture.com/',
    urlLabel: 'mendohomefurniture.com',
    summary: t(
      'Tiendas a medida con Next.js para mueblerías y casas de electro de Miami, desacopladas del motor de e-commerce.',
      'Custom Next.js storefronts for Miami furniture and appliance stores, decoupled from the commerce engine.',
    ),
    credit: t('tiendas reales en Miami, FL', 'real stores in Miami, FL'),
    badge: { text: t('1.000+ productos', '1,000+ products'), tone: 'black' },
    role: t('Frontend / Full-Stack independiente', 'Independent Frontend / Full-Stack Developer'),
    palette: ['#2a241e', '#c49a52', '#f4efe6', '#6b5a45'],
    intro: [
      t(
        'Construyo e-commerce a medida donde el storefront está completamente desacoplado del motor de comercio: storefronts propios en Next.js conectados a Vendure.',
        'I build custom e-commerce where the storefront is completely decoupled from the commerce engine: custom Next.js storefronts connected to Vendure.',
      ),
      t(
        'Entre ellos, Florida Home Furniture y Easy Home Appliances, y también las tiendas de Mendo Home Furniture, Romeo Furniture y 305 Discount: negocios reales de Miami, con showroom, catálogo online y ventas por WhatsApp.',
        'They include Florida Home Furniture and Easy Home Appliances, plus the stores for Mendo Home Furniture, Romeo Furniture and 305 Discount — real Miami businesses with showrooms, online catalogs and WhatsApp sales.',
      ),
      t(
        'El trabajo cubre arquitectura del storefront, más de 1.000 productos migrados, checkout e integraciones de pago, scraping y automatización de catálogo, lógica de negocio a medida e infraestructura en Railway y Vercel.',
        'The work covers storefront architecture, 1,000+ product migrations, checkout and payment integrations, scraping and catalog automation, custom business logic, and Railway / Vercel infrastructure.',
      ),
    ],
    metrics: [
      { value: t('1.000+', '1,000+'), label: t('productos migrados', 'products migrated') },
      { value: t('5 tiendas', '5 stores'), label: t('en producción', 'in production') },
      { value: t('Miami, FL'), label: t('showrooms reales', 'real showrooms') },
      { value: t('Headless'), label: t('Next.js + Vendure', 'Next.js + Vendure') },
    ],
    stack: ['Next.js', 'TypeScript', 'Vendure', 'PostgreSQL', 'Stripe', 'Railway', 'Vercel'],
    features: [
      { icon: 'LayoutTemplate', label: t('Storefront a medida', 'Custom storefront') },
      { icon: 'Boxes', label: t('Migración de catálogo', 'Catalog migration') },
      { icon: 'CreditCard', label: t('Checkout y pagos', 'Checkout & payments') },
      { icon: 'Workflow', label: t('Scraping y automatización', 'Scraping & automation') },
      { icon: 'Blocks', label: t('Lógica de negocio', 'Business logic') },
      { icon: 'MessageCircle', label: t('Ventas por WhatsApp', 'WhatsApp sales') },
      { icon: 'Search', label: t('Búsqueda y filtros', 'Search & filters') },
      { icon: 'Server', label: t('Railway + Vercel', 'Railway + Vercel') },
    ],
    links: [
      { label: 'Florida Home Furniture', url: 'https://www.floridahomefurniture.com/' },
      { label: 'Easy Home Appliances', url: 'https://www.easyhomeappliancesbr.com/' },
      { label: 'Mendo Home Furniture', url: 'https://www.mendohomefurniture.com/' },
      { label: 'Romeo Furniture', url: 'https://www.romeofloridafurniture.com/' },
      { label: '305 Discount', url: 'https://305discount.com/' },
    ],
    media: [
      {
        src: '/img/work/commerce-a.webp',
        alt: t('Detalles de la tienda de Mendo Home Furniture', 'Details of the Mendo Home Furniture store'),
        w: 960,
        h: 880,
        left: 0,
        width: 37.4,
        top: 40,
        rotate: -1.8,
        hover: { x: -12, y: -70, rotate: -4, scale: 1.06 },
      },
      {
        src: '/img/work/commerce-b.webp',
        alt: t('Home de Mendo Home Furniture en el navegador', 'Mendo Home Furniture home page in a browser'),
        w: 1600,
        h: 860,
        left: 38.1,
        width: 62.6,
        top: 8,
        rotate: 1,
        hover: { x: 10, y: -44, rotate: 3, scale: 1.03 },
      },
    ],
    cover: { src: '/img/work/commerce-cover.webp', alt: t('Home de Mendo Home Furniture', 'Mendo Home Furniture home page'), w: 2400, h: 1360 },
  },
  {
    slug: 'clientix',
    name: 'ClientiX',
    icon: 'Radar',
    url: 'https://www.clientix.app/',
    urlLabel: 'clientix.app',
    summary: t(
      'Encuentra negocios de Google Maps sin web, te dice a quién escribirle hoy y te deja el mensaje listo.',
      'Finds Google Maps businesses without a website, tells you who to write to today and drafts the message.',
    ),
    badge: { text: t('leads con IA', 'AI-powered leads'), tone: 'blue' },
    role: t('Producto propio', 'My own product'),
    palette: ['#0f2f3a', '#a9edff', '#f2fbfe', '#1f6f86'],
    intro: [
      t(
        'ClientiX consigue clientes nuevos sin buscarlos uno por uno: elegís un rubro y una ciudad y te muestra qué negocios de Google Maps no tienen sitio web y a quién escribirle hoy.',
        'ClientiX gets you new clients without searching one by one: pick an industry and a city, and it shows which Google Maps businesses have no website and who to write to today.',
      ),
      t(
        'Arma un primer mensaje con los datos reales de cada negocio, para que solo lo revises y lo mandes desde tu propio WhatsApp o correo.',
        'It drafts a first message with each business’s real data, so you only review it and send it from your own WhatsApp or email.',
      ),
      t(
        'Todo vive en un CRM simple con notas, etiquetas y tareas, exportaciones en CSV y JSON, y un equipo de agentes de IA (Scout, Seller, Radar & Writer y Analyst) en los planes más altos.',
        'Everything lives in a simple CRM with notes, tags and tasks, CSV and JSON exports, and a team of AI agents (Scout, Seller, Radar & Writer and Analyst) on the higher plans.',
      ),
    ],
    metrics: [
      { value: t('24 rubros', '24 industries'), label: t('listos para buscar', 'ready to search') },
      { value: t('4 agentes', '4 agents'), label: t('de IA trabajando por vos', 'of AI working for you') },
      { value: t('1 crédito', '1 credit'), label: t('= 1 lead', '= 1 lead') },
      { value: t('Free → Enterprise'), label: t('planes desde US$0', 'plans from US$0') },
    ],
    keywords: [t('SaaS'), t('Google Maps'), t('IA', 'AI'), t('CRM'), t('Lead generation'), t('WhatsApp')],
    features: [
      { icon: 'MapPin', label: t('Búsqueda por rubro y zona', 'Search by industry & area') },
      { icon: 'Globe', label: t('Detecta quién no tiene web', 'Spots who has no website') },
      { icon: 'ListChecks', label: t('A quién escribir hoy', 'Who to write today') },
      { icon: 'Send', label: t('Mensajes listos', 'Ready-made messages') },
      { icon: 'Tags', label: t('CRM con notas y tareas', 'CRM with notes & tasks') },
      { icon: 'Bot', label: t('Equipo de agentes IA', 'AI agent team') },
      { icon: 'FileSpreadsheet', label: t('Export CSV y JSON', 'CSV & JSON export') },
      { icon: 'Mail', label: t('Briefing diario por mail', 'Daily email briefing') },
    ],
    media: [
      {
        src: '/img/work/clientix-a.webp',
        alt: t('Resultados de búsqueda y mensaje sugerido en ClientiX', 'ClientiX search results and suggested message'),
        w: 960,
        h: 880,
        left: 0,
        width: 37.4,
        top: 40,
        rotate: -1.8,
        hover: { x: -12, y: -70, rotate: -4, scale: 1.06 },
      },
      {
        src: '/media/clientix.webp',
        alt: t('La home de ClientiX con la demo de búsqueda', 'ClientiX home page with the search demo'),
        w: 1236,
        h: 720,
        video: { src: '/media/clientix.mp4', url: 'clientix.app' },
        left: 38.1,
        width: 62.6,
        top: 12,
        rotate: 1.2,
        hover: { x: 10, y: -44, rotate: 3, scale: 1.03 },
      },
    ],
    cover: { src: '/img/work/clientix-cover.webp', alt: t('Home de ClientiX', 'ClientiX home page'), w: 2400, h: 1360 },
  },
  {
    slug: 'lucero',
    name: 'Lucero',
    icon: 'Sparkle',
    url: 'https://lucerobiblia.com.ar/',
    urlLabel: 'lucerobiblia.com.ar',
    summary: t(
      'La Biblia católica explicada y jugada: lecciones de 5 minutos, mapas, audio y oraciones, en el navegador.',
      'The Catholic Bible, explained and played: 5-minute lessons, maps, audio and prayers — right in the browser.',
    ),
    credit: t('producto propio · 1.300+ personas aprendiendo', 'my own product · 1,300+ people learning'),
    badge: { text: t('5 min por día', '5 min a day'), tone: 'pink' },
    role: t('Producto propio', 'My own product'),
    palette: ['#1d2a6b', '#f5d48a', '#f7f4fd', '#3157d4'],
    intro: [
      t(
        'Lucero es un producto digital para entender toda la Biblia católica jugando, 5 minutos por día. No hay que descargar nada: funciona en el navegador y se agrega a la pantalla de inicio.',
        'Lucero is a digital product to understand the whole Catholic Bible by playing, 5 minutes a day. Nothing to download: it runs in the browser and can be added to the home screen.',
      ),
      t(
        'Reúne la Biblia completa (73 libros) con voz, lecciones tipo juego con mapas interactivos, un atlas ilustrado, videos cortos, 35 oraciones guiadas y planes de lectura.',
        'It brings together the full Bible (73 books) with voice, game-like lessons with interactive maps, an illustrated atlas, short videos, 35 guided prayers and reading plans.',
      ),
      t(
        'Una sola suscripción con todo incluido y un onboarding sin fricción (email y código, sin contraseñas), que ya usan más de 1.300 personas.',
        'One all-inclusive subscription and a frictionless onboarding (email plus a one-time code, no passwords), already used by 1,300+ people.',
      ),
    ],
    metrics: [
      { value: t('1.300+', '1,300+'), label: t('personas aprendiendo', 'people learning') },
      { value: t('73 mapas', '73 maps'), label: t('interactivos', 'interactive') },
      { value: t('5 min', '5 min'), label: t('por día alcanzan', 'a day is enough') },
      { value: t('Sin descarga', 'No download'), label: t('web app instalable', 'installable web app') },
    ],
    keywords: [t('Web app'), t('Gamificación', 'Gamification'), t('Audio'), t('Suscripción', 'Subscriptions'), t('Mobile-first')],
    features: [
      { icon: 'BookOpen', label: t('Biblia completa con voz', 'Full Bible with voice') },
      { icon: 'Map', label: t('Mapas interactivos', 'Interactive maps') },
      { icon: 'Gamepad2', label: t('Lecciones tipo juego', 'Game-like lessons') },
      { icon: 'Film', label: t('Videos cortos', 'Short videos') },
      { icon: 'Headphones', label: t('Audio narrado', 'Narrated audio') },
      { icon: 'Flame', label: t('Rachas diarias', 'Daily streaks') },
      { icon: 'MessagesSquare', label: t('Preguntas con citas', 'Q&A with citations') },
      { icon: 'Smartphone', label: t('Instalable, sin descarga', 'Installable, no download') },
    ],
    media: [
      {
        src: '/img/work/lucero-a.webp',
        alt: t('La landing mobile de Lucero', 'Lucero’s mobile landing page'),
        w: 960,
        h: 880,
        left: 0,
        width: 37.4,
        top: 40,
        rotate: -1.8,
        hover: { x: -12, y: -70, rotate: -4, scale: 1.06 },
      },
      {
        src: '/img/work/lucero-b.webp',
        alt: t('La landing de Lucero en el navegador', 'Lucero’s landing page in a browser'),
        w: 1600,
        h: 860,
        left: 38.1,
        width: 62.6,
        top: 8,
        rotate: 1,
        hover: { x: 10, y: -44, rotate: 3, scale: 1.03 },
      },
    ],
    cover: { src: '/img/work/lucero-cover.webp', alt: t('Landing de Lucero', 'Lucero landing page'), w: 2400, h: 1360 },
  },
  {
    slug: 'guita',
    name: 'Guita',
    icon: 'Wallet',
    url: 'https://spend.liammarega.com/',
    urlLabel: 'spend.liammarega.com',
    summary: t(
      'Mi app de finanzas personales: gastos, cajitas, metas y suscripciones, clarito y con una mascota.',
      'My personal finance app: expenses, savings boxes, goals and subscriptions — clear, with a cute mascot.',
    ),
    badge: { text: t('tu plata, clarita', 'your money, clear'), tone: 'mint' },
    role: t('Producto propio', 'My own product'),
    palette: ['#0b0d0c', '#77dea0', '#eefaf3', '#1f1f20'],
    intro: [
      t(
        'Guita es mi app de finanzas personales: gastos, cajitas, metas y suscripciones, explicados en criollo.',
        'Guita is my personal finance app: expenses, savings boxes (“cajitas”), goals and subscriptions, explained in plain words.',
      ),
      t(
        'Te muestra cuánto llevás gastado en el mes comparado con el anterior, detecta tus gastos hormiga y te ayuda a calcular cuánto podés gastar por día.',
        'It shows how much you’ve spent this month compared with the previous one, spots your small recurring “ant” expenses and helps you work out how much you can spend per day.',
      ),
      t(
        'Mobile-first, con vistas separadas para lo personal y el trabajo, ingreso con passkey y una mascota que hace todo más amable.',
        'Mobile-first, with separate Personal and Work views, passkey sign-in and a mascot that makes it all friendlier.',
      ),
    ],
    metrics: [
      { value: t('Passkeys'), label: t('ingreso sin contraseña', 'password-free sign-in') },
      { value: t('Mobile-first'), label: t('pensada para el día a día', 'built for everyday use') },
      { value: t('Personal + Trabajo', 'Personal + Work'), label: t('vistas separadas', 'separate views') },
      { value: t('Mes vs. mes', 'Month vs. month'), label: t('comparativa automática', 'automatic comparison') },
    ],
    keywords: [t('Web app'), t('Finanzas', 'Finance'), t('Passkeys'), t('Dark UI'), t('Mobile-first')],
    features: [
      { icon: 'Wallet', label: t('Registro de gastos', 'Expense tracking') },
      { icon: 'PiggyBank', label: t('Cajitas de ahorro', 'Savings boxes') },
      { icon: 'Target', label: t('Metas', 'Goals') },
      { icon: 'Repeat', label: t('Suscripciones', 'Subscriptions') },
      { icon: 'ChartColumn', label: t('Mes contra mes', 'Month over month') },
      { icon: 'Sparkles', label: t('Gastos hormiga', 'Small-spend radar') },
      { icon: 'KeyRound', label: t('Passkeys', 'Passkeys') },
      { icon: 'Smartphone', label: t('Mobile-first', 'Mobile-first') },
    ],
    media: [
      {
        src: '/img/work/guita-a.webp',
        alt: t('Pantalla de ingreso de Guita', 'Guita sign-in screen'),
        w: 960,
        h: 880,
        left: 0,
        width: 37.4,
        top: 40,
        rotate: -1.8,
        hover: { x: -12, y: -70, rotate: -4, scale: 1.06 },
      },
      {
        src: '/img/work/guita-b.webp',
        alt: t('Pantallas de inicio e ingreso de Guita', 'Guita home and sign-in screens'),
        w: 1600,
        h: 860,
        left: 38.1,
        width: 62.6,
        top: 8,
        rotate: 1,
        hover: { x: 10, y: -44, rotate: 3, scale: 1.03 },
      },
    ],
    cover: { src: '/img/work/guita-cover.webp', alt: t('Pantallas de Guita', 'Guita screens'), w: 2400, h: 1360 },
  },
];

/* ───────────────────────────── Story polaroids ───────────────────────────── */


const polaroidData: { src: string; alt: T; caption: T; case?: string }[] = [
  { src: '/img/story/map.webp', alt: t('Mapa de Sudamérica con un pin en Entre Ríos', 'Map of South America with a pin on Entre Ríos'), caption: t('Entre Ríos, Argentina') },
  { src: '/img/story/swipeloop-logo.webp', alt: t('Logo de SwipeLoop', 'SwipeLoop logo'), caption: t('mi SaaS con IA', 'my AI SaaS'), case: 'swipeloop' },
  { src: '/img/story/ferox.webp', alt: t('El feed de Ferox, la red social para cazadores', 'The Ferox feed, a social network for hunters'), caption: t('Ferox · 60K+ descargas', 'Ferox · 60K+ downloads'), case: 'ferox' },
  { src: '/img/story/knight.webp', alt: t('Caballero pixel art de mi pomodoro', 'Pixel-art knight from my pomodoro timer'), caption: t('modo foco: ON', 'focus mode: ON') },
  { src: '/img/story/clientix-logo.webp', alt: t('Logo de ClientiX', 'ClientiX logo'), caption: t('clientes sin buscar', 'leads, found for you'), case: 'clientix' },
  { src: '/img/story/lucero.webp', alt: t('La landing de Lucero: entender la Biblia jugando', 'Lucero’s landing: understanding the Bible through play'), caption: t('la Biblia, jugando', 'the Bible, played'), case: 'lucero' },
  { src: '/img/story/alien.webp', alt: t('Hero animado de No Cool Hats', 'No Cool Hats animated hero'), caption: t('70 piezas, 1 universo', '70 pieces, 1 universe') },
  { src: '/img/story/easyhome.webp', alt: t('Logo de Easy Home Appliances', 'Easy Home Appliances logo'), caption: t('tiendas en Miami', 'stores in Miami'), case: 'commerce' },
  { src: '/img/story/guita.webp', alt: t('La mascota de Guita', 'Guita’s mascot'), caption: t('Guita, mi app de plata', 'Guita, my money app'), case: 'guita' },
  { src: '/img/story/holo.webp', alt: t('Landing de HoloContent AI', 'HoloContent AI landing page'), caption: t('videos con IA', 'AI-made videos') },
  { src: '/img/story/ferox-logo.webp', alt: t('Logo de Ferox', 'Ferox logo'), caption: t('Flutter en producción', 'Flutter in production'), case: 'ferox' },
  { src: '/img/story/posters.webp', alt: t('Carruseles generados con SwipeLoop', 'Carousels made with SwipeLoop'), caption: t('carruseles con IA', 'AI carousels'), case: 'swipeloop' },
  { src: '/img/story/advantis.webp', alt: t('Landing de Advantis AI', 'Advantis AI landing page'), caption: t('riesgo cripto con IA', 'crypto risk, with AI') },
  { src: '/img/story/mendo.webp', alt: t('Living de la tienda Mendo Home Furniture', 'Living room from the Mendo Home Furniture store'), caption: t('e-commerce headless', 'headless e-commerce'), case: 'commerce' },
  { src: '/img/story/clientix.webp', alt: t('Rubros para buscar clientes en ClientiX', 'Business categories in ClientiX'), caption: t('elegí un rubro', 'pick an industry'), case: 'clientix' },
  { src: '/img/story/crm.webp', alt: t('Reportes de mi CRM freelance', 'Reports in my freelance CRM'), caption: t('mi CRM freelance', 'my freelance CRM') },
];

/* ───────────────────────────── Gallery (contact sheet) ───────────────────────────── */

/** Pieces that stream out of the centre of the gallery. `video` items are looping clips (with a poster). */
const sheetData: { src: string; video?: string; alt: T; title: T; subtitle: T }[] = [
  { src: '/media/gallery/alien.webp', video: '/media/gallery/alien.mp4', alt: t('Hero animado para No Cool Hats', 'Animated hero for No Cool Hats'), title: t('No Cool Hats'), subtitle: t('Hero animado · 70 piezas, 1 universo', 'Animated hero · 70 pieces, 1 universe') },
  { src: '/media/gallery/phones.webp', video: '/media/gallery/phones.mp4', alt: t('Guita, Ferox y mi Pomodoro en dos celulares', 'Guita, Ferox and my Pomodoro on two phones'), title: t('Mobile'), subtitle: t('Guita, Ferox y mi Pomodoro', 'Guita, Ferox and my Pomodoro') },
  { src: '/img/gallery/advantis-landing.webp', alt: t('Landing de Advantis AI', 'Advantis AI landing page'), title: t('Advantis AI'), subtitle: t('Landing', 'Landing page') },
  { src: '/media/gallery/holo.webp', video: '/media/gallery/holo.mp4', alt: t('Landing mobile de HoloContent AI', 'HoloContent AI mobile landing'), title: t('HoloContent AI'), subtitle: t('Landing mobile que vende', 'A mobile landing that sells') },
  { src: '/img/gallery/fmoney.webp', alt: t('Plataforma de sorteos FMoney en tablets', 'FMoney raffle platform on tablets'), title: t('FMoney'), subtitle: t('Plataforma de sorteos', 'Raffle platform') },
  { src: '/media/gallery/swipeloop.webp', video: '/media/gallery/swipeloop.mp4', alt: t('SwipeLoop generando carruseles', 'SwipeLoop generating carousels'), title: t('SwipeLoop'), subtitle: t('Carruseles con IA, en vivo', 'AI carousels, live') },
  { src: '/img/gallery/crm.webp', alt: t('Reportes de mi CRM freelance', 'Reports in my freelance CRM'), title: t('CRM freelance', 'Freelance CRM'), subtitle: t('Reportes de cobros', 'Billing reports') },
  { src: '/media/gallery/lucero.webp', video: '/media/gallery/lucero.mp4', alt: t('Lucero en una notebook y un celular', 'Lucero on a laptop and a phone'), title: t('Lucero'), subtitle: t('La Biblia, jugando · web app', 'The Bible, played · web app') },
  { src: '/img/gallery/pomodoro.webp', alt: t('Pomodoro con estética pixel art', 'Pixel-art pomodoro timer'), title: t('Pomodoro Knight'), subtitle: t('Timer en pixel art', 'Pixel-art timer') },
  { src: '/media/gallery/stack.webp', video: '/media/gallery/stack.mp4', alt: t('Mi stack en stickers', 'My stack as stickers'), title: t('Mi stack', 'My stack'), subtitle: t('Flutter, React, Next.js y más', 'Flutter, React, Next.js and more') },
  { src: '/img/gallery/advantis-dash.webp', alt: t('Dashboard de riesgo de Advantis AI', 'Advantis AI risk dashboard'), title: t('Advantis AI'), subtitle: t('Dashboard de riesgo cripto', 'Crypto risk dashboard') },
  { src: '/media/gallery/ferox.webp', video: '/media/gallery/ferox.mp4', alt: t('Ferox en tres celulares', 'Ferox on three phones'), title: t('Ferox'), subtitle: t('60K+ descargas en iOS y Android', '60K+ downloads on iOS & Android') },
  { src: '/img/gallery/swipeloop-posters.webp', alt: t('Carruseles en la landing de SwipeLoop', 'Carousels on the SwipeLoop landing page'), title: t('SwipeLoop'), subtitle: t('Landing y carruseles', 'Landing & carousels') },
  { src: '/media/gallery/clientix.webp', video: '/media/gallery/clientix.mp4', alt: t('ClientiX buscando negocios', 'ClientiX finding businesses'), title: t('ClientiX'), subtitle: t('Encontrá clientes sin buscar', 'Leads, without the search') },
  { src: '/img/gallery/lucero-laptop.webp', alt: t('La landing de Lucero en una notebook', 'Lucero’s landing page on a laptop'), title: t('Lucero'), subtitle: t('En la notebook', 'On a laptop') },
  { src: '/img/work/commerce-a.webp', alt: t('Tienda de Mendo Home Furniture', 'Mendo Home Furniture store'), title: t('Mendo Home Furniture'), subtitle: t('E-commerce headless', 'Headless e-commerce') },
  { src: '/img/gallery/clientix.webp', alt: t('Demo de búsqueda de ClientiX', 'ClientiX search demo'), title: t('ClientiX'), subtitle: t('Demo de búsqueda', 'Search demo') },
  { src: '/img/work/guita-a.webp', alt: t('Guita en un celular', 'Guita on a phone'), title: t('Guita'), subtitle: t('Mi app de finanzas', 'My money app') },
];

/* ───────────────────────────── Resolution per language ───────────────────────────── */

type Resolve<X> = X extends T
  ? string
  : X extends readonly (infer U)[]
    ? Resolve<U>[]
    : X extends (...args: never[]) => unknown
      ? X
      : X extends object
        ? { [K in keyof X]: Resolve<X[K]> }
        : X;

const isT = (v: unknown): v is T =>
  !!v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 2 && 'es' in v && 'en' in v;

function resolve<X>(value: X, l: Locale): Resolve<X> {
  if (isT(value)) return value[l] as Resolve<X>;
  if (Array.isArray(value)) return value.map((v) => resolve(v, l)) as Resolve<X>;
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = resolve(v, l);
    return out as Resolve<X>;
  }
  return value as Resolve<X>;
}

export type Site = Resolve<typeof siteData>;
export type Project = Resolve<ProjectData>;
export type Polaroid = Resolve<(typeof polaroidData)[number]>;
export type SheetItem = Resolve<(typeof sheetData)[number]>;

const cache = new Map<Locale, { site: Site; projects: Project[]; polaroids: Polaroid[]; sheet: SheetItem[]; lang: Locale }>();

/** Everything a page needs, in one language. */
export function useContent(locale?: string) {
  const l: Locale = locale === 'en' ? 'en' : 'es';
  let c = cache.get(l);
  if (!c) {
    c = {
      lang: l,
      site: resolve(siteData, l),
      projects: projectData.map((p) => resolve(p, l)) as Project[],
      polaroids: polaroidData.map((p) => resolve(p, l)) as Polaroid[],
      sheet: sheetData.map((x) => resolve(x, l)) as SheetItem[],
    };
    cache.set(l, c);
  }
  return c;
}

/** URL of the home page in a given language. */
export const homeHref = (l: Locale) => (l === 'en' ? '/en/' : '/');
