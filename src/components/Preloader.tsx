"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { createLoadTracker } from "./preloader-progress";

const CFG = {
  labels: { left: "EST-2010", right: "AJMAN-UAE" },
  scrambleSet: "ABDEFGILMNOPRSTUVW",
  labelSet: "AEJMNSTU-0125",
  glitchFPS: 15,
  maxWaitMs: 8000,
  gMin: 2.01,
  videoNeedSec: 3,
  windowTone: "mono-to-colour" as "mono-to-colour" | "colour" | "mono",
  weights: { fonts: 8, page: 12, fold: 10, rest: 30, video: 40 },
  debug:
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("pldebug"),
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

const WIN = {
  line: "inset(33.5% 66.6% 33.5% 33.3%)",
  narrow: "inset(33.5% 61.7% 33.5% 32.4%)",
  w1: "inset(33.5% 34.8% 33.5% 26.9%)",
  w2: "inset(33.5% 25.6% 33.5% 25.1%)",
  big: "inset(32.7% 24.2% 32.7% 24.2%)",
  large: "inset(14.3% 8.4% 14.8% 8.4%)",
  full: "inset(0% 0% 0% 0%)",
};

const PULSES: [number, number][] = [
  [0.32, 0.4],
  [0.44, 0.6],
  [0.57, 0.9],
  [0.69, 1.0],
  [0.75, 1.0],
  [0.82, 0.7],
  [0.88, 0.8],
  [0.95, 0.6],
  [1.04, 0.5],
  [1.16, 0.15],
  [1.29, 0.3],
  [1.42, 0],
  [1.54, 0.5],
  [1.66, 0],
];

const TONE = {
  mono: "grayscale(1) contrast(1.12) brightness(.96)",
  colour: "grayscale(0) contrast(1) brightness(1)",
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
  const debugRef = useRef<HTMLPreElement>(null);

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

    const video = document.querySelector<HTMLVideoElement>("[data-hero-video]");
    const tracker = createLoadTracker({
      video,
      weights: CFG.weights,
      maxWaitMs: CFG.maxWaitMs,
      videoNeedSec: CFG.videoNeedSec,
    });

    function holdVideo(v: HTMLVideoElement | null) {
      if (!v) return () => {};
      v.dataset.held = "1";
      v.removeAttribute("autoplay");
      v.autoplay = false;
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      v.preload = "auto";
      const guard = () => {
        if (v.dataset.held === "1") v.pause();
      };
      v.addEventListener("play", guard);
      v.pause();
      if (v.readyState === 0 && v.networkState === 0) v.load();
      return () => v.removeEventListener("play", guard);
    }

    const releaseGuard = holdVideo(video);

    function releaseVideo() {
      if (!video) return;
      video.dataset.held = "0";
      try {
        if (video.currentTime > 0.05) video.currentTime = 0;
      } catch (e) {}
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    }

    // Failsafe timer (14s max duration)
    const failsafe = window.setTimeout(() => {
      quickReveal();
    }, 14000);

    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d", { alpha: false });
    if (!ctx) return;

    const tmp = document.createElement("canvas");
    const tctx = tmp.getContext("2d");

    let dpr = 1;
    let W = window.innerWidth;
    let H = window.innerHeight;

    let heroBox = {
      x: 0,
      y: 0,
      w: window.innerWidth,
      h: window.innerHeight,
      px: 0.5,
      py: 0.5,
    };
    function parsePos(str: string): [number, number] {
      const kw: Record<string, number> = {
        left: 0,
        top: 0,
        center: 0.5,
        right: 1,
        bottom: 1,
      };
      const p = str.trim().split(/\s+/);
      const num = (v: string) =>
        v in kw ? kw[v] : v.endsWith("%") ? parseFloat(v) / 100 : 0.5;
      if (p.length === 1)
        return p[0] === "top" || p[0] === "bottom"
          ? [0.5, num(p[0])]
          : [num(p[0]), 0.5];
      if (p[0] === "top" || p[0] === "bottom") return [num(p[1]), num(p[0])];
      return [num(p[0]), num(p[1])];
    }
    function measureHero() {
      window.scrollTo(0, 0);
      if (!video) return;
      const r = video.getBoundingClientRect();
      const cs = getComputedStyle(video);
      const [px, py] = parsePos(cs.objectPosition || "50% 50%");
      heroBox = { x: r.left, y: r.top, w: r.width, h: r.height, px, py };
    }
    function coverInto(src: CanvasImageSource, sw: number, sh: number) {
      if (!ctx) return;
      const { x, y, w, h, px, py } = heroBox;
      const s = Math.max(w / sw, h / sh);
      const dw = sw * s;
      const dh = sh * s;
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.clip();
      ctx.drawImage(src, x + (w - dw) * px, y + (h - dh) * py, dw, dh);
      ctx.restore();
    }

    if (typeof history !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    measureHero();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      measureHero();
    };

    let photoLive = false;

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
      if (photoLive) {
        g *= 0.85;
        seed = (Math.random() * 4294967296) >>> 0;
      }
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
      photoLive = false;
      cancelAnimationFrame(rafId);
      releaseGuard && releaseGuard();
      if (video) {
        video.dataset.held = "0";
        const p = video.play();
        if (p && p.catch) p.catch(() => {});
      }
      tracker.destroy();
      finished = true;
      document.body.style.overflow = "";
      document.body.classList.remove("is-loading");
      sessionStorage.setItem("eurostar_visited", "true");
      window.dispatchEvent(new CustomEvent("preloader:done"));
      setComplete(true);
    };

    const emitEv = (name: string, detail?: unknown) =>
      window.dispatchEvent(new CustomEvent(name, { detail }));

    function choreo(t: number) {
      const K = COUNT_KEYS;
      if (t <= K[0][0]) return 0;
      for (let i = 0; i < K.length - 1; i++) {
        const [ta, va] = K[i];
        const [tb, vb] = K[i + 1];
        if (t < tb) return Math.min(98, va + ((vb - va) * (t - ta)) / (tb - ta));
      }
      return 98;
    }

    let shown = 0;
    let g = 0;
    let seed = 1;
    let rafId = 0;
    let srcKind: "video" | "poster" | "flat" = "flat";
    let posterImg: HTMLImageElement | null = null;
    if (video && video.poster) {
      posterImg = new Image();
      posterImg.src = video.poster;
    }
    const setGlitch = (v: number) => {
      g = v;
      seed = (Math.random() * 4294967296) >>> 0;
    };

    function chooseSource(): "video" | "poster" | "flat" {
      if (video && video.readyState >= 2 && video.videoWidth) return "video";
      if (posterImg && posterImg.complete && posterImg.naturalWidth) return "poster";
      return "flat";
    }

    function drawBase() {
      if (!ctx) return;
      ctx.fillStyle = "#0b0b0b";
      ctx.fillRect(0, 0, W, H);
      if (srcKind === "video" && video && video.readyState >= 2 && video.videoWidth) {
        return coverInto(video, video.videoWidth, video.videoHeight);
      }
      if (srcKind === "poster" && posterImg) {
        return coverInto(posterImg, posterImg.naturalWidth, posterImg.naturalHeight);
      }
      ctx.fillStyle = "#3a3a3a";
      ctx.fillRect(heroBox.x, heroBox.y, heroBox.w, heroBox.h);
    }

    function mulberry32(a: number) {
      return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    function applyGlitch(gv: number, sd: number) {
      if (gv < 0.02 || !ctx || !cv) return;
      const R = mulberry32(sd);
      const rnd = (a: number, b: number) => a + R() * (b - a);
      const rint = (a: number, b: number) => Math.floor(rnd(a, b + 1));
      const n = Math.round(4 + gv * 14);
      for (let i = 0; i < n; i++) {
        const h = rint(4, 10 + gv * 46);
        const y = rint(0, Math.max(1, H - h));
        const dx = rnd(-1, 1) * gv * W * 0.08;
        ctx.drawImage(cv, 0, y * dpr, cv.width, h * dpr, dx, y, W, h);
      }
      const blocks = Math.round(gv * 7);
      if (tctx) {
        for (let i = 0; i < blocks; i++) {
          const bw = rint(W * 0.06, W * 0.22);
          const bh = rint(H * 0.04, H * 0.16);
          const x = rint(0, W - bw);
          const y = rint(0, H - bh);
          const px = rint(10, 26);
          tmp.width = Math.max(1, (bw / px) | 0);
          tmp.height = Math.max(1, (bh / px) | 0);
          tctx.drawImage(
            cv,
            x * dpr,
            y * dpr,
            bw * dpr,
            bh * dpr,
            0,
            0,
            tmp.width,
            tmp.height
          );
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(tmp, 0, 0, tmp.width, tmp.height, x, y, bw, bh);
          ctx.imageSmoothingEnabled = true;
        }
      }
      if (gv > 0.5) {
        for (let i = 0; i < 3; i++) {
          const x = rint(0, W - 130);
          ctx.drawImage(cv, x * dpr, 0, 1, cv.height, x, 0, rint(30, 120), H);
        }
      }
      ctx.fillStyle = "rgba(0,0,0,.25)";
      ctx.fillRect(0, rint(0, H - 24), W, rint(6, 22));
    }

    function paint() {
      if (!photoLive) {
        rafId = 0;
        return;
      }
      drawBase();
      applyGlitch(g, seed);
      rafId = requestAnimationFrame(paint);
    }

    function decode(
      el: Element,
      { duration = 0.7, delay = 0 }: { duration?: number; delay?: number } = {}
    ) {
      const orig = el.textContent || "";
      if (!orig) return;
      const set = CFG.scrambleSet;
      const start = performance.now() + delay * 1000;
      const frame = (now: number) => {
        if (now < start) {
          requestAnimationFrame(frame);
          return;
        }
        const progress = Math.min(1, (now - start) / (duration * 1000));
        if (progress >= 1) {
          el.textContent = orig;
          return;
        }
        el.textContent = scrambleStr(orig, set, 1 - progress);
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }

    const openWindow = () => {
      srcKind = chooseSource();
      if (cv) {
        cv.style.filter = CFG.windowTone === "colour" ? TONE.colour : TONE.mono;
      }
      photoLive = true;
      releaseVideo();
      paint();
      emitEv("preloader:window-open", {
        source: srcKind,
        degraded: tracker.degraded(),
      });
    };

    let t0 = performance.now();
    const now = () => (performance.now() - t0) / 1000;
    let gTime: number | null = null;
    let outroStarted = false;

    const startOutro = () => {
      gTime = now();
      const tl = gsap.timeline(); // time 0 == G
      tl.fromTo(
        counterState,
        { v: shown },
        { v: 100, duration: 0.13, ease: "none", onUpdate: renderCounter },
        0
      )
        .call(() => burst(3), [], 0)
        .call(() => burst(3), [], 0.06)
        .set(counterRef.current, { opacity: 0 }, 0.13)
        .call(openWindow, [], 0.32)
        .set(cv, { opacity: 1, clipPath: WIN.line }, 0.32)
        .to(cv, { clipPath: WIN.narrow, duration: 0.05, ease: "none" }, 0.44)
        .to(cv, { clipPath: WIN.w1, duration: 0.06, ease: "expo.out" }, 0.57)
        .to(cv, { clipPath: WIN.w2, duration: 0.08, ease: "expo.out" }, 0.64)
        .to(cv, { clipPath: WIN.big, duration: 0.12, ease: "power2.out" }, 1.42)
        .to(cv, { clipPath: WIN.large, duration: 0.14, ease: "power3.out" }, 1.54)
        .set(chromeRef.current, { opacity: 0.4 }, 1.54)
        .set(chromeRef.current, { opacity: 0 }, 1.59)
        .to(cv, { clipPath: WIN.full, duration: 0.28, ease: "expo.inOut" }, 1.66)
        .set("#site", { opacity: 1 }, 1.66)
        .to([".pl-noise", ".pl-scan"], { opacity: 0, duration: 0.23, ease: "none" }, 1.66)
        .call(
          () => {
            document
              .querySelectorAll("#site [data-decode]")
              .forEach((el, i) => decode(el, { duration: 0.7, delay: i * 0.05 }));
          },
          [],
          1.7
        )
        .fromTo(
          ".nav",
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
          1.72
        )
        .to(cv, { opacity: 0, duration: 0.3, ease: "none" }, 1.84)
        .call(finish, [], 2.14);

      PULSES.forEach(([o, v]) => tl.call(() => setGlitch(v), [], o));
      if (CFG.windowTone === "mono-to-colour") {
        tl.to(
          cv,
          { filter: TONE.colour, duration: 0.5, ease: "power2.inOut" },
          1.42
        );
      }
    };

    const buildTimeline = () => {
      resize();
      lastNow = performance.now();
      raf = requestAnimationFrame(loop);

      if (containerRef.current) {
        containerRef.current.classList.add("is-live");
      }
      document.body.classList.add("is-loading");
      t0 = performance.now();

      if (CFG.debug && typeof window !== "undefined") {
        (window as any).__plDebug = {
          snapshot: () => {
            const snap = tracker.snapshot();
            return {
              T: +now().toFixed(3),
              shown,
              real: snap.real,
              fonts: snap.fonts,
              page: snap.page,
              fold: snap.fold,
              rest: snap.rest,
              video: snap.video,
              vReady: snap.vReady,
              vBuf: snap.vBuf,
              degraded: snap.degraded,
              outroStarted,
              G: gTime !== null ? +gTime.toFixed(3) : null,
            };
          },
        };

        jobs.add(() => {
          if (!debugRef.current) return;
          const snap = (window as any).__plDebug?.snapshot();
          if (snap) {
            debugRef.current.textContent = JSON.stringify(snap, null, 2);
          }
        });
      }

      // Chrome flicker
      masterTl
        .set(chromeRef.current, { opacity: 1 }, 0.1)
        .set(chromeRef.current, { opacity: 0.35 }, 0.14)
        .set(chromeRef.current, { opacity: 1 }, 0.17);

      const GL_INTRO = GLITCHES.filter(([t]) => t < CFG.gMin);
      let lastChangeT = 0.8;
      let nextStall = 0;
      let gi = 0;
      let counterOn = false;

      jobs.add(() => {
        if (outroStarted) return;
        const t = now();
        if (!counterOn && t >= 0.8) {
          if (counterRef.current) counterRef.current.style.opacity = "1";
          counterOn = true;
        }
        while (gi < GL_INTRO.length && t >= GL_INTRO[gi][0]) {
          burst(GL_INTRO[gi++][1]);
        }
        if (counterOn) {
          const target = Math.min(
            Math.floor(tracker.value() * 98),
            Math.floor(choreo(t)),
            98
          );
          const next = Math.min(target, shown + 12);
          if (next > shown) {
            shown = next;
            lastChangeT = t;
            counterState.v = shown;
            renderCounter();
            emitEv("preloader:progress", { real: tracker.value(), shown });
          } else if (t - lastChangeT > 0.7 && t >= nextStall) {
            burst(1);
            nextStall = t + 0.5 + Math.random() * 0.4;
          }
        }
        if (t >= CFG.gMin && (tracker.ready() || tracker.degraded())) {
          outroStarted = true;
          startOutro();
        }
      });
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
      photoLive = false;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rafId);
      releaseGuard && releaseGuard();
      masterTl.kill();
      tracker.destroy();
      document.body.style.overflow = "";
      document.body.classList.remove("is-loading");
      if (typeof window !== "undefined" && (window as any).__plDebug) {
        delete (window as any).__plDebug;
      }
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

      {CFG.debug && (
        <pre
          ref={debugRef}
          style={{
            position: "fixed",
            bottom: "8px",
            left: "8px",
            zIndex: 10000,
            font: "11px/1.4 monospace",
            color: "#ffffff",
            background: "rgba(0,0,0,.7)",
            padding: "8px",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
