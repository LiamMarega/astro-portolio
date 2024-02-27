import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();
let sections = gsap.utils.toArray('.section');

tl.to(sections, {
  xPercent: -100 * (sections.length - 1),
  duration: 2,
  ease: 'none',
});

ScrollTrigger.create({
  animation: tl,
  markers: true,
  trigger: '#about',
  start: '5% top',
  pin: true,
  scrub: 0.5,
  end: () => '+=' + document.querySelector('#about').offsetWidth - window.innerWidth,
});
