"use client";

import { motion, useScroll, useTransform } from "framer-motion";

interface HeroSectionProps {
  lines: string[];
  subtitle?: string;
  marginTopClass?: string;
}

export default function HeroSection({ lines, subtitle, marginTopClass }: HeroSectionProps) {
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section className={`relative w-full mb-10 grid grid-cols-12 overflow-hidden ${marginTopClass || ""}`}>
      <div className="hidden lg:block col-span-7"></div>
      <motion.div
        style={{ y: yOffset }}
        className=" col-span-12 lg:col-span-5 flex flex-col
    items-start lg:items-end
    text-left lg:text-right
    space-y-2 px-4"
      >
        {subtitle && (
          <p className="text-[18px] sm:text-[22px] lg:text-[24px] tracking-wide text-black/60 font-grotesk mb-2">
            {subtitle}
          </p>
        )}

        {lines.map((line, i) => (
          <motion.h1
            key={i}
            className="font-grotesk font-regular text-black text-[28px] sm:text-[28px] uppercase lg:text-[40px] leading-snug lg:whitespace-nowrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
          >
            {line}
          </motion.h1>
        ))}
      </motion.div>
    </section>
  );
}