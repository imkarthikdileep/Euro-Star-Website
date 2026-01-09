# Euro Star Electromechanical - Corporate Website

A premium, high-performance corporate website for **Euro Star Electromechanical**, designed with a focus on modern aesthetic, refractive glass effects, and seamless motion.

![Euro Star Banner](/public/logo.png)

## 🌟 Key Features

### 1. Liquid Magnification Glass Design
The core visual signature of the site is the custom **`GlassSurface`** component.
-   **Breathing Effect**: Glass panels in the *About*, *Services*, and *Stats* sections utilize a custom animation loop that oscillates distortion (`20` to `100`) and chromatic aberration.
-   **3D Convex Lens**: Simulates a viscous, heavy liquid lens that magnifies the content behind it.
-   **Content Breathing**: Text and icons inside the glass subtly scale (`1.0` to `1.02`) in sync with the distortion for a unified "swelling" illusion.
-   **Performance**: Uses direct DOM manipulation (`ref.setAttribute`) to bypass React render cycles for 60fps performance.
-   **Mobile Optimization**: Automatically detects mobile devices and disables the heavy SVG filters, falling back to a native CSS `backdrop-filter`.

### 2. Spotlight Service Cards
The **Services Section** features interactive `SpotlightCard` components.
-   **Dynamic Spotlight**: A cursor-following spotlight effect that reveals a subtle gradient on hover.
-   **Custom Colors**: Configured with a teal-tinted spotlight (`rgba(13, 148, 136, 0.3)`) to match the brand identity.
-   **Glass Integration**: Customized to override default dark backgrounds, maintaining the site's signature "Glass UI" aesthetic with transparency and blur.

### 3. "Liquid Titanium" Typography
Inspired by premium industrial design (Apple-style).
-   **Font**: *Inter* ExtraBold (800) for UI elements, *Lexend* for Section Titles.
-   **Tracking**: Tight letter-spacing (`-0.03em`) for a solid, machined feel.
-   **Styling**: Section titles use a unique dual-layer style with outline text (`WebkitTextStroke`) and solid text for depth.

### 4. Interactive Sister Concerns
The **Sister Concerns** section features advanced 3D flip cards.
-   **Physics-Based Tilt**: Cards utilize a custom physics engine for smooth, magnetic 3D tilt effects on mouse movement.
-   **Interactive Flip**: "View Details" button triggers a seamless 180-degree flip animation to reveal detailed company descriptions.
-   **Visuals**: High-fidelity logo containers with dedicated accent colors (Orange for General Trading, Teal for Technical Services).

### 5. Advanced Animations
-   **Hero Section**: High-performance Canvas rendering for an image sequence scroll animation. Optimized to only redraw on frame changes.
-   **Scroll Revelations**: Slow, elegant fade-ins (3s duration) for text and cards using Framer Motion.
-   **Clients Marquee**: Infinite scroll CSS animation with pause-on-hover.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: Custom Glass System, [Shadcn UI](https://ui.shadcn.com/)
-   **Motion**: [Framer Motion](https://www.framer.com/motion/) + Native CSS
-   **Effects**: `@react-bits/SpotlightCard`
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
