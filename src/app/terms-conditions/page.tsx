"use client";

import { SectionTitle } from "@/components/ui/section-title";

export default function TermsConditions() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-4 md:px-6 container mx-auto">
            <div className="flex flex-col items-center mb-12 text-center">
                <SectionTitle text="TERMS" secondaryText="& CONDITIONS" />
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-white/95 border border-slate-100 shadow-sm p-8 md:p-12 max-w-4xl mx-auto space-y-8">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold font-michroma text-slate-900">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold font-michroma text-slate-900">2. Intellectual Property</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        All content published and made available on this site is the property of Euro Star Electromechanical Cont. and the site's creators. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our site.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold font-michroma text-slate-900">3. Limitation of Liability</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Euro Star Electromechanical Cont. and our directors, officers, agents, employees, subsidiaries, and affiliates will not be liable for any actions, claims, losses, damages, liabilities and expenses including legal fees from your use of the site.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold font-michroma text-slate-900">4. Cookies & User Data</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        By using our website, you acknowledge and agree to the use of cookies as outlined in our Privacy Policy. These cookies are essential for the optimal functionality and performance of the website, including the caching of visual assets.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold font-michroma text-slate-900">5. Applicable Law</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        These terms and conditions are governed by the laws of the United Arab Emirates.
                    </p>
                </section>
            </div>
        </main>
    );
}
