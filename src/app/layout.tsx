// app/layout.tsx
import "./globals.css";
import { Familjen_Grotesk } from "next/font/google";

import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import GridWrapper from "./components/Layout/GridWrapper";
import { Metadata } from "next";

const familjenGrotesk = Familjen_Grotesk({ variable: "--font-familjen-grotesk", subsets: ["latin"] });

export const metadata: Metadata = {
  // ✅ Base para que las URLs relativas sean absolutas automáticamente
  metadataBase: new URL("https://blacro.com"),

  title: {
    default: "Blacro Studio",
    template: "%s | Blacro Studio",
  },
  description: "Creative studio specializing in branding, visual identity, and spatial design.",
  keywords: ["branding", "creative", "studio", "design"],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  themeColor: "#000000",

  // ✅ OpenGraph para que cuando compartan tu web
  openGraph: {
    type: "website",
    siteName: "Blacro Studio",
    url: "/", // relativo, Next.js lo resuelve a https://blacro.com
    images: [
      {
        url: "/images/og-global.png",
        width: 1200,
        height: 630,
        alt: "Blacro Studio",
      },
    ],
  },

  // ✅ Twitter preview
  twitter: {
    card: "summary_large_image",
    title: "Blacro Studio",
    description: "Creative studio specializing in branding, visual identity, and spatial design.",
    images: ["/images/og-global.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${familjenGrotesk.variable} antialiased bg-[#fffcf7] text-black`}>
        <Navbar />
        <GridWrapper className="py-8">
          <main className="col-span-12 flex flex-col gap-8">{children}</main>
        </GridWrapper>
        <Footer />
      </body>
    </html>
  );
}