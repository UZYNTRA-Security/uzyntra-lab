// INTENTIONALLY VULNERABLE FOR SECURITY TRAINING
// CWE-538: File and Directory Information Exposure
// OWASP A05:2021 - Security Misconfiguration
// Simulates an exposed backup/staging directory — a common misconfiguration
// where web servers serve directory listings for backup paths.
// ALL FILES listed here contain only dummy content — nothing real is exposed.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Index of /backup — UzyntraPortal",
  robots: "noindex",
};

// VULN: Fake backup file listing — simulates open directory on web server
const backupFiles = [
  {
    name: "website-backup.zip",
    size: "48.2 MB",
    modified: "2025-09-15 02:11:33",
    type: "application/zip",
    icon: "📦",
    description: "Full website source backup",
    href: "/backup/website-backup.zip",
  },
  {
    name: "database-schema.sql",
    size: "182 KB",
    modified: "2025-09-14 23:45:01",
    type: "text/plain",
    icon: "🗄️",
    description: "PostgreSQL schema dump",
    href: "/backup/database-schema.sql",
  },
  {
    name: "config-backup.txt",
    size: "4.1 KB",
    modified: "2025-09-14 23:47:22",
    type: "text/plain",
    icon: "⚙️",
    description: "Application configuration snapshot",
    href: "/backup/config-backup.txt",
  },
  {
    name: "users-export-2025-09.csv",
    size: "2.8 MB",
    modified: "2025-09-01 00:00:12",
    type: "text/csv",
    icon: "👥",
    description: "Monthly user data export",
    href: "/backup/users-export-2025-09.csv",
  },
  {
    name: ".env.production.bak",
    size: "1.2 KB",
    modified: "2025-08-30 14:22:09",
    type: "text/plain",
    icon: "🔑",
    description: "Production environment backup",
    href: "/backup/.env.production.bak",
  },
];

