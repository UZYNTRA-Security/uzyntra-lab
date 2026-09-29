// INTENTIONALLY VULNERABLE FOR SECURITY TRAINING
// Serves /lab-info.json — an exposed API endpoint disclosing lab metadata.
// All data is fake and for training purposes only.

import { NextResponse } from "next/server";

const labInfo = {
  lab: {
    name: "UZYNTRA Security Web Pentest Lab",
    module: "Level 01 — Reconnaissance & Information Disclosure",
    domain: "recon.lab.uzyntra.com",
    version: "1.0.0",
    difficulty: "Beginner",
    estimated_time_hours: 2,
    author: "UZYNTRA Security Training Team",
    last_updated: "2025-09-29",
  },
  learning_objectives: [
    "Perform passive and active reconnaissance using Burp Suite",
    "Identify information disclosure vulnerabilities (CWE-200, CWE-209)",
    "Analyze robots.txt for hidden path discovery",
    "Detect exposed debug and backup endpoints",
    "Review HTTP response headers for security misconfigurations",
    "Understand OWASP A05:2021 Security Misconfiguration in practice",
  ],
  enabled_vulnerabilities: [
    {
      id: "VULN-001",
      name: "Debug Information Disclosure",
      endpoint: "/debug",
      cwe: "CWE-200",
      owasp: "A05:2021",
      severity: "Medium",
      description: "Developer debug page exposed with internal app, DB, and service information",
    },
    {
      id: "VULN-002",
      name: "Verbose Error Message Disclosure",
      endpoint: "/error-test",
      cwe: "CWE-209",
      owasp: "A05:2021",
      severity: "High",
      description: "Application errors expose SQL queries, stack traces, and internal file paths",
    },
    {
      id: "VULN-003",
      name: "robots.txt Path Disclosure",
      endpoint: "/robots.txt",
      cwe: "CWE-538",
      owasp: "A05:2021",
      severity: "Low",
      description: "Sensitive paths disclosed in robots.txt aiding content discovery",
    },
    {
      id: "VULN-004",
      name: "Backup Directory Exposure",
      endpoint: "/backup",
      cwe: "CWE-538",
      owasp: "A05:2021",
      severity: "High",
      description: "Unauthenticated access to backup directory listing with config and DB schema files",
    },
    {
      id: "VULN-005",
      name: "Unauthenticated Admin Panel",
      endpoint: "/admin",
      cwe: "CWE-306",
      owasp: "A01:2021",
      severity: "Critical",
      description: "Admin dashboard accessible without authentication, exposes user enumeration data",
    },
    {
      id: "VULN-006",
      name: "Missing Security Headers",
      endpoint: "All pages",
      cwe: "CWE-693",
      owasp: "A05:2021",
      severity: "Medium",
      description: "CSP, X-Frame-Options, and X-Content-Type-Options headers not configured",
    },
    {
      id: "VULN-007",
      name: "Lab Metadata Disclosure",
      endpoint: "/lab-info.json",
      cwe: "CWE-200",
      owasp: "A05:2021",
      severity: "Low",
      description: "This very endpoint discloses all lab vulnerability details without authentication",
    },
  ],
  testing_tools: {
    primary: "Burp Suite Community Edition",
    proxy_port: 8080,
    recommended_extensions: ["Active Scan++", "Retire.js", "Software Vulnerability Scanner"],
    wordlists: ["common.txt", "raft-medium-directories.txt", "SecLists/Discovery/Web-Content"],
  },
  next_module: {
    name: "Level 02 — Authentication & Session Management",
    description: "Brute force, weak passwords, session fixation, insecure JWT handling",
    status: "Not yet deployed",
  },
};

export async function GET() {
  return NextResponse.json(labInfo, {
    headers: {
      // VULN: No auth check — anyone can GET this endpoint
      "Content-Type": "application/json",
      // VULN: CORS wildcard on a sensitive endpoint
      "Access-Control-Allow-Origin": "*",
    },
  });
}
