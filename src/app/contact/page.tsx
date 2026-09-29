import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — UZYNTRA Security",
  description: "Get in touch with UZYNTRA Security for penetration testing, security assessments, and consulting.",
};

const offices = [
  { city: "London", address: "1 Canary Wharf, Level 28, E14 5AB", phone: "+44 20 7946 0321" },
  { city: "Singapore", address: "1 Raffles Place, #42-00, 048616", phone: "+65 6978 2200" },
  { city: "New York", address: "One World Trade Center, Suite 8500, NY 10007", phone: "+1 212 555 0198" },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-950 py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-cyan-400 text-sm font-mono mb-3">// contact_us</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Let&apos;s talk security</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Ready to start an engagement or just have questions? Our team responds within 24 hours.
          </p>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact form — client component */}
            <ContactForm />

            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Global Offices</h2>
                <p className="text-slate-400 text-sm mb-6">
                  Our teams operate across multiple time zones to support your security needs.
                </p>
                <div className="space-y-4">
                  {offices.map(({ city, address, phone }) => (
                    <div key={city} className="bg-slate-950 border border-slate-800 rounded-xl p-5">
                      <p className="text-cyan-400 font-semibold text-sm mb-1">{city}</p>
                      <p className="text-slate-300 text-sm">{address}</p>
                      <p className="text-slate-500 text-xs font-mono mt-1">{phone}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3">Emergency Response</h3>
                <p className="text-slate-400 text-sm mb-3">
                  Experiencing an active security incident? Our IR team is available 24/7.
                </p>
                <p className="text-cyan-400 font-mono text-sm">ir@uzyntra.com</p>
                <p className="text-cyan-400 font-mono text-sm">+1 800-UZY-NTRA</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
