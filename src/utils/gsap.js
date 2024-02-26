import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();

tl.from('#about_me_2', {
  xPercent: -200,
  duration: 2,
});

ScrollTrigger.create({
  animation: tl,
  trigger: '#about',
  start: 'top top',
  end: '+=1000', // 1500px + 2500px = 4000px
  pin: true,
  scrub: 2,
});
