import type { ReactNode } from "react";
import localFont from "next/font/local";
import type { Metadata } from "next";
import Script from "next/script";
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsent } from "@/components/CookieConsent";

import { Analytics } from "@vercel/analytics/next";

import JsonLd from "@/components/json-ld";
import SmoothScroll from "@/components/SmoothScroll";
import { GoldNoiseSVG } from "@/components/GoldNoiseSVG";

// Local Fonts
const mighaDisplay = localFont({
  src: '../../public/fonts/Migha-BoldCondensed.otf',
  variable: '--font-migha-display',
  weight: '700',
  display: 'swap',
});

const mighaWide = localFont({
  src: '../../public/fonts/Migha-MediumExpanded.otf',
  variable: '--font-migha-wide',
  weight: '500',
  display: 'swap',
});

const mighaText = localFont({
  src: '../../public/fonts/Migha-MediumCondensed.otf',
  variable: '--font-migha-text',
  weight: '500',
  display: 'swap',
});

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

export const metadata: Metadata = {
  metadataBase: new URL('https://www.eurostaremc.com'),
  title: 'Euro Star Electromechanical | Structural Steel Fabrication & MEP in Ajman, UAE',
  description: 'Precision electromechanical contracting, structural steel fabrication, TIG/arc welding, and certified manpower solutions based in Ajman, UAE. Est. 2010.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
  alternates: {
    canonical: 'https://eurostaremc.com/',
  },
  openGraph: {
    type: 'website',
    url: 'https://eurostaremc.com/',
    title: 'Euro Star Electromechanical | Structural Steel Fabrication & MEP in Ajman, UAE',
    description: 'Precision electromechanical contracting, structural steel fabrication, TIG/arc welding, and certified manpower solutions based in Ajman, UAE. Est. 2010.',
    siteName: 'Euro Star Electromechanical',
    images: [{
      url: '/preview_logo.jpg',
      width: 1200,
      height: 630,
      alt: 'Euro Star Electromechanical — Industrial & Steel Fabrication UAE',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Euro Star Electromechanical | Structural Steel Fabrication & MEP in Ajman, UAE',
    description: 'Precision electromechanical contracting, structural steel fabrication, TIG/arc welding, and certified manpower solutions based in Ajman, UAE. Est. 2010.',
    images: ['/preview_logo.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased text-foreground",
        mighaDisplay.variable,
        mighaWide.variable,
        mighaText.variable,
        stardom.variable,
        switzer.variable,
        geist.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
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
        <GoldNoiseSVG />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              setTimeout(function() {
                var p = document.getElementById('pl') || document.getElementById('eurostar-preloader');
                if (p) p.style.display = 'none';
                document.body.style.overflow = '';
              }, 4500);
            `,
          }}
        />
      </body>
    </html>
  );
}
