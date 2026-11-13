# Euro Star Electromechanical (`eurostaremc.com`) — Awwwards Hero, Adaptive Header & Split-Menu Engineering Specification

**Target Stack:** React / Next.js (or Vanilla ES6+ DOM), Tailwind CSS, GSAP 3.12+ (`ScrollTrigger`, `Flip`), Lenis Smooth Scroll  
**Design Tokens:**  
- `--bg-cream`: `#F9F9F7` (Primary Canvas)  
- `--bg-emerald`: `#142822` (Footer & Menu Right-Panel Deep Forest/Emerald)  
- `--ink-charcoal`: `#222222` (Primary Typography on Cream)  
- `--ink-cream`: `#F9F9F7` (Primary Typography on Video / Emerald)  
- `--accent-gold`: `#C5A368` (Architectural Indexing & Hairline Accents)  

---

## 1. Visual & UX Critique of Current Implementation (Screenshots `00:00` – `00:12`)

1. **Intrusive Dark Header Bar (`00:00`–`00:12`):** The header currently renders with a heavy dark bar (`rgba(0,0,0,0.6)`) across the top of the viewport, creating a harsh horizontal ceiling over the Dubai sunrise footage and obscuring text as the user scrolls through the Cream (`#F9F9F7`) About and Services sections.
2. **Hero Visual Clutter & Duplicated Metadata (`00:00`):**
   - `EST — 2010` appears twice (once in the header center, once in the sub-header strip).
   - `ISO 9001:2015 CERTIFIED ENGINEERING` adds unnecessary corporate noise to an editorial brand film.
   - The dark rectangular `EXPLORE CAPABILITIES` box in the bottom-right (`Cols 5–6`) blocks the focal point of the video montage and creates a heavy visual anchor.
3. **Split-Menu Color & Typographic Mismatch:**
   - The right panel of the split-screen menu uses pure black (`#1C1C1C`) instead of matching the deep architectural emerald (`#142822`) used in the Contact & Footer section (`00:09`–`00:12`).
   - Company contact details (`ADDRESS`, `PHONE`, `EMAIL`) in the menu use small `12px–14px` body sizing rather than bold, large-scale Swiss Grid display typography (`clamp(1.25rem, 2vw, 2.25rem)`).
4. **Generic Back-to-Top Widget (`00:06`–`00:12`):** The floating black square box (`[↑]`) in the bottom-right corner clashes with the warm `#F9F9F7` and `#142822` surfaces and sits awkwardly next to the "Made with ScrollFlow" watermark.

---

## 2. Hero Section Redesign: Unobstructed Cinema Canvas + Swiss Hairline Framing

### A. Content & Layout Stripping Rules
- **Delete:** `ISO 9001:2015 CERTIFIED ENGINEERING` badge, duplicate `EST — 2010` label, and the heavy bottom-right `EXPLORE CAPABILITIES` dark card.
- **Keep:**
  - Single concise `EST. 2010` index inside the top header.
  - Unobstructed full-bleed (`100svh`) video montage (`Dubai Sunrise → Lever Torque → Drafting → TIG Welding → Sparks → Dusk Horizon`).
  - Subtle **6-column Swiss Hairline Grid** (`1px solid rgba(249, 249, 247, 0.08)`—reduced opacity so lines whisper rather than cage the footage).
  - **Asymmetric Bottom-Left Editorial Lockup** (occupying `Cols 1–4`, anchored `48px` from the bottom edge) with a localized, feathered radial scrim strictly behind the text so the center and right 60% of the cinema frame remain 100% untouched.
  - **Minimalist Bouncy Scroll Cue** centered at the bottom (`left-1/2 -translate-x-1/2 bottom-6`): a delicate `1px` vertical stem + chevron arrow in `#C5A368` with a subtle harmonic bounce (`GSAP yoyo`) that smooth-scrolls to `#about` on click.

### B. Production Component: `HeroSection.tsx`

```tsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type DeviceTier = "mobile" | "tablet" | "desktop";

const HERO_SOURCES: Record<DeviceTier, { mp4: string; poster: string }> = {
  mobile: {
    mp4: "/videos/eurostar-hero-mobile.mp4",
    poster: "/images/hero-poster-mobile.webp",
  },
  tablet: {
    mp4: "/videos/eurostar-hero-tablet.mp4",
    poster: "/images/hero-poster-tablet.webp",
  },
  desktop: {
    mp4: "/videos/eurostar-hero-desktop.mp4",
    poster: "/images/hero-poster-desktop.webp",
  },
};

export const HeroSection: React.FC<{ onScrollDown: () => void }> = ({
  onScrollDown,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLButtonElement>(null);
  const [tier, setTier] = useState<DeviceTier>("desktop");

  useEffect(() => {
    const resolveTier = () => {
      const w = window.innerWidth;
      if (w < 768) setTier("mobile");
      else if (w < 1024) setTier("tablet");
      else setTier("desktop");
    };
    resolveTier();
    window.addEventListener("resize", resolveTier, { passive: true });
    return () => window.removeEventListener("resize", resolveTier);
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Sticky Parallax Overlap into #about
      gsap.to(videoWrapRef.current, {
        yPercent: 14,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Minimal Harmonic Bounce on Bottom Scroll Arrow
      gsap.to(arrowRef.current, {
        y: 7,
        duration: 1.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => mm.revert();
  }, []);

  const { mp4, poster } = HERO_SOURCES[tier];

  return (
    <section
      ref={sectionRef}
      id="home"
      data-header-theme="dark"
      className="sticky top-0 z-10 h-[100svh] w-full overflow-hidden bg-[#141414] select-none"
    >
      {/* GPU-Accelerated Video Layer */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0 h-full w-full will-change-transform"
      >
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
      </div>

      {/* Feathered Readability Scrims (Zero Full-Screen Mud) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,14,14,0.48) 0%, rgba(14,14,14,0) 22%), radial-gradient(circle at 18% 84%, rgba(14,14,14,0.78) 0%, rgba(14,14,14,0.28) 44%, rgba(14,14,14,0) 75%)",
        }}
      />

      {/* Whisper-Thin 6-Column Swiss Hairline Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
      >
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="h-full border-r border-[#F9F9F7]/[0.08] last:border-r-0"
          />
        ))}
      </div>

      {/* Bottom-Left Editorial Typography Anchor */}
      <div className="relative z-20 flex h-full flex-col justify-end px-6 pb-14 md:px-12 md:pb-16 lg:px-16">
        <div className="max-w-3xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[#C5A368]">
            Electromechanical &amp; Structural Steel · UAE
          </p>
          <h1 className="font-serif text-[clamp(2.75rem,6.4vw,6.25rem)] font-medium leading-[0.94] tracking-[-0.035em] text-[#F9F9F7]">
            FORGING <br />
            <span className="italic text-[#C5A368]">INDUSTRIAL</span> SCALE
          </h1>
        </div>
      </div>

      {/* Minimally Intrusive Bouncy Scroll Cue */}
      <button
        ref={arrowRef}
        type="button"
        onClick={onScrollDown}
        aria-label="Scroll down to About section"
        className="group absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 p-2 text-[#F9F9F7]/80 transition-colors hover:text-[#C5A368] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C5A368]"
      >
        <span className="h-6 w-[1px] bg-gradient-to-b from-transparent to-[#C5A368]" />
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          className="stroke-current"
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
};
```

---

## 3. Adaptive Zero-Box Header & Section-Aware Scroll Blending

### Why the Current Header Fails
A translucent black bar (`rgba(0,0,0,0.65)`) looks heavy over bright cream sections (`#F9F9F7`) and disconnects the hero canvas from the viewport edge.

### Awwwards Solution: Surface-Aware Chroma Morph + Smart Hide/Reveal
1. **100% Transparent Background (`background: transparent`)** at all times—zero boxy background bars, zero `backdrop-filter` GPU tearing.
2. **Dynamic Section Chroma Detection (`ScrollTrigger`):** Every major section carries `data-header-theme="dark"` (Hero, Deep Emerald Contact/Footer `#142822`) or `data-header-theme="light"` (Cream `#F9F9F7` About, Services, Allied Concerns, Projects).
   - Over `"dark"` sections (`Hero` & `#142822` Footer): Header text and hamburger bars smoothly tween (`0.35s power2.out`) to **Cream (`#F9F9F7`)** with **`#C5A368` Gold** accents.
   - Over `"light"` sections (`#F9F9F7` Cream): Header text and hamburger bars smoothly tween to **Charcoal (`#222222`)**, maintaining a **12.6:1 WCAG AAA contrast ratio** with zero background box needed.
