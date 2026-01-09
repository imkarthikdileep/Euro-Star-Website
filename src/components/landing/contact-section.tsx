"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/glass/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { handleFormSubmit } from "@/app/actions/contact";

import { SectionTitle } from "@/components/ui/section-title";

// ... (imports)

export function ContactSection() {
    const { toast } = useToast();
    const [state, formAction] = useActionState(handleFormSubmit, {
        success: false,
        message: "",
    });

    useEffect(() => {
        if (state.message) {
            toast({
                title: state.success ? "Success" : "Error",
                description: state.message,
                variant: state.success ? "default" : "destructive",
            });
        }
    }, [state, toast]);

    return (
        <section id="contact" className="py-16 md:py-24 bg-transparent section-glow">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center mb-12 text-center">
                    <SectionTitle text="GET" secondaryText="IN TOUCH" />
                    <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto font-body">
                        We're here to help. Contact us for a consultation or any inquiries.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="h-full"
                    >
                        <Card
                            variant="frosted"
                            className="h-full rounded-[3rem] p-0 border-white/20"
                        >
                            <div className="p-8 md:p-10 flex flex-col h-full w-full relative z-10">
                                <div className="mb-6">
                                    <h3 className="font-headline text-2xl font-bold text-black mb-1">Send us a Message</h3>
                                    <p className="text-slate-700 text-sm">We'll get back to you within 24 hours.</p>
                                </div>

                                <form action={formAction} className="space-y-4 flex-grow flex flex-col">
                                    <Input
                                        name="name"
                                        placeholder="Your Name"
                                        aria-label="Your Name"
                                        required
                                        className="bg-white/10 border-white/20 text-black placeholder:text-slate-600 focus-visible:ring-accent focus-visible:border-accent h-12"
                                    />
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="Your Email"
                                        aria-label="Your Email"
                                        required
                                        className="bg-white/10 border-white/20 text-black placeholder:text-slate-600 focus-visible:ring-accent focus-visible:border-accent h-12"
                                    />
                                    <Textarea
                                        name="message"
                                        placeholder="Your Message..."
                                        aria-label="Your Message"
                                        required
                                        className="bg-white/10 border-white/20 text-black placeholder:text-slate-600 focus-visible:ring-accent focus-visible:border-accent flex-grow resize-none min-h-[150px]"
                                    />
                                    <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-white font-bold h-12 text-lg">Send Message</Button>
                                </form>
                            </div>
                        </Card>
                    </motion.div>

                    <div className="space-y-8 relative z-50">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold font-headline text-primary">Contact Information</h3>
                            <div className="space-y-3 text-muted-foreground">
                                <div className="flex items-center gap-4">
                                    <MapPin className="h-6 w-6 text-teal-700" />
                                    <p>Jurf Plaza, Room no 602, Rashidiya 1, Ajman</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Phone className="h-6 w-6 text-teal-700" />
                                    <div className="flex flex-col w-full relative z-50">
                                        <a href="tel:+971503860061" className="block py-3 relative z-50 cursor-pointer hover:text-accent transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(15,118,110,0.5)]">
                                            +971-50-386-0061
                                        </a>
                                        <a href="tel:+971509142430" className="block py-3 relative z-50 cursor-pointer hover:text-accent transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(15,118,110,0.5)]">
                                            +971-50-914-2430
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="h-6 w-6 text-teal-700 mt-1 flex-shrink-0" />
                                    <div className="flex flex-col">
                                        <Link href="mailto:Info@eurostaremc.com" className="hover:text-accent transition-colors">Info@eurostaremc.com</Link>
                                        <Link href="mailto:Info@kenzuae.com" className="hover:text-accent transition-colors">Info@kenzuae.com</Link>
                                        <Link href="mailto:eurostar014@gmail.com" className="hover:text-accent transition-colors">eurostar014@gmail.com</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg overflow-hidden shadow-lg border group">
                            <a href="https://www.google.com/maps/search/?api=1&query=9FV7%2BC5C" target="_blank" rel="noopener noreferrer" className="block relative">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.333857502444!2d55.46039047588326!3d25.32650077762744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zMjXCsDIzJzM3LjIiTiA1NcKwMjcnNDYuNyJF!5e0!3m2!1sen!2sae!4v1719224484920!5m2!1sen!2sae"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Map of Office Location"
                                    className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                                ></iframe>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
