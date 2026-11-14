// Índice central de artículos del blog /landing-builder/articulos
// Usado por el índice, el layout (relacionados) y los JSON-LD.

export interface Articulo {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  category: string;
  date: string; // ISO
  updated?: string;
  reading: number; // minutos
  keywords: string[];
  excerpt: string;
}

export const ARTICULOS: Articulo[] = [
  {
    slug: "que-es-una-landing-page",
    title: "Qué es una landing page y por qué convierte más que tu web",
    metaTitle: "Qué es una Landing Page y Por Qué Convierte Más que tu Web (2026)",
    description:
      "Qué es una landing page, en qué se diferencia de una página web tradicional y por qué es la herramienta más efectiva para convertir tráfico en clientes.",
    category: "Fundamentos",
    date: "2026-05-04",
    reading: 7,
    keywords: [
      "qué es una landing page",
      "landing page",
      "página de aterrizaje",
      "landing page ejemplos",
      "para qué sirve una landing page",
    ],
    excerpt:
      "La diferencia entre una web que informa y una página que vende. Todo lo que necesitás saber antes de invertir en tráfico.",
  },
  {
    slug: "como-crear-una-landing-page-que-convierta",
    title: "Cómo crear una landing page que convierta: estructura paso a paso",
    metaTitle: "Cómo Crear una Landing Page que Convierta en 2026 (Paso a Paso)",
    description:
      "La estructura exacta de una landing page de alta conversión: hero, prueba social, oferta, CTA y los errores que matan tus conversiones. Guía 2026.",
    category: "Conversión",
    date: "2026-05-11",
    reading: 9,
    keywords: [
      "cómo crear una landing page",
      "landing page que convierta",
      "estructura landing page",
      "high converting landing page",
    ],
    excerpt:
      "La anatomía completa de una página que vende: sección por sección, con el porqué psicológico detrás de cada bloque.",
  },
  {
    slug: "cuanto-cuesta-una-landing-page",
    title: "Cuánto cuesta una landing page profesional en 2026 (precios reales)",
    metaTitle: "Cuánto Cuesta una Landing Page Profesional en 2026 | Precios Reales",
    description:
      "Precios reales de una landing page en 2026: plantillas, freelancers y agencias. Qué incluye cada rango y cómo evitar pagar dos veces por lo mismo.",
    category: "Inversión",
    date: "2026-05-18",
    reading: 8,
    keywords: [
      "cuánto cuesta una landing page",
      "precio landing page",
      "cuánto cuesta una página web",
      "presupuesto página web",
    ],
    excerpt:
      "Desde USD 0 hasta USD 10.000: qué obtenés realmente en cada rango de precio y cuál conviene según tu etapa.",
  },
  {
    slug: "tasa-de-conversion-landing-page",
    title: "Tasa de conversión de una landing page: benchmarks 2026 y cómo superarlos",
    metaTitle: "Tasa de Conversión de Landing Pages: Benchmarks 2026 por Industria",
    description:
      "¿Qué tasa de conversión es buena? Benchmarks 2026 por industria, cómo medir la tuya y las palancas concretas para pasar del promedio al top 10%.",
    category: "Datos",
    date: "2026-05-25",
    reading: 8,
    keywords: [
      "tasa de conversión landing page",
      "conversion rate benchmark",
      "tasa de conversión promedio",
      "cro optimización",
    ],
    excerpt:
      "El promedio ronda el 4-6%. Las mejores páginas superan el 10%. Esto es lo que las separa, con datos de 2026.",
  },
  {
    slug: "landing-page-vs-pagina-web",
    title: "Landing page vs página web: cuál necesita tu negocio (y cuándo)",
    metaTitle: "Landing Page vs Página Web: Diferencias y Cuál Necesitás en 2026",
    description:
      "Diferencias reales entre landing page y página web corporativa: objetivo, estructura, costo y resultados. Cuál conviene según tu modelo de negocio.",
    category: "Estrategia",
    date: "2026-06-01",
    reading: 6,
    keywords: [
      "landing page vs página web",
      "diferencia landing page y página web",
      "qué necesita mi negocio",
      "sitio web o landing page",
    ],
    excerpt:
      "No es lo mismo informar que vender. Cuándo te alcanza con una landing y cuándo necesitás un sitio completo.",
  },
  {
    slug: "optimizacion-cro-mejorar-conversion",
    title: "CRO: 15 optimizaciones probadas para mejorar la conversión de tu web",
    metaTitle: "CRO en 2026: 15 Optimizaciones para Mejorar la Conversión de tu Web",
    description:
      "15 tácticas de optimización de conversión (CRO) aplicables hoy: copy, CTAs personalizados, prueba social, formularios y velocidad. Con datos y prioridades.",
    category: "Conversión",
    date: "2026-06-05",
    reading: 10,
    keywords: [
      "cro",
      "optimización de conversión",
      "conversion rate optimization",
      "mejorar conversión web",
      "aumentar ventas página web",
    ],
    excerpt:
      "Los CTAs personalizados convierten 202% mejor. El video suma +86%. La lista priorizada de lo que de verdad mueve la aguja.",
  },
  {
    slug: "velocidad-web-core-web-vitals",
    title: "Velocidad web y Core Web Vitals: cómo afectan tu SEO y tus ventas",
    metaTitle: "Core Web Vitals 2026: Cómo la Velocidad Web Afecta SEO y Conversión",
    description:
      "Qué son LCP, INP y CLS, por qué Google los usa para rankear y cuánto dinero pierde tu negocio por cada segundo de carga. Guía práctica 2026.",
    category: "Performance",
    date: "2026-06-08",
    reading: 8,
    keywords: [
      "core web vitals",
      "velocidad de carga web",
      "page speed",
      "optimizar velocidad web",
      "lcp inp cls",
    ],
    excerpt:
      "Cada segundo extra de carga te cuesta conversiones. Cómo medir, qué arreglar primero y qué stack usar.",
  },
  {
    slug: "contratar-desarrollador-web-freelance",
    title: "Cómo contratar un desarrollador web freelance sin equivocarte",
    metaTitle: "Cómo Contratar un Desarrollador Web Freelance en 2026 (Sin Errores)",
    description:
      "Checklist para contratar un desarrollador web freelance: qué preguntar, señales de alerta, cómo comparar presupuestos y qué debe incluir la entrega.",
    category: "Negocio",
    date: "2026-06-10",
    reading: 7,
    keywords: [
      "contratar desarrollador web",
      "desarrollador web freelance",
      "freelance web developer",
      "diseñador web freelance",
    ],
    excerpt:
      "Las 7 preguntas que filtran al 90% de los candidatos equivocados, y qué tiene que incluir sí o sí el presupuesto.",
  },
];

export const getArticulo = (slug: string) =>
  ARTICULOS.find((a) => a.slug === slug)!;

export const getRelacionados = (slug: string, n = 3) =>
  ARTICULOS.filter((a) => a.slug !== slug).slice(0, n);
