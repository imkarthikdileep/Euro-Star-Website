# Euro Star Electromechanical (`eurostaremc.com`) — Mobile & Tablet Performance, UX & Accessibility Specification

**Target Breakpoints:**
* **Mobile (`< 768px`):** Portrait smartphones (`360px` – `430px` primary viewport width)
* **Tablet (`768px – 1023px`):** Portrait & landscape iPads / Android tablets
* **Desktop (`>= 1024px`):** Full GSAP ScrollTrigger + Lenis + Split-Curtain choreography

---

## 1. Core Architectural Philosophy: Touch-Native First, Zero Scroll-Hijacking

Desktop Awwwards motion patterns (smooth-scroll inertia, sticky parallax pinning, hover-driven reveals, and multi-plane curtains) degrade mobile usability, trigger Safari iOS viewport jitter, drain battery, and hurt Core Web Vitals (INP / CLS / LCP).

On **all touch devices and viewports `< 1024px`**:
1. **Disable Lenis Smooth Scroll Completely:** Use 100% native OS momentum scrolling (`-webkit-overflow-scrolling: touch`). Native iOS/Android inertia is hardware-tuned and eliminates input latency.
2. **Disable Sticky Hero Parallax & ScrollTrigger Scrubbing:** Render the Hero (`#home`) and About (`#about`) in normal document flow (`position: relative`) so Safari's dynamic address bar expansion/collapse never causes layout jumps or clipped text.
3. **Strip Decorative Hairline Grids & Hover-Only Micro-Interactions:** Reduce the 6-column hero grid to a clean **2-column outer frame** on mobile, remove hover arrows (`↗`) that require two taps on iOS, and enforce `48px × 48px` minimum touch targets across every interactive control.

---

## 2. Responsive Media & Bandwidth Optimization (Hostinger Mobile Delivery)

Mobile users in the UAE and international regions frequently browse on cellular 4G/5G connections. Serve lightweight, aspect-matched assets without double-downloading desktop files:

### A. Device-Exclusive Hero Video & Poster Mounting
Never render hidden `<video>` tags via CSS (`hidden md:block`)—browsers still download hidden video streams in the background. Mount **strictly one** `<video>` element via `window.matchMedia`:

| Breakpoint | Video Asset | Target Aspect | Target File Size | Fallback Poster |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile (`< 768px`)** | `/videos/eurostar-hero-mobile.mp4` | `9:16` (`720×1280` or `540×960`) | **`<= 3.5 MB`** | `/images/hero-poster-mobile.webp` (`<= 85 KB`) |
| **Tablet (`768px–1023px`)** | `/videos/eurostar-hero-tablet.mp4` | `3:4` (`960×1280`) | **`<= 5.5 MB`** | `/images/hero-poster-tablet.webp` (`<= 120 KB`) |
| **Desktop (`>= 1024px`)** | `/videos/eurostar-hero-desktop.mp4` | `16:9` (`1920×1080`) | **`<= 10 MB`** | `/images/hero-poster-desktop.webp` (`<= 180 KB`) |

### B. Save-Data & Low-Power Mode Detection
If a mobile user has **Data Saver** enabled (`navigator.connection?.saveData === true`) or slow `2g`/`3g` connectivity, skip loading the `.mp4` stream entirely and display the high-resolution `.webp` poster image immediately with zero network stall.

```tsx
// hooks/useAdaptiveHeroMedia.ts
import { useEffect, useState } from "react";

export type ViewportTier = "mobile" | "tablet" | "desktop";

interface MediaConfig {
  tier: ViewportTier;
  mp4: string | null;
  poster: string;
}

export function useAdaptiveHeroMedia(): MediaConfig {
  const [config, setConfig] = useState<MediaConfig>({
    tier: "mobile",
    mp4: null,
    poster: "/images/hero-poster-mobile.webp",
  });

  useEffect(() => {
    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;

    const isConstrainedNetwork =
      Boolean(conn?.saveData) ||
      conn?.effectiveType === "2g" ||
      conn?.effectiveType === "slow-2g";

    const updateMedia = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setConfig({
          tier: "mobile",
          mp4: isConstrainedNetwork ? null : "/videos/eurostar-hero-mobile.mp4",
          poster: "/images/hero-poster-mobile.webp",
        });
      } else if (width < 1024) {
        setConfig({
          tier: "tablet",
          mp4: isConstrainedNetwork ? null : "/videos/eurostar-hero-tablet.mp4",
          poster: "/images/hero-poster-tablet.webp",
        });
      } else {
        setConfig({
          tier: "desktop",
          mp4: "/videos/eurostar-hero-desktop.mp4",
          poster: "/images/hero-poster-desktop.webp",
        });
      }
    };

    updateMedia();
    window.addEventListener("resize", updateMedia, { passive: true });
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return config;
}
```

