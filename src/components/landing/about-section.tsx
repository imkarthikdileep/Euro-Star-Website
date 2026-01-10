"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useRef } from "react";
import ShinyText from "@/components/ShinyText";

export function AboutSection() {
  const containerRef = useRef(null);

  return (
    <section className="py-24 overflow-hidden relative z-10" ref={containerRef} id="about">
      <div className="mb-10 max-w-6xl mx-auto">
        {/* Light Glass Wrapper for About Content */}
        {/* Light Glass Wrapper for About Content */}
        <div className="bg-white/20 backdrop-filter backdrop-blur-[20px] rounded-[3rem] p-8 md:p-16 relative overflow-hidden border border-white/40 shadow-xl group hover:scale-[1.02] transition-transform duration-500">

          <div className="relative z-10">
            <div className="space-y-8 max-w-4xl mx-auto">
              <SectionTitle text="ABOUT" secondaryText="US" className="mb-12" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2.0, delay: 0.5 }}
                className="h-full"
              >
                <div className="h-full relative">

                  {/* Top Layer: Content */}
                  <div className="text-lg font-medium leading-relaxed tracking-tight relative z-10 text-left md:text-justify hyphens-auto text-slate-700">
                    Since{" "}
                    <ShinyText text="2014" disabled={false} speed={3.5} className="font-bold inline-block" color="#000000" shineColor="#434343" />
                    , Euro Star Electromechanical Cont. has established itself as a premier industrial sub-contracting and specialized labour supply partner within the{" "}
                    <span className="inline-flex flex-wrap items-baseline gap-1">
                      <ShinyText text="United" disabled={false} speed={3.5} className="font-bold inline-block" color="#d32f2f" shineColor="#ff8a80" />
                      <ShinyText text="Arab" disabled={false} speed={3.5} className="font-bold inline-block" color="#2e7d32" shineColor="#a5d6a7" />
                      <ShinyText text="Emirates" disabled={false} speed={3.5} className="font-bold inline-block" color="#000000" shineColor="#434343" />
                    </span>
                    , driven by a mission to provide the nation’s infrastructure with an elite, highly professional, and technically proficient workforce. While we specialize in executing high-complexity fabrication projects across the Marine, Oil & Gas, and Heavy Industrial sectors—handling intricate designs that demand superior engineering and unyielding precision—our core identity and primary expertise lie in our role as a dedicated workforce power. We secure major contracts from leading companies to provide the essential human engine for large-scale projects, delivering skilled personnel who ensure operational excellence and unyielding reliability on every site. Built on a foundation of trust and a relentless drive for perfection, we have evolved rapidly to become a leading partner for major contractors, proving that we don’t just supply labour; we build lasting project partnerships through technical brilliance and a commitment to quality.
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
