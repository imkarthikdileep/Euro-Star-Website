"use client";

import { useRef } from "react";
import Link from "next/link";
import { VT323 } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const vt323 = VT323({ weight: "400", subsets: ["latin"] });

// 10x12 Grid for chunkier numbers
const number4 = [
    [0, 0, 0, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
    [1, 1, 0, 0, 1, 1, 0, 1, 1, 0],
    [1, 1, 0, 0, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
];

const number0 = [
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
];

// Simple 5x5 Pixel Characters
const charStar = [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
];

const charHelmet = [
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 1], // Feet
];

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null);
    const char1Ref = useRef<HTMLDivElement>(null);
    const char2Ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // 1. Animate In Pixels
        tl.fromTo(
            ".pixel-block",
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.05,
                stagger: {
                    amount: 1,
                    grid: "auto",
                    from: "random",
                },
                ease: "power1.inOut",
            }
        );

        // 2. Character Loops
        // Char 1: Walking on top of first 4
        gsap.to(char1Ref.current, {
            x: 60, // Move right
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "steps(10)", // Pixelated movement
            onRepeat: () => {
                // FLip logic could go here if we used scaleX: -1
            }
        });

        // Bounce effect for walk
        gsap.to(char1Ref.current, {
            y: -5,
            duration: 0.2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });


        // Char 2: Jumping inside the 0
        gsap.to(char2Ref.current, {
            y: -20,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "steps(4)",
        });

    }, { scope: containerRef });

    const renderGrid = (grid: number[][], keyPrefix: string) => {
        return (
            <div className="flex flex-col gap-1">
                {grid.map((row, y) => (
                    <div key={`${keyPrefix}-row-${y}`} className="flex gap-1">
                        {row.map((cell, x) => (
                            <div
                                key={`${keyPrefix}-cell-${x}`}
                                className={`w-3 h-3 md:w-4 md:h-4 ${cell ? "bg-[#F9F8F4] pixel-block" : "bg-transparent"
                                    }`}
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    const renderChar = (grid: number[][], color: string = "bg-[#222222]") => {
        return (
            <div className="flex flex-col gap-[2px]">
                {grid.map((row, i) => (
                    <div key={i} className="flex gap-[2px]">
                        {row.map((cell, j) => (
                            <div key={j} className={`w-[3px] h-[3px] md:w-[4px] md:h-[4px] ${cell ? color : 'bg-transparent'}`} />
                        ))}
                    </div>
                ))}
            </div>
        );
    };


    return (
        <div
            ref={containerRef}
            className={`h-screen w-screen bg-[#222222] flex flex-col items-center justify-center relative overflow-hidden ${vt323.className}`}
        >
            {/* Header */}
            <div className="absolute top-8 left-8">
                <span className="text-[#F9F8F4] text-2xl tracking-widest uppercase">
                    EURO STAR [404_SYS]
                </span>
            </div>

            {/* Main 404 Graphic */}
            <div className="relative flex items-center gap-4 md:gap-8 mb-12">
                {/* First 4 */}
                <div className="relative">
                    {renderGrid(number4, "4-1")}
                    {/* Character 1: Walking on top */}
                    <div ref={char1Ref} className="absolute -top-8 left-0">
                        {renderChar(charStar, "bg-[#C5A368]")} {/* Gold Star */}
                    </div>
                </div>

                {/* 0 */}
                <div className="relative">
                    {renderGrid(number0, "0")}
                    {/* Character 2: Jumping inside */}
                    <div ref={char2Ref} className="absolute bottom-4 left-1/2 -translate-x-1/2">
                        {renderChar(charHelmet, "bg-[#C5A368]")} {/* Gold Helmet */}
                    </div>
                </div>

                {/* Second 4 */}
                <div>{renderGrid(number4, "4-2")}</div>
            </div>

            {/* Error Label */}
            <div className="bg-[#F9F8F4] text-[#222222] px-4 py-1 rounded-sm mb-6">
                <span className="text-lg uppercase tracking-widest">Page Not Found</span>
            </div>

            {/* Main Message */}
            <h2 className="text-[#F9F8F4] font-playfair text-xl md:text-3xl font-light mb-12 tracking-wide text-center max-w-lg leading-relaxed">
                "This is not the page you are looking for."
            </h2>

            {/* Return Button */}
            <Link
                href="/"
                className="group relative px-8 py-3 border-2 border-[#F9F8F4] text-[#F9F8F4] text-xl tracking-widest uppercase hover:bg-[#F9F8F4] hover:text-[#222222] transition-colors duration-0"
            >
                <span className="relative z-10">Return Home &gt;</span>
                {/* Pixel Corner Decorations */}
                <div className="absolute -top-1 -left-1 w-1 h-1 bg-[#222222]" />
                <div className="absolute -top-1 -right-1 w-1 h-1 bg-[#222222]" />
                <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-[#222222]" />
                <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-[#222222]" />
            </Link>

            {/* Footer decorative noise or scanline could go here */}

        </div>
    );
}
