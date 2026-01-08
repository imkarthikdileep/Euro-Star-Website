"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  { src: "/gallery/image1.png", title: "Piping Systems", id: "01", client: "McDermott" },
  { src: "/gallery/image2.png", title: "Heavy Fabrication", id: "02", client: "Drydocks World" },
  { src: "/gallery/image3.png", title: "Subsea Structure", id: "03", client: "Subsea 7" },
  { src: "/gallery/image4.png", title: "Marine Engineering", id: "04", client: "Lamprell" },
  { src: "/gallery/image5.png", title: "Industrial Plant", id: "05", client: "Petrofac" },
  { src: "/gallery/image6.png", title: "Offshore Platform", id: "06", client: "NPCC" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="relative py-20 md:py-32 bg-transparent section-glow">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="mb-16 md:mb-24 text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 3 }}
            className="text-6xl md:text-7xl font-extrabold font-lexend mb-6"
          >
            <span className="text-transparent" style={{ WebkitTextStroke: "2px #1e293b" }}>OUR</span> <span className="text-slate-900">WORKS</span>
          </motion.h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">

          </p>
        </div>

        {/* Grid (Uniform) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <MasonryCard key={index} image={image} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const MasonryCard = ({ image, index }: { image: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 3, delay: index * 0.1 }}
      className="group hover:!opacity-100 transition-opacity duration-500 will-change-transform h-full"
    >
      <motion.div
        className="relative overflow-hidden rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 h-[400px] cursor-pointer"
        whileHover={{ y: -5 }}
      >
        {/* Image */}
        <Image
          src={image.src}
          alt={image.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Focus Overlay - Slide Up */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col justify-end p-8">
          <span className="text-emerald-400 font-bold mb-2 block text-sm tracking-widest uppercase">
            {image.client}
          </span>
          <h3 className="text-2xl font-bold text-white font-lexend leading-tight">
            {image.title}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
};
