import { useContent, type Locale } from './site';
import { useContact, contactPath } from './contact';
import type { NavItem } from '../components/Nav.astro';
import type { StickerType } from '../components/EcoSticker.astro';

/**
 * ─────────────────────────────────────────────────────────────────────
 *  ALL THE COPY OF /ecommerce (es) AND /en/ecommerce LIVES HERE.
 *  The page is a sales page for Liam's custom headless e-commerce service
 *  (Next.js storefronts decoupled from the commerce engine, Vendure).
 *
 *  TRUTH RULES. Every claim must come from one of:
 *   · src/content/site.ts  → the "commerce" project (Headless Commerce), impact metrics, bio, stack, socials
 *   · src/content/contact.ts → the "what happens next" steps and the public email
 *   · what is visible on the five live stores (their public home pages)
 *  Do NOT add prices, delivery times, guarantees, discounts, testimonials, ratings,
 *  client counts, revenue / conversion / speed percentages, "limited spots" or urgency
 *  unless the owner supplies real data for them.
 *
 *  Voice: Argentine Spanish ("vos") to match src/content/site.ts, plain English for /en.
 * ─────────────────────────────────────────────────────────────────────
 */

/** The two URLs of this page: nav language switch + hreflang. */
export const ecommercePath: Record<Locale, string> = { es: '/ecommerce/', en: '/en/ecommerce/' };

export interface EcoStore {
  /** key of the screenshots in /public/img/ecommerce: `<id>-site.webp` and `<id>-phone.webp` */
  id: string;
  name: string;
  url: string;
  host: string;
  category: string;
  summary: string;
  /** things you can see on the live store */
  features: string[];
  tags: string[];
  alt: { site: string; phone: string };
}

/** Screenshots are 1440x900 (desktop) and 600x1298 (390x844 phone at 2x). */
export const SHOT = { site: { w: 1440, h: 900 }, phone: { w: 600, h: 1298 } } as const;

const cache = new Map<Locale, ReturnType<typeof build>>();

