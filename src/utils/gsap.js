import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Only execute animations on desktop (1024px and above)
  // Mobile and tablet get CSS-based animations instead
  if (window.innerWidth >= 1024) {
    initDesktopAnimations();
  }

  // Handle viewport resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const isDesktop = window.innerWidth >= 1024;
      const hasScrollTriggers = ScrollTrigger.getAll().length > 0;

      if (isDesktop && !hasScrollTriggers) {
        // Switched to desktop, initialize animations
        initDesktopAnimations();
      } else if (!isDesktop && hasScrollTriggers) {
        // Switched to mobile/tablet, kill all ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
        // Reset any transforms applied by GSAP
        gsap.set('.section, [data-work-card]', { clearProps: 'all' });
      } else if (isDesktop && hasScrollTriggers) {
        // Still on desktop, just refresh
        ScrollTrigger.refresh();
      }
    }, 250);
  });
});

function initDesktopAnimations() {
  // Configuration for About section (horizontal scroll)
  const aboutTimeline = gsap.timeline();

  ScrollTrigger.create({
    animation: aboutTimeline,
    trigger: '#about',
    start: 'top top',
    pin: true,
    scrub: 0.5,
    anticipatePin: 1, // Optimize performance
    end: () => '+=' + document.querySelector('#about').offsetWidth,
    invalidateOnRefresh: true,
  });

  // Horizontal animation for About sections
  aboutTimeline.to('.section', {
    xPercent: -100 * (document.querySelectorAll('.section').length - 1),
    ease: 'none',
    duration: 2
  });

  // Configuration for Work section (vertical scroll with pin and stacking)
  const workTimeline = gsap.timeline();

  ScrollTrigger.create({
    animation: workTimeline,
    trigger: '#work',
    start: 'top top',
    pin: true,
    scrub: 0.5,
    anticipatePin: 1, // Optimize performance
    end: '+=3000',
    invalidateOnRefresh: true,
  });

  // Stacking animations for work cards
  const workCards = gsap.utils.toArray('[data-work-card]');

  workCards.forEach((card, index) => {
    if (index > 0) {
      workTimeline.to(card, {
        yPercent: -100 * index,
        duration: 2,
        ease: 'none',
      }, 0); // Start all at the same time for proper stacking
    }
  });

  // Refresh ScrollTrigger after initialization
  ScrollTrigger.refresh();
}

// Respect prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
  gsap.set('*', { clearProps: 'all' });
}
