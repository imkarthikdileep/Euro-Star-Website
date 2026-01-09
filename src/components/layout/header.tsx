"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import GlassSurface from "@/components/GlassSurface";
import ShinyText from "@/components/ShinyText";

import GradientText from "@/components/GradientText";
import StaggeredMenu from "@/components/StaggeredMenu";

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

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
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

      <div className={`relative transition-all duration-300 border-b ${isScrolled ? "border-white/5 shadow-md" : "border-transparent"}`}>
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="#" onClick={scrollToTop} className="flex items-center gap-2 font-bold text-lg text-primary z-50 relative">
            <Image src="/logo.png" alt="Euro Star Logo" width={60} height={60} className="h-14 w-auto" />
            <div className={`flex flex-col justify-center gap-0.5 group transition-opacity duration-300 ${isScrolled ? "opacity-0" : "opacity-100"}`}>
              <GradientText
                colors={["#22c55e", "#a855f7", "#22c55e"]}
                animationSpeed={5}
                showBorder={false}
                className="font-bold text-3xl md:text-4xl font-futura"
              >
                Euro Star
              </GradientText>
              <span className="text-slate-400 font-medium text-[10px] md:text-xs tracking-wide uppercase px-1">
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
                <ShinyText
                  text={link.label}
                  disabled={false}
                  speed={3}
                  className="font-inter font-bold tracking-tight text-lg"
                  color="#475569"
                  shineColor="#ffffff"
                />
              </Link>
            ))}
            <Button asChild>
              <Link href="#contact" className="font-inter font-bold">Get a Quote</Link>
            </Button>
          </nav>
          <div className="md:hidden">
            <StaggeredMenu
              items={[
                ...navLinks.map(l => ({ label: l.label, link: l.href, ariaLabel: l.label })),
                { label: "Get a Quote", link: "#contact", ariaLabel: "Get a Quote" }
              ]}
              position="right"
              isFixed={true}
              menuButtonColor="#ffffff"
              openMenuButtonColor="#ffffff"
              accentColor="#14b8a6" // Teal-500 matching brand
              logoUrl="" // Hide logo in menu to avoid overlap with header logo
              displaySocials={true}
              socialItems={[
                { label: 'Privacy Policy', link: '/privacy-policy' },
                { label: 'Terms & Conditions', link: '/terms-conditions' }
              ]}
              colors={['#0f172a', '#1e293b', '#334155', '#475569']} // Slate colors for prelayers
            />
          </div>
        </div>
      </div>
    </header>
  );
}
