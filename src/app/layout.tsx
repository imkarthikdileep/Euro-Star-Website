import localFont from "next/font/local";
import { Inter, Outfit, Michroma, Jost, Playfair_Display, Italianno } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { AuroraBackground } from "../components/layout/aurora-background";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsent } from "@/components/CookieConsent";

import { Analytics } from "@vercel/analytics/next";

import JsonLd from "@/components/json-ld";
import SmoothScroll from "@/components/SmoothScroll";

// Local Fonts
const stardom = localFont({
  src: '../../public/fonts/Stardom-Regular.woff2',
  variable: '--font-stardom',
  display: 'swap',
});

const switzer = localFont({
  src: [
    {
      path: '../../public/fonts/Switzer-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Switzer-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Switzer-Semibold.woff2',
      weight: '600',
      style: 'normal',
    }
  ],
  variable: '--font-switzer',
  display: 'swap',
});

const geist = localFont({
  src: '../../public/fonts/Geist-Medium.ttf',
  variable: '--font-geist',
  weight: '500',
  display: 'swap',
});

// Keep existing Google fonts that might be used elsewhere for now, or remove if fully replacing.
// Keeping strictly necessary ones based on user request to switch to Stardom/Switzer.
// User said: "change the fonts to stardom for all titile and compnay name and switzer for contents"
// So standardizing on these two is the goal.

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-inter" });
// const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-outfit" }); // Replaced by Stardom/Switzer concept
// const michroma = Michroma({ subsets: ["latin"], weight: ["400"], variable: "--font-michroma" });
const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-jost" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-playfair-display", style: ['normal', 'italic'] });
const italianno = Italianno({ subsets: ["latin"], weight: ["400"], variable: "--font-italianno" });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.eurostaremc.com'),
  title: 'Euro Star Electromechanical',
  description: "UAE's trusted partner for industrial manpower and fabrication since 2010.",
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
      url: '/preview_logo.jpg',
    }],
  },
  twitter: {
    card: 'summary',
    title: 'Euro Star Electromechanical',
    description: "UAE's trusted partner for industrial manpower and fabrication since 2010.",
    images: ['/preview_logo.jpg'],
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
        stardom.variable,
        switzer.variable,
        geist.variable,
        inter.variable, // Keep as fallback/utility
        jost.variable,
        playfair.variable,
        italianno.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="hidden md:block">
            <AuroraBackground />
          </div>
          <SmoothScroll />
          {children}
          <CookieConsent />
          <Toaster />
          <Analytics />
        </ThemeProvider>
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
        <JsonLd />
      </body>
    </html>
  );
}
