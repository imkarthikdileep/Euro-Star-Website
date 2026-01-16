"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-16 h-8 rounded-full bg-white/10 border border-white/20" />
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-16 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner hover:bg-white/20 transition-colors focus:outline-none group overflow-hidden"
            aria-label="Toggle Theme"
        >
            {/* Background Gradient for Active State */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20"
                initial={false}
                animate={{
                    opacity: isDark ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Sliding Knob */}
            <motion.div
                className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center z-10"
                initial={false}
                animate={{
                    x: isDark ? 32 : 0,
                    backgroundColor: isDark ? "#1e293b" : "#ffffff", // Slate-800 vs White
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                }}
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Sun Icon */}
                    <motion.div
                        className="absolute text-orange-500"
                        initial={false}
                        animate={{
                            scale: isDark ? 0 : 1,
                            opacity: isDark ? 0 : 1,
                            rotate: isDark ? 90 : 0
                        }}
                    >
                        <Sun size={14} fill="currentColor" className="stroke-[2.5]" />
                    </motion.div>

                    {/* Moon Icon */}
                    <motion.div
                        className="absolute text-indigo-400"
                        initial={false}
                        animate={{
                            scale: isDark ? 1 : 0,
                            opacity: isDark ? 1 : 0,
                            rotate: isDark ? 0 : -90
                        }}
                    >
                        <Moon size={14} fill="currentColor" className="stroke-[2.5]" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Background Icons (Static hints) */}
            <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
                <Sun size={12} className="text-white/20 ml-1.5" />
                <Moon size={12} className="text-white/20 mr-1.5" />
            </div>

        </button>
    );
}
