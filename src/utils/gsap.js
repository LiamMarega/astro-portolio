import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Esperamos a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // No ejecutamos la animación horizontal en dispositivos móviles
  if (window.innerWidth >= 768) {
    // Configuración para sección About (scroll horizontal)
    const aboutTimeline = gsap.timeline();
    
    ScrollTrigger.create({
      animation: aboutTimeline,
      trigger: '#about',
      start: 'top top',
      pin: true,
      scrub: 0.5,
      end: () => '+=' + document.querySelector('#about').offsetWidth,
      onUpdate: (self) => {
        // Este evento se dispara durante el scroll y puede usarse para depuración
        // console.log('Progress:', self.progress.toFixed(3));
      }
    });
    
    // Animación horizontal para las secciones About
    aboutTimeline.to('.section', {
      xPercent: -100 * (document.querySelectorAll('.section').length - 1),
      ease: 'none',
      duration: 2
    });
    
    // Configuración para sección Work (scroll vertical con pin)
    const workTimeline = gsap.timeline();
    
    ScrollTrigger.create({
      animation: workTimeline,
      trigger: '#work',
      start: 'top top',
      pin: true,
      scrub: 0.5,
      end: '+=3000',
    });
    
    // Animaciones para los trabajos
    workTimeline.to('#advantisAI', {
      yPercent: -100,
      duration: 2,
      ease: 'none',
    });
    
    workTimeline.to('#fmoney', {
      yPercent: -200,
      duration: 2,
      ease: 'none',
    });
    
    workTimeline.to('#lamshoes', {
      yPercent: -300,
      duration: 2,
      ease: 'none',
    });
    
    // Refrescar ScrollTrigger cuando el tamaño de la ventana cambie
    window.addEventListener('resize', () => {
      // Solo refrescamos si seguimos en tamaño desktop
      if (window.innerWidth >= 768) {
        ScrollTrigger.refresh();
      } else {
        // Si cambiamos a móvil, eliminamos las animaciones y ScrollTriggers
        ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
        location.reload(); // Recargamos para reiniciar todo limpiamente
      }
    });
  }
});
