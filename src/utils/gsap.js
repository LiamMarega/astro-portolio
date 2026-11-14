import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Only execute animations on desktop (1024px and above)
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
        initDesktopAnimations();
      } else if (!isDesktop && hasScrollTriggers) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
        gsap.set('.section, [data-work-card]', { clearProps: 'all' });
      } else if (isDesktop && hasScrollTriggers) {
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
    anticipatePin: 1,
    end: () => '+=' + document.querySelector('#about').offsetWidth,
    invalidateOnRefresh: true,
  });

  aboutTimeline.to('.section', {
    xPercent: -100 * (document.querySelectorAll('.section').length - 1),
    ease: 'none',
    duration: 2
  });

  // Stacking Cards Animation for Work Section
  initStackingCardsAnimation();

  // Refresh ScrollTrigger after initialization
  ScrollTrigger.refresh();
}

function initStackingCardsAnimation() {
  const workCards = gsap.utils.toArray('[data-work-card]');

  if (workCards.length === 0) return;

  // Create a ScrollTrigger for each card that scales down the card
  // as it gets covered by the next one
  workCards.forEach((card, index) => {
    const isLastCard = index === workCards.length - 1;

    // Create scale-down animation for all cards except the last one
    if (!isLastCard) {
      ScrollTrigger.create({
        trigger: card,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          // Scale down and add slight "push back" effect as next card covers this one
          const progress = self.progress;
          const scale = 1 - (progress * 0.05); // Scale from 1 to 0.95
          const brightness = 1 - (progress * 0.2); // Darken slightly

          gsap.set(card, {
            scale: scale,
            filter: `brightness(${brightness})`,
            transformOrigin: 'center top'
          });
        },
        onLeave: () => {
          // Ensure final state
          gsap.set(card, {
            scale: 0.95,
            filter: 'brightness(0.8)',
            transformOrigin: 'center top'
          });
        },
        onEnterBack: () => {
          // Reset when scrolling back up
          gsap.set(card, {
            scale: 1,
            filter: 'brightness(1)',
            transformOrigin: 'center top'
          });
        }
      });
    }
  });
}

// Respect prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
  gsap.set('*', { clearProps: 'all' });
}
