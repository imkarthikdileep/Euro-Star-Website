"use client";

import { SectionTitle } from "@/components/ui/section-title";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-4 md:px-6 container mx-auto">
            <div className="flex flex-col items-center mb-12 text-center">
                <SectionTitle text="PRIVACY" secondaryText="POLICY" />
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-white/95 border border-slate-100 shadow-sm p-8 md:p-12 max-w-4xl mx-auto space-y-8">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold font-michroma text-slate-900">1. Information We Collect</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We collect information you provide directly to us when you use our contact form, including your name, email address, phone number, and any messages you send.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold font-michroma text-slate-900">2. How We Use Your Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We use the information we collect to communicate with you, provided requested services, and improve your experience on our website. We do not sell or share your personal information with third parties for marketing purposes.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold font-michroma text-slate-900">3. Cookies</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We use cookies to enhance your browsing experience and optimize website performance. Specifically:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
                        <li>
                            <strong>Functionality Cookies:</strong> We use a cookie (<code className="bg-slate-100 px-1 rounded text-xs text-slate-700">cookie_consent</code>) to remember your preference regarding our cookie policy, so you don&apos;t see the consent banner repeatedly.
                        </li>
                        <li>
                            <strong>Performance Cookies:</strong> We use a cookie (<code className="bg-slate-100 px-1 rounded text-xs text-slate-700">hero_assets_cached</code>) to track if your browser has already loaded our heavy visual assets (Hero Section). This allows us to serve you a faster, seamless experience on return visits by skipping unnecessary loading sequences.
                        </li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed">
                        You can choose to disable cookies through your browser settings, but this may affect the seamlessness of your experience on our site.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold font-michroma text-slate-900">4. Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us at: <br />
                        <strong>Email:</strong> Info@eurostaremc.com <br />
                        <strong>Address:</strong> Jurf Plaza, Room no 602, Rashidiya 1, Ajman, UAE
                    </p>
                </section>
            </div>
        </main>
    );
}
