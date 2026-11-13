import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { ServicesSection } from "@/components/landing/services-section";
import { AboutSection } from "@/components/landing/about-section";
import { ClientsSection } from "@/components/landing/clients-section";
import { ContactSection } from "@/components/landing/contact-section";
import WhatsAppFab from "@/components/whatsapp-fab";
import { StatsSection } from "@/components/landing/stats-section";
import { GallerySection } from "@/components/landing/gallery-section";
import { SisterConcernsSection } from "@/components/landing/sister-concerns-section";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Preloader */}
      <Preloader />

      {/* Global Background */}
      <div className="fixed inset-0 z-[-1] bg-[#101010] pointer-events-none" />

      <Header />

      <main className="flex-grow flex flex-col gap-0 relative">
        <HeroSection />

        {/* Cream content wrapper that slides OVER the sticky hero (z-20 > z-10) */}
        <div className="relative z-20 bg-[#F9F9F7]" data-header-theme="light">
          <AboutSection />
          <ServicesSection />
          <SisterConcernsSection />
          <StatsSection />
          <ClientsSection />
          <GallerySection />
        </div>

        {/* Contact Section: Dark Emerald (z-20) */}
        <div className="relative z-20 bg-[#1A3C34]" data-header-theme="dark">
          <ContactSection />
        </div>
      </main>

      <WhatsAppFab />
      <Footer />
    </div>
  );
}
