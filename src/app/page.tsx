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
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AnimateOnScroll>
          <ServicesSection />
        </AnimateOnScroll>
        <AnimateOnScroll>
          <AboutSection />
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
      <Footer />
    </div>
  );
}
