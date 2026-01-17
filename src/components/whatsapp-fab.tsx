"use client";

import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const WhatsAppFab = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white hover:bg-neutral-100 border border-black/10 !text-black shadow-lg transition-all duration-300 group"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform duration-300" />
    </Button>
  );
};

export default WhatsAppFab;
