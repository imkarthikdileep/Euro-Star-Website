# Euro Star Electromechanical (`eurostaremc.com`) — Awwwards Refactor & Performance Specification

## 1. Diagnostic Audit of Current Build (Issues to Eliminate Immediately)

Based on frame-by-frame inspection of the current live build, the following critical bugs and anti-patterns are degrading performance, retention, and visual quality:

1. **GPU Compositing Corruption on Sticky Navbar:** The sticky header uses an unoptimized `backdrop-filter: blur()` over transforming layers, causing severe rainbow/pixelated GPU texture tearing during scroll.
2. **Scroll-Jacking Lag & Empty Viewport Dead-Zones:** The third-party scroll library ("ScrollFlow") desynchronizes DOM paint from native scroll position, causing content to lag behind scroll input and leaving huge blank cream/dark gaps between sections.
3. **Artificially Delayed 6-Second Preloader:** The current `0% -> 100%` text-fill loader blocks initial paint for ~6 seconds on a timer rather than mounting the live DOM underneath, hurting Core Web Vitals (LCP/FCP) and user retention on Hostinger hosting.
4. **Clashing Third-Party UI Overlays:**
   * Default light-grey Cookie Consent modal (`bottom-left`) breaks the aesthetic and overlaps form inputs.
   * "Made with ScrollFlow" watermark (`bottom-right`) and unstyled floating WhatsApp/scroll-top buttons overlap footer legal links.
5. **Hero Readability Risk:** Placing typography directly over high-contrast welding sparks and bright Dubai sunrise skies without a multi-stop scrim and architectural grid framing will render headlines illegible.

---

## 2. Preservation & Retention Guardrails (Strictly Enforced)

* **Preserve Existing Fonts & Below-the-Fold Layouts:** Do **NOT** alter the site's existing typography/font families or change the structural layout of existing sections below the Hero (Services cards, Industrial Showcase strip, About section, and the deep emerald Contact & Footer layout must retain their exact visual hierarchy and proportions). Only replace the **Header/Navigation**, **Preloader**, **Hero Section**, **Section-to-Section Scroll & Menu Transitions**, and **Technical SEO/Performance layer**.
* **Zero Retention Drop / Instant Interactive Readiness:**
  * Render the complete page DOM, hero video, and below-the-fold sections **live in the background (`opacity: 1`, `visibility: visible`)** while the preloader plays on top (`z-index: 9999`), ensuring Googlebot crawlers and Core Web Vitals (LCP) register immediate content paint with zero `display: none` or `visibility: hidden` penalties.
  * Cap initial preloader duration at **1.4 seconds max** (bypassed entirely on repeat session visits via `sessionStorage`).
  * Ensure `pointer-events: none` is applied to overlay containers the millisecond their exit transition starts so users can scroll or click immediately without friction.

---

## 3. Codebase Cleanup & Deletion Mandate (Hostinger Optimization)

Execute a strict cleanup before implementing the new GSAP architecture so the Hostinger deployment runs at a locked 60fps:

1. **Delete ScrollFlow & Legacy Animation Scripts:** Completely uninstall/remove ScrollFlow, WOW.js/AOS bundles, and all `.scrollflow` data-attributes or wrapper `<div>` elements causing layout shifts and blank scroll gaps.
2. **Remove Unwanted Widgets & Watermarks:**
   * Delete the "Made with ScrollFlow" badge completely.
   * Restyle the Cookie Consent notice into a minimal, low-profile bottom bar (`1px` top border, `#181818` surface, `#C5A368` Accept button) that dismisses cleanly via `localStorage` and never overlaps form inputs or footer links.
3. **Fix Header GPU Artifacts:**
   * Remove `backdrop-filter: blur()` from `<header>`.
   * Animate the header strictly via GPU-composited `transform` and crisp color transitions without blur layers.
