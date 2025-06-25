"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="grid grid-cols-12 items-center py-9 px-4 sm:px-4 md:px-6 lg:px-8 text-black ">
      {/* Contact & Social */}
      <div className="col-span-6 flex flex-col space-y-4 text-[20px] font-grotesk">
        <div>
          <p className="font-bold uppercase">LET’S TALK!</p>
          <Link href="mailto:hola@blacro.com" className="hover:underline">
            HOLA@BLACRO.COM
          </Link>
        </div>

        {/* Línea separadora */}
        <hr className="border-black/90 border-1 w-38" />

        <div className="flex flex-col space-y-2">
          <Link href="https://instagram.com" className="font-medium hover:underline">INSTAGRAM</Link>
          <Link href="https://linkedin.com" className="font-medium hover:underline">LINKEDIN</Link>
          <Link href="https://behance.net" className="font-medium hover:underline">BEHANCE</Link>
        </div>
      </div>

      {/* Logo & Rights */}
      <div className="col-span-6 flex flex-col justify-between h-full items-end text-right text-sm font-grotesk">
        <Image
          src="/logo.svg"
          alt="Blacro logo"
          width={100}
          height={40}
          className="w-auto h-auto"
        />
        <p className="text-black/60">2025 BLACRO STUDIO ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  );
}