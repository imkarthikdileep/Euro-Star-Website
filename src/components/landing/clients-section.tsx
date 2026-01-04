import Image from "next/image";

const clients = [
  { name: "Oil Field Supply Centre.", logo: "/clients/oil-field.png" },
  { name: "TEPC", logo: "/clients/tepc.png" },
  { name: "Lamprell", logo: "/clients/lamprell.png" },
  { name: "McDermott", logo: "/clients/mcdermott.png" },
  { name: "Interserve", logo: "/clients/interserve.png" },
  { name: "Fabtech", logo: "/clients/fabtech.png" },
  { name: "Hidayath Heavy Industry", logo: "/clients/hidayath.png" },
  { name: "Mai Dubai", logo: "/clients/mai-dubai.png" },
  { name: "Unique System FZC", logo: "/clients/unique-system.png" },
  { name: "INCO International FZC", logo: "/clients/inco.png" },
  { name: "Armetal", logo: "/clients/armetal.png" },
  { name: "PETRONASH", logo: "/clients/petronash.png" },
];

export function ClientsSection() {
  return (
    <section id="clients" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Our Valued Clients</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            We are proud to have worked with a diverse range of leading companies.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {clients.map((client) => (
            <div key={client.name} className="flex justify-center items-center h-20 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <Image
                src={client.logo}
                alt={`${client.name} Logo`}
                width={120}
                height={60}
                className="object-contain max-h-full max-w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
