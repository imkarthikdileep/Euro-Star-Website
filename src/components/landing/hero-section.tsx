import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  
  return (
    <section id="home" className="relative h-[80vh] min-h-[500px] w-full flex items-center justify-center text-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-primary/70" />
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 font-headline drop-shadow-md">
          Specialists in Electromechanical & Fabrication Works
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/90 mb-8 drop-shadow">
          Delivering high standards and superior engineering skill in the Oil, Marine, and other industrial sectors.
        </p>
        <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="#contact">Get a Quote</Link>
        </Button>
      </div>
    </section>
  );
}
