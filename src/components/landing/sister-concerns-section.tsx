"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { SisterConcernCard } from "@/components/ui/SisterConcernCard";
import Image from "next/image";

export function SisterConcernsSection() {
    return (
        <section className="relative py-24 px-4 md:px-6 w-full max-w-7xl mx-auto z-10">
            <div className="mb-16 text-center">
                <SectionTitle text="SISTER" secondaryText="CONCERNS" />
                <p className="text-slate-600 max-w-2xl mx-auto text-lg mt-6">
                    Expanding our horizon through specialized entities delivering excellence across trading and technical services.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto align-start">
                <SisterConcernCard
                    name="Kenz Hiraa General Trading LLC"
                    role="General Trading"
                    description="A premier trading house specializing in the import and trading ofgeneral consumer goods across the region."
                    detailedDescription="A leading supplier of high-quality industrial food ingredients. We specialize in the commercial supply of mixed fruit jams, tutti frutti, and essential commodities like mayonnaise and milk powder to major bakeries and food industries across the region."
                    logo={
                        <div className="relative w-32 h-32 md:w-40 md:h-40">
                            <Image
                                src="/Kenz-logo.png"
                                alt="Kenz Hiraa General Trading LLC Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    }
                    accentColor="#f97316" // Orange-500
                />

                <SisterConcernCard
                    name="Kenz Technical Services LLC"
                    role="Technical Services"
                    description="Dedicated to providing top-tier technical solutions, maintenance services, and specialized engineering support for large-scale industrial and commercial projects."
                    detailedDescription="Mirroring the engineering excellence of Euro Star, we provide comprehensive technical maintenance and on-site support. Our expertise covers electromechanical systems, marine fabrication, manpower supply and specialized oil field services for large-scale infrastructure."
                    logo={
                        <div className="relative w-48 h-32 md:w-72 md:h-40">
                            <Image
                                src="/Kenz-technical-logo.png"
                                alt="Kenz Technical Services LLC Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    }
                    accentColor="#0d9488" // Teal-600
                />
            </div>
        </section >
    );
}
