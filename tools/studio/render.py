# Renders every .ab artboard in studio.html to /public/img/<id>.webp at 2x.
# Share images (ids starting with "og") go to /public/<id>.png instead.
# Set CHROME=/path/to/chrome to use an installed browser instead of Playwright's own.
import sys, io, os
from playwright.sync_api import sync_playwright
from PIL import Image
only = sys.argv[1:]
root = os.path.dirname(os.path.abspath(__file__))
out_root = os.path.abspath(os.path.join(root, '..', '..', 'public', 'img'))
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=os.environ.get('CHROME') or None)
    pg = b.new_page(viewport={'width': 1400, 'height': 900}, device_scale_factor=2)
    pg.goto('file://' + os.path.join(root, 'studio.html'))
    pg.evaluate('document.fonts.ready')
    pg.wait_for_timeout(600)
    ids = pg.eval_on_selector_all('.ab', 'els => els.map(e => e.id)')
    for i in ids:
        if only and not any(i.startswith(o) for o in only):
            continue
        el = pg.query_selector(f'[id="{i}"]')
        png = el.screenshot()
        im = Image.open(io.BytesIO(png)).convert('RGB')
        if i.startswith('og'):
            dest = os.path.join(out_root, '..', i + '.png')
            im.save(dest, 'PNG', optimize=True)
        else:
            dest = os.path.join(out_root, i + '.webp')
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            im.save(dest, 'WEBP', quality=84, method=6)
        print(f'{i:28s} {im.size} {os.path.getsize(dest)//1024}KB')
    b.close()
