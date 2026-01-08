"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { useRef } from "react";
import GlassSurface from "@/components/GlassSurface";

export function AboutSection() {
  const containerRef = useRef(null);

  return (
    <section className="py-24 overflow-hidden" ref={containerRef} id="about">
      <div className="mb-20 max-w-6xl mx-auto">
        {/* Dark Island Wrapper for About Content */}
        <div className="bg-[#0A192F] rounded-[3rem] p-8 md:p-16 relative overflow-hidden ring-1 ring-white/10 group">
          {/* Internal Grid Pattern */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05] transition-transform duration-1000 md:group-hover:scale-110"
            style={{
              backgroundImage: `
                  linear-gradient(to right, #ffffff 1px, transparent 1px),
                  linear-gradient(to bottom, #ffffff 1px, transparent 1px)
                `,
              backgroundSize: '24px 24px'
            }}
          />

          <div className="relative z-10">
            <div className="space-y-8 max-w-4xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-12"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 3 }}
              >
                <span className="text-white" style={{ textShadow: "0 0 20px rgba(255,255,255,0.2)" }}>ABOUT</span> <span className="text-teal-400">US</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 3, delay: 0.2 }}
                className="h-full"
              >
                <GlassSurface
                  width="100%"
                  height="100%"
                  borderRadius={40}
                  backgroundOpacity={0.1}
                  opacity={0.7}
                  brightness={100}
                  blur={12}
                  distortionScale={25}
                  mixBlendMode="difference"
                  enableMagnify={true}
                  className="rounded-[40px]"
                >
                  <div className="space-y-6 text-lg font-medium leading-relaxed tracking-tight p-8 md:p-12 relative z-20 text-justify hyphens-auto">
                    <p className="text-white/90">
                      Euro Star Electromechanical Cont. stands at the forefront of the industrial sector, driven by a team of dedicated, qualified, and highly professional skilled and semi-skilled workers. We specialize in executing complex Fabrication works across diverse sectors including Oil & Gas, Marine, and Heavy Industries.
                    </p>
                    <p className="text-white/90">
                      Our expertise lies in handling intricate designs that demand not only high standards of precision but also superior engineering skills. We pride ourselves on our ability to translate complex engineering challenges into robust, high-performance reality.
                    </p>
                    <p className="text-white/90">
                      Over the years, our commitment to quality and timely delivery has assisted the company to successfully evolve as a leading Sub-Contractor in a remarkably short span of time. We don't just complete projects, we build lasting partnerships founded on trust, technical excellence, and an unwavering drive for perfection.
                    </p>
                  </div>
                </GlassSurface>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-16 opacity-30 bg-slate-300" />

      {/* Sister Concerns */}
      <div className="mb-20 max-w-6xl mx-auto">
        {/* Dark Island Wrapper for Sister Concerns */}
        <div className="bg-[#0A192F] rounded-[3rem] p-8 md:p-16 relative overflow-hidden ring-1 ring-white/10">
          {/* Internal Grid Pattern */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage: `
                  linear-gradient(to right, #ffffff 1px, transparent 1px),
                  linear-gradient(to bottom, #ffffff 1px, transparent 1px)
                `,
              backgroundSize: '24px 24px'
            }}
          />

          <div className="relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 3 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white font-michroma uppercase tracking-widest" style={{ textShadow: "0 0 20px rgba(255,255,255,0.2)" }}>
                Sister <span className="text-teal-400">Concerns</span>
              </h3>
            </motion.div>

            <GlassSurface
              width="100%"
              height="100%"
              borderRadius={40}
              backgroundOpacity={0.1}
              opacity={0.7}
              brightness={100}
              blur={12}
              distortionScale={60}
              mixBlendMode="difference"
              enableMagnify={true}
              className="rounded-[40px]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10 p-4 md:p-8 relative z-20">
                <SisterConcernItem name="KENZ Hiraa General Trading Ltd." logoSrc="/Kenz-logo.png" />
                <SisterConcernItem name="KENZ TECHNICAL Services LLC" logoSrc="/Kenz-technical-logo.png" />
              </div>
            </GlassSurface>
          </div>
        </div>
      </div>

    </section >
  );
}

function SisterConcernItem({ name, logoSrc }: { name: string, logoSrc?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 w-full group cursor-pointer">
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Logo Container */}
        <div className="w-full max-w-[240px] h-32 mb-8 flex items-center justify-center relative transform transition-transform duration-500 group-hover:scale-110">
          {logoSrc ? (
            <div className="relative w-full h-full">
              <Image
                src={logoSrc}
                alt={`${name} Logo`}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-slate-50/50 flex items-center justify-center border border-slate-200/50 text-slate-400">
              <Building2 className="h-10 w-10" />
            </div>
          )}
        </div>

        <h4 className="text-xl font-extrabold text-white font-inter uppercase leading-relaxed tracking-tight group-hover:text-teal-400 transition-colors">
          {name}
        </h4>
        <p className="mt-3 text-slate-400 text-sm tracking-widest uppercase font-bold group-hover:text-white transition-colors">

        </p>
      </div>
    </div>
  );
}