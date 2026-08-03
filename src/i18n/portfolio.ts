/**
 * Portfolio (/portfolio) i18n dictionary — the page that sells Liam as a
 * hire-ready frontend & mobile developer to companies/recruiters (the CV
 * funnel). Copy leans on authority (real shipped projects), specificity
 * (stack), and a clear, low-friction contact CTA.
 */
import type { Locale } from "./linktree";

export interface PortfolioCopy {
  meta: { title: string; description: string };
  nav: { about: string; work: string; saas: string; contact: string; backToLinks: string };
  hero: {
    titleLine1: string;
    titleLine2: string;
    subtitleA: string;
    subtitleB: string;
    cta: string;
  };
  infobox: {
    mobileTitle: string;
    mobileDesc: string;
    webTitle: string;
    webDesc: string;
    stackLabel: string;
    badgeLabel: string;
  };
  about1: { kicker1: string; kicker2: string; desc: string };
  about2: { kicker: string; badgeFast: string; badgeScalable: string; descPrefix: string; descSuffix: string };
  about3: {
    prefix: string;
    middle: string;
    connector: string;
    techLast: string;
  };
  work: {
    eyebrow: string;
    title: string;
    meta: string;
    techStackLabel: string;
    moreWorksTitle: string;
    moreWorksDesc: string;
  };
  saas: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    cta: string;
  };
  stack: {
    title: string;
    meta: string;
    groups: { label: string; items: string[] }[];
  };
  contact: {
    title: string;
    meta: string;
  };
  footer: string;
}

