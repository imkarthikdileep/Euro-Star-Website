# Euro Star Electromechanical - Corporate Website

A premium, high-performance corporate website for **Euro Star Electromechanical**, designed with a focus on modern aesthetic, refractive glass effects, and seamless motion.

![Euro Star Banner](/public/hero-image.png)

## 🌟 Key Features

### 1. Liquid Magnification Glass Design
The core visual signature of the site is the custom **`GlassSurface`** component.
-   **Breathing Effect**: Glass panels in the *About*, *Services*, and *Stats* sections utilize a custom animation loop that oscillates distortion (`20` to `100`) and chromatic aberration.
-   **3D Convex Lens**: Simulates a viscous, heavy liquid lens that magnifies the content behind it.
-   **Content Breathing**: Text and icons inside the glass subtly scale (`1.0` to `1.02`) in sync with the distortion for a unified "swelling" illusion.
-   **Performance**: Uses direct DOM manipulation (`ref.setAttribute`) to bypass React render cycles for 60fps performance.
-   **Mobile Optimization**: Automatically detects mobile devices and disables the heavy SVG filters, falling back to a native CSS `backdrop-filter`.

### 2. "Liquid Titanium" Typography
Inspired by premium industrial design (Apple-style).
-   **Font**: *Inter* ExtraBold (800).
-   **Tracking**: Tight letter-spacing (`-0.03em`) for a solid, machined feel.
-   **Gradient**: Metallic `bg-gradient-to-b` (Slate-600 → Black) with a `mix-blend-overlay` texture layer.
-   **Micro-Interaction**: Subtly brightens on hover to simulate light reflecting off metal.
-   **Applied To**: Header Logo, Mobile Menu, Footer Logo.

### 3. "Dark Island" UI Architecture
Sections are structured using floating "Dark Island" containers.
-   **Background**: Deep Navy (`#0A192F`).
-   **Texture**: Subtle grid pattern overlay with a hover-zoom effect on desktop (`md:group-hover:scale-110`).
-   **Border**: Fine `white/10` ring for definition.

### 4. Advanced Animations
-   **Hero Section**: High-performance Canvas rendering for an image sequence scroll animation. Optimized to only redraw on frame changes.
-   **Scroll Revelations**: Slow, elegant fade-ins (3s duration) for text and cards.
-   **Clients Marquee**: Infinite scroll CSS animation with pause-on-hover.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Motion**: [Framer Motion](https://www.framer.com/motion/) + Native CSS
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Language**: TypeScript

## 🚀 Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## 📱 Mobile Optimization Strategy
The site employs a strict "Graceful Degradation" strategy for mobile:
1.  **Hero Section**: Uses `100dvh` to account for dynamic browser toolbars.
2.  **Glass Effects**: SVG filters are disabled on mobile to conserve battery and CPU.
3.  **Hover States**: Hover-dependent scaling (e.g., background grids) is restricted to `md:` (desktop) breakpoints to prevent "sticky" tap states on touch screens.

---
&copy; 2026 Euro Star Electromechanical. All Rights Reserved.
