"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

interface HoverLinkProps {
  href: string;
  text: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
  className?: string;
}

export default function HoverLink({ 
  href, 
  text, 
  ariaLabel, 
  target, 
  rel, 
  className = "" 
}: HoverLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabel || text}
      target={target}
      rel={rel}
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        layoutId={`underline-${text}`}
        className="absolute left-0 bottom-0 h-[1px] w-full bg-black"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </Link>
  );
}