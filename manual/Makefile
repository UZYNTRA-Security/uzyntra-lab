# ============================================================
# Makefile — UZYNTRA Security Training Manual
# Usage: make       → build PDF
#        make clean → remove build artifacts
#        make open  → build and open PDF
# ============================================================

MAIN      = main
OUTDIR    = build
PDFLATEX  = pdflatex
FLAGS     = -interaction=nonstopmode -output-directory=$(OUTDIR)

.PHONY: all clean open watch

all: $(OUTDIR) $(OUTDIR)/$(MAIN).pdf

$(OUTDIR):
	mkdir -p $(OUTDIR)

$(OUTDIR)/$(MAIN).pdf: $(MAIN).tex chapters/*.tex
	$(PDFLATEX) $(FLAGS) $(MAIN).tex
	$(PDFLATEX) $(FLAGS) $(MAIN).tex
	@echo ""
	@echo "=========================================="
	@echo "  PDF built: $(OUTDIR)/$(MAIN).pdf"
	@echo "=========================================="

# Run twice for TOC, cross-references, and list of tables
full: $(OUTDIR)
	$(PDFLATEX) $(FLAGS) $(MAIN).tex
	$(PDFLATEX) $(FLAGS) $(MAIN).tex
	$(PDFLATEX) $(FLAGS) $(MAIN).tex

clean:
	rm -rf $(OUTDIR)
	@echo "Build artifacts removed."

open: all
	@if command -v xdg-open >/dev/null 2>&1; then \
		xdg-open $(OUTDIR)/$(MAIN).pdf; \
	elif command -v evince >/dev/null 2>&1; then \
		evince $(OUTDIR)/$(MAIN).pdf; \
	elif command -v okular >/dev/null 2>&1; then \
		okular $(OUTDIR)/$(MAIN).pdf; \
	else \
		echo "PDF viewer not found. Open manually: $(OUTDIR)/$(MAIN).pdf"; \
	fi

# Windows (PowerShell) target
win:
	cmd /c "if not exist build mkdir build"
	pdflatex -interaction=nonstopmode -output-directory=build $(MAIN).tex
	pdflatex -interaction=nonstopmode -output-directory=build $(MAIN).tex
