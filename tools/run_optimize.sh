#!/usr/bin/env bash
set -euo pipefail
# Wrapper to run the Python optimizer in this repo
PYTHON=${PYTHON:-python3}
echo "Running image optimizer..."
"$PYTHON" tools/optimize_images.py
echo "Done. Optimized files are in assets/optimized/"
