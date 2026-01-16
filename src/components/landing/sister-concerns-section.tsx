"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { SisterConcernCard } from "@/components/ui/SisterConcernCard";
import Image from "next/image";
import { useState } from "react";

export function SisterConcernsSection() {
    const [flippedCard, setFlippedCard] = useState<number | null>(null);

    const handleCardClick = (index: number) => {
        setFlippedCard(flippedCard === index ? null : index);
    };

    return (
        <section id="sister-concerns" className="relative z-10 w-full max-w-7xl mx-auto">
            {/* Desktop Layout (Preserved) */}
            <div className="hidden md:block py-24 px-4 md:px-6">
                <div className="mb-16 text-center">
                    <SectionTitle text="Allied" secondaryText="Concerns" />
                    <p className="text-white max-w-2xl mx-auto text-lg mt-6 font-headline opacity-80">
                        Expanding our horizon through specialized entities delivering excellence across trading and technical services.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto align-start">
                    <SisterConcernCard
                        name="Kenz Hiraa General Trading LLC"
                        role="General Trading"
                        description="A premier trading house specializing in the import and trading ofgeneral consumer goods across the region."
                        detailedDescription="A leading supplier of high-quality industrial food ingredients. We specialize in the commercial supply of mixed fruit jams, tutti frutti, and essential commodities like mayonnaise and milk powder to major bakeries and food industries across the region."
                        logo={
                            <div className="relative w-32 h-32 md:w-40 md:h-40">
                                <Image
                                    src="/Kenz-logo.png"
                                    alt="Kenz Hiraa General Trading LLC Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        }
                        accentColor="#f97316" // Orange-500
                    />

                    <SisterConcernCard
                        name="Kenz Technical Services LLC"
                        role="Technical Services"
                        description="Dedicated to providing top-tier technical solutions, maintenance services, and specialized engineering support for large-scale industrial and commercial projects."
                        detailedDescription="Mirroring the engineering excellence of Euro Star, we provide comprehensive technical maintenance and on-site support. Our expertise covers electromechanical systems, marine fabrication, manpower supply and specialized oil field services for large-scale infrastructure."
                        logo={
                            <div className="relative w-48 h-32 md:w-72 md:h-40">
                                <Image
                                    src="/Kenz-technical-logo.png"
                                    alt="Kenz Technical Services LLC Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        }
                        accentColor="#0d9488" // Teal-600
                    />
                </div>
            </div>

            {/* Mobile Layout (Luxury Industrial Flip Cards) */}
            <div className="md:hidden py-24 px-6 bg-cream">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl text-charcoal tracking-tight">Allied Concerns</h2>
                    <div className="w-px h-12 bg-gold mx-auto mt-6"></div>
                </div>

                <div className="grid grid-cols-1 gap-8 perspective-1000">
                    {/* Card 1: Kenz Hiraa General Trading */}
                    <div
                        className="group relative h-[600px] cursor-pointer"
                        onClick={() => handleCardClick(1)}
                        style={{ perspective: '1000px' }}
                    >
                        <div
                            className={`relative text-center w-full h-full transition-transform duration-700 ease-in-out`}
                            style={{
                                transformStyle: 'preserve-3d',
                                transform: flippedCard === 1 ? 'rotateY(180deg)' : 'rotateY(0deg)'
                            }}
                        >
                            {/* Front Side */}
                            <div
                                className="absolute inset-0 w-full h-full backface-hidden"
                                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                            >
                                <img src="/Kenz_trading.jpeg" alt="Kenz Trading" className="w-full h-full object-cover rounded-3xl brightness-75" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-3xl"></div>
                                <div className="absolute inset-0 p-12 flex flex-col justify-end items-start text-left">
                                    <span className="text-gold text-xs uppercase tracking-widest mb-2 font-inter font-medium">Division 01</span>
                                    <h3 className="text-white font-serif text-4xl leading-none mb-4">Kenz Hiraa<br />General Trading</h3>
                                    <p className="text-white/60 text-sm font-inter animate-pulse">Tap for details</p>
                                </div>
                            </div>

                            {/* Back Side */}
                            <div
                                className="absolute inset-0 w-full h-full rounded-3xl bg-[#1c1c1e] text-white p-10 flex flex-col items-center justify-center backface-hidden"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                }}
                            >
                                <div className="relative w-48 h-32 mb-8 bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                                    <Image
                                        src="/Kenz-logo-mobile.jpeg"
                                        alt="Kenz Hiraa Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="text-2xl font-serif mb-4 text-center">Kenz Hiraa General Trading</h3>
                                <p className="text-center text-gray-400 font-inter leading-relaxed text-sm">
                                    A leading supplier of high-quality industrial food ingredients. We specialize in the commercial supply of mixed fruit jams, tutti frutti, and essential commodities like mayonnaise and milk powder to major bakeries and food industries across the region.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Kenz Technical Services */}
                    <div
                        className="group relative h-[600px] cursor-pointer"
                        onClick={() => handleCardClick(2)}
                        style={{ perspective: '1000px' }}
                    >
                        <div
                            className={`relative w-full h-full transition-transform duration-700 ease-in-out`}
                            style={{
                                transformStyle: 'preserve-3d',
                                transform: flippedCard === 2 ? 'rotateY(180deg)' : 'rotateY(0deg)'
                            }}
                        >
                            {/* Front Side */}
                            <div
                                className="absolute inset-0 w-full h-full backface-hidden"
                                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                            >
                                {/* Using the old Kenz Trading Unsplash image for Technical as requested */}
                                <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&auto=format&fit=crop" alt="Kenz Technical" className="w-full h-full object-cover rounded-3xl" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent rounded-3xl"></div>
                                <div className="absolute inset-0 p-12 flex flex-col justify-end items-start text-left">
                                    <span className="text-teal-400 text-xs uppercase tracking-widest mb-2 font-inter font-medium">Division 02</span>
                                    <h3 className="text-white font-serif text-4xl leading-none mb-4">Kenz<br />Technical</h3>
                                    <p className="text-white/60 text-sm font-inter animate-pulse">Tap for details</p>
                                </div>
                            </div>

                            {/* Back Side */}
                            <div
                                className="absolute inset-0 w-full h-full rounded-3xl bg-[#1c1c1e] text-white p-10 flex flex-col items-center justify-center backface-hidden"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                }}
                            >
                                <div className="relative w-56 h-32 mb-8 bg-white/10 rounded-2xl p-2 backdrop-blur-sm">
                                    <Image
                                        src="/Kenz-technical-logo-mobile.jpeg"
                                        alt="Kenz Technical Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="text-2xl font-serif mb-4 text-center">Kenz Technical Services</h3>
                                <p className="text-center text-gray-400 font-inter leading-relaxed text-sm">
                                    Mirroring the engineering excellence of Euro Star, we provide comprehensive technical maintenance and on-site support. Our expertise covers electromechanical systems, marine fabrication, manpower supply specialized oil field services.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
