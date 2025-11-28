#!/usr/bin/env python3
"""
Simple image optimizer for this repo using Pillow.
Creates WebP versions and resized fallbacks in `assets/optimized/`.

Not destructive: original files are kept.
"""
from PIL import Image, UnidentifiedImageError
from pathlib import Path

OUT_DIR = Path('assets/optimized')
OUT_DIR.mkdir(parents=True, exist_ok=True)

# files to optimize (source path, max width list to create)
JOBS = [
    ('assets/bg-ring-closeup.jpg', [1600, 800]),
    ('assets/couple-river-embrace.jpg', [1200, 800]),
    ('assets/venue-illustration.png', [1200]),
]

# process carousel images (resize to 1600)
CAROUSEL_DIR = Path('assets/carousel-images')
if CAROUSEL_DIR.exists():
    for p in sorted(CAROUSEL_DIR.glob('image-*.*')):
        JOBS.append((str(p), [1600]))


def save_webp(img, out_path, quality=80):
    img.save(out_path, 'WEBP', quality=quality, method=6)


def process_file(src_path, widths):
    src = Path(src_path)
    if not src.exists():
        print('Missing:', src)
        return
    try:
        with Image.open(src) as im:
            im = im.convert('RGB')
            w0, h0 = im.size
            for w in widths:
                if w >= w0:
                    # no need to upscale; still create a webp copy at original size
                    out_name = OUT_DIR / (src.stem + f'-{w}.webp')
                    print('Saving (no-resize):', out_name)
                    save_webp(im, out_name)
                else:
                    h = int(w * h0 / w0)
                    resized = im.resize((w, h), Image.LANCZOS)
                    out_name = OUT_DIR / (src.stem + f'-{w}.webp')
                    print('Saving resized:', out_name)
                    save_webp(resized, out_name)
    except UnidentifiedImageError:
        print('Cannot identify image:', src)
    except Exception as e:
        print('ERROR processing', src, e)


def main():
    done = set()
    for src, widths in JOBS:
        if src in done: continue
        process_file(src, widths)
        done.add(src)
    print('Done')

if __name__ == '__main__':
    main()
