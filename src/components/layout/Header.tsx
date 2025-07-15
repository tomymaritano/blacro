"use client";

import { motion } from "framer-motion";

interface HeaderProps {
  title: string;
  className?: string;
}

export default function Header({ title, className = "" }: HeaderProps) {
  return (
    <motion.section
      className={`mt-12 md:mt-20 mb-6 md:mb-10 text-left md:text-left ${className}`}
      // Animación desde lateral
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1
        className={`
          uppercase font-bold text-foreground/80 tracking-tight
          font-darker
          text-[14vw] sm:text-[12vw] md:text-[128px]
          leading-none
        `}
        style={{ fontFamily: 'var(--font-darker-grotesque), sans-serif' }}
      >
        {title}
      </h1>
    </motion.section>
  );
}