// Import lenis from the package we have
import Lenis from 'lenis';

// Export a function to create a new Lenis instance with standard settings
export function createLenis(targetSection?: string) {
  // We can create a section-specific Lenis instance if needed
  const options: any = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2
  };

  // If we have a target section, restrict lenis to that section only
  if (targetSection) {
    const section = document.getElementById(targetSection);
    if (section) {
      options.wrapper = section;
      options.content = section;
    }
  }

  return new Lenis(options);
}

// Export a function to handle the animation frame loop
export function initLenis(lenis: any) {
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  
  requestAnimationFrame(raf);
  
  return lenis;
} 