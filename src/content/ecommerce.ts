import type { LeadFormConfig } from '../lib/forms';
import { site, type LogoId, type MediaItem } from './site';
import type { NavItem } from '../components/Nav.astro';
import type { StickerType } from '../components/Sticker.astro';

/**
 * ─────────────────────────────────────────────────────────────────────
 *  TODO EL CONTENIDO DE /ecommerce VIVE ACÁ.
 *  Página de venta para conseguir marcas que necesitan una tienda online.
 *  El orden de los bloques es el del embudo (ver src/pages/ecommerce.astro).
 *
 *  ⚠️ ANTES DE PUBLICAR
 *  · [RELLENO]   números, casos y testimonios de ejemplo. Cámbialos por los tuyos
 *                o borra el bloque: nunca publiques resultados que no son reales.
 *  · [CONFIRMAR] promesas comerciales (cupos, garantía, formas de pago, plazos).
 *                Déjalas solo si las vas a cumplir.
 *  Los textos están en español neutro con "tú". Para pasarlos a "vos" alcanza con este archivo.
 * ─────────────────────────────────────────────────────────────────────
 */

/* ───────────── Formulario (paso a paso) ───────────── */
const form: LeadFormConfig = {
  source: 'ecommerce',
  lang: 'es',
  hidden: [
    // se llena solo cuando alguien toca "Quiero este plan" en los precios
    { name: 'plan', label: 'Plan elegido', chip: true },
    // se llena con los problemas que la persona marcó en "¿Te suena alguna?"
    { name: 'pains', label: 'Problemas que marcó' },
  ],
  steps: [
    {
      title: '¿Qué necesitas?',
      fields: [
        {
          kind: 'choice',
          name: 'need',
          label: 'Qué necesita',
          required: true,
          options: [
            { label: 'Una tienda nueva desde cero', icon: 'Store' },
            { label: 'Rediseñar mi tienda actual', icon: 'Paintbrush' },
            { label: 'Pasar mi tienda a otra plataforma', icon: 'ArrowLeftRight' },
            { label: 'Una landing que venda un producto', icon: 'Rocket' },
            { label: 'Otra cosa', icon: 'MessageCircle' },
          ],
        },
      ],
    },
    {
      title: 'Cuéntame de tu marca',
      fields: [
        {
          kind: 'text',
          name: 'product',
          label: '¿Qué vendes?',
          placeholder: 'Ej.: café de especialidad, ropa deportiva…',
          required: true,
          maxlength: 160,
        },
        {
          kind: 'choice',
          name: 'channels',
          label: '¿Dónde vendes hoy?',
          multiple: true,
          look: 'chips',
          options: [
            { label: 'Instagram' },
            { label: 'WhatsApp' },
            { label: 'Marketplace' },
            { label: 'Tienda online propia' },
            { label: 'Local físico' },
            { label: 'Todavía no vendo' },
          ],
        },
        { kind: 'url', name: 'link', label: 'Link de tu marca', placeholder: '@tumarca o tumarca.com', maxlength: 200 },
      ],
    },
    {
      title: 'Hablemos de alcance',
      hint: 'Sin compromiso. Me ayuda a proponerte algo que tenga sentido para tu marca.',
      fields: [
        {
          kind: 'choice',
          name: 'budget',
          label: '¿Cuánto quieres invertir?',
          look: 'chips',
          required: true,
          options: [
            { label: 'Menos de US$ 1.000' },
            { label: 'US$ 1.000 a 2.500' },
            { label: 'US$ 2.500 a 5.000' },
            { label: 'Más de US$ 5.000' },
            { label: 'Prefiero que me orientes' },
          ],
        },
        {
          kind: 'choice',
          name: 'timing',
          label: '¿Para cuándo la necesitas?',
          look: 'chips',
          required: true,
          options: [{ label: 'Lo antes posible' }, { label: 'En 1 a 2 meses' }, { label: 'Sin apuro' }],
        },
      ],
    },
    {
      title: '¿A dónde te respondo?',
      fields: [
        { kind: 'text', name: 'name', label: 'Tu nombre', autocomplete: 'name', required: true, half: true, maxlength: 120 },
        { kind: 'email', name: 'email', label: 'Email', autocomplete: 'email', required: true, half: true, maxlength: 160 },
        { kind: 'tel', name: 'whatsapp', label: 'WhatsApp', placeholder: 'Con código de país', autocomplete: 'tel', maxlength: 40 },
        { kind: 'textarea', name: 'message', label: '¿Algo más que deba saber?', rows: 3, maxlength: 2000 },
      ],
    },
  ],
  text: {
    step: 'Paso {n} de {total}',
    next: 'Siguiente',
    back: 'Atrás',
    submit: 'Quiero mi propuesta',
    sending: 'Enviando…',
    optional: 'opcional',
    errors: {
      required: 'Este dato me hace falta.',
      choose: 'Elige una opción.',
      email: 'Revisa el email, parece que falta algo.',
      url: 'Revisa el link, parece que falta algo.',
    },
    privacy: 'Uso tus datos solo para responderte. Nada de spam.',
    chosen: 'Plan elegido:',
    clear: 'Quitar el plan elegido',
    success: {
      title: '¡Listo, {name}!',
      body: 'Ya tengo tus respuestas. En menos de 24 h hábiles te escribo a {email} para agendar la charla.',
      steps: ['Leo tus respuestas y miro tu marca', 'Te escribo para agendar 30 min', 'Recibes tu propuesta por escrito'],
    },
    error: {
      title: 'No se pudo enviar',
      body: 'Algo falló de mi lado. Mándamelo por email: tus respuestas ya van escritas.',
      mail: 'Enviar por email',
      retry: 'Intentar de nuevo',
      subject: 'Quiero una tienda',
      intro: '¡Hola! Te dejo mis respuestas del formulario:',
    },
  },
};

