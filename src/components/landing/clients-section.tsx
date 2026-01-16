"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const clients = [
  { name: "Oil Field Supply Centre.", logo: "/clients/Oilfields.png" },
  { name: "Lamprell", logo: "/clients/Lamprell.png" },
  { name: "McDermott", logo: "/clients/mcdermott(transparent).png" },
  { name: "Fabtech", logo: "/clients/fabtech.png" },
  { name: "Hidayath Heavy Industry", logo: "/clients/Hidayath.png" },
  { name: "Mai Dubai", logo: "/clients/maidubai.png" },
  { name: "PETRONASH", logo: "/clients/petronash.png" },
  { name: "Binghatti", logo: "/clients/binghatti.png" },
  { name: "DP World Drydocks", logo: "/clients/drydocks-1.png" },
  { name: "Inco", logo: "/clients/INCO(transparent).png" }
];

import { SectionTitle } from "@/components/ui/section-title";
// ... imports

export function ClientsSection() {
  return (
    <section id="clients" className="overflow-hidden bg-[#F9F8F4] py-8 relative z-20">
      {/* Marquee Implementation - Visible on All Screens */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] group">
        <div
          className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-marquee-slow group-hover:[animation-play-state:paused]"
        >
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 md:[&_li]:mx-8 [&_img]:max-w-none text-white">
            {[...clients, ...clients].map((client, idx) => (
              <li key={idx} className="glass-card w-[160px] md:w-[200px] h-[100px] md:h-[120px] flex items-center justify-center rounded-2xl p-4 bg-white/5 border border-charcoal/5 hover:bg-white/10 transition-colors">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={160}
                  height={80}
                  className="object-contain w-auto h-auto max-h-[60px] md:max-h-[80px] brightness-0"
                />
              </li>
            ))}
          </ul>
        </div>
        <div
          className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-marquee-slow group-hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 md:[&_li]:mx-8 [&_img]:max-w-none">
            {[...clients, ...clients].map((client, idx) => (
              <li key={idx} className="glass-card w-[160px] md:w-[200px] h-[100px] md:h-[120px] flex items-center justify-center rounded-2xl p-4 bg-white/5 border border-charcoal/5 hover:bg-white/10 transition-colors">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={160}
                  height={80}
                  className="object-contain w-auto h-auto max-h-[60px] md:max-h-[80px] brightness-0"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