4. **Asset & Bundle Hygiene:**
   * Load **GSAP (`gsap.min.js`)**, **ScrollTrigger (`ScrollTrigger.min.js`)**, and **Lenis (`lenis.min.js`)** cleanly once at the root level.
   * Add `loading="lazy"` and explicit `width`/`height` attributes to all below-the-fold images to eliminate Cumulative Layout Shift (`CLS = 0`).

---

## 4. Minimal Awwwards Header & Split-Screen Curtain Menu (Saisei Reference Architecture)

Model the header and navigation drawer directly on the uploaded **Saisei** Awwwards reference (`00:00–00:06` in the second video), adapted strictly to Euro Star EMC's **Cream (`#F9F9F7`)**, **Charcoal (`#222222`)**, and **Gold (`#C5A368`)** palette:

### A. Minimal 3-Element Floating Header (`height: 72px`, `z-index: 100`)
Replace the cluttered multi-link navbar with an ultra-minimal, architectural 3-point header:
* **Left Slot:** Crisp Euro Star EMC logo/wordmark (adapts color automatically via `mix-blend-mode` or scroll state: `#F9F9F7` over dark Hero, `#222222` over Cream sections).
* **Right-Center Slot:** Subtle monospace company index tag (`EST — 2010 · UAE`) hidden on small mobile viewports (`hidden sm:inline-block`).
* **Far-Right Slot:** Minimal **2-line architectural hamburger trigger** (`width: 28px`, `height: 10px`, two `1.5px` horizontal bars with `gap: 6px`).
  * *Hover micro-interaction:* Top bar shifts `translateX(4px)`, bottom bar shifts `translateX(-4px)` (`0.3s cubic-bezier(0.22, 1, 0.36, 1)`).

### B. Full-Screen 50/50 Split-Curtain Navigation Drawer (`z-index: 90`)
When the user clicks the 2-line hamburger button (or presses `Enter`/`Space`), trigger a synchronized **GSAP Master Timeline (`menuTl`)**:

1. **Opening Animation (`0.65s` total — `power4.inOut`):**
   * **Left Panel (`50vw` on desktop, `100vw` on mobile — Background `#F9F9F7` Cream):** Slides down from the top (`clip-path: inset(0% 0% 100% 0%) -> inset(0% 0% 0% 0%)` or `translateY(-100%) -> translateY(0%)`).
   * **Right Panel (`50vw`, hidden on mobile — Background `#1C1C1C` Deep Charcoal):** Slides up simultaneously from the bottom (`translateY(100%) -> translateY(0%)`), separated from the left panel by a crisp `1px solid rgba(34,34,34,0.14)` vertical divider.
   * **Staggered Navigation Items (Left Cream Panel):**
     * Display 6 architectural rows separated by `1px solid rgba(34, 34, 34, 0.14)` full-width horizontal rules (`scaleX(0) -> scaleX(1)`):
       * `(01) HOME`
       * `(02) ABOUT US`
       * `(03) SERVICES`
       * `(04) FABRICATION & WELDING`
       * `(05) ALLIED CONCERNS`
       * `(06) CONTACT`
     * Each row features a small monospace index `(01)` on the left, large display typography (`#222222`) in the center-left, and a circular `36px` `#C5A368` gold badge with a directional arrow/numeral on the right.
     * *Row Hover Interaction:* Text nudges `translateX(12px)`, the gold badge rotates/scales (`scale(1.08)`), and a subtle `1px` `#C5A368` underline sweeps left-to-right.
   * **Brand Emblem & Direct UAE Contact (Right Charcoal Panel `#1C1C1C`):**
     * **Top-Right:** Sharp bordered **`CLOSE [✕]`** button (`border: 1px solid rgba(249,249,247,0.3)`, `color: #F9F9F7`, hover fill `#C5A368` with `#222222` text).
     * **Upper Center:** Large `140px` thin `1px` `#C5A368` geometric circle framing the crisp Euro Star geometric emblem (`scale(0.85) -> scale(1)`, `opacity: 0 -> 1`).
     * **Lower Grid (2-Column Metadata in `#F9F9F7` & `#C5A368` labels):**
       * `EMAIL`: `info@eurostaremc.com` / `info@kenzuae.com`
       * `OFFICE`: `Jurf Plaza, Room no 602, Rashidiya 1, Ajman, UAE`
       * `PHONE`: `+971 50 386 0061` / `+971 50 914 2430`
       * `COORDINATES`: `25.4052° N, 55.5136° E`
