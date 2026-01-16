"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Search } from "lucide-react";

// --- Types ---
export interface MaiMenuItem {
    label: string;
    link: string;
}

export interface MaiMenuSocialItem {
    label: string;
    link: string;
}

export interface MaiMenuProps {
    items?: MaiMenuItem[];
    socialItems?: MaiMenuSocialItem[]; // Kept for flexibility, though we might hardcode the specific MAI list
}

// --- Animation Variants ---

// 1. Hamburger to X Animation (Main Toggle)
const topLineVariants: Variants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: 45, translateY: 6 },
};

const bottomLineVariants: Variants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: -45, translateY: -6 },
};

// 2. Overlay Curtain Reveal (Clip Path)
const overlayVariants: Variants = {
    closed: {
        clipPath: "inset(0 0 100% 0)",
        transition: {
            duration: 0.5,
            ease: [0.32, 0.72, 0, 1],
        }
    },
    open: {
        clipPath: "inset(0 0 0% 0)",
        transition: {
            duration: 0.5,
            ease: [0.32, 0.72, 0, 1],
        },
    },
    exit: {
        clipPath: "inset(0 0 100% 0)",
        transition: {
            duration: 0.4,
            ease: [0.32, 0.72, 0, 1],
        },
    },
};

// 3. Staggered Menu Items
const containerVariants: Variants = {
    open: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.2,
        },
    },
    closed: {},
};

const itemVariants: Variants = {
    closed: { opacity: 0, y: 20 },
    open: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

const MaiMenu: React.FC<MaiMenuProps> = ({ items = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    // Portal Content
    const portalContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={overlayVariants}
                    initial="closed"
                    animate="open"
                    exit="exit"
                    className="fixed inset-0 z-[100] w-screen h-screen bg-[#1c1c1a] flex flex-col font-sans text-[#F9F8F4]"
                >
                    {/* Header inside Overlay */}
                    <div className="flex items-center justify-between px-6 py-6 border-b border-white/5 relative z-[120]">
                        {/* Left: Close Button (Replacing Search) */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-[#F9F8F4] hover:text-white transition-colors opacity-80 hover:opacity-100"
                        >
                            <span className="sr-only">Close</span>
                            {/* Using X icon explicitly */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                        </button>

                        {/* Center: Logo */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <span className="font-headline text-2xl md:text-3xl tracking-tight leading-none text-[#F9F8F4] select-none text-center block">
                                Euro Star
                            </span>
                        </div>

                        {/* Right: Placeholder to balance layout */}
                        <div className="w-6 h-6" />
                    </div>

                    {/* Menu Content */}
                    <div className="flex-1 flex flex-col px-8 md:px-12 pt-16 md:pt-24 pb-12 overflow-y-auto custom-scrollbar">
                        {/* Main Links */}
                        <motion.nav
                            variants={containerVariants}
                            initial="closed"
                            animate="open"
                            className="flex flex-col gap-2 md:gap-4 mb-auto"
                        >
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'About Us', href: '#about' }, // Fixed Anchor
                                { label: 'Services', href: '#services' },
                                { label: 'Clients', href: '#clients' }, // Fixed Anchor
                                { label: 'Allied Concerns', href: '#sister-concerns' }, // Fixed Anchor
                                { label: 'Contact', href: '#contact' }
                            ].map((item, index) => (
                                <motion.div key={index} variants={itemVariants}>
                                    <Link
                                        href={item.href}
                                        className="font-serif text-[3rem] md:text-[4.5rem] leading-none text-[#C5A368] hover:text-[#E5D3B3] transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.nav>

                        {/* Footer Grid */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="flex flex-col gap-3 text-sm font-mono text-[#F9F8F4]/70 mt-12"
                        >
                            <Link href="/privacy-policy" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Privacy & Cookies</Link>
                            <Link href="/terms-conditions" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Terms</Link>
                        </motion.div>

                        {/* Accessibility Toggle */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="mt-10"
                        >
                            <div className="inline-flex items-center gap-3 bg-white/5 rounded-full px-4 py-2 hover:bg-white/10 transition-colors cursor-pointer">
                                <span className="text-xs font-mono uppercase tracking-wide text-[#F9F8F4]/50">Off</span>
                                <span className="text-xs font-mono text-[#F9F8F4]/90">Accessibility Mode</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            {/* --- Toggle Button (Fixed on Navbar) --- */}
            <button
                onClick={toggleMenu}
                className="relative z-[150] flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus:outline-none pointer-events-auto mix-blend-difference"
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
                <motion.span
                    variants={topLineVariants}
                    animate={isOpen ? "open" : "closed"}
                    initial="closed"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="w-6 h-[1.5px] bg-[#F9F8F4] block origin-center rounded-full"
                />
                <motion.span
                    variants={bottomLineVariants}
                    animate={isOpen ? "open" : "closed"}
                    initial="closed"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="w-6 h-[1.5px] bg-[#F9F8F4] block origin-center rounded-full"
                />
            </button>

            {/* --- Portal Output --- */}
            {mounted && createPortal(portalContent, document.body)}
        </>
    );
};

export default MaiMenu;