export default function BackupPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Styled like an nginx directory listing */}
        <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">

          {/* Fake nginx header */}
          <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
            <h1 className="text-white font-mono text-lg">Index of /backup</h1>
            <p className="text-slate-400 text-xs font-mono mt-1">
              {/* VULN: Server software version revealed in directory listing */}
              nginx/1.24.0 — recon.lab.uzyntra.com
            </p>
          </div>

          {/* Breadcrumb */}
          <div className="px-6 py-2 border-b border-slate-800 bg-slate-900/50">
            <p className="text-slate-400 text-xs font-mono">
              <span className="text-cyan-400">../</span> &nbsp;→&nbsp; <span className="text-slate-200">backup/</span>
            </p>
          </div>

          {/* File table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/50">
                  <th className="text-left text-slate-400 font-mono text-xs px-6 py-2">Name</th>
                  <th className="text-left text-slate-400 font-mono text-xs px-4 py-2">Last Modified</th>
                  <th className="text-left text-slate-400 font-mono text-xs px-4 py-2">Size</th>
                  <th className="text-left text-slate-400 font-mono text-xs px-4 py-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {backupFiles.map((file) => (
                  <tr
                    key={file.name}
                    className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-3">
                      {/* VULN: Direct download links exposed to unauthenticated users */}
                      <a
                        href={file.href}
                        className="text-cyan-400 hover:text-cyan-300 font-mono text-sm underline flex items-center gap-2 pointer-events-none"
                        aria-disabled="true"
                        title="File download simulated — dummy content only"
                      >
                        <span>{file.icon}</span>
                        {file.name}
                      </a>
                      <p className="text-slate-500 text-xs mt-0.5 ml-6">{file.description}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs whitespace-nowrap">
                      {file.modified}
                    </td>
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">{file.size}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{file.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-slate-700 bg-slate-800/30">
            <p className="text-slate-500 text-xs font-mono">
              5 files · Total size: 51.3 MB · Auto-backup enabled (daily 02:00 UTC)
            </p>
          </div>
        </div>

        {/* Dummy file content previews */}
        <div className="mt-8 space-y-4">
          <h2 className="text-slate-300 font-mono text-sm uppercase tracking-widest">
            ▸ File Contents (Preview)
          </h2>

          {/* config-backup.txt preview */}
          <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
              <span className="text-slate-400 font-mono text-xs">config-backup.txt</span>
              {/* VULN: Config file exposed with fake credentials and internal endpoints */}
              <span className="ml-auto text-red-400 text-xs font-mono">⚠ SENSITIVE</span>
            </div>
            <pre className="p-4 text-green-400 text-xs font-mono leading-5 overflow-x-auto">{`# UzyntraPortal Configuration Backup
# Generated: 2025-09-14 23:47:22 UTC
# INTENTIONALLY VULNERABLE — ALL VALUES ARE FAKE

APP_NAME=UzyntraPortal
APP_VERSION=3.2.1-beta
APP_ENV=production
APP_SECRET=FAKE_SECRET_DO_NOT_USE_a7f3c9d2e1b8

DB_HOST=db-prod-01.internal.uzyntra.com
DB_PORT=5432
DB_NAME=uzyntra_production
DB_USER=app_user
DB_PASS=FAKE_PASSWORD_NOT_REAL

REDIS_URL=redis://cache-01.internal:6379/0
QUEUE_URL=amqp://mq-prod.internal:5672

ADMIN_EMAIL=admin@internal.uzyntra.com
SUPPORT_EMAIL=support@uzyntra.com

S3_BUCKET=uzyntra-prod-assets
S3_REGION=eu-west-1
AWS_KEY=FAKE_AWS_KEY_NOT_REAL
AWS_SECRET=FAKE_AWS_SECRET_NOT_REAL`}</pre>
          </div>

          {/* database-schema.sql preview */}
          <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 border-b border-slate-700">
              <span className="text-slate-400 font-mono text-xs">database-schema.sql (excerpt)</span>
            </div>
            {/* VULN: Schema reveals table/column names useful for SQL injection */}
            <pre className="p-4 text-blue-300 text-xs font-mono leading-5 overflow-x-auto">{`-- UzyntraPortal PostgreSQL Schema
-- INTENTIONALLY VULNERABLE — FAKE DATA ONLY

CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(128) NOT NULL,
  role          VARCHAR(20) DEFAULT 'user',
  api_key       VARCHAR(64),
  last_login    TIMESTAMP,
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sessions (
  id         UUID PRIMARY KEY,
  user_id    UUID REFERENCES users(id),
  token      VARCHAR(128) NOT NULL,
  expires_at TIMESTAMP NOT NULL
);

CREATE TABLE audit_logs (
  id         SERIAL PRIMARY KEY,
  user_id    UUID REFERENCES users(id),
  action     VARCHAR(100),
  ip_address INET,
  created_at TIMESTAMP DEFAULT NOW()
);`}</pre>
          </div>
        </div>

        {/* Training callout */}
        <div className="bg-amber-950/40 border border-amber-700/50 rounded-lg p-5 mt-8">
          <p className="text-amber-400 font-semibold text-sm mb-2">🎯 Training Objective</p>
          <ul className="text-slate-400 text-xs leading-6 space-y-1 list-disc list-inside">
            <li><strong className="text-slate-300">robots.txt recon</strong> — This path was discovered via <code className="text-cyan-400">/robots.txt</code> Disallow directive</li>
            <li><strong className="text-slate-300">Open directory listing</strong> — Web server auto-indexing exposes all backup files without authentication</li>
            <li><strong className="text-slate-300">Config exposure</strong> — <code className="text-cyan-400">.env.production.bak</code> contains fake credentials and internal hostnames</li>
            <li><strong className="text-slate-300">Schema exposure</strong> — SQL schema reveals table/column names for targeted injection</li>
            <li><strong className="text-slate-300">Burp tip</strong> — Spider this path with Burp&apos;s crawler to automatically discover all linked files</li>
          </ul>
          <p className="text-amber-500 text-xs font-mono mt-3">
            OWASP A05:2021 · CWE-538 · CWE-200 · CVSS Base: High
          </p>
        </div>

      </div>
    </div>
  );
}
