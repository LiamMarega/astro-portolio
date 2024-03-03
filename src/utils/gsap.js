import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();
const tlWork = gsap.timeline();
let sections = gsap.utils.toArray('.section');

ScrollTrigger.create({
  animation: tl,
  trigger: '#about',
  start: '5% top',
  pin: true,
  scrub: 0.5,
  end: () => '+=' + document.querySelector('#about').offsetWidth - window.innerWidth,
});

ScrollTrigger.create({
  animation: tlWork,
  trigger: '#work',
  start: 'top top',
  pin: true,
  scrub: 0.5,
  snap: 1 / (sections.length - 1),
  end: () => '+=' + document.querySelector('#work').offsetHeight,
});

tl.to(sections, {
  xPercent: -200,
  duration: 2,
  ease: 'none',
});

tlWork.to('#advantisAI', {
  yPercent: -100,
  duration: 2,
  ease: 'none',
});

tlWork.to('#fmoney', {
  yPercent: -200,
  duration: 2,
  ease: 'none',
});
