"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold text-xl tracking-tight">
              UZYNTRA
            </span>
            <span className="text-slate-400 text-sm font-medium border border-slate-700 rounded px-2 py-0.5">
              Security
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              Home
            </Link>
            <Link href="/about" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              About
            </Link>
            <Link href="/contact" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium">
              Contact
            </Link>
            <Link
              href="/contact"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-800 py-3 space-y-1">
            {["/", "/about", "/contact"].map((href) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-slate-300 hover:text-cyan-400 transition-colors capitalize"
              >
                {href === "/" ? "Home" : href.slice(1)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
