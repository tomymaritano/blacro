// app/layout.tsx
import "./globals.css";
import { Familjen_Grotesk } from "next/font/google";

import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import GridWrapper from "./components/Layout/GridWrapper";

const familjenGrotesk = Familjen_Grotesk({ variable: "--font-familjen-grotesk", subsets: ["latin"] });

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