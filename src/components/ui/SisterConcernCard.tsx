"use client";

import React, { useRef, useMemo, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SisterConcernCardProps {
    name: string;
    role: string;
    description: string;
    detailedDescription?: string;
    logo: React.ReactNode;
    accentColor: string;
    className?: string; // Allow external styling
}

const ANIMATION_CONFIG = {
    DEFAULT_TAU: 0.14,
    INITIAL_TAU: 0.6,
    ENTER_TRANSITION_MS: 180,
    DEVICE_BETA_OFFSET: 20,
};


const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number) =>
    round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

export function SisterConcernCard(props: SisterConcernCardProps) {
    const {
        name,
        role,
        description,
        logo,
        accentColor,
        className,
    } = props;

    const wrapRef = useRef<HTMLDivElement>(null);
    const shellRef = useRef<HTMLDivElement>(null);
    const enterTimerRef = useRef<number | null>(null);
    const leaveRafRef = useRef<number | null>(null);

    // -- Physics Engine --
    const engineRef = useRef({
        rafId: null as number | null,
        running: false,
        lastTs: 0,
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
        initialUntil: 0,
    });

    const updateStyles = useCallback((x: number, y: number) => {
        const wrap = wrapRef.current;
        const shell = shellRef.current;
        if (!wrap || !shell) return;

        const width = shell.clientWidth || 1;
        const height = shell.clientHeight || 1;

        const percentX = clamp((100 / width) * x);
        const percentY = clamp((100 / height) * y);

        const centerX = percentX - 50;
        const centerY = percentY - 50;

        const properties = {
            '--pointer-x': `${percentX}%`,
            '--pointer-y': `${percentY}%`,
            '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
            '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
            '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
            '--pointer-from-top': `${percentY / 100}`,
            '--pointer-from-left': `${percentX / 100}`,
            '--rotate-x': `${round(-(centerX / 5))}deg`,
            '--rotate-y': `${round(centerY / 4)}deg`,
        } as React.CSSProperties;

        for (const [key, value] of Object.entries(properties)) {
            wrap.style.setProperty(key, value as string);
        }
    }, []);

    const startAnimation = useCallback(() => {
        const engine = engineRef.current;
        if (engine.running) return;
        engine.running = true;
        engine.lastTs = 0;

        const step = (ts: number) => {
            if (!engine.running) return;
            if (engine.lastTs === 0) engine.lastTs = ts;
            const dt = (ts - engine.lastTs) / 1000;
            engine.lastTs = ts;

            const tau = ts < engine.initialUntil ? ANIMATION_CONFIG.INITIAL_TAU : ANIMATION_CONFIG.DEFAULT_TAU;
            const k = 1 - Math.exp(-dt / tau);

            engine.currentX += (engine.targetX - engine.currentX) * k;
            engine.currentY += (engine.targetY - engine.currentY) * k;

            updateStyles(engine.currentX, engine.currentY);

            const stillFar =
                Math.abs(engine.targetX - engine.currentX) > 0.05 ||
                Math.abs(engine.targetY - engine.currentY) > 0.05;

            if (stillFar) {
                engine.rafId = requestAnimationFrame(step);
            } else {
                engine.running = false;
                engine.lastTs = 0;
                engine.rafId = null;
            }
        };

        engine.rafId = requestAnimationFrame(step);
    }, [updateStyles]);

    const setTarget = useCallback((x: number, y: number) => {
        engineRef.current.targetX = x;
        engineRef.current.targetY = y;
        startAnimation();
    }, [startAnimation]);

    const toCenter = useCallback(() => {
        const shell = shellRef.current;
        if (!shell) return;
        setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
    }, [setTarget]);

    const handleDeviceOrientation = useCallback(
        (event: DeviceOrientationEvent) => {
            const shell = shellRef.current;
            if (!shell) return;

            const { beta, gamma } = event;
            if (beta == null || gamma == null) return;

            const mobileTiltSensitivity = 5;
            const centerX = shell.clientWidth / 2;
            const centerY = shell.clientHeight / 2;
            const x = clamp(centerX + gamma * mobileTiltSensitivity, 0, shell.clientWidth);
            const y = clamp(
                centerY + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
                0,
                shell.clientHeight
            );

            setTarget(x, y);
        },
        [setTarget]
    );

    const [isFlipped, setIsFlipped] = React.useState(false);

    // -- Event Handlers --
    const handlePointerEnter = useCallback((e: React.PointerEvent) => {
        const shell = shellRef.current;
        if (!shell) return;

        // Only apply list hover effect if not flipped, or keep it consistent?
        // Let's keep it consistent but maybe dampen it when flipped if verified.

        shell.classList.add('transition-transform', 'duration-[180ms]', 'ease-out');
        if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
        enterTimerRef.current = window.setTimeout(() => {
            shell.classList.remove('transition-transform', 'duration-[180ms]');
        }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

        const rect = shell.getBoundingClientRect();
        setTarget(e.clientX - rect.left, e.clientY - rect.top);
    }, [setTarget]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        const shell = shellRef.current;
        if (!shell) return;
        const rect = shell.getBoundingClientRect();
        setTarget(e.clientX - rect.left, e.clientY - rect.top);
    }, [setTarget]);

    const handlePointerLeave = useCallback(() => {
        toCenter();
    }, [toCenter]);

    // Initial setup and Mobile Tilt
    useEffect(() => {
        const shell = shellRef.current;
        if (!shell) return;
        // Set initial position to center
        engineRef.current.currentX = shell.clientWidth / 2;
        engineRef.current.currentY = shell.clientHeight / 2;
        engineRef.current.targetX = shell.clientWidth / 2;
        engineRef.current.targetY = shell.clientHeight / 2;
        updateStyles(engineRef.current.currentX, engineRef.current.currentY);

        const deviceOrientationHandler = handleDeviceOrientation;

        const handleClick = () => {
            // Allow on localhost or https
            if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') return;

            const anyMotion = (window as any).DeviceMotionEvent;
            if (anyMotion && typeof anyMotion.requestPermission === 'function') {
                anyMotion
                    .requestPermission()
                    .then((state: string) => {
                        if (state === 'granted') {
                            window.addEventListener('deviceorientation', deviceOrientationHandler);
                        }
                    })
                    .catch(console.error);
            } else {
                window.addEventListener('deviceorientation', deviceOrientationHandler);
            }
        };
        shell.addEventListener('click', handleClick);
        // Also try adding immediately if no permission needed?
        // ProfileCard adds click listener. I will do same.

        return () => {
            if (engineRef.current.rafId) cancelAnimationFrame(engineRef.current.rafId);
            if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
            shell.removeEventListener('click', handleClick);
            window.removeEventListener('deviceorientation', deviceOrientationHandler);
        }
    }, [updateStyles, handleDeviceOrientation]);

    // Dynamic style for glow color
    const cssVars = {
        '--accent-color': accentColor,
    } as React.CSSProperties;

    const ContentFace = ({ children, isBack = false }: { children: React.ReactNode, isBack?: boolean }) => (
        <div className={cn(
            "relative overflow-hidden rounded-[30px] shadow-2xl backdrop-blur-xl transform-gpu border border-white/10 col-start-1 row-start-1 h-full w-full",
            // Backface visibility
            "[backface-visibility:hidden]",
            isBack && "[transform:rotateY(180deg)]"
        )}
            style={{
                background: 'linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)', // Darker base
            }}
        >
            {/* -- Grain Texture Overlay -- */}
            <div
                className="absolute inset-0 pointer-events-none z-0 opacity-20 mix-blend-overlay"
                style={{
                    backgroundImage: 'url("/noise.png")', // Assumed asset or placeholder, user can replace
                    backgroundSize: '100px 100px',
                }}
            />

            {/* -- Shine Effect (Spotlight) -- */}
            <div
                className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-40 transition-opacity duration-700 mix-blend-screen"
                style={{
                    background: `
                  radial-gradient(
                    circle at var(--pointer-x, 50%) var(--pointer-y, 50%), 
                    ${accentColor} 0%, 
                    transparent 60%
                  )
                `,
                    filter: 'blur(40px)', // Softer blur
                }}
            />

            {/* -- Glare Effect -- */}
            <div
                className="absolute inset-0 pointer-events-none z-40 opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay"
                style={{
                    background: `
                         linear-gradient(
                            125deg, 
                            transparent 40%, 
                            rgba(255,255,255,0.4) 45%, 
                            rgba(255,255,255,0) 50%
                         )
                      `,
                    backgroundPosition: 'var(--background-x) var(--background-y)',
                    backgroundSize: '200% 200%',
                }}
            />
            {children}
        </div>
    );

    return (
        <div
            ref={wrapRef}
            className={cn("perspective-[1000px] relative touch-none group select-none", className)}
            style={cssVars}
            onPointerEnter={handlePointerEnter}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            {/* 3D Shell (Tilt) */}
            <div
                ref={shellRef}
                className="transform-gpu relative z-10 w-full transition-transform will-change-transform cursor-pointer"
                style={{
                    transform: 'translateZ(0) rotateX(var(--rotate-y, 0deg)) rotateY(var(--rotate-x, 0deg))',
                    transformStyle: 'preserve-3d',
                }}
                onClick={() => setIsFlipped(prev => !prev)}
            >
                {/* Flipper (Rotate Y) */}
                <div
                    className="relative grid transition-all duration-700 [transform-style:preserve-3d]"
                    style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                    {/* --- FRONT FACE --- */}
                    <ContentFace>
                        <div className="flex flex-col h-full relative z-20">
                            {/* Logo Section */}
                            <div className="h-56 w-full p-8 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white/50 to-transparent">
                                {/* Mesh Background for Logo */}
                                <div className="absolute inset-0 z-0 opacity-30"
                                    style={{
                                        backgroundImage: `radial-gradient(circle at var(--pointer-x) var(--pointer-y), ${accentColor}, transparent 70%)`
                                    }}
                                />
                                <div className="relative z-10 w-full h-full flex items-center justify-center filter drop-shadow-md transform transition-transform duration-300 group-hover:scale-105">
                                    <div className="w-full h-full [&>img]:object-contain [&>img]:w-full [&>img]:h-full flex items-center justify-center">
                                        {logo}
                                    </div>
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="p-6 pt-2 pb-8 flex flex-col gap-2 text-center bg-neutral-900/40 border-t border-white/10 h-full justify-start flex-grow">
                                <h3 className="text-2xl font-bold text-white tracking-tight">{name}</h3>
                                <p className="text-sm font-semibold uppercase tracking-wider text-neutral-400">{role}</p>
                                <p className="text-neutral-300 text-sm leading-relaxed mt-2 line-clamp-3">{description}</p>

                                {/* Trigger Button */}
                                <div className="mt-4 hidden md:block md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 relative z-50">
                                    <button
                                        onPointerUp={(e) => {
                                            e.stopPropagation();
                                            setIsFlipped(true);
                                        }}
                                        className="text-xs font-bold px-4 py-2 rounded-full border border-slate-300 text-slate-600 bg-white/50 hover:bg-white hover:text-slate-800 transition-colors cursor-pointer"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ContentFace>

                    {/* --- BACK FACE --- */}
                    <ContentFace isBack>
                        <div className="flex flex-col h-full relative z-20 p-8 text-center justify-center items-center bg-neutral-900 min-h-[400px]">
                            {/* Decorative Background */}
                            <div className="absolute inset-0 z-0 opacity-10"
                                style={{
                                    backgroundImage: `radial-gradient(circle at center, ${accentColor}, transparent 70%)`
                                }}
                            />

                            <h3 className="text-2xl font-bold text-white tracking-tight mb-2 relative z-10">{name}</h3>
                            <p className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-6 relative z-10">{role}</p>

                            <div className="prose prose-sm text-neutral-300 leading-relaxed max-w-none relative z-10">
                                {props.detailedDescription || description}
                            </div>

                            <button
                                onPointerUp={(e) => {
                                    e.stopPropagation();
                                    setIsFlipped(false);
                                }}
                                className="mt-8 relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white transition-colors cursor-pointer border border-neutral-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>
                    </ContentFace>
                </div>

                {/* -- Behind Glow -- */}
                <div
                    className="absolute inset-0 -z-10 translate-y-4 blur-[40px] opacity-40 transition-opacity duration-500 group-hover:opacity-70"
                    style={{
                        background: accentColor,
                        transform: 'translateZ(-10px)'
                    }}
                />
            </div>
        </div>
    );
}
