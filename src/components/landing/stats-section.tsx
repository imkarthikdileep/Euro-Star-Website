"use client";

import { useEffect, useRef, useState } from 'react';
import { Users, Calendar, Briefcase } from 'lucide-react';
import { motion, useSpring, useInView } from "framer-motion";

const stats = [
  {
    icon: <Calendar className="h-12 w-12 text-gold" />,
    value: 15,
    label: "Years of Experience",
    suffix: "+",
  },
  {
    icon: <Users className="h-12 w-12 text-gold" />,
    value: 210,
    label: "Skilled Technicians",
    suffix: "+",
  },
  {
    icon: <Briefcase className="h-12 w-12 text-gold" />,
    value: 100,
    label: "Projects Completed",
    suffix: "+",
  },
];

const Counter = ({ value, suffix, className }: { value: number, suffix?: string, className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const springValue = useSpring(0, { bounce: 0, duration: 2000 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, value, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref} className={className || "text-4xl md:text-5xl font-extrabold text-gold"}>{displayValue}{suffix}</span>;
};

import { Card } from "@/components/ui/glass/card";

// ... (stats array and Counter component)

import { SectionTitle } from "@/components/ui/section-title";

// ... (existing code)

export function StatsSection() {
  return (
    <section id="achievements" className="relative z-40 overflow-hidden">
      {/* Desktop Layout (Preserved) */}
      <div className="hidden lg:block py-24 bg-[#F9F8F4] w-full">
        <div className="mb-20 max-w-6xl mx-auto px-4 md:px-6">
          <div className="relative z-10 w-full max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.5 }}
              className="w-full mx-auto flex flex-col items-center mb-12 text-center"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif md:font-headline mb-6">
                <span className="text-[#000000]">Our</span> <span className="text-[#D4AF37] gold-noise">Achievements</span>
              </h2>
              <p className="text-lg text-[#000000]/80 mt-2 max-w-2xl mx-auto font-headline opacity-80">
                Decades of experience and a track record of success.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-black/10 p-6 md:p-8 relative z-20">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-2">
                <div className="text-gold mb-3 scale-100">
                  {stat.icon}
                </div>
                <div>
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-base font-medium text-[#000000] uppercase tracking-wide font-headline">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout (Luxury Industrial) - Optimized for Tablet */}
      <div className="lg:hidden bg-[#F9F8F4] py-20 border-t border-black/10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-black/10">
          <div className="py-4">
            <Counter value={15} suffix="+" className="block font-serif text-5xl text-gold mb-2" />
            <span className="text-xs uppercase tracking-widest text-[#000000]">Years of Experience</span>
          </div>
          <div className="py-4">
            <Counter value={100} suffix="+" className="block font-serif text-5xl text-gold mb-2" />
            <span className="text-xs uppercase tracking-widest text-[#000000]">Projects Completed</span>
          </div>
          <div className="py-4">
            <Counter value={100} suffix="%" className="block font-serif text-5xl text-gold mb-2" />
            <span className="text-xs uppercase tracking-widest text-[#000000]">Client Satisfaction</span>
          </div>
        </div>
      </div>
    </section >
  );
}
