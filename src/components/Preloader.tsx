"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [complete, setComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState<boolean | null>(null);

  // Check sessionStorage on client mount + hard failsafe timeout (never trap users at 0%)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const visited = sessionStorage.getItem("eurostar_visited");
      if (visited === "true") {
        setShouldRender(false);
        setComplete(true);
        return;
      } else {
        setShouldRender(true);
      }

      // Hard failsafe: force-dismiss after 2.0s even if network or animation stalls
      const hardTimeout = window.setTimeout(() => {
        document.body.style.overflow = "";
        sessionStorage.setItem("eurostar_visited", "true");
        setComplete(true);
      }, 2000);

      return () => window.clearTimeout(hardTimeout);
    }
  }, []);

  useGSAP(
    () => {
      if (shouldRender !== true || !containerRef.current) return;

      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          sessionStorage.setItem("eurostar_visited", "true");
          setComplete(true);
        },
      });

      const counterObj = { value: 0 };
      const DURATION = 1.0; // 1s count phase (max 1.4s total)

      // Phase 1: HUD Counter (0.0s – 1.0s)
      tl.to(
        progressBarRef.current,
        {
          scaleX: 1,
          duration: DURATION,
          ease: "power1.inOut",
        },
        0
      );

      tl.to(
        counterObj,
        {
          value: 100,
          duration: DURATION,
          ease: "power1.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(counterObj.value)
                .toString()
                .padStart(3, "0");
            }
          },
        },
        0
      );

      // Phase 2: Center-Aperture / Curtain Unclip (1.0s – 1.4s)
      tl.set(containerRef.current, { pointerEvents: "none" }, DURATION);

      tl.to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 0.4,
          ease: "power4.inOut",
        },
        DURATION
      );

      return () => {
        document.body.style.overflow = "";
      };
    },
    { scope: containerRef, dependencies: [shouldRender] }
  );

  // If already visited or animation complete, render nothing
  if (shouldRender === false || complete) return null;

  return (
    <div
      ref={containerRef}
      id="eurostar-preloader"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#141414",
        color: "#F9F9F7",
        display: complete ? "none" : "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#141414] will-change-transform"
    >
      {/* Corner Brackets */}
      <div className="absolute top-6 left-6 w-6 h-6 border-t border-l border-[#C5A368]/40" />
      <div className="absolute top-6 right-6 w-6 h-6 border-t border-r border-[#C5A368]/40" />
      <div className="absolute bottom-6 left-6 w-6 h-6 border-b border-l border-[#C5A368]/40" />
      <div className="absolute bottom-6 right-6 w-6 h-6 border-b border-r border-[#C5A368]/40" />

      {/* Edge Telemetry Labels */}
      <div className="absolute top-6 left-14 text-[10px] font-mono tracking-[0.2em] text-[#F9F9F7]/30 uppercase">
        AJMAN, UAE — 25.4052° N
      </div>
      <div className="absolute top-6 right-14 text-[10px] font-mono tracking-[0.2em] text-[#F9F9F7]/30 uppercase">
        EST. 2010 — 55.5136° E
      </div>
      <div className="absolute bottom-6 left-14 text-[10px] font-mono tracking-[0.2em] text-[#F9F9F7]/30 uppercase">
        ISO 9001:2015
      </div>
      <div className="absolute bottom-6 right-14 text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase">
        EURO STAR ELECTROMECHANICAL
      </div>

      {/* Center Content */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Brand Wordmark */}
        <div className="flex flex-col items-center leading-none select-none">
          <h2 className="font-galgo text-[clamp(2.5rem,7vw,5.5rem)] text-white/25 tracking-wider uppercase font-bold leading-[0.82] text-center">
            EURO STAR
          </h2>
          <span className="font-galgo text-[clamp(1.2rem,3.5vw,2.5rem)] text-white/25 tracking-[0.16em] uppercase font-bold leading-[0.82] text-center -mt-2 sm:-mt-3">
            ELECTROMECHANICAL
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="relative w-[280px] sm:w-[360px]">
          {/* Track */}
          <div className="w-full h-[1px] bg-[#F9F9F7]/10" />
          {/* Fill */}
          <div
            ref={progressBarRef}
            className="absolute top-0 left-0 h-[1px] bg-[#C5A368] origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Counter */}
        <div className="flex items-baseline gap-3">
          <span
            ref={counterRef}
            className="text-[#C5A368] text-2xl font-mono tabular-nums tracking-wider"
          >
            000
          </span>
          <span className="text-[#F9F9F7]/30 text-xs font-mono tracking-[0.3em] uppercase">
            %
          </span>
        </div>
      </div>
    </div>
  );
}
