#!/usr/bin/env python3
"""
Replaces all original carousel JPG/JPEG images with their pre-optimized 
WEBP counterparts and renames them to the final required format.

Assumes:
1. Original images are in 'assets/carousel-images/' (e.g., image-1.JPG).
2. Optimized images are in 'assets/optimised/' 
   (e.g., image-1-1600.webp).
"""
from pathlib import Path
import shutil

# --- Configuration ---
START_INDEX = 1  # Start image index
END_INDEX = 63   # End image index (based on your original list)
SOURCE_DIR = Path('assets/optimized')
DEST_DIR = Path('assets/carousel-images')
BACKUP_ORIGINAL_DIR = Path('assets/originals/carousel-images')
# ---------------------

def backup_and_remove_original(original_path: Path):
    """Backs up the original file and then deletes it."""
    if original_path.exists():
        backup_path = BACKUP_ORIGINAL_DIR / original_path.name
        BACKUP_ORIGINAL_DIR.mkdir(parents=True, exist_ok=True)
        
        print(f"Backing up: {original_path.name}")
        shutil.copy2(original_path, backup_path)
        
        print(f"Deleting original: {original_path.name}")
        original_path.unlink() # Delete the file
    else:
        print(f"Original not found (skipping delete): {original_path.name}")

def replace_and_rename_webp(i: int):
    """Finds the optimized WEBP, renames it, and moves it to the final destination."""
    
    # 1. Define source and destination paths
    source_name = f'image-{i}-1600.webp'
    final_name = f'image-{i}.webp'
    
    source_path = SOURCE_DIR / source_name
    final_path = DEST_DIR / final_name

    if not source_path.exists():
        print(f"❌ ERROR: Optimized WEBP file not found: {source_path}")
        return

    # 2. Handle original file (JPG/JPEG)
    # Check for both common extensions (JPG, jpeg, jpg)
    original_jpg = DEST_DIR / f'image-{i}.JPG'
    original_jpeg = DEST_DIR / f'image-{i}.jpeg'
    
    # Prioritize the extension that exists
    original_path_to_delete = None
    if original_jpg.exists():
        original_path_to_delete = original_jpg
    elif original_jpeg.exists():
        original_path_to_delete = original_jpeg
        
    if original_path_to_delete:
        backup_and_remove_original(original_path_to_delete)
        
    # 3. Move and rename the optimized WEBP file
    try:
        # Move the optimized file from its source to its final, renamed location
        shutil.move(source_path, final_path)
        print(f"✅ Success: Moved & Renamed {source_name} to {final_path}")
    except Exception as e:
        print(f"❌ ERROR moving {source_name}: {e}")

def main():
    print("--- Starting Image Replacement and Renaming ---")
    for i in range(START_INDEX, END_INDEX + 1):
        replace_and_rename_webp(i)
        print("---")
    
    print("--- Replacement Complete ---")

if __name__ == '__main__':
    main()