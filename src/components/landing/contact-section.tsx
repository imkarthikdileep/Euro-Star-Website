"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { handleFormSubmit } from "@/app/actions/contact";
import { SectionTitle } from "@/components/ui/section-title";
import { Card } from "@/components/ui/glass/card";

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

    const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=25.3936623,55.4629654";

    return (
        <section id="contact" className="py-24 relative z-10 overflow-hidden bg-[#1A3C34] lg:bg-transparent">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Desktop Header */}
                <div className="hidden lg:flex flex-col items-center mb-16 text-center">
                    <SectionTitle text="Get" secondaryText="In Touch" />
                    <p className="text-lg text-white mt-6 max-w-2xl mx-auto font-headline font-medium tracking-tight opacity-80">
                        We&apos;re here to help. Contact us for a consultation or any inquiries.
                    </p>
                </div>

                {/* Mobile Message Section (Seamless Flat Design) */}
                <div className="lg:hidden py-4 px-2 relative z-20">
                    <div className="mb-10">
                        <span className="text-gold text-xs uppercase tracking-widest font-medium mb-3 block">CONTACT</span>
                        <h3 className="text-4xl font-serif text-white mb-2">Work With Us.</h3>
                    </div>

                    <form action={formAction} className="space-y-8">
                        <div>
                            <input
                                name="name"
                                required
                                type="text"
                                placeholder="Name"
                                className="w-full bg-transparent border-b border-white/20 rounded-none px-0 py-4 text-white placeholder-white/40 focus:outline-none focus:border-gold transition-all duration-300 font-light text-lg"
                            />
                        </div>
                        <div>
                            <input
                                name="phone"
                                type="tel"
                                placeholder="Phone"
                                className="w-full bg-transparent border-b border-white/20 rounded-none px-0 py-4 text-white placeholder-white/40 focus:outline-none focus:border-gold transition-all duration-300 font-light text-lg"
                            />
                        </div>
                        <div>
                            <input
                                name="email"
                                required
                                type="email"
                                placeholder="Email"
                                className="w-full bg-transparent border-b border-white/20 rounded-none px-0 py-4 text-white placeholder-white/40 focus:outline-none focus:border-gold transition-all duration-300 font-light text-lg"
                            />
                        </div>
                        <div>
                            <textarea
                                name="message"
                                required
                                placeholder="Message"
                                className="w-full bg-transparent border-b border-white/20 rounded-none px-0 py-4 text-white placeholder-white/40 focus:outline-none focus:border-gold transition-all duration-300 font-light resize-none min-h-[100px] text-lg"
                            ></textarea>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-transparent border border-white/20 text-white font-medium text-sm uppercase tracking-widest h-14 rounded-full mt-8 hover:bg-gold hover:text-charcoal hover:border-gold transition-all duration-300"
                        >
                            Send Message
                        </Button>
                    </form>
                </div>

                {/* Desktop Grid Layout */}
                <div className="hidden lg:grid gap-12 lg:grid-cols-2 items-start max-w-6xl mx-auto">
                    {/* Left Column: Contact Info & Visit Us */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-8"
                    >
                        <Card variant="glass" className="p-8 md:p-12 rounded-[2.5rem] bg-[#1a1a1a]/80 border-white/10 backdrop-blur-md">
                            <h3 className="text-3xl font-serif text-white mb-8">Contact Information</h3>

                            <div className="space-y-8">
                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300 shrink-0">
                                        <MapPin className="h-5 w-5 text-gold" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm uppercase tracking-wider mb-1">Address</p>
                                        <p className="text-white text-lg font-light">Jurf Plaza, Room no 602,<br />Rashidiya 1, Ajman, UAE</p>
                                        <a
                                            href={googleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-gold mt-4 text-sm font-medium hover:underline underline-offset-4 tracking-wide"
                                        >
                                            Visit Us on Maps <ArrowUpRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300 shrink-0">
                                        <Phone className="h-5 w-5 text-gold" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm uppercase tracking-wider mb-1">Phone</p>
                                        <div className="flex flex-col gap-1">
                                            <a href="tel:+971503860061" className="text-white text-lg font-light hover:text-gold transition-colors">+971 50 386 0061</a>
                                            <a href="tel:+971509142430" className="text-white text-lg font-light hover:text-gold transition-colors">+971 50 914 2430</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300 shrink-0">
                                        <Mail className="h-5 w-5 text-gold" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm uppercase tracking-wider mb-1">Email</p>
                                        <div className="flex flex-col gap-1">
                                            <a href="mailto:eurostar014@gmail.com" className="text-white text-lg font-light hover:text-gold transition-colors">eurostar014@gmail.com</a>
                                            <a href="mailto:Info@kenzuae.com" className="text-white text-lg font-light hover:text-gold transition-colors">Info@kenzuae.com</a>
                                            <a href="mailto:info@eurostar-emc.com" className="text-white text-lg font-light hover:text-gold transition-colors">info@eurostar-emc.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Right Column: Message Form (Hidden on Mobile - wait, currently handled by parent hidden) */}
                    {/* Actually, right column was only hidden md:block in ORIGINAL. 
                        Now I'm wrapping BOTH columns in `hidden md:grid`. 
                        So I need to remove the `hidden md:block` from the inner right column component to avoid double hiding if desktop needs it.
                        Wait, original line 106 was `hidden md:block`. 
                        If I wrap the whole grid in `hidden md:grid`, I don't need `hidden md:block` on the right column child anymore, 
                        BUT the left column WAS visible on mobile before. 
                        The request is to "remove contact section in 1st image [left column info] and use 2nd image [form] for mobile".
                        So yes, the entire Desktop Grid (Left + Right columns) should be HIDDEN on mobile now.
                        And the NEW Mobile Form takes its place.
                    */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full"
                    >
                        <Card variant="glass" className="h-full p-8 md:p-12 rounded-[2.5rem] bg-[#1a1a1a]/90 border-white/10 backdrop-blur-md shadow-2xl">
                            <h3 className="text-3xl font-serif text-white mb-2">Send us a Message</h3>
                            <p className="text-white/60 mb-8 font-light">We&apos;ll get back to you within 24 hours.</p>

                            <form action={formAction} className="space-y-6">
                                <div>
                                    <input
                                        name="name"
                                        required
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all duration-300 font-light"
                                    />
                                </div>
                                <div>
                                    <input
                                        name="email"
                                        required
                                        type="email"
                                        placeholder="Your Email"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all duration-300 font-light"
                                    />
                                </div>
                                <div>
                                    <textarea
                                        name="message"
                                        required
                                        placeholder="Your Message..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all duration-300 font-light resize-none min-h-[160px]"
                                    ></textarea>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gold hover:bg-gold/90 text-charcoal font-medium text-lg h-14 rounded-xl mt-4 tracking-wide shadow-lg hover:shadow-gold/20 transition-all duration-300"
                                >
                                    Send Message
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
