"use client";

import { motion, easeOut, Variants } from "framer-motion";
import HoverLink from "@/components/ui/interactive/HoverLink";


const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
};


export default function Footer() {
  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full px-4 sm:px-6 lg:px-8 py-6 text-sm font-darker text-black backdrop-blur-md bg-white/50 border-t border-black/10"
      style={{ fontFamily: "Darker Grotesque, sans-serif" }}
    >
      <motion.div
        className="w-full flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-3 md:gap-0"
        variants={containerVariants}
      >
        {/* Left */}
        <motion.div
          variants={itemVariants}
          className="text-[22px] font-medium flex items-center gap-3 flex-wrap justify-center md:justify-start"
        >
          <span className="uppercase font-bold">LET’S TALK!</span>
          <HoverLink href="mailto:hola@blacro.com" text="HOLA@BLACRO.COM" ariaLabel="Send email to hola@blacro.com" />
        </motion.div>

        {/* Center: socials */}
        <motion.div
          variants={itemVariants}
          className="text-[22px] font-medium flex items-center gap-3 flex-wrap justify-center"
        >
          <HoverLink href="https://instagram.com/blacrostudio" text="INSTAGRAM" ariaLabel="Visit Blacro Studio on Instagram" />
          <span>|</span>
          <HoverLink href="https://linkedin.com/company/blacro" text="LINKEDIN" ariaLabel="Visit Blacro Studio on LinkedIn" />
          <span>|</span>
          <HoverLink href="https://behance.net/blacro" text="BEHANCE" ariaLabel="Visit Blacro Studio on Behance" />
        </motion.div>

        {/* Right */}
        <motion.div
          variants={itemVariants}
          className="text-[22px] font-medium text-center md:text-right"
        >
          2025 BLACRO STUDIO ALL RIGHTS RESERVED
        </motion.div>
      </motion.div>
    </motion.footer>
  );
}