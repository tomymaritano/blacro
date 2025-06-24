"use client";
import { motion, MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardCursorProps {
  isHovered: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export default function ProjectCardCursor({ isHovered, mouseX, mouseY }: ProjectCardCursorProps) {
  if (!isHovered) return null;

  return (
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
  );
}