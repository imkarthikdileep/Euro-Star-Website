"use client";

import { cn } from "@/lib/utils";
import ScrollFloat from "@/components/ScrollFloat";

interface SectionTitleProps {
    text: string;
    secondaryText?: string;
    className?: string;
    align?: "left" | "center" | "right";
    textSize?: string;
}

export function SectionTitle({
    text,
    secondaryText,
    className,
    align = "center",
    textSize = "text-7xl md:text-8xl"
}: SectionTitleProps) {
    return (
        <div className={cn("relative flex flex-col mb-12 w-full",
            // Mobile: Always left align. Desktop: Respect align prop.
            "items-start text-left",
            align === "center" && "md:items-center md:text-center",
            align === "right" && "md:items-end md:text-right",
            align === "left" && "md:items-start md:text-left",
            className
        )}>
            <div className={cn(
                "relative z-10 flex flex-col md:flex-row gap-0 md:gap-x-4 items-start md:items-baseline leading-[0.8] select-none",
                // Mobile: No center justify. Desktop: Center if desired.
                align === "center" ? "md:justify-center" : ""
            )}>
                {/* Layer 1: Outline Text (First Word) */}
                <ScrollFloat
                    animationDuration={2.5}
                    ease="back.inOut(2)"
                    scrollStart="center bottom+=50%"
                    scrollEnd="bottom bottom-=40%"
                    stagger={0.03}
                    containerClassName="my-0 inline-block text-left"
                    textClassName={cn(
                        "font-extrabold font-lexend text-transparent uppercase tracking-tight [-webkit-text-stroke:2px_#1e293b] leading-[0.8]",
                        textSize
                    )}
                >
                    {text}
                </ScrollFloat>

                {/* Layer 2: Solid Text (Second Word) */}
                {secondaryText && (
                    <ScrollFloat
                        animationDuration={2.5}
                        ease="back.inOut(2)"
                        scrollStart="center bottom+=50%"
                        scrollEnd="bottom bottom-=40%"
                        stagger={0.03}
                        containerClassName="my-0 inline-block text-left"
                        textClassName={cn(
                            "font-extrabold font-lexend text-slate-900 uppercase tracking-tight leading-[0.8]",
                            textSize
                        )}
                    >
                        {secondaryText}
                    </ScrollFloat>
                )}
            </div>
        </div>
    );
}
