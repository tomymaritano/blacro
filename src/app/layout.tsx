// app/layout.tsx
import "./globals.css";
import { Familjen_Grotesk, Darker_Grotesque, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridWrapper from "@/components/layout/GridWrapper";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import GlobalCursorWrapper from "@/components/common/GlobalCursorWrapper";
import CriticalCSS from "@/components/optimization/CriticalCSS";
import FontLoader from "@/components/optimization/FontLoader";
import DeferredScripts from "@/components/optimization/DeferredScripts";
import { Metadata, Viewport } from "next";
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
  weight: ["400", "600"],
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
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
        {/* Optimize rendering */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="cursor-none">
        <FontLoader />
        <DeferredScripts />
        <ErrorBoundary>
          <GlobalCursorWrapper />
          <Navbar />
          <GridWrapper className="py-8">
            <main className="col-span-12 flex flex-col gap-3">{children}</main>
          </GridWrapper>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}