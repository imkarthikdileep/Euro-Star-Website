"use client";

import { useScroll, useTransform, useSpring, motion, useAnimationFrame } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";
import NextImage from "next/image";

const FRAME_COUNT = 103;

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Create a spring for smooth seeking - Tuned for "Heavy/Smooth" feel
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.5,      // Increased weight for momentum
    stiffness: 75,  // Reduced stiffness for softer follow
    damping: 30,    // Increased damping to prevent oscillation
    restDelta: 0.0001,
  });

  // Smooth opacity transition for the end of the hero section
  const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  // Preload Images
  useEffect(() => {
    const loadImages = async () => {
      // Helper to load a single image
      const loadSingleImage = (index: number): Promise<HTMLImageElement> => {
        return new Promise((resolve) => {
          const img = new Image();
          const frameIndex = index.toString().padStart(3, '0');
          img.src = `/Hero-section-frames/frame_${frameIndex}.png`;
          img.onload = () => resolve(img);
          img.onerror = () => {
            console.error(`Failed to load frame ${index}`);
            resolve(img); // Resolve anyway to proceed
          };
        });
      };

      try {
        // 1. Load the first frame immediately to unblock UI
        const firstImg = await loadSingleImage(0);
        imagesRef.current[0] = firstImg;
        setIsLoaded(true);

        // 2. Load the rest in the background
        const promises: Promise<void>[] = [];
        for (let i = 1; i < FRAME_COUNT; i++) {
          // We don't await these individually, nor do we await the whole batch before letting the user interact
          // We just fire them off and populate the ref as they come in.
          loadSingleImage(i).then(img => {
            imagesRef.current[i] = img;
          });
        }

        // Optional: We can still set the cookie, though it's less critical now that the internal logic is non-blocking
        document.cookie = "hero_assets_cached=true; path=/; max-age=" + (60 * 60 * 24 * 7);

      } catch (e) {
        console.error("Error in loading sequence", e);
        setIsLoaded(true); // Ensure UI unblocks even on error
      }
    };

    loadImages();
  }, []);

  // Render Canvas using Framer Motion's rAF loop
  const lastFrameIndex = useRef<number>(-1);

  useAnimationFrame(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isLoaded || imagesRef.current.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get current interpolated scroll value (0 to 1)
    // We render every frame to ensure smoothness, or we could check if value changed.
    const latest = smoothProgress.get();

    // Calculate frame index
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * (FRAME_COUNT - 1))
    );

    // Optimization: Only redraw if the frame has changed
    if (frameIndex === lastFrameIndex.current) {
      return;
    }

    const img = imagesRef.current[frameIndex];
    if (!img) return;

    lastFrameIndex.current = frameIndex;

    // Drawing logic (cover emulation) starts here
    // Optim: Check if canvas size matches window to avoid expensive resets mid-loop if possible, 
    // but resizing usually handled by separate listener.
    // For now, simpler to just calculate draw params.

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = img.width * (canvas.height / img.height);
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = img.height * (canvas.width / img.width);
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Optional if drawing full cover opaque image
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  });

  // Handle Resize separately to just update canvas dimensions
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[200vh] md:h-[400vh] w-full bg-black">
      {/* Sticky Content Container */}
      <motion.div
        className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center"
      >
        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        {/* Dark Overlay for Text Legibility */}
        <div className="absolute inset-0 z-[1] bg-black/40 pointer-events-none" />

        {/* First Frame Placeholder - Visible immediately, hidden when canvas takes over or just sits behind */}
        <div className={`absolute inset-0 z-0 h-full w-full bg-background ${isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
          <NextImage
            src="/Hero-section-frames/frame_000.png"
            alt="Hero Background"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-20 container mx-auto px-4 md:px-6 h-full flex items-center pointer-events-none">
          <div className="w-full h-full relative">
            <div className="absolute top-[35%] left-0 right-0 z-20 flex flex-col items-center justify-center pointer-events-auto w-full text-center">
              {/* CRAFTING - Solid Black */}
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                blurStrength={10}
                baseRotation={5}
                rotationEnd="top center"
                wordAnimationEnd="bottom center"
                textClassName="text-black font-sans font-black text-[clamp(2.5rem,6vw,6rem)] leading-[0.9] tracking-tighter"
              >
                CRAFTING
              </ScrollReveal>

              {/* EXCELLENCE. - Solid Black */}
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                blurStrength={10}
                baseRotation={5}
                rotationEnd="top center"
                wordAnimationEnd="bottom center"
                textClassName="text-black font-sans font-black text-[clamp(2.5rem,6vw,6rem)] leading-[0.9] tracking-tighter -mt-2 md:-mt-4"
              >
                EXCELLENCE.
              </ScrollReveal>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
