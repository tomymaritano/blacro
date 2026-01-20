"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface ButtonTalkProps {
  href?: string;
  children?: React.ReactNode;
  mobile?: boolean;
  textColor?: string;
  onClick?: () => void;
}

export default function ButtonTalk({
  href = "/contact",
  children = "Let's talk",
  mobile = false,
  textColor,
  onClick,
}: ButtonTalkProps) {
  const [hovered, setHovered] = useState(false);

  // Determine underline color based on text color
  const isWhiteText = textColor?.includes("text-white");
  const underlineColor = isWhiteText ? "bg-white" : "bg-black";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative inline-block font-grotesk ${textColor ?? "text-foreground"} ${
        mobile ? "text-3xl my-2" : "text-[22px]"
      } transition-colors duration-300`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Base line */}
      <span className={`absolute left-0 bottom-0 w-full h-[3px] ${underlineColor} opacity-50 transition-colors duration-300`} />

      {/* Animated line */}
      <motion.span
        className={`absolute left-0 bottom-0 w-full h-[3px] ${underlineColor} origin-center transition-colors duration-300`}
        style={{ transformOrigin: "center" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {children}
    </Link>
  );
}