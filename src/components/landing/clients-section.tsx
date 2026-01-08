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

export function ClientsSection() {
  return (
    <section id="clients" className="py-20 md:py-32 bg-transparent overflow-hidden section-glow">
      <div className="container mx-auto px-4 md:px-6 mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 3 }}
          className="text-6xl md:text-7xl font-extrabold font-lexend mb-6"
        >
          <span className="text-transparent" style={{ WebkitTextStroke: "2px #1e293b" }}>OUR</span> <span className="text-slate-900">VALUED CLIENTS</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto"
        >
          Proud to partner with industry leaders across the region.
        </motion.p>
      </div>



      {/* Correct Marquee Implementation */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] group">
        <div
          className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll group-hover:[animation-play-state:paused]"
        >
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none text-white">
            {[...clients, ...clients].map((client, idx) => (
              <li key={idx} className="glass-card w-[200px] h-[120px] flex items-center justify-center rounded-2xl p-4 bg-white/10 hover:bg-white/15 transition-colors">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={160}
                  height={80}
                  className="object-contain w-auto h-auto max-h-[80px]"
                />
              </li>
            ))}
          </ul>
        </div>
        <div
          className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll group-hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none">
            {[...clients, ...clients].map((client, idx) => (
              <li key={idx} className="glass-card w-[200px] h-[120px] flex items-center justify-center rounded-2xl p-4 bg-white/10 hover:bg-white/15 transition-colors">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={160}
                  height={80}
                  className="object-contain w-auto h-auto max-h-[80px]"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