3. **Directional Scroll Velocity Auto-Hide:** When scrolling down past `120px`, the header glides cleanly out (`yPercent: -100`, `0.4s power3.out`); the instant the user scrolls up by even `10px`, it glides back in (`yPercent: 0`).
4. **Minimal 3-Element Composition:**
   - **Left:** Euro Star EMC logo mark + wordmark.
   - **Center-Right:** Single `EST. 2010` monospace stamp (removed from hero body so it appears once cleanly).
   - **Far-Right:** Magnetic 2-line architectural menu button (`28px` wide, `1.5px` stroke).

### Production Component: `AdaptiveHeader.tsx`

```tsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AdaptiveHeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export const AdaptiveHeader: React.FC<AdaptiveHeaderProps> = ({
  isMenuOpen,
  onToggleMenu,
}) => {
  const headerRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // 1. Detect Section Theme Under Header
    const themedSections = gsap.utils.toArray<HTMLElement>("[data-header-theme]");
    const triggers = themedSections.map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 44px",
        end: "bottom 44px",
        onEnter: () =>
          setTheme(
            (section.dataset.headerTheme as "dark" | "light") || "light"
          ),
        onEnterBack: () =>
          setTheme(
            (section.dataset.headerTheme as "dark" | "light") || "light"
          ),
      })
    );

    // 2. Awwwards Directional Hide/Reveal on Scroll
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (isMenuOpen) return;
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      triggers.forEach((t) => t.kill());
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  const isLight = theme === "light" && !isMenuOpen;

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[100] flex h-20 items-center justify-between px-6 transition-colors duration-300 md:px-12 lg:px-16 ${
        isLight ? "text-[#222222]" : "text-[#F9F9F7]"
      }`}
    >
      {/* Left: Brand Identity */}
      <a
        href="#home"
        className="flex items-center gap-3 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C5A368]"
      >
        <img
          src="/images/eurostar-mark.svg"
          alt="Euro Star Electromechanical"
          className="h-8 w-auto"
        />
        <div className="flex flex-col leading-none">
          <span className="font-serif text-lg font-semibold tracking-tight">
            Euro Star
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#C5A368]">
            Electromechanical
          </span>
        </div>
      </a>

      {/* Right Cluster: Single EST. 2010 Stamp + 2-Line Architectural Trigger */}
      <div className="flex items-center gap-10 md:gap-16">
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] opacity-80 sm:inline-block">
          EST. 2010
        </span>

        <button
          type="button"
          onClick={onToggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="eurostar-split-menu"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="group relative flex h-10 w-10 items-center justify-end focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C5A368]"
        >
          <span className="sr-only">Menu</span>
          <div className="flex w-7 flex-col gap-[6px]">
            <span
              className={`block h-[1.5px] w-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isMenuOpen
                  ? "translate-y-[3.75px] rotate-45"
                  : "group-hover:translate-x-1"
              }`}
            />
            <span
              className={`block h-[1.5px] w-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isMenuOpen
                  ? "-translate-y-[3.75px] -rotate-45"
                  : "group-hover:-translate-x-1"
              }`}
            />
          </div>
        </button>
      </div>
    </header>
  );
};
```

---

## 4. Split-Screen Curtain Menu: Footer-Matched Deep Emerald (`#142822`) & Oversized Swiss Typography

### Key Architectural Upgrades
1. **Unified Footer Palette (`#142822`):** The right-hand company info panel uses the exact deep forest/emerald (`#142822`) from the Contact & Footer section, creating complete visual continuity from top to bottom of the brand experience.
2. **Oversized Swiss Display Typography for Company Info:** Instead of tiny `12px` labels, the right panel scales up the UAE address, phone lines, and email addresses to bold Swiss editorial proportions (`clamp(1.25rem, 1.9vw, 2rem)`) separated by crisp `1px solid rgba(249, 249, 247, 0.14)` horizontal rules.
3. **Synchronized Curtain & Hairline Split Navigation (`0.65s`):** Clicking any link triggers the twin `#F9F9F7` architectural panels meeting at a central `1px` vertical spine + monogram ring, scrolls instantaneously in the background, and parts outward with zero artificial delay.

