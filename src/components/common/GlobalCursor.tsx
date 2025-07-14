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
      // Extra click handler for better responsiveness
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 300);
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
          src={isClicked ? "/click.svg" : "/no click.svg"}
          alt={isClicked ? "Click cursor" : "No click cursor"}
          width={50}
          height={60}
          className="object-contain"
          style={{ width: "auto", height: "auto" }}
          priority
          quality={100}
          unoptimized
        />
      </div>
    </motion.div>
  );
}