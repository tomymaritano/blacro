"use client";

import Image from "next/image";
import { logos } from "@/data/Logos";

export default function LogosMarquee() {
  return (
    <div className="relative w-full py-30 max-w-6xl mx-auto overflow-hidden flex items-center">
      {/* Gradientes laterales */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

      {/* Track que se mueve */}
      <div className="flex animate-marquee-left space-x-16 items-center">
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="relative w-28 h-12 flex-shrink-0"> {/* w-28 para que sean más grandes */}
            <Image
              src={logo}
              alt={`Logo ${i}`}
              fill
              className="object-contain opacity-70 hover:opacity-100 transition"
              sizes="(max-width: 768px) 50vw, 112px"
              priority={i < logos.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
}