import { initSmooth } from './smooth';
import { initNav, initAnchors } from './nav';
import { initSky } from './sky';
import { initReveal } from './reveal';
import { initLeadForms } from './leadform';

const boot = () => {
  initSmooth();
  initNav();
  initAnchors();
  initSky();
  initReveal();
  initLeadForms();
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
