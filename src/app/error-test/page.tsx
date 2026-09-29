// INTENTIONALLY VULNERABLE FOR SECURITY TRAINING
// CWE-209: Generation of Error Message Containing Sensitive Information
// OWASP A05:2021 - Security Misconfiguration
// This page simulates verbose/unsafe error handling that leaks internal details.
// ALL data — SQL queries, file paths, stack traces — is 100% FAKE.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error — UzyntraPortal",
  robots: "noindex",
};

// VULN: Fake verbose error payload — simulates what a real misconfigured app would expose
const fakeError = {
  timestamp: "2025-09-29T08:14:22.441Z",
  request_id: "req_8f3a2c1d9e74b05f",
  error: {
    type: "DatabaseQueryException",
    code: "PGSQL-42601",
    message:
      "ERROR:  syntax error at or near \"WHERE\" at character 67\nLINE 1: SELECT * FROM users WHERE email = '' OR '1'='1' --  AND pass...\n                                                                   ^",
    // VULN: Exposes the raw (partially injectable) query structure
    query:
      "SELECT id, email, password_hash, role, last_login FROM users WHERE email = '' OR '1'='1' -- ' AND active = true LIMIT 1",
    // VULN: Leaks internal DB credentials structure in error context
    connection: {
      dsn: "postgresql://app_user:REDACTED@db-prod-01.internal.uzyntra.com:5432/uzyntra_production",
      driver: "pg",
      schema: "public",
    },
  },
  // VULN: Full stack trace exposes framework internals and file paths
  stack_trace: [
    "DatabaseQueryException: PGSQL-42601 syntax error",
    "    at QueryRunner.executeQuery (/var/www/uzyntra/node_modules/typeorm/query-runner/PostgresQueryRunner.js:287:15)",
    "    at async UserRepository.findByEmail (/var/www/uzyntra/src/repositories/UserRepository.ts:44:5)",
    "    at async AuthService.login (/var/www/uzyntra/src/services/AuthService.ts:112:18)",
    "    at async LoginController.handlePost (/var/www/uzyntra/src/controllers/auth/LoginController.ts:67:22)",
    "    at async Layer.handle (/var/www/uzyntra/node_modules/express/lib/router/layer.js:95:5)",
    "    at async next (/var/www/uzyntra/node_modules/express/lib/router/route.js:144:13)",
    "    at async Route.dispatch (/var/www/uzyntra/node_modules/express/lib/router/route.js:114:3)",
  ],
  // VULN: Server environment details leak
  server: {
    hostname: "web-prod-02.internal.uzyntra.com",
    pid: 28441,
    node: "v22.4.0",
    uptime_seconds: 318240,
    memory_rss_mb: 412,
    cwd: "/var/www/uzyntra",
    user: "www-data",
  },
};

export default function ErrorTestPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page header */}
        <div className="mb-8">
          <span className="text-red-400 text-xs font-mono">UNHANDLED EXCEPTION</span>
          <h1 className="text-2xl font-bold text-white font-mono mt-1">
            500 — Internal Server Error
          </h1>
          <p className="text-slate-500 text-sm font-mono">
            Request ID: <span className="text-slate-300">{fakeError.request_id}</span>
            &nbsp;·&nbsp;
            {fakeError.timestamp}
          </p>
        </div>

        {/* Error type banner */}
        <div className="bg-red-950 border border-red-700 rounded-lg px-5 py-4 mb-6 flex items-start gap-3">
          <span className="text-red-400 text-xl mt-0.5 shrink-0">✕</span>
          <div>
            <p className="text-red-300 font-semibold font-mono text-sm">
              {fakeError.error.type}: {fakeError.error.code}
            </p>
            {/* VULN: Full SQL error with the injection artifact visible */}
            <pre className="text-red-400/80 text-xs mt-2 whitespace-pre-wrap font-mono leading-relaxed">
              {fakeError.error.message}
            </pre>
          </div>
        </div>

        {/* Failed query — VULN */}
        <div className="mb-6">
          <h2 className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-2">
            ▸ Failed Query
          </h2>
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
            {/* VULN: Raw SQL with table/column names and injection attempt visible */}
            <pre className="text-yellow-300 text-sm font-mono whitespace-pre-wrap">
              {fakeError.error.query}
            </pre>
          </div>
          <p className="text-slate-600 text-xs font-mono mt-1.5">
            {/* VULN: DSN in error context */}
            DSN: <span className="text-slate-400">{fakeError.error.connection.dsn}</span>
          </p>
        </div>

        {/* Stack trace — VULN */}
        <div className="mb-6">
          <h2 className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-2">
            ▸ Stack Trace
          </h2>
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
            {fakeError.stack_trace.map((line, i) => (
              <p key={i} className={`text-xs font-mono leading-6 ${i === 0 ? "text-red-400" : "text-slate-400"}`}>
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Server env — VULN */}
        <div className="mb-8">
          <h2 className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-2">
            ▸ Server Environment
          </h2>
          <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
            {Object.entries(fakeError.server).map(([k, v]) => (
              <div
                key={k}
                className="flex flex-col sm:flex-row sm:items-center gap-1 px-4 py-2 border-b border-slate-800 last:border-0"
              >
                <span className="sm:w-48 text-slate-500 text-xs font-mono">{k}</span>
                <span className="text-orange-300 text-xs font-mono">{String(v)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Raw JSON toggle — simulates /api/error-detail */}
        <div className="mb-8">
          <h2 className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-2">
            ▸ Raw JSON Response (as returned by /api/v1/error-detail)
          </h2>
          {/* VULN: JSON error endpoint with full context exposed */}
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap">
              {JSON.stringify(fakeError, null, 2)}
            </pre>
          </div>
        </div>

        {/* Training callout */}
        <div className="bg-amber-950/40 border border-amber-700/50 rounded-lg p-5">
          <p className="text-amber-400 font-semibold text-sm mb-2">🎯 Training Objective</p>
          <ul className="text-slate-400 text-xs leading-6 space-y-1 list-disc list-inside">
            <li>
              <strong className="text-slate-300">CWE-209</strong> — Error messages reveal internal path structures, DB schema, and framework versions
            </li>
            <li>
              <strong className="text-slate-300">Stack traces</strong> — Expose exact file paths at <code className="text-cyan-400">/var/www/uzyntra/src/</code> useful for path traversal planning
            </li>
            <li>
              <strong className="text-slate-300">SQL error</strong> — The reflected query reveals table name (<code className="text-cyan-400">users</code>), columns (<code className="text-cyan-400">email, password_hash, role</code>), and confirms SQL injection possibility
            </li>
            <li>
              <strong className="text-slate-300">Burp tip</strong> — Intercept this response in Proxy → HTTP History, send to Repeater, observe the full error in the response body
            </li>
          </ul>
          <p className="text-amber-500 text-xs font-mono mt-3">
            OWASP A05:2021 · CWE-209 · CWE-89 (SQL) · CVSS Base: High
          </p>
        </div>

      </div>
    </div>
  );
}
