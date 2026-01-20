// components/AnimatedLink.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  textColor?: string;
  onClick?: () => void;
}

export default function AnimatedLink({ href, children, className, textColor, onClick }: AnimatedLinkProps) {
  const [hovered, setHovered] = useState(false);

  // Determine underline color based on text color
  const isWhiteText = textColor?.includes("text-white");
  const underlineColor = isWhiteText ? "bg-white" : "bg-black";

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-block ${textColor ?? "text-foreground"} ${className ?? ""}`}
    >
      <span className="relative z-10 transition-colors duration-200">{children}</span>
      <motion.span
        className={`absolute left-0 bottom-0 w-full h-[3px] ${underlineColor} origin-center`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </Link>
  );
}