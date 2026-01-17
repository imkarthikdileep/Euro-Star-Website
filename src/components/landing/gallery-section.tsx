"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Maximize2, ArrowLeft, ArrowRight, X } from "lucide-react";
import { createPortal } from "react-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// Imports removed

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Recreated data with placeholders - User to update text
const galleryImages = [
  {
    src: "/gallery/image1.png"
  },
  {
    src: "/gallery/image2.png"
  },
  {
    src: "/gallery/image3.png"
  },
  {
    src: "/gallery/image4.png"
  },
  {
    src: "/gallery/image5.png"
  },
  {
    src: "/gallery/image6.png"
  },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-24 bg-[#F9F8F4] overflow-hidden relative z-40 w-full" id="gallery">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gold/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif md:font-headline mb-6"
            >
              <span className="text-[#000000]">Featured</span> <span className="text-[#D4AF37] italic md:not-italic gold-noise">Projects</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#000000] text-base md:text-lg font-sans md:font-body font-light"
            >
              Explore our portfolio of precision engineering.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex gap-4"
          >
            {/* Custom Navigation Buttons will be hooked up via Carousel context or just visual cues if using built-in nav */}
          </motion.div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {galleryImages.map((image, index) => (
              <CarouselItem key={index} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                <GalleryCard
                  image={image}
                  index={index}
                  onClick={() => setSelectedImage(image)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-8 md:mt-12 pr-4">
            <CarouselPrevious className="static translate-y-0 translate-x-0 h-12 w-12 border-black/10 bg-black/5 hover:bg-gold hover:text-black hover:border-gold transition-colors text-black" />
            <CarouselNext className="static translate-y-0 translate-x-0 h-12 w-12 border-black/10 bg-black/5 hover:bg-gold hover:text-black hover:border-gold transition-colors text-black" />
          </div>
        </Carousel>
      </div>

      {
        mounted && createPortal(
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                onClick={() => setSelectedImage(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full max-w-6xl h-[85vh] rounded-xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={selectedImage.src}
                      alt="Project Preview"
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 bg-gradient-to-t from-black via-black/80 to-transparent">
                  </div>

                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-colors z-20"
                  >
                    <X size={20} />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )
      }
    </section >
  );
}

const GalleryCard = ({ image, index, onClick }: { image: any, index: number, onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-[450px] w-full cursor-pointer relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
      onClick={onClick}
    >
      <Image
        src={image.src}
        alt={`Project ${index + 1}`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 opacity-100 transition-opacity">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex justify-between items-end">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white bg-white/10 backdrop-blur-sm group-hover:bg-gold group-hover:text-charcoal group-hover:border-gold transition-all duration-300 opacity-0 group-hover:opacity-100">
              <Maximize2 size={18} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
