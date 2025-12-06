#!/usr/bin/env python3
"""
FINAL OPTIMIZATION: 
1. Reduced WebP quality to 75 for smaller file size.
2. Generates an 800px size for all carousel images to enable responsive loading.
3. Maintains multiprocessing and EXIF fixes.
"""
from PIL import Image, UnidentifiedImageError, ImageOps
from pathlib import Path
from multiprocessing import Pool, cpu_count 
import os 

OUT_DIR = Path('assets/optimized')
OUT_DIR.mkdir(parents=True, exist_ok=True)

# files to optimize (source path, max width tuple to create)
JOBS = [
    ('assets/bg-ring-closeup.jpg', (1600, 800)),
    ('assets/couple-river-embrace.jpg', (1200, 800)),
    ('assets/venue-illustration.png', (1200,)), 
]

# process carousel images (resize to 1600 and 800)
CAROUSEL_DIR = Path('assets/carousel-images')
if CAROUSEL_DIR.exists():
    for p in sorted(CAROUSEL_DIR.glob('image-*.*')):
        # Generating two sizes for all carousel images
        JOBS.append((str(p), (1600, 800))) 


def save_webp(img, out_path, quality=75): # QUALITY SET TO 75
    """Saves the PIL Image object as a WebP file."""
    img.save(out_path, 'WEBP', quality=quality, method=4)


def process_file(src_path, widths):
    """Handles the resizing, orientation correction, and saving for a single image job."""
    src = Path(src_path)
    if not src.exists():
        print(f'[PID {os.getpid()}] Missing: {src}')
        return
    
    try:
        with Image.open(src) as im:
            im = im.convert('RGB')
            im = ImageOps.exif_transpose(im) 
            
            w0, h0 = im.size
            
            for w in widths:
                largest_dim = max(w0, h0)
                
                if w >= largest_dim:
                    out_name = OUT_DIR / (src.stem + f'-{w}.webp')
                    save_webp(im, out_name)
                else:
                    ratio = w / largest_dim
                    new_w = int(w0 * ratio)
                    new_h = int(h0 * ratio)
                    
                    resized = im.resize((new_w, new_h), Image.LANCZOS)
                    out_name = OUT_DIR / (src.stem + f'-{w}.webp')
                    save_webp(resized, out_name)
                    
    except UnidentifiedImageError:
        print(f'[PID {os.getpid()}] Cannot identify image: {src}')
    except Exception as e:
        print(f'[PID {os.getpid()}] ERROR processing {src}: {e}')


def run_job(job):
    """Unpacks the job tuple and calls process_file."""
    src, widths = job
    process_file(src, widths)


def main():
    num_cores = cpu_count()
    print(f'Starting parallel processing of {len(JOBS)} files using {num_cores} cores...')
    
    jobs_to_process = list(set(JOBS))

    with Pool(num_cores) as p:
        p.map(run_job, jobs_to_process)
        
    print('\nDone')

if __name__ == '__main__':
    main()