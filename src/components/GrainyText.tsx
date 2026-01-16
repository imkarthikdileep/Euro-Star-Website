"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GrainyTextProps {
    text: string;
    className?: string;
    color?: string; // Optional custom color, otherwise inherits or uses className
}

export default function GrainyText({ text, className, color }: GrainyTextProps) {
    // Unique ID for the filter to avoid conflicts if multiple distinct filters were needed (though we can reuse one globally usually, scoping it is safer)
    // Using a static ID for simplicity as the filter is generic.
    const filterId = "grainy-noise-filter";

    return (
        <span className={cn("relative inline-block", className)} style={{ color }}>
            {/* The Text */}
            <span className="relative z-10" style={{ filter: `url(#${filterId})` }}>
                {text}
            </span>

            {/* The Filter Definition (Hidden) - We put it here to ensure it's available. 
          Ideally, this should be in a global layout, but self-contained is easier for drop-in. 
          We use absolute positioning to hide it from flow. */}
            <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
                <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
                    {/* Generate noise */}
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="1.5"
                        numOctaves="3"
                        result="noise"
                    />
                    {/* Mask noise with source alpha (the text shape) */}
                    <feComposite
                        operator="in"
                        in="noise"
                        in2="SourceGraphic"
                        result="maskedNoise"
                    />
                    {/* Combine noise with the source color */}
                    {/* We want the noise to affect the texture. 
              One way: Multiply or Overlay interaction. 
              Or verify simple displacement.
              
              Let's try a displacement map for 'grainy edges' + texture 
              OR just simple Arithmetic composite to blend noise brightness.
          */}
                    <feColorMatrix type="saturate" values="0" in="maskedNoise" result="desaturatedNoise" />

                    <feBlend mode="overlay" in="desaturatedNoise" in2="SourceGraphic" result="grainyText" />

                </filter>
            </svg>
        </span>
    );
}

// Actually, a better approach for the "Holographic/Grainy" look from the image might be using an feDisplacementMap or simply adding noise on top.
// Let's refine the filter to match the "grainy" aesthetic usually requested (rougher texture).
/*
    <filter id="grainy-text">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        <feComposite operator="in" in2="SourceGraphic" result="noise"/>
        <feBlend mode="multiply" in="noise" in2="SourceGraphic" />
    </filter>
*/
