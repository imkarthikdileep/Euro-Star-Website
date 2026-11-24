# Preloader Discovery & Architecture Notes (Phase 0)

## Phase 0 Discovery Table

| Anchor | Search Pattern / Target | Location | Status | Notes |
|---|---|---|---|---|
| Preloader entry | `EST-2010\|AJMAN-UAE\|pl-photo\|class="pl-` | `src/components/Preloader.tsx` (Lines 1–681) | FOUND | React client component (`"use client"`) rendering `#pl` overlay |
| Config object | `CFG\s*=\|glitchFPS\|labelSet` | `src/components/Preloader.tsx` (Lines 13–28) | FOUND | `CFG` object with labels, images, scrambleSet, glitchFPS, gateT |
| Counter keys | `COUNT_KEYS` | `src/components/Preloader.tsx` (Lines 32–47) | FOUND | `COUNT_KEYS: [number, number][]` defining 0.80 -> 2.13 curve |
| Glitch list | `GLITCHES` | `src/components/Preloader.tsx` (Lines 49–58) | FOUND | `GLITCHES: [number, number][]` pairs `[T, level]` |
| Flash list | `FLASH\b\|setFrame\|srcFor` | `src/components/Preloader.tsx` (Lines 60–75, 299–315) | FOUND | `FLASH` array and slideshow image logic |
| Window shapes | `WIN\s*=\|inset\(33.5%` | `src/components/Preloader.tsx` (Lines 77–85) | FOUND | `WIN` clip-path definitions (`line`, `narrow`, `w1`, `w2`, `big`, `large`, `full`) |
| Timeline builder | `gsap.timeline\|function build` | `src/components/Preloader.tsx` (Lines 433, 444–525) | FOUND | `masterTl = gsap.timeline()` and `buildTimeline()` |
| Gate | `gateT\|assetsReady\|tl.pause` | `src/components/Preloader.tsx` (Lines 27, 479–496) | FOUND | Pause at `CFG.gateT` (2.07) until `assetsReady` |
| Finish | `preloader:done` | `src/components/Preloader.tsx` (Lines 121, 440) | FOUND | `window.dispatchEvent(new CustomEvent("preloader:done"))` |
| Hero video | `<video\|\.mp4\|eurostar-hero` | `src/components/landing/hero-section.tsx` (Lines 95–105) | FOUND | Background `<video>` driven by `useAdaptiveHeroMedia()` |
| Hero autoplay | `autoPlay\|autoplay\|\.play\(` | `src/components/landing/hero-section.tsx` (Line 99) | FOUND | `<video autoPlay loop muted playsInline preload="auto" ...>` |
| Hero entrance anim | `hero` AND (`gsap\|framer\|animate`) | `src/components/landing/hero-section.tsx` (Lines 30–80) | FOUND | Parallax scrollTrigger only; zero entrance animation |
| Image loading | `next/image\|loading="lazy"\|priority` | Next.js and standard `<img>` tags across sections | FOUND | Standard lazy images with `<img>` and `next/image` |
| Root mount | `layout.tsx\|page.tsx` | `src/app/page.tsx` (Line 18) | FOUND | `<Preloader />` rendered at top of page |

## Phase 0 Core Facts

1. **Preloader language and framework:** TypeScript React client component (`"use client"`), mounted via `src/app/page.tsx`.
2. **Current slideshow images:** 7 items (`/gallery/image1.png` through `/gallery/image6.png`, `/images/hero-poster-desktop.webp`).
3. **Hero video properties:**
   - Component: `src/components/landing/hero-section.tsx`
   - Hook: `useAdaptiveHeroMedia()` (selects `/videos/eurostar-hero-desktop.mp4`, `/videos/eurostar-hero-tablet.mp4`, or `/videos/eurostar-hero-mobile.mp4`)
   - Props: `key={mp4} src={mp4} poster={poster} autoPlay loop muted playsInline preload="auto" className="h-full w-full object-cover"`
   - Poster: `/images/hero-poster-desktop.webp`, `/images/hero-poster-tablet.webp`, or `/images/hero-poster-mobile.webp`
4. **Site wrapper opacity:** Preloader renders directly over the page at `z-[9999] bg-[#0b0b0b]`. Root container in `src/app/page.tsx` will be tagged with `id="site"`.
5. **Hero video wrapper animation:** Parallax scrollTrigger on scroll down only. No entrance animation (scale: 1, opacity: 1, yPercent: 0).

## Architectural Mapping & Decisions (Minimal Diff)
- `preloader-progress.ts` will be created in `src/components/` as a pure TypeScript module, SSR-safe, zero framework dependencies.
- `holdVideo()` will attach `data-hero-video` query selector, bind held guard, pause video, and release cleanly upon handoff.
- In `src/app/page.tsx`, `<div className="flex flex-col min-h-screen">` will receive `id="site"`.
- `buildLegacyTimeline()` will wrap the existing fixed timeline to preserve the kill-switch behavior (`CFG.realProgress = false`).
