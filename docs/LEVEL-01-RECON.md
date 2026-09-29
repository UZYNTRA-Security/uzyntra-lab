# Level 01 — Reconnaissance & Information Disclosure

**Lab Domain:** `recon.lab.uzyntra.com`  
**Difficulty:** Beginner  
**Estimated Time:** 2 hours  
**Tools Required:** Burp Suite Community Edition, Kali Linux (or any OS with a browser)

---

## Learning Objectives

By completing this module you will be able to:

1. Perform passive web reconnaissance using Burp Suite's Proxy and Site Map
2. Identify information disclosure vulnerabilities in HTTP responses and page content
3. Analyse `robots.txt` for unintentionally disclosed internal paths
4. Discover exposed debug and backup endpoints via manual browsing and content discovery
5. Evaluate HTTP response headers for missing security controls
6. Map findings to OWASP Top 10 and CWE identifiers
7. Produce a professional-style pentest finding report for each vulnerability

---

## Vulnerability Index

### VULN-001 — Debug Information Disclosure

| Field | Value |
|---|---|
| **Endpoint** | `/debug` |
| **CWE** | CWE-200: Exposure of Sensitive Information |
| **OWASP** | A05:2021 — Security Misconfiguration |
| **Severity** | Medium |
| **CVSS v3.1** | 5.3 (AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N) |

**Description**  
A developer debug page is accessible without authentication. It exposes application name, version, build ID, environment name, Node.js runtime version, internal database hostname and port, and internal service endpoints (Redis, RabbitMQ, MinIO, Keycloak, Prometheus).

**Impact**  
An attacker learns the exact technology stack and internal network topology, dramatically reducing the effort required to plan targeted attacks.

**Expected Burp Observations**
- HTTP 200 response at `/debug`
- Response body contains strings like `db-prod-01.internal.uzyntra.com`, `PostgreSQL 15.3`, `debug_mode: true`
- No `WWW-Authenticate` or redirect to login
- Response header `X-Powered-By: Next.js/16.3.7` disclosed

**Testing Methodology**
```
1. Set Burp proxy (127.0.0.1:8080) in browser
2. Visit https://recon.lab.uzyntra.com/debug
3. In Burp → Proxy → HTTP History, locate the GET /debug request
4. Review Response tab — note all disclosed fields
5. Send to Repeater (Ctrl+R) and confirm repeatable disclosure
6. In Target → Site Map, right-click → Add to scope
```

**Remediation**
- Remove all debug endpoints before deploying to production
- Gate any diagnostic pages behind authentication + IP allowlist
- Use environment variables to disable debug output in `NODE_ENV=production`
- Implement a secrets scanner in CI/CD to catch internal hostnames in code

---

### VULN-002 — Verbose Error Message Disclosure

| Field | Value |
|---|---|
| **Endpoint** | `/error-test` |
| **CWE** | CWE-209: Information Exposure Through Error Messages |
| **OWASP** | A05:2021 — Security Misconfiguration |
| **Severity** | High |
| **CVSS v3.1** | 7.5 (AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N) |

**Description**  
Application errors are returned verbatim to the client. The response includes the raw SQL query (including the injection attempt), PostgreSQL error code, full Node.js stack trace with absolute file paths, server hostname, PID, and working directory.

**Impact**  
- SQL table/column names (`users.email`, `users.password_hash`, `users.role`) enable targeted SQL injection
- Absolute paths (`/var/www/uzyntra/src/`) support path traversal attack planning
- Stack trace reveals exact library versions for known CVE matching

**Expected Burp Observations**
- HTTP 500 response body contains `DatabaseQueryException`
- JSON field `stack_trace` lists absolute server paths
- SQL query with `OR '1'='1'` pattern visible in `error.query` field
- `server.hostname` and `server.cwd` present in response

**Testing Methodology**
```
1. Visit https://recon.lab.uzyntra.com/error-test
2. In Burp → Proxy → HTTP History, locate the request
3. Search response (Ctrl+F in Repeater) for:
   - "SELECT" → reveals SQL schema
   - "/var/www" → reveals server file path
   - "password_hash" → confirms column exists
4. Use Intruder or Repeater to probe /api/v1/error-detail for JSON variant
```

**Remediation**
- Return generic error pages to clients: `"An error occurred. Please try again."`
- Log full errors server-side only (structured logging to a SIEM)
- Set `NODE_ENV=production` — Next.js and Express suppress stack traces automatically
- Never include raw SQL in error responses

---

### VULN-003 — robots.txt Path Disclosure

