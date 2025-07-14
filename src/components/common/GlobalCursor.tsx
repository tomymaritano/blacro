"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GlobalCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
      
      // Detectar si está sobre un elemento interactivo
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === 'A' || 
                           target.tagName === 'BUTTON' || 
                           !!target.closest('a') || 
                           !!target.closest('button') ||
                           !!target.closest('[role="button"]') ||
                           getComputedStyle(target).cursor === 'pointer';
      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };
    const handleMouseUp = () => {
      setIsClicked(false);
    };
    const handleClick = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsClicked(false);
      setIsHovering(false);
    };
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("click", handleClick);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed z-[9999] pointer-events-none"
      style={{
        left: mousePosition.x - 40, // 80/2
        top: mousePosition.y - 40,  // 80/2
        width: "80px",
        height: "80px",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isClicked ? 0.9 : (isHovering ? 1.2 : 1), 
        opacity: 0.8,
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
      <Image
        src={isClicked ? "/click.svg" : "/no click.svg"}
        alt={isClicked ? "Click cursor" : "No click cursor"}
        width={80}
        height={80}
        className="w-full h-full object-contain filter drop-shadow-lg"
        priority
        quality={100}
        unoptimized
      />
    </motion.div>
  );
}