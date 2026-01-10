import { Montserrat, Lexend, Inter, Outfit, Michroma, Jost } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { AuroraBackground } from "../components/layout/aurora-background";
import { CookieConsent } from "@/components/CookieConsent";

import { Analytics } from "@vercel/analytics/next";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-montserrat" });
const lexend = Lexend({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-lexend" });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-outfit" });
const michroma = Michroma({ subsets: ["latin"], weight: ["400"], variable: "--font-michroma" });
const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-jost" });

export const metadata: Metadata = {
  title: 'Euro Star Electromechanical',
  description: "UAE's trusted partner for industrial manpower and fabrication since 2014.",
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.eurostaremc.com/',
    title: 'Euro Star Electromechanical',
    description: 'Providing elite technical workforces for Marine, Oil & Gas, and Heavy Industries.',
    siteName: 'Euro Star Electromechanical',
    images: [{
      url: '/logo.png',
    }],
  },
  twitter: {
    card: 'summary',
    title: 'Euro Star Electromechanical',
    description: "UAE's trusted partner for industrial manpower and fabrication since 2014.",
    images: ['/logo.png'],
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
        michroma.variable,
        jost.variable
      )}>
        <AuroraBackground />
        {children}
        <CookieConsent />
        <Toaster />
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N4FH3QL47G"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-N4FH3QL47G');
          `}
        </Script>
      </body>
    </html>
  );
}
