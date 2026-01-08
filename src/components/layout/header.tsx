"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import GlassSurface from "@/components/GlassSurface";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About Us" },
  { href: "#clients", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <GlassSurface
          width="100%"
          height="100%"
          borderRadius={0}
          borderWidth={0}
          opacity={0.6}
          backgroundOpacity={0.1}
          blur={12}
          mixBlendMode="difference"
        />
      </div>

      <div className={`relative transition-all duration-300 border-b border-white/5 ${isScrolled ? "shadow-md" : ""}`}>
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="#" className="flex items-center gap-2 font-bold text-lg text-primary">
            <Image src="/logo.png" alt="Euro Star Logo" width={60} height={60} className="h-14 w-auto" />
            <div className={`overflow-hidden transition-all duration-700 ease-in-out flex flex-col justify-center gap-0.5 group ${isScrolled ? "max-w-0 opacity-0" : "max-w-[500px] opacity-100"}`}>
              {/* Primary "Liquid Titanium" Text */}
              <span className="relative font-inter font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-600 via-slate-900 to-black drop-shadow-sm text-2xl leading-none group-hover:from-slate-500 transition-all duration-500 cursor-default">
                Euro Star
                {/* Adaptive Texture Layer */}
                <span className="absolute inset-0 bg-transparent mix-blend-overlay opacity-50 pointer-events-none" aria-hidden="true">Euro Star</span>
              </span>

              {/* Secondary Hierarchy Text */}
              <span className="text-slate-600 font-medium text-[10px] md:text-xs tracking-wide uppercase">
                Electromechanical
              </span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-foreground transition-colors font-medium relative group"
              >
                <span className="font-inter font-extrabold tracking-tight" style={{ letterSpacing: '-0.05em' }}>
                  {link.label}
                </span>
              </Link>
            ))}
            <Button asChild>
              <Link href="#contact" className="font-inter font-bold">Get a Quote</Link>
            </Button>
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-6 pt-12">
                  <Link href="#" className="flex items-center gap-2 font-bold text-lg text-primary mb-4">
                    <Image src="/logo.png" alt="Euro Star Logo" width={60} height={60} className="h-14 w-auto" />
                    <div className="flex flex-col justify-center gap-0.5 group">
                      <span className="relative font-inter font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-600 via-slate-900 to-black drop-shadow-sm text-xl leading-none group-hover:from-slate-500 transition-all duration-500">
                        Euro Star
                        <span className="absolute inset-0 bg-transparent mix-blend-overlay opacity-50 pointer-events-none" aria-hidden="true">Euro Star</span>
                      </span>
                      <span className="text-slate-600 font-medium text-[10px] tracking-wide uppercase">
                        Electromechanical
                      </span>
                    </div>
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg text-foreground/80 hover:text-foreground transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button asChild className="mt-4">
                    <Link href="#contact">Get a Quote</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
