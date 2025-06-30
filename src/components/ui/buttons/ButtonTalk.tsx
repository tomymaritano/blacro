"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface ButtonTalkProps {
  href?: string;
  children?: React.ReactNode;
  mobile?: boolean;
  onClick?: () => void; // <-- Nuevo prop
}

export default function ButtonTalk({
  href = "/contact",
  children = "Let's talk",
  mobile = false,
  onClick, // <-- Nuevo prop
}: ButtonTalkProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onClick={onClick} // <-- Lo pasas directo al Link
      className={`relative inline-block font-grotesk ${
        mobile ? "text-3xl my-2" : "text-[22px]"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Línea base */}
      <span className="absolute left-0 bottom-0 w-full h-[3px] bg-black opacity-50" />

      {/* Línea animada */}
      <motion.span
        className="absolute left-0 bottom-0 w-full h-[3px] bg-black origin-center"
        style={{ transformOrigin: "center" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {children}
    </Link>
  );
}