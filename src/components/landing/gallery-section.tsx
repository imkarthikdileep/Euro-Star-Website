import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const galleryImages = [
  { src: "/gallery/work-1.jpg", alt: "Fabrication work" },
  { src: "/gallery/work-2.jpg", alt: "Marine sector project" },
  { src: "/gallery/work-3.jpg", alt: "Oil field equipment" },
  { src: "/gallery/work-4.jpg", alt: "Intricate electromechanical design" },
  { src: "/gallery/work-5.jpg", alt: "Completed project installation" },
  { src: "/gallery/work-6.jpg", alt: "Skilled technicians at work" },
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
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg aspect-w-4 aspect-h-3">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover w-full h-full transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <p className="text-white text-center font-semibold text-lg">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
