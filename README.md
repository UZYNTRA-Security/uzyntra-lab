# UZYNTRA Security Web Pentest Lab

**Module:** Level 01 — Reconnaissance & Information Disclosure  
**Domain:** `recon.lab.uzyntra.com`  
**Stack:** Next.js 16 · TypeScript · Tailwind CSS v4 · Node.js

> ⚠ **AUTHORIZED TRAINING ENVIRONMENT ONLY**  
> This application contains intentional vulnerabilities for cybersecurity education.  
> All sensitive-looking data is completely fake. Do not deploy with real credentials.  
> Only test against systems you are authorized to test.

---

## Folder Structure

```
uzyntra-lab/
├── docs/
│   └── LEVEL-01-RECON.md          # Full lab documentation
├── public/
│   └── robots.txt                  # VULN-003: Path disclosure
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (Navbar + Footer)
│   │   ├── page.tsx                # Homepage
│   │   ├── about/page.tsx          # About page
│   │   ├── contact/page.tsx        # Contact page
│   │   ├── debug/page.tsx          # VULN-001: Debug info disclosure
│   │   ├── error-test/page.tsx     # VULN-002: Verbose error disclosure
│   │   ├── backup/page.tsx         # VULN-004: Backup directory exposure
│   │   ├── admin/page.tsx          # VULN-005: Unauthenticated admin panel
│   │   ├── internal/page.tsx       # Internal portal (hostname leaks)
│   │   └── api/
│   │       └── lab-info/route.ts   # /lab-info.json — vulnerability catalogue
│   └── components/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── next.config.ts                  # VULN-006: Security headers intentionally absent
├── .env.example                    # Environment variable template
└── README.md
```

---

## Local Installation

### Prerequisites

- Node.js 20+ (`node --version`)
- npm 10+ (`npm --version`)
- Git

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/UZYNTRA-Security/uzyntra-lab.git
cd uzyntra-lab

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env.local

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Copy `.env.example` to `.env.local` before running:

```bash
cp .env.example .env.local
```

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Full URL of the deployment | No (defaults to localhost) |
| `NEXT_PUBLIC_LAB_ENV` | Lab environment label | No |

No real secrets are required to run this lab. All "sensitive" data shown in the app is hardcoded fake data for training purposes.

---

## Vercel Deployment

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/UZYNTRA-Security/uzyntra-lab)

### Manual deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Custom domain setup (recon.lab.uzyntra.com)

1. In Vercel dashboard → Project → Settings → Domains
2. Add `recon.lab.uzyntra.com`
3. In your DNS provider, add:
   ```
   Type:  CNAME
   Name:  recon.lab
   Value: cname.vercel-dns.com
   ```
4. Wait for SSL provisioning (~2 min)
5. Verify: `curl -I https://recon.lab.uzyntra.com/`

### Environment variables on Vercel

```bash
vercel env add NEXT_PUBLIC_SITE_URL production
# Enter: https://recon.lab.uzyntra.com
```

---

## Burp Suite Level 01 Testing Checklist

Configure Burp proxy: `127.0.0.1:8080` in your browser (or FoxyProxy on Kali).

### Recon Phase

- [ ] `GET /robots.txt` — note all `Disallow:` paths
- [ ] `GET /lab-info.json` — read the full vulnerability catalogue
- [ ] Browse all pages — watch Site Map populate in Burp

### Information Disclosure

- [ ] `GET /debug` — extract: app version, DB host, internal service names, PID
- [ ] `GET /error-test` — extract: SQL query, table/column names, stack trace, file paths
- [ ] `GET /backup` — list exposed files; fetch `config-backup.txt` and `database-schema.sql`
- [ ] `GET /admin` — confirm HTTP 200 without auth; note user enumeration data
- [ ] `GET /internal` — note internal hostnames and IP addresses

### Header Analysis

- [ ] Select any response in HTTP History → Headers tab
- [ ] Confirm **absence** of: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`
- [ ] Confirm **presence** of: `X-Powered-By: Next.js/16.3.7` (intentional disclosure)

### Content Discovery

- [ ] Burp → Target → right-click `recon.lab.uzyntra.com` → Engagement Tools → Discover content
- [ ] Manually fuzz `/admin/<word>` in Intruder → Sniper using `raft-medium-directories.txt`
- [ ] Check for `/sitemap.xml`, `/.env`, `/api/v1/users`

---

## Intentionally Vulnerable Endpoints

| Endpoint | Vulnerability | CWE | OWASP | Severity |
|---|---|---|---|---|
| `/debug` | Debug info disclosure | CWE-200 | A05:2021 | Medium |
| `/error-test` | Verbose error messages | CWE-209 | A05:2021 | High |
| `/robots.txt` | Path disclosure | CWE-538 | A05:2021 | Low |
| `/backup` | Open directory + file exposure | CWE-538 | A05:2021 | High |
| `/admin` | No authentication | CWE-306 | A01:2021 | Critical |
| `/internal` | Internal hostname leakage | CWE-200 | A01:2021 | High |
| `/lab-info.json` | Metadata disclosure | CWE-200 | A05:2021 | Low |
| All pages | Missing security headers | CWE-693 | A05:2021 | Medium |

---

## Suggested Next Module

> **Level 02 — Authentication & Session Management**
>
> Topics: login brute force, session fixation, insecure JWT, cookie flag analysis, password reset predictability.

Complete the [Level 01 Burp checklist](#burp-suite-level-01-testing-checklist) and document all findings before proceeding.

---

## Disclaimer

This lab is built and maintained by **UZYNTRA Security** exclusively for authorized cybersecurity training.  
All vulnerabilities use entirely fake data. No real systems, credentials, or PII are exposed.  
Unauthorized testing of systems you do not own is illegal. Always obtain written authorization.
