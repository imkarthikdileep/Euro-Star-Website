"use client";

import { CheckCircle, Users, HardHat, Ship, TestTube, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import GlassSurface from "@/components/GlassSurface";
import { SectionTitle } from "@/components/ui/section-title";

const services = [
  {
    icon: <HardHat />,
    title: "Fabrication Works",
    description: "Specialized fabrication for various sectors, handling intricate designs with superior engineering.",
  },
  {
    icon: <TestTube />,
    title: "Oil Field Services",
    description: "Providing expert fabrication and electromechanical solutions for the demanding oil field sector.",
  },
  {
    icon: <Ship />,
    title: "Marine Sector Services",
    description: "High-standard fabrication and engineering for marine applications and infrastructure.",
  },
  {
    icon: <Users />,
    title: "Manpower Supply",
    description: "Providing skilled technical personnel and specialized labor to support complex engineering and industrial projects.",
  },
  {
    icon: <Flame />,
    title: "Welding Works",
    description: "Expert welding solutions delivering superior structural integrity and precision, adhering to rigorous international quality standards.",
  },
  {
    icon: <CheckCircle />,
    title: "Quality Compliance",
    description: "Committed to achieving Quality System certification through rigorous standards and processes.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-transparent relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <SectionTitle text="OUR" secondaryText="SERVICES" />
          <p className="text-lg text-slate-600 mt-6 max-w-2xl mx-auto font-inter font-medium tracking-tight">
            We deliver a complete cycle of services with thorough analysis and well-thought strategies.
          </p>
        </div>

        {/* Dark Island Container */}
        <div className="bg-[#0A192F] rounded-[3rem] p-8 md:p-12 relative overflow-hidden ring-1 ring-white/10 group">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </div >
    </section >
  );
}

function ServiceCard({ service, index }: { service: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 3, delay: index * 0.1 }}
      className="h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ y: isHovered ? -10 : 0 }}
    >
      <GlassSurface
        width="100%"
        height="100%"
        borderRadius={24}
        backgroundOpacity={0.1}
        opacity={1}
        blur={12}
        distortionScale={20}
        brightness={100}
        borderWidth={0}
        mixBlendMode="difference"
        enableMagnify={true}
        className={`transition-all duration-500 ${isHovered ? 'shadow-2xl shadow-teal-500/20' : ''}`}
      >
        <div className="flex flex-col items-start p-8 h-full w-full relative z-10">
          <div className={`mb-6 rounded-2xl p-4 shadow-sm transition-all duration-500 ${isHovered ? 'bg-[#0d9488] text-white scale-110' : 'bg-white/10 text-[#0d9488]'}`}>
            <div className="h-8 w-8 [&>svg]:h-full [&>svg]:w-full">
              {service.icon}
            </div>
          </div>

          {/* Text colors adjusted for Dark Mode context (Difference mode inverts, so white becomes dark on dark? No, difference on dark bg:
              Dark (0) - White (255) = 255 (White). 
              Difference usually makes everything white on dark if the content is white.
              Let's keep text white/slate-200 to pop.
           */}
          <h3 className="mb-3 text-2xl font-extrabold text-white tracking-tight font-inter group-hover:text-[#0d9488] transition-colors">
            {service.title}
          </h3>

          <p className="text-slate-300 font-inter font-bold tracking-tight text-sm leading-relaxed" style={{ letterSpacing: '-0.02em', fontWeight: 500 }}>
            {service.description}
          </p>
        </div>
      </GlassSurface>
    </motion.div>
  );
}
