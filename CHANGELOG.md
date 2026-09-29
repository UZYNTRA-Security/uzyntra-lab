# Changelog

All notable changes to the UZYNTRA Security Web Pentest Lab are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)  
Versioning: [Semantic Versioning](https://semver.org/)

---

## [1.0.0] — 2025-09-29

### Added — Level 01: Reconnaissance & Information Disclosure

#### Vulnerable Endpoints
- `GET /debug` — CWE-200: Debug page exposing fake app/DB/service information
- `GET /error-test` — CWE-209: Verbose error with fake SQL query, stack trace, and file paths
- `GET /robots.txt` — CWE-538: Sensitive path disclosure via robots.txt Disallow directives
- `GET /backup` — CWE-538: Simulated nginx open directory listing with fake config/schema files
- `GET /admin` — CWE-306: Unauthenticated admin panel with fake user enumeration data
- `GET /internal` — CWE-200: Internal portal with fake hostname and IP leakage
- `GET /lab-info.json` — Full vulnerability catalogue API endpoint

#### Security Misconfigurations (Intentional)
- Missing `Content-Security-Policy` header (CWE-693)
- Missing `X-Frame-Options` header
- Missing `X-Content-Type-Options` header
- Missing `Strict-Transport-Security` header
- `X-Powered-By: Next.js/16.3.7` version disclosure

#### Main Website
- Professional SaaS landing page (`/`)
- About page with fake team bios (`/about`)
- Contact page with non-functional form (`/contact`)

#### Documentation
- `docs/LEVEL-01-RECON.md` — full methodology, CVSS scores, Burp tips, pentest report template
- `README.md` — setup, Vercel deploy guide, Burp Suite checklist
- `.env.example` — environment variable template

#### Infrastructure
- Next.js 16.3.7 + TypeScript + Tailwind CSS v4
- GitHub Actions CI (build + type check + secret scan)
- Vercel preview deploy workflow
- Issue templates: bug report, lab finding, module request
- `SECURITY.md`, `CONTRIBUTING.md`, `CHANGELOG.md`

---

## [Unreleased]

### Planned — Level 02: Authentication & Session Management
- Login page with brute force vulnerability
- Weak password policy
- Session fixation
- Insecure JWT (`alg: none`, weak secret)
- Password reset link predictability
- Cookie flags: missing `HttpOnly`, `Secure`, `SameSite`

### Planned — Level 03: SQL Injection
- Classic SQLi in search endpoint
- Blind boolean-based SQLi
- Error-based SQLi
- UNION-based extraction

### Planned — Level 04: Cross-Site Scripting (XSS)
- Reflected XSS
- Stored XSS
- DOM-based XSS
- CSP bypass techniques
