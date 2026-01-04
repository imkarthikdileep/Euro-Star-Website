import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactSection() {
    const mapImage = PlaceHolderImages.find(p => p.id === 'map-location');

    return (
      <section id="contact" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              We're here to help. Contact us for a consultation or any inquiries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-primary">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <Input placeholder="Your Name" aria-label="Your Name" />
                        <Input type="email" placeholder="Your Email" aria-label="Your Email" />
                        <Textarea placeholder="Your Message" rows={5} aria-label="Your Message" />
                        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Send Message</Button>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold font-headline text-primary">Contact Information</h3>
                    <div className="space-y-3 text-muted-foreground">
                        <div className="flex items-center gap-4">
                            <MapPin className="h-6 w-6 text-accent" />
                            <p>P.O Box: 13465, Ajman, U.A.E</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Phone className="h-6 w-6 text-accent" />
                            <p>06-5243252</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Mail className="h-6 w-6 text-accent" />
                            <p>info@eurostaremc.com</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg overflow-hidden shadow-lg border">
                    {mapImage && (
                        <Image
                            src={mapImage.imageUrl}
                            alt={mapImage.description}
                            width={800}
                            height={600}
                            className="w-full h-auto aspect-[4/3] object-cover"
                            data-ai-hint={mapImage.imageHint}
                        />
                    )}
                </div>
            </div>
          </div>
        </div>
      </section>
    );
}
