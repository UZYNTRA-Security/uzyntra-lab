# Security Policy

## About This Repository

This is an **intentionally vulnerable** cybersecurity training application built for **UZYNTRA Security**.

All vulnerabilities are **deliberate** and use **entirely fake data**. This is not a bug — it is the purpose of the project.

## Scope

| Component | Status |
|---|---|
| Intentional training vulnerabilities (fake data) | ✅ Expected — not a bug |
| Real credentials or secrets committed to the repo | 🚨 Report immediately |
| Build pipeline vulnerabilities (CI/CD) | 🚨 Report immediately |
| Dependency vulnerabilities (npm audit) | 📋 Use the issue tracker |

## Reporting a Real Security Issue

If you discover a **real** security issue in this repository (e.g. a real secret committed, a supply chain issue, or a CI/CD vulnerability), please **do not open a public issue**.

Contact us privately:

📧 **security@uzyntra.com**  
🔑 PGP key: [keys.openpgp.org/search?q=security@uzyntra.com](https://keys.openpgp.org)

Please include:
- Description of the issue
- Steps to reproduce
- Potential impact
- Suggested remediation (if known)

We will respond within **48 hours** and coordinate disclosure responsibly.

## Authorized Testing

This lab is deployed at `recon.lab.uzyntra.com` for authorized testing only.

**Authorized:**
- Testing against `recon.lab.uzyntra.com` with your own Burp Suite instance
- Submitting lab findings via GitHub Issues using the Finding template

**Not authorized:**
- Testing against any other UZYNTRA infrastructure
- Automated scanning at rates that affect availability
- Attempting to access data beyond the intentional training content

## Vulnerability Disclosure Policy

We follow a **90-day coordinated disclosure** policy for any real vulnerabilities found in our production infrastructure.

---

*This file was generated for the UZYNTRA Security Web Pentest Lab.*
