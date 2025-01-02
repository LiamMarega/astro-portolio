/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      mini: { raw: '(min-height: 800px)' },
      // => @media (min-height: 800px) { ... }
      ...defaultTheme.screens,
    },
    extend: {
      animation: {
        text: 'text 5s ease infinite',
        draw: 'reveal 2s linear forwards',
        revealLTR: 'revealLeftToRight 0.5s linear forwards',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },

        reveal: {
          from: {
            'clip-path': 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          },
          to: {
            'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          },
        },
        revealLeftToRight: {
          from: {
            'clip-path': 'inset(0 100% 0 0)',
          },
          to: {
            'clip-path': 'inset(0 0 0 0)',
          },
        },
      },
    },
  },
  plugins: [],
};
