"use client";

import { motion, Variants } from "framer-motion";
import HoverLink from "@/components/ui/interactive/HoverLink";
import { SOCIAL_LINKS, ANIMATIONS } from "@/constants/design-tokens";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATIONS.DURATION.SLOW,
      ease: ANIMATIONS.EASING.EASE_OUT,
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
      duration: ANIMATIONS.DURATION.DEFAULT,
      ease: ANIMATIONS.EASING.EASE_OUT,
    },
  },
};

export default function Footer() {
  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full px-4 sm:px-6 lg:px-8 py-4 lg:py-6 font-darker text-foreground"
    >
      <motion.div
        className="w-full flex flex-col items-center gap-2 lg:flex-row lg:justify-between lg:gap-0"
        variants={containerVariants}
      >
        {/* Left - Email */}
        <motion.div
          variants={itemVariants}
          className="text-footer-sm lg:text-footer-lg font-medium flex items-center gap-2"
        >
          <span className="uppercase font-bold">LET&apos;S TALK!</span>
          <HoverLink
            href={`mailto:${SOCIAL_LINKS.EMAIL}`}
            text={SOCIAL_LINKS.EMAIL.toUpperCase()}
            ariaLabel={`Send email to ${SOCIAL_LINKS.EMAIL}`}
          />
        </motion.div>

        {/* Center: socials */}
        <motion.div
          variants={itemVariants}
          className="text-footer-sm lg:text-footer-lg font-medium flex items-center gap-2"
        >
          <HoverLink
            href={SOCIAL_LINKS.INSTAGRAM}
            text="INSTAGRAM"
            ariaLabel="Visit Blacro Studio on Instagram"
          />
          <span>|</span>
          <HoverLink
            href={SOCIAL_LINKS.LINKEDIN}
            text="LINKEDIN"
            ariaLabel="Visit Blacro Studio on LinkedIn"
          />
          <span>|</span>
          <HoverLink
            href={SOCIAL_LINKS.BEHANCE}
            text="BEHANCE"
            ariaLabel="Visit Blacro Studio on Behance"
          />
        </motion.div>

        {/* Right - Copyright */}
        <motion.div
          variants={itemVariants}
          className="text-footer-copyright-sm lg:text-footer-lg font-medium"
        >
          {new Date().getFullYear()} BLACRO STUDIO ALL RIGHTS RESERVED
        </motion.div>
      </motion.div>
    </motion.footer>
  );
}
