---
name: Lab Finding Submission
about: Submit a vulnerability finding from your pentest practice
title: "[FINDING] "
labels: finding
assignees: ''
---

## Finding Summary

| Field | Value |
|---|---|
| **Endpoint** | `/` |
| **Severity** | Critical / High / Medium / Low / Info |
| **CWE** | CWE-XXX |
| **OWASP** | A0X:2021 |

## Description
Describe the vulnerability you found and why it is exploitable.

## Steps to Reproduce
1. Configure Burp proxy (127.0.0.1:8080)
2. Navigate to...
3. Observe...

## Evidence
Paste the relevant request/response captured in Burp:

```http
GET /endpoint HTTP/1.1
Host: recon.lab.uzyntra.com
User-Agent: Mozilla/5.0
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{ ... }
```

## Impact
What could a real attacker do with this finding?

## Remediation
How should this be fixed in production?

## References
- OWASP: https://owasp.org/Top10/...
- CWE: https://cwe.mitre.org/data/definitions/XXX.html
