import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { ServicesSection } from "@/components/landing/services-section";
import { AboutSection } from "@/components/landing/about-section";
import { ClientsSection } from "@/components/landing/clients-section";
import { ContactSection } from "@/components/landing/contact-section";
import WhatsAppFab from "@/components/whatsapp-fab";
import { StatsSection } from "@/components/landing/stats-section";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { GallerySection } from "@/components/landing/gallery-section";
import { SisterConcernsSection } from "@/components/landing/sister-concerns-section";
import { PageScrollBlur } from "@/components/PageScrollBlur";
import Preloader from "@/components/Preloader";
import LiquidTransition from "@/components/LiquidTransition";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Desktop Preloader */}
      <div className="hidden md:block">
        <Preloader />
      </div>

      {/* Liquid Scroll Transition Overlay (Desktop) */}
      <LiquidTransition />

      {/* Global Background */}
      <div className="fixed inset-0 z-[-1] bg-[#101010] pointer-events-none" />

      <Header />

      <main className="flex-grow flex flex-col gap-0">
        <HeroSection />

        <AnimateOnScroll>
          <AboutSection />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <ServicesSection />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <SisterConcernsSection />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <StatsSection />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <ClientsSection />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <GallerySection />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <ContactSection />
        </AnimateOnScroll>
      </main>

      <WhatsAppFab />
      <PageScrollBlur />
      <Footer />
    </div>
  );
}