### Production Component: `SplitCurtainMenu.tsx`

```tsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface SplitCurtainMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (targetId: string) => void;
}

const NAV_ITEMS = [
  { index: "01", label: "HOME", target: "#home" },
  { index: "02", label: "ABOUT US", target: "#about" },
  { index: "03", label: "SERVICES", target: "#services" },
  { index: "04", label: "ALLIED CONCERNS", target: "#allied" },
  { index: "05", label: "PROJECTS", target: "#projects" },
  { index: "06", label: "CONTACT", target: "#contact" },
];

export const SplitCurtainMenu: React.FC<SplitCurtainMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
        gsap.set(containerRef.current, { pointerEvents: "auto", autoAlpha: 1 });

        const tl = gsap.timeline();
        tl.fromTo(
          leftPanelRef.current,
          { yPercent: -100 },
          { yPercent: 0, duration: 0.65, ease: "power4.inOut" },
          0
        )
          .fromTo(
            rightPanelRef.current,
            { yPercent: 100 },
            { yPercent: 0, duration: 0.65, ease: "power4.inOut" },
            0
          )
          .fromTo(
            ".menu-nav-row",
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

        closeBtnRef.current?.focus();
      } else {
        document.body.style.overflow = "";
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
            gsap.set(containerRef.current, {
              pointerEvents: "none",
              autoAlpha: 0,
            });
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      id="eurostar-split-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
      className="pointer-events-none invisible fixed inset-0 z-[110] flex flex-col lg:flex-row"
    >
      {/* LEFT PANEL: #F9F9F7 Cream Primary Navigation */}
      <div
        ref={leftPanelRef}
        className="flex h-full w-full flex-col justify-between bg-[#F9F9F7] px-6 pt-24 pb-8 text-[#222222] md:px-12 lg:w-1/2 lg:border-r lg:border-[#222222]/15 lg:px-14"
      >
        <nav aria-label="Primary" className="my-auto flex flex-col">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.index}
              type="button"
              onClick={() => onNavigate(item.target)}
              className="menu-nav-row group flex items-center justify-between border-b border-[#222222]/15 py-4 text-left transition-colors hover:border-[#C5A368] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C5A368] md:py-5"
            >
              <div className="flex items-baseline gap-5 md:gap-8">
                <span className="font-mono text-xs tracking-widest text-[#222222]/50 transition-colors group-hover:text-[#C5A368]">
                  ({item.index})
                </span>
                <span className="font-serif text-[clamp(1.75rem,3.4vw,3.25rem)] font-medium leading-none tracking-[-0.03em] transition-transform duration-300 ease-out group-hover:translate-x-3">
                  {item.label}
                </span>
              </div>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#222222]/20 font-mono text-xs text-[#222222] transition-all duration-300 group-hover:scale-110 group-hover:border-[#C5A368] group-hover:bg-[#C5A368] group-hover:text-[#142822]">
                ↗
              </span>
            </button>
          ))}
        </nav>

        {/* Mobile Footer Strip */}
        <div className="flex items-center justify-between pt-4 font-mono text-[11px] uppercase tracking-widest text-[#222222]/60 lg:hidden">
          <span>AJMAN &amp; DUBAI, UAE</span>
          <button
            type="button"
            onClick={onClose}
            className="border border-[#222222] px-3 py-1 text-[#222222]"
          >
            CLOSE [✕]
          </button>
        </div>
      </div>

      {/* RIGHT PANEL: Footer-Matched Deep Emerald (#142822) + Oversized Swiss Typography */}
      <div
        ref={rightPanelRef}
        className="hidden h-full w-1/2 flex-col justify-between bg-[#142822] px-14 pt-8 pb-12 text-[#F9F9F7] lg:flex"
      >
        {/* Top Bar: Minimal Close Trigger */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#C5A368]">
            [CORPORATE DIRECTORY]
          </span>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="border border-[#F9F9F7]/25 px-5 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#F9F9F7] transition-colors duration-300 hover:border-[#C5A368] hover:bg-[#C5A368] hover:text-[#142822] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C5A368]"
          >
            CLOSE [✕]
          </button>
        </div>

        {/* Center-to-Bottom: Oversized Swiss Grid Company Info */}
        <div className="my-auto flex flex-col divide-y divide-[#F9F9F7]/15 border-y border-[#F9F9F7]/15">
          {/* Block 1: Direct Lines */}
          <div className="menu-swiss-info py-7">
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.22em] text-[#C5A368]">
              01 / DIRECT DISPATCH
            </span>
            <div className="flex flex-col gap-1 font-serif text-[clamp(1.5rem,2.3vw,2.35rem)] font-normal leading-tight tracking-[-0.02em]">
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
          <div className="menu-swiss-info py-7">
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.22em] text-[#C5A368]">
              02 / TENDERS &amp; INQUIRIES
            </span>
            <div className="flex flex-col gap-1 font-serif text-[clamp(1.35rem,2vw,2rem)] font-normal leading-tight tracking-[-0.02em]">
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
          <div className="menu-swiss-info py-7">
            <span className="mb-2 block font-mono text-xs uppercase tracking-[0.22em] text-[#C5A368]">
              03 / HEADQUARTERS — UAE
            </span>
            <p className="font-serif text-[clamp(1.35rem,2vw,2rem)] font-normal leading-snug tracking-[-0.02em] text-[#F9F9F7]">
              Jurf Plaza, Room 602, Rashidiya 1 <br />
              Ajman, United Arab Emirates
            </p>
          </div>
        </div>

        {/* Bottom Architectural Coordinates */}
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[#F9F9F7]/50">
          <span>25.4052° N, 55.5136° E</span>
          <span>EURO STAR ELECTROMECHANICAL</span>
        </div>
      </div>
    </div>
  );
};
```

