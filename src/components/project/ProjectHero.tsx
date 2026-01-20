"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ProjectHeroProps {
  imageSrc: string;
  title: string;
  priority?: boolean;
}

export default function ProjectHero({
  imageSrc,
  title,
  priority = true,
}: ProjectHeroProps) {
  return (
    <section className="relative w-screen h-[440px] md:h-[500px] lg:h-[550px] overflow-hidden">
      {/* Background Image - full width, no padding */}
      <Image
        src={imageSrc}
        alt={title}
        fill
        sizes="100vw"
        quality={100}
        priority={priority}
        className="object-cover"
      />

      {/* Title overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end px-6 pb-8 md:px-12 md:pb-10 lg:px-16 lg:pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-white font-bold uppercase text-[48px] md:text-[80px] lg:text-[128px]"
          style={{
            fontFamily: "var(--font-darker-grotesque), sans-serif",
            lineHeight: "130%"
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {title}
        </motion.h1>
      </motion.div>
    </section>
  );
}
