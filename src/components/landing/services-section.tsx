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
    <section id="services" className="py-16 md:py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <SectionTitle text="OUR" secondaryText="SERVICES" />
          <p className="text-lg text-slate-600 mt-6 max-w-2xl mx-auto font-inter font-medium tracking-tight">
            We deliver a complete cycle of services with thorough analysis and well-thought strategies.
          </p>
        </div>

        {/* Light Glass Container */}
        <div className="bg-white/20 backdrop-filter backdrop-blur-[20px] rounded-[3rem] p-8 md:p-12 relative overflow-hidden border border-white/40 shadow-xl group">

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

import SpotlightCard from "@/components/SpotlightCard";

function ServiceCard({ service, index }: { service: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full relative group/card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ y: isHovered ? -5 : 0 }}
      viewport={{ margin: "-50px" }}
    >
      <SpotlightCard
        spotlightColor="rgba(13, 148, 136, 0.3)" // Teal-600 with opacity
        className={`
          flex flex-col items-start h-full p-8 transition-all duration-300
          ${isHovered ? 'bg-white/40 shadow-lg border-white/50' : '!bg-white/10 border-white/20 hover:bg-white/20'}
          border backdrop-blur-sm !rounded-3xl
        `}
      >
        <div className={`mb-6 rounded-2xl p-4 shadow-sm transition-all duration-500 ${isHovered ? 'bg-teal-600 text-white scale-110' : 'bg-white/60 text-teal-700'}`}>
          <div className="h-8 w-8 [&>svg]:h-full [&>svg]:w-full">
            {service.icon}
          </div>
        </div>

        <h3 className="mb-3 text-2xl font-extrabold text-slate-800 tracking-tight font-inter group-hover/card:text-teal-700 transition-colors">
          {service.title}
        </h3>

        <p className="text-slate-600 font-inter font-medium tracking-tight text-sm leading-relaxed">
          {service.description}
        </p>
      </SpotlightCard>
    </motion.div>
  );
}
