PYTHON ?= python3

.PHONY: help optimize replace backup-artifacts

help:
	@echo "Available targets:"
	@echo "  make optimize        # generate optimized images into assets/optimized"
	@echo "  make replace         # BACKS UP originals then replaces them with optimized versions"
	@echo "  make backup-artifacts # create a tarball of assets/optimized"

optimize:
	$(PYTHON) tools/optimize_images.py

replace:
	@echo "This will BACKUP originals under assets/originals/ and replace originals with optimized images."
	@read -p "Are you sure? Type 'yes' to proceed: " yn; \
	if [ "$${yn}" = "yes" ]; then \
		$(PYTHON) tools/replace_with_optimized.py; \
	else \
		echo "Aborted."; exit 1; \
	fi

backup-artifacts:
	tar -C assets -czf assets-optimized.tar.gz optimized
