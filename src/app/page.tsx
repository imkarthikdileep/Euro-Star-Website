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
import Aurora from "@/components/Aurora";
import { PageScrollBlur } from "@/components/PageScrollBlur";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Aurora Background - Fixed & Global */}
      <div className="fixed inset-0 z-[-1] opacity-70 pointer-events-none">
        <Aurora
          colorStops={["#0061ff", "#60efff", "#0061ff"]}
          speed={0.5}
          amplitude={1.2}
        />
      </div>

      <Header />

      <main className="flex-grow flex flex-col gap-0">
        <HeroSection />

        <AnimateOnScroll>
          <ServicesSection />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <AboutSection />
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
