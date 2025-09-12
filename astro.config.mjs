import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  
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
            'vendor-lenis': ['lenis']
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