---

## 3. Conditional GSAP Breakpoint Gate (`gsap.matchMedia`)

Isolate all complex scroll scrubbing, parallax, and multi-stage text clipping inside `gsap.matchMedia()` so mobile and tablet devices execute zero scroll-linked JavaScript overhead:

```tsx
// lib/motionOrchestrator.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function initResponsiveMotion() {
  const mm = gsap.matchMedia();

  // 1. DESKTOP ONLY (>= 1024px & Motion Allowed): Full Lenis + ScrollTrigger
  mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Desktop Hero Sticky Parallax
    gsap.to(".hero-video-wrapper", {
      yPercent: 14,
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  });

  // 2. MOBILE & TABLET (< 1024px): Native Scroll, Zero Parallax, Instant Visibility
  mm.add("(max-width: 1023px)", () => {
    // Guarantee every animated element is immediately visible with zero hidden state
    gsap.set(
      [
        ".hero-video-wrapper",
        ".reveal-text",
        ".hairline-divider",
        ".project-card",
      ],
      {
        clearProps: "all",
        opacity: 1,
        y: 0,
        yPercent: 0,
        scale: 1,
        clipPath: "none",
      }
    );
  });

  return () => mm.revert();
}
```

---

## 4. Mobile & Tablet UI/UX Layout & Ergonomics Spec

### A. Hero Section (`< 1024px`)
* **Viewport Height:** Use `min-h-[100svh]` (Small Viewport Height) with `pb-[env(safe-area-inset-bottom)]` so iOS Safari's bottom toolbar never covers the headline or scroll cue.
* **Readability Gradient:** Apply a stronger bottom-up gradient on portrait screens (`linear-gradient(180deg, rgba(14,14,14,0.55) 0%, rgba(14,14,14,0.15) 35%, rgba(14,14,14,0.88) 100%)`) because portrait video crops tighter around bright welding arcs and skies.
* **Typography Scale:**
  * Mobile `<h1>`: `text-[clamp(2.35rem,9.5vw,3.5rem)] leading-[0.98]` — prevents awkward single-letter word wrapping on `360px` screens.
  * Tablet `<h1>`: `text-[clamp(3.25rem,7vw,4.75rem)] leading-[0.96]`.
* **Minimal Scroll Cue:** Keep the subtle vertical `#C5A368` hairline + chevron centered at `bottom-5` with a `48px × 48px` invisible tap hit-area.

### B. Adaptive Header (`< 1024px`)
* **Height & Safe Area:** `h-16 pt-[env(safe-area-inset-top)] px-5 md:px-10`.
* **Hide Secondary Clutter:** Hide `EST. 2010` on viewports `< 640px` (`hidden sm:inline-block`) so the Euro Star logo and 2-line menu button have generous breathing room.
* **Disable Auto-Hide on Touch Scroll:** Keep the header reliably accessible (`position: fixed; top: 0`) on mobile rather than hiding on scroll-down, as mobile users frequently tap the menu mid-page without scrolling upward first. Ensure clean contrast (`#F9F9F7` over dark hero/footer; `#222222` over `#F9F9F7` cream sections).

### C. Touch-Optimized Full-Screen Navigation Drawer (`< 1024px`)
On desktop, the menu is a 50/50 side-by-side split (`Cream` left / `Emerald #142822` right). On **mobile & tablet (`< 1024px`)**, convert this into a **single scrollable full-screen sheet (`100dvh`, `overflow-y-auto`)** so nothing is clipped on short landscape screens:
1. **Top Half (`#F9F9F7` Cream):**
   * Sticky top bar inside drawer with `EURO STAR EMC` label and a **`48px × 48px` `CLOSE [✕]` button** (`border: 1px solid #222222`).
   * 6 stacked navigation rows (`min-height: 56px` per row for effortless thumb tapping) with clean `(01)`–`(06)` monospace indices and `24px–32px` display titles.
   * **Instant Anchor Navigation:** On mobile/tablet, clicking a menu item closes the drawer (`0.28s`) and scrolls smoothly via native `scrollIntoView({ behavior: "smooth" })`—skipping the twin-curtain center-split overlay so navigation feels immediate.
2. **Bottom Half (`#142822` Deep Emerald Footer-Matched Card):**
   * Integrated directly below the navigation links inside the scrollable drawer so mobile users have one-tap access to:
     * **Direct Call Buttons:** `<a href="tel:+971503860061">` & `<a href="tel:+971509142430">` (`min-height: 48px`, `font-size: 20px`).
     * **Direct Email Links:** `info@eurostaremc.com` & `info@kenzuae.com` (`min-height: 48px`, `font-size: 18px`).
     * **UAE Office Location:** `Jurf Plaza, Room 602, Rashidiya 1, Ajman, UAE` with a direct `Open in Maps ↗` link.

