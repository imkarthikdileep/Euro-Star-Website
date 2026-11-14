"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface FlashItem {
  t: number;
  img: number | "flat";
  g: number;
  lum?: number;
}

const CFG = {
  labels: { left: "EST-2010", right: "AJMAN-UAE" },
  images: [
    "/gallery/image1.png",
    "/gallery/image2.png",
    "/gallery/image3.png",
    "/gallery/image4.png",
    "/gallery/image5.png",
    "/gallery/image6.png",
    "/images/hero-poster-desktop.webp",
  ],
  scrambleSet: "ABDEFGILMNOPRSTUVW",
  labelSet: "AEJMNSTU-0125",
  glitchFPS: 15,
  gateT: 2.07,
};

const STEP = 1 / CFG.glitchFPS;

const COUNT_KEYS: [number, number][] = [
  [0.80, 28],
  [1.15, 28],
  [1.18, 40],
  [1.30, 41],
  [1.43, 51],
  [1.55, 61],
  [1.68, 69],
  [1.72, 72],
  [1.80, 75],
  [1.88, 80],
  [1.95, 89],
  [2.01, 95],
  [2.07, 98],
  [2.13, 100],
];

const GLITCHES: [number, number][] = [
  [0.80, 2],
  [1.18, 2],
  [1.30, 3],
  [1.55, 1],
  [1.68, 1],
  [1.95, 2],
  [2.01, 3],
  [2.07, 3],
];

const FLASH: FlashItem[] = [
  { t: 2.33, img: "flat", lum: 0.34, g: 0 },
  { t: 2.45, img: 3, g: 0.2 },
  { t: 2.58, img: "flat", lum: 0.22, g: 0 },
  { t: 2.70, img: 0, g: 1.0 },
  { t: 2.76, img: 1, g: 1.0 },
  { t: 2.83, img: 1, g: 0.7 },
  { t: 2.89, img: 2, g: 0.8 },
  { t: 2.96, img: 3, g: 0.6 },
  { t: 3.05, img: 4, g: 0.5 },
  { t: 3.17, img: 4, g: 0.15 },
  { t: 3.30, img: 5, g: 0.3 },
  { t: 3.43, img: 5, g: 0 },
  { t: 3.55, img: 6, g: 0.5 },
  { t: 3.67, img: 6, g: 0 },
];

