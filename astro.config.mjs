import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // Static by default; individual routes opt into on-demand rendering
  // with `export const prerender = false` (e.g. the Resend form endpoint).
  adapter: vercel(),
  integrations: [tailwind(), react()],
  
  // Performance optimizations
  build: {
    // Enable CSS inlining for critical CSS
    inlineStylesheets: 'auto',
    // Split chunks for better caching
    split: true,
  },
  
  // Compression and minification
  compressHTML: true,
  
  // Image optimization
  image: {
    // Enable image optimization
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  
  // Prefetch configuration for better navigation
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  
  // Security headers
  security: {
    checkOrigin: true
  },
  
  // Development optimizations
  vite: {
    build: {
      // Optimize chunk splitting
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate vendor chunks
            'vendor-gsap': ['gsap'],
            'vendor-lenis': ['lenis'],
            'vendor-react': ['react', 'react-dom']
          }
        }
      },
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Minify CSS and JS
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['gsap', 'lenis']
    }
  }
});