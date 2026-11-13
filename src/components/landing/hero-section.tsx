"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useAdaptiveHeroMedia } from "@/hooks/useAdaptiveHeroMedia";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLButtonElement>(null);

  const { mp4, poster } = useAdaptiveHeroMedia();

  // Smooth scroll down to About section
  const handleScrollDown = () => {
    const aboutSection = document.querySelector<HTMLElement>("#about");
    if (aboutSection) {
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.scrollTo(aboutSection, { offset: 0, duration: 1.1 });
      } else {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useGSAP(
    () => {
      if (!heroRef.current || !videoWrapperRef.current) return;

      const mm = gsap.matchMedia();

      // 1. DESKTOP ONLY (>= 1024px & Motion Allowed): Full Sticky Parallax
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to(videoWrapperRef.current, {
          yPercent: 14,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // 2. Harmonic Bounce on Bottom Scroll Arrow
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (arrowRef.current) {
          gsap.to(arrowRef.current, {
            y: 7,
            duration: 1.35,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });

      // 3. MOBILE & TABLET (< 1024px): Zero Parallax Scrubbing, Instant Visibility
      mm.add("(max-width: 1023px)", () => {
        gsap.set(videoWrapperRef.current, {
          clearProps: "all",
          opacity: 1,
          y: 0,
          yPercent: 0,
          scale: 1,
        });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      id="home"
      data-header-theme="dark"
      className="relative lg:sticky lg:top-0 lg:z-10 h-[100svh] min-h-[100svh] w-full overflow-hidden bg-[#141414] select-none flex flex-col justify-end pb-[env(safe-area-inset-bottom)]"
    >
      {/* ─── GPU-Accelerated Video Layer ─── */}
      <div
        ref={videoWrapperRef}
        className="hero-video-wrapper absolute inset-0 z-0 h-full w-full will-change-transform"
      >
        {mp4 ? (
          <video
            key={mp4}
            src={mp4}
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={poster}
            alt="Euro Star Electromechanical Steel Fabrication & Engineering"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* ─── Top Header Blend Vignette (Melts seamlessly under floating header) ─── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-48 bg-gradient-to-b from-[#0E0E0E]/80 via-[#0E0E0E]/30 to-transparent"
      />

      {/* ─── Feathered Readability Scrims (Zero full-screen mud) ─── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] hidden lg:block"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,14,14,0.45) 0%, rgba(14,14,14,0) 24%), radial-gradient(circle at 18% 84%, rgba(14,14,14,0.82) 0%, rgba(14,14,14,0.32) 45%, rgba(14,14,14,0) 76%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] block lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,14,14,0.55) 0%, rgba(14,14,14,0.15) 35%, rgba(14,14,14,0.88) 100%)",
        }}
      />

      {/* ─── Bottom-Left Architectural Typography Lockup ─── */}
      <div className="relative z-20 flex min-h-[100svh] flex-col justify-end px-5 pb-16 sm:px-8 md:px-12 md:pb-20 lg:h-full lg:px-16">
        <div className="max-w-4xl">
          {/* Eyebrow with Precision Gold Hairline in Galgo Condensed */}
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#C5A368]" />
            <p className="font-galgo text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.14em] text-[#C5A368]">
              Structural Steel · Precision Welding · MEP
            </p>
          </div>

          {/* Primary Editorial Headline in Galgo Condensed with Negative Line Spacing */}
          <h1 className="font-galgo text-[clamp(3.2rem,8.8vw,8rem)] font-bold leading-[0.78] tracking-[0.02em] text-[#F9F9F7] uppercase">
            ENGINEERING <br />
            <span className="text-[#C5A368]">ENDURING</span> INFRASTRUCTURE
          </h1>

          {/* Editorial Subcopy in Galgo Condensed with Negative Line Spacing */}
          <p className="mt-5 max-w-xl font-galgo text-lg sm:text-xl md:text-2xl tracking-[0.06em] leading-[0.85] uppercase text-[#F9F9F7]/90">
            Heavy structural fabrication, certified high-integrity welding, and
            turnkey electromechanical execution out of Ajman, UAE.
          </p>
        </div>
      </div>

      {/* ─── Minimalist Centered Bouncy Scroll Cue with 48x48px Tap Target ─── */}
      <button
        ref={arrowRef}
        type="button"
        onClick={handleScrollDown}
        aria-label="Scroll down to About section"
        className="group absolute bottom-5 left-1/2 z-20 flex h-12 w-12 min-h-[48px] min-w-[48px] -translate-x-1/2 flex-col items-center justify-center text-[#F9F9F7]/80 transition-colors hover:text-[#C5A368] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C5A368]"
      >
        <span className="h-6 w-[1px] bg-gradient-to-b from-transparent to-[#C5A368]" />
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          className="mt-1 stroke-current"
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            strokeWidth="1.25"
            strokeLinecap="square"
          />
        </svg>
      </button>
    </section>
  );
}
