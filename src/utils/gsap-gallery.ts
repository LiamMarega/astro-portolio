import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure to register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Setup gallery animation exactly as in the original example
export function setupGalleryAnimation() {
  // Simple image gallery animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.img',
      scrub: true
    }
  })
  .to('.img', {
    stagger: 0.2,
    y: -700,
    scrub: true
  });

  return tl;
}

// Hide scrollbar utilities
export function hideScrollbars() {
  document.body.style.scrollbarWidth = 'none';
  // @ts-ignore - Non-standard property
  document.body.style.msOverflowStyle = 'none';
  if (document.body.style.setProperty) {
    document.body.style.setProperty('--webkit-scrollbar', 'none');
  }
} 