"use client";

import { motion } from "framer-motion";
import { HERO_CONTENT, ANIMATIONS } from "@/constants/design-tokens";

export default function HeroSection() {
  return (
    <section className="w-full">
      {/* Text content */}
      <div className="flex flex-col items-center text-center lg:items-end lg:text-right">
        {/* Subtitle - Figma: Inter 25px #272727 */}
        <p className="font-inter text-sm lg:text-[25px] text-[#272727] leading-normal lg:leading-[1.5] mb-4 lg:mb-6">
          {HERO_CONTENT.SUBTITLE}
        </p>

        {/* Main headline - Figma: Familjen Grotesk 40px rgba(0,0,0,0.8) */}
        <motion.div
          className="font-familjen text-xl lg:text-[40px] text-black/80 uppercase leading-tight lg:leading-[1.3]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: ANIMATIONS.DURATION.SLOW,
            ease: ANIMATIONS.EASING.EASE_OUT
          }}
        >
          {HERO_CONTENT.LINES.map((line, index) => (
            <p key={index} className={index < HERO_CONTENT.LINES.length - 1 ? "mb-0" : ""}>
              {line}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
