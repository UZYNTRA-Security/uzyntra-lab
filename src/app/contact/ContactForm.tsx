"use client";

export default function ContactForm() {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>

      {/* NOTE: This form is intentionally non-functional — training environment */}
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="first-name" className="block text-slate-300 text-sm font-medium mb-1.5">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="Marcus"
              className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 text-sm outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="last-name" className="block text-slate-300 text-sm font-medium mb-1.5">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Chen"
              className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 text-sm outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-slate-300 text-sm font-medium mb-1.5">
            Work Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="marcus@company.com"
            className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 text-sm outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-slate-300 text-sm font-medium mb-1.5">
            Company
          </label>
          <input
            id="company"
            type="text"
            placeholder="Acme Corp"
            className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 text-sm outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-slate-300 text-sm font-medium mb-1.5">
            Service Needed
          </label>
          <select
            id="service"
            className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2.5 text-slate-100 text-sm outline-none transition-colors"
          >
            <option value="">Select a service...</option>
            <option>Penetration Testing</option>
            <option>Red Team Operations</option>
            <option>Cloud Security Review</option>
            <option>Compliance Audit</option>
            <option>Incident Response</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-slate-300 text-sm font-medium mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Describe your security requirements..."
            className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-500 rounded-lg px-3 py-2.5 text-slate-100 placeholder-slate-500 text-sm outline-none transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold py-3 rounded-lg transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
