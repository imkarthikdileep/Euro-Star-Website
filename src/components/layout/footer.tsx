"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/glass/card";
import GradientText from "@/components/GradientText";
import { useToast } from "@/hooks/use-toast";
import { handleFormSubmit } from "@/app/actions/contact";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const phoneNumber = "971503860061";
  const email = "eurostar014@gmail.com";

  const { toast } = useToast();
  const [state, formAction] = useActionState(handleFormSubmit, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success" : "Error",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
    }
  }, [state, toast]);

  return (
    <footer className="relative z-10 w-full">
      {/* Desktop Layout (Preserved) */}
      {/* Desktop Layout (Preserved) */}
      <div className="hidden md:block relative h-20 bg-[#1A3C34]">
        {/* Flat Green Background - No Glass */}

        {/* Use h-20 to match Header height */}
        <div className="relative container mx-auto px-4 md:px-6 h-20 z-10 flex items-center justify-between">

          {/* Left: Logo & Name */}
          <div className="flex items-center gap-2 font-bold text-lg">
            <Image src="/logo.png" alt="Euro Star Logo" width={80} height={80} className="h-20 w-auto" />
            <div className="flex flex-col justify-center gap-0.5 group">
              <span className="font-headline text-3xl md:text-4xl tracking-tight text-gold leading-none">
                Euro Star
              </span>
              <span className="text-white/80 font-medium text-[10px] md:text-xs tracking-wide uppercase">
                Electromechanical
              </span>
            </div>
          </div>

          {/* Right: Content grouped horizontally */}
          <div className="flex items-center gap-6 text-sm text-white/80">
            {/* Links & Copyright - Hidden on very small screens or adapted */}
            <div className="hidden lg:flex items-center gap-6">
              <p className="font-inter font-medium tracking-tight">&copy; {currentYear}</p>
              <div className="h-4 w-px bg-white/20" />
              <Link href="/privacy-policy" className="text-gold hover:text-gold/80 transition-colors font-inter font-medium tracking-tight">Privacy Policy</Link>
              <Link href="/terms-conditions" className="text-gold hover:text-gold/80 transition-colors font-inter font-medium tracking-tight">Terms</Link>
            </div>

            <div className="flex items-center gap-4 border-l border-white/20 pl-6 ml-2">
              <Link href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`} target="_blank" rel="noopener noreferrer" aria-label="Send an email via Gmail"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group"
              >
                <Mail className="h-5 w-5 text-gold group-hover:text-white transition-colors" />
              </Link>
              <Link href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout (Luxury Industrial) */}
      <footer className="md:hidden bg-forest text-cream py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

        <div className="relative z-10 mb-16">
          <span className="text-gold text-xs uppercase tracking-widest mb-4 block font-inter">Get In Touch</span>
          <h2 className="font-serif text-4xl mb-8">Contact Info.</h2>

          <div className="space-y-8">
            {/* Address */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <MapPin className="text-gold w-5 h-5" />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1 font-inter">Address</p>
                <p className="text-white text-lg font-light font-inter">Jurf Plaza, Room no 602,<br />Rashidiya 1, Ajman, UAE</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=25.3936623,55.4629654"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold mt-2 text-sm font-medium hover:underline underline-offset-4 tracking-wide font-inter"
                >
                  Visit Us on Maps
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-5 relative z-20">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Phone className="text-gold w-5 h-5" />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1 font-inter">Phone</p>
                <div className="flex flex-col gap-1 pointer-events-auto">
                  <a href="tel:+971503860061" className="text-white text-lg font-light hover:text-gold transition-colors font-inter block py-1">+971 50 386 0061</a>
                  <a href="tel:+971509142430" className="text-white text-lg font-light hover:text-gold transition-colors font-inter block py-1">+971 50 914 2430</a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Mail className="text-gold w-5 h-5" />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1 font-inter">Email</p>
                <div className="flex flex-col gap-1">
                  <a href="mailto:eurostar014@gmail.com" className="text-white text-lg font-light hover:text-gold transition-colors font-inter">eurostar014@gmail.com</a>
                  <a href="mailto:Info@kenzuae.com" className="text-white text-lg font-light hover:text-gold transition-colors font-inter">Info@kenzuae.com</a>
                  <a href="mailto:info@eurostar-emc.com" className="text-white text-lg font-light hover:text-gold transition-colors font-inter">info@eurostar-emc.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-16 border-t border-cream/10 text-center">
          <h3 className="font-serif text-2xl mb-2">Euro Star</h3>
          <p className="text-xs uppercase tracking-[0.3em] opacity-60 mb-8">Electromechanical</p>
          <div className="flex justify-center gap-6 mb-8">
            <Link href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-forest transition-colors">
              <span className="sr-only">Gmail</span>
              <Mail className="w-4 h-4" />
            </Link>
            <Link href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hello! I'm interested in your services.")}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-forest transition-colors">
              <span className="sr-only">WhatsApp</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413z" /></svg>
            </Link>
          </div>
          <p className="text-white/40 text-[10px]">© 2026 Euro Star Electromechanical Cont. All rights reserved.</p>
        </div>
      </footer>
    </footer>
  );
}
