"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import Link from 'next/link';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = document.cookie.split('; ').find(row => row.startsWith('cookie_consent='));
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        document.cookie = "cookie_consent=true; path=/; max-age=" + (60 * 60 * 24 * 365);
        setIsVisible(false);
    };

    const declineCookies = () => {
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
                    className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto z-[100] flex justify-center md:block"
                >
                    {/* Frosted Glass Card Container */}
                    <div className="w-full max-w-[300px] min-h-[220px] h-auto bg-white/70 backdrop-blur-xl rounded-lg flex flex-col items-center justify-center p-[20px_30px] gap-[13px] relative overflow-hidden shadow-[2px_2px_20px_rgba(0,0,0,0.062)] border border-white/40 mx-auto">

                        {/* Cookie Icon */}
                        <div className="w-[50px] h-[50px] flex items-center justify-center">
                            <Cookie className="w-full h-full text-[rgb(97,81,81)]" fill="currentColor" />
                        </div>

                        {/* Heading */}
                        <p className="text-[1.2em] font-extrabold text-[rgb(26,26,26)] leading-none">
                            Cookie Consent
                        </p>

                        {/* Description */}
                        <p className="text-center text-[0.7em] font-semibold text-[rgb(99,99,99)] leading-relaxed">
                            We use cookies to enhance your browsing experience and remember your preferences. <Link href="/privacy-policy" className="text-[rgb(59,130,246)] hover:underline ml-1">Privacy Policy</Link>
                        </p>

                        {/* Button Container */}
                        <div className="flex gap-[20px] flex-row mt-2">
                            <button
                                onClick={acceptCookies}
                                className="w-[80px] h-[30px] bg-[#7b57ff] hover:bg-[#9173ff] text-[#f1f1f1] border-none cursor-pointer font-semibold rounded-[20px] shadow-[0_4px_6px_-1px_#977ef3,0_2px_4px_-1px_#977ef3] hover:shadow-[0_10px_15px_-3px_#977ef3,0_4px_6px_-2px_#977ef3] transition-all duration-200 text-xs"
                            >
                                Accept
                            </button>
                            <button
                                onClick={declineCookies}
                                className="w-[80px] h-[30px] bg-[#dadada] hover:bg-[#ebebeb] text-[rgb(46,46,46)] border-none cursor-pointer font-semibold rounded-[20px] shadow-[0_4px_6px_-1px_#bebdbd,0_2px_4px_-1px_#bebdbd] hover:shadow-[0_10px_15px_-3px_#bebdbd,0_4px_6px_-2px_#bebdbd] transition-all duration-200 text-xs"
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
