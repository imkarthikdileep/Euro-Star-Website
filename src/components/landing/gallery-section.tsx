import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const galleryImages = [
  { src: "/gallery/image1.png", alt: "Fabrication work" },
  { src: "/gallery/image2.png", alt: "Marine sector project" },
  { src: "/gallery/image3.png", alt: "Oil field equipment" },
  { src: "/gallery/image4.png", alt: "Intricate electromechanical design" },
  { src: "/gallery/image5.png", alt: "Completed project installation" },
  { src: "/gallery/image6.png", alt: "Skilled technicians at work" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Our Works</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            A glimpse into our successfully completed projects and fabrication works.
          </p>
        </div>
        
        <Separator className="my-12 max-w-4xl mx-auto bg-border/50" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div key={index} className="group overflow-hidden rounded-lg shadow-lg">
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
