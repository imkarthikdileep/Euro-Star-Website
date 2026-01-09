"use client";

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/glass/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if consent cookie exists
        const consent = document.cookie.split('; ').find(row => row.startsWith('cookie_consent='));
        if (!consent) {
            // Small delay for smooth entrance on load
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        // Set cookie for 1 year
        document.cookie = "cookie_consent=true; path=/; max-age=" + (60 * 60 * 24 * 365);
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[100] max-w-sm w-full"
                >
                    <Card
                        variant="glass"
                        className="p-6 rounded-2xl border-white/20 shadow-xl backdrop-blur-md"
                        glass={{
                            blur: 12,
                            transparency: 0.2,
                            color: "rgba(255, 255, 255, 0.05)",
                            outline: "rgba(255, 255, 255, 0.1)"
                        }}
                    >
                        <div className="flex flex-col gap-4">
                            <div>
                                <h4 className="font-headline font-bold text-lg text-white mb-1">Cookie Consent</h4>
                                <p className="font-body text-sm text-slate-300 leading-relaxed">
                                    We use cookies to enhance your browsing experience and remember your preferences.
                                </p>
                            </div>
                            <div className="flex gap-3 justify-end items-center">
                                <Link href="/privacy-policy" className="text-xs text-slate-400 hover:text-white transition-colors mr-auto">
                                    Privacy Policy
                                </Link>
                                <Button
                                    onClick={acceptCookies}
                                    className="bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-lg px-6"
                                >
                                    Accept
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
