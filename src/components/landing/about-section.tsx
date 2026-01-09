"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useRef } from "react";

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
                transition={{ duration: 2.0, delay: 1.0 }}
                className="h-full"
              >
                <div className="h-full relative">

                  {/* Top Layer: Content */}
                  <div className="space-y-6 text-lg font-medium leading-relaxed tracking-tight relative z-10 text-justify hyphens-auto text-slate-700">
                    <p>
                      Euro Star Electromechanical Cont. stands at the forefront of the industrial sector, driven by a team of dedicated, qualified, and highly professional skilled and semi-skilled workers. We specialize in executing complex Fabrication works across diverse sectors including Oil & Gas, Marine, and Heavy Industries.
                    </p>
                    <p>
                      Our expertise lies in handling intricate designs that demand not only high standards of precision but also superior engineering skills. We pride ourselves on our ability to translate complex engineering challenges into robust, high-performance reality.
                    </p>
                    <p>
                      Over the years, our commitment to quality and timely delivery has assisted the company to successfully evolve as a leading Sub-Contractor in a remarkably short span of time. We don't just complete projects, we build lasting partnerships founded on trust, technical excellence, and an unwavering drive for perfection.
                    </p>
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
