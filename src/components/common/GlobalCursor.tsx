"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useGlobalCursorEvents } from "@/hooks/useGlobalCursorEvents";

export default function GlobalCursor() {
  const { mousePosition, isClicked, isVisible, isHovering, isCursorEnabled } = useGlobalCursorEvents();

  if (!isCursorEnabled || !isVisible) return null;

  return (
    <motion.div
      className="fixed z-[9999] pointer-events-none"
      style={{
        left: mousePosition.x - 43, // 86/2
        top: mousePosition.y - 43,  // 86/2
        width: "86px",
        height: "86px",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isClicked ? 0.9 : (isHovering ? 1.2 : 1), 
        opacity: 1,
        rotate: isHovering ? 5 : 0
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ 
        duration: 0.2,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {/* Background circular */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: "#D9D9D9",
          opacity: 0.2,
          width: "86px",
          height: "86px"
        }}
      />
      {/* SVG cursor centrado */}
      <div 
        className="absolute flex items-center justify-center"
        style={{
          width: "86px",
          height: "86px",
          top: 0,
          left: 0
        }}
      >
        <Image
          src={isHovering ? "https://res.cloudinary.com/dm9driroe/image/upload/v1/blacro/ui/click" : "https://res.cloudinary.com/dm9driroe/image/upload/v1/blacro/ui/noclick"}
          alt={isHovering ? "Click cursor" : "No click cursor"}
          width={50}
          height={60}
          className="object-contain"
          style={{ width: "50px", height: "60px" }}
          priority
          quality={100}
          unoptimized
        />
      </div>
    </motion.div>
  );
}