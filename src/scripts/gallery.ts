import { $, inView, reduceMotion } from './util';
import type { SheetItem } from './sheet';

/** Mounts the contact sheet (WebGL) when the gallery gets close to the viewport. */
export function initGallery() {
  const gal = $('[data-gallery]');
  const root = gal && $('[data-sheet]', gal);
  const stage = gal && $('[data-sheet-stage]', gal);
  const data = gal && $('[data-sheet-items]', gal);
  if (!gal || !root || !stage || !data) return;
  const items = JSON.parse(data.textContent || '[]') as SheetItem[];

  let started = false;
  inView(
    gal,
    async () => {
      if (started) return;
      started = true;
      const { createSheet, sheetSupported } = await import('./sheet');
      if (!sheetSupported()) {
        gal.classList.add('sheet-failed');
        return;
      }
      const narrow = window.innerWidth < 761;
      const ctl = createSheet(
        {
          root,
          stage,
          caption: { box: $('[data-sheet-cap]', gal)!, title: $('[data-sheet-title]', gal)!, subtitle: $('[data-sheet-sub]', gal)! },
        },
        items,
        {
          count: narrow ? 14 : 18,
          size: narrow ? 0.2 : 0.165,
          sizeVariance: 0.22,
          blankArea: narrow ? 0.2 : 0.24,
          speed: 0.11,
          rush: 0.35,
          radius: narrow ? 9 : 14,
          roll: 5,
          rim: 0.1,
          develop: 0.85,
          edgeFade: 0.3,
          shadow: 0.55,
          background: [0.953, 0.953, 0.953], // --card
          dpr: narrow ? 1.75 : 2,
          reduced: reduceMotion(),
          onOpen: () => gal.classList.add('is-open'),
          onClose: () => gal.classList.remove('is-open'),
        },
      );
      gal.classList.add(ctl ? 'sheet-on' : 'sheet-failed');
    },
    undefined,
    { rootMargin: '500px 0px' },
  );
}
