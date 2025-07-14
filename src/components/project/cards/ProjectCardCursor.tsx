"use client";
import { motion, MotionValue } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface ProjectCardCursorProps {
  isHovered: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export default function ProjectCardCursor({ isHovered, mouseX, mouseY }: ProjectCardCursorProps) {
  const [isClicked, setIsClicked] = useState(false);

  if (!isHovered) return null;

  return (
    <motion.div
      className="absolute z-50 w-16 h-16 flex items-center justify-center pointer-events-none"
      style={{ top: mouseY, left: mouseX, translateX: "-50%", translateY: "-50%" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
    >
      <Image
        src={isClicked ? "/click.svg" : "/no click.svg"}
        alt={isClicked ? "Click cursor" : "No click cursor"}
        width={64}
        height={64}
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}