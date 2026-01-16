"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
    return (
        <div className="hidden md:block fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-white dark:bg-[#020617] transition-colors duration-500">
            {/* Flattened Aurora Container - Single GPU Layer */}
            <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{
                    opacity: 1,
                    rotate: 360,
                }}
                transition={{
                    duration: 150, // Ultra-slow rotation (2.5 minutes)
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute inset-[-50%] w-[200%] h-[200%] will-change-transform"
                style={{
                    transform: "translateZ(0)",
                    transformOrigin: "center center"
                }}
            >
                {/* White Blob */}
                {/* White Blob - Purple on Mobile - Dark Mode: Deep Violet */}
                <div
                    className="absolute top-[20%] left-[20%] w-[40vw] h-[40vh] bg-purple-300/40 md:bg-[#FFFFFF] dark:bg-violet-900/20 blur-[120px] rounded-full opacity-100 md:opacity-80"
                />

                {/* Light Green Blob - Stronger Green on Mobile - Dark Mode: Deep Indigo */}
                <div
                    className="absolute top-[30%] right-[30%] w-[35vw] h-[35vh] bg-green-300/40 md:bg-[#DCFCE7] dark:bg-indigo-900/20 blur-[100px] rounded-full opacity-100 md:opacity-80"
                />

                {/* Very Light Green/White Blob - Purple/Blue on Mobile - Dark Mode: Deep Blue */}
                <div
                    className="absolute bottom-[20%] left-[40%] w-[50vw] h-[40vh] bg-purple-200/40 md:bg-[#F0FDF4] dark:bg-blue-900/20 blur-[130px] rounded-full opacity-100 md:opacity-90"
                />
            </motion.div>
        </div>
    );
}
