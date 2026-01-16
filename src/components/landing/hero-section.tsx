"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextType from "@/components/TextType";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 103;

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeWord, setActiveWord] = useState(0);

  /* Refs removed as they are no longer used for direct GSAP control */

  // Preload Images
  useEffect(() => {
    const loadImages = async () => {
      const loadSingleImage = (index: number): Promise<HTMLImageElement> => {
        return new Promise((resolve) => {
          const img = new Image();
          const frameIndex = index.toString().padStart(3, '0');
          img.src = `/Hero-section-frames/frame_${frameIndex}.png`;
          img.onload = () => resolve(img);
          img.onerror = () => {
            console.error(`Failed to load frame ${index}`);
            resolve(img);
          };
        });
      };

      try {
        const firstImg = await loadSingleImage(0);
        imagesRef.current[0] = firstImg;
        // Initial draw
        renderFrame(0);
        setIsLoaded(true);

        // Load distinct batches for performance
        const promises: Promise<void>[] = [];
        for (let i = 1; i < FRAME_COUNT; i++) {
          loadSingleImage(i).then(img => {
            imagesRef.current[i] = img;
          });
        }
      } catch (e) {
        console.error("Error in loading sequence", e);
        setIsLoaded(true);
      }
    };

    loadImages();
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img) return;

    // Drawing logic to cover
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useGSAP(() => {
    if (!isLoaded) return;

    // Timeline for both Canvas and Text
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // 300vh scroll distance
        pin: true,
        scrub: 0.5, // Smooth scrubbing
      }
    });

    // 1. Canvas Animation (0 to 1 duration)
    const obj = { frame: 0 };
    tl.to(obj, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      duration: 1,
      onUpdate: () => {
        renderFrame(Math.round(obj.frame));
      }
    }, 0);

  }, { scope: containerRef, dependencies: [isLoaded] });

  // Timed Animation for Text
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % 3);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle Resize
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
    <>
      <div className="hidden md:block">
        <div ref={containerRef} className="relative h-[100vh] w-full bg-black">
          {/* Canvas */}
          <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 z-0 h-full w-full object-cover"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 z-[1] bg-black/40 pointer-events-none" />

            {/* Content Overlay */}
            <div className="relative z-20 container mx-auto px-4 md:px-6 h-full flex items-center pointer-events-none">
              <div className="w-full h-full relative">
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-auto w-full text-center">

                  <div className="flex flex-row items-center justify-center gap-3 md:gap-5">
                    {/* Static 'CRAFTING' */}
                    <h1 className="text-black font-geist font-medium text-[clamp(2rem,4vw,4.5rem)] leading-none tracking-tighter">
                      crafting
                    </h1>

                    {/* Dynamic Words Container */}
                    <div className="relative h-[clamp(2rem,4vw,4.5rem)] min-w-[200px] flex items-center justify-start">
                      {/* EXCELLENCE */}
                      <div className="absolute inset-0 flex items-center justify-start">
                        <TextType
                          text="excellence."
                          typingSpeed={100}
                          startOnVisible={true}
                          showCursor={false}
                          className={cn(
                            "font-geist font-bold text-white text-[clamp(2rem,4vw,4.5rem)] leading-none",
                            "transition-all duration-500",
                            activeWord === 0 ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-90"
                          )}
                        />
                      </div>

                      {/* QUALITY */}
                      <div className="absolute inset-0 flex items-center justify-start">
                        <TextType
                          text="quality."
                          typingSpeed={100}
                          startOnVisible={true}
                          showCursor={false}
                          className={cn(
                            "font-geist font-bold text-white text-[clamp(2rem,4vw,4.5rem)] leading-none",
                            "transition-all duration-500",
                            activeWord === 1 ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-90"
                          )}
                        />
                      </div>

                      {/* TRUST */}
                      <div className="absolute inset-0 flex items-center justify-start">
                        <TextType
                          text="trust."
                          typingSpeed={100}
                          startOnVisible={true}
                          showCursor={false}
                          className={cn(
                            "font-geist font-bold text-white text-[clamp(2rem,4vw,4.5rem)] leading-none",
                            "transition-all duration-500",
                            activeWord === 2 ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-90"
                          )}
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Hero (Preserved) */}
      <header className="md:hidden relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-charcoal">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <NextImage
            src="/Hero-section-frames/frame_045.png"
            alt="Hero Background"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content - Preserving existing animations but updating styling slightly if needed */}
        <div className="relative z-10 text-center max-w-4xl mx-auto mt-12">
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0s' }}>
            <span className="inline-block py-1 px-3 border border-white/20 rounded-full text-xs text-white/90 uppercase tracking-widest mb-6 backdrop-blur-md bg-white/5 font-body">Est. 2010</span>
          </div>
          <h1 className="font-headline text-5xl text-white tracking-wide leading-[0.9] mb-8 animate-fade-in-up opacity-0 shadow-sm" style={{ animationDelay: '0.2s' }}>
            Crafting<br /><span className="italic text-white/90">Quality.</span>
          </h1>
          <p className="text-white/80 text-sm max-w-lg mx-auto font-body font-light leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
            UAE's premier partner for specialized technical manpower and fabrication solutions.
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce duration-[2000ms] text-white/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
        </div>
      </header>
    </>
  );
}
