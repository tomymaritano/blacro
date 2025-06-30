"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const HoverLink = ({ href, text }: { href: string; text: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        layoutId="underline"
        className="absolute left-0 bottom-0 h-[1px] w-full bg-black"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </Link>
  );
};

export default function Footer() {
  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`w-full px-4 sm:px-6 lg:px-8 py-6 text-sm text-black backdrop-blur-md bg-white/50 border-t border-black/10 ${inter.className}`}
    >
      <motion.div
        className="w-full flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-3 md:gap-0"
        variants={containerVariants}
      >
        {/* Left */}
        <motion.div
          variants={itemVariants}
          className="text-[14px] font-medium flex items-center gap-2 flex-wrap justify-center md:justify-start"
        >
          <span className="uppercase font-bold">LET’S TALK!</span>
          <HoverLink href="mailto:hola@blacro.com" text="HOLA@BLACRO.COM" />
        </motion.div>

        {/* Center: socials */}
        <motion.div
          variants={itemVariants}
          className="text-[14px] font-medium flex items-center gap-4 flex-wrap justify-center"
        >
          <HoverLink href="https://instagram.com" text="INSTAGRAM" />
          <span>|</span>
          <HoverLink href="https://linkedin.com" text="LINKEDIN" />
          <span>|</span>
          <HoverLink href="https://behance.net" text="BEHANCE" />
        </motion.div>

        {/* Right */}
        <motion.div
          variants={itemVariants}
          className="text-[14px] font-medium text-center md:text-right"
        >
          2025 BLACRO STUDIO ALL RIGHTS RESERVED
        </motion.div>
      </motion.div>
    </motion.footer>
  );
}