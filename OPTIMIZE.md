Image optimization
==================

This repository includes simple tooling to generate optimized images (WebP) and to safely replace originals.

Files & purpose
- `tools/optimize_images.py`: generates resized WebP files into `assets/optimized/` (non-destructive).
- `tools/replace_with_optimized.py`: backs up originals to `assets/originals/` and replaces originals with optimized JPG/PNG files.
- `Makefile`: helper targets `make optimize` and `make replace`.
- `.github/workflows/optimize-images.yml`: CI workflow that runs the optimizer and uploads `assets/optimized/` as an artifact.

Quick local usage
-----------------

1. Generate optimized images (safe):

```bash
make optimize
```

2. Review the files in `assets/optimized/`.

3. Replace originals (this creates backups in `assets/originals/`):

```bash
make replace
```

CI behavior
-----------
The workflow `optimize-images.yml` runs on push and on manual dispatch. It runs `tools/optimize_images.py` and uploads the resulting `assets/optimized/` folder as a GitHub Actions artifact. This lets you generate optimized images in CI and download them without committing large binaries directly.

Notes
-----
- The scripts use Pillow and are intentionally conservative with resize widths and quality to preserve visual fidelity.
- Keep originals under `assets/originals/` if you need to restore full-resolution images.