/* ───────────── Casos (proyectos de ejemplo) ───────────── */
export interface EcoCase {
  name: string;
  logo: LogoId;
  category: string;
  summary: string;
  stats: { value: string; label: string }[];
  tags: string[];
  media: MediaItem[];
}

const cases: EcoCase[] = [
  // [RELLENO] los 4 casos: marcas, números e imágenes son de ejemplo
  {
    name: 'Brasa Café',
    logo: 'bean',
    category: 'Café de especialidad',
    summary: 'Vendían solo por Instagram y anotaban los pedidos a mano. Hoy tienen tienda propia con suscripción mensual.',
    stats: [
      { value: '+212 %', label: 'ventas online en 4 meses' },
      { value: '38 %', label: 'de los pedidos son suscripción' },
      { value: '1,1 s', label: 'de carga en el celular' },
    ],
    tags: ['Tienda nueva', 'Suscripciones', 'Pagos locales'],
    media: [
      { src: '/img/ecommerce/brasa-phone.webp', alt: 'Ficha de producto de Brasa Café en un celular, con suscripción', w: 848, h: 960, left: 0, width: 37.4, top: 22, rotate: -2, hover: { x: -12, y: -74, rotate: -4.4, scale: 1.06 } },
      { src: '/img/ecommerce/brasa-site.webp', alt: 'Tienda de Brasa Café en una laptop', w: 1430, h: 960, left: 38.1, width: 63, top: 8, rotate: 1.2, hover: { x: 10, y: -44, rotate: 3.2, scale: 1.03 } },
    ],
  },
  {
    name: 'Flora Botánica',
    logo: 'sprout',
    category: 'Cosmética natural',
    summary: 'Tenían una plantilla linda que no vendía. Rediseñamos las fichas, armamos rutinas en combo y acortamos el checkout.',
    stats: [
      { value: 'x2,4', label: 'tasa de conversión' },
      { value: '+31 %', label: 'ticket promedio con combos' },
      { value: '−48 %', label: 'carritos abandonados' },
    ],
    tags: ['Rediseño', 'Combos', 'Checkout corto'],
    media: [
      { src: '/img/ecommerce/flora-site.webp', alt: 'Tienda de Flora Botánica en una laptop luminosa', w: 1430, h: 960, left: 0, width: 62.7, top: 4, rotate: -0.8, hover: { x: -10, y: -52, rotate: -2.8, scale: 1.04 } },
      { src: '/img/ecommerce/flora-phone.webp', alt: 'Armador de rutinas de Flora en un celular', w: 848, h: 960, left: 63.1, width: 37.4, top: 20, rotate: 1.6, hover: { x: 12, y: -72, rotate: 4.2, scale: 1.06 } },
    ],
  },
  {
    name: 'Pulso',
    logo: 'pulse',
    category: 'Ropa deportiva',
    summary: 'Su tienda tardaba 6 segundos en abrir. La pasamos a una plataforma nueva con 600 productos y sin perder un solo pedido.',
    stats: [
      { value: '0,9 s', label: 'de carga (antes 6,2 s)' },
      { value: '+64 %', label: 'ventas desde el celular' },
      { value: '600', label: 'productos migrados' },
    ],
    tags: ['Migración', 'Velocidad', 'Catálogo grande'],
    media: [
      { src: '/img/ecommerce/pulso-phone.webp', alt: 'Colección de zapatillas de Pulso con filtros en un celular', w: 848, h: 960, left: 0, width: 37.4, top: 26, rotate: -1.6, hover: { x: -12, y: -74, rotate: -4, scale: 1.06 } },
      { src: '/img/ecommerce/pulso-site.webp', alt: 'Tienda de Pulso en una laptop sobre fondo oscuro', w: 1430, h: 960, left: 38.1, width: 63, top: 4, rotate: 1.4, hover: { x: 10, y: -46, rotate: 3.4, scale: 1.03 } },
    ],
  },
  {
    name: 'Nido Casa',
    logo: 'house',
    category: 'Deco y textiles',
    summary: 'Vendían por WhatsApp con un catálogo en PDF. Ahora la tienda arma el pedido y el chat solo lo confirma.',
    stats: [
      { value: '+180', label: 'pedidos el primer mes' },
      { value: '4,1 %', label: 'tasa de conversión' },
      { value: '−60 %', label: 'mensajes repetidos' },
    ],
    tags: ['Tienda nueva', 'WhatsApp', 'Envíos por zona'],
    media: [
      { src: '/img/ecommerce/nido-site.webp', alt: 'Tienda de Nido Casa en una laptop', w: 1430, h: 960, left: 0, width: 62.7, top: 10, rotate: -1.2, hover: { x: -8, y: -56, rotate: -3, scale: 1.04 } },
      { src: '/img/ecommerce/nido-phone.webp', alt: 'Carrito de Nido Casa con botón de WhatsApp en un celular', w: 848, h: 960, left: 63.1, width: 37.4, top: 24, rotate: 1.8, hover: { x: 12, y: -70, rotate: 4.6, scale: 1.06 } },
    ],
  },
];

