"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import GlassSurface from "@/components/GlassSurface";
// import ShinyText from "@/components/ShinyText"; // Removed
import GrainyText from "@/components/GrainyText";
import MaiMenu from "@/components/MaiMenu";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About Us" },
  { href: "#clients", label: "Clients" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileBranding, setShowMobileBranding] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Desktop: Switch after hero (approx 300vh)
      setIsScrolled(scrollY > window.innerHeight * 3);
      // Mobile: Hide branding immediately on scroll
      setShowMobileBranding(scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <header className="fixed top-0 z-50 w-full transition-all duration-300">
          <div className={`absolute inset-0 w-full h-full pointer-events-none rounded-b-3xl overflow-hidden transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}>
            <GlassSurface
              width="100%"
              height="100%"
              borderRadius={24}
              borderWidth={0}
              blur={12}
              opacity={0.1}
              mixBlendMode="difference"
              className="w-full h-full"
            />
          </div>

          <div className={`relative transition-all duration-300 ${isScrolled ? "shadow-md" : ""}`}>
            <div className="container mx-auto flex h-24 items-center justify-between px-4 lg:px-6">
              <Link href="#" onClick={scrollToTop} className="flex items-center gap-3 font-bold text-lg text-primary z-50 relative">
                <Image src="/logo.png" alt="Euro Star Logo" width={80} height={80} className="h-20 w-auto" />
                <div className={`flex flex-col justify-center gap-0.5 group transition-opacity duration-300 ${isScrolled ? "opacity-0" : "opacity-100"}`}>
                  <span className="font-headline text-2xl lg:text-3xl tracking-tight text-gold leading-none">
                    Euro Star
                  </span>
                  <span className="text-white font-body font-medium text-[10px] lg:text-xs tracking-wide uppercase px-0.5">
                    Electromechanical
                  </span>
                </div>
              </Link>
              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors font-medium relative group"
                  >
                    <GrainyText
                      text={link.label}
                      className="font-body font-medium tracking-tight text-sm text-[length:inherit]"
                      color="#C5A368"
                    />
                  </Link>
                ))}
                <Button asChild className="rounded-full bg-gold hover:bg-gold/90 text-charcoal font-body font-medium px-6 shadow-lg hover:shadow-gold/20 transition-all duration-300">
                  <Link href="#contact">
                    <GrainyText text="Contact Us" className="text-charcoal font-bold" />
                  </Link>
                </Button>
              </nav>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Header (Luxury Industrial) */}
      <nav className="lg:hidden fixed top-0 w-full z-50 transition-all duration-300 px-6 py-6 flex justify-between items-center mix-blend-difference text-cream pointer-events-none">
        {/* Branding - Hides on Scroll */}
        <div className={`pointer-events-auto transition-all duration-500 transform ${showMobileBranding ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
          <Link href="#" onClick={scrollToTop} className="flex items-center gap-4">
            <Image src="/logo.png" alt="Euro Star Logo" width={60} height={60} className="h-14 w-auto" />
            <div className="flex flex-col items-start">
              <span className="font-headline text-3xl tracking-tight leading-none text-gold">Euro Star</span>
              <span className="text-gray-400 font-body text-[10px] uppercase tracking-wider">Electromechanical</span>
            </div>
          </Link>
        </div>

        {/* Hamburger Menu - Always Visible */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <MaiMenu />

        </div>
      </nav >
    </>
  );
}
