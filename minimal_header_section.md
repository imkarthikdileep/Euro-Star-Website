# Euro Star Electromechanical (`eurostaremc.com`) — HUD Corner-Bracket Header & Editorial Hero Specification

**Design Tokens:**
* `--bg-cream`: `#F9F9F7`
* `--bg-emerald`: `#142822`
* `--ink-charcoal`: `#222222`
* `--ink-cream`: `#F9F9F7`
* `--accent-gold`: `#C5A368`

---

## 1. Visual Architecture & Copywriting Refinements

Based on the uploaded HUD-bracketed header reference (`00:00`–`00:08`), this specification upgrades the floating header and hero typography with the following exact changes:

1. **Tactile HUD Corner-Bracket `MENU =` Button (Top-Right):**
   * Replaces the bare two-line icon with a crisp **frosted glass pill/box (`backdrop-blur-md`, `bg-[#222222]/25` over dark sections, `bg-[#F9F9F7]/70` over cream sections)** framed by **4 precision `1px` L-shaped corner brackets (`8px × 8px`)** in `#C5A368` Gold.
   * Displays uppercase monospace **`MENU`** alongside the 2-line architectural hamburger icon (`MENU =`).
   * *Hover Micro-Interaction:* The 4 corner brackets expand outward (`translate(3px, 3px)`) with a springy `cubic-bezier(0.22, 1, 0.36, 1)` snap while the inner pill shifts subtly to `#C5A368` gold tint.

2. **Enlarged Central `EST. 2010 · AJMAN` Stamp:**
   * Moves `EST. 2010` to the **true horizontal center (`left-1/2 -translate-x-1/2`)** of the header.
   * Increases typography scale to a prominent architectural stamp (`text-sm md:text-base font-mono font-medium tracking-[0.28em]`) flanked by delicate `16px` hairline rules (`— EST. 2010 —`), removing all `"Dubai"` references site-wide so it reads strictly **`EST. 2010`** (or **`AJMAN, UAE · EST. 2010`** where location is shown).

3. **Awwwards-Grade Editorial Hero Copywriting:**
   * Replaces generic industrial phrasing with authoritative, minimalist architectural copy:
     * **Eyebrow:** `STRUCTURAL STEEL · PRECISION WELDING · MEP`
     * **Primary Headline (`<h1>`):**
       > **ENGINEERING**  
       > *ENDURING* **INFRASTRUCTURE**
     * **Bottom-Left Quick-Index Links (Inspired by Reference `00:00` Bottom-Left Stack):** Optional subtle 3-row quick-jump index (`01 / FABRICATION ↗`, `02 / WELDING WORKS ↗`, `03 / MANPOWER ↗`) or kept ultra-clean with the single editorial headline + centered bouncy scroll cue.

---

## 2. Production Component: `HudAdaptiveHeader.tsx`

```tsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HudAdaptiveHeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export const HudAdaptiveHeader: React.FC<HudAdaptiveHeaderProps> = ({
  isMenuOpen,
  onToggleMenu,
}) => {
  const headerRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

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

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (isMenuOpen || window.innerWidth < 1024) return;
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
      className={`fixed top-0 left-0 right-0 z-[100] flex h-24 items-center justify-between px-5 transition-colors duration-300 md:px-12 lg:px-16 ${
        isLight ? "text-[#222222]" : "text-[#F9F9F7]"
      }`}
    >
      {/* LEFT: Brand Mark & Wordmark */}
      <a
        href="#home"
        className="relative z-10 flex items-center gap-3 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C5A368]"
      >
        <img
          src="/images/eurostar-mark.svg"
          alt="Euro Star Electromechanical"
          className="h-9 w-auto md:h-10"
        />
        <div className="flex flex-col leading-none">
          <span className="font-serif text-lg font-semibold tracking-tight md:text-xl">
            Euro Star
          </span>
          <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.26em] text-[#C5A368]">
            Electromechanical
          </span>
        </div>
      </a>

      {/* CENTER: Enlarged Architectural EST. 2010 Stamp */}
      <div
        aria-label="Established 2010"
        className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 sm:flex"
      >
        <span className="h-[1px] w-4 bg-[#C5A368]/60 md:w-6" />
        <span className="font-mono text-sm font-medium uppercase tracking-[0.32em] md:text-base">
          EST. 2010
        </span>
        <span className="h-[1px] w-4 bg-[#C5A368]/60 md:w-6" />
      </div>

      {/* RIGHT: HUD Corner-Bracketed "MENU =" Trigger */}
      <button
        type="button"
        onClick={onToggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="eurostar-split-menu"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        className="group relative z-10 p-1.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C5A368]"
      >
        {/* 4 Precision HUD Corner Brackets (Expand outward on hover) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-2 w-2 border-t border-l border-[#C5A368] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1 group-hover:-translate-y-1"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 h-2 w-2 border-t border-r border-[#C5A368] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#C5A368] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1 group-hover:translate-y-1"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[#C5A368] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:translate-y-1"
        />

        {/* Inner Frosted HUD Button Surface */}
        <div
          className={`flex items-center gap-3.5 px-4 py-2.5 backdrop-blur-md transition-colors duration-300 ${
            isLight
              ? "bg-[#222222]/[0.06] group-hover:bg-[#222222]/[0.12]"
              : "bg-[#F9F9F7]/[0.10] group-hover:bg-[#C5A368]/[0.22]"
          }`}
        >
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.24em]">
            {isMenuOpen ? "CLOSE" : "MENU"}
          </span>

          {/* Two-Line Architectural Equalizer Icon */}
          <div className="flex w-5 flex-col gap-[5px]">
            <span
              className={`block h-[1.5px] w-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isMenuOpen
                  ? "translate-y-[3.25px] rotate-45"
                  : "group-hover:translate-x-0.5"
              }`}
            />
            <span
              className={`block h-[1.5px] w-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isMenuOpen
                  ? "-translate-y-[3.25px] -rotate-45"
                  : "group-hover:-translate-x-0.5"
              }`}
            />
          </div>
        </div>
      </button>
    </header>
  );
};
```

