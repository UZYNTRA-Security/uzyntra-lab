# Burp Suite Community Edition — Setup Guide

Complete setup guide for testing `recon.lab.uzyntra.com` from Kali Linux.

---

## 1. Install Burp Suite Community

Burp Suite Community is pre-installed on Kali Linux. Verify:

```bash
burpsuite --version
# or launch from Applications → Web Application Analysis → burpsuite
```

If not installed:
```bash
sudo apt update && sudo apt install burpsuite -y
```

---

## 2. Launch and Configure Proxy

1. Launch Burp Suite
2. Select **Temporary project** → **Use Burp defaults** → **Start Burp**
3. Go to **Proxy → Proxy settings**
4. Confirm the listener is on `127.0.0.1:8080` (default)

---

## 3. Configure Browser Proxy (Firefox on Kali)

### Option A — FoxyProxy (recommended)

```bash
# Firefox → Extensions → search "FoxyProxy Standard" → Install
```

Configure FoxyProxy:
- Host: `127.0.0.1`
- Port: `8080`
- Enable for all URLs

### Option B — Manual proxy settings

Firefox → Settings → Network Settings → Manual proxy:
```
HTTP Proxy: 127.0.0.1    Port: 8080
HTTPS Proxy: 127.0.0.1   Port: 8080
☑ Use this proxy server for all protocols
```

---

## 4. Install Burp CA Certificate (for HTTPS)

Burp intercepts HTTPS by acting as a man-in-the-middle. You need to trust its CA certificate.

1. With Burp proxy active, navigate to: `http://burpsuite` in Firefox
2. Click **CA Certificate** to download `cacert.der`
3. Firefox → Settings → Privacy & Security → Certificates → **View Certificates**
4. Authorities tab → **Import** → select `cacert.der`
5. Check: **Trust this CA to identify websites**
6. Click OK

Now navigate to `https://recon.lab.uzyntra.com/` — Burp should intercept without SSL errors.

---

## 5. Add Lab to Burp Scope

1. In Burp → **Target → Site Map**
2. Right-click `recon.lab.uzyntra.com` → **Add to scope**
3. Go to **Target → Scope settings**
4. Confirm `https://recon.lab.uzyntra.com` is listed

This restricts Burp's logging and scanning to the lab domain only.

---

## 6. Intercept Traffic

1. Go to **Proxy → Intercept**
2. Click **Intercept is off** to toggle it **ON**
3. Browse to `https://recon.lab.uzyntra.com/` in Firefox
4. The request will pause in Burp — review headers, then click **Forward**
5. Toggle intercept **OFF** for passive browsing

---

## 7. Key Burp Features for Level 01

### HTTP History
`Proxy → HTTP History`  
Every request/response is logged here. Review responses for:
- Information disclosure in body
- Missing/present security headers
- Server version disclosure

**Useful filters:**
- Filter by URL contains: `uzyntra`
- Filter by response code: `200`

### Repeater
1. In HTTP History, right-click a request → **Send to Repeater** (Ctrl+R)
2. Switch to **Repeater** tab
3. Modify the request and click **Send**
4. Compare responses — useful for:
   - Confirming `/debug` leaks the same data every time
   - Testing different paths on `/backup`
   - Verifying `/admin` returns 200 without cookies

### Target Site Map
`Target → Site Map`  
Shows all discovered URLs. After browsing manually:
- Right-click the host → **Spider this host** (passive crawl)
- Expand the tree to find linked paths

### Content Discovery (Manual Intruder)
1. Send a request to `/FUZZ` to **Repeater** first, then to **Intruder**
2. **Intruder → Positions** — mark the path segment as payload position:
   ```
   GET /§backup§ HTTP/1.1
   ```
3. **Payloads** → Payload type: **Simple list**
4. Load a wordlist from: `/usr/share/wordlists/dirb/common.txt`
5. **Start attack** — filter results by response length or status code

### Decoder
`Decoder` tab  
Use to decode/encode:
- Base64 values found in cookies or responses
- URL-encoded strings
- HTML entities

### Search in Response
In Repeater or HTTP History:
- Click the **Response** tab
- `Ctrl+F` to search for keywords: `password`, `SELECT`, `internal`, `stack`

---

## 8. Export Findings

To save evidence for your pentest report:

1. HTTP History → select a request → right-click → **Copy as curl command**
2. Or: right-click → **Save item** to export request/response as XML

---

## 9. Useful Wordlists on Kali

```bash
# Directory/file discovery
/usr/share/wordlists/dirb/common.txt
/usr/share/wordlists/dirb/big.txt
/usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt
/usr/share/seclists/Discovery/Web-Content/raft-medium-files.txt

# Install SecLists if not present
sudo apt install seclists -y
```

---

## 10. curl Quick Tests from Terminal

```bash
# Check robots.txt
curl https://recon.lab.uzyntra.com/robots.txt

# Check response headers for missing security headers
curl -I https://recon.lab.uzyntra.com/

# Fetch lab vulnerability catalogue
curl https://recon.lab.uzyntra.com/lab-info.json | python3 -m json.tool

# Test debug endpoint
curl https://recon.lab.uzyntra.com/debug | grep -E "host|version|db|internal"

# Check admin without cookies
curl -I https://recon.lab.uzyntra.com/admin
# Should return 200, not 401 or 302 — that's the vulnerability
```
