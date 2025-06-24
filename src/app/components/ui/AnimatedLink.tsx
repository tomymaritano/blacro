// components/AnimatedLink.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedLink({ href, children, className, onClick }: AnimatedLinkProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-block ${className}`}
    >
      <span className="relative z-10 transition-colors duration-200">{children}</span>
      <motion.span
        className="absolute left-0 bottom-0 w-full h-[3px] bg-black origin-center"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </Link>
  );
}