---

## 3. Production Component: `EditorialHeroSection.tsx`

Includes the refined Awwwards-level typography, the Ajman-only heritage marker (`AJMAN, UAE · EST. 2010`), the unobtrusive bottom-left editorial lockup, and the minimal bouncy scroll cue:

```tsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAdaptiveHeroMedia } from "../hooks/useAdaptiveHeroMedia";

gsap.registerPlugin(ScrollTrigger);

export const EditorialHeroSection: React.FC<{ onScrollDown: () => void }> = ({
  onScrollDown,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLButtonElement>(null);
  const { mp4, poster } = useAdaptiveHeroMedia();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
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
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
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

  return (
    <section
      ref={sectionRef}
      id="home"
      data-header-theme="dark"
      className="relative top-0 z-10 min-h-[100svh] w-full overflow-hidden bg-[#141414] select-none lg:sticky lg:h-[100svh]"
    >
      {/* Background Video / Save-Data Poster */}
      <div
        ref={videoWrapRef}
        className="hero-video-wrapper absolute inset-0 h-full w-full will-change-transform"
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

      {/* Feathered Readability Scrims */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,14,14,0.45) 0%, rgba(14,14,14,0) 24%), radial-gradient(circle at 18% 84%, rgba(14,14,14,0.82) 0%, rgba(14,14,14,0.32) 45%, rgba(14,14,14,0) 76%)",
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

      {/* Bottom-Left Architectural Typography Lockup */}
      <div className="relative z-20 flex min-h-[100svh] flex-col justify-end px-5 pb-16 md:px-12 md:pb-20 lg:h-full lg:px-16">
        <div className="max-w-4xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#C5A368]" />
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[#C5A368]">
              Structural Steel · Precision Welding · MEP
            </p>
          </div>

          <h1 className="font-serif text-[clamp(2.45rem,6.2vw,6.15rem)] font-medium leading-[0.94] tracking-[-0.035em] text-[#F9F9F7]">
            ENGINEERING <br />
            <span className="italic text-[#C5A368]">ENDURING</span>{" "}
            INFRASTRUCTURE
          </h1>

          <p className="mt-5 max-w-md font-sans text-xs leading-relaxed tracking-wide text-[#F9F9F7]/75 md:text-sm">
            Heavy structural fabrication, certified high-integrity welding, and
            turnkey electromechanical execution out of Ajman, UAE.
          </p>
        </div>
      </div>

      {/* Minimalist Centered Bouncy Scroll Cue */}
      <button
        ref={arrowRef}
        type="button"
        onClick={onScrollDown}
        aria-label="Scroll down to About section"
        className="group absolute bottom-5 left-1/2 z-20 flex h-12 w-12 -translate-x-1/2 flex-col items-center justify-center text-[#F9F9F7]/80 transition-colors hover:text-[#C5A368] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C5A368]"
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
};
```

---

## 4. Site-Wide Location & Copy Consistency Audit (`Ajman, UAE` Only)

Execute a global find-and-replace across all components, metadata, and preloader telemetry so location branding is 100% consistent:

| File / Component | Previous Text | Updated Production Text |
| :--- | :--- | :--- |
| **Header Center Stamp** | `EST — 2010 · UAE` (small `11px`) | **`— EST. 2010 —`** (enlarged `14px–16px`, centered) |
| **Preloader HUD Telemetry** | `[DXB — 25.2048° N]` / `[AJM — 55.5136° E]` | **`[AJMAN, UAE — 25.4052° N]`** / **`[EST. 2010 — 55.5136° E]`** |
| **Hero Eyebrow / Subcopy** | `Dubai & Ajman, UAE` | **`Ajman, UAE`** |
| **SEO `<title>` Tag** | `...in Dubai & Ajman, UAE` | **`Euro Star Electromechanical \| Structural Steel Fabrication & MEP in Ajman, UAE`** |
| **SEO Meta Description** | `...in Dubai & Ajman, UAE.` | **`Precision electromechanical contracting, structural steel fabrication, TIG/arc welding, and certified manpower solutions based in Ajman, UAE. Est. 2010.`** |
| **Split Menu & Footer** | `Jurf Plaza, Room no 602, Rashidiya 1, Ajman, UAE` | **`Jurf Plaza, Room 602, Rashidiya 1, Ajman, UAE · Est. 2010`** |