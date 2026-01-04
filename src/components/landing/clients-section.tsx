import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const clients = [
  "Oil Field Supply Centre.",
  "TEPC (Noor Energy -1 Project) Al Qudra",
  "Lamperell Energy Ltd, UAE",
  "McDermott Middle East Inc., UAE",
  "Interseve Engineering & Construction LTD.",
  "Fabtech International Ltd.",
  "Hidayath Heavy Industry LLC",
  "Mai Dubai, UAE",
  "Unique System FZC",
  "INCO International FZC",
  "Armetal Metal Industries LLC.",
  "PETRONASH FZC",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client, index) => (
            <Card key={index} className="bg-card">
              <CardContent className="flex items-center gap-4 p-4">
                <Star className="h-6 w-6 text-accent flex-shrink-0" />
                <p className="text-card-foreground font-medium">{client}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