export const portfolioCopy: Record<Locale, PortfolioCopy> = {
  en: {
    meta: {
      title: "Liam Marega — Portfolio | Frontend & Mobile Developer",
      description:
        "Liam Marega's developer portfolio: shipped web & mobile products for startups and companies. React, TypeScript, Flutter, Supabase, Railway. Available for hire.",
    },
    nav: { about: "About", work: "Work", saas: "SaaS", contact: "Contact", backToLinks: "Links" },
    hero: {
      titleLine1: "FRONTEND",
      titleLine2: "& MOBILE DEVELOPER",
      subtitleA:
        "I code with art — empowering startups with visually stunning, functionally seamless interfaces for web and mobile.",
      subtitleB:
        "Experienced across the full stack: React, Flutter, Supabase and Railway, shipping products that actually reach users, not just prototypes.",
      cta: "Get in Touch",
    },
    infobox: {
      mobileTitle: "MOBILE DEVELOPER",
      mobileDesc: "Professional iOS and Android developer with Flutter",
      webTitle: "WEB DEVELOPER",
      webDesc: "Building fast, accessible websites with best practices",
      stackLabel: "React · Flutter · Next.js",
      badgeLabel: "UX/UI",
    },
    about1: {
      kicker1: "Who is",
      kicker2: "Liam?",
      desc: "Developer based in Argentina. Technology lover, willing to grow and challenge myself in every project.",
    },
    about2: {
      kicker: "Nice and",
      badgeFast: "Fast",
      badgeScalable: "Scalable",
      descPrefix: "Create responsive, attractive, functional and easy to use",
      descSuffix: "applications.",
    },
    about3: {
      prefix: "pixel-perfect",
      middle: "user interfaces and using the latest technologies, such as",
      connector: "and",
      techLast: "Supabase",
    },
    work: {
      eyebrow: "Selected work",
      title: "Projects",
      meta: "Real products shipped for companies and startups",
      techStackLabel: "TECH STACK",
      moreWorksTitle: "The Creative Vault",
      moreWorksDesc:
        "A curated ensemble of professional freelance work, academic breakthroughs, and technical explorations that showcase the depth and versatility of my engineering journey.",
    },
    saas: {
      eyebrow: "Featured product",
      title: "SwipeLoop",
      subtitle: "AI-generated carousels for social media",
      description:
        "My own SaaS, built solo end to end: users describe a topic and SwipeLoop generates ready-to-post carousel slides with AI, in seconds. A live product with real users — not a demo.",
      badge: "In progress",
      cta: "Try SwipeLoop",
    },
    stack: {
      title: "Stack",
      meta: "What I actually build with, day to day",
      groups: [
        { label: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS"] },
        { label: "Mobile", items: ["Flutter", "Dart", "iOS", "Android"] },
        { label: "Backend & Infra", items: ["Supabase", "Railway", "Firebase", "PostgreSQL", "Node.js"] },
        { label: "Tools", items: ["GitHub", "Figma", "Vercel", "Stripe"] },
      ],
    },
    contact: {
      title: "Let's build something",
      meta: "Open to full-time roles, freelance and collaborations",
    },
    footer: "liammarega.com",
  },
  es: {
    meta: {
      title: "Liam Marega — Portfolio | Frontend & Mobile Developer",
      description:
        "Portfolio de Liam Marega: productos web y mobile en producción para startups y empresas. React, TypeScript, Flutter, Supabase, Railway. Disponible para contratación.",
    },
    nav: { about: "Sobre mí", work: "Proyectos", saas: "SaaS", contact: "Contacto", backToLinks: "Links" },
    hero: {
      titleLine1: "FRONTEND",
      titleLine2: "& MOBILE DEVELOPER",
      subtitleA:
        "Programo con arte: potencio startups con interfaces visualmente impactantes y funcionalmente impecables, en web y mobile.",
      subtitleB:
        "Experiencia de punta a punta: React, Flutter, Supabase y Railway, entregando productos que llegan a usuarios reales, no solo prototipos.",
      cta: "Hablemos",
    },
    infobox: {
      mobileTitle: "MOBILE DEVELOPER",
      mobileDesc: "Desarrollador profesional iOS y Android con Flutter",
      webTitle: "WEB DEVELOPER",
      webDesc: "Sitios rápidos y accesibles, con buenas prácticas",
      stackLabel: "React · Flutter · Next.js",
      badgeLabel: "UX/UI",
    },
    about1: {
      kicker1: "¿Quién es",
      kicker2: "Liam?",
      desc: "Developer con base en Argentina. Apasionado por la tecnología, con ganas de crecer y desafiarme en cada proyecto.",
    },
    about2: {
      kicker: "Prolijo y",
      badgeFast: "Rápido",
      badgeScalable: "Escalable",
      descPrefix: "Creo aplicaciones responsive, atractivas, funcionales y fáciles de",
      descSuffix: "usar.",
    },
    about3: {
      prefix: "pixel-perfect",
      middle: "y usando las últimas tecnologías, como",
      connector: "y",
      techLast: "Supabase",
    },
    work: {
      eyebrow: "Trabajos seleccionados",
      title: "Proyectos",
      meta: "Productos reales entregados a empresas y startups",
      techStackLabel: "STACK TÉCNICO",
      moreWorksTitle: "The Creative Vault",
      moreWorksDesc:
        "Una selección de trabajos freelance profesionales, logros académicos y exploraciones técnicas que muestran la profundidad y versatilidad de mi trayectoria como developer.",
    },
    saas: {
      eyebrow: "Producto destacado",
      title: "SwipeLoop",
      subtitle: "Carruseles con IA para redes sociales",
      description:
        "Mi propio SaaS, construido en solitario de punta a punta: el usuario describe un tema y SwipeLoop genera slides de carrusel listos para publicar con IA, en segundos. Un producto en vivo con usuarios reales, no una demo.",
      badge: "En desarrollo",
      cta: "Probar SwipeLoop",
    },
    stack: {
      title: "Stack",
      meta: "Con lo que trabajo día a día",
      groups: [
        { label: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS"] },
        { label: "Mobile", items: ["Flutter", "Dart", "iOS", "Android"] },
        { label: "Backend & Infra", items: ["Supabase", "Railway", "Firebase", "PostgreSQL", "Node.js"] },
        { label: "Herramientas", items: ["GitHub", "Figma", "Vercel", "Stripe"] },
      ],
    },
    contact: {
      title: "Construyamos algo",
      meta: "Disponible para posiciones full-time, freelance y colaboraciones",
    },
    footer: "liammarega.com",
  },
};

export function getPortfolioCopy(locale: string | undefined): PortfolioCopy {
  return portfolioCopy[locale === "es" ? "es" : "en"];
}

/** Per-project translated description paragraphs, keyed by project id. */
export const projectDescriptionsEs: Record<string, string[]> = {
  ferox: [
    "Ferox es una red social para cazadores, con el objetivo de unificar el sector y crear vínculos entre ellos.",
    "Como la unión hace la fuerza, es el lugar ideal para juntarse y demostrar que somos un sector unido, capaz de grandes cosas.",
  ],
  advantisAI: [
    "Advantis AI está a la vanguardia de la revolución en finanzas descentralizadas (DeFi) gracias al poder de la inteligencia artificial.",
    "Su misión es acortar la brecha entre la tecnología y los usuarios, con herramientas, recursos educativos y una comunidad en crecimiento.",
  ],
  fmoney: [
    "FMoney es tecnología blockchain aplicada a sorteos.",
    "La plataforma garantiza mayor transparencia, trazabilidad instantánea, seguridad y eficiencia en todo el proceso: compra, selección del ganador y entrega del premio.",
  ],
};
