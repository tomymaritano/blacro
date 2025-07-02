// app/layout.tsx
import "./globals.css";
import { Familjen_Grotesk, Darker_Grotesque, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridWrapper from "@/components/layout/GridWrapper";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { Metadata, Viewport } from "next";
import { META } from "@/constants/design-tokens";

const familjenGrotesk = Familjen_Grotesk({ 
  variable: "--font-familjen-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"]
});

const darkerGrotesque = Darker_Grotesque({ 
  variable: "--font-darker-grotesque",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});

const inter = Inter({ 
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"]
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
        url: "/images/og-global.svg",
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
    images: ["/images/og-global.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${familjenGrotesk.variable} ${darkerGrotesque.variable} ${inter.variable}`}>
      <body>
        <ErrorBoundary>
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