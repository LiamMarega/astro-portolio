"""Copies the raw captures into tools/studio/src as WebP, cropping window edges and
blurring private data (income figures, third-party names) before anything is composed."""
import os, sys
from PIL import Image, ImageFilter

UP = '/mnt/user-data/uploads'
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src')
os.makedirs(OUT, exist_ok=True)

def blur(im, boxes, r=14):
    im = im.copy()
    for b in boxes:
        region = im.crop(b).filter(ImageFilter.GaussianBlur(r))
        im.paste(region, b[:2])
    return im

def save(im, name, lossless=False, q=92):
    p = os.path.join(OUT, name + '.webp')
    if lossless:
        im.save(p, 'WEBP', lossless=True, method=6)
    else:
        im.save(p, 'WEBP', quality=q, method=6)
    print(f'{name:22s} {im.size} {os.path.getsize(p)//1024}KB')

src = lambda k: Image.open(f'{UP}/{k}-image.png')

# device mockups that already come with transparency
save(src('6702d5f1'), 'fmoney-tablets', q=94)
save(src('933d17e9'), 'advantis-dash', q=94)
save(src('0e3dc576'), 'advantis-landing', q=94)
save(src('9725ce8c'), 'ferox-phones', q=94)
# Ferox: the centre phone of that mockup is frontal, so its screen works as a flat full screen.
# Its dynamic island is painted over with the header colour (the site's phone frame draws its own).
fx = src('9725ce8c').convert('RGB').crop((338, 52, 622, 664))
for y in range(0, 36):
    c = fx.getpixel((90, y))
    for x in range(95, 192):
        fx.putpixel((x, y), c)
save(fx, 'ferox-screen', q=95)
# Easy Home Appliances logo (one of the headless-commerce stores)
eh = src('29067f04').convert('RGBA')
save(eh.crop(eh.getbbox()), 'easyhome-logo', q=94)
def clean_alpha(im, blur_r=1.6, lo=96, hi=160):
    """Firm up a soft cut-out so the die-cut sticker outline comes out crisp (no specks or haze)."""
    im = im.convert('RGBA')
    a = im.getchannel('A').filter(ImageFilter.GaussianBlur(blur_r))
    a = a.point(lambda v: 0 if v < lo else 255 if v > hi else int((v - lo) * 255 / (hi - lo)))
    im.putalpha(a)
    return im

save(clean_alpha(src('fc233620')), 'sa-map', q=95)

# desktop captures (crop the rounded window corners)
im = src('acd682e7').convert('RGB'); save(im.crop((0, 0, 3000, 1460)), 'swipeloop-desktop')
im = src('ce3a5fe5').convert('RGB').crop((0, 8, 2990, 1470))
im.paste(im.crop((616, 1418, 864, 1462)), (876, 1418))  # hide the macOS dock tooltip ("Brave Browser")
save(im, 'mendo-hero')
im = src('c4a5c4a9').convert('RGB'); save(im.crop((0, 0, 2990, 1470)), 'lucero-desktop')

# mobile captures
save(src('ae60c342').convert('RGB'), 'guita-login')
g = src('b85744fd').convert('RGB')
# hide the "gastos hormiga" rows (they include a third person's username and amounts),
# keeping the floating + button and the tab bar sharp
orig = g.copy()
g = blur(g, [(0, 1185, 986, 1398)], r=18)
from PIL import ImageDraw
mask = Image.new('L', g.size, 0)
ImageDraw.Draw(mask).ellipse((432, 1346, 566, 1480), fill=255)
g.paste(orig, (0, 0), mask)
save(g, 'guita-hoy')
save(src('fe60eeec').convert('RGB'), 'lucero-mobile')
save(src('cf810cb2').convert('RGB'), 'holo-mobile')
save(src('adc8dac9').convert('RGB'), 'pomodoro')

# freelance CRM: blur real income figures and the money axis
crm = src('0d457afe').convert('RGB')
crm = blur(crm, [(565, 515, 810, 575), (1035, 515, 1245, 575), (1500, 515, 1620, 575),
                 (1500, 578, 1635, 616), (1970, 578, 2205, 616), (575, 845, 690, 1265)], r=16)
save(crm, 'crm-reportes')

# ClientiX frames (taken from the screen recording) — the mouse pointer is patched out
def frame(t, name, patch=None):
    import subprocess, tempfile
    tmp = tempfile.mktemp(suffix='.png')
    subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(t), '-i', VID_CX, '-frames:v', '1', '-y', tmp], check=True)
    im = Image.open(tmp).convert('RGB')
    if patch:
        x0, y0, x1, y1 = patch
        im.paste(im.crop((x0 - 44, y0, x1 - 44, y1)), (x0, y0))
    save(im, name, q=94)

VID_CX = '/home/claude/liam/src_media/clientix.mp4'
if os.path.exists(VID_CX):
    frame(0.2, 'clientix-hero', (906, 328, 932, 370))
    frame(2.4, 'clientix-demo', (906, 330, 932, 366))
    frame(11, 'clientix-find', (1064, 378, 1096, 422))
    frame(13, 'clientix-write', (1064, 378, 1096, 422))
    frame(15, 'clientix-rubros')
