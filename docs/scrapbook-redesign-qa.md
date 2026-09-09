# Scrapbook redesign — implementation & QA

Base: `main` at `f2de80bec1ceec5b657a315df4e3920dca58e81f`.
Branch: `feat/scrapbook-landing-clarity`.

## Implemented

- `/landing-builder`: six-section route, short hero, optional persistent project book, concise scope/process, native FAQ accordions, and contact. One navigation, no fullscreen intro, fake video control, unverified statistics, pencil cursor, duplicate sticky CTA or repeated sales blocks.
- Real project records and existing captures from `src/data/projects.ts`. Live websites, Figma prototypes and screenshot-only projects have different link labels. No new metrics, stock images or invented testimonials.
- Paper layers, cover spine, front/back cover, photographic mounts and restrained handwritten notes. The existing shared layout, fonts, SEO/JSON-LD, analytics and base stylesheet remain unchanged; new styles are route-scoped.
- Book progressively enhances server-rendered project articles. Opens/closes, prev/next with boundaries, list alternative, localized live status, keyboard controls scoped to the book, focus restoration, reduced-motion CSS and disconnect cleanup. No storage dependency, scroll lock or GSAP gate.
- Three-step contact form keeps all six original answer IDs and option values. Same endpoint, payload keys, internal hot/warm/cold logic and explicit WhatsApp consent. Back preserves inputs; duplicate sends are guarded; aborted/error responses remain recoverable. No classification is displayed publicly.
- Dark ES/EN portfolio: shorter hero, three project cards before biography, contribution copy, compact stack and secondary project exploration. Existing language switcher, SaaS showcase and contact remain. Repeated thumbnails are excluded from secondary projects.
- Legacy landing anchors retained: top, resultados, servicios, vsl, problemas, proceso, sobre, faq, calificar, contacto. Portfolio work/work-mobile/work-tablet/about preserved. Locale/geo routes and articles/privacy unchanged.

## Executed successfully

1. `node --experimental-strip-types --test tests/landing-contact.test.mjs` — **12 passing tests**. Six answer IDs, grouping, required fields, original classifications, payload shape, consent, fake POST, server errors, malformed responses and connection failure. All fetches injected; no production leads/emails sent.
2. TypeScript syntax transpilation of all four new/rewritten TS/TSX files — no syntax diagnostics. This is not a full React/Astro typecheck.
3. Strict standalone TypeScript check of `landing-contact.ts` and `project-book.ts` with ES2022/DOM libs — passed.
4. Chromium/Playwright **isolated book fixture**, using the actual transpiled `project-book.ts` and `landing-scrapbook.css`: 360, 390, 768, 1024 and 1440 px. Open/close, previous/next, Home/End/arrows/Escape, boundary focus, list view, unrelated input keyboard isolation and reconnect cleanup passed. No horizontal overflow or page errors in those fixture runs.
5. Isolated book fixture: reduced-motion cover transition `0s`; JavaScript-disabled HTML exposes all three project articles.

The browser fixture used substitute images and fallback fonts for layout testing because repository assets/dependencies could not be downloaded in this environment. These were test-only and are **not** committed as production assets. Fixture screenshots are **not** proof of the final Astro page's appearance.

## Pending before merge

- Install the repository's existing dependencies using its lockfile and run `npm run build` (`astro check && astro build`). Astro/React dependencies are not installed in the execution environment and outbound downloads are unavailable, so the complete build was **not run**.
- Run the actual Astro app and visually inspect `/landing-builder`, `/es/portfolio/`, `/en/portfolio/`, shared articles and privacy at the five widths above, with real project images/fonts. The complete app was **not** rendered here.
- Verify React hydration, forward/back input retention, field focus, double submission, timeout, errors and success in the running app. Intercept `/api/diagnostico`; never send synthetic leads to the real endpoint.
- Confirm real image framing and cover animation in Safari/iOS as well as Chromium; review existing shared portfolio animations under reduced motion.

No dependency upgrades, automatic merge or explicit deployment are included in this change.
