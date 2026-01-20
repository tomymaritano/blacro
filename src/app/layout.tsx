// app/layout.tsx
import "./globals.css";
import { Familjen_Grotesk, Darker_Grotesque, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import GlobalCursorWrapper from "@/components/common/GlobalCursorWrapper";
import CriticalCSS from "@/components/optimization/CriticalCSS";
import FontLoader from "@/components/optimization/FontLoader";
import DeferredScripts from "@/components/optimization/DeferredScripts";
import { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { META } from "@/constants/design-tokens";

const familjenGrotesk = Familjen_Grotesk({ 
  variable: "--font-familjen-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "600"],
  fallback: ['system-ui', 'arial']
});

const darkerGrotesque = Darker_Grotesque({ 
  variable: "--font-darker-grotesque",
  subsets: ["latin"],
  display: "swap", 
  preload: true,
  weight: ["400", "600", "700"],
  fallback: ['system-ui', 'arial']
});

const inter = Inter({ 
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500"],
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  metadataBase: new URL(META.SITE_URL),
  title: {
    default: META.SITE_NAME,
    template: `%s | ${META.SITE_NAME}`,
  },
  description: META.DESCRIPTION,
  keywords: META.KEYWORDS,
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: META.SITE_NAME,
    url: "/",
    images: [
      {
        url: "https://res.cloudinary.com/dm9driroe/image/upload/v1/og-global",
        width: META.OG_IMAGE_WIDTH,
        height: META.OG_IMAGE_HEIGHT,
        alt: META.SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: META.SITE_NAME,
    description: META.DESCRIPTION,
    images: ["https://res.cloudinary.com/dm9driroe/image/upload/v1/og-global"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: META.SITE_NAME,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${familjenGrotesk.variable} ${darkerGrotesque.variable} ${inter.variable}`}>
      <head>
        <CriticalCSS />
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://dm9driroe.cloudinary.com" />
        {/* Optimize rendering */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="cursor-none min-h-screen flex flex-col">
        <FontLoader />
        <DeferredScripts />
        <ErrorBoundary>
          <GlobalCursorWrapper />
          <Navbar />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
        </ErrorBoundary>
        <SpeedInsights />
      </body>
    </html>
  );
}