import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export interface ChromaItem {
  icon?: React.ReactNode;
  image?: string; // Kept for backward compat if needed, but primary is icon
  title: string;
  description: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  const data = items || [];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-full flex flex-wrap justify-center items-stretch gap-6 ${className}`}
      style={
        {
          '--r': `${radius}px`,
          '--x': '50%',
          '--y': '50%'
        } as React.CSSProperties
      }
    >
      {data.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          className="group relative flex flex-col w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] min-h-[320px] rounded-[2.5rem] overflow-hidden border border-black/10 transition-colors duration-300 cursor-default bg-white"
          style={
            {
              '--card-border': c.borderColor || '#D4AF37', // Default Gold Border
              background: 'white', // Explicit white for light theme
              '--spotlight-color': 'rgba(212, 175, 55, 0.15)' // Gold spotlight
            } as React.CSSProperties
          }
        >
          {/* Spotlight Effect */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
            }}
          />

          {/* Detailed Gold Glow Border on Hover */}
          <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-2 border-[#D4AF37]/30 rounded-[2.5rem] pointer-events-none" />


          <div className="relative z-10 flex flex-col h-full p-10">
            {/* Icon Wrapper */}
            <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mb-8 group-hover:bg-[#D4AF37]/10 transition-colors duration-300">
              <div className="text-[#D4AF37] w-8 h-8 stroke-[1.5] [&>svg]:w-full [&>svg]:h-full">
                {c.icon}
              </div>
            </div>

            <h3 className="text-3xl font-headline font-medium text-[#D4AF37] mb-4 tracking-tight">{c.title}</h3>
            <p className="text-[#000000] font-light text-base leading-relaxed">{c.description}</p>
          </div>
        </article>
      ))}

      {/* Global Cursor Spotlight / Mask - Adjusted for Dark Theme */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: 'brightness(1)',
          WebkitBackdropFilter: 'brightness(1)',
          background: 'transparent',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%, rgba(0,0,0,0.5) 100%)', // Inverted logic for dark theme visibility
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%, rgba(0,0,0,0.5) 100%)'
        }}
      />
      {/* Actually, the original ChromaGrid mask logic was for a "reveal" effect. 
          For a "Standard" dark cards grid that just has a spotlight, we might not need the heavy mask overlay 
          unless we want to DIM everything ELSE. 
          "Optimise for our desktop background" -> The background is dark. 
          If I dim it further, it might look too dark. 
          I will remove the global mask overlay to keep it clean and just rely on the per-card spotlight.
       */}
    </div>
  );
};

export default ChromaGrid;
