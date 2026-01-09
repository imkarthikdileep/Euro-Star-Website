"use client";

import { useScroll, useTransform, useSpring, motion, useAnimationFrame } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";

const FRAME_COUNT = 103;

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
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
      // Check for return visitor cookie
      const isReturnVisitor = document.cookie.includes('hero_assets_cached=true');

      const loadedImages: HTMLImageElement[] = [];
      const promises: Promise<void>[] = [];

      for (let i = 0; i < FRAME_COUNT; i++) {
        const promise = new Promise<void>((resolve) => {
          const img = new Image();
          const frameIndex = i.toString().padStart(3, '0');
          img.src = `/Hero-section-frames/frame_${frameIndex}.png`;

          // If return visitor, we expect cache hit, so we might not need heavy decoding checks blocking UI
          img.onload = async () => {
            try {
              await img.decode();
            } catch (e) {
              // Ignore decode errors
            }
            loadedImages[i] = img;
            resolve();
          };

          img.onerror = () => {
            console.error(`Failed to load frame ${i}`);
            resolve();
          };
        });
        promises.push(promise);
      }

      await Promise.all(promises);
      setImages(loadedImages);
      setIsLoaded(true);

      // Set cookie to remember assets are cached (7 days)
      document.cookie = "hero_assets_cached=true; path=/; max-age=" + (60 * 60 * 24 * 7);
    };

    loadImages();
  }, []);

  // Render Canvas using Framer Motion's rAF loop
  const lastFrameIndex = useRef<number>(-1);

  useAnimationFrame(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isLoaded || images.length === 0) return;

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
    lastFrameIndex.current = frameIndex;

    const img = images[frameIndex];
    if (!img) return;

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
    <div ref={containerRef} className="relative h-[400vh] w-full bg-background">
      {/* Sticky Content Container */}
      <motion.div
        style={{ opacity }}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center"
      >
        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        {/* Dark Overlay for Text Legibility */}
        <div className="absolute inset-0 z-[1] bg-black/40 pointer-events-none" />

        {/* Loading Indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 z-[2] flex items-center justify-center bg-background text-foreground">
            <span className="animate-pulse text-lg font-mono">Loading Sequence...</span>
          </div>
        )}

        {/* Content Overlay */}
        <div className="relative z-20 container mx-auto px-4 md:px-6 h-full flex items-center pointer-events-none">
          <div className="w-full h-full relative">
            <div className="absolute top-[35%] left-0 right-0 z-20 flex flex-col items-center justify-center pointer-events-auto w-full text-center">
              {/* PRECISION - Outline + Gradient */}
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                blurStrength={10}
                baseRotation={5}
                rotationEnd="top center"
                wordAnimationEnd="bottom center"
                textClassName="text-gradient-cyan stroke-text-glow font-sans font-black text-[clamp(2.5rem,6vw,6rem)] leading-[0.9] tracking-tighter"
              >
                CRAFTING
              </ScrollReveal>

              {/* IN FABRICATION - Solid Navy */}
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                blurStrength={10}
                baseRotation={5}
                rotationEnd="top center"
                wordAnimationEnd="bottom center"
                textClassName="text-[#0a192f] font-sans font-black text-[clamp(2.5rem,6vw,6rem)] leading-[0.9] tracking-tighter mt-0"
              >
                QUALITY.
              </ScrollReveal>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
