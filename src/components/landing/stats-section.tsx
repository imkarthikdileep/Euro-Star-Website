"use client";

import { useEffect, useRef, useState } from 'react';
import { Users, Calendar, Briefcase } from 'lucide-react';
import { motion, useSpring, useInView } from "framer-motion";

const stats = [
  {
    icon: <Calendar className="h-12 w-12 text-accent" />,
    value: 15,
    label: "Years of Experience",
    suffix: "+",
  },
  {
    icon: <Users className="h-12 w-12 text-accent" />,
    value: 210,
    label: "Skilled Technicians",
    suffix: "+",
  },
  {
    icon: <Briefcase className="h-12 w-12 text-accent" />,
    value: 100,
    label: "Projects Completed",
    suffix: "+",
  },
];

const Counter = ({ value, suffix }: { value: number, suffix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
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

  return <span ref={ref} className="text-4xl md:text-5xl font-extrabold text-white">{displayValue}{suffix}</span>;

};

import GlassSurface from "@/components/GlassSurface";

// ... (stats array and Counter component)

export function StatsSection() {
  return (
    <section id="achievements" className="py-24 overflow-hidden">
      <div className="mb-20 max-w-6xl mx-auto px-4 md:px-6">
        {/* Dark Island Wrapper */}
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
            <div className="flex flex-col items-center mb-12 text-center">
              <motion.h2
                className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 3 }}
              >
                <span className="text-white" style={{ textShadow: "0 0 20px rgba(255,255,255,0.2)" }}>OUR</span> <span className="text-teal-400">ACHIEVEMENTS</span>
              </motion.h2>
              <p className="text-lg text-slate-300 mt-2 max-w-2xl mx-auto font-body">
                Decades of experience and a track record of success.
              </p>
            </div>

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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10 p-8 md:p-12 relative z-20">
                {stats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center justify-center p-4">
                    <div className="text-teal-400 mb-4 scale-110">
                      {stat.icon}
                    </div>
                    <div>
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="mt-2 text-lg font-medium text-slate-300 uppercase tracking-wide font-headline">{stat.label}</p>
                  </div>
                ))}
              </div>
            </GlassSurface>
          </div>
        </div>
      </div>
    </section>
  );
}
