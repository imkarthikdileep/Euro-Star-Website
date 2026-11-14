"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatsAppFab = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Exact perimeter of a rounded rect with width=42, height=42, rx=13:
  // straight parts: 4 * (42 - 2*13) = 64
  // curved parts: 2 * pi * 13 ≈ 81.68
  // perimeter ≈ 145.68
  const perimeter = 145.68;

  // Real-time chroma detection under the FAB button
  const detectTheme = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const elements = document.elementsFromPoint(x, y);
    for (const el of elements) {
      if (el === buttonRef.current || buttonRef.current.contains(el)) continue;

      // 1. Direct check for Split Menu Contact Info panel/card
      if (
        el.closest(".menu-swiss-info") ||
        el.closest(".bg-\\[\\#142822\\]") ||
        el.closest(".bg-\\[\\#1A3C34\\]") ||
        el.closest(".bg-\\[\\#101010\\]") ||
        el.closest(".bg-\\[\\#141414\\]")
      ) {
        setIsDark(true);
        return;
      }

      // 2. Check closest data-header-theme attribute
      const themed = el.closest<HTMLElement>("[data-header-theme]");
      if (themed) {
        const theme = themed.dataset.headerTheme;
        setIsDark(theme !== "light");
        return;
      }

      // 3. Explicit dark section IDs/elements
      if (el.closest("footer, #contact, #home")) {
        setIsDark(true);
        return;
      }

      // 4. Explicit light section IDs
      if (el.closest("#about, #services, #sister-concerns, #stats, #clients, #gallery")) {
        setIsDark(false);
        return;
      }

      // 5. Computed background color luminance fallback
      let curr: HTMLElement | null = el as HTMLElement;
      while (curr && curr !== document.body && curr !== document.documentElement) {
        const bg = window.getComputedStyle(curr).backgroundColor;
        if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (match) {
            const r = parseInt(match[1], 10);
            const g = parseInt(match[2], 10);
            const b = parseInt(match[3], 10);
            const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            setIsDark(lum < 140);
            return;
          }
        }
        curr = curr.parentElement;
      }
    }

    // Default based on scroll position
    setIsDark(window.scrollY < 300);
  }, []);

  useEffect(() => {
    // 1. Scroll progress trigger
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setVisible(self.progress > 0.05);
        if (rectRef.current) {
          const offset = perimeter * (1 - self.progress);
          rectRef.current.style.strokeDashoffset = `${offset}`;
        }
        detectTheme();
      },
    });

    // 2. Section boundary triggers for instant reactive theme changes
    const themedSections = gsap.utils.toArray<HTMLElement>("[data-header-theme]");
    const sectionTriggers = themedSections.map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom-=70px",
        end: "bottom bottom-=70px",
        onEnter: () => setIsDark(section.dataset.headerTheme !== "light"),
        onEnterBack: () => setIsDark(section.dataset.headerTheme !== "light"),
      })
    );

    // 3. Listen to scroll on window (capture: true catches drawer scroll too)
    window.addEventListener("scroll", detectTheme, { passive: true, capture: true });
    window.addEventListener("resize", detectTheme, { passive: true });

    // Initial check
    detectTheme();

    return () => {
      trigger.kill();
      sectionTriggers.forEach((t) => t.kill());
      window.removeEventListener("scroll", detectTheme, true);
      window.removeEventListener("resize", detectTheme);
    };
  }, [perimeter, detectTheme]);

  const scrollToTop = () => {
    // If split menu drawer is open and scrolled, scroll it to top as well
    const splitMenuScroll = document.querySelector("#eurostar-split-menu .overflow-y-auto");
    if (splitMenuScroll) {
      splitMenuScroll.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={`group fixed right-6 bottom-6 z-[120] flex h-12 w-12 items-center justify-center rounded-[16px] backdrop-blur-md transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C5A368] md:right-10 md:bottom-10 ${
        isDark
          ? "bg-white/[0.08] hover:bg-white/[0.18] border border-white/20 shadow-2xl"
          : "bg-black/[0.05] hover:bg-black/[0.12] border border-black/15 shadow-xl"
      } ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* Squircle SVG Scroll Progress Track */}
      <svg className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="13"
          fill="none"
          stroke={isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.12)"}
          strokeWidth="1"
          className="transition-colors duration-300"
        />
        <rect
          ref={rectRef}
          x="3"
          y="3"
          width="42"
          height="42"
          rx="13"
          fill="none"
          stroke="#C5A368"
          strokeWidth="1.5"
          strokeDasharray={perimeter}
          strokeDashoffset={perimeter}
          strokeLinecap="round"
          className="transition-colors duration-300"
        />
      </svg>

      {/* Dynamic Architectural Up Arrow (White in Dark, Charcoal in Light) */}
      <svg
        width="14"
        height="16"
        viewBox="0 0 14 16"
        fill="none"
        className={`relative z-10 transition-all duration-300 group-hover:-translate-y-1 ${
          isDark ? "stroke-white text-white" : "stroke-[#141414] text-[#141414]"
        }`}
      >
        <path
          d="M7 15V1M7 1L1.5 6.5M7 1L12.5 6.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default WhatsAppFab;
