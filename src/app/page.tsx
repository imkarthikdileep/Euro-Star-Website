import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { ServicesSection } from "@/components/landing/services-section";
import { AboutSection } from "@/components/landing/about-section";
import { ClientsSection } from "@/components/landing/clients-section";
import { ContactSection } from "@/components/landing/contact-section";
import WhatsAppFab from "@/components/whatsapp-fab";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ClientsSection />
        <ContactSection />
      </main>
      <WhatsAppFab />
      <Footer />
    </div>
  );
}
