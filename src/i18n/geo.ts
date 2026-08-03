/**
 * Shared locale-detection logic used by every "smart root" page (the
 * bare "/" linktree entry point and the bare "/portfolio" entry point).
 *
 * Priority: explicit cookie (set by the language switcher) > Vercel geo
 * header (production) > Accept-Language header (local/non-Vercel) > English.
 */
import type { APIContext } from "astro";
import { spanishSpeakingCountries, defaultLocale, type Locale } from "./linktree";

const COOKIE_NAME = "liam_lang";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  const primary = header.split(",")[0]?.trim().toLowerCase() ?? "";
  return primary.startsWith("es") ? "es" : defaultLocale;
}

/**
 * Resolves the locale for the current request and, if it had to be
 * guessed (no cookie yet), sets the cookie so the choice sticks.
 */
export function resolveLocale(astro: Pick<APIContext, "cookies" | "request">): Locale {
  const cookieLang = astro.cookies.get(COOKIE_NAME)?.value;

  if (cookieLang === "en" || cookieLang === "es") {
    return cookieLang;
  }

  const country = astro.request.headers.get("x-vercel-ip-country");
  const locale: Locale = country
    ? (spanishSpeakingCountries.has(country.toUpperCase()) ? "es" : "en")
    : localeFromAcceptLanguage(astro.request.headers.get("accept-language"));

  astro.cookies.set(COOKIE_NAME, locale, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });

  return locale;
}
