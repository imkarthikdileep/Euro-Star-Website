"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import GradualBlur from "@/components/GradualBlur";
import { useEffect, useState } from "react";

export function PageScrollBlur() {
    const { scrollY, scrollYProgress } = useScroll();
    const [viewportHeight, setViewportHeight] = useState(0);

    useEffect(() => {
        setViewportHeight(window.innerHeight);

        const handleResize = () => setViewportHeight(window.innerHeight);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Opacity Map:
    // 0 at < 40% of viewport height (still in hero)
    // 0 at 80% of viewport height
    // 1 at 120% of viewport height (fully past hero)
    const heroOpacity = useTransform(
        scrollY,
        [0, viewportHeight * 0.8, viewportHeight * 1.2],
        [0, 0, 1]
    );

    // Footer Fade Out:
    // 1 up to 90% of page scroll
    // 0 at 100% of page scroll (bottom)
    const footerOpacity = useTransform(
        scrollYProgress,
        [0.9, 1],
        [1, 0]
    );

    return (
        <motion.div
            style={{ opacity: heroOpacity }}
            className="fixed top-0 md:top-auto md:bottom-0 left-0 right-0 z-40 pointer-events-none"
        >
            <motion.div style={{ opacity: footerOpacity }}>
                <GradualBlur
                    preset="page-footer"
                    zIndex={40}
                    style={{ position: 'relative' }} // Override fixed from preset to let motion.div handle opacity/position
                />
            </motion.div>
        </motion.div>
    );
}
