"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import GlassSurface from "@/components/GlassSurface";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const phoneNumber = "971503860061";
  const email = "Info@eurostaremc.com";

  return (
    <footer className="relative z-10 border-t border-white/10 overflow-hidden">
      {/* Artificial content background for the glass to refract */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none -z-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(10, 25, 47, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(10, 25, 47, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backdropFilter: 'contrast(120%)'
        }}
      />

      <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
        <GlassSurface
          width="100%"
          height="100%"
          borderRadius={0}
          borderWidth={0}
          opacity={0.6}
          backgroundOpacity={0.1}
          blur={12}
          distortionScale={30}
          mixBlendMode="normal"
        />
      </div>

      {/* Use h-20 to match Header height */}
      <div className="relative container mx-auto px-4 md:px-6 h-20 z-10 flex items-center justify-between">

        {/* Left: Logo & Name */}
        <div className="flex items-center gap-2 font-bold text-lg">
          <Image src="/logo.png" alt="Euro Star Logo" width={40} height={40} className="h-10 w-auto" />
          <div className="flex flex-col justify-center gap-0.5 group">
            <span className="relative font-inter font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-600 via-slate-900 to-black drop-shadow-sm text-lg leading-none group-hover:from-slate-500 transition-all duration-500 cursor-default">
              Euro Star
              {/* Adaptive Texture Layer */}
              <span className="absolute inset-0 bg-transparent mix-blend-overlay opacity-50 pointer-events-none" aria-hidden="true">Euro Star</span>
            </span>
            <span className="text-slate-600 font-medium text-[10px] tracking-wide uppercase">
              Electromechanical
            </span>
          </div>
        </div>

        {/* Right: Content grouped horizontally */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          {/* Links & Copyright - Hidden on very small screens or adapted */}
          <div className="hidden lg:flex items-center gap-6">
            <p className="font-inter font-medium tracking-tight">&copy; {currentYear}</p>
            <div className="h-4 w-px bg-slate-400/50" />
            <Link href="/privacy-policy" className="hover:text-primary transition-colors font-inter font-medium tracking-tight">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-primary transition-colors font-inter font-medium tracking-tight">Terms</Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 border-l border-slate-400/20 pl-6 ml-2">
            <Link href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`} target="_blank" rel="noopener noreferrer" aria-label="Send an email via Gmail">
              <Mail className="h-5 w-5 hover:text-accent transition-colors" />
            </Link>
            <Link href={`https://wa.me/${phoneNumber}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hover:text-accent transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
