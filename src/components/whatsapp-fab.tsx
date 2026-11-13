"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatsAppFab = () => {
  const rectRef = useRef<SVGRectElement>(null);
  const [visible, setVisible] = useState(false);

  // Exact perimeter of a rounded rect with width=42, height=42, rx=13:
  // straight parts: 4 * (42 - 2*13) = 64
  // curved parts: 2 * pi * 13 ≈ 81.68
  // perimeter ≈ 145.68
  const perimeter = 145.68;

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setVisible(self.progress > 0.05);
        if (rectRef.current) {
          const offset = perimeter * (1 - self.progress);
          rectRef.current.style.strokeDashoffset = `${offset}`;
        }
      },
    });

    return () => trigger.kill();
  }, [perimeter]);

  const scrollToTop = () => {
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
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={`group fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-[16px] bg-white/[0.08] hover:bg-white/[0.18] border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#C5A368] md:right-10 md:bottom-10 shadow-2xl ${
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
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />
        <rect
          ref={rectRef}
          x="3"
          y="3"
          width="42"
          height="42"
          rx="13"
          fill="none"
          stroke="rgba(255, 255, 255, 0.9)"
          strokeWidth="1.5"
          strokeDasharray={perimeter}
          strokeDashoffset={perimeter}
          strokeLinecap="round"
        />
      </svg>

      {/* Pure White Architectural Up Arrow */}
      <svg
        width="14"
        height="16"
        viewBox="0 0 14 16"
        fill="none"
        className="relative z-10 stroke-white text-white transition-transform duration-300 group-hover:-translate-y-1"
      >
        <path
          d="M7 15V1M7 1L1.5 6.5M7 1L12.5 6.5"
          stroke="white"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default WhatsAppFab;
