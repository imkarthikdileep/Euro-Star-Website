import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, TrendingUp, Building, ShieldCheck, Handshake } from "lucide-react";

const services = [
  {
    icon: <Briefcase className="h-10 w-10 text-accent" />,
    title: "Executive Search",
    description: "Finding top-tier leadership to steer your company towards success in the competitive UAE market.",
  },
  {
    icon: <Users className="h-10 w-10 text-accent" />,
    title: "Mass Recruitment",
    description: "Efficiently sourcing and placing large volumes of qualified Emirati candidates for your projects.",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-accent" />,
    title: "Career Development",
    description: "Nurturing national talent through tailored training programs and career progression planning.",
  },
  {
    icon: <Building className="h-10 w-10 text-accent" />,
    title: "Emiratisation Consulting",
    description: "Strategic guidance to help you meet and exceed your Emiratisation targets effectively.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-accent" />,
    title: "Visa & PRO Services",
    description: "Streamlining the legal and administrative processes for hiring and managing your workforce.",
  },
  {
    icon: <Handshake className="h-10 w-10 text-accent" />,
    title: "HR Outsourcing",
    description: "Comprehensive HR management solutions, allowing you to focus on your core business.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Our Core Services</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            We provide a comprehensive suite of services to meet all your staffing needs.
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
