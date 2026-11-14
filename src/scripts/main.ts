import { initSmooth } from './smooth';
import { initNav, initAnchors } from './nav';
import { initSky } from './sky';
import { initHero } from './hero';
import { initReveal } from './reveal';
import { initWork } from './work';
import { initCase } from './case';
import { initPolaroids, initTags } from './story';
import { initGallery } from './gallery';
import { initChat } from './chat';

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const boot = () => {
  initSmooth();
  initNav();
  initAnchors();
  initSky();
  initHero();
  initReveal();
  initWork();
  initCase();
  initPolaroids();
  initTags();
  initGallery();
  initChat();
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
