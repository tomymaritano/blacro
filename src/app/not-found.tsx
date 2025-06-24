"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-white text-black">
      {/* Ícono o imagen flotante */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="w-32 h-32 mb-8"
      >
        {/* Podrías usar una imagen personalizada aquí */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-full h-full opacity-70"
          fill="currentColor"
        >
          <path d="M32 4C17.7 4 6 15.7 6 30s11.7 26 26 26 26-11.7 26-26S46.3 4 32 4zm0 48C19.8 52 10 42.2 10 30S19.8 8 32 8s22 9.8 22 22-9.8 22-22 22zM28 18v14h8V18h-8zm0 18v4h8v-4h-8z" />
        </svg>
      </motion.div>

      <h1 className="text-5xl font-bold mb-2">Oops! 404</h1>
      <p className="text-lg opacity-70 mb-6">
        Parece que la página que buscas no existe.
      </p>

      <Link href="/" className="bg-black text-white px-6 py-2 rounded-md hover:opacity-80 transition">
        Volver a Inicio
      </Link>
    </main>
  );
}