2. **Closing Animation (`0.5s` — `power3.inOut`):**
   * Reverses cleanly (`menuTl.timeScale(1.3).reverse()`), sliding the left `#F9F9F7` panel up and the right `#1C1C1C` panel down while restoring page scroll.

---

## 5. Fast "Architectural Hairline Split" Section Navigation Transition (`0.65s` Total)

Modeled on the **Saisei** section-click transition (`00:07–00:13` in the second video)—**optimized to `0.65s` total (no slow 4-second wait)** so user retention stays high while delivering an unforgettable Awwwards signature:

1. **Trigger:** When a user clicks any link inside the Split-Screen Menu (e.g., `(02) ABOUT US`, `(03) SERVICES`, `(06) CONTACT`), prevent default abrupt anchor jumping and fire `navigateToSection(targetId)`:
2. **Step 1 — Twin Cream Curtain Close (`0.0s – 0.25s`):**
   * Left and right `#F9F9F7` architectural panels snap shut from the outer edges toward the center (`x: -100% -> 0%` and `x: 100% -> 0%`, `power4.inOut`), meeting at a crisp **`1px solid #222222` vertical center spine** with a **`64px` thin circular ring** housing the Euro Star monogram at the exact viewport center (`50vw, 50vh`).
3. **Step 2 — Instant Background Scroll & Center-Line Split (`0.25s – 0.65s`):**
   * At `0.25s` (while the screen is cleanly covered for a single beat—zero loading spinner delay), Lenis/window jumps instantaneously (`immediate: true`) to the target section's exact scroll coordinate.
   * The center `1px` vertical line and monogram ring scale down (`scale(0.8)`, `opacity: 0`) while the left and right `#F9F9F7` panels part outward (`x: 0% -> -100%` and `x: 0% -> 100%`, `0.40s`, `expo.inOut`), revealing the target section already fully rendered and ready to interact with.
   * Total transition time: **650 milliseconds**—fast enough to feel instantaneous, dramatic enough to feel bespoke.

---

## 6. Initial Preloader: HUD Telemetry & Center-Aperture Expansion (`1.4s` Max)

Keep the initial site load fast and lightweight:
1. **Background Pre-Loading:** Mount the entire website and hero `<video>` (`preload="auto"`) actively underneath (`z-index: 1`) while the `#141414` HUD preloader sits on top (`z-index: 9999`), ensuring zero buffering flash and immediate Googlebot/LCP indexing.
2. **HUD Counter (`0.0s – 1.0s`):** Minimal `1px` corner brackets, edge telemetry (`[DXB — 25.2048° N]` / `[AJM — 55.5136° E]`), and a sleek `#C5A368` gold progress bar + tabular counter (`0% -> 100%`).
3. **Center-Aperture Unclip (`1.0s – 1.4s`):** At `100%`, the bar collapses into a vertical `1px` line that expands outward via `clip-path: inset(38% 36% 38% 36%) -> inset(0% 0% 0% 0%)` (`cubic-bezier(0.76, 0, 0.24, 1)`), revealing the live industrial video montage underneath. Bypass on repeat visits via `sessionStorage.setItem('eurostar_visited', 'true')`.

---

## 7. New Swiss Grid Hero Section & Readability Engineering

