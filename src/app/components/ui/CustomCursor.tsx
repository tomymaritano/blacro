"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false); // sólo activo sobre ProjectCard
  
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const enter = () => setActive(true);
    const leave = () => setActive(false);

    window.addEventListener("mousemove", move);

    // Ocultamos cursor por defecto
    document.documentElement.style.cursor = "none";

    document.querySelectorAll(".group").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.style.cursor = "auto"; // restaurar
      document.querySelectorAll(".group").forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <motion.div
      animate={{ x: pos.x - 24, y: pos.y - 24, opacity: active ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="pointer-events-none fixed top-0 left-0 z-[999] w-12 h-12"
    >
      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white shadow-lg">
        {/* Flecha SVG apuntando hacia arriba derecha */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6"
          style={{ transform: "rotate(-45deg)" }}
          fill="currentColor"
        >
          <path d="M5 12h7V5l7 7-7 7v-7H5z" />
        </svg>
      </div>
    </motion.div>
  );
}