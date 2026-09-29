# Contributing to UZYNTRA Security Lab

Thank you for your interest in contributing to the UZYNTRA Web Pentest Lab.

## Ways to Contribute

- 🐛 **Report bugs** — use the Bug Report issue template
- 🔍 **Submit lab findings** — use the Lab Finding issue template  
- 📚 **Improve documentation** — fix typos, add examples, clarify methodology
- 🧪 **Add new vulnerability modules** — follow the module structure below
- 🎨 **UI improvements** — better visualisation of findings, responsive fixes

## Development Setup

```bash
git clone https://github.com/UZYNTRA-Security/uzyntra-lab.git
cd uzyntra-lab
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── <module-name>/page.tsx   # One directory per vulnerable endpoint
│   └── api/                     # API route handlers
└── components/                  # Shared UI components
docs/
└── LEVEL-XX-<NAME>.md           # Documentation per module
```

## Adding a New Vulnerability Module

1. **Create the page** at `src/app/<endpoint>/page.tsx`
2. **Add the training comment** at the top:
   ```typescript
   // INTENTIONALLY VULNERABLE FOR SECURITY TRAINING
   // CWE-XXX: <Name>
   // OWASP AXX:2021 — <Category>
   ```
3. **Use fake data only** — no real hostnames, credentials, or PII
4. **Add a Training Objective callout** at the bottom of the page (see existing pages)
5. **Update `src/app/api/lab-info/route.ts`** — add your vuln to `enabled_vulnerabilities`
6. **Add `robots.txt` entry** if the path should be discoverable via recon
7. **Update `/docs/LEVEL-XX-<NAME>.md`** — add the full finding documentation
8. **Update `README.md`** — add to the vulnerable endpoints table

## Code Standards

- TypeScript strict mode — no `any` types
- All vulnerable data must be clearly fake
- Each vulnerability must map to a CWE and OWASP category
- `npm run build` must pass before opening a PR
- Follow the existing component style (Tailwind v4, dark slate/cyan theme)

## Commit Message Format

```
type: short description

Longer explanation if needed.

OWASP: A0X:2021 | CWE: CWE-XXX
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`

## Pull Request Process

1. Fork the repository
2. Create a branch: `git checkout -b feat/level-02-auth`
3. Make your changes following the standards above
4. Run `npm run build` — must pass clean
5. Open a PR using the PR template
6. A maintainer will review within 3 business days

## Code of Conduct

This project is for authorized security education only. All contributors must:

- Use only fake/synthetic data in vulnerable demonstrations
- Never commit real credentials, tokens, or PII
- Respect the authorized testing boundaries in `SECURITY.md`
