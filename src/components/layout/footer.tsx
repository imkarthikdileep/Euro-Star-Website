"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const currentYear = 2026;
  const phoneNumber = "971503860061";
  const email = "info@eurostaremc.com";

  return (
    <footer data-header-theme="dark" className="relative z-40 w-full bg-[#1A3C34]">
      {/* ─── Desktop Layout (>= 1024px) ─── */}
      <div className="hidden lg:block relative h-24 bg-[#1A3C34] overflow-hidden border-t border-white/10">
        <div className="relative container mx-auto px-6 lg:px-16 h-24 z-10 flex items-center justify-between">
          {/* Left: Logo & Wordmark */}
          <Link href="#home" className="flex items-center gap-3.5">
            <Image
              src="/logo.png"
              alt="Euro Star Electromechanical Logo"
              width={56}
              height={56}
              className="h-12 md:h-14 w-auto object-contain shrink-0"
            />
            <div className="flex flex-col justify-center leading-none">
              <span className="font-galgo text-2xl md:text-3xl font-bold tracking-wider uppercase text-white leading-[0.82]">
                EURO STAR
              </span>
              <span className="font-galgo text-xs md:text-sm font-bold tracking-[0.16em] uppercase text-white leading-[0.82] -mt-1">
                ELECTROMECHANICAL
              </span>
            </div>
          </Link>

          {/* Right: Content grouped horizontally */}
          <div className="flex items-center gap-8 text-sm text-white/80">
            <div className="flex items-center gap-6">
              <p className="font-mono text-xs text-white/60">&copy; {currentYear} Euro Star EMC</p>
              <div className="h-3.5 w-px bg-white/20" />
              <Link
                href="/legal#privacy"
                className="text-xs font-mono tracking-wider text-gold hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/legal#terms"
                className="text-xs font-mono tracking-wider text-gold hover:text-white transition-colors"
              >
                Terms of Use
              </Link>
            </div>

            <div className="flex items-center gap-3 border-l border-white/20 pl-6">
              <a
                href={`mailto:${email}`}
                aria-label="Send an email"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-colors group"
              >
                <Mail className="h-4 w-4 text-gold group-hover:text-white transition-colors" />
              </a>
              <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-colors group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gold group-hover:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Mobile & Tablet Layout (< 1024px) ─── */}
      <div className="lg:hidden bg-[#142822] text-[#F9F9F7] pt-14 pb-24 px-6 relative overflow-hidden border-t border-white/10">
        <div className="relative z-10 mb-12">
          <span className="text-gold text-[10px] uppercase tracking-[0.24em] mb-3 block font-mono">
            GET IN TOUCH
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl mb-8 font-medium">Contact Info.</h2>

          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                <MapPin className="text-gold w-4 h-4" />
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1 font-mono">Address</p>
                <p className="text-white text-base font-light">
                  Jurf Plaza, Room 602, Rashidiya 1, Ajman, UAE · Est. 2010
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=25.3936623,55.4629654"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-gold text-xs font-mono uppercase tracking-wider hover:underline mt-1"
                >
                  Visit Us on Maps ↗
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                <Phone className="text-gold w-4 h-4" />
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1 font-mono">Phone</p>
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+971503860061"
                    className="inline-flex min-h-[44px] items-center text-white text-base font-light hover:text-gold transition-colors"
                  >
                    +971 50 386 0061
                  </a>
                  <a
                    href="tel:+971509142430"
                    className="inline-flex min-h-[44px] items-center text-white text-base font-light hover:text-gold transition-colors"
                  >
                    +971 50 914 2430
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                <Mail className="text-gold w-4 h-4" />
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1 font-mono">Email</p>
                <div className="flex flex-col gap-1">
                  <a
                    href="mailto:info@eurostaremc.com"
                    className="inline-flex min-h-[44px] items-center text-white text-base font-light hover:text-gold transition-colors"
                  >
                    info@eurostaremc.com
                  </a>
                  <a
                    href="mailto:info@kenzuae.com"
                    className="inline-flex min-h-[44px] items-center text-white text-base font-light hover:text-gold transition-colors"
                  >
                    info@kenzuae.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Footer Bottom Bar: Stacked Vertically with pb-24 clearance */}
        <div className="relative z-10 pt-10 border-t border-white/10 flex flex-col items-center text-center gap-4">
          <div className="flex flex-col items-center leading-none">
            <span className="font-galgo text-3xl font-bold tracking-wider uppercase text-white leading-[0.82]">
              EURO STAR
            </span>
            <span className="font-galgo text-sm font-bold tracking-[0.18em] uppercase text-white leading-[0.82] -mt-1.5">
              ELECTROMECHANICAL
            </span>
          </div>

          <div className="flex items-center justify-center gap-5 text-xs font-mono uppercase tracking-wider text-white/70">
            <Link
              href="/legal#privacy"
              className="min-h-[44px] inline-flex items-center text-gold hover:underline"
            >
              Privacy Policy
            </Link>
            <span>·</span>
            <Link
              href="/legal#terms"
              className="min-h-[44px] inline-flex items-center text-gold hover:underline"
            >
              Terms of Use
            </Link>
          </div>

          <p className="text-white/40 text-[11px] font-mono tracking-wider">
            &copy; {currentYear} Euro Star Electromechanical Contracting.
          </p>
        </div>
      </div>
    </footer>
  );
}
