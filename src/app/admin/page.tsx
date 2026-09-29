// INTENTIONALLY VULNERABLE FOR SECURITY TRAINING
// CWE-306: Missing Authentication for Critical Function
// OWASP A01:2021 - Broken Access Control
// This page simulates an admin panel that has no authentication — 
// accessible to any unauthenticated user who discovers it.
// No real administrative functions are implemented.

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Panel — UzyntraPortal",
  // VULN: No noindex — admin paths indexed by search engines
  robots: "index, follow",
};

// VULN: Fake admin dashboard stats — no auth required to view
const fakeStats = [
  { label: "Total Users", value: "14,822", delta: "+42 today", color: "text-cyan-400" },
  { label: "Active Sessions", value: "1,204", delta: "Live", color: "text-green-400" },
  { label: "Failed Logins (24h)", value: "847", delta: "↑ 12%", color: "text-red-400" },
  { label: "Pending Reports", value: "37", delta: "3 critical", color: "text-amber-400" },
];

// VULN: Fake recent users — reveals user IDs, roles, and email format
const fakeUsers = [
  { id: "usr_001", email: "admin@internal.uzyntra.com", role: "superadmin", status: "active", last: "Just now" },
  { id: "usr_002", email: "jrivera@uzyntra.com", role: "admin", status: "active", last: "2 min ago" },
  { id: "usr_003", email: "a.patel@uzyntra.com", role: "analyst", status: "active", last: "15 min ago" },
  { id: "usr_004", email: "contractor_01@external.com", role: "viewer", status: "suspended", last: "3 days ago" },
  { id: "usr_005", email: "yuki.n@uzyntra.com", role: "admin", status: "active", last: "1 hour ago" },
];

// VULN: Exposes internal navigation structure — useful for content discovery
const adminLinks = [
  { href: "/admin/users", label: "User Management", icon: "👥" },
  { href: "/admin/settings", label: "System Settings", icon: "⚙️" },
  { href: "/admin/logs", label: "Audit Logs", icon: "📋" },
  { href: "/admin/reports", label: "Security Reports", icon: "📊" },
  { href: "/admin/api-keys", label: "API Keys", icon: "🔑" },
  { href: "/admin/backups", label: "Backup Management", icon: "💾" },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Training environment banner */}
        <div className="bg-amber-950 border border-amber-700 rounded-lg px-5 py-3 mb-6 flex items-center gap-3">
          <span className="text-amber-400 text-lg">⚠</span>
          <div>
            <p className="text-amber-300 font-semibold text-sm">Admin Panel — Training Environment</p>
            <p className="text-amber-500 text-xs">
              No authentication required. This simulates CWE-306 — Missing Authentication for Critical Function.
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            {/* VULN: Internal app name and version visible without auth */}
            <p className="text-slate-400 text-sm font-mono">UzyntraPortal v3.2.1-beta · {new Date("2025-09-29T08:14:22Z").toUTCString()}</p>
          </div>
          {/* VULN: Shows "logged in" as admin without any auth */}
          <div className="bg-green-900/40 border border-green-700/50 rounded-lg px-4 py-2">
            <p className="text-green-400 text-xs font-mono">● Authenticated as: <strong>superadmin</strong></p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {fakeStats.map(({ label, value, delta, color }) => (
            <div key={label} className="bg-slate-900 border border-slate-700 rounded-xl p-5">
              <p className="text-slate-400 text-xs mb-1">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-slate-500 text-xs mt-1">{delta}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Nav links — VULN: exposes all admin sub-paths */}
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
            <h2 className="text-white font-semibold text-sm mb-4">Admin Navigation</h2>
            <nav className="space-y-1">
              {adminLinks.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-colors text-sm"
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                  {/* VULN: Path disclosed */}
                  <span className="ml-auto text-slate-600 text-xs font-mono">{href}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* User table — VULN: user enumeration possible */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
              <h2 className="text-white font-semibold text-sm">Recent Users</h2>
              <span className="text-slate-500 text-xs font-mono">No auth required to view</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-800/40">
                    <th className="text-left text-slate-400 font-mono px-4 py-2">ID</th>
                    <th className="text-left text-slate-400 font-mono px-4 py-2">Email</th>
                    <th className="text-left text-slate-400 font-mono px-4 py-2">Role</th>
                    <th className="text-left text-slate-400 font-mono px-4 py-2">Status</th>
                    <th className="text-left text-slate-400 font-mono px-4 py-2">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {fakeUsers.map((u) => (
                    <tr key={u.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-2.5 text-slate-500 font-mono">{u.id}</td>
                      <td className="px-4 py-2.5 text-cyan-400 font-mono">{u.email}</td>
                      <td className="px-4 py-2.5">
                        <span className={`font-mono px-2 py-0.5 rounded text-xs ${
                          u.role === "superadmin"
                            ? "bg-red-900/50 text-red-300"
                            : u.role === "admin"
                            ? "bg-amber-900/50 text-amber-300"
                            : "bg-slate-800 text-slate-400"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`font-mono text-xs ${u.status === "active" ? "text-green-400" : "text-red-400"}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-500">{u.last}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Training callout */}
        <div className="bg-amber-950/40 border border-amber-700/50 rounded-lg p-5 mt-8">
          <p className="text-amber-400 font-semibold text-sm mb-2">🎯 Training Objective</p>
          <ul className="text-slate-400 text-xs leading-6 space-y-1 list-disc list-inside">
            <li><strong className="text-slate-300">CWE-306</strong> — Admin panel is fully accessible without any authentication challenge</li>
            <li><strong className="text-slate-300">User enumeration</strong> — User IDs, emails, and roles are disclosed to unauthenticated visitors</li>
            <li><strong className="text-slate-300">Path disclosure</strong> — Admin sub-paths (<code className="text-cyan-400">/admin/api-keys</code>, <code className="text-cyan-400">/admin/backups</code>) are visible for further discovery</li>
            <li><strong className="text-slate-300">Burp tip</strong> — Use <em>Target → Site Map → Right-click → Spider this host</em> to crawl all admin sub-paths</li>
          </ul>
          <p className="text-amber-500 text-xs font-mono mt-3">
            OWASP A01:2021 · CWE-306 · CWE-200 · CVSS Base: Critical
          </p>
        </div>

      </div>
    </div>
  );
}
