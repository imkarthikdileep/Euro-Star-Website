"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("eurostar_cookie_consent");
      if (!consent) {
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("eurostar_cookie_consent", "accepted");
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("eurostar_cookie_consent", "declined");
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 80,
            backgroundColor: "#181818",
            borderTop: "1px solid rgba(249, 249, 247, 0.12)",
            color: "#F9F9F7",
          }}
          className="fixed bottom-0 left-0 right-0 z-[80] bg-[#181818] border-t border-[#F9F9F7]/12 py-3.5 px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl"
        >
          <p className="font-body text-xs text-[#F9F9F7]/80 text-center sm:text-left leading-relaxed">
            We use strictly necessary browser storage to optimize platform performance and remember consent.
            Review our{" "}
            <Link
              href="/legal#privacy"
              className="text-[#C5A368] underline underline-offset-2 hover:text-[#E5D3B3] transition-colors"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/legal#terms"
              className="text-[#C5A368] underline underline-offset-2 hover:text-[#E5D3B3] transition-colors"
            >
              Terms of Use
            </Link>
            .
          </p>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleDecline}
              className="min-h-[44px] px-4 py-2 text-[11px] font-mono tracking-wider text-[#F9F9F7]/60 hover:text-[#F9F9F7] uppercase transition-colors"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="min-h-[44px] px-5 py-2 bg-[#C5A368] hover:bg-[#E5D3B3] text-[#181818] text-[11px] font-mono font-medium tracking-wider uppercase transition-colors"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
