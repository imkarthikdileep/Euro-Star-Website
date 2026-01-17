"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { useRef, useState } from "react";
import ShinyText from "@/components/ShinyText";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Card } from "@/components/ui/glass/card";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [isColored, setIsColored] = useState(false);

  useGSAP(() => {
    const el = contentRef.current;
    if (!el) return;

    gsap.fromTo(el,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 95%", // Starts when top of element hits 95% viewport height
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section className="relative z-40 bg-[#F9F8F4]" ref={containerRef} id="about">
      {/* Desktop Layout (Preserved) */}
      <div className="hidden lg:block pb-24 pt-0 overflow-hidden">
        <div className="mb-10 max-w-6xl mx-auto">
          {/* Glass Card Wrapper for About Content - Now Transparent for Liquid BG */}
          <div className="bg-transparent rounded-[3rem] p-8 md:p-16 relative overflow-visible"> {/* Removed border/shadow/glass */}

            <div className="relative z-10">
              <div className="space-y-8 max-w-4xl mx-auto">
                {/* Updated Typography: About (Black), Us (Gold) */}
                <div className="flex flex-col gap-2">
                  <h2 className="font-headline text-6xl md:text-8xl !text-[#000000]">
                    About <span className="text-[#C5A368]">Us</span>
                  </h2>
                </div>

                <div ref={contentRef} className="h-full">
                  <div className="h-full relative">

                    {/* Top Layer: Content - Dark Text for Cream Background */}
                    <div className="text-lg font-body font-medium leading-relaxed tracking-tight relative z-10 text-left md:text-justify hyphens-auto text-[#222222] transition-colors duration-300">
                      Since <span className="font-bold text-black">2010</span>, Euro Star Electromechanical Cont. has established itself as a premier industrial force and technical solutions provider within the <span className="font-bold text-black">United Arab Emirates</span>, driven by a mission to support the nation’s infrastructure with an elite team of qualified professionals and highly skilled technical specialists. While we specialize in executing high-complexity projects across the Marine, Oil & Gas, and Heavy Industrial sectors—handling intricate designs that demand superior engineering and unyielding precision—our core expertise lies in our role as a strategic technical partner and sub-contractor. We manage major contracts for critical industrial developments, providing the operational discipline and technical brilliance required to power large-scale infrastructure and ensure high-performance results on every site. Built on a foundation of trust and a relentless drive for perfection, we have evolved rapidly to become a leading industry partner, proving that we don’t just complete projects; we build lasting strategic partnerships founded on technical excellence and an unwavering commitment to quality.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout (Luxury Industrial) - Optimized for Tablet */}
      <div className="lg:hidden py-24 px-6 md:px-12 lg:px-48 bg-white border-y border-charcoal/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative" onClick={() => setIsColored(!isColored)}>
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/dune_image_mobile.jpg"
                alt="Quality Landscape"
                className={`w-full h-full object-cover transition-all duration-700 ${isColored ? 'grayscale-0' : 'grayscale'}`}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-forest text-cream p-6 max-w-[200px]">
              <p className="font-serif italic text-lg leading-tight">"Quality is not an act, it is a habit."</p>
            </div>
          </div>
          {/* Content Card with Frosted Glass/Aurora Effect */}
          <Card variant="glass" className="p-8 md:p-12 rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] relative overflow-hidden group">
            {/* Subtle glimmer/aurora hint */}
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl rounded-full pointer-events-none group-hover:opacity-100 transition-opacity duration-1000 opacity-50"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-serif mb-6 text-white tracking-wide">
                Who We Are
              </h3>
              <div className="space-y-6 text-gray-300 font-inter font-light text-lg leading-relaxed">
                <p>
                  Since 2010, <span className="text-white font-medium">Euro Star Electromechanical</span> has been a cornerstone in the UAE&apos;s industrial sector.
                  We specialize in providing elite technical workforces for Marine, Oil & Gas, and Heavy Industries.
                </p>
                <p>
                  Our commitment to precision, safety, and reliability has made us the trusted partner for major projects across the region.
                  We don&apos;t just supply manpower; we deliver <span className="text-white font-medium">operational excellence</span>.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <div className="px-5 py-2 rounded-full bg-white/10 border border-white/5 text-sm font-inter text-white/80 backdrop-blur-md">
                  15+ years of experience
                </div>
                <div className="px-5 py-2 rounded-full bg-white/10 border border-white/5 text-sm font-inter text-white/80 backdrop-blur-md">
                  100+ projects
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