function build(lang: Locale) {
  const L = (es: string, en: string) => (lang === 'es' ? es : en);
  const { site } = useContent(lang);
  const contact = useContact(lang);
  const contactHref = contactPath[lang];

  /* ───────────── The five real stores ───────────── */
  const stores: EcoStore[] = [
    {
      id: 'floridahome',
      name: 'Florida Home Furniture',
      url: 'https://www.floridahomefurniture.com/',
      host: 'floridahomefurniture.com',
      category: L('Muebles · Miami, FL', 'Furniture · Miami, FL'),
      summary: L(
        'Mueblería de Miami con un storefront a medida: colecciones por ambiente, listado de productos con orden y filtros, y carrito.',
        'A Miami furniture store with a custom storefront: collections by room, a product listing with sorting and filters, and a cart.',
      ),
      features: [
        L('Colecciones por categoría', 'Collections by category'),
        L('Listado con orden y filtros', 'Listing with sorting and filters'),
        L('Carrito y botón de WhatsApp', 'Cart and WhatsApp button'),
      ],
      tags: [L('Storefront a medida', 'Custom storefront'), L('Catálogo', 'Catalog')],
      alt: {
        site: L('Home de Florida Home Furniture en el navegador', 'Florida Home Furniture home page in a browser'),
        phone: L('Florida Home Furniture en un celular', 'Florida Home Furniture on a phone'),
      },
    },
    {
      id: 'easyhomebr',
      name: 'Easy Home Appliances',
      url: 'https://www.easyhomeappliancesbr.com/',
      host: 'easyhomeappliancesbr.com',
      category: L('Electrodomésticos · Miami, FL', 'Appliances · Miami, FL'),
      summary: L(
        'Casa de electrodomésticos de Miami: buscador, categorías y marcas, carrito y pago con tarjeta procesado por Stripe.',
        'A Miami appliance store: search, categories and brands, a cart and card payments processed by Stripe.',
      ),
      features: [
        L('Buscador, categorías y marcas', 'Search, categories and brands'),
        L('Pago con tarjeta vía Stripe', 'Card payments through Stripe'),
        L('Español e inglés, y WhatsApp', 'Spanish and English, plus WhatsApp'),
      ],
      tags: [L('Storefront a medida', 'Custom storefront'), L('Pagos', 'Payments'), L('Bilingüe', 'Bilingual')],
      alt: {
        site: L('Home de Easy Home Appliances en el navegador', 'Easy Home Appliances home page in a browser'),
        phone: L('Easy Home Appliances en un celular', 'Easy Home Appliances on a phone'),
      },
    },
    {
      id: 'discount305',
      name: '305 Discount',
      url: 'https://305discount.com/',
      host: '305discount.com',
      category: L('Muebles y electrodomésticos · Miami, FL', 'Furniture and appliances · Miami, FL'),
      summary: L(
        'Muebles, electrodomésticos y colchones en un solo catálogo, con buscador, categorías, marcas y productos destacados.',
        'Furniture, appliances and mattresses in a single catalog, with search, categories, brands and featured products.',
      ),
      features: [
        L('Buscador y categorías', 'Search and categories'),
        L('Navegación por marca', 'Browse by brand'),
        L('Español e inglés, y WhatsApp', 'Spanish and English, plus WhatsApp'),
      ],
      tags: [L('Storefront a medida', 'Custom storefront'), L('Catálogo', 'Catalog'), L('Bilingüe', 'Bilingual')],
      alt: {
        site: L('Home de 305 Discount en el navegador', '305 Discount home page in a browser'),
        phone: L('305 Discount en un celular', '305 Discount on a phone'),
      },
    },
    {
      id: 'mendohome',
      name: 'Mendo Home Furniture',
      url: 'https://www.mendohomefurniture.com/',
      host: 'mendohomefurniture.com',
      category: L('Muebles de diseño · Miami, FL', 'Design furniture · Miami, FL'),
      summary: L(
        'Muebles contemporáneos y diseño interior, con colecciones por tipo de seccional, carrito y pago con tarjeta vía Stripe.',
        'Contemporary furniture and interior design, with collections by sectional type, a cart and card payments through Stripe.',
      ),
      features: [
        L('Colecciones por tipo de producto', 'Collections by product type'),
        L('Pago con tarjeta vía Stripe', 'Card payments through Stripe'),
        L('Español e inglés, y WhatsApp', 'Spanish and English, plus WhatsApp'),
      ],
      tags: [L('Storefront a medida', 'Custom storefront'), L('Pagos', 'Payments'), L('Bilingüe', 'Bilingual')],
      alt: {
        site: L('Home de Mendo Home Furniture en el navegador', 'Mendo Home Furniture home page in a browser'),
        phone: L('Mendo Home Furniture en un celular', 'Mendo Home Furniture on a phone'),
      },
    },
    {
      id: 'romeoflorida',
      name: 'Romeo Furniture',
      url: 'https://www.romeofloridafurniture.com/',
      host: 'romeofloridafurniture.com',
      category: L('Sofás y seccionales · Miami, FL', 'Sofas and sectionals · Miami, FL'),
      summary: L(
        'Sofás y seccionales con catálogo por categoría y colección, carrito y consultas por WhatsApp antes de comprar.',
        'Sofas and sectionals with a catalog by category and collection, a cart and WhatsApp questions before buying.',
      ),
      features: [
        L('Catálogo por categoría y colección', 'Catalog by category and collection'),
        L('Carrito y cuenta de cliente', 'Cart and customer account'),
        L('Español e inglés, y WhatsApp', 'Spanish and English, plus WhatsApp'),
      ],
      tags: [L('Storefront a medida', 'Custom storefront'), L('Catálogo', 'Catalog'), L('Bilingüe', 'Bilingual')],
      alt: {
        site: L('Home de Romeo Furniture en el navegador', 'Romeo Furniture home page in a browser'),
        phone: L('Romeo Furniture en un celular', 'Romeo Furniture on a phone'),
      },
    },
  ];

  return {
    lang,
    contactHref,
    stores,

    meta: {
      title: L('E-commerce a medida con Next.js y Vendure | Liam Marega', 'Custom Headless E-commerce with Next.js | Liam Marega'),
      description: L(
        'Tiendas online a medida con Next.js y Vendure: storefront desacoplado, catálogo, checkout y pagos. 5 tiendas reales en producción. Remoto desde Argentina.',
        'Custom online stores with Next.js and Vendure: decoupled storefront, catalog, checkout and payments. 5 live stores in production. Remote, from Argentina.',
      ),
      og: '/og-ecommerce.png',
    },

    nav: {
      items: [
        { key: 'casos', label: L('Casos', 'Work'), href: '#casos', section: 'casos' },
        { key: 'incluye', label: L('Qué incluye', 'What’s included'), href: '#incluye', section: 'incluye', hide: 'xs' },
        { key: 'proceso', label: L('Proceso', 'Process'), href: '#proceso', section: 'proceso', hide: 'sm' },
        { key: 'faq', label: 'FAQ', href: '#faq', section: 'faq', hide: 'sm' },
      ] satisfies NavItem[],
      cta: { label: L('Hablemos', 'Connect'), href: contactHref },
    },

    hero: {
      /** the same "open to projects" line the home page shows */
      availability: site.available,
      titleLead: L('Tiendas online a medida,', 'Custom online stores,'),
      /** every letter swaps for a sticker on hover */
      titleWord: L('headless.', 'headless.'),
      stickers: ['bag', 'cart', 'card', 'star', 'heart'] as StickerType[],
      note: L('sin plantillas =)', 'no templates =)'),
      sub: L(
        'Desarrollo storefronts en Next.js desacoplados del motor de e-commerce (Vendure): catálogo, checkout y pagos pensados para tu negocio. Soy Liam y trabajás directo conmigo.',
        'I build Next.js storefronts decoupled from the commerce engine (Vendure): catalog, checkout and payments shaped around your business. I’m Liam, and you work with me directly.',
      ),
      cta: L('Contame tu tienda', 'Start your store'),
      ctaNote: L('Completás un formulario corto y te escribo por email.', 'Fill in a short form and I’ll email you back.'),
      secondary: L('Ver tiendas reales', 'See live stores'),
      trust: [L('Next.js + Vendure', 'Next.js + Vendure'), L('Storefront desacoplado del motor', 'Storefront decoupled from the engine'), L('Tiendas reales en producción', 'Real stores in production')],
      visual: {
        label: L('Capturas de tiendas reales que construí: cada pocos segundos cambia la tienda', 'Screenshots of real stores I built: the store changes every few seconds'),
        note: L('tiendas de verdad =)', 'real stores =)'),
        badge: { value: '5', label: L('tiendas en producción', 'stores in production') },
        live: L('Ver en vivo', 'Visit live'),
      },
    },

    /** numbers that already appear in src/content/site.ts (impact + the commerce project metrics) */
    stats: {
      label: L('El trabajo en números', 'The work in numbers'),
      items: [
        { value: L('1.000+', '1,000+'), label: L('productos migrados a e-commerce headless', 'products migrated into headless commerce') },
        { value: '5', label: L('tiendas en producción', 'stores in production') },
        { value: 'Miami, FL', label: L('showrooms reales', 'real showrooms') },
        { value: '4+', label: L('años lanzando software a producción', 'years shipping production software') },
      ],
    },

    pains: {
      note: L('seamos honestos =)', 'let’s be honest =)'),
      title: L('¿Te suena alguna?', 'Sound familiar?'),
      items: [
        { icon: 'Copy', title: L('Tu tienda se ve igual a las demás', 'Your store looks like everyone else’s'), text: L('Corre sobre un tema y tu marca se pierde entre las que usan el mismo.', 'It runs on a theme, so your brand gets lost among the others using it.') },
        { icon: 'Hourglass', title: L('En el celular se siente lenta', 'It feels slow on a phone'), text: L('Un front pesado le pone fricción a cada visita antes de que llegue al producto.', 'A heavy front end adds friction to every visit before people reach the product.') },
        { icon: 'Boxes', title: L('Tu catálogo es grande y cuesta manejarlo', 'Your catalog is big and hard to manage'), text: L('Cargar, migrar y mantener cientos de productos a mano no escala.', 'Loading, migrating and maintaining hundreds of products by hand doesn’t scale.') },
        { icon: 'MessagesSquare', title: L('Vendés por WhatsApp a mano', 'You sell over WhatsApp by hand'), text: L('Respondés lo mismo una y otra vez y anotás los pedidos en el chat.', 'You answer the same questions again and again and jot orders down in the chat.') },
        { icon: 'Lock', title: L('El motor de la tienda te ata', 'Your store engine locks you in'), text: L('Cada cambio de diseño o de lógica depende de la plataforma, sus plugins y su tema.', 'Every design or logic change depends on the platform, its plugins and its theme.') },
        { icon: 'Workflow', title: L('Tu operación no entra en una plantilla', 'Your operation doesn’t fit a template'), text: L('Reglas de negocio, integraciones o automatizaciones que la plataforma no resuelve de fábrica.', 'Business rules, integrations or automations the platform doesn’t cover out of the box.') },
      ],
      idle: L('Tocá las que te pasan.', 'Tap the ones that apply.'),
      one: L('Te pasa 1 de 6. Es justo el tipo de problema que resuelvo.', 'That’s 1 of 6. It’s exactly the kind of problem I work on.'),
      some: L('Te pasan {n} de 6. Es justo el tipo de problema que resuelvo.', 'That’s {n} of 6. It’s exactly the kind of problem I work on.'),
      all: L('Te pasan las 6. Contame tu caso y vemos por dónde empezar.', 'All 6. Tell me about your case and we’ll see where to start.'),
      cta: L('Contame tu caso', 'Tell me your case'),
    },

    method: {
      note: L('cómo trabajo', 'how I work'),
      title: [L('Primero entiendo cómo vende tu negocio.', 'First I understand how your business sells.'), L('Después lo construyo.', 'Then I build it.')],
      intro: L(
        'Una plantilla está pensada para cualquier tienda; la tuya tiene un catálogo, una operación y clientes propios. Construyo el storefront en Next.js y lo conecto al motor de e-commerce, Vendure: es una arquitectura de storefront desacoplado, donde el front y el motor evolucionan por separado.',
        'A template is made for any store; yours has its own catalog, operation and customers. I build the storefront in Next.js and connect it to the commerce engine, Vendure: a decoupled storefront architecture, where the front end and the engine evolve separately.',
      ),
      name: L('storefront desacoplado', 'decoupled storefront'),
      pillars: [
        {
          tag: L('a medida', 'custom'),
          title: L('Storefront a medida en Next.js', 'A custom Next.js storefront'),
          text: L('Diseño e implemento la interfaz de tu tienda desde cero, con tu marca y tu forma de vender, no a partir de un tema.', 'I design and build your store’s interface from scratch, around your brand and the way you sell, not from a theme.'),
          art: L('tu marca', 'your brand'),
        },
        {
          tag: L('desacoplado', 'decoupled'),
          title: L('Conectado a un motor de e-commerce', 'Connected to a commerce engine'),
          text: L('El storefront habla con Vendure: catálogo, carrito, checkout y pagos pasan por el motor, y el front puede cambiar sin tocar el backend.', 'The storefront talks to Vendure: catalog, cart, checkout and payments go through the engine, and the front end can change without touching the backend.'),
          flow: ['Next.js', 'API', 'Vendure', L('Pedido', 'Order')],
        },
        {
          tag: L('operación real', 'real operation'),
          title: L('Catálogo y operación', 'Catalog and operations'),
          text: L('Migración de catálogo, scraping y automatización, lógica de negocio a medida e infraestructura en Railway y Vercel.', 'Catalog migration, scraping and automation, custom business logic and Railway / Vercel infrastructure.'),
          art: L('catálogo', 'catalog'),
        },
      ],
    },

    cases: {
      note: L('tiendas que hoy están en producción', 'stores in production today'),
      title: L('Casos reales', 'Real work'),
      intro: L('Tiendas de Miami, FL que construí con Next.js y Vendure. Podés visitarlas en vivo.', 'Miami, FL stores I built with Next.js and Vendure. You can visit them live.'),
      features: L('Qué se ve en la tienda', 'What you see in the store'),
      tagsLabel: L('Qué se hizo', 'What was built'),
      visit: L('Ver tienda en vivo', 'Visit the live store'),
      band: { text: L('¿Querés una tienda así?', 'Want a store like these?'), cta: L('Contame tu proyecto', 'Tell me about your project') },
    },

    included: {
      note: L('lo que construyo', 'what I build'),
      title: L('Qué puede incluir tu tienda', 'What your store can include'),
      intro: L('Cada proyecto arma su propio alcance. Estas son las piezas con las que trabajo en mis tiendas.', 'Every project sets its own scope. These are the pieces I work with in my stores.'),
      includes: L('Incluye', 'Includes'),
      /** animated chips of the big card */
      tags: [
        { label: 'Next.js', icon: 'globe', tone: 'lime' },
        { label: 'Vendure', icon: 'cart', tone: 'mint' },
        { label: L('Checkout', 'Checkout'), icon: 'card', tone: 'blue' },
        { label: L('Catálogo', 'Catalog'), icon: 'pen', tone: 'orange' },
        { label: 'WhatsApp', icon: 'phone', tone: 'violet' },
      ],
      items: [
        { icon: 'LayoutTemplate', title: L('Storefront a medida', 'Custom storefront'), text: L('Interfaz en Next.js pensada para tu marca y tu forma de vender.', 'A Next.js interface shaped around your brand and the way you sell.') },
        { icon: 'Boxes', title: L('Migración de catálogo', 'Catalog migration'), text: L('Pasar tus productos a un e-commerce headless.', 'Moving your products into headless commerce.') },
        { icon: 'Search', title: L('Búsqueda y filtros', 'Search and filters'), text: L('Para encontrar productos en catálogos grandes.', 'To find products in large catalogs.') },
        { icon: 'CreditCard', title: L('Checkout y pagos', 'Checkout and payments'), text: L('Integraciones de pago como Stripe y un checkout armado para tu operación.', 'Payment integrations such as Stripe and a checkout built for your operation.') },
        { icon: 'Workflow', title: L('Scraping y automatización', 'Scraping and automation'), text: L('Automatización de catálogo y de tareas repetitivas.', 'Catalog automation and repetitive tasks.') },
        { icon: 'Blocks', title: L('Lógica de negocio', 'Business logic'), text: L('Reglas propias de tu negocio sobre el motor de e-commerce.', 'Your own business rules on top of the commerce engine.') },
        { icon: 'MessageCircle', title: L('Ventas por WhatsApp', 'WhatsApp sales'), text: L('Contacto directo con tu equipo para consultas y ventas.', 'Direct contact with your team for questions and sales.') },
        { icon: 'Server', title: L('Infraestructura', 'Infrastructure'), text: L('Deploy en Railway y Vercel.', 'Deployed on Railway and Vercel.') },
      ],
    },

    /** replaces the old pricing section: no list prices, quotes depend on scope */
    quote: {
      note: L('sin precios de lista', 'no list prices'),
      text: L('Cada tienda tiene su propio alcance, por eso cotizo a medida.', 'Every store has its own scope, so I quote on a per-project basis.'),
      cta: L('Pedir una cotización', 'Ask for a quote'),
    },

    process: {
      note: L('cada proyecto marca su ritmo', 'every project sets its own pace'),
      title: L('De la primera charla a la tienda en producción', 'From the first chat to a store in production'),
      steps: [
        { title: L('Conversación', 'Conversation'), text: L('Me contás tu negocio, tu catálogo y lo que tenés hoy. Si headless no es lo que te conviene, te lo digo.', 'You tell me about your business, your catalog and what you have today. If headless isn’t what suits you, I’ll say so.') },
        { title: L('Propuesta', 'Proposal'), text: L('Si avanzamos, te paso una propuesta con alcance, plazos y precio.', 'If we go ahead, I send a proposal with scope, timeline and price.') },
        { title: L('Arquitectura y diseño', 'Architecture and design'), text: L('Defino cómo se conecta el storefront con el motor y diseño las pantallas clave: catálogo, producto, carrito y checkout.', 'I define how the storefront connects to the engine and design the key screens: catalog, product, cart and checkout.') },
        { title: L('Desarrollo e integraciones', 'Build and integrations'), text: L('Construyo el storefront en Next.js, migro el catálogo y conecto checkout, pagos y lo que pida tu operación.', 'I build the storefront in Next.js, migrate the catalog and connect checkout, payments and whatever your operation needs.') },
        { title: L('Producción', 'Production'), text: L('Se publica en Vercel y Railway y queda listo para seguir evolucionando con tu negocio.', 'It goes live on Vercel and Railway, ready to keep evolving with your business.') },
      ],
    },

    about: {
      note: L('quién está del otro lado', 'who’s on the other side'),
      /** "Hola, soy" + the first name of site.name */
      hello: L('Hola, soy', 'Hi, I’m'),
      text: [
        L(
          'Soy developer frontend y mobile, con más de 4 años lanzando productos a producción. Construyo e-commerce a medida donde el storefront está completamente desacoplado del motor de comercio.',
          'I’m a frontend and mobile developer with 4+ years shipping products to production. I build custom e-commerce where the storefront is completely decoupled from the commerce engine.',
        ),
        L(
          'Trabajo de forma independiente y a distancia desde Entre Ríos, Argentina, así que hablás directo con quien construye tu tienda.',
          'I work independently and remotely from Entre Ríos, Argentina, so you talk directly to the person building your store.',
        ),
      ],
      values: [
        { label: 'Next.js', icon: 'sparkle', tone: 'blue' },
        { label: 'Vendure', icon: 'bolt', tone: 'mint' },
        { label: 'TypeScript', icon: 'cursor', tone: 'orange' },
      ],
      photo: { src: '/images/uploads/liam.jpg', alt: L('Liam Marega, developer frontend y mobile', 'Liam Marega, frontend and mobile developer'), caption: site.location, w: 1000, h: 985 },
    },

    compare: {
      note: L('sin vueltas', 'no sugarcoating'),
      title: L('Cada opción, en qué es buena', 'Each option, and what it’s good at'),
      /** the last column is mine: it shows first on phones */
      columns: [L('Tienda de plantilla (SaaS)', 'Template store (SaaS)'), L('Monolito con tema', 'Monolith with a theme'), L('Headless a medida', 'Custom headless')],
      /** tone drives the little mark: yes = strength, meh = trade-off, no = limit, none = no mark */
      rows: [
        {
          label: L('Diseño', 'Design'),
          values: [
            { text: L('Limitado por el tema', 'Limited by the theme'), tone: 'no' },
            { text: L('Personalizable dentro de lo que permite el tema', 'Customizable within what the theme allows'), tone: 'meh' },
            { text: L('Libre: el front es código propio', 'Free: the front end is your own code'), tone: 'yes' },
          ],
        },
        {
          label: L('Puesta en marcha', 'Getting started'),
          values: [
            { text: L('La más rápida y simple de arrancar', 'The quickest and simplest to start'), tone: 'yes' },
            { text: L('Hay que configurar tema y plugins', 'You configure a theme and plugins'), tone: 'meh' },
            { text: L('Más trabajo inicial: se construye el front', 'More upfront work: the front end gets built'), tone: 'meh' },
          ],
        },
        {
          label: L('Flexibilidad técnica', 'Technical flexibility'),
          values: [
            { text: L('Hasta donde llega la plataforma', 'As far as the platform goes'), tone: 'no' },
            { text: L('Depende de plugins y del tema', 'Depends on plugins and the theme'), tone: 'meh' },
            { text: L('Integraciones y lógica de negocio a medida', 'Custom integrations and business logic'), tone: 'yes' },
          ],
        },
        {
          label: L('Cambiar de motor', 'Changing the engine'),
          values: [
            { text: L('Implica rehacer la tienda', 'Means rebuilding the store'), tone: 'no' },
            { text: L('Implica rehacer la tienda', 'Means rebuilding the store'), tone: 'no' },
            { text: L('El front es independiente del motor, así que el cambio es más acotado', 'The front end is independent from the engine, so the change is more contained'), tone: 'yes' },
          ],
        },
        {
          label: L('Mantenimiento', 'Maintenance'),
          values: [
            { text: L('La plataforma se ocupa de casi todo', 'The platform takes care of almost everything'), tone: 'yes' },
            { text: L('Actualizaciones de núcleo, tema y plugins', 'Core, theme and plugin updates'), tone: 'meh' },
            { text: L('Hay más piezas: front y motor', 'More moving parts: front end and engine'), tone: 'meh' },
          ],
        },
        {
          label: L('Suele convenir cuando', 'Usually fits when'),
          values: [
            { text: L('El catálogo es chico y no necesitás nada especial', 'The catalog is small and you need nothing special'), tone: 'none' },
            { text: L('Querés algo conocido con muchos plugins', 'You want something familiar with plenty of plugins'), tone: 'none' },
            { text: L('Tu marca o tu operación ya no entran en una plantilla', 'Your brand or operation no longer fits a template'), tone: 'none' },
          ],
        },
      ],
      closer: [L('Headless no es para todos.', 'Headless isn’t for everyone.'), L('Es para cuando una plantilla ya no alcanza.', 'It’s for when a template stops being enough.')],
    },

    faq: {
      note: L('lo que suelen preguntar', 'what people ask'),
      title: L('Preguntas frecuentes', 'Frequently asked questions'),
      items: [
        {
          q: L('¿Qué es un e-commerce headless?', 'What is headless e-commerce?'),
          a: L(
            'Es una tienda donde el storefront, lo que ve y usa tu cliente, está separado del motor de e-commerce que maneja catálogo, carrito, pedidos y pagos. Yo construyo el storefront en Next.js y lo conecto a Vendure.',
            'It’s a store where the storefront, what your customer sees and uses, is separate from the commerce engine that handles catalog, cart, orders and payments. I build the storefront in Next.js and connect it to Vendure.',
          ),
        },
        {
          q: L('¿Con qué tecnologías trabajás?', 'What technologies do you use?'),
          a: L(
            'Next.js y TypeScript en el front; Vendure como motor de e-commerce, con PostgreSQL; Stripe para pagos con tarjeta; e infraestructura en Railway y Vercel.',
            'Next.js and TypeScript on the front end; Vendure as the commerce engine, with PostgreSQL; Stripe for card payments; and Railway and Vercel for infrastructure.',
          ),
        },
        {
          q: L('¿Cuánto cuesta y cuánto tarda?', 'How much does it cost and how long does it take?'),
          a: L(
            'Depende del alcance: tamaño del catálogo, integraciones y lógica de negocio. Por eso no tengo precios de lista: después de entender tu proyecto te paso una propuesta con alcance, plazos y precio.',
            'It depends on the scope: catalog size, integrations and business logic. That’s why I don’t have list prices: once I understand your project I send a proposal with scope, timeline and price.',
          ),
        },
        {
          q: L('¿Pueden migrar mi catálogo actual?', 'Can you migrate my current catalog?'),
          a: L(
            'Sí, es parte del trabajo: migré más de 1.000 productos a e-commerce headless, y cuando hace falta lo complemento con scraping y automatización de catálogo.',
            'Yes, it’s part of the work: I’ve migrated 1,000+ products into headless commerce, and when needed I add scraping and catalog automation.',
          ),
        },
        {
          q: L('¿Una tienda headless es para mí?', 'Is a headless store right for me?'),
          a: L(
            'Si tu catálogo es chico y no necesitás nada fuera de lo común, una plantilla puede alcanzar y es más simple de mantener. Headless tiene más sentido cuando tu marca, tu catálogo o tu operación piden algo a medida. En la primera charla lo vemos con honestidad.',
            'If your catalog is small and you need nothing out of the ordinary, a template may be enough and is simpler to maintain. Headless makes more sense when your brand, catalog or operation call for something custom. We’ll look at it honestly in the first chat.',
          ),
        },
        {
          q: L('¿Trabajás con tiendas de otros países?', 'Do you work with stores in other countries?'),
          a: L(
            'Sí. Trabajo de forma remota desde Entre Ríos, Argentina, y las tiendas que muestro acá son de Miami, FL.',
            'Yes. I work remotely from Entre Ríos, Argentina, and the stores I show here are in Miami, FL.',
          ),
        },
        {
          q: L('¿Se puede vender por WhatsApp además de la web?', 'Can you also sell over WhatsApp, not just on the site?'),
          a: L(
            'Sí. En las tiendas que construí, WhatsApp es parte del flujo de venta: el cliente puede consultar con el equipo antes de comprar.',
            'Yes. In the stores I built, WhatsApp is part of the sales flow: customers can ask the team before buying.',
          ),
        },
        {
          q: L('¿Cómo empiezo?', 'How do I get started?'),
          a: L(
            'Escribime desde el formulario de contacto contando qué tenés hoy y qué querés lograr. Te respondo por email para ver si encajo y coordinar una charla.',
            'Write to me through the contact form telling me what you have today and what you want to achieve. I’ll email you to see if I’m a good fit and set up a chat.',
          ),
        },
      ],
    },

    close: {
      note: L('el primer paso es una charla =)', 'the first step is a chat =)'),
      title: [L('¿Armamos', 'Shall we build'), L('tu tienda?', 'your store?')],
      text: L('Contame qué vendés, qué tenés hoy y qué te gustaría que haga tu tienda. Con eso vemos si encajo y por dónde empezar.', 'Tell me what you sell, what you have today and what you want your store to do. From there we’ll see if I’m a fit and where to start.'),
      cta: L('Contame tu tienda', 'Start your store'),
      /** "what happens next" and the direct-email line are the ones of the contact form page */
      nextTitle: contact.nextTitle,
      next: contact.next,
      direct: contact.direct,
    },

    /** bottom bar on phones (appears after the hero) */
    sticky: { text: L('¿Tenés una tienda en mente?', 'Got a store in mind?'), cta: L('Hablemos', 'Let’s talk') },

    footer: L('Tiendas online a medida con Next.js y Vendure.', 'Custom online stores with Next.js and Vendure.'),
  };
}

/** Everything /ecommerce needs, in one language. */
export function useEcommerce(locale?: string) {
  const l: Locale = locale === 'en' ? 'en' : 'es';
  let c = cache.get(l);
  if (!c) {
    c = build(l);
    cache.set(l, c);
  }
  return c;
}
