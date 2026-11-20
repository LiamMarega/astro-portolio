import { reduceMotion } from './util';
import { isPagePaused, onPagePause } from './smooth';

/**
 * Plays muted looping clips only while they are on screen and loads them lazily
 * (preload="none" + poster), so videos never cost anything above the fold.
 */
export function autoplayVideos(root: ParentNode = document) {
  const videos = Array.from(root.querySelectorAll<HTMLVideoElement>('video[data-autoplay]'));
  if (!videos.length) return;

  // Posters are fetched only when a clip gets within ~1 screen of the viewport (they are not free either).
  const posters = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const v = e.target as HTMLVideoElement;
        if (v.dataset.poster) v.poster = v.dataset.poster;
        posters.unobserve(v);
      }
    },
    { rootMargin: '120% 0px' },
  );
  videos.forEach((v) => posters.observe(v));

  if (reduceMotion()) return; // posters only

  const visible = new Set<HTMLVideoElement>();
  const playVideo = (v: HTMLVideoElement) => {
    if (v.preload === 'none') v.preload = 'auto';
    const p = v.play();
    if (p) p.catch(() => {});
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting) {
          visible.add(v);
          if (!isPagePaused()) playVideo(v);
        } else {
          visible.delete(v);
          if (!v.paused) v.pause();
        }
      }
    },
    { rootMargin: '120px 0px', threshold: 0.15 },
  );
  videos.forEach((v) => io.observe(v));

  onPagePause((paused) => {
    if (paused) {
      videos.forEach((v) => {
        if (!v.paused) v.pause();
      });
    } else {
      visible.forEach((v) => playVideo(v));
    }
  });
}
