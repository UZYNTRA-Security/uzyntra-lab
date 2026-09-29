// INTENTIONALLY VULNERABLE FOR SECURITY TRAINING
// CWE-200: Exposure of Sensitive Information to an Unauthorized Actor
// OWASP A05:2021 - Security Misconfiguration
// This page simulates a developer debug endpoint accidentally left exposed in production.
// All data shown is FAKE — no real system information is disclosed.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debug — UZYNTRA App",
  // VULN: No noindex directive — search engines can index this page
  robots: "index, follow",
};

// INTENTIONALLY VULNERABLE: Fake environment/debug data exposed to unauthenticated users
const debugInfo = {
  application: {
    name: "UzyntraPortal",
    version: "3.2.1-beta",
    build: "20250917-142301",
    environment: "production", // VULN: Reveals deployment environment
    debug_mode: true,           // VULN: Debug mode left on in production
    maintenance: false,
  },
  framework: {
    name: "Next.js",
    version: "16.3.7",
    node_version: "v22.4.0",   // VULN: Exposes exact runtime version
    platform: "linux/amd64",
    pid: 28441,
  },
  database: {
    type: "PostgreSQL",         // VULN: Reveals DB technology
    version: "15.3",
    host: "db-prod-01.internal.uzyntra.com", // VULN: Internal hostname exposed
    port: 5432,
    name: "uzyntra_production",
    pool_size: 20,
    ssl: false,                 // VULN: SSL disabled
  },
  services: {
    cache: "Redis @ cache-01.internal:6379",        // VULN: Internal service topology
    queue: "RabbitMQ @ mq-prod.internal:5672",
    storage: "MinIO @ storage.internal.uzyntra.com",
    auth: "Keycloak @ sso.internal.uzyntra.com",
    metrics: "Prometheus @ metrics.internal:9090",
  },
  request: {
    server_software: "nginx/1.24.0",
    php_version: null,
    session_driver: "redis",
    csrf_protection: false,     // VULN: CSRF disabled
  },
};

function InfoRow({ label, value, vuln = false }: { label: string; value: string | number | boolean | null; vuln?: boolean }) {
  const displayValue = value === null ? "null" : String(value);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 py-2 border-b border-slate-800 last:border-0">
      <span className="sm:w-64 text-slate-400 text-xs font-mono">{label}</span>
      <span className={`font-mono text-sm ${vuln ? "text-red-400" : "text-green-400"}`}>
        {vuln && <span className="text-red-500 mr-1">⚠</span>}
        {displayValue}
      </span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden mb-6">
      <div className="bg-slate-800 px-4 py-2 border-b border-slate-700">
        <h2 className="text-slate-200 text-xs font-mono uppercase tracking-widest">{title}</h2>
      </div>
      <div className="px-4 py-2">{children}</div>
    </div>
  );
}

export default function DebugPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Warning banner */}
        <div className="bg-red-950 border border-red-700 rounded-lg px-5 py-4 mb-8 flex items-start gap-3">
          <span className="text-red-400 text-xl mt-0.5">⚠</span>
          <div>
            <p className="text-red-300 font-semibold text-sm">DEBUG MODE ACTIVE</p>
            <p className="text-red-400/80 text-xs mt-0.5">
              Application debug information is being exposed. This page should not be accessible in production.
              {/* INTENTIONALLY VULNERABLE: Real warning that's been ignored */}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white font-mono">
            Application Debug Console
          </h1>
          <p className="text-slate-500 text-sm font-mono mt-1">
            {/* VULN: Timestamp reveals server time and timezone */}
            Last refreshed: {new Date("2025-09-29T08:14:22Z").toISOString()} UTC
          </p>
        </div>

        {/* Application */}
        <Section title="Application Info">
          <InfoRow label="app.name"        value={debugInfo.application.name} />
          <InfoRow label="app.version"     value={debugInfo.application.version} vuln />
          <InfoRow label="app.build"       value={debugInfo.application.build} vuln />
          <InfoRow label="app.environment" value={debugInfo.application.environment} vuln />
          <InfoRow label="app.debug_mode"  value={debugInfo.application.debug_mode} vuln />
          <InfoRow label="app.maintenance" value={debugInfo.application.maintenance} />
        </Section>

        {/* Framework */}
        <Section title="Runtime & Framework">
          <InfoRow label="framework.name"         value={debugInfo.framework.name} />
          <InfoRow label="framework.version"      value={debugInfo.framework.version} vuln />
          <InfoRow label="runtime.node_version"   value={debugInfo.framework.node_version} vuln />
          <InfoRow label="runtime.platform"       value={debugInfo.framework.platform} vuln />
          <InfoRow label="process.pid"            value={debugInfo.framework.pid} vuln />
        </Section>

        {/* Database */}
        <Section title="Database Configuration">
          <InfoRow label="db.type"         value={debugInfo.database.type} vuln />
          <InfoRow label="db.version"      value={debugInfo.database.version} vuln />
          <InfoRow label="db.host"         value={debugInfo.database.host} vuln />
          <InfoRow label="db.port"         value={debugInfo.database.port} vuln />
          <InfoRow label="db.name"         value={debugInfo.database.name} vuln />
          <InfoRow label="db.pool_size"    value={debugInfo.database.pool_size} />
          <InfoRow label="db.ssl"          value={debugInfo.database.ssl} vuln />
        </Section>

        {/* Internal services */}
        <Section title="Internal Services">
          <InfoRow label="services.cache"   value={debugInfo.services.cache} vuln />
          <InfoRow label="services.queue"   value={debugInfo.services.queue} vuln />
          <InfoRow label="services.storage" value={debugInfo.services.storage} vuln />
          <InfoRow label="services.auth"    value={debugInfo.services.auth} vuln />
          <InfoRow label="services.metrics" value={debugInfo.services.metrics} vuln />
        </Section>

        {/* Request/server */}
        <Section title="Server Configuration">
          <InfoRow label="server.software"       value={debugInfo.request.server_software} vuln />
          <InfoRow label="session.driver"        value={debugInfo.request.session_driver} vuln />
          <InfoRow label="security.csrf"         value={debugInfo.request.csrf_protection} vuln />
        </Section>

        {/* Training callout */}
        <div className="bg-amber-950/40 border border-amber-700/50 rounded-lg p-5 mt-8">
          <p className="text-amber-400 font-semibold text-sm mb-2">🎯 Training Objective</p>
          <p className="text-slate-400 text-xs leading-relaxed">
            This page simulates <strong className="text-slate-300">CWE-200 Information Disclosure</strong> — 
            a developer debug endpoint accidentally exposed to the public internet. 
            In Burp Suite, use the <em>Target → Site Map</em> to capture this response and 
            manually review the JSON/HTML for leaked internal hostnames, software versions, 
            and configuration details that could accelerate an attack.
          </p>
          <p className="text-amber-500 text-xs font-mono mt-3">
            OWASP A05:2021 · CWE-200 · CVSS Base: Medium
          </p>
        </div>
      </div>
    </div>
  );
}