Architect the Hero section (`100svh` height) to showcase the 6-shot industrial montage (`Dubai Sunrise → Lever Torque → Technical Drafting → TIG Welding → Grinding Sparks → Dusk Horizon`) with guaranteed **WCAG AAA text readability**:

### A. Responsive Device-Matched Video Delivery (Zero Double-Download)
Mount only **one** `<video>` element based on viewport breakpoint (`matchMedia`):
* **Desktop (`>= 1024px`):** `/videos/eurostar-hero-desktop.mp4` (`16:9`) + `poster="/images/hero-poster-desktop.webp"`
* **Tablet (`768px – 1023px`):** `/videos/eurostar-hero-tablet.mp4` (`3:4`) + `poster="/images/hero-poster-tablet.webp"`
* **Mobile (`< 768px`):** `/videos/eurostar-hero-mobile.mp4` (`9:16`) + `poster="/images/hero-poster-mobile.webp"`
* Required attributes: `autoPlay loop muted playsInline preload="auto"` and `object-cover w-full h-full`.

### B. 3-Layer Readability Scrim System (Protects Text Over Bright Sparks)
Layer three GPU-composited gradients over the `<video>` (no CSS filters on the video tag itself):
1. **Top Header Protection:** `linear-gradient(180deg, rgba(18,18,18,0.72) 0%, rgba(18,18,18,0) 24%)`
2. **Bottom-Left Editorial Anchor Scrim:** `radial-gradient(circle at 15% 85%, rgba(18,18,18,0.85) 0%, rgba(18,18,18,0.38) 48%, rgba(18,18,18,0.15) 100%)`
3. **Subtle Edge Vignette:** `inset 0 0 120px rgba(0,0,0,0.45)`

### C. Asymmetric 12-Column Swiss Grid Hero Layout
Overlay a non-blocking (`pointer-events-none`) **6-column (`lg:grid-cols-6`) / 2-column (`grid-cols-2` mobile)** `1px` hairline grid (`border-r border-[#F9F9F7]/12`) over the video:
* **Top Metadata Strip (Below Header):** 3-point monospace telemetry bar:
  * Left: `[EST. 2010 — DUBAI & AJMAN, UAE]`
  * Center: `[ISO 9001:2015 CERTIFIED ENGINEERING]`
  * Right: `[00 — INDUSTRIAL & MEP SOLUTIONS]` (in `#C5A368`)
* **Bottom-Left Architectural Headline Block (Cols 1–4):**
  * Eyebrow (`#C5A368`): `PRECISION ELECTROMECHANICAL & STEEL FABRICATION`
  * Main `<h1>` (using existing site display font, `#F9F9F7`, `clamp(2.75rem, 6.2vw, 6.5rem)`):
    > **FORGING**  
    > *INDUSTRIAL* **SCALE** *(with "INDUSTRIAL" accented in `#C5A368`)*
* **Bottom-Right Architectural CTA Cell (Cols 5–6, Framed by `1px` Top & Left Hairline Borders):**
  * Concise 2-line value statement in `#F9F9F7/85` + a sharp rectangular CTA button (`EXPLORE CAPABILITIES →`) with a magnetic hover fill (`#C5A368` background wipe).

---

## 8. Modern Awwwards Scroll Transitions (GSAP ScrollTrigger + Lenis)

Implement **Lenis** (`duration: 1.0`, `smoothWheel: true`) + **GSAP ScrollTrigger** using strictly GPU-composited properties (`transform`, `opacity`, `clip-path`) without altering below-the-fold layouts or fonts:

1. **Hero-to-About Sticky Curtain Parallax Overlap:**
   * Pin the Hero section (`position: sticky; top: 0; z-index: 1`) while the **About / Next Section** (`position: relative; z-index: 2; background: #F9F9F7`) glides smoothly upward over the Hero like a heavy architectural sheet.
   * Scrub the Hero video container slightly downward (`yPercent: 12`), subtly scale it (`scale: 1.06`), and darken a top scrim (`opacity: 0 -> 0.55`) as the About section overlaps (`scrub: true`).
