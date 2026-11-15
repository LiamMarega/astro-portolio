/**
 * Tailwind v3 config used ONLY to precompile the CSS of the preserved legacy pages
 * (/newspaper, /gallery, /linktree, /en/linktree). See tools/legacy/build-css.mjs.
 *
 * It keeps just the two theme overrides of the old site's tailwind.config.mjs that the legacy pages
 * actually depend on: `fontFamily.sans` (preflight puts it on <html>) and `fontFamily.mono` (`font-mono`
 * in the newspaper). Everything else in the old config (custom colors, shadows, animations, the `mini`
 * screen) was never used by these pages, so it is not carried over.
 * `content` is supplied per page group by build-css.mjs.
 */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
