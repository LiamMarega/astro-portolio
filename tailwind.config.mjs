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
      colors: {
        primary: '#E2FF00',
        secondary: '#00E5FF',
        accent: '#FF3D00',
        background: {
          dark: '#0A0A0A',
        },
        surface: {
          dark: '#161616',
        },
        border: {
          dark: '#262626',
        },
        text: {
          light: '#F5F5F5',
          dim: '#888888',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        marker: ['Permanent Marker', 'cursive'],
        hand: ['Caveat', 'cursive'],
      },
      boxShadow: {
        brutal: '4px 4px 0px 0px #E2FF00',
        'brutal-white': '4px 4px 0px 0px #FFFFFF',
        'brutal-lg': '6px 6px 0px 0px #E2FF00',
      },
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
