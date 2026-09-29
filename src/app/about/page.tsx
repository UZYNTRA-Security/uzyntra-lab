import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — UZYNTRA Security",
  description: "Learn about UZYNTRA Security's mission, team, and approach to enterprise cybersecurity.",
};

const team = [
  {
    name: "Marcus Chen",
    role: "CEO & Co-Founder",
    bio: "Former NSA analyst with 18 years in offensive security and national infrastructure protection.",
    initials: "MC",
  },
  {
    name: "Aisha Patel",
    role: "CTO & Lead Researcher",
    bio: "PhD in Computer Science, ex-Google Project Zero researcher. Discovered 40+ critical CVEs.",
    initials: "AP",
  },
  {
    name: "Jordan Rivera",
    role: "Head of Red Team",
    bio: "OSCP, OSCE3 certified. Led red team engagements for Fortune 100 financial institutions.",
    initials: "JR",
  },
  {
    name: "Yuki Nakamura",
    role: "Cloud Security Lead",
    bio: "AWS Security Specialty, GCP Professional. Specializes in cloud-native threat modeling.",
    initials: "YN",
  },
];

const values = [
  {
    title: "Transparency",
    description:
      "We document every finding with full reproduction steps, impact analysis, and remediation guidance — no vague reports.",
  },
  {
    title: "Precision",
    description:
      "Every engagement is scoped carefully. We don't spray-and-pray — we identify what matters most to your threat model.",
  },
  {
    title: "Ethics",
    description:
      "All engagements are formally authorized. We operate within strict rules of engagement and report discovered issues responsibly.",
  },
  {
    title: "Education",
    description:
      "We upskill your internal teams alongside every engagement so knowledge stays in-house long after we leave.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-950 py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-cyan-400 text-sm font-mono mb-3">// about_us</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Built by hackers.
              <br />
              <span className="text-cyan-400">Trusted by enterprises.</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              UZYNTRA Security was founded in 2018 by a team of offensive security veterans who believed that
              the best defenders are those who think like attackers. Today we serve over 500 organizations
              across 30 countries.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Cybersecurity is an arms race. Every day, threat actors grow more sophisticated — leveraging
                AI, zero-days, and insider access to compromise critical systems. We exist to tip the balance
                back toward defenders.
              </p>
              <p className="text-slate-400 leading-relaxed mb-4">
                Our mission is to make enterprise-grade security accessible to organizations of every size,
                with the rigor and methodology of elite offensive security teams.
              </p>
              <p className="text-slate-400 leading-relaxed">
                We don&apos;t just test — we educate, advise, and partner with your team for lasting
                security improvements.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map(({ title, description }) => (
                <div key={title} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                  <h3 className="text-cyan-400 font-semibold mb-2 text-sm">{title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-4">Leadership Team</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Seasoned professionals from NSA, Google Project Zero, and Big Four consulting firms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, bio, initials }) => (
              <div key={name} className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {initials}
                </div>
                <h3 className="text-white font-semibold">{name}</h3>
                <p className="text-cyan-400 text-xs font-mono mb-3">{role}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-14 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-xs font-mono mb-6 uppercase tracking-widest">
            Certifications & Standards
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["OSCP", "OSCE3", "CEH", "CISSP", "AWS Security", "CREST", "ISO 27001", "PCI-QSA"].map((cert) => (
              <span
                key={cert}
                className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono px-3 py-1.5 rounded"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Work with our team</h2>
          <p className="text-slate-400 mb-6">
            Whether you need a one-time assessment or an ongoing security partnership, we&apos;re ready to help.
          </p>
          <Link
            href="/contact"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-8 py-3 rounded-lg transition-colors inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
