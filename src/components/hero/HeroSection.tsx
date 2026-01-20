"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HERO, HERO_IMAGES, HERO_CONTENT, ANIMATIONS } from "@/constants/design-tokens";

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, HERO.SLIDER_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full">
      {/* Mobile: vertical stack centered / Desktop: horizontal aligned at bottom */}
      <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-4">
        {/* Image slider */}
        <div className="w-full lg:w-[48%] relative aspect-[4/3] overflow-hidden shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: HERO.SLIDER_TRANSITION_DURATION,
                ease: ANIMATIONS.EASING.EASE_IN_OUT
              }}
              className="absolute inset-0"
            >
              <Image
                src={HERO_IMAGES[currentIndex]}
                alt={`Blacro Studio ${currentIndex + 1}`}
                fill
                priority={currentIndex === 0}
                quality={100}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Slider indicators */}
          <div className="absolute bottom-4 left-4 flex gap-2 z-10">
            {HERO_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/70 w-2"
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Text content */}
        <div className="flex-1 flex flex-col items-center text-center lg:items-end lg:text-right">
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
      </div>
    </section>
  );
}
