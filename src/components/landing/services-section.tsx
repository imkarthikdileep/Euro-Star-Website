"use client";

import { CheckCircle, Users, HardHat, Ship, TestTube, Flame, Hammer, Settings, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import SpotlightCard from "@/components/SpotlightCard";
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
    <section id="services" className="relative z-10" ref={containerRef}>
      {/* Desktop Layout */}
      <div className="hidden md:block py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center mb-16 text-center">
            <SectionTitle text="Our" secondaryText="Services" />
            <p className="text-lg text-white mt-6 max-w-2xl mx-auto font-headline font-medium tracking-tight opacity-80">
              We deliver a complete cycle of services with thorough analysis and well-thought strategies.
            </p>
          </div>

          {/* Services Grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div >
        </div>
      </div>

      {/* Mobile Layout (Carousel) */}
      <div className="md:hidden py-24 px-6 bg-cream relative z-20">
        <div className="flex flex-col justify-between items-end mb-8 border-b border-black/10 pb-6">
          <h2 className="font-serif text-4xl text-charcoal tracking-tight w-full text-left">Our Services</h2>
        </div>

        {/* Carousel Container */}
        <Carousel setApi={setApi} className="w-full" opts={{ align: "start", loop: true }}>
          <CarouselContent className="-ml-4">
            {services.map((service, index) => (
              <CarouselItem key={index} className="pl-4 basis-[85%]">
                <div className="group relative p-8 h-[400px] border border-black/5 bg-white rounded-[2rem] hover:border-black/10 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-lg">
                  {/* Icons - Dark variant for Light Theme */}
                  <div className="w-14 h-14 rounded-full bg-gold/5 flex items-center justify-center mb-6">
                    <div className="text-gold w-7 h-7 stroke-[1.5] [&>svg]:w-full [&>svg]:h-full">
                      {service.icon}
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <h3 className="font-serif text-3xl mb-3 text-gold tracking-wide">{service.title}</h3>
                    <p className="text-base text-charcoal/80 leading-relaxed font-inter font-light">{service.description}</p>
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
                index === current ? "bg-charcoal w-6" : "bg-charcoal/20 hover:bg-charcoal/40"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="service-card h-full relative group/card transition-transform duration-300 ease-out hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
          flex flex-col items-start h-full p-10 transition-all duration-500
          bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem]
          hover:bg-white/10 hover:border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
          relative overflow-hidden
        `}
      >
        {/* Subtle gradient glow on hover */}
        <div className={`absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none`} />

        <div className="relative z-10 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-8 backdrop-blur-md group-hover/card:scale-110 transition-transform duration-500">
          <div className="text-gold h-8 w-8 stroke-[1.5] [&>svg]:h-full [&>svg]:w-full">
            {service.icon}
          </div>
        </div>

        <h3 className="relative z-10 mb-4 text-3xl font-headline text-gold tracking-wide group-hover/card:text-blue-200 transition-colors">
          {service.title}
        </h3>

        <p className="relative z-10 text-gray-400 font-body font-normal text-base leading-relaxed group-hover/card:text-gray-300 transition-colors">
          {service.description}
        </p>
      </div>
    </div>
  );
}
