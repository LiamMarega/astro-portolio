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
- [x] T1 Base import: replace repo site with BASE zip (keep `.git`, `.agent*`, `.atl`, `.claude`, `.vscode`, `odd/`, `skills-lock.json`). Build OK.
- [x] T2 Port old funnel: legal pages (+aliases), `/landing/builder/privacy`, `/landing-builder` + components + css + layouts + `data/articulos.ts` + 8 articles; `QualForm` via `@astrojs/react`; root `api/diagnostico.ts`; analytics. `/landing-builder` must return 200 under the BASE i18n config.
- [x] T3a Technical port of `/ecommerce` (es) + `/contact` (es + en) into BASE: merged `Base.astro` (props + locale + per-path canonical/hreflang, home output unchanged), `Nav` props, components/scripts/css from ZIP1 (resolve Sticker/initStickers/initAnchors/doodles clashes), `api/contact.ts` + shared origin helper, contact copy real and bilingual.
- [x] T3b `/ecommerce` real content + `/en/ecommerce`: rewrite with `t()`, only facts from BASE `site.ts`/old articles (no invented prices, testimonials, stats, guarantees; list what was omitted), real screenshots of the 5 live stores replacing fictional samples, OG image branded LiamDev, no leftover "Leo Solari"/example.com/sample store names.
- [x] T4 SEO/GEO: `@astrojs/sitemap` (es default + en), `robots.txt`, JSON-LD (Person, WebSite, ProfessionalService; sameAs LinkedIn/GitHub/Instagram/YouTube), hreflang everywhere, OG images, `llms.txt`, `vercel.json` 301s for old routes (`/es`, `/portfolio`, `/es/portfolio`, `/en/portfolio`, `/gallery`, `/linktree`, `/newspaper`, `/privacidad`, `/terminos`, `/reembolsos`).
- [ ] T5 Verify + preview: full build, `astro preview` checks of every route (200, canonical, hreflang), push branch, Vercel preview READY, report. Await user go before merging to `main`.
- [ ] P2 (blocked on user assets: resume, images, videos, React Bits components): parallax showcase with device mockups + logos, project page transitions, React Bits components, real screenshots of live projects.

## Open items for the user
- DNI still printed in legal page footers (`politica-de-privacidad`, `terminos-y-condiciones`); commit 7dce8d9 removed it only from main footers. Keep or remove?
- Resend: `swipeloop.app` sender domain and `RESEND_API_KEY` env must exist in the Vercel project (old endpoint used `liammarega85@gmail.com` as recipient).
- Old OG image `/images/og-landing-builder.jpg` never existed; needs a real one.

## Progress / evidence
- T1: route=inline (mechanical copy, no research). Commit c40c175. Build (node24) OK: /index.html + /en/index.html. `diff -rq` src/public vs zip2 = identical.
- T2: route=delegated writer (2+ non-trivial files, mapping done by explorer). Commit 5394cbf (44 files). Writer: 16 pages build, all funnel/legal routes 200 under BASE i18n (no config change), head tags identical to old on 4 pages, `api/diagnostico.ts` 14 function cases pass (405/403/400/500; 200/502 not exercised, needs Vercel + key). Parent spot-check: rebuilt (16 pages) + curl 8 routes all 200. Added deps: @astrojs/react, react, react-dom, astro-seo, @vercel/analytics, resend, gsap, fontsource x3. Risks carried to T4:
- T3b: route=delegated writer. Commit 7522627 (43 files). 20 pages build; `/ecommerce` + `/en/ecommerce` real content, 5 live-store screenshots (10 webp, 1.07 MB), new LiamDev OG png, hreflang trio verified; removed all invented pricing/guarantee/quotes/stats/hero chips; writer source map in its report. Parent spot-check: rebuild 20 pages, leak scan empty, visible-text claim scan clean ("Free:" = free of constraints, compare table), hreflang es/en/x-default OK. Open for user: confirm 5-step process wording and "work independently"; 305discount.com shows raw i18n keys + wrong <title> on live site; Mendo mobile header and Romeo desktop nav overlap on live sites; OG uses Mendo+Romeo; real testimonials/prices/times would strengthen the page.
- T4: route=delegated writer. Commit 824bc43 (15 files). Sitemap 20 URLs (es-AR/en-US alternates), robots (AI crawlers allowed), llms.txt, JSON-LD @graph (Person/WebSite/ProfilePage/Service/ContactPage/Breadcrumb), single canonical per page, `<Analytics/>` in Base, OG jpg for Landing PRO, vercel.json (trailingSlash + 10 permanent redirects + cache/security headers; validated with @vercel/routing-utils, 0 loops), link audit 527 internal / 0 broken. Home bodies byte-identical. Parent spot-check: rebuild 20 pages, 1 canonical each, sitemap 20 URLs. Open: `/api/*` vs `trailingSlash:true` (test with POST on Vercel preview in T5); /ecommerce titles 68-69 chars and descriptions >160; visible `/` body has no contiguous "Liam Marega"/"LiamDev" text (hero splits letters; name only in aria-labels); og.jpg crops "Marega"; sitemap hreflang es-AR/en-US vs HTML es/en; github URL used `liamMarega` (from site.ts).
- Earlier risks (T2):
- T3a: route=delegated writer. Commit 8ed9d14 (56 files). 19 pages build; home HTML identical except one extra shared-CSS `<link>` (Vite chunk split); /contact + /en/contact hreflang es/en/x-default verified by parent; form steps/validation/plan-B mailto verified in browser by writer; api/contact + api/diagnostico 46/46 mocked cases pass (real Resend delivery, 200/502 of diagnostico not exercised). Parent spot-check: rebuild 19 pages OK. Open: api relative import uses `./_lib/origin.js` (Vercel TS resolution unproven until preview), in-memory rate limit best-effort, `/ecommerce` still sample content until T3b. Previous T2 risks: double canonical on article pages (layout + astro-seo), missing og-landing-builder.jpg, "*.vercel.app" origin allowed, hero seal race (pre-existing).
