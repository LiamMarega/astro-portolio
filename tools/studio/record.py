"""Records the looping gallery clips (clips.mjs) frame by frame and encodes them with ffmpeg.
Also makes small gallery versions of the screen recordings. Output: public/media/gallery/*.mp4 + posters.

    node tools/studio/build.mjs clips && python3 tools/studio/record.py [clip ...]
"""
import os, sys, subprocess, tempfile, shutil
from playwright.sync_api import sync_playwright

root = os.path.dirname(os.path.abspath(__file__))
pub = os.path.abspath(os.path.join(root, '..', '..', 'public', 'media'))
out_dir = os.path.join(pub, 'gallery')
os.makedirs(out_dir, exist_ok=True)
FPS, DUR, SCALE = 30, 4, 1.2
only = sys.argv[1:]

def encode(frames_pattern, dest, fps=FPS, crf=29):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-framerate', str(fps), '-i', frames_pattern,
                    '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', str(crf),
                    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', dest], check=True)

def poster(src, dest, at=0.4):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(at), '-i', src, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '78', dest], check=True)

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1400, 'height': 900}, device_scale_factor=SCALE)
    pg.goto('file://' + os.path.join(root, 'studio.html'))
    pg.evaluate('document.fonts.ready')
    pg.wait_for_load_state('networkidle')
    pg.wait_for_timeout(600)
    ids = pg.eval_on_selector_all('.clip', 'els => els.map(e => e.id)')
    for cid in ids:
        name = cid.split('/', 1)[1]
        if only and name not in only:
            continue
        el = pg.query_selector(f'[id="{cid}"]')
        tmp = tempfile.mkdtemp()
        n = FPS * DUR
        for i in range(n):
            pg.evaluate("([id, t]) => { for (const a of document.getElementById(id).getAnimations({ subtree: true })) a.currentTime = t; }", [cid, i * 1000 / FPS])
            el.screenshot(path=os.path.join(tmp, f'f{i:04d}.png'), animations='allow')
        dest = os.path.join(out_dir, name + '.mp4')
        encode(os.path.join(tmp, 'f%04d.png'), dest)
        poster(dest, os.path.join(out_dir, name + '.webp'), at=1.0)
        shutil.rmtree(tmp)
        print(f'{name:10s} {os.path.getsize(dest)//1024}KB')
    b.close()

# smaller cuts of the screen recordings for the gallery textures
for name, src, w in [('alien', 'nocoolhats.mp4', 480), ('swipeloop', 'swipeloop.mp4', 560), ('clientix', 'clientix.mp4', 560)]:
    if only and name not in only:
        continue
    dest = os.path.join(out_dir, name + '.mp4')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', os.path.join(pub, src), '-vf', f'scale={w}:-2', '-c:v', 'libx264', '-preset', 'veryfast',
                    '-crf', '29', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', dest], check=True)
    poster(dest, os.path.join(out_dir, name + '.webp'), at=0.5)
    print(f'{name:10s} {os.path.getsize(dest)//1024}KB')