### D. Below-the-Fold Sections (`About`, `Services`, `Allied Concerns`, `Projects`, `Contact`)
Preserve your exact visual design and typography while fixing mobile layout ergonomics:
1. **Services Grid (`6 Cards`):**
   * Mobile (`< 640px`): `grid-cols-1 gap-4 px-5` (full-width cards with `p-6` padding so text never feels cramped).
   * Tablet (`640px – 1023px`): `grid-cols-2 gap-5 px-10` (balanced 2×3 grid instead of awkward 1-column stretching or cramped 3-column squishing).
2. **Allied Concerns (`Kenz Hiraa` & `Kenz Technical Services`):**
   * Stack cleanly (`grid-cols-1 md:grid-cols-2 gap-6`) with `max-h-14 w-auto object-contain` on company logos so neither logo overflows narrow screens.
3. **Key Metrics Strip (`12+ Years`, `171+ Technicians`, `81+ Projects`):**
   * Mobile: `grid-cols-1 divide-y divide-[#222222]/15` (clean Swiss stacked list) → Tablet (`>= 640px`): `grid-cols-3 divide-x`.
4. **Featured Projects Gallery (`3 Industrial Photos`):**
   * Mobile: Horizontal snap-scroll carousel (`flex overflow-x-auto snap-x snap-mandatory gap-4 px-5 scrollbar-none`) with `w-[82vw] shrink-0 snap-center aspect-[4/5]` so users can swipe effortlessly through all 3 industrial photos without excessive vertical scrolling, while Tablet renders the 3-column grid (`grid-cols-3 gap-4`).
5. **Contact Form & Footer (`#142822` Deep Emerald):**
   * **Prevent iOS Auto-Zoom on Inputs:** Set all `<input>` and `<textarea>` elements to `font-size: 16px` (`text-base`) minimum—iOS Safari automatically zooms in and breaks viewport alignment whenever an input has `font-size < 16px`.
   * **Proper Input Keyboards:** Add `type="tel" inputMode="tel"` on the Phone field and `type="email" inputMode="email"` on the Email field.
   * **Full-Width Submit Button:** Make `SEND MESSAGE` `w-full sm:w-auto min-h-[52px]` on mobile for effortless thumb reach.
   * **Clean Footer Bottom Bar:** Stack copyright (`© 2026 Euro Star Electromechanical`), `Privacy Policy`, and `Terms` vertically on mobile (`flex-col gap-4`) with `pb-20` bottom clearance so the circular `ScrollProgressDial` never overlaps legal links.

---

## 5. Mobile-First CSS Guardrails (`mobile-overrides.css`)

```css
/* Prevent horizontal overflow from 100vw elements or off-canvas drawers */
html,
body {
  max-width: 100%;
  overflow-x: clip;
  -webkit-text-size-adjust: 100%;
}

/* Eliminate 300ms tap delay and grey tap highlight boxes on iOS/Android */
a,
button,
input,
textarea,
select {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* Guarantee minimum 48x48px accessible touch targets on mobile/tablet */
@media (max-width: 1023px) {
  header button,
  header a,
  nav button,
  nav a,
  footer a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }

  /* Prevent iOS Safari input zoom bug */
  input,
  textarea,
  select {
    font-size: 16px !important;
  }

  /* Disable sticky hero pinning on touch screens to prevent Safari address-bar jump */
  #home {
    position: relative !important;
    top: auto !important;
  }
}
```

---

## 6. Mobile & Tablet QA Verification Checklist

* [ ] **Zero Horizontal Scroll:** Verify `document.documentElement.scrollWidth === window.innerWidth` at `360px`, `390px` (iPhone), `768px` (iPad Portrait), and `1024px` (iPad Landscape).
* [ ] **Single Video Asset Loaded:** Confirm in Chrome DevTools (`Network` tab → `Media` filter) that mobile viewports download **only** `eurostar-hero-mobile.mp4` (`<= 3.5 MB`) and never request the 1080p desktop file.
* [ ] **Zero Input Zoom on iOS:** Tap every field in the `#contact` form on iOS Safari and verify the viewport remains locked at `1.0x` scale.
* [ ] **One-Tap Phone & Email Actions:** Confirm tapping phone numbers and email addresses inside both the `#142822` Split Menu and Contact section triggers native dialer/mail sheets immediately.
* [ ] **Lighthouse Mobile Audit:** Achieve **Performance >= 92**, **Accessibility >= 98**, **Best Practices >= 95**, and **SEO = 100** on Google PageSpeed Insights (Mobile profile).