# Vercel Deployment Guide
## recon.lab.uzyntra.com

---

## Prerequisites

- Vercel account at [vercel.com](https://vercel.com) (free tier works)
- Access to DNS for `uzyntra.com`
- Node.js 20+ installed locally

---

## Step 1 — Install Vercel CLI

```bash
npm install -g vercel
vercel login
```

---

## Step 2 — Link Project

From the project directory:

```bash
cd uzyntra-lab
vercel link
```

Select or create the project in your Vercel dashboard.

---

## Step 3 — Set Environment Variables

```bash
vercel env add NEXT_PUBLIC_SITE_URL production
# Enter value: https://recon.lab.uzyntra.com

vercel env add NEXT_PUBLIC_LAB_ENV production
# Enter value: production
```

---

## Step 4 — Deploy to Production

```bash
vercel --prod
```

Vercel will build and deploy. Note the deployment URL (e.g. `uzyntra-lab-xxx.vercel.app`).

---

## Step 5 — Configure Custom Domain

### In Vercel Dashboard

1. Open your project → **Settings** → **Domains**
2. Click **Add Domain**
3. Enter: `recon.lab.uzyntra.com`
4. Click **Add**

### In Your DNS Provider

Add a CNAME record:

| Type | Name | Value | TTL |
|---|---|---|---|
| CNAME | `recon.lab` | `cname.vercel-dns.com` | 300 |

> If your DNS provider doesn't support CNAME on a subdomain, use an A record:
> ```
> A    recon.lab    76.76.21.21
> ```

### Verify

Wait 2–5 minutes for DNS propagation, then:

```bash
curl -I https://recon.lab.uzyntra.com/
# Should return: HTTP/2 200
# And show: x-vercel-id header
```

---

## Step 6 — Verify Deployment

Test all intentionally vulnerable endpoints:

```bash
BASE=https://recon.lab.uzyntra.com

# Public pages
curl -s -o /dev/null -w "%{http_code}" $BASE/          # 200
curl -s -o /dev/null -w "%{http_code}" $BASE/about     # 200
curl -s -o /dev/null -w "%{http_code}" $BASE/contact   # 200

# Vulnerable endpoints
curl -s -o /dev/null -w "%{http_code}" $BASE/debug         # 200 (vuln)
curl -s -o /dev/null -w "%{http_code}" $BASE/error-test    # 200 (vuln)
curl -s -o /dev/null -w "%{http_code}" $BASE/backup        # 200 (vuln)
curl -s -o /dev/null -w "%{http_code}" $BASE/admin         # 200 (vuln - no auth)
curl -s -o /dev/null -w "%{http_code}" $BASE/internal      # 200 (vuln)
curl -s -o /dev/null -w "%{http_code}" $BASE/robots.txt    # 200
curl -s -o /dev/null -w "%{http_code}" $BASE/lab-info.json # 200

echo "All endpoints responding"
```

---

## GitHub Actions Automated Deploy (Optional)

Add these secrets to your GitHub repo (`Settings → Secrets → Actions`):

| Secret | Where to find it |
|---|---|
| `VERCEL_TOKEN` | vercel.com → Account Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` after `vercel link` |

The `.github/workflows/deploy-preview.yml` workflow will then auto-deploy previews on every PR.

---

## Redeploy After Changes

```bash
# Preview deploy (staging)
vercel

# Production deploy
vercel --prod
```

Or just push to `main` branch — Vercel auto-deploys from GitHub if connected.

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Build fails on Vercel | Check `npm run build` locally first |
| SSL error on custom domain | Wait 10 min for SSL provisioning; check DNS CNAME |
| 404 on routes | Ensure `next.config.ts` rewrites are correct |
| Environment vars not loading | Check `vercel env ls` — re-add if missing |
