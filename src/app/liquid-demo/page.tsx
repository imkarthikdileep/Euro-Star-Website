import LiquidTransition from "@/components/LiquidTransition";

export default function LiquidDemoPage() {
    return (
        <main className="w-full min-h-screen bg-black overflow-hidden">
            {/* Desktop Only Notice for Devs/Users checking on mobile */}
            <div className="md:hidden w-full h-screen flex items-center justify-center text-white p-4 text-center">
                This demo is optimized for Desktop only. Please view on a larger screen.
            </div>

            <LiquidTransition />
        </main>
    );
}