const WIN = {
  line: "inset(33.5% 66.6% 33.5% 33.3%)",
  narrow: "inset(33.5% 61.7% 33.5% 32.4%)",
  w1: "inset(33.5% 34.8% 33.5% 26.9%)",
  w2: "inset(33.5% 25.6% 33.5% 25.1%)",
  big: "inset(32.7% 24.2% 32.7% 24.2%)",
  large: "inset(14.3% 8.4% 14.8% 8.4%)",
  full: "inset(0% 0% 0% 0%)",
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const randi = (a: number, b: number) => Math.floor(rand(a, b + 1));
const pick = (s: string) => s[Math.floor(Math.random() * s.length)];
const scrambleStr = (str: string, set: string, p: number) =>
  [...str]
    .map((c) => (c === " " || c === "-" ? c : Math.random() < p ? pick(set) : c))
    .join("");

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const numMainRef = useRef<HTMLSpanElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const labelLRef = useRef<HTMLSpanElement>(null);
  const labelRRef = useRef<HTMLSpanElement>(null);
  const sliceRefs = useRef<HTMLDivElement[]>([]);
  const fragRefs = useRef<HTMLElement[]>([]);
  const cornerRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // 1. Session check & Reduced Motion check
    const visited = sessionStorage.getItem("eurostar_visited");
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const quickReveal = () => {
      document.body.style.overflow = "";
      sessionStorage.setItem("eurostar_visited", "true");
      setComplete(true);
      window.dispatchEvent(new CustomEvent("preloader:done"));
    };

    if (visited === "true" || prefersReducedMotion) {
      quickReveal();
      return;
    }

    document.body.style.overflow = "hidden";

    // Failsafe timer (4.5s max duration)
    const failsafe = window.setTimeout(() => {
      quickReveal();
    }, 4500);

    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d", { alpha: false });
    if (!ctx) return;

    const tmp = document.createElement("canvas");
    const tctx = tmp.getContext("2d");

    let dpr = 1;
    let W = window.innerWidth;
    let H = window.innerHeight;

    const fallbackCache = new Map<number, HTMLCanvasElement>();

    const makeFlat = (lum: number = 0.3) => {
      const c = document.createElement("canvas");
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      const cx = c.getContext("2d");
      if (cx) {
        const val = Math.round(lum * 255);
        cx.fillStyle = `rgb(${val},${val},${val})`;
        cx.fillRect(0, 0, c.width, c.height);
      }
      return c;
    };

    const makeFallback = (idx: number) => {
      const lums = [0.22, 0.35, 0.78, 0.55, 0.45, 0.5, 0.4];
      const lum = lums[idx % lums.length];
      const c = document.createElement("canvas");
      const curW = window.innerWidth;
      const curH = window.innerHeight;
      c.width = curW;
      c.height = curH;
      const cx = c.getContext("2d");
      if (!cx) return c;

      // Linear gradient
      const grad = cx.createLinearGradient(0, 0, curW, curH);
      const v1 = Math.round(Math.max(0, lum - 0.12) * 255);
      const v2 = Math.round(Math.min(1, lum + 0.12) * 255);
      grad.addColorStop(0, `rgb(${v1},${v1},${v1})`);
      grad.addColorStop(1, `rgb(${v2},${v2},${v2})`);
      cx.fillStyle = grad;
      cx.fillRect(0, 0, curW, curH);

      // Bokeh lights
      for (let j = 0; j < 40; j++) {
        const r = rand(0.02, 0.12) * curW;
        const x = rand(0, curW);
        const y = rand(0, curH);
        const rad = cx.createRadialGradient(x, y, 0, x, y, r);
        const alpha = rand(0.05, 0.25);
        rad.addColorStop(0, `rgba(255,255,255,${alpha})`);
        rad.addColorStop(1, "rgba(255,255,255,0)");
        cx.fillStyle = rad;
        cx.beginPath();
        cx.arc(x, y, r, 0, Math.PI * 2);
        cx.fill();
      }

      // Diagonal band
      cx.fillStyle = "rgba(0,0,0,0.12)";
      cx.beginPath();
      cx.moveTo(curW * 0.1, 0);
      cx.lineTo(curW * 0.28, 0);
      cx.lineTo(curW * 0.88, curH);
      cx.lineTo(curW * 0.7, curH);
      cx.closePath();
      cx.fill();

      return c;
    };

    const drawCover = (src: CanvasImageSource) => {
      const sw = (src as HTMLImageElement).naturalWidth || (src as HTMLCanvasElement).width || W;
      const sh = (src as HTMLImageElement).naturalHeight || (src as HTMLCanvasElement).height || H;
      const s = Math.max(W / sw, H / sh);
      const dw = sw * s;
      const dh = sh * s;
      ctx.drawImage(src, (W - dw) / 2, (H - dh) / 2, dw, dh);
    };

    const drawFrame = (src: CanvasImageSource, g: number) => {
      drawCover(src);
      if (g < 0.02) return;

      // 1) Horizontal slice displacement
      const n = Math.round(4 + g * 14);
      for (let i = 0; i < n; i++) {
        const h = randi(4, 10 + g * 46);
        const y = randi(0, Math.max(1, H - h));
        const dx = rand(-1, 1) * g * W * 0.08;
        ctx.drawImage(cv, 0, y * dpr, cv.width, h * dpr, dx, y, W, h);
      }

      // 2) Datamosh downscale/upscale
      if (tctx) {
        const blocks = Math.round(g * 7);
        for (let i = 0; i < blocks; i++) {
          const bw = randi(W * 0.06, W * 0.22);
          const bh = randi(H * 0.04, H * 0.16);
          const x = randi(0, W - bw);
          const y = randi(0, H - bh);
          const px = randi(10, 26);
          tmp.width = Math.max(1, (bw / px) | 0);
          tmp.height = Math.max(1, (bh / px) | 0);
          tctx.drawImage(cv, x * dpr, y * dpr, bw * dpr, bh * dpr, 0, 0, tmp.width, tmp.height);
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(tmp, 0, 0, tmp.width, tmp.height, x, y, bw, bh);
          ctx.imageSmoothingEnabled = true;
        }
      }

      // 3) Vertical smear streaks
      if (g > 0.5) {
        for (let i = 0; i < 3; i++) {
          const x = randi(0, W - 130);
          ctx.drawImage(cv, x * dpr, 0, 1, cv.height, x, 0, randi(30, 120), H);
        }
      }

      // 4) Dark scan bar
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, randi(0, H - 24), W, randi(6, 22));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fallbackCache.clear();
      if (current) drawFrame(current.src, current.g);
    };

    // Preload Images
    const imgs: HTMLImageElement[] = [];
    let assetsReady = false;
    const loadPromises = CFG.images.map((url, i) => {
      return new Promise<void>((res) => {
        const im = new Image();
        im.crossOrigin = "anonymous";
        im.onload = () => {
          im.decode()
            .catch(() => {})
            .finally(() => {
              imgs[i] = im;
              res();
            });
        };
        im.onerror = () => res();
        im.src = url;
      });
    });

    const assetsPromise = Promise.all(loadPromises).then(() => {
      assetsReady = true;
    });

    const srcFor = (f: FlashItem): CanvasImageSource => {
      if (f.img === "flat") return makeFlat(f.lum ?? 0.3);
      if (imgs[f.img]) return imgs[f.img];
      if (!fallbackCache.has(f.img)) {
        fallbackCache.set(f.img, makeFallback(f.img));
      }
      return fallbackCache.get(f.img)!;
    };

    let current: { src: CanvasImageSource; g: number } | null = null;
    let photoLive = false;

    const setFrame = (f: FlashItem) => {
      current = { src: srcFor(f), g: f.g };
      drawFrame(current.src, current.g);
    };

    // Ticker Jobs
    const jobs = new Set<(dt: number) => void>();
    let acc = 0;
    let lastNow = performance.now();
    let raf = 0;
    let finished = false;

    const loop = (now: number) => {
      acc += Math.min(0.1, (now - lastNow) / 1000);
      lastNow = now;
      while (acc >= STEP) {
        acc -= STEP;
        jobs.forEach((j) => j(STEP));
      }
      if (!finished) {
        raf = requestAnimationFrame(loop);
      }
    };

    // Photo decay tick job
    jobs.add(() => {
      if (!photoLive || !current) return;
      current.g *= 0.85;
      drawFrame(current.src, current.g);
    });

    // Counter State & Rendering
    const counterState = { v: 28 };
    const renderCounter = () => {
      const v = counterState.v;
      const rounded = Math.min(99, Math.round(v));
      if (numMainRef.current) {
        numMainRef.current.textContent = `${rounded}%`;
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(1, v / 100)})`;
      }
      if (containerRef.current) {
        containerRef.current.setAttribute("aria-valuenow", String(rounded));
      }
    };

    const clearGlitch = () => {
      sliceRefs.current.forEach((s) => {
        if (s) s.style.opacity = "0";
      });
      fragRefs.current.forEach((f) => {
        if (f) f.style.opacity = "0";
      });
      if (logoRef.current) logoRef.current.style.transform = "translateX(-50%)";
      if (labelLRef.current) labelLRef.current.textContent = CFG.labels.left;
      if (labelRRef.current) labelRRef.current.textContent = CFG.labels.right;
      renderCounter();
    };

    const burst = (level: number) => {
      let steps = level;
      const job = () => {
        if (steps-- <= 0) {
          clearGlitch();
          jobs.delete(job);
          return;
        }
        const numText = numMainRef.current?.textContent || "28%";

        // A) Slices
        sliceRefs.current.forEach((s) => {
          if (!s) return;
          const top = rand(0, 70);
          const h = rand(12, 38);
          s.textContent = Math.random() < 0.5 ? numText : `${randi(10, 99)}%`;
          s.style.clipPath = `inset(${top}% 0 ${100 - top - h}% 0)`;
          s.style.transform = `translateX(${
            (Math.random() < 0.5 ? -1 : 1) * rand(6, 22 * level + 12)
          }px)`;
          s.style.opacity = "1";
        });

        // B) Shards
        fragRefs.current.forEach((f, i) => {
          if (!f) return;
          f.style.opacity = i < level ? "1" : "0";
          f.style.left = `${rand(-6, 14)}vw`;
          f.style.top = `${rand(62, 108)}%`;
          f.style.width = `${rand(1.2, 4)}vw`;
        });

        // C) Level 3 overshoot
        if (level === 3 && barRef.current) {
          barRef.current.style.transform = `scaleX(${Math.min(
            1,
            counterState.v / 100 + rand(0, 0.12)
          )})`;
        }

        // D) Logo squeeze + side label scramble
        if (logoRef.current) {
          logoRef.current.style.transform = `translateX(-50%) scaleX(${
            Math.random() < 0.6 ? 0.28 : 1
          })`;
        }
        if (labelLRef.current) {
          labelLRef.current.textContent = scrambleStr(CFG.labels.left, CFG.labelSet, 0.6);
        }
        if (labelRRef.current) {
          labelRRef.current.textContent = scrambleStr(CFG.labels.right, CFG.labelSet, 0.6);
        }

        // Show corners
        cornerRefs.current.forEach((c) => {
          if (c) c.style.opacity = "1";
        });
      };
      jobs.add(job);
    };

    // Master GSAP Timeline
    const masterTl = gsap.timeline();

    const finish = () => {
      finished = true;
      photoLive = false;
      document.body.style.overflow = "";
      sessionStorage.setItem("eurostar_visited", "true");
      window.dispatchEvent(new CustomEvent("preloader:done"));
      setComplete(true);
    };

    const buildTimeline = () => {
      resize();
      lastNow = performance.now();
      raf = requestAnimationFrame(loop);

      if (containerRef.current) {
        containerRef.current.classList.add("is-live");
      }

      // Phase 0-1: Hard cut + chrome flicker
      masterTl
        .set(chromeRef.current, { opacity: 1 }, 0.1)
        .set(chromeRef.current, { opacity: 0.35 }, 0.14)
        .set(chromeRef.current, { opacity: 1 }, 0.17);

      // Phase 3: Counter
      masterTl.set(counterRef.current, { opacity: 1 }, 0.8);
      for (let i = 0; i < COUNT_KEYS.length - 1; i++) {
        const [t0, v0] = COUNT_KEYS[i];
        const [t1, v1] = COUNT_KEYS[i + 1];
        masterTl.fromTo(
          counterState,
          { v: v0 },
          {
            v: v1,
            duration: Math.max(0.016, t1 - t0),
            ease: "none",
            onUpdate: renderCounter,
          },
          t0
        );
      }
      GLITCHES.forEach(([t, lvl]) => masterTl.call(() => burst(lvl), [], t));

      // Gate at T = 2.07
      masterTl.call(
        () => {
          if (assetsReady) return;
          masterTl.pause();
          const hold = () => burst(1);
          let n = 0;
          const gateJob = () => {
            if (++n % 6 === 0) hold();
          };
          jobs.add(gateJob);
          assetsPromise.then(() => {
            jobs.delete(gateJob);
            masterTl.resume();
          });
        },
        [],
        CFG.gateT
      );

      // Phase 4: Dead beat
      masterTl.set(counterRef.current, { opacity: 0 }, 2.14);

      // Phase 5-7: Window Reveal
      masterTl
        .call(() => {
          photoLive = true;
        }, [], 2.33)
        .set(cv, { opacity: 1, clipPath: WIN.line }, 2.33)
        .to(cv, { clipPath: WIN.narrow, duration: 0.05, ease: "none" }, 2.45)
        .to(cv, { clipPath: WIN.w1, duration: 0.06, ease: "expo.out" }, 2.58)
        .to(cv, { clipPath: WIN.w2, duration: 0.08, ease: "expo.out" }, 2.65)
        .to(cv, { clipPath: WIN.big, duration: 0.12, ease: "power2.out" }, 3.43)
        .to(cv, { clipPath: WIN.large, duration: 0.14, ease: "power3.out" }, 3.55)
        .to(cv, { clipPath: WIN.full, duration: 0.28, ease: "expo.inOut" }, 3.67);

      // Phase 6: Photo flashes
      FLASH.forEach((f) => masterTl.call(() => setFrame(f), [], f.t));

      // Phase 7: Chrome cuts out, grain fades
      masterTl
        .set(chromeRef.current, { opacity: 0.4 }, 3.55)
        .set(chromeRef.current, { opacity: 0 }, 3.6)
        .to([".pl-noise", ".pl-scan"], { opacity: 0, duration: 0.23, ease: "none" }, 3.67);

      // Phase 8: Reveal & Finish
      masterTl.call(finish, [], 3.95);
    };

    // Fonts ready check (timeout 1.5s max)
    if (document.fonts) {
      Promise.race([
        document.fonts.ready,
        new Promise((r) => setTimeout(r, 1500)),
      ]).then(() => {
        buildTimeline();
      });
    } else {
      buildTimeline();
    }

    const onResize = () => {
      resize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(failsafe);
      window.removeEventListener("resize", onResize);
      finished = true;
      cancelAnimationFrame(raf);
      masterTl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (complete) return null;

  return (
    <div
      ref={containerRef}
      id="pl"
      role="progressbar"
      aria-label="Loading Euro Star Electromechanical"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={28}
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-auto bg-[#0b0b0b]"
    >
      <div className="pl-bg" />
      <canvas ref={canvasRef} className="pl-photo" />
      <div className="pl-noise" />
      <div className="pl-scan" />

      {/* Chrome */}
      <div ref={chromeRef} className="pl-chrome">
        <div ref={logoRef} className="pl-logo flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Euro Star Logo"
            className="w-full h-full object-contain filter invert opacity-85 brightness-200"
          />
        </div>

        <span ref={labelLRef} className="pl-label pl-label-l">
          EST-2010
        </span>
        <span ref={labelRRef} className="pl-label pl-label-r">
          AJMAN-UAE
        </span>

        {/* 4 Precision Engineering Line Icons */}
        <div className="pl-icons">
          {/* 1: Target / Precision Reticle */}
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8" />
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="12" y1="18" x2="12" y2="22" />
            <line x1="2" y1="12" x2="6" y2="12" />
            <line x1="18" y1="12" x2="22" y2="12" />
          </svg>

          {/* 2: Structural I-Beam / Frame */}
          <svg viewBox="0 0 24 24">
            <line x1="4" y1="4" x2="20" y2="4" />
            <line x1="4" y1="20" x2="20" y2="20" />
            <line x1="12" y1="4" x2="12" y2="20" />
            <line x1="8" y1="9" x2="16" y2="9" />
            <line x1="8" y1="15" x2="16" y2="15" />
          </svg>

          {/* 3: Welding Spark / Bolt */}
          <svg viewBox="0 0 24 24">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>

          {/* 4: Electromechanical Gear */}
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </div>

        {/* 4 Corner Marks */}
        <i
          ref={(el) => {
            if (el) cornerRefs.current[0] = el;
          }}
          className="pl-corner tl"
        />
        <i
          ref={(el) => {
            if (el) cornerRefs.current[1] = el;
          }}
          className="pl-corner tr"
        />
        <i
          ref={(el) => {
            if (el) cornerRefs.current[2] = el;
          }}
          className="pl-corner bl"
        />
        <i
          ref={(el) => {
            if (el) cornerRefs.current[3] = el;
          }}
          className="pl-corner br"
        />
      </div>

      {/* Stuttering Coral Counter */}
      <div ref={counterRef} className="pl-counter">
        <div ref={barRef} className="pl-bar" />
        <div className="pl-num">
          <span ref={numMainRef} className="pl-num-main">
            28%
          </span>
        </div>

        {/* 3 Glitch Slices */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) sliceRefs.current[i] = el;
            }}
            className="pl-slice"
          />
        ))}

        {/* 2 Detached Shards */}
        {[0, 1].map((i) => (
          <i
            key={i}
            ref={(el) => {
              if (el) fragRefs.current[i] = el;
            }}
            className="pl-frag"
          />
        ))}
      </div>
    </div>
  );
}
