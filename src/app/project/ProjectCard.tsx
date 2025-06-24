"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Project } from "../../../data/projects"; // Tu tipo Project

// Interface que extiende Project y le agrega index
interface ProjectCardProps extends Project {
  index?: number;
}

export default function ProjectCard({
  slug,
  imageSrc,
  title,
  category,
  logo,
  index = 0,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Calcula delay por fila
  const rowIndex = Math.floor(index / 2);
  const columnIndex = index % 2;
  const delay = rowIndex * 0.2 + columnIndex * 0.1;

  return (
    <motion.div
      // Animación scroll
      initial={{ opacity: 0, y: 60, scale: 0.8, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        delay,
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1],
        type: "spring",
        stiffness: 100,
      }}
      // Hover + cursor
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      whileHover={{ rotate: -2, scale: 1.03 }}
      className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl group cursor-none"
    >
      {/* Link cubriendo */}
      <Link href={`/project/${slug}`} className="absolute inset-0 z-10 cursor-none" />

      {/* Imagen */}
      <Image
        src={imageSrc}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 ease-in-out group-hover:md:blur-md"
      />

      {/* Overlay con logo */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:md:opacity-100 bg-black/40 flex items-center justify-center transition-opacity duration-500 ease-in-out z-20">
        {logo && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-24 h-24 flex items-center justify-center"
          >
            <Image
              src={logo}
              alt={`${title} logo`}
              width={96}
              height={96}
              className="object-contain"
            />
          </motion.div>
        )}
      </div>

      {/* Cursor */}
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
      <div className="absolute bottom-4 left-4 z-30 text-sm sm:text-base md:text-lg">
        {category && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="uppercase text-xs font-medium bg-white text-black px-2 py-1 mb-2 rounded"
          >
            {category}
          </motion.span>
        )}
        <h3 className="font-medium text-white">{title}</h3>
      </div>
    </motion.div>
  );
}