2. **Architectural `1px` Hairline Wipe & Masked Text Stagger:**
   * At each section boundary, animate `1px` horizontal rules (`scaleX: 0 -> 1`, `transformOrigin: "left center"`, `duration: 0.75`, `ease: "power3.out"`) paired with overflow-hidden upward text reveals (`yPercent: 105 -> 0`) on section titles and `[01]`–`[04]` indices.
3. **Industrial Image Gallery Velocity Parallax & Aperture Unclip:**
   * Keep the existing 3-image industrial showcase layout intact, revealing each image container via `clip-path: inset(14% 0% 14% 0%) -> inset(0% 0% 0% 0%)` paired with an internal image counter-scale (`scale: 1.12 -> 1.0`).

---

## 9. UI/UX Accessibility, Technical SEO & Google Preview Validation

Ensure the new navigation drawer, transitions, and animations adhere strictly to WCAG 2.1 AA accessibility, Google Search indexing, and user retention best practices:

1. **WCAG 2.1 AA Keyboard & Screen-Reader Accessibility:**
   * **Hamburger Button:** Use semantic `<button type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="split-nav-drawer">`. Toggle `aria-expanded="true"` when open.
   * **Focus Trap & `Escape` Key Support:** When the Split-Screen Menu is open, trap keyboard `Tab` focus inside the drawer, auto-focus the `CLOSE [✕]` button, lock `document.body.style.overflow = 'hidden'`, and close immediately when the user presses **`Escape`**.
   * **Reduced Motion Compliance (`prefers-reduced-motion`):** Wrap GSAP ScrollTrigger and Split-Curtain animations in `gsap.matchMedia()`. When `(prefers-reduced-motion: reduce)` is detected, disable parallax/curtain movement and execute instant `0.15s` opacity fades.
2. **Semantic HTML & Crawler-Safe Indexing (Zero SEO Penalty):**
   * Keep standard semantic `<nav aria-label="Primary">` links in the DOM at all times (with `aria-hidden="true"` only while visually closed, never `display: none` before hydration) so Googlebot discovers all internal section links (`#about`, `#services`, `#fabrication`, `#contact`) effortlessly.
   * Include a `<noscript>` fallback style rule forcing `opacity: 1 !important; transform: none !important; clip-path: none !important;` when JavaScript is disabled.
3. **Complete Google Search & Open Graph Metadata (`<head>`):**
   * **`<title>`:** `Euro Star Electromechanical | Precision Steel Fabrication, Welding & MEP in UAE`
   * **`<meta name="description">`:** `ISO-certified electromechanical, structural steel fabrication, TIG/arc welding, and skilled manpower solutions in Dubai & Ajman, UAE. Request an engineering consultation.`
   * **`<link rel="canonical" href="https://eurostaremc.com/" />`**
   * **Open Graph & Twitter Cards (WhatsApp / LinkedIn / Google Preview):**
     * `og:type="website"`, `og:site_name="Euro Star Electromechanical"`, `og:url="https://eurostaremc.com/"`
     * `og:title="Euro Star Electromechanical — Industrial & Steel Fabrication UAE"`
     * `og:description="Precision welding, electromechanical contracting, and certified industrial manpower across Dubai, Ajman, and the UAE."`
     * `og:image="https://eurostaremc.com/images/og-preview-1200x630.jpg"`
     * `twitter:card="summary_large_image"`
4. **JSON-LD LocalBusiness / Engineering Schema (`application/ld+json`):**
   * Embed structured schema markup for **Euro Star Electromechanical** (`@type: ["LocalBusiness", "ProfessionalService"]`, `telephone: ["+971503860061", "+971509142430"]`, `email: "info@eurostaremc.com"`, `address: "Jurf Plaza, Room no 602, Rashidiya 1, Ajman, UAE"`).