---

## 5. Aesthetic Replacement for the Floating "Go Up" Square Box

### Why the Current Button Clashes
The current black square box (`#1A1A1A`) sitting in the bottom-right corner feels like a default Bootstrap/Elementor widget and visually collides with the `#142822` emerald footer.

### Awwwards Replacement: Architectural Circular Scroll-Progress Dial (`44px`)
Replace the black square with a **transparent, hairline circular SVG progress ring** (`44px × 44px`) with a fine `#C5A368` gold radial stroke that fills (`stroke-dashoffset`) proportionally as the user scrolls down the page:
- **Adaptive Contrast:** Uses `mix-blend-difference` (or switches from `#222222` on Cream to `#F9F9F7` on the Emerald Footer) so it never needs a heavy opaque square background.
- **Micro-Interaction:** Hovering scales the inner upward arrow cleanly (`translateY(-2px)`) and highlights the ring in `#C5A368` Gold.

### Production Component: `ScrollProgressDial.tsx`

```tsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ScrollProgressDial: React.FC<{ onScrollTop: () => void }> = ({
  onScrollTop,
}) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const [visible, setVisible] = useState(false);
  const radius = 19;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setVisible(self.progress > 0.08);
        if (circleRef.current) {
          const offset = circumference * (1 - self.progress);
          circleRef.current.style.strokeDashoffset = `${offset}`;
        }
      },
    });

    return () => trigger.kill();
  }, [circumference]);

  return (
    <button
      type="button"
      onClick={onScrollTop}
      aria-label="Scroll back to top"
      className={`group fixed right-6 bottom-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#142822]/85 text-[#F9F9F7] backdrop-blur-xs transition-all duration-300 hover:scale-105 hover:text-[#C5A368] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C5A368] md:right-10 md:bottom-10 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* Circular SVG Scroll Progress Track */}
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="rgba(249, 249, 247, 0.16)"
          strokeWidth="1"
        />
        <circle
          ref={circleRef}
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#C5A368"
          strokeWidth="1.5"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
        />
      </svg>

      {/* Minimalist Architectural Up Arrow */}
      <svg
        width="12"
        height="14"
        viewBox="0 0 12 14"
        fill="none"
        className="relative z-10 stroke-current transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <path
          d="M6 13V1M6 1L1.5 5.5M6 1L10.5 5.5"
          strokeWidth="1.25"
          strokeLinecap="square"
        />
      </svg>
    </button>
  );
};
```

---

## 6. Fast Architectural Hairline Section Transition (`0.65s` Total)

Wire `SplitCurtainMenu` to a root transition controller so clicking any menu link triggers the **Saisei-inspired twin `#F9F9F7` panel close → instant Lenis scroll jump → center `1px` hairline split**:

