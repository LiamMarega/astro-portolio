/**
 * Linktree i18n dictionary.
 *
 * Two languages only for now (en/es). Copy is written to funnel two
 * different visitor types from the same page:
 *   - Companies / recruiters looking at the CV / social bio link → /portfolio
 *   - Prospective clients who want a landing page → Landing PRO (/landing-builder)
 */

export type Locale = "en" | "es";

export const locales: Locale[] = ["en", "es"];
export const defaultLocale: Locale = "en";

export interface LinktreeCopy {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    tagline: string;
    availability: string;
  };
  paths: {
    eyebrow: string;
    title: string;
    meta: string;
    company: {
      title: string;
      description: string;
      cta: string;
    };
    client: {
      title: string;
      description: string;
      cta: string;
    };
  };
  landingPro: {
    eyebrow: string;
    title: string;
    subtitle: string;
    features: string[];
    cta: string;
  };
  projects: {
    title: string;
    meta: string;
    cta: string;
    techSuffix: string;
  };
  builder: {
    title: string;
    meta: string;
  };
  socials: {
    title: string;
    meta: string;
    items: {
      instagram: string;
      youtube: string;
      github: string;
      email: string;
    };
  };
  footer: string;
  legal: {
    holder: string;
    idNumber: string;
    location: string;
    terms: string;
    refunds: string;
    privacy: string;
  };
  langSwitch: {
    label: string;
  };
}

export const linktreeCopy: Record<Locale, LinktreeCopy> = {
  en: {
    meta: {
      title: "Liam Marega — Links | Frontend & Mobile Developer",
      description:
        "Liam Marega's hub: hire me for your company, get a landing page that converts with Landing PRO, or check out my apps and socials.",
    },
    hero: {
      tagline: "Frontend & Mobile Developer — React, Flutter, Supabase",
      availability: "Open to new projects",
    },
    paths: {
      eyebrow: "Where do you want to go?",
      title: "Pick your path",
      meta: "Two links, two purposes — one professional you can trust with either.",
      company: {
        title: "I'm a company / recruiter",
        description:
          "See my dev portfolio: shipped projects, stack (React, Flutter, Supabase, Railway) and how I work.",
        cta: "View portfolio",
      },
      client: {
        title: "I want a landing page",
        description:
          "Landing PRO: a high-converting landing page for your business, built and shipped fast.",
        cta: "See Landing PRO",
      },
    },
    landingPro: {
      eyebrow: "For clients",
      title: "Landing PRO System",
      subtitle:
        "High-performance landing pages that turn visits into customers.",
      features: ["Strategy", "Premium design", "Performance"],
      cta: "See the system",
    },
    projects: {
      title: "Projects",
      meta: "Work for companies and startups",
      cta: "View all",
      techSuffix: "technologies",
    },
    builder: {
      title: "Builder",
      meta: "Apps I'm building",
    },
    socials: {
      title: "Socials",
      meta: "Follow along and let's connect",
      items: {
        instagram: "Content & behind the scenes",
        youtube: "Tutorials & builds",
        github: "Code & open source",
        email: "liammaregadevelop@gmail.com",
      },
    },
    footer: "liammarega.com",
    legal: {
      holder: "Liam Marega (Sole Proprietor)",
      idNumber: "National ID (DNI): 44.497.692",
      location: "Entre Ríos, Argentina",
      terms: "Terms & Conditions",
      refunds: "Shipping & Refunds",
      privacy: "Privacy Policy",
    },
    langSwitch: { label: "Español" },
  },
  es: {
    meta: {
      title: "Liam Marega — Links | Frontend & Mobile Developer",
      description:
        "Hub de Liam Marega: contratame para tu empresa, conseguí una landing que convierte con Landing PRO, o mirá mis apps y redes.",
    },
    hero: {
      tagline: "Frontend & Mobile Developer — React, Flutter, Supabase",
      availability: "Disponible para proyectos",
    },
    paths: {
      eyebrow: "¿A dónde querés ir?",
      title: "Elegí tu camino",
      meta: "Dos links, dos propósitos — un mismo profesional en el que confiar.",
      company: {
        title: "Soy una empresa / recruiter",
        description:
          "Mirá mi portfolio como developer: proyectos reales, stack (React, Flutter, Supabase, Railway) y cómo trabajo.",
        cta: "Ver portfolio",
      },
      client: {
        title: "Quiero una landing page",
        description:
          "Sistema Landing PRO: una landing de alto rendimiento para tu negocio, diseñada y entregada rápido.",
        cta: "Ver Landing PRO",
      },
    },
    landingPro: {
      eyebrow: "Para clientes",
      title: "Sistema Landing PRO",
      subtitle:
        "Landing pages de alto rendimiento que convierten visitas en clientes.",
      features: ["Estrategia", "Diseño premium", "Performance"],
      cta: "Ver el sistema",
    },
    projects: {
      title: "Proyectos",
      meta: "Trabajos para empresas y startups",
      cta: "Ver todos",
      techSuffix: "tecnologías",
    },
    builder: {
      title: "Builder",
      meta: "Apps que estoy construyendo",
    },
    socials: {
      title: "Redes",
      meta: "Seguime y conectemos",
      items: {
        instagram: "Contenido & detrás de escena",
        youtube: "Tutoriales & builds",
        github: "Código & open source",
        email: "liammaregadevelop@gmail.com",
      },
    },
    footer: "liammarega.com",
    legal: {
      holder: "Liam Marega (Persona Física)",
      idNumber: "DNI: 44.497.692",
      location: "Entre Ríos, Argentina",
      terms: "Términos y Condiciones",
      refunds: "Envíos y Devoluciones",
      privacy: "Política de Privacidad",
    },
    langSwitch: { label: "English" },
  },
};

export function getLinktreeCopy(locale: string | undefined): LinktreeCopy {
  return linktreeCopy[locale === "es" ? "es" : "en"];
}

/** ISO 3166-1 alpha-2 codes for Spanish-speaking countries (geo redirect). */
export const spanishSpeakingCountries = new Set([
  "AR",
  "BO",
  "CL",
  "CO",
  "CR",
  "CU",
  "DO",
  "EC",
  "SV",
  "GQ",
  "GT",
  "HN",
  "MX",
  "NI",
  "PA",
  "PY",
  "PE",
  "PR",
  "ES",
  "UY",
  "VE",
]);