| Field | Value |
|---|---|
| **Endpoint** | `/robots.txt` |
| **CWE** | CWE-538: File and Directory Information Exposure |
| **OWASP** | A05:2021 — Security Misconfiguration |
| **Severity** | Low |
| **CVSS v3.1** | 3.7 (AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N) |

**Description**  
`robots.txt` Disallow directives list sensitive application paths including `/admin`, `/backup`, `/debug`, `/internal`, and several API endpoints. While `robots.txt` is intended to guide search engine crawlers, it effectively provides a map of sensitive paths to any attacker.

**Expected Burp Observations**
- `GET /robots.txt` returns plain text with Disallow entries
- Paths like `/admin` and `/backup` are directly enumerated
- No authentication is required to fetch this file

**Testing Methodology**
```
1. Visit https://recon.lab.uzyntra.com/robots.txt
2. Note all Disallow: paths
3. Manually browse each path (or run Burp's content discovery against the list)
4. Use Burp → Target → Site Map to verify each path resolves
```

**Remediation**
- Never list sensitive paths in `robots.txt` — it advertises them to attackers
- Protect sensitive paths with authentication, not obscurity
- Use `noindex` meta tags or `X-Robots-Tag` headers on internal pages instead

---

### VULN-004 — Backup Directory Exposure

| Field | Value |
|---|---|
| **Endpoint** | `/backup` |
| **CWE** | CWE-538: File and Directory Information Exposure |
| **OWASP** | A05:2021 — Security Misconfiguration |
| **Severity** | High |
| **CVSS v3.1** | 7.5 (AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N) |

**Description**  
An nginx-style directory listing at `/backup` exposes multiple sensitive files including a full website source archive, database schema SQL, application config with (fake) credentials, a user data CSV export, and a `.env.production.bak` file.

**Impact**  
- `config-backup.txt` contains DB credentials and internal service endpoints
- `database-schema.sql` reveals the full table structure enabling precision SQL injection
- `users-export-2025-09.csv` would contain PII if real
- `.env.production.bak` contains all application secrets

**Expected Burp Observations**
- `GET /backup` returns HTTP 200 with a directory listing
- Links to downloadable files visible in response body
- No `401 Unauthorized` or redirect to login

**Testing Methodology**
```
1. Discovered via /robots.txt Disallow: /backup
2. Visit https://recon.lab.uzyntra.com/backup
3. In Burp → Proxy → HTTP History, review the response
4. Send each file link to Repeater and fetch individually
5. Use Burp → Intruder to fuzz /backup/<wordlist> for additional files
   Wordlist: raft-medium-files.txt from SecLists
```

**Remediation**
- Move backup files outside the web root entirely
- If web-accessible backups are required, gate with authentication + IP restriction
- Disable directory listing in nginx: `autoindex off;`
- Encrypt backup archives and use signed download URLs with expiry

---

### VULN-005 — Unauthenticated Admin Panel

| Field | Value |
|---|---|
| **Endpoint** | `/admin` |
| **CWE** | CWE-306: Missing Authentication for Critical Function |
| **OWASP** | A01:2021 — Broken Access Control |
| **Severity** | Critical |
| **CVSS v3.1** | 9.1 (AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N) |

**Description**  
The administrative dashboard is fully accessible to any unauthenticated user. It displays user counts, active session count, failed login statistics, internal user table with IDs/emails/roles, and navigation links to all admin sub-sections.

**Impact**  
- Complete user enumeration (IDs, emails, roles)
- Full administrative capability without credentials
- Exposure of internal navigation structure for further content discovery
- In a real system: account takeover, data exfiltration, configuration changes

**Expected Burp Observations**
- `GET /admin` returns HTTP 200 (no 401/302 redirect to login)
- Response contains `superadmin`, email addresses, and user IDs
- Response header has no `Set-Cookie` indicating session was established

**Testing Methodology**
```
1. Discovered via /robots.txt Disallow: /admin
2. Visit https://recon.lab.uzyntra.com/admin in a fresh private window (no cookies)
3. Burp → Proxy → HTTP History → confirm no auth challenge in response
4. Note all exposed sub-paths in the navigation panel
5. Use Burp → Intruder → Sniper on /admin/<path> with a directory wordlist
6. Document each exposed admin sub-path
```

**Remediation**
- Implement authentication on all `/admin/*` routes before serving any content
- Use middleware to check session/JWT on every admin request
- Apply IP allowlist restricting admin access to corporate VPN ranges
- Log all admin access attempts to a SIEM

---

### VULN-006 — Missing Security Headers

