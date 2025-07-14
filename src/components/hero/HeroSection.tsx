// HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function HeroSection({ marginTopClass = "mt-20" }: { marginTopClass?: string }) {
  const pathname = usePathname();
  // Removed heavy scroll tracking (useScroll/useTransform) for better mobile performance

  let subtitle = "";
  let lines: string[] = [];

  if (pathname === "/") {
    subtitle = "(Based in Buenos Aires, Working Worldwide)";
    lines = [
      "SOMOS UN ESTUDIO CREATIVO INTEGRAL.",
      "CONVERTIMOS IDEAS EN MARCAS",
      "ESPACIOS Y EXPERIENCIAS."
    ];
  } else if (pathname.startsWith("/contact")) {
    subtitle = "Get in touch";
    lines = ["LET’S TALK"];
  } else {
    subtitle = "";
    lines = ["Página"];
  }

  return (
    <section className={`relative w-full mb-10 grid grid-cols-12 overflow-hidden ${marginTopClass}`}>
      <div className="hidden lg:block col-span-7"></div>
      <motion.div
        className="col-span-12 lg:col-span-5 flex flex-col items-end lg:items-end text-right lg:text-right space-y-2"
        style={{ fontFamily: "Familjen Grotesk, sans-serif" }}
      >
        {subtitle && (
          <p className="text-[18px] sm:text-[22px] lg:text-[24px] tracking-wide text-black/60 font-sans mb-2">
            {subtitle}
          </p>
        )}

        {lines.map((line, i) => {
          const Tag = i === 0 ? motion.h1 : motion.h2;
          return (
            <Tag
              key={i}
              className="font-familjen text-black/80 text-[28px] sm:text-[28px] lg:text-[40px] uppercase leading-snug lg:whitespace-nowrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
              style={{ fontFamily: "Familjen Grotesk, sans-serif" }}
            >
              {line}
            </Tag>
          );
        })}
      </motion.div>
    </section>
  );
}