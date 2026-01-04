import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Cog, HardHat, Ship, TestTube, Truck } from "lucide-react";

const services = [
  {
    icon: <HardHat className="h-10 w-10 text-accent" />,
    title: "Fabrication Works",
    description: "Specialized fabrication for various sectors, handling intricate designs with superior engineering.",
  },
  {
    icon: <TestTube className="h-10 w-10 text-accent" />,
    title: "Oil Field Services",
    description: "Providing expert fabrication and electromechanical solutions for the demanding oil field sector.",
  },
  {
    icon: <Ship className="h-10 w-10 text-accent" />,
    title: "Marine Sector Services",
    description: "High-standard fabrication and engineering for marine applications and infrastructure.",
  },
  {
    icon: <Cog className="h-10 w-10 text-accent" />,
    title: "Project Management",
    description: "Comprehensive project management from implementation to handover with clear objectives.",
  },
  {
    icon: <Truck className="h-10 w-10 text-accent" />,
    title: "Installation & Servicing",
    description: "Ensuring compliance to quality in installation and servicing for all our projects.",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-accent" />,
    title: "Quality Compliance",
    description: "Committed to achieving Quality System certification through rigorous standards and processes.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Our Core Services</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            We deliver a complete cycle of services with thorough analysis and well-thought strategies.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center flex flex-col items-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <CardHeader className="items-center">
                {service.icon}
                <CardTitle className="font-headline text-primary">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
