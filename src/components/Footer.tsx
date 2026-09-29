import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="text-cyan-400 font-bold text-lg mb-2">UZYNTRA Security</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Enterprise-grade cybersecurity solutions for modern businesses. 
              Protecting what matters most.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-slate-200 font-semibold text-sm mb-3">Company</p>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Lab notice */}
          <div>
            <p className="text-slate-200 font-semibold text-sm mb-3">Training Lab</p>
            <div className="bg-amber-900/30 border border-amber-700/50 rounded-lg p-3">
              <p className="text-amber-400 text-xs font-mono">
                ⚠ SECURITY TRAINING ENVIRONMENT
              </p>
              <p className="text-slate-400 text-xs mt-1">
                This is an intentionally vulnerable application for authorized penetration testing practice only.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © 2025 UZYNTRA Security. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs font-mono">
            recon.lab.uzyntra.com · Level 01
          </p>
        </div>
      </div>
    </footer>
  );
}
