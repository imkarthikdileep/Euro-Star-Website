"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

async function handleFormSubmit(
  prevState: any,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  console.log("--- New Contact Form Submission ---");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);
  console.log("------------------------------------");

  // Here you would typically send an email using a service like Nodemailer, Resend, or SendGrid.
  // For this example, we'll just return a success message.

  if (name && email && message) {
    return { success: true, message: "Your message has been sent successfully!" };
  } else {
    return { success: false, message: "Please fill out all fields." };
  }
}

export function ContactSection() {
    const { toast } = useToast();
    const [state, formAction] = useFormState(handleFormSubmit, {
        success: false,
        message: "",
    });

    useEffect(() => {
        if (state.message) {
            toast({
                title: state.success ? "Success!" : "Error",
                description: state.message,
                variant: state.success ? "default" : "destructive",
            });
        }
    }, [state, toast]);


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
                    <form action={formAction} className="space-y-4">
                        <Input name="name" placeholder="Your Name" aria-label="Your Name" required />
                        <Input name="email" type="email" placeholder="Your Email" aria-label="Your Email" required />
                        <Textarea name="message" placeholder="Your Message" rows={5} aria-label="Your Message" required />
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
                            <p>Jurf Plaza, Room no 602, Rashidiya 1, Ajman</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Phone className="h-6 w-6 text-accent" />
                            <p>06-5243252</p>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                            <div className="flex flex-col">
                                <Link href="mailto:Info@eurostaremc.com" className="hover:text-accent transition-colors">Info@eurostaremc.com</Link>
                                <Link href="mailto:Info@kenzuae.com" className="hover:text-accent transition-colors">Info@kenzuae.com</Link>
                                <Link href="mailto:eurostar014@gmail.com" className="hover:text-accent transition-colors">eurostar014@gmail.com</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg overflow-hidden shadow-lg border group">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.8394939958!2d55.48000931501316!3d25.37688268381304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f58595a7019c9%3A0x83f54519196b0521!2sJurf%20Plaza!5e0!3m2!1sen!2sae!4v1678886000000!5m2!1sen!2sae"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map of Jurf Plaza"
                        className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                    ></iframe>
                </div>
            </div>
          </div>
        </div>
      </section>
    );
}