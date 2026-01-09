import { Montserrat, Lexend, Inter, Outfit, Michroma } from "next/font/google";
import type { Metadata } from "next";
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { AuroraBackground } from "../components/layout/aurora-background";
import { CookieConsent } from "@/components/CookieConsent";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-montserrat" });
const lexend = Lexend({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-lexend" });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-outfit" });
const michroma = Michroma({ subsets: ["latin"], weight: ["400"], variable: "--font-michroma" });

export const metadata: Metadata = {
  title: 'Euro Star Electromechanical',
  description: 'Specialists in electromechanical and fabrication works for the oil field, marine, and other sectors.',
  icons: {
    icon: '/logo.png', // User requested using the logo as favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased text-foreground",
        montserrat.variable,
        lexend.variable,
        inter.variable,
        outfit.variable,
        michroma.variable
      )}>
        <AuroraBackground />
        {children}
        <CookieConsent />
        <Toaster />
      </body>
    </html>
  );
}
