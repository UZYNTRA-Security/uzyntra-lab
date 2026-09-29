# UZYNTRA Security — Web Application Security Practice Guide
## LaTeX Training Manual

**Author:** Muhammad Usama  
**Organization:** UZYNTRA Security  
**Format:** LaTeX → PDF  

---

## Directory Structure

```
manual/
├── main.tex                    ← Master document (imports all chapters)
├── Makefile                    ← Build automation
├── README.md                   ← This file
├── build/                      ← Generated PDF output (git-ignored)
├── assets/                     ← Screenshots and images
│   └── (place .png/.jpg here)
└── chapters/
    ├── 00-cover.tex            ← Cover page
    ├── 01-introduction.tex     ← Chapter 1: Web Application Security Intro
    ├── 02-linux-setup.tex      ← Chapter 2: Kali Linux Preparation
    ├── 03-burp-setup.tex       ← Chapter 3: Burp Suite Setup
    ├── 04-burp-interface.tex   ← Chapter 4: Burp Interface Guide
    ├── 05-methodology.tex      ← Chapter 5: Testing Methodology
    ├── 06-level01-recon.tex    ← Level 01: Recon & Info Disclosure
    ├── 07-level02-authentication.tex  ← Level 02: Authentication
    ├── 08-level03-authorization.tex   ← Level 03: Authorization/IDOR
    ├── 09-level04-injection.tex       ← Level 04: SQL Injection
    ├── 10-level05-api.tex             ← Level 05: API Security
    ├── 11-level06-clientside.tex      ← Level 06: XSS / CSRF
    ├── 12-level07-bizlogic.tex        ← Level 07: Business Logic
    ├── 13-level08-advanced.tex        ← Level 08: SSRF / File Upload
    ├── 14-reporting.tex               ← Reporting Methodology
    └── 15-references.tex              ← References
```

---

## Prerequisites — Install LaTeX

### Kali / Debian / Ubuntu

```bash
sudo apt update
sudo apt install texlive-full -y
# Full install (~4GB) — includes all packages used in main.tex
```

Minimal install (faster, may need extra packages):

```bash
sudo apt install texlive texlive-latex-extra texlive-fonts-recommended \
                 texlive-science latexmk -y
```

### macOS

```bash
brew install --cask mactex
```

### Windows

Download and install [MiKTeX](https://miktex.org/download) or [TeX Live](https://tug.org/texlive/).

---

## Building the PDF

### Overleaf

The default build includes every chapter and uses simpler breakable boxes,
loads only the required tcolorbox library, and skips microtype processing
to reduce compilation overhead. Change `\manualfasttrue` to
`\manualfastfalse` in `main.tex` to restore microtype for final typography.
This can change line wrapping and page breaks. Compilation time still
depends on the build environment; these settings do not guarantee that
the full manual will fit within Overleaf's time limit.

Upload the complete manual project, keeping `main.tex` at the project root
and all chapter files inside `chapters/`. Select `main.tex` as the main
document and pdfLaTeX as the compiler, then recompile.

If the log reports `Text dropped after begin of listing` followed by
`job aborted, no legal \end found`, check for a `lstlisting` inside a
command argument such as `\exerciseblock{...}` or `\findingblock{...}`.
Use `\begin{tcolorbox}[exercisestyle] ... \end{tcolorbox}` or the
`findingstyle` equivalent instead: listings must be read directly, not
passed through a command argument.

For other occurrences of `job aborted, no legal \end found`, check that the
uploaded `main.tex` is complete: it must start with the preamble and contain
both `\begin{document}` and the final `\end{document}`. The Dashboard
paragraph is the end of `chapters/04-burp-interface.tex`, not the end of
`main.tex`. Chapter files are included by the master document; do not
replace `main.tex` with a chapter or add `\end{document}` to chapter files.

### Linux / macOS (with make)

```bash
cd manual/
make        # Build PDF → build/main.pdf
make open   # Build and open in PDF viewer
make clean  # Remove build artifacts
```

### Manual (any platform)

```bash
cd manual/
mkdir -p build
pdflatex -output-directory=build main.tex
pdflatex -output-directory=build main.tex   # Run twice for TOC
```

### Windows (PowerShell)

```powershell
cd manual
New-Item -ItemType Directory -Force build
pdflatex -output-directory=build main.tex
pdflatex -output-directory=build main.tex
```

The final PDF will be at `build/main.pdf`.

> **Run pdflatex twice.** The first pass generates the table of contents and cross-references. The second pass reads those files and produces the correct output.

---

## Adding a New Chapter

1. Create `chapters/16-level09-newtopic.tex` following the attack module template
2. Add the include to `main.tex`:
   ```latex
   \include{chapters/16-level09-newtopic}
   ```
3. Run `make` to rebuild

### Chapter Template

```latex
\chapter{Level 09 — New Topic}
\label{ch:level09}

\section{Learning Objectives}
\section{Vulnerability Explanation}
\section{Required Lab Setup}
\section{Understanding Normal Application Flow}
\section{Burp Suite Testing Process}
\section{Security Testing Exercise}
\section{Professional Finding Report}
\section{Module Completion Checklist}
```

---

## Adding Screenshots

1. Place your `.png` or `.jpg` file in `assets/`
2. Replace a `\screenshotbox{}` placeholder with:
   ```latex
   \begin{figure}[H]
     \centering
     \includegraphics[width=0.85\textwidth]{assets/your-screenshot.png}
     \caption{Description of the screenshot}
     \label{fig:screenshot-label}
   \end{figure}
   ```

---

## Custom Commands Reference

| Command | Output |
|---|---|
| `\noteblock{text}` | Blue info box |
| `\warnblock{text}` | Amber warning box |
| `\dangerblock{text}` | Red important box |
| `\exerciseblock{text}` | Green exercise box |
| `\findingblock{text}` | Gray finding template box |
| `\screenshotbox{caption}` | Placeholder frame for screenshots |
| `\cmd{command}` | Formatted terminal command |
| `\vuln{name}` | Red vulnerability name |
| `\endpoint{/path}` | Green endpoint path |
| `\checkbox` | Empty checkbox `□` |

---

## Troubleshooting

| Error | Fix |
|---|---|
| `! LaTeX Error: File 'tcolorbox.sty' not found` | `sudo apt install texlive-latex-extra` |
| `! LaTeX Error: File 'booktabs.sty' not found` | `sudo apt install texlive-latex-recommended` |
| `! LaTeX Error: File 'microtype.sty' not found` | `sudo apt install texlive-latex-extra` |
| TOC shows wrong page numbers | Run `pdflatex` twice |
| PDF not updated after changes | Run `make clean && make` |
| `letterspacing` warning from microtype | Safe to ignore — not an error |

---

## Disclaimer

This manual is produced for authorized cybersecurity training purposes by UZYNTRA Security.  
All lab targets use intentionally fake data. Unauthorized testing of systems you do not own is illegal.
