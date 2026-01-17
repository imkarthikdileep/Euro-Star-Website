"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const wavePathRef = useRef<SVGPathElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const [complete, setComplete] = useState(false);

    useGSAP(() => {
        // Lock body scroll
        document.body.style.overflow = "hidden";

        // Master Timeline
        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = "";
                setComplete(true);
            },
        });

        const counterObj = { value: 0 };
        const DURATION = 5; // User requested 5s

        // 1. Horizontal Ripple (The Wave) - Infinite Loop
        // Path d is roughly 2000px wide. We move it -1000px and reset for seamless loop.
        gsap.to(wavePathRef.current, {
            x: -1000,
            duration: 2,
            ease: "linear",
            repeat: -1,
        });

        // 2. Vertical Rise (The Fill)
        // Sync Logic:
        // ViewBox Height: 400. Text centered. Font Size ~220px.
        // Approx Text Bounds: y=100 (top) to y=300 (bottom).
        // Wave Path defined with Top at y=0.
        // Start State (0%): Water Top at y=350 (Below Text).
        // End State (100%): Water Top at y=50 (Above Text).

        // Initial Position (Before Anim): y=350
        gsap.set(wavePathRef.current, { y: 350 });

        tl.to(wavePathRef.current, {
            y: 50,
            duration: DURATION,
            ease: "power1.inOut",
        }, 0);

        // 3. Counter Animation
        tl.to(counterObj, {
            value: 100,
            duration: DURATION,
            ease: "power1.inOut",
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.textContent = Math.round(counterObj.value).toString();
                }
            }
        }, 0);

        // 4. Exit Phase
        // Text Pulse
        tl.to("#euro-star-svg", {
            scale: 1.1,
            filter: "brightness(1.5)",
            duration: 0.2,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
        });

        // Curtain Reveal
        tl.to(containerRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "expo.inOut",
        });

    }, { scope: containerRef });

    if (complete) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#222222] h-screen w-screen cursor-none"
        >
            <div className="relative w-full max-w-7xl px-4 flex flex-col items-center justify-center">

                {/* SVG Container */}
                <svg
                    id="euro-star-svg"
                    viewBox="0 0 1200 400"
                    className="w-full h-auto overflow-visible font-playfair font-bold"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <defs>
                        {/* 
                          Wave Path: Wide shape. 
                          Top edge allows for ripples.
                          Defined with "Water Level" at y=0.
                          Deep block below to y=500.
                        */}
                        <clipPath id="waveClip">
                            <path
                                ref={wavePathRef}
                                className="wave-path"
                                d="M0,500 L3000,500 L3000,0 Q2850,-50 2700,0 T2400,0 T2100,0 T1800,0 T1500,0 T1200,0 T900,0 T600,0 T300,0 T0,0 Z"
                                fill="#FFFFFF"
                            />
                        </clipPath>
                    </defs>

                    {/* Layer 1: Base (Empty) */}
                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="text-[220px] tracking-tighter"
                        fill="#948F85"
                        fillOpacity="0.3"
                    >
                        EURO STAR
                    </text>

                    {/* Layer 2: Fill (New Color) - Masked by Wave */}
                    <text
                        x="50%"
                        y="50%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="text-[220px] tracking-tighter"
                        fill="#948F85"
                        clipPath="url(#waveClip)"
                    >
                        EURO STAR
                    </text>
                </svg>

                {/* Counter */}
                <div className="mt-8 flex items-baseline gap-2 font-sans font-medium">
                    <span className="text-white/40 text-sm tracking-widest uppercase">loading...</span>
                    <span ref={counterRef} className="text-[#948F85] text-xl tabular-nums">0</span>
                    <span className="text-[#948F85] text-xl">%</span>
                </div>

            </div>
        </div>
    );
}