| Field | Value |
|---|---|
| **Endpoint** | All pages |
| **CWE** | CWE-693: Protection Mechanism Failure |
| **OWASP** | A05:2021 — Security Misconfiguration |
| **Severity** | Medium |
| **CVSS v3.1** | 5.4 (AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N) |

**Description**  
HTTP responses lack the following security headers:

| Header | Impact if Missing |
|---|---|
| `Content-Security-Policy` | XSS attacks possible, inline scripts execute |
| `X-Frame-Options` | Clickjacking attacks possible |
| `X-Content-Type-Options` | MIME-sniffing attacks possible |
| `Strict-Transport-Security` | SSL stripping attacks possible |
| `Permissions-Policy` | Browser features (camera, mic) can be abused |

**Expected Burp Observations**
- In Burp → Proxy → HTTP History, select any response
- Switch to the **Headers** tab
- Confirm none of the above headers are present
- Burp Scanner (Pro) or the manual check above confirms the gap

**Testing Methodology**
```
1. Visit https://recon.lab.uzyntra.com/
2. In Burp → Proxy → HTTP History → select the response
3. In the Headers tab, look for (and confirm absence of):
   - Content-Security-Policy
   - X-Frame-Options
   - X-Content-Type-Options
   - Strict-Transport-Security
4. Also check: curl -I https://recon.lab.uzyntra.com/
```

**Remediation**  
Add in `next.config.ts`:
```typescript
async headers() {
  return [{
    source: "/(.*)",
    headers: [
      { key: "Content-Security-Policy", value: "default-src 'self'" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ],
  }];
}
```

---

## Professional Pentest Report Template

```
===============================================================
FINDING: Debug Information Disclosure
===============================================================
Target:     https://recon.lab.uzyntra.com/debug
Date:       2025-09-29
Tester:     [Your Name]
Reference:  VULN-001

SEVERITY:   Medium
CVSS v3.1:  5.3

CWE:        CWE-200
OWASP:      A05:2021 – Security Misconfiguration

DESCRIPTION:
The /debug endpoint is publicly accessible without authentication
and returns detailed internal application information including
database hostname, framework version, PID, internal service
addresses, and deployment environment name.

EVIDENCE:
  Request:  GET /debug HTTP/1.1
            Host: recon.lab.uzyntra.com

  Response: HTTP/1.1 200 OK
            [Body contains db-prod-01.internal.uzyntra.com,
             PostgreSQL 15.3, node v22.4.0, etc.]

IMPACT:
An unauthenticated attacker obtains the full internal network
topology and exact technology versions, enabling targeted
exploitation of known CVEs and reducing attack planning time.

PROOF OF CONCEPT:
  curl https://recon.lab.uzyntra.com/debug | grep -E "host|version|db"

REMEDIATION:
  1. Remove the /debug route entirely from production
  2. If required for ops, restrict to VPN IP range only
  3. Require authentication (RBAC role: ops-admin)
  4. Add to CI/CD pre-deploy checklist: no debug routes in prod

REFERENCES:
  - https://owasp.org/Top10/A05_2021-Security_Misconfiguration/
  - https://cwe.mitre.org/data/definitions/200.html
===============================================================
```

---

## Burp Suite Community — Level 01 Checklist

- [ ] Configure Burp proxy: `127.0.0.1:8080` in browser
- [ ] Add `recon.lab.uzyntra.com` to Burp target scope
- [ ] Browse all public pages — confirm they appear in Site Map
- [ ] Fetch `/robots.txt` — note all Disallow paths
- [ ] Browse each path from robots.txt — document HTTP status codes
- [ ] Review `/debug` response in HTTP History — extract all leaked values
- [ ] Review `/error-test` response — identify SQL query, stack trace, paths
- [ ] Review `/backup` — list all exposed files and fetch each one
- [ ] Review `/admin` — confirm no auth challenge (HTTP 200 not 401/302)
- [ ] Check `/internal` — note internal hostnames and IPs
- [ ] Fetch `/lab-info.json` — review full vulnerability catalogue
- [ ] Check HTTP response headers — confirm missing security headers
- [ ] Use Intruder → Sniper on `/admin/<word>` with `raft-medium-directories.txt`
- [ ] Document each finding with: endpoint, severity, evidence, remediation

---

## Suggested Next Module

**Level 02 — Authentication & Session Management**

Topics:
- Login brute force (rate limiting bypass)
- Weak password policy enumeration
- Session fixation and session token analysis
- Insecure JWT (`alg: none`, weak secret)
- Password reset link predictability
- Cookie flags: missing `HttpOnly`, `Secure`, `SameSite`
