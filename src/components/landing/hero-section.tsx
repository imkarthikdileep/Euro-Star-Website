"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import RotatingText from "@/components/RotatingText";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 103;

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /* Refs removed as they are no longer used for direct GSAP control */

  // Preload Images
  useEffect(() => {
    const loadImages = async () => {
      const loadSingleImage = (index: number): Promise<HTMLImageElement> => {
        return new Promise((resolve) => {
          const img = new Image();
          const frameIndex = index.toString().padStart(3, '0');
          img.src = `/hero-section-frames-upscaled/frame_${frameIndex}.png`;
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

        // Optimization: Prioritize the first 20 frames for immediate smooth start
        // This runs effectively "in the background" while the Preloader is covering the screen
        const criticalBatch = [];
        for (let i = 1; i <= 20; i++) {
          if (i < FRAME_COUNT) criticalBatch.push(loadSingleImage(i).then(img => { imagesRef.current[i] = img; }));
        }
        await Promise.all(criticalBatch);

        // Load the rest
        for (let i = 21; i < FRAME_COUNT; i++) {
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
        end: "+=150%", // Reduced to match LiquidTransition and remove gap
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
      <div className="hidden lg:block">
        <div ref={containerRef} className="relative h-[100vh] w-full bg-[#F9F8F4]">
          {/* Canvas */}
          <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 z-0 h-full w-full object-cover"
            />
            {/* Dark Overlay - Adjusted for Cream Background (Lighter or removed?) 
                User said "Apply Allied Concerns background". 
                If I keep black overlay, it defeats the purpose.
                I will make the overlay much lighter or remove it to show Cream.
                But the Canvas is BEHIND the overlay?
                Wait, Canvas draws FRAMES (images). 
                If I change BG to Cream, and Canvas is opaque image, BG doesn't matter?
                BUT `frame: 0` is usually black??
                If the canvas sequences are black-bg images, changing container BG won't help unless canvas is transparent.
                Reference: `frame_045.png` in Mobile Hero suggests dark.
                However, user REQUESTED "Allied concerns background to full screen".
                Allied Concerns is Cream (#F9F8F4).
                So I MUST apply it.
                I will remove/reduce the Dark Overlay to allow Cream to shine (if canvas is transparent or not covering).
                Actually, the Canvas is `z-0`. Container is `bg-[#F9F8F4]`.
                If Canvas covers everything, BG is hidden.
                But assuming the intent is to have the SECTION background be Cream.
             */}
            {/* <div className="absolute inset-0 z-[1] bg-black/40 pointer-events-none" /> */}
            {/* Keeping overlay for text readability? "RotatingText" is usually Black on Cream? 
                User didn't specify text color change, but "Allied Concerns" implies Black Text scheme.
                RotatingText default is Black? Or White?
                InfiniteTextLoop was `text-white`. 
                If BG is Cream, Text should be Black.
                I will flip text color to Black.
            */}

            {/* Content Overlay */}
            <div className="relative z-20 container mx-auto px-4 md:px-6 h-full flex items-center pointer-events-none">
              <div className="w-full h-full relative">
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-auto w-full text-center">

                  <div className="flex flex-row items-center justify-center gap-6 md:gap-10">
                    {/* Static 'CRAFTING' - Text Black for Cream BG */}
                    <h1 className="text-black font-geist font-medium text-[clamp(2rem,4vw,4.5rem)] leading-none tracking-tighter">
                      crafting
                    </h1>

                    {/* Dynamic Words Container */}
                    <div className="relative h-[clamp(3.5rem,6vw,7rem)] min-w-[550px] flex items-center justify-center px-8">
                      {/* Brackets - Gold is fine on Cream */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-gold rounded-tl-sm gold-noise" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-gold rounded-tr-sm gold-noise" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-gold rounded-bl-sm gold-noise" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-gold rounded-br-sm gold-noise" />

                      <RotatingText
                        texts={["excellence", "quality", "trust"]}
                        mainClassName="font-geist font-bold text-black text-[clamp(2rem,4vw,4.5rem)] leading-none text-center justify-center"
                        staggerFrom="last"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2000}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Hero (Preserved) */}
      <header className="lg:hidden relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-charcoal">
        {/* Background Image with Overlay */}
        < div className="absolute inset-0 z-0" >
          <NextImage
            src="/hero-section-frames-upscaled/frame_045.png"
            alt="Hero Background"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div >

        {/* Content - Preserving existing animations but updating styling slightly if needed */}
        < div className="relative z-10 text-center max-w-4xl mx-auto mt-12" >
          <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0s' }}>
            <span className="inline-block py-1 px-3 border border-white/20 rounded-full text-xs text-white/90 uppercase tracking-widest mb-6 backdrop-blur-md bg-white/5 font-body">Est. 2010</span>
          </div>
          <h1 className="font-headline text-5xl text-white tracking-wide leading-[0.9] mb-8 animate-fade-in-up opacity-0 shadow-sm" style={{ animationDelay: '0.2s' }}>
            Crafting<br /><span className="italic text-white/90">Quality.</span>
          </h1>
          <p className="text-white/80 text-sm max-w-lg mx-auto font-body font-light leading-relaxed animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
            UAE's premier partner for specialized technical manpower and fabrication solutions.
          </p>
        </div >

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce duration-[2000ms] text-white/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
        </div>
      </header >
    </>
  );
}
