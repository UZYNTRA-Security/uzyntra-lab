import Link from "next/link";

const services = [
  {
    icon: "🔍",
    title: "Penetration Testing",
    description:
      "Comprehensive black-box and white-box assessments to identify exploitable vulnerabilities before attackers do.",
  },
  {
    icon: "🛡️",
    title: "Threat Intelligence",
    description:
      "Real-time threat feeds and analysis to keep your security posture ahead of evolving adversaries.",
  },
  {
    icon: "📋",
    title: "Compliance Auditing",
    description:
      "ISO 27001, SOC 2, PCI-DSS, and GDPR readiness assessments with actionable remediation roadmaps.",
  },
  {
    icon: "🔐",
    title: "Red Team Operations",
    description:
      "Simulated adversarial attacks testing your detection, response, and recovery capabilities end-to-end.",
  },
  {
    icon: "🌐",
    title: "Web Application Security",
    description:
      "OWASP Top 10 assessments, API security reviews, and secure SDLC integration for development teams.",
  },
  {
    icon: "☁️",
    title: "Cloud Security",
    description:
      "AWS, Azure, and GCP configuration reviews, IAM audits, and infrastructure-as-code security scanning.",
  },
];

const stats = [
  { value: "500+", label: "Clients Protected" },
  { value: "12K+", label: "Vulnerabilities Found" },
  { value: "99.8%", label: "Client Retention" },
  { value: "24/7", label: "Incident Response" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32">
        {/* Grid background */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40"
        />
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-mono px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Authorized Security Training Environment — Level 01
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
            Defend Smarter.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Hack Harder.
            </span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            UZYNTRA Security provides elite offensive and defensive cybersecurity services.
            From penetration testing to red team operations — we find vulnerabilities before the adversaries do.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-8 py-3.5 rounded-lg transition-colors text-base"
            >
              Start a Project
            </Link>
            <Link
              href="/about"
              className="border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 font-semibold px-8 py-3.5 rounded-lg transition-colors text-base"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-900 border-y border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <dt className="text-3xl font-extrabold text-cyan-400">{value}</dt>
                <dd className="text-slate-400 text-sm mt-1">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              End-to-end security services designed to protect enterprises at every layer of the attack surface.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon, title, description }) => (
              <div
                key={title}
                className="bg-slate-900 border border-slate-800 hover:border-cyan-800 rounded-xl p-6 transition-colors group"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                  {title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to secure your infrastructure?</h2>
          <p className="text-slate-400 mb-8">
            Get a free preliminary assessment from our certified security engineers.
          </p>
          <Link
            href="/contact"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-8 py-3.5 rounded-lg transition-colors inline-block"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
}
