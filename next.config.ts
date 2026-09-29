import type { NextConfig } from "next";

// INTENTIONALLY VULNERABLE FOR SECURITY TRAINING
// Security headers are deliberately NOT configured here.
// This allows Burp Suite to observe missing:
//   - Content-Security-Policy
//   - X-Frame-Options
//   - X-Content-Type-Options
//   - Strict-Transport-Security
//   - Permissions-Policy
// CWE-693: Protection Mechanism Failure
// OWASP A05:2021 - Security Misconfiguration

const nextConfig: NextConfig = {
  // VULN: No security headers configured
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // VULN: Server header intentionally discloses technology
          { key: "X-Powered-By", value: "Next.js/16.3.7" },
          // VULN: No CSP, no X-Frame-Options, no X-Content-Type-Options
          // These are intentionally absent for training purposes
        ],
      },
    ];
  },

  // Rewrite /lab-info.json → /api/lab-info
  async rewrites() {
    return [
      {
        source: "/lab-info.json",
        destination: "/api/lab-info",
      },
    ];
  },
};

export default nextConfig;
