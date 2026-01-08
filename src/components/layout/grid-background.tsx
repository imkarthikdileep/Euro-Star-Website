"use client";

import { motion } from "framer-motion";

export function GridBackground() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed inset-0 -z-50 pointer-events-none bg-[#F3F5F1]"
            style={{
                backgroundImage: `
          linear-gradient(to right, #E6E9E1 1px, transparent 1px),
          linear-gradient(to bottom, #E6E9E1 1px, transparent 1px)
        `,
                backgroundSize: "40px 40px",
                opacity: 0.5,
            }}
        />
    );
}
