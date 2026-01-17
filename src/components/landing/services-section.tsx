"use client";

import { CheckCircle, Users, HardHat, Ship, TestTube, Flame, Hammer, Settings, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import ChromaGrid from "@/components/ChromaGrid";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <HardHat />,
    title: "Fabrication Works",
    description: "Specialized fabrication for various sectors, handling intricate designs with superior engineering.",
  },
  {
    icon: <TestTube />,
    title: "Oil Field Supply",
    description: "Providing expert fabrication and technical supply solutions for the demanding oil field sector.",
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
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  useGSAP(() => {
    const cards = gridRef.current?.querySelectorAll('.service-card');
    if (cards && cards.length > 0) {
      gsap.fromTo(cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section id="services" className="relative z-40" ref={containerRef}>
      {/* Desktop Layout */}
      <div className="hidden lg:block py-16 md:py-24 bg-[#F9F8F4]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center mb-16 text-center">
            {/* Manual Title matching the requested style "Our" (Black) "Services" (Gold) */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif md:font-headline mb-4">
              <span className="text-[#000000]">Our</span> <span className="text-[#D4AF37] gold-noise">Services</span>
            </h2>
            <p className="text-lg text-[#000000]/80 mt-6 max-w-2xl mx-auto font-headline font-medium tracking-tight">
              We deliver a complete cycle of services with thorough analysis and well-thought strategies.
            </p>
          </div>

          {/* Services Grid with Chroma Effect */}
          <div className="h-[auto] min-h-[800px] w-full relative z-10">
            <ChromaGrid
              items={services.map(s => ({
                icon: s.icon,
                title: s.title,
                description: s.description,
                image: "", // Not used
                subtitle: "", // Not used
                borderColor: "#D4AF37",
                gradient: "transparent"
              }))}
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout (Carousel) - Optimized for Tablet */}
      <div className="lg:hidden py-24 px-6 bg-[#F9F8F4] relative z-20">
        <div className="flex flex-col justify-between items-end mb-8 border-b border-black/10 pb-6">
          <h2 className="font-serif text-4xl text-[#000000] tracking-tight w-full text-left">Our <span className="text-[#D4AF37]">Services</span></h2>
        </div>

        {/* Carousel Container */}
        <Carousel setApi={setApi} className="w-full" opts={{ align: "start", loop: true }}>
          <CarouselContent className="-ml-4">
            {services.map((service, index) => (
              <CarouselItem key={index} className="pl-4 basis-[85%] md:basis-[45%]">
                <div className="group relative p-8 h-[400px] border border-black/10 bg-white rounded-[2rem] hover:border-black/20 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-lg">
                  {/* Icons - Dark variant for Light Theme */}
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                    <div className="text-gold w-7 h-7 stroke-[1.5] [&>svg]:w-full [&>svg]:h-full">
                      {service.icon}
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <h3 className="font-serif text-3xl mb-3 text-gold tracking-wide">{service.title}</h3>
                    <p className="text-base text-[#000000] leading-relaxed font-inter font-light">{service.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === current ? "bg-black w-6" : "bg-black/20 hover:bg-black/40"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
