"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const lines = [
    "SOMOS UN ESTUDIO CREATIVO INTEGRAL.",
    "CONVERTIMOS IDEAS EN MARCAS",
    "ESPACIOS Y EXPERIENCIAS.",
  ];

  return (
    <section className="relative w-full py-20 grid grid-cols-12 overflow-hidden">
      <div className="hidden lg:block col-span-7"></div>
      <motion.div style={{ y: yOffset }} className="col-span-12 lg:col-span-5 flex flex-col items-end text-right space-y-2">
        <p className="text-[18px] sm:text-[22px] lg:text-[24px] tracking-wide text-black/60 font-grotesk mb-2">
          (Based in Buenos Aires, Working Worldwide)
        </p>

        {lines.map((line, i) => (
          <motion.h1
            key={i}
            className="whitespace-nowrap font-grotesk font-medium text-black text-[28px] sm:text-[28px] lg:text-[40px] leading-snug"
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