"use client";
import { motion } from "framer-motion";

interface ProjectCardInfoProps {
  category?: string;
  title: string;
  isHovered: boolean;
}

export default function ProjectCardInfo({ category, title, isHovered }: ProjectCardInfoProps) {
  return (
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
  );
}