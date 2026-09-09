# Paper / scrapbook redesign — review notes

## Scope

- `/landing-builder`: replace the automatic intro and long sales sequence with a concise offer, an optional project notebook, three service cards, a three-step process, native FAQ disclosures and the existing qualification form.
- `/es/portfolio/` and `/en/portfolio/`: paper opening section and the same notebook component; retain About and Contact, with the full work/SaaS/stack archive behind an explicit disclosure.
- Root locale redirects, linktree, article routes, shared layouts, analytics, pricing (from USD 600), qualification logic and the API remain unchanged. Legacy components stay in the repository for reference.

## Design and interaction

Warm paper, kraft binding, layered page edges, restrained tape and handwritten accents. One primary contact action; no mandatory intro, custom pointer or scroll locking. `ProjectBook.astro` uses the existing `projects.ts` images and URLs. Figma URLs are labelled as prototypes; a project with no URL is shown as a screenshot, not given a fabricated link. No new conversion figures or testimonials.

The notebook uses native `details`/`summary`, progressively enhanced with one-project-at-a-time navigation. Without JavaScript all projects remain readable after opening. Buttons, local arrow/Home/End shortcuts, live page status, reduced-motion CSS and responsive single-page layouts are included. Legacy portfolio deep links open the archive.

## Checks completed

- Strict TypeScript checks passed for the extracted notebook and portfolio browser scripts (`ES2022`, `DOM`, `strict`).
- Isolated Chromium fixtures passed at widths 320, 390, 768 and 1440 for landing and both portfolio languages: opening/closing, previous/next boundaries, keyboard controls, one visible project, prototype/no-link handling, legacy archive links, one H1 and no horizontal document overflow or script errors.
- No-JavaScript notebook and reduced-motion tests passed.

These were **isolated fixtures**, not the compiled Astro application. Existing React/form, About, Works and Contact components were stubbed; repository images and package fonts were not available in that fixture environment.

## Required before merging

1. Install using the repository lockfile and run `npm run build` (`astro check && astro build`). This could not be run in the editing environment because repository/dependency network access was unavailable.
2. Review the real preview with its images, fonts, shared styles and mobile navigation. Confirm both portfolio languages, notebook opening/pagination and the full archive when expanded.
3. Test all six qualification steps, contact fields, consent, error and success states against a test environment. No live lead was submitted during this change.
4. Confirm article/privacy/contact links, direct hashes and keyboard focus in the integrated preview.

Keep this PR in draft until the integrated build and preview checks pass. No production deployment or merge is requested by this change.
