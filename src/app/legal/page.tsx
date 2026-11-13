import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Notice, Terms of Use & Privacy Policy | Euro Star EMC",
  description:
    "Official corporate imprint, terms of use, and UAE PDPL-compliant privacy policy for Euro Star Electromechanical Contracting, Ajman & Dubai, UAE.",
};

const legalSections = [
  { id: "imprint", num: "01", title: "Corporate Legal Notice & Imprint" },
  { id: "terms", num: "02", title: "Terms of Use & Engineering Disclaimer" },
  { id: "privacy", num: "03", title: "Privacy Policy (UAE PDPL Compliant)" },
  { id: "governing-law", num: "04", title: "Governing Law & Jurisdiction" },
];

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#F9F9F7] text-[#222222] font-body selection:bg-[#C5A368] selection:text-[#142822]">
      {/* ─── Minimal Swiss Header ─── */}
      <header className="sticky top-0 z-50 border-b border-[#222222]/10 bg-[#F9F9F7]/95 backdrop-blur-md px-6 py-4 md:px-12 lg:px-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C5A368]"
        >
          <Image
            src="/logo.png"
            alt="Euro Star Electromechanical Logo"
            width={48}
            height={48}
            className="h-11 md:h-12 w-auto object-contain shrink-0"
          />
          <div className="flex flex-col justify-center leading-none">
            <span className="font-galgo text-2xl font-bold tracking-wider uppercase text-[#222222] leading-[0.82]">
              EURO STAR
            </span>
            <span className="font-galgo text-xs font-bold tracking-[0.16em] uppercase text-[#222222] leading-[0.82] -mt-1">
              ELECTROMECHANICAL
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#222222]/70 hover:text-[#C5A368] transition-colors"
        >
          <span>←</span> Back to Main Site
        </Link>
      </header>

      {/* ─── Hero Title Strip ─── */}
      <section className="border-b border-[#222222]/14 px-6 pt-16 pb-12 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[#C5A368] mb-4">
            <span>[LEGAL DOCUMENTATION]</span>
            <span>·</span>
            <span>EFFECTIVE: NOVEMBER 2026</span>
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#222222] max-w-4xl">
            Legal Notice, Terms of Use &amp; Privacy Policy
          </h1>
          <p className="mt-4 font-mono text-xs sm:text-sm uppercase tracking-wider text-[#222222]/60">
            Jurisdiction: Emirate of Ajman &amp; Emirate of Dubai, United Arab Emirates
          </p>
        </div>
      </section>

      {/* ─── Asymmetric 2-Column Swiss Grid Layout ─── */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Sticky Section Directory (Cols 1–4) */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#C5A368] block">
                TABLE OF CONTENTS
              </span>
              <nav className="flex flex-col space-y-2 border-l border-[#222222]/15 pl-4">
                {legalSections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="group flex items-baseline gap-3 py-1.5 text-xs font-mono tracking-wider text-[#222222]/70 hover:text-[#C5A368] transition-colors"
                  >
                    <span className="text-[#C5A368] font-semibold">{sec.num}</span>
                    <span className="leading-snug">{sec.title}</span>
                  </a>
                ))}
              </nav>

              <div className="border border-[#222222]/10 bg-white/60 p-5 rounded-lg space-y-2 text-xs font-mono text-[#222222]/70">
                <p className="font-semibold text-[#222222]">Direct Legal Contact:</p>
                <p>Euro Star Electromechanical Contracting</p>
                <p>
                  Email:{" "}
                  <a href="mailto:info@eurostaremc.com" className="text-[#C5A368] hover:underline">
                    info@eurostaremc.com
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a href="tel:+971503860061" className="text-[#C5A368] hover:underline">
                    +971 50 386 0061
                  </a>
                </p>
              </div>
            </div>
          </aside>

          {/* Right Column: Readable Legal Prose (Cols 5–12) */}
          <div className="lg:col-span-8 space-y-16">
            {/* ─── SECTION 01: Corporate Legal Notice & Imprint ─── */}
            <section id="imprint" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3 border-b border-[#222222]/14 pb-3">
                <span className="font-mono text-sm font-bold text-[#C5A368]">01</span>
                <h2 className="font-headline text-2xl sm:text-3xl font-medium tracking-tight text-[#222222]">
                  Corporate Legal Notice &amp; Imprint
                </h2>
              </div>
              <p className="text-base text-[#222222]/85 leading-relaxed">
                In compliance with United Arab Emirates commercial transparency standards, this website (
                <span className="font-mono text-sm font-semibold">https://eurostaremc.com</span>) is owned and operated by:
              </p>
              <div className="bg-white/80 border border-[#222222]/10 p-6 rounded-xl space-y-3 font-mono text-xs sm:text-sm text-[#222222]/80">
                <p><span className="text-[#222222] font-semibold">Registered Name:</span> Euro Star Electromechanical Contracting</p>
                <p><span className="text-[#222222] font-semibold">Allied Group Entities:</span> Kenz Hiraa General Trading LLC · Kenz Technical Services LLC</p>
                <p><span className="text-[#222222] font-semibold">Headquarters Address:</span> Jurf Plaza, Room 602, Rashidiya 1, Ajman, United Arab Emirates</p>
                <p><span className="text-[#222222] font-semibold">Primary Telephone:</span> +971 50 386 0061 / +971 50 914 2430</p>
                <p><span className="text-[#222222] font-semibold">Official Electronic Mail:</span> info@eurostaremc.com · info@kenzuae.com</p>
                <p><span className="text-[#222222] font-semibold">Established:</span> 2010</p>
              </div>
            </section>

            {/* ─── SECTION 02: Terms of Use & Engineering Disclaimer ─── */}
            <section id="terms" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3 border-b border-[#222222]/14 pb-3">
                <span className="font-mono text-sm font-bold text-[#C5A368]">02</span>
                <h2 className="font-headline text-2xl sm:text-3xl font-medium tracking-tight text-[#222222]">
                  Terms of Use &amp; Engineering Disclaimer
                </h2>
              </div>

              <div className="space-y-4">
                <h3 className="font-headline text-lg font-semibold text-[#222222]">
                  A. Informational Purpose Only
                </h3>
                <p className="text-base text-[#222222]/85 leading-relaxed">
                  All technical descriptions, service overviews, manpower capabilities, and project summaries presented on <code className="font-mono text-sm bg-black/5 px-1.5 py-0.5 rounded">eurostaremc.com</code> are provided strictly for general corporate and informational purposes. Nothing on this website constitutes a binding engineering tender, commercial quotation, or contractual warranty unless executed in writing by an authorized signatory of Euro Star Electromechanical Contracting.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-headline text-lg font-semibold text-[#222222]">
                  B. Intellectual Property &amp; Media Licensing
                </h3>
                <ul className="space-y-3 text-base text-[#222222]/85 leading-relaxed list-disc pl-5">
                  <li>
                    <strong className="text-[#222222]">Proprietary Brand Assets:</strong> The <em>Euro Star Electromechanical</em> name, corporate emblem, custom technical documentation, project photography, and site architecture are the exclusive intellectual property of Euro Star Electromechanical Contracting and its allied entities. Unauthorized reproduction, scraping, or commercial redistribution is strictly prohibited.
                  </li>
                  <li>
                    <strong className="text-[#222222]">Illustrative &amp; Licensed Cinematography:</strong> Select atmospheric video sequences featured in the hero montage are licensed for commercial editorial use via <strong>Pexels</strong> (including cinematography by <em>Tom Shutkin</em>, <em>Tima Miroshnichenko</em>, and <em>Abdo Alshreef</em>) and are presented for illustrative brand representation alongside Euro Star Electromechanical&apos;s proprietary engineering imagery. These sequences do not constitute a claim of primary contractor authorship over third-party landmarks or industrial facilities shown therein.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-headline text-lg font-semibold text-[#222222]">
                  C. Limitation of Liability
                </h3>
                <p className="text-base text-[#222222]/85 leading-relaxed">
                  While Euro Star Electromechanical Contracting strives to maintain accurate and up-to-date digital records, we make no warranties regarding uninterrupted availability or technical completeness. To the fullest extent permitted under UAE Federal Law, Euro Star Electromechanical Contracting shall not be liable for any direct, indirect, or consequential damages arising from reliance upon materials published on this website.
                </p>
              </div>
            </section>

            {/* ─── SECTION 03: Privacy Policy (UAE PDPL Compliant) ─── */}
            <section id="privacy" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3 border-b border-[#222222]/14 pb-3">
                <span className="font-mono text-sm font-bold text-[#C5A368]">03</span>
                <h2 className="font-headline text-2xl sm:text-3xl font-medium tracking-tight text-[#222222]">
                  Privacy Policy (UAE PDPL Compliant)
                </h2>
              </div>
              <p className="text-base text-[#222222]/85 leading-relaxed">
                Euro Star Electromechanical Contracting respects your commercial and personal privacy in accordance with <strong>UAE Federal Decree-Law No. 45 of 2021 regarding the Protection of Personal Data (PDPL)</strong>.
              </p>

              <div className="space-y-4">
                <h3 className="font-headline text-lg font-semibold text-[#222222]">
                  A. Information We Collect
                </h3>
                <p className="text-base text-[#222222]/85 leading-relaxed">
                  We practice strict data minimization and collect personal or corporate information <strong>only</strong> when you voluntarily submit an inquiry through our contact form or direct communication channels:
                </p>
                <ul className="space-y-2 text-base text-[#222222]/85 leading-relaxed list-disc pl-5">
                  <li>
                    <strong className="text-[#222222]">Contact &amp; Tender Inquiry Data:</strong> Full name, company name, email address, telephone number, and project/manpower inquiry details submitted via our website form.
                  </li>
                  <li>
                    <strong className="text-[#222222]">Essential Technical Logs:</strong> Anonymized server security logs (IP address, browser type, and timestamp) maintained automatically by our hosting infrastructure (<em>Hostinger</em>) to prevent unauthorized access and ensure network reliability.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-headline text-lg font-semibold text-[#222222]">
                  B. How We Use Your Information
                </h3>
                <p className="text-base text-[#222222]/85 leading-relaxed">
                  Your submitted details are used exclusively to:
                </p>
                <ol className="space-y-2 text-base text-[#222222]/85 leading-relaxed list-decimal pl-5">
                  <li>Respond to engineering consultations, tender invitations, fabrication requests, and manpower supply inquiries.</li>
                  <li>Prepare commercial proposals and coordinate site assessments within the United Arab Emirates.</li>
                  <li>Maintain website security, performance, and legal compliance.</li>
                </ol>
                <p className="font-medium text-[#222222] bg-white/70 border border-[#222222]/10 p-4 rounded-lg">
                  We do not sell, rent, trade, or distribute your contact details to third-party marketing brokers.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-headline text-lg font-semibold text-[#222222]">
                  C. Cookies &amp; Local Storage
                </h3>
                <p className="text-base text-[#222222]/85 leading-relaxed">
                  This website uses minimal, strictly necessary browser storage (<code className="font-mono text-xs bg-black/5 px-1 py-0.5 rounded">localStorage</code> and <code className="font-mono text-xs bg-black/5 px-1 py-0.5 rounded">sessionStorage</code>) solely to remember your cookie consent preference and optimize loading performance during your browsing session. We do not deploy invasive cross-site behavioral advertising trackers.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-headline text-lg font-semibold text-[#222222]">
                  D. Data Retention &amp; Your Rights
                </h3>
                <p className="text-base text-[#222222]/85 leading-relaxed">
                  Inquiry records are retained only for the duration necessary to fulfill your commercial request or comply with UAE statutory accounting and contractual obligations. Under UAE data protection regulations, you have the right to request access to, correction of, or deletion of your personal contact records at any time by emailing{" "}
                  <a href="mailto:info@eurostaremc.com" className="text-[#C5A368] font-semibold underline underline-offset-2">
                    info@eurostaremc.com
                  </a>.
                </p>
              </div>
            </section>

            {/* ─── SECTION 04: Governing Law & Jurisdiction ─── */}
            <section id="governing-law" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3 border-b border-[#222222]/14 pb-3">
                <span className="font-mono text-sm font-bold text-[#C5A368]">04</span>
                <h2 className="font-headline text-2xl sm:text-3xl font-medium tracking-tight text-[#222222]">
                  Governing Law &amp; Jurisdiction
                </h2>
              </div>
              <p className="text-base text-[#222222]/85 leading-relaxed">
                This Legal Notice, Terms of Use, and Privacy Policy shall be governed by and construed in accordance with the federal laws of the <strong>United Arab Emirates</strong> as applied in the <strong>Emirate of Ajman</strong>. Any disputes arising in connection with this website shall be subject to the exclusive jurisdiction of the competent courts of the United Arab Emirates.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* ─── Minimal Swiss Footer ─── */}
      <footer className="border-t border-[#222222]/14 bg-[#F9F9F7] px-6 py-12 md:px-12 lg:px-16 text-xs font-mono text-[#222222]/60">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; 2026 Euro Star Electromechanical Contracting. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#imprint" className="hover:text-[#C5A368] transition-colors">01 / Imprint</a>
            <a href="#terms" className="hover:text-[#C5A368] transition-colors">02 / Terms</a>
            <a href="#privacy" className="hover:text-[#C5A368] transition-colors">03 / Privacy</a>
            <a href="#governing-law" className="hover:text-[#C5A368] transition-colors">04 / Law</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

