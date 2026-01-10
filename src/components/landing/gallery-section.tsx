"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/section-title";
import { useState } from "react";
import { X } from "lucide-react";

const galleryImages = [
  { src: "/gallery/image1.png", title: "Piping Systems", id: "01", client: "McDermott" },
  { src: "/gallery/image2.png", title: "Heavy Fabrication", id: "02", client: "Drydocks World" },
  { src: "/gallery/image3.png", title: "Subsea Structure", id: "03", client: "Subsea 7" },
  { src: "/gallery/image4.png", title: "Marine Engineering", id: "04", client: "Lamprell" },
  { src: "/gallery/image5.png", title: "Industrial Plant", id: "05", client: "Petrofac" },
  { src: "/gallery/image6.png", title: "Offshore Platform", id: "06", client: "NPCC" },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section id="gallery" className="relative py-20 md:py-32 bg-transparent section-glow">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="mb-16 md:mb-24 text-left">
          <div className="flex justify-center">
            <SectionTitle text="OUR" secondaryText="WORKS" textSize="text-7xl md:text-8xl" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">

          </p>
        </div>

        {/* Grid (Uniform) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <MasonryCard key={index} image={image} index={index} onClick={() => setSelectedImage(image)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-emerald-400 font-bold mb-1 block text-sm tracking-widest uppercase">
                  {selectedImage.client}
                </span>
                <h3 className="text-2xl font-bold text-white font-lexend">
                  {selectedImage.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const MasonryCard = ({ image, index, onClick }: { image: any, index: number, onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 3, delay: index * 0.1 }}
      className="group hover:!opacity-100 transition-opacity duration-500 will-change-transform h-full"
      onClick={onClick}
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
