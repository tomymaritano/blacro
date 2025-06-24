"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function NotFound() {
  const { scrollYProgress } = useScroll();
  // Imagen sube un poco en scroll
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#FFFDF9] text-black p-6 text-center overflow-hidden">
      {/* Imagen de fondo con parallax */}
      <motion.img
        src="/images/404-illustration.svg"
        alt="Not Found Illustration"
        className="absolute top-1/2 left-1/2 w-64 h-64 opacity-20 -translate-x-1/2 -translate-y-1/2"
        style={{ y: yOffset }}
      />

      {/* Contenido principal */}
      <h1 className="text-7xl font-bold mb-2" style={{ fontFamily: "Darker Grotesque, sans-serif" }}>
        404
      </h1>
      <h2 className="text-xl md:text-3xl font-medium mb-4">Oops! Página no encontrada</h2>
      <p className="text-sm md:text-base opacity-70 mb-6 max-w-md">
        Puede que el enlace esté roto o la página haya sido movida.
      </p>
      <Link href="/" className="uppercase border border-black px-4 py-2 rounded hover:bg-black hover:text-white transition-colors">
        Volver al inicio
      </Link>
    </main>
  );
}