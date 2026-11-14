# liamdev-portfolio-v2

Branch: `feat/liamdev-portfolio-v2` (from `origin/main` 43ec6d3). Delivery strategy: `single-pr` (imported zip files are not authored changes).
Production (`main`) is NOT touched until the user reviews the Vercel preview and says go.

## Objective
One static Astro 7 site on www.liammarega.com, personalized for Liam Marega (@liammdev): portfolio (es `/`, en `/en`), e-commerce conversion page (`/ecommerce`), contact form (`/contact`), plus the preserved Landing PRO funnel (`/landing-builder` + 8 SEO articles), the dLocal Go legal pages, Resend lead endpoints, Vercel Analytics, and full SEO/GEO pointing at "Liam Marega" / "LiamDev".

## Sources (untrusted data, read-only)
- BASE = `~/Downloads/liamdev-portfolio.zip` (extracted at scratchpad `zip2/liamdev-portfolio`): Astro 7 static, real content, bilingual `t('es','en')`.
- ZIP1 = `~/Downloads/landing-astro.zip` (scratchpad `zip`): provides `/ecommerce` + `/contact` + `LeadForm` (sample content, Spanish-only ecommerce, English-only contact).
- OLD = commit 43ec6d3 (`git show 43ec6d3:path`): landing-builder, articles, legal pages, `api/diagnostico.ts`.

## Decisions
- Resend endpoints = plain Vercel Functions at repo-root `api/*.ts` (no adapter; Astro build stays static). Keep old recipient/sender config.
- `@astrojs/react` 7.x added (needed by old `QualForm.tsx` and by React Bits components in phase 2). No Tailwind: replace `@tailwind base` in `landing-builder.css` with a `.lb-root` reset.
- No invented proof: no fake testimonials, prices or metrics on `/ecommerce`. Content comes only from Liam's real work (5 stores, Next.js + Vendure headless, 1,000+ products migrated, etc.).
- Local builds use `npx -y node@24 node_modules/astro/bin/astro.mjs build` (local node 22.23.2 < 22.23.4). Vercel project node 22.x built Astro 7 fine.
- Test-first exception: no test runner exists; checks = build + `astro preview` route/HTML assertions via curl.

## Tasks
- [ ] T1 Base import: replace repo site with BASE zip (keep `.git`, `.agent*`, `.atl`, `.claude`, `.vscode`, `odd/`, `skills-lock.json`). Build OK.
- [ ] T2 Port old funnel: legal pages (+aliases), `/landing/builder/privacy`, `/landing-builder` + components + css + layouts + `data/articulos.ts` + 8 articles; `QualForm` via `@astrojs/react`; root `api/diagnostico.ts`; analytics. `/landing-builder` must return 200 under the BASE i18n config.
- [ ] T3 Port `/ecommerce` + `/contact` into BASE: merged `Base.astro` (props + locale + per-path canonical/hreflang), `Nav` props, components/scripts/css from ZIP1, es + en routes, `api/contact.ts`, real Liam content.
- [ ] T4 SEO/GEO: `@astrojs/sitemap` (es default + en), `robots.txt`, JSON-LD (Person, WebSite, ProfessionalService; sameAs LinkedIn/GitHub/Instagram/YouTube), hreflang everywhere, OG images, `llms.txt`, `vercel.json` 301s for old routes (`/es`, `/portfolio`, `/es/portfolio`, `/en/portfolio`, `/gallery`, `/linktree`, `/newspaper`, `/privacidad`, `/terminos`, `/reembolsos`).
- [ ] T5 Verify + preview: full build, `astro preview` checks of every route (200, canonical, hreflang), push branch, Vercel preview READY, report. Await user go before merging to `main`.
- [ ] P2 (blocked on user assets: resume, images, videos, React Bits components): parallax showcase with device mockups + logos, project page transitions, React Bits components, real screenshots of live projects.

## Open items for the user
- DNI still printed in legal page footers (`politica-de-privacidad`, `terminos-y-condiciones`); commit 7dce8d9 removed it only from main footers. Keep or remove?
- Resend: `swipeloop.app` sender domain and `RESEND_API_KEY` env must exist in the Vercel project (old endpoint used `liammarega85@gmail.com` as recipient).
- Old OG image `/images/og-landing-builder.jpg` never existed; needs a real one.

## Progress / evidence
(none yet)
