"use client";
import CloudinaryImage from "@/components/common/CloudinaryImage";
import { motion } from "framer-motion";

interface ProjectCardLogoOverlayProps {
  logo?: string;
  isHovered: boolean;
  title: string;
}

export default function ProjectCardLogoOverlay({ logo, isHovered, title }: ProjectCardLogoOverlayProps) {
  if (!logo) return null;
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 opacity-0 group-hover:md:opacity-100 bg-black/40 flex items-center justify-center transition-opacity duration-500 ease-in-out z-20"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-40 h-40 flex items-center justify-center"
      >
        <CloudinaryImage src={logo} alt={`${title} logo`} width={150} height={150} crop="limit" className="object-contain max-w-[150px] max-h-[150px]" />
      </motion.div>
    </motion.div>
  );
}