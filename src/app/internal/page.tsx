// INTENTIONALLY VULNERABLE FOR SECURITY TRAINING
// CWE-200: Information Disclosure — internal employee portal exposed
// Simulates an intranet page accidentally reachable from the public internet.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internal Portal — UZYNTRA",
  robots: "noindex, nofollow",
};

const announcements = [
  {
    date: "2025-09-27",
    title: "Production deployment window — Friday 22:00 UTC",
    author: "DevOps Team",
    body: "Scheduled maintenance on web-prod-01 and web-prod-02. Expect ~15 min downtime.",
  },
  {
    date: "2025-09-25",
    title: "New VPN endpoint: vpn2.internal.uzyntra.com",
    author: "IT Security",
    // VULN: Internal hostname and IP exposed
    body: "Primary VPN (vpn1.internal, 10.0.1.5) will be decommissioned Oct 15. Migrate to vpn2.internal (10.0.1.9).",
  },
  {
    date: "2025-09-20",
    title: "Quarterly pentest results — action items due Oct 10",
    author: "Security Team",
    body: "See SharePoint for the full report. High findings must be remediated before next sprint.",
  },
];

export default function InternalPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Training banner */}
        <div className="bg-red-950 border border-red-700 rounded-lg px-5 py-3 mb-8 flex items-center gap-3">
          <span className="text-red-400 text-xl">🔒</span>
          <div>
            <p className="text-red-300 font-semibold text-sm">RESTRICTED — Internal Use Only</p>
            <p className="text-red-400/80 text-xs">
              This page should be firewalled from the public internet.
              {/* VULN: No authentication, no IP restriction — accessible from anywhere */}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">UZYNTRA Internal Portal</h1>
          <p className="text-slate-400 text-sm font-mono mt-1">
            {/* VULN: Internal infrastructure details visible */}
            Served from: web-internal-01.uzyntra.com · Subnet: 10.0.2.0/24
          </p>
        </div>

        {/* Quick links — VULN: internal hostnames exposed */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Jira", href: "http://jira.internal.uzyntra.com" },
            { label: "Confluence", href: "http://wiki.internal.uzyntra.com" },
            { label: "GitLab", href: "http://git.internal.uzyntra.com" },
            { label: "Grafana", href: "http://metrics.internal:3000" },
          ].map(({ label, href }) => (
            <div key={label} className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-center">
              <p className="text-cyan-400 text-sm font-semibold">{label}</p>
              <p className="text-slate-600 text-xs font-mono mt-0.5">{href}</p>
            </div>
          ))}
        </div>

        {/* Announcements */}
        <h2 className="text-white font-semibold mb-4">Internal Announcements</h2>
        <div className="space-y-4">
          {announcements.map(({ date, title, author, body }) => (
            <div key={title} className="bg-slate-900 border border-slate-700 rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-slate-200 text-sm font-semibold">{title}</h3>
                <span className="text-slate-500 text-xs font-mono">{date}</span>
              </div>
              <p className="text-slate-400 text-xs mb-2">{body}</p>
              <p className="text-slate-600 text-xs font-mono">Posted by: {author}</p>
            </div>
          ))}
        </div>

        {/* Training callout */}
        <div className="bg-amber-950/40 border border-amber-700/50 rounded-lg p-5 mt-8">
          <p className="text-amber-400 font-semibold text-sm mb-2">🎯 Training Objective</p>
          <ul className="text-slate-400 text-xs leading-6 space-y-1 list-disc list-inside">
            <li><strong className="text-slate-300">Path found via</strong> <code className="text-cyan-400">/robots.txt</code> Disallow: /internal directive</li>
            <li><strong className="text-slate-300">Internal hostname leakage</strong> — VPN IPs, Jira/Confluence/GitLab URLs all disclosed</li>
            <li><strong className="text-slate-300">No authentication</strong> — accessible from public internet without any controls</li>
          </ul>
          <p className="text-amber-500 text-xs font-mono mt-3">
            OWASP A01:2021 · CWE-200 · CVSS Base: High
          </p>
        </div>

      </div>
    </div>
  );
}