/* ───────────── Toda la página ───────────── */
export const ecommerce = {
  meta: {
    title: `Tiendas online a medida que venden | ${site.name}`,
    description:
      'Diseño y programo ecommerce a medida para marcas que quieren vender más: únicos, rápidos en el celular y fáciles de administrar. Precio cerrado y fecha por escrito.',
    og: '/og-ecommerce.png',
  },

  nav: {
    items: [
      { key: 'casos', label: 'Casos', href: '#casos', section: 'casos' },
      { key: 'proceso', label: 'Proceso', href: '#proceso', section: 'proceso', hide: 'xs' },
      { key: 'planes', label: 'Planes', href: '#planes', section: 'planes' },
      { key: 'faq', label: 'FAQ', href: '#faq', section: 'faq', hide: 'sm' },
    ] satisfies NavItem[],
    cta: { label: 'Hablemos', href: '#aplicar' },
  },

  hero: {
    // [CONFIRMAR] cámbialo cada mes; si no hay cupos reales, pon `availability: ''` y desaparece
    availability: 'Agenda abierta · 2 cupos para diciembre',
    titleLead: 'Una tienda a tu medida que',
    // cada letra se cambia por un sticker al pasar el mouse
    titleWord: 'vende.',
    stickers: ['bag', 'cart', 'card', 'star', 'heart'] as StickerType[],
    note: 'sin plantillas =)',
    sub: 'Diseño y programo tu ecommerce desde cero: con la cara de tu marca, rápido en el celular y pensado para que las visitas terminen en pedidos.',
    cta: 'Quiero mi tienda',
    ctaNote: 'Charla gratis de 30 min · Respuesta en 24 h',
    secondary: 'Ver tiendas que hice',
    trust: ['Precio cerrado', 'Fecha por escrito', 'La tienda es 100 % tuya'],
    visual: {
      image: { src: '/img/ecommerce/hero-store.webp', alt: 'Tienda online de ejemplo en una laptop', w: 1520, h: 1000 },
      note: 'así suena tu celular =)',
      app: 'Tu tienda',
      order: 'Nuevo pedido',
      now: 'ahora',
      ago: 'hace {n} min',
      counter: 'Ventas de hoy',
      currency: '$',
      // [RELLENO] pedidos decorativos que van llegando al celular
      start: 486300,
      orders: [
        { n: 1043, items: '2 productos', amount: 189900 },
        { n: 1044, items: 'Huila Lavado · 340 g', amount: 54900 },
        { n: 1045, items: '3 productos', amount: 236400 },
        { n: 1046, items: 'Rutina completa', amount: 148000 },
        { n: 1047, items: '1 producto', amount: 72500 },
        { n: 1048, items: '4 productos', amount: 312800 },
      ],
    },
  },

  // [RELLENO] pon tus números reales (o borra los que no tengas)
  stats: [
    { value: '40+', label: 'tiendas lanzadas' },
    { value: 'x2,3', label: 'conversión promedio después del rediseño' },
    { value: '1,3 s', label: 'de carga promedio en celular' },
    { value: '4,9/5', label: 'valoración de mis clientes' },
  ],

  pains: {
    note: 'seamos honestos =)',
    title: '¿Te suena alguna?',
    items: [
      { icon: 'Copy', title: 'Tu tienda se ve igual a otras mil', text: 'Elegiste una plantilla linda y tu marca se perdió entre todas las que usan la misma.' },
      { icon: 'MousePointerClick', title: 'Te visitan, pero no te compran', text: 'Llegan desde tus anuncios, miran dos productos y se van. Cada visita te costó plata.' },
      { icon: 'Hourglass', title: 'En el celular tarda una eternidad', text: 'Casi todos te compran desde el teléfono. Si la página tarda, se van antes de ver el precio.' },
      { icon: 'MessagesSquare', title: 'Vendes por WhatsApp a mano', text: 'Respondes lo mismo cien veces, anotas pedidos en el chat y alguno siempre se pierde.' },
      { icon: 'Ghost', title: 'El último desarrollador desapareció', text: 'Te dejó la tienda a medias, sin accesos ni explicaciones. Ahora nadie quiere tocarla.' },
      { icon: 'Lock', title: 'Cada cambio chico te cuesta días', text: 'Quieres cambiar un banner y dependes de alguien que contesta cuando puede.' },
    ],
    idle: 'Toca las que te pasan.',
    one: 'Te pasa 1 de 6. Tiene arreglo, y es justo lo que hago.',
    some: 'Te pasan {n} de 6. Todas tienen arreglo, y es justo lo que hago.',
    all: 'Te pasan las 6. Respira: es más común de lo que crees y todas tienen arreglo.',
    cta: 'Quiero resolverlo',
  },

  method: {
    note: 'mi método, sin misterio',
    title: ['Primero entiendo cómo te compran.', 'Después diseño.'],
    intro:
      'Una plantilla está hecha para cualquier tienda. La tuya tiene clientes con dudas, miedos y razones propias para comprar. Antes de diseñar una sola pantalla armo el mapa de compra de tu marca: qué buscan tus clientes, qué los frena y qué necesitan ver para animarse. Cada página de tu tienda responde una parte de ese mapa.',
    name: 'Mapa de compra',
    pillars: [
      {
        tag: 'creativo',
        title: 'Diseño desde cero',
        text: 'Tu tienda nace de tu marca, no de una plantilla. Colores, fotos, tono y detalles que hacen que te reconozcan sin ver el logo.',
      },
      {
        tag: 'pensado para vender',
        title: 'Cada página tiene un trabajo',
        text: 'Fichas que despejan dudas, carrito sin vueltas, checkout corto y los medios de pago que tu cliente ya usa.',
        flow: ['Producto', 'Carrito', 'Pago', '¡Pedido!'],
      },
      {
        tag: 'responsable',
        title: 'Fechas y precio por escrito',
        text: 'Sabes cuánto pagas y cuándo lanzas desde el primer día. Te muestro avances cada semana y respondo el mismo día.',
        launch: 'lanzamiento',
      },
    ],
  },

  cases: {
    note: 'tiendas que hoy están vendiendo',
    title: 'Casos que hablan por mí',
    intro: 'Cada una arrancó con un problema distinto. Ninguna arrancó de una plantilla.',
    items: cases,
    band: { text: '¿Quieres números así en tu tienda?', cta: 'Pedir mi propuesta' },
  },

  testimonials: {
    note: 'lo que dicen después de lanzar',
    title: 'Me volverían a elegir',
    // [RELLENO] testimonios de ejemplo: usa frases reales de tus clientes (con su permiso)
    items: [
      {
        quote: 'Cumplió cada fecha que puso. Hasta la del lanzamiento, que yo daba por hecho que se iba a correr.',
        name: 'Mariana R.',
        role: 'Fundadora de Brasa Café',
        tone: '#ffb27a',
      },
      {
        quote: 'Por primera vez la tienda se parece a mi marca. Y vende: en marzo facturamos lo mismo que en todo el año anterior.',
        name: 'Lucía G.',
        role: 'Flora Botánica',
        tone: '#bfd3b0',
      },
      {
        quote: 'Venía de dos agencias que me dejaron a medias. Esta vez la tienda estuvo lista en 5 semanas y el precio fue el que acordamos.',
        name: 'Tomás V.',
        role: 'Pulso',
        tone: '#e2ff6b',
      },
      {
        quote: 'Me explicó todo con paciencia. Hoy cargo productos y armo promociones sola, sin pedirle nada a nadie.',
        name: 'Andrea P.',
        role: 'Nido Casa',
        tone: '#f2b59a',
      },
    ],
  },

  included: {
    note: 'sin letra chica',
    title: 'Todo lo que trae tu tienda',
    intro: 'Viene en todos los planes. Sin extras escondidos ni apps que pagas aparte para cosas básicas.',
    // chips animados de la tarjeta grande
    tags: [
      { label: 'diseño único', icon: 'sparkle', tone: 'blue' },
      { label: 'checkout', icon: 'cart', tone: 'mint' },
      { label: 'pagos', icon: 'card', tone: 'lime' },
      { label: 'velocidad', icon: 'bolt', tone: 'violet' },
      { label: 'envíos', icon: 'truck', tone: 'orange' },
    ],
    items: [
      { icon: 'Palette', title: 'Diseño único para tu marca', text: 'Se diseña desde tu identidad, no desde una plantilla.' },
      { icon: 'Smartphone', title: 'Pensada primero para celular', text: 'Ahí está la mayoría de tus ventas.' },
      { icon: 'Zap', title: 'Carga en menos de 2 segundos', text: 'Para que nadie se vaya esperando.' },
      { icon: 'ShoppingBag', title: 'Fichas de producto que venden', text: 'Fotos, beneficios, dudas resueltas y el botón a la vista.' },
      { icon: 'CreditCard', title: 'Checkout corto y pagos locales', text: 'Mercado Pago, Wompi, PayU, Stripe o la pasarela que uses.' },
      { icon: 'Truck', title: 'Envíos configurados', text: 'Tarifas por zona, retiro en tienda y seguimiento.' },
      { icon: 'MessageCircle', title: 'WhatsApp integrado', text: 'Botón, mensajes listos y pedidos que llegan ordenados.' },
      { icon: 'Search', title: 'SEO técnico desde el día uno', text: 'Para que Google te encuentre sin pagar anuncios.' },
      { icon: 'ChartLine', title: 'Píxel, Analytics y eventos', text: 'Meta, Google y TikTok midiendo bien cada venta.' },
      { icon: 'LayoutDashboard', title: 'Panel fácil de usar', text: 'Cargas productos y cambias precios sin ayuda.' },
      { icon: 'GraduationCap', title: 'Capacitación y videos', text: 'Una sesión en vivo y tutoriales cortos para tu equipo.' },
      { icon: 'LifeBuoy', title: '30 días de soporte', text: 'Después del lanzamiento sigo a tu lado.' },
    ],
  },

  process: {
    note: 'en promedio, de 4 a 6 semanas',
    title: 'De la primera charla a tu primer pedido',
    steps: [
      { when: 'Día 1', title: 'Charla de diagnóstico', text: '30 minutos, gratis. Me cuentas de tu marca y tus metas. Si no soy la persona indicada, te lo digo.' },
      { when: 'Día 2 a 3', title: 'Propuesta por escrito', text: 'Alcance, precio cerrado y fecha de lanzamiento. Sin sorpresas después.' },
      { when: 'Semana 1 a 2', title: 'Diseño que apruebas', text: 'Ves tu tienda en el celular y en la compu antes de programar. Incluye 2 rondas de cambios.' },
      { when: 'Semana 2 a 5', title: 'Desarrollo y carga', text: 'Programo, conecto pagos y envíos y cargo tus productos. Cada viernes te muestro avances.' },
      { when: 'Lanzamiento', title: 'Salimos a vender', text: 'Te capacito, revisamos juntos los primeros pedidos y te acompaño 30 días.' },
    ],
  },

  about: {
    note: 'quién está del otro lado',
    // "Hola, soy" + el primer nombre de site.name
    hello: 'Hola, soy',
    // [CONFIRMAR] tu historia real, en dos párrafos cortos
    text: [
      'Hace 7 años diseño y programo tiendas online para marcas de Latinoamérica. Trabajo con pocas marcas a la vez porque me gusta conocer cada negocio como si fuera mío.',
      'Soy diseñador y desarrollador, así que hablas directo con quien hace tu tienda. Sin intermediarios ni teléfono descompuesto.',
    ],
    values: [
      { label: 'creativo', icon: 'sparkle', tone: 'blue' },
      { label: 'responsable', icon: 'bolt', tone: 'mint' },
      { label: 'trato directo', icon: 'cursor', tone: 'orange' },
    ],
    photo: { src: '/img/story/studio.webp', alt: 'Escritorio soleado con un cuaderno de bocetos y café', caption: 'donde nacen las tiendas' },
  },

  compare: {
    note: 'sin vueltas',
    title: 'Tus opciones, una al lado de la otra',
    // la última columna es la tuya: se muestra primero en el celular
    columns: ['Plantilla por tu cuenta', 'Agencia grande', 'Conmigo'],
    rows: [
      { label: 'Diseño', values: ['Igual a miles de tiendas', 'Bueno, si pagas la tarifa', 'Único, hecho para tu marca'] },
      { label: 'Pensada para vender', values: ['Depende de ti', 'Depende del equipo que te toque', 'Sí, sobre tu mapa de compra'] },
      { label: 'Precio', values: ['Barato al inicio, caro en apps', 'Alto y con extras', 'Cerrado desde el primer día'] },
      { label: 'Con quién hablas', values: ['Con nadie', 'Con un ejecutivo de cuentas', 'Directo con quien diseña y programa'] },
      { label: 'Plazos', values: ['Cuando tengas tiempo', 'Largos y se estiran', 'Fecha de lanzamiento por escrito'] },
      { label: 'Después de lanzar', values: ['Te arreglas solo', 'Soporte por ticket', '30 días de acompañamiento'] },
    ],
    closer: ['No soy la opción más barata.', 'Soy la que no vas a tener que reemplazar.'],
  },

  pricing: {
    note: 'precio cerrado, siempre',
    title: 'Elige cómo empezamos',
    intro: 'Tres puntos de partida. En la charla ajustamos el alcance a tu marca y te paso el precio final por escrito.',
    // false = los precios se reemplazan por "Cotización en 48 h"
    showPrices: true,
    from: 'desde',
    quote: 'Cotización en 48 h',
    // [CONFIRMAR] precios, plazos y lo que incluye cada plan
    plans: [
      {
        id: 'lanzamiento',
        name: 'Lanzamiento',
        for: 'Para marcas que venden por redes y quieren su primera tienda.',
        price: 'US$ 1.200',
        time: 'Lista en 3 a 4 semanas',
        features: ['Diseño a medida de inicio, catálogo, producto y carrito', 'Hasta 50 productos cargados', 'Pagos, envíos y WhatsApp configurados', 'SEO técnico y analítica', 'Capacitación y 30 días de soporte'],
        cta: 'Quiero este plan',
      },
      {
        id: 'crecimiento',
        name: 'Crecimiento',
        badge: 'el más elegido',
        featured: true,
        for: 'Para marcas que ya venden y quieren vender más.',
        price: 'US$ 2.400',
        time: 'Lista en 4 a 6 semanas',
        features: [
          'Todo lo de Lanzamiento',
          'Mapa de compra completo de tu cliente',
          'Landing de producto para tus anuncios',
          'Combos, venta cruzada y recuperación de carritos',
          'Píxel de Meta y eventos de conversión',
          'Migración desde tu tienda actual',
          'Hasta 300 productos cargados',
        ],
        cta: 'Quiero este plan',
      },
      {
        id: 'a-medida',
        name: 'A medida',
        for: 'Para catálogos grandes o funciones especiales.',
        price: '',
        time: 'Plazo según alcance',
        features: ['Venta mayorista o B2B', 'Suscripciones y membresías', 'Integración con tu facturación o inventario', 'Varios países y monedas', 'Desarrollo headless a medida'],
        cta: 'Pedir cotización',
      },
    ],
    // [CONFIRMAR]
    terms: 'Pagas 50 % para empezar y 50 % al lanzar.',
    trust: ['Precio cerrado', 'Contrato y factura', 'Todo queda a tu nombre'],
  },

  guarantee: {
    note: 'lo pongo por escrito',
    title: 'Tranquilidad de punta a punta',
    // [CONFIRMAR] no publiques una garantía que no vas a cumplir
    items: [
      {
        icon: 'Paintbrush',
        title: 'Apruebas antes de pagar el resto',
        text: 'Ves y apruebas el diseño antes de que escriba una línea de código. Si después de dos rondas de cambios no te convence, frenamos ahí y no pagas el segundo 50 %.',
      },
      {
        icon: 'CalendarCheck',
        title: 'Fecha de lanzamiento en el contrato',
        text: 'Si me atraso por mi parte, te descuento un 5 % del total por cada semana de demora.',
      },
      {
        icon: 'KeyRound',
        title: 'Todo es tuyo',
        text: 'Dominio, tienda, accesos y código quedan a tu nombre desde el primer día. Nunca vas a depender de mí para entrar a tu propia tienda.',
      },
    ],
  },

  faq: {
    note: 'lo que todos preguntan',
    title: 'Preguntas frecuentes',
    items: [
      { q: '¿Cuánto tarda en estar lista mi tienda?', a: 'Entre 3 y 6 semanas según el plan. La fecha exacta va en la propuesta, por escrito.' },
      { q: '¿Con qué plataforma trabajas?', a: 'Con la que mejor le sirva a tu negocio: Shopify, WooCommerce o una tienda a medida. En la primera charla te explico pros y contras para tu caso.' },
      { q: '¿Voy a poder administrarla sin ayuda?', a: 'Sí. Te entrego un panel simple, una capacitación en vivo y videos cortos para cargar productos, cambiar precios y armar promociones.' },
      { q: '¿Cómo son los pagos?', a: '50 % para empezar y 50 % al lanzar. Puedes pagar por transferencia, tarjeta o PayPal, siempre con factura.' },
      { q: 'Ya tengo una tienda. ¿La puedes mejorar o migrar?', a: 'Sí. Rediseño tiendas que ya existen y migro productos, clientes y pedidos sin que pierdas ventas ni posicionamiento en Google.' },
      { q: '¿Qué pasa después del lanzamiento?', a: 'Tienes 30 días de soporte incluidos. Después, si quieres, seguimos con un plan mensual de mejoras.' },
      { q: '¿Trabajas con marcas de otros países?', a: 'Sí. Trabajo a distancia con marcas de toda Latinoamérica y España, en tu horario.' },
      { q: '¿Qué necesito tener listo para empezar?', a: 'Tu logo, fotos de tus productos y ganas de vender. Si te falta algo, te digo cómo resolverlo.' },
    ],
  },

  close: {
    note: 'el primer paso es gratis =)',
    title: ['¿Arrancamos', 'con tu tienda?'],
    text: 'En unas semanas puedes estar viendo pedidos en una tienda que se ve como tu marca. Solo tienes que contarme de ella.',
    nextTitle: 'Qué pasa después',
    next: ['Leo tus respuestas y miro tu marca.', 'En menos de 24 h hábiles te escribo para agendar la charla.', 'Recibes tu propuesta con precio y fecha por escrito.'],
    direct: '¿Prefieres escribirme directo?',
  },

  form,

  // barra fija abajo en el celular (aparece después del inicio y se esconde en el formulario)
  sticky: { text: 'Respuesta en 24 h', cta: 'Pedir propuesta' },

  footer: 'Tiendas online a medida para marcas de Latinoamérica.',
};
