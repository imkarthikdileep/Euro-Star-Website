"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { handleFormSubmit } from "@/app/actions/contact";


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
        <section id="contact" className="py-24 relative z-40 overflow-hidden bg-[#1A3C34] md:rounded-t-[3.5rem]">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Desktop Header */}


                {/* Mobile Message Section (Seamless Flat Design) - Optimized for Tablet */}
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
                <div className="hidden lg:grid gap-20 lg:grid-cols-2 items-start max-w-6xl mx-auto pt-10">

                    {/* Left Column: Message Form (MOVED HERE) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-10"
                    >
                        <div>
                            <span className="text-gold text-xs uppercase tracking-widest font-medium mb-3 block">MESSAGE</span>
                            <h3 className="text-5xl md:text-6xl font-headline font-medium text-white mb-6 tracking-tight leading-none">Send us a Message</h3>
                            <p className="text-white/60 text-lg font-light max-w-md">We&apos;re here to help. Contact us for a consultation or any inquiries.</p>
                        </div>

                        <form action={formAction} className="space-y-10">
                            <div className="grid grid-cols-2 gap-10">
                                <div>
                                    <input
                                        name="name"
                                        required
                                        type="text"
                                        placeholder="Name"
                                        className="w-full bg-[#FFFFFF]/5 border-none rounded-none px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300 font-light text-lg"
                                    />
                                </div>
                                <div>
                                    <input
                                        name="email"
                                        required
                                        type="email"
                                        placeholder="Email"
                                        className="w-full bg-[#FFFFFF]/5 border-none rounded-none px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300 font-light text-lg"
                                    />
                                </div>
                            </div>
                            <div>
                                <input
                                    name="phone"
                                    type="tel"
                                    placeholder="Phone"
                                    className="w-full bg-[#FFFFFF]/5 border-none rounded-none px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300 font-light text-lg"
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    required
                                    placeholder="Message"
                                    className="w-full bg-[#FFFFFF]/5 border-none rounded-none px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300 font-light resize-none min-h-[120px] text-lg"
                                ></textarea>
                            </div>

                            <Button
                                type="submit"
                                className="bg-transparent border border-white/20 text-white font-medium text-sm uppercase tracking-widest h-14 px-10 rounded-full mt-4 hover:bg-gold hover:text-charcoal hover:border-gold transition-all duration-300"
                            >
                                Send Message
                            </Button>
                        </form>
                    </motion.div>

                    {/* Right Column: Contact Info (MOVED HERE) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="space-y-12 pl-12"
                    >
                        <div>
                            <span className="text-gold text-xs uppercase tracking-widest font-medium mb-3 block">GET IN TOUCH</span>
                            <h3 className="text-5xl md:text-6xl font-headline font-medium text-white mb-2 tracking-tight leading-none">Contact Info.</h3>
                        </div>

                        <div className="space-y-12">
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300 shrink-0">
                                    <MapPin className="h-6 w-6 text-gold" />
                                </div>
                                <div>
                                    <p className="text-white/60 text-xs uppercase tracking-wider mb-2">ADDRESS</p>
                                    <p className="text-white text-xl font-light leading-relaxed">Jurf Plaza, Room no 602,<br />Rashidiya 1, Ajman, UAE</p>
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

                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300 shrink-0">
                                    <Phone className="h-6 w-6 text-gold" />
                                </div>
                                <div>
                                    <p className="text-white/60 text-xs uppercase tracking-wider mb-2">PHONE</p>
                                    <div className="flex flex-col gap-2">
                                        <a href="tel:+971503860061" className="text-white text-xl font-light hover:text-gold transition-colors">+971 50 386 0061</a>
                                        <a href="tel:+971509142430" className="text-white text-xl font-light hover:text-gold transition-colors">+971 50 914 2430</a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300 shrink-0">
                                    <Mail className="h-6 w-6 text-gold" />
                                </div>
                                <div>
                                    <p className="text-white/60 text-xs uppercase tracking-wider mb-2">EMAIL</p>
                                    <div className="flex flex-col gap-2">
                                        <a href="mailto:eurostar014@gmail.com" className="text-white text-xl font-light hover:text-gold transition-colors">eurostar014@gmail.com</a>
                                        <a href="mailto:Info@kenzuae.com" className="text-white text-xl font-light hover:text-gold transition-colors">Info@kenzuae.com</a>
                                        <a href="mailto:info@eurostaremc.com" className="text-white text-xl font-light hover:text-gold transition-colors">info@eurostaremc.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
