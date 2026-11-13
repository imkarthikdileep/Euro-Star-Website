"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    // Mobile & Tablet (< 1024px or touch): Disable Lenis completely to preserve 100% native OS momentum scroll
    const isDesktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    if (!isDesktop) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    window.__lenis = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();

    // Dedicated ticker callback so it can be cleanly removed on unmount
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      delete window.__lenis;
      lenis.destroy();
      gsap.ticker.remove(onTick);
    };
  }, []);

  return null;
}
