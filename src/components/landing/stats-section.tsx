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

  return <span ref={ref} className="text-4xl md:text-5xl font-extrabold text-black">{displayValue}{suffix}</span>;

};

import { Card } from "@/components/ui/glass/card";

// ... (stats array and Counter component)

import { SectionTitle } from "@/components/ui/section-title";

// ... (existing code)

export function StatsSection() {
  return (
    <section id="achievements" className="py-24 overflow-hidden">
      <div className="mb-20 max-w-6xl mx-auto px-4 md:px-6">
        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-12 text-center">
            <SectionTitle
              text="OUR"
              secondaryText="ACHIEVEMENTS"
              className="mb-6"
              textSize="text-3xl md:text-6xl lg:text-7xl"
            />
            <p className="text-lg text-slate-300 mt-2 max-w-2xl mx-auto font-body">
              Decades of experience and a track record of success.
            </p>
          </div>
          <p className="text-lg text-slate-300 mt-2 max-w-2xl mx-auto font-body">
            Decades of experience and a track record of success.
          </p>
        </div>

        <Card
          variant="glass"
          animated={true}
          className="rounded-[40px] overflow-hidden"
          glass={{
            blur: 12,
            transparency: 0.1,
            color: "rgba(255,255,255,0)",
            outline: "rgba(255, 255, 255, 0.2)",
            outlineWidth: 0.5
          }}
          style={{ mixBlendMode: "normal" }} // Changed from difference since dark island is gone
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
                <p className="mt-2 text-lg font-medium text-slate-800 uppercase tracking-wide font-headline">{stat.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
