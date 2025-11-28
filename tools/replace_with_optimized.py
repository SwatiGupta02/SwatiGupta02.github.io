#!/usr/bin/env python3
"""
Back up original images then replace heavy originals with resized, optimized versions.
- Backups are placed under `assets/originals/` preserving relative paths.
- Replacements use reasonable max widths and quality settings to reduce size.

This script is safe (non-destructive) because it creates backups first.
"""
from PIL import Image, UnidentifiedImageError
from pathlib import Path
import shutil

# mapping: original path -> (max_width, format, save_kwargs)
REPLACEMENTS = {
    'assets/bg-ring-closeup.jpg': (1600, 'JPEG', {'quality': 80, 'optimize': True}),
    'assets/couple-river-embrace.jpg': (1200, 'JPEG', {'quality': 82, 'optimize': True}),
    'assets/venue-illustration.png': (1200, 'PNG', {'optimize': True}),
}

# also optimize carousel JPGs (if present)
for i in range(1, 10):
    p = Path(f'assets/carousel-images/image-{i}.jpg')
    if p.exists():
        REPLACEMENTS[str(p)] = (1600, 'JPEG', {'quality': 80, 'optimize': True})

OUT_BACKUP_DIR = Path('assets/originals')
OUT_BACKUP_DIR.mkdir(parents=True, exist_ok=True)


def backup_file(p: Path):
    rel = p.relative_to('assets')
    dest = OUT_BACKUP_DIR / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    print(f'Backing up {p} -> {dest}')
    shutil.copy2(p, dest)


def replace_image(src_path, max_width, fmt, save_kwargs):
    src = Path(src_path)
    if not src.exists():
        print('Skip missing:', src)
        return
    try:
        backup_file(src)
        with Image.open(src) as im:
            orig_mode = im.mode
            w0, h0 = im.size
            if max_width and w0 > max_width:
                new_h = int(max_width * h0 / w0)
                im2 = im.resize((max_width, new_h), Image.LANCZOS)
            else:
                im2 = im.copy()
            # Convert to RGB for JPEG
            if fmt == 'JPEG' and im2.mode in ('RGBA', 'LA'):
                bg = Image.new('RGB', im2.size, (255,255,255))
                bg.paste(im2, mask=im2.split()[3])
                im2 = bg
            elif fmt == 'JPEG' and im2.mode != 'RGB':
                im2 = im2.convert('RGB')
            # write to a temp path then move
            tmp = src.with_suffix(src.suffix + '.tmp')
            im2.save(tmp, fmt, **save_kwargs)
            tmp.replace(src)
            print('Replaced:', src)
    except UnidentifiedImageError:
        print('Cannot identify image:', src)
    except Exception as e:
        print('ERROR processing', src, e)


def main():
    for k, v in REPLACEMENTS.items():
        replace_image(k, v[0], v[1], v[2])
    print('Done replacements. Originals are in', OUT_BACKUP_DIR)

if __name__ == '__main__':
    main()
