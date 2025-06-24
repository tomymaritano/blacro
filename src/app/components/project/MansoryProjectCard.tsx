"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Project } from "../../../../data/projects";

interface MasonryProjectCardProps extends Project {
  index?: number;
}

export default function MasonryProjectCard({
  href,
  imageSrc,
  title,
  category,
  logo,
  index = 0,
}: MasonryProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <motion.div
      // Animación de scroll
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.25, 1, 0.5, 1], type: "spring", stiffness: 100 }}
      // Hover + cursor
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      className="relative w-full overflow-hidden rounded-xl group cursor-none"
    >
      {/* Link */}
      <Link href={href} className="absolute inset-0 z-10 cursor-none" />

      {/* Imagen */}
      <Image
        src={imageSrc}
        alt={title}
        width={800}
        height={600}
        className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:blur-md"
      />

      {/* Overlay logo */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/40 flex items-center justify-center transition-opacity duration-500 ease-in-out z-20">
        {logo && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-24 h-24 flex items-center justify-center"
          >
            <Image src={logo} alt={`${title} logo`} width={96} height={96} className="object-contain" />
          </motion.div>
        )}
      </div>

      {/* Cursor personalizado */}
      {isHovered && (
        <motion.div
          className="absolute z-50 w-16 h-16 bg-white/25 backdrop-blur-md border border-black/10 rounded-full flex items-center justify-center shadow-xl pointer-events-none"
          style={{ top: mouseY, left: mouseX, translateX: "-50%", translateY: "-50%" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUpRight className="w-6 h-6 text-black" />
        </motion.div>
      )}

      {/* Info */}
      <div className="absolute bottom-3 left-3 z-30 text-xs sm:text-sm md:text-base space-y-1">
        {category && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="bg-white text-black uppercase text-[10px] font-medium px-2 py-0.5 rounded-sm"
          >
            {category}
          </motion.span>
        )}
        <h3 className="font-medium text-white">{title}</h3>
      </div>
    </motion.div>
  );
}