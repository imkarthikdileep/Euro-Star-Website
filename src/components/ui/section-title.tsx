"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    textSize = "text-6xl md:text-7xl"
}: SectionTitleProps) {
    return (
        <div className={cn("relative flex flex-col mb-12",
            align === "center" && "items-center",
            align === "right" && "items-end",
            align === "left" && "items-start",
            className
        )}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="relative z-10 flex flex-wrap gap-x-4 items-baseline leading-tight select-none"
            >
                {/* Layer 1: Outline Text (First Word) */}
                <span
                    className={cn("font-extrabold font-lexend text-transparent uppercase tracking-tight", textSize)}
                    style={{ WebkitTextStroke: "2px #1e293b" }}
                >
                    {text}
                </span>

                {/* Layer 2: Solid Text (Second Word) */}
                {secondaryText && (
                    <span className={cn("font-extrabold font-lexend text-slate-900 uppercase tracking-tight", textSize)}>
                        {secondaryText}
                    </span>
                )}
            </motion.div>
        </div>
    );
}
