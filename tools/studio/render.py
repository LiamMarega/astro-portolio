# Renders every still .ab artboard in studio.html to /public/img/<id>.webp at 2x.
# Artboards with the "alpha" class keep their transparency (used for the peelable stickers).
import sys, io, os
from playwright.sync_api import sync_playwright
from PIL import Image

only = sys.argv[1:]
root = os.path.dirname(os.path.abspath(__file__))
out_root = os.path.abspath(os.path.join(root, '..', '..', 'public', 'img'))
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1400, 'height': 900}, device_scale_factor=2)
    pg.goto('file://' + os.path.join(root, 'studio.html'))
    pg.evaluate('document.fonts.ready')
    pg.wait_for_load_state('networkidle')
    pg.wait_for_timeout(700)
    # .clip boards are animated: record.py turns those into videos
    boards = pg.eval_on_selector_all('.ab:not(.clip)', 'els => els.map(e => [e.id, e.classList.contains("alpha"), +(e.dataset.out || 0)])')
    # Opaque boards first; then clear the page background so alpha boards come out truly transparent.
    boards.sort(key=lambda b: b[1])
    cleared = False
    for i, alpha, out in boards:
        if alpha and not cleared:
            pg.add_style_tag(content='html,body{background:transparent!important}')
            cleared = True
        if only and not any(i.startswith(o) for o in only):
            continue
        el = pg.query_selector(f'[id="{i}"]')
        png = el.screenshot(omit_background=alpha)
        im = Image.open(io.BytesIO(png)).convert('RGBA' if alpha else 'RGB')
        if out:
            im = im.resize((out, round(im.height * out / im.width)), Image.LANCZOS)
        if i == 'og':  # social preview: JPEG at the site root (crawlers don't all read WebP)
            dest = os.path.join(out_root, '..', 'og.jpg')
            im.save(dest, 'JPEG', quality=86, optimize=True, progressive=True)
        else:
            dest = os.path.join(out_root, i + '.webp')
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            im.save(dest, 'WEBP', quality=88 if alpha else 80, method=6)
        print(f'{i:28s} {im.size} {os.path.getsize(dest)//1024}KB')
    b.close()
