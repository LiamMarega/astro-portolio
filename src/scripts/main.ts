import { initSmooth } from './smooth';
import { initNav } from './nav';
import { initHero } from './hero';
import { initReveal } from './reveal';
import { initWork } from './work';
import { initCase } from './case';
import { initRing, initTags, initStickers, initImpact } from './story';
import { initGallery } from './gallery';
import { initChat } from './chat';
import { autoplayVideos } from './media';

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const boot = () => {
  initSmooth();
  initNav();
  initHero();
  initReveal();
  initWork();
  initCase();
  initRing();
  initTags();
  initStickers();
  initImpact();
  initGallery();
  initChat();
  autoplayVideos();
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
