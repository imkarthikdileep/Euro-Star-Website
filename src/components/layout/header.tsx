"use client";

import { useState, useEffect, useRef, useCallback, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Navigation Items ───
const navItems = [
  { index: "01", label: "HOME", href: "#home" },
  { index: "02", label: "ABOUT US", href: "#about" },
  { index: "03", label: "SERVICES", href: "#services" },
  { index: "04", label: "FABRICATION & WELDING", href: "#gallery" },
  { index: "05", label: "ALLIED CONCERNS", href: "#sister-concerns" },
  { index: "06", label: "CONTACT", href: "#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isHero, setIsHero] = useState(true);

  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const curtainCenterRef = useRef<HTMLDivElement>(null);

  // 1. Dynamic Section Chroma Detection, Hero Detection & Directional Auto-Hide
  useEffect(() => {
    const themedSections = gsap.utils.toArray<HTMLElement>("[data-header-theme]");
    const triggers = themedSections.map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 48px",
        end: "bottom 48px",
        onEnter: () =>
          setTheme((section.dataset.headerTheme as "dark" | "light") || "light"),
        onEnterBack: () =>
          setTheme((section.dataset.headerTheme as "dark" | "light") || "light"),
      })
    );

    const heroTrigger = ScrollTrigger.create({
      trigger: "#home",
      start: "top top",
      end: "bottom 100px",
      onEnter: () => setIsHero(true),
      onEnterBack: () => setIsHero(true),
      onLeave: () => setIsHero(false),
    });

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const heroEl = document.getElementById("home");
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        setIsHero(heroBottom > 100);
      } else {
        setIsHero(window.scrollY < 400);
      }

      if (isOpen || window.innerWidth < 1024) {
        if (window.innerWidth < 1024) {
          gsap.to(headerRef.current, { yPercent: 0, duration: 0.2, overwrite: "auto" });
        }
        return;
      }

      const currentY = window.scrollY;
      if (currentY > 140 && currentY > lastScrollY + 8) {
        gsap.to(headerRef.current, {
          yPercent: -100,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
      } else if (currentY < lastScrollY - 6 || currentY <= 140) {
        gsap.to(headerRef.current, {
          yPercent: 0,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
      lastScrollY = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      triggers.forEach((t) => t.kill());
      heroTrigger.kill();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  // 2. Keyboard Accessibility & Focus Management
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // 3. GSAP Curtain Drawer Timeline
  useEffect(() => {
    if (!leftPanelRef.current || !rightPanelRef.current || !drawerRef.current) return;

    const isDesktop = window.innerWidth >= 1024;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(drawerRef.current, { display: "flex", pointerEvents: "auto", autoAlpha: 1 });

      const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

      if (isDesktop) {
        tl.fromTo(
          leftPanelRef.current,
          { yPercent: -100 },
          { yPercent: 0, duration: 0.65 },
          0
        )
          .fromTo(
            rightPanelRef.current,
            { yPercent: 100 },
            { yPercent: 0, duration: 0.65 },
            0
          )
          .fromTo(
            ".awwwards-nav-row",
            { yPercent: 40, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.45,
              stagger: 0.045,
              ease: "power3.out",
            },
            0.28
          )
          .fromTo(
            ".menu-swiss-info",
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.45,
              stagger: 0.06,
              ease: "power3.out",
            },
            0.32
          );
      } else {
        tl.fromTo(
          leftPanelRef.current,
          { yPercent: -100 },
          { yPercent: 0, duration: 0.45, ease: "power3.out" },
          0
        ).fromTo(
          ".awwwards-nav-row",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.04,
            ease: "power3.out",
          },
          0.15
        );
      }

      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      if (isDesktop) {
        gsap.to(leftPanelRef.current, {
          yPercent: -100,
          duration: 0.5,
          ease: "power3.inOut",
        });
        gsap.to(rightPanelRef.current, {
          yPercent: 100,
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => {
            if (drawerRef.current) {
              gsap.set(drawerRef.current, { display: "none", pointerEvents: "none", autoAlpha: 0 });
            }
          },
        });
      } else {
        gsap.to(leftPanelRef.current, {
          yPercent: -100,
          duration: 0.35,
          ease: "power3.in",
          onComplete: () => {
            if (drawerRef.current) {
              gsap.set(drawerRef.current, { display: "none", pointerEvents: "none", autoAlpha: 0 });
            }
          },
        });
      }
    }
  }, [isOpen]);

  // 4. Section Navigation (Lenis-aware on desktop; smooth scroll on mobile)
  const navigateToSection = useCallback(
    (targetId: string) => {
      const isMobile = window.innerWidth < 1024;

      const performScroll = () => {
        if (targetId === "#" || targetId === "#home") {
          if (typeof window !== "undefined" && window.__lenis) {
            window.__lenis.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        } else {
          const el = document.querySelector<HTMLElement>(targetId);
          if (el) {
            if (typeof window !== "undefined" && window.__lenis) {
              window.__lenis.scrollTo(el, { immediate: true, offset: 0 });
            } else {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      };

      if (isMobile) {
        setIsOpen(false);
        setTimeout(performScroll, 120);
        return;
      }

      const cLeft = curtainLeftRef.current;
      const cRight = curtainRightRef.current;
      const cCenter = curtainCenterRef.current;

      if (!cLeft || !cRight || !cCenter) {
        setIsOpen(false);
        performScroll();
        return;
      }

      const tl = gsap.timeline();

      // Step 1: Twin Cream Curtain Close (0.0s – 0.25s)
      tl.set([cLeft, cRight, cCenter], { display: "flex", pointerEvents: "auto" });
      tl.fromTo(
        cLeft,
        { xPercent: -100 },
        { xPercent: 0, duration: 0.25, ease: "power4.inOut" },
        0
      );
      tl.fromTo(
        cRight,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.25, ease: "power4.inOut" },
        0
      );
      tl.fromTo(
        cCenter,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.15, ease: "power2.out" },
        0.12
      );

      // Step 2: Instant Scroll Jump While Covered (0.25s)
      tl.call(
        () => {
          setIsOpen(false);
          performScroll();
        },
        [],
        0.25
      );

      tl.to(
        cCenter,
        {
          scale: 0.7,
          opacity: 0,
          duration: 0.15,
          ease: "power2.in",
        },
        0.25
      );

      // Step 3: Part Panels Outward (0.28s – 0.65s)
      tl.to(
        cLeft,
        {
          xPercent: -100,
          duration: 0.38,
          ease: "expo.inOut",
        },
        0.27
      );

      tl.to(
        cRight,
        {
          xPercent: 100,
          duration: 0.38,
          ease: "expo.inOut",
        },
        0.27
      );

      tl.set([cLeft, cRight, cCenter], { display: "none", pointerEvents: "none" }, 0.65);
    },
    []
  );

  const handleNavClick = (e: MouseEvent, href: string) => {
    e.preventDefault();
    navigateToSection(href);
  };

  const scrollToTop = (e: MouseEvent) => {
    e.preventDefault();
    navigateToSection("#home");
  };

  const isLight = theme === "light" && !isOpen;

  return (
    <>
      {/* ─── Adaptive Zero-Box Header with Centered EST. Stamp & HUD Corner-Bracket Menu (z-index: 100) ─── */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-[100] flex h-20 items-center justify-between px-5 md:px-12 lg:px-16 transition-colors duration-300 bg-transparent ${
          isLight ? "text-[#222222]" : "text-[#F9F9F7]"
        }`}
      >
        {/* Feathered Top Blend Scrim (Seamlessly melts header into hero video) */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0E0E0E]/85 via-[#0E0E0E]/35 to-transparent backdrop-blur-[2px] transition-opacity duration-300 ${
            isLight ? "opacity-0" : "opacity-100"
          }`}
          style={{
            maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
          }}
        />

        {/* LEFT: Brand Mark & Wordmark */}
        <Link
          href="#home"
          onClick={scrollToTop}
          className="relative z-[102] flex items-center gap-3.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
        >
          <Image
            src="/logo.png"
            alt="Euro Star Electromechanical Logo"
            width={64}
            height={64}
            className="h-12 sm:h-13 md:h-14 w-auto object-contain shrink-0"
            priority
          />
          <div className="flex flex-col justify-center leading-none">
            <span
              className={`font-galgo text-2xl sm:text-3xl md:text-[2.1rem] font-bold tracking-wider uppercase transition-colors duration-300 leading-[0.82] ${
                isOpen ? "text-[#222222]" : isLight ? "text-[#222222]" : "text-white"
              }`}
            >
              EURO STAR
            </span>
            <span
              className={`font-galgo text-xs sm:text-sm md:text-[0.95rem] font-bold tracking-[0.18em] uppercase transition-colors duration-300 leading-[0.82] -mt-1 sm:-mt-1.5 ${
                isOpen ? "text-[#222222]" : isLight ? "text-[#222222]" : "text-white"
              }`}
            >
              ELECTROMECHANICAL
            </span>
          </div>
        </Link>

        {/* CENTER: Architectural EST. 2010 Stamp in Bold Galgo */}
        <div
          aria-label="Established 2010"
          className={`pointer-events-none absolute left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-3 transition-colors duration-300 ${
            isOpen ? "text-[#222222]" : isLight ? "text-[#222222]" : "text-white"
          }`}
        >
          <span className="h-[1px] w-4 bg-current/40 md:w-6" />
          <span className="font-galgo text-xl md:text-2xl font-bold uppercase tracking-[0.16em]">
            EST. 2010
          </span>
          <span className="h-[1px] w-4 bg-current/40 md:w-6" />
        </div>

        {/* RIGHT: Menu Trigger — Integrated in Hero, Enclosed with Hamburger when Scrolled */}
        {isHero ? (
          /* IN HERO: Completely integrated into video background (zero enclosure, no box/border/brackets/gold) */
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="eurostar-split-menu"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="relative z-[102] flex items-center justify-center p-0 transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
          >
            <span className="font-galgo text-2xl sm:text-3xl md:text-[2.2rem] font-bold uppercase tracking-[0.18em] text-white">
              {isOpen ? "CLOSE" : "MENU"}
            </span>
          </button>
        ) : (
          /* SCROLLED PAST HERO: Transparent enclosure relative to header, collapsing into large hamburger icon */
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="eurostar-split-menu"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className={`relative z-[102] flex items-center justify-center rounded-lg border backdrop-blur-md transition-all duration-300 p-2.5 sm:p-3 ${
              isOpen
                ? "border-[#222222]/30 text-[#222222] bg-transparent"
                : isLight
                ? "border-[#222222]/20 text-[#222222] bg-transparent hover:border-[#222222]/50 hover:bg-[#222222]/[0.04]"
                : "border-white/25 text-white bg-transparent hover:border-white/60 hover:bg-white/[0.06]"
            }`}
          >
            {/* Large Architectural Hamburger Icon */}
            <div className="flex h-5 w-6 sm:w-7 flex-col justify-between items-center">
              <span
                className={`block h-[2.5px] w-full bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "translate-y-[9px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2.5px] w-full bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2.5px] w-full bg-current rounded-full transition-all duration-300 ${
                  isOpen ? "-translate-y-[9px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        )}
      </header>

      {/* ─── Full-Screen Navigation Drawer (Single Scrollable Sheet on <1024px; 50/50 Split on Desktop) ─── */}
      <div
        ref={drawerRef}
        id="eurostar-split-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
        className="pointer-events-none invisible fixed inset-0 z-[110] hidden flex-col lg:flex-row w-full h-full"
      >
        {/* LEFT / MOBILE PRIMARY PANEL: #F9F9F7 Cream Navigation Sheet */}
        <div
          ref={leftPanelRef}
          className="flex h-full w-full flex-col justify-between bg-[#F9F9F7] px-5 pt-6 pb-8 text-[#222222] sm:px-8 md:px-12 lg:w-1/2 lg:border-r lg:border-[#222222]/15 lg:px-14 lg:pt-24 overflow-y-auto"
        >
          {/* Mobile Sticky Top Bar with Close [✕] Button (48x48px target) */}
          <div className="flex lg:hidden items-center justify-between pb-4 pt-2 border-b border-[#222222]/10 mb-4 sticky top-0 bg-[#F9F9F7] z-10">
            <span className="font-galgo text-lg font-bold tracking-wider text-[#222222] uppercase leading-none">
              EURO STAR ELECTROMECHANICAL
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex min-h-[48px] min-w-[48px] items-center justify-center border border-[#222222] px-3.5 py-1 text-[#222222] text-[11px] font-mono tracking-widest uppercase hover:bg-[#222222] hover:text-white transition-colors"
            >
              CLOSE [✕]
            </button>
          </div>

          <nav aria-label="Primary" className="my-auto flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.index}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="awwwards-nav-row group flex min-h-[56px] items-center justify-between border-b border-[#222222]/15 py-3.5 text-left transition-colors hover:border-[#C5A368] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C5A368] md:py-4"
              >
                <div className="flex items-baseline gap-4 sm:gap-6 md:gap-8">
                  <span className="font-mono text-xs tracking-widest text-[#222222]/50 transition-colors group-hover:text-[#C5A368]">
                    ({item.index})
                  </span>
                  <span className="font-headline text-[clamp(1.5rem,4vw,3.25rem)] font-medium leading-none tracking-[-0.03em] text-[#222222] transition-transform duration-300 ease-out group-hover:translate-x-3 group-hover:text-[#C5A368]">
                    {item.label}
                  </span>
                </div>

                <span className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-[#222222]/20 font-mono text-xs text-[#222222] transition-all duration-300 group-hover:scale-110 group-hover:border-[#C5A368] group-hover:bg-[#C5A368] group-hover:text-[#142822]">
                  ↗
                </span>
              </a>
            ))}
          </nav>

          {/* Integrated Mobile Quick-Action Emerald Card (< 1024px) */}
          <div className="mt-8 block lg:hidden rounded-2xl bg-[#142822] p-6 text-[#F9F9F7] space-y-5">
            {/* Mobile Brand Lockup: Big Logo & Swiss typography */}
            <div className="flex items-center gap-4 pb-4 border-b border-[#F9F9F7]/15">
              <div className="relative h-14 w-14 shrink-0 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Euro Star Electromechanical Logo"
                  width={56}
                  height={56}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="flex flex-col justify-center leading-none">
                <span className="font-galgo text-2xl sm:text-3xl font-bold tracking-wider text-white uppercase leading-[0.82]">
                  EURO STAR
                </span>
                <span className="font-galgo text-xs sm:text-sm font-bold tracking-[0.16em] text-white uppercase leading-[0.82] -mt-1">
                  ELECTROMECHANICAL
                </span>
              </div>
            </div>

            <div>
              <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-[#C5A368] mb-1.5">
                01 / DIRECT DISPATCH
              </span>
              <div className="flex flex-col gap-1">
                <a
                  href="tel:+971503860061"
                  className="flex min-h-[44px] items-center font-sans text-base text-[#F9F9F7] hover:text-[#C5A368] transition-colors"
                >
                  +971 50 386 0061
                </a>
                <a
                  href="tel:+971509142430"
                  className="flex min-h-[44px] items-center font-sans text-base text-[#F9F9F7] hover:text-[#C5A368] transition-colors"
                >
                  +971 50 914 2430
                </a>
              </div>
            </div>

            <div className="border-t border-[#F9F9F7]/15 pt-3.5">
              <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-[#C5A368] mb-1.5">
                02 / TENDERS &amp; INQUIRIES
              </span>
              <div className="flex flex-col gap-1">
                <a
                  href="mailto:info@eurostaremc.com"
                  className="flex min-h-[44px] items-center font-sans text-sm text-[#F9F9F7] hover:text-[#C5A368] transition-colors"
                >
                  info@eurostaremc.com
                </a>
                <a
                  href="mailto:info@kenzuae.com"
                  className="flex min-h-[44px] items-center font-sans text-sm text-[#F9F9F7]/80 hover:text-[#C5A368] transition-colors"
                >
                  info@kenzuae.com
                </a>
              </div>
            </div>

            <div className="border-t border-[#F9F9F7]/15 pt-3.5">
              <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-[#C5A368] mb-1.5">
                03 / HEADQUARTERS
              </span>
              <p className="font-sans text-sm text-[#F9F9F7] leading-relaxed">
                Jurf Plaza, Room 602, Rashidiya 1, Ajman, UAE · Est. 2010
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=25.3936623,55.4629654"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#C5A368] hover:underline mt-1"
              >
                Open in Maps ↗
              </a>
            </div>
          </div>

          {/* Legal Links & Mobile Footer */}
          <div className="flex items-center justify-between pt-6 text-[11px] font-mono tracking-wider text-[#222222]/60 uppercase border-t border-[#222222]/10 mt-6">
            <div className="flex items-center gap-4">
              <Link
                href="/legal#privacy"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#222222] transition-colors"
              >
                Privacy Policy
              </Link>
              <span>·</span>
              <Link
                href="/legal#terms"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#222222] transition-colors"
              >
                Terms of Use
              </Link>
            </div>
            <span className="hidden sm:inline">AJMAN, UAE · EST. 2010</span>
          </div>
        </div>

        {/* RIGHT PANEL: Desktop-Only Deep Emerald (#142822) with Big Logo, Swiss Typography & Refined Details */}
        <div
          ref={rightPanelRef}
          className="hidden h-full w-1/2 flex-col justify-between bg-[#142822] px-12 xl:px-16 pt-8 pb-10 text-[#F9F9F7] lg:flex border-l border-[#F9F9F7]/10"
        >
          {/* Top Bar: Directory Label + Minimal Close Button */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#C5A368]">
              [CORPORATE DIRECTORY]
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setIsOpen(false)}
              className="border border-[#F9F9F7]/25 px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#F9F9F7] transition-colors duration-300 hover:border-[#C5A368] hover:bg-[#C5A368] hover:text-[#142822] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C5A368]"
            >
              CLOSE [✕]
            </button>
          </div>

          {/* ─── Big Company Logo & Swiss Typography Header ─── */}
          <div className="menu-swiss-info flex items-center gap-6 py-6 border-b border-[#F9F9F7]/15">
            <div className="relative h-20 w-20 xl:h-24 xl:w-24 shrink-0 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Euro Star Electromechanical Logo"
                width={96}
                height={96}
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex flex-col justify-center leading-none">
              <span className="font-galgo text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-wider text-white uppercase leading-[0.82]">
                EURO STAR
              </span>
              <span className="font-galgo text-xl xl:text-2xl 2xl:text-3xl font-bold tracking-[0.16em] text-white uppercase leading-[0.82] -mt-2 xl:-mt-2.5">
                ELECTROMECHANICAL
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#F9F9F7]/60 uppercase mt-2">
                Ajman, United Arab Emirates · Est. 2010
              </span>
            </div>
          </div>

          {/* ─── Compact Swiss Grid Company Details (Refined Font Sizing) ─── */}
          <div className="my-auto flex flex-col divide-y divide-[#F9F9F7]/15 border-b border-[#F9F9F7]/15">
            {/* Block 1: Direct Dispatch */}
            <div className="menu-swiss-info py-5">
              <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.22em] text-[#C5A368]">
                01 / DIRECT DISPATCH
              </span>
              <div className="flex flex-col gap-1 font-sans text-base lg:text-lg font-light text-[#F9F9F7]/95">
                <a
                  href="tel:+971503860061"
                  className="transition-colors hover:text-[#C5A368]"
                >
                  +971 50 386 0061
                </a>
                <a
                  href="tel:+971509142430"
                  className="transition-colors hover:text-[#C5A368]"
                >
                  +971 50 914 2430
                </a>
              </div>
            </div>

            {/* Block 2: Engineering & Tender Inquiries */}
            <div className="menu-swiss-info py-5">
              <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.22em] text-[#C5A368]">
                02 / TENDERS &amp; INQUIRIES
              </span>
              <div className="flex flex-col gap-1 font-sans text-sm lg:text-base font-light text-[#F9F9F7]/90">
                <a
                  href="mailto:info@eurostaremc.com"
                  className="transition-colors hover:text-[#C5A368]"
                >
                  info@eurostaremc.com
                </a>
                <a
                  href="mailto:info@kenzuae.com"
                  className="text-[#F9F9F7]/75 transition-colors hover:text-[#C5A368]"
                >
                  info@kenzuae.com
                </a>
              </div>
            </div>

            {/* Block 3: Headquarters */}
            <div className="menu-swiss-info py-5">
              <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.22em] text-[#C5A368]">
                03 / HEADQUARTERS — UAE
              </span>
              <p className="font-sans text-sm lg:text-base font-light leading-relaxed text-[#F9F9F7]/85">
                Jurf Plaza, Room 602, Rashidiya 1 <br />
                Ajman, United Arab Emirates · Est. 2010
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=25.3936623,55.4629654"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#C5A368] hover:underline mt-1.5"
              >
                Open in Maps ↗
              </a>
            </div>
          </div>

          {/* Bottom Architectural Coordinates */}
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[#F9F9F7]/50 pt-3">
            <span>25.4052° N, 55.5136° E</span>
            <span>EURO STAR ELECTROMECHANICAL</span>
          </div>
        </div>
      </div>

      {/* ─── Fast Section Navigation Transition Overlay (0.65s, desktop only) ─── */}
      <div
        ref={curtainLeftRef}
        className="fixed top-0 left-0 w-1/2 h-full bg-[#F9F9F7] z-[150] pointer-events-none hidden"
      />
      <div
        ref={curtainRightRef}
        className="fixed top-0 right-0 w-1/2 h-full bg-[#F9F9F7] z-[150] pointer-events-none hidden"
      />
      <div
        ref={curtainCenterRef}
        className="fixed inset-0 z-[151] flex items-center justify-center pointer-events-none hidden"
      >
        <div className="w-[1px] h-full bg-[#222222] absolute top-0 left-1/2 -translate-x-1/2" />
        <div className="w-16 h-16 rounded-full border border-[#222222] bg-[#F9F9F7] flex items-center justify-center relative z-10">
          <Image
            src="/logo.png"
            alt="Euro Star Monogram"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
        </div>
      </div>
    </>
  );
}