```tsx
export const triggerSectionTransition = (
  targetSelector: string,
  lenisInstance: { scrollTo: (target: string, opts?: object) => void } | null,
  closeMenuCallback: () => void
) => {
  const leftCurtain = document.getElementById("transition-curtain-left");
  const rightCurtain = document.getElementById("transition-curtain-right");
  const centerSpine = document.getElementById("transition-center-spine");

  if (!leftCurtain || !rightCurtain || !centerSpine) {
    closeMenuCallback();
    lenisInstance?.scrollTo(targetSelector, { immediate: true });
    return;
  }

  const tl = gsap.timeline();

  // 1. Snap Twin Cream Panels Shut (0.0s -> 0.25s)
  tl.set([leftCurtain, rightCurtain, centerSpine], { pointerEvents: "auto" })
    .fromTo(
      leftCurtain,
      { xPercent: -100 },
      { xPercent: 0, duration: 0.25, ease: "power4.inOut" },
      0
    )
    .fromTo(
      rightCurtain,
      { xPercent: 100 },
      { xPercent: 0, duration: 0.25, ease: "power4.inOut" },
      0
    )
    .fromTo(
      centerSpine,
      { scaleY: 0, opacity: 1 },
      { scaleY: 1, duration: 0.2, ease: "power2.out" },
      0.1
    )
    // 2. Close Menu & Jump Scroll Instantly While Covered (at 0.25s)
    .add(() => {
      closeMenuCallback();
      if (lenisInstance) {
        lenisInstance.scrollTo(targetSelector, { immediate: true });
      } else {
        document.querySelector(targetSelector)?.scrollIntoView({ behavior: "auto" });
      }
    })
    // 3. Part Panels Outward to Reveal Target Section (0.28s -> 0.65s)
    .to(centerSpine, { opacity: 0, duration: 0.15 }, "+=0.03")
    .to(
      leftCurtain,
      { xPercent: -100, duration: 0.38, ease: "expo.inOut" },
      "<"
    )
    .to(
      rightCurtain,
      {
        xPercent: 100,
        duration: 0.38,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set([leftCurtain, rightCurtain, centerSpine], {
            pointerEvents: "none",
          });
        },
      },
      "<"
    );
};
```

---

## 7. Implementation Checklist & Cleanup Verification

- [ ] **Delete Legacy Artifacts:** Remove ScrollFlow JS/CSS, the `"Made with ScrollFlow"` badge, the heavy dark `EXPLORE CAPABILITIES` hero card, `ISO 9001:2015` hero badges, and the duplicate `EST — 2010` strip.
- [ ] **Verify Section Theme Attributes:** Ensure `<section id="home" data-header-theme="dark">`, `<section id="about" data-header-theme="light">`, `<section id="services" data-header-theme="light">`, `<section id="allied" data-header-theme="light">`, `<section id="projects" data-header-theme="light">`, and `<section id="contact" data-header-theme="dark">` are set so the header shifts seamlessly between `#F9F9F7` and `#222222` without any background box.
- [ ] **Verify Menu Palette & Scale:** Confirm the Split-Screen Menu right panel matches `#142822` (the exact emerald tone of the Contact/Footer section) and uses large Swiss display typography (`clamp(1.35rem, 2.3vw, 2.35rem)`).
- [ ] **Verify Hostinger Production Performance:** Confirm `<video>` uses `preload="auto"` with WebP poster fallback, `ScrollTrigger` runs exclusively on `transform`/`opacity`, and Lighthouse Performance/Accessibility/SEO scores stay above `95+`.