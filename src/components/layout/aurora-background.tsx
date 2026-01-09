"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
    return (
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-white">
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
                <div
                    className="absolute top-[20%] left-[20%] w-[40vw] h-[40vh] bg-[#FFFFFF] blur-[120px] rounded-full opacity-80"
                />

                {/* Light Green Blob */}
                <div
                    className="absolute top-[30%] right-[30%] w-[35vw] h-[35vh] bg-[#DCFCE7] blur-[100px] rounded-full opacity-80"
                />

                {/* Very Light Green/White Blob */}
                <div
                    className="absolute bottom-[20%] left-[40%] w-[50vw] h-[40vh] bg-[#F0FDF4] blur-[130px] rounded-full opacity-90"
                />
            </motion.div>
        </div>
    );
}
