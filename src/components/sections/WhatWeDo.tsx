"use client";

import { motion } from "framer-motion";

export default function WhatWeDoSection() {
  const columns = [
    {
      title: "MARKETING & EXPERIENCIAS",
      items: ["ESTRATEGIA & CAMPAÑA", "EXPERIENCIAS DE MARCA", "ACTIVACIONES", "EVENTOS Y SET DESIGN"],
    },
    {
      title: "DISEÑO DE MARCA Y PRODUCTO",
      items: ["BRANDING E IDENTIDAD", "PACKAGING", "GESTIÓN DE IMPRESIÓN Y COLOR"],
    },
    {
      title: "DIRECCIÓN DE ARTE",
      items: ["CONTENIDO", "DISEÑO WEB", "FOTOGRAFÍA"],
    },
  ];

  return (
    <section className="w-full px-4 sm:px-8 py-12 text-black flex flex-col items-center space-y-8">
      <h2 className="text-xs uppercase border border-black rounded-full px-4 py-1 tracking-wide font-sans">
        What we do
      </h2>

      <p className="text-center max-w-3xl text-base sm:text-lg leading-relaxed tracking-wide font-sans">
        NACIDO DE LA UNIÓN ENTRE DIRECCIÓN DE ARTE, DISEÑO ESPACIAL Y ESTRATEGIA CREATIVA,
        BLACRÓ HABITA EL PUNTO EXACTO DONDE LO VISUAL Y LO CONCEPTUAL SE ENCUENTRAN.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-6xl">
        {columns.map((col, index) => (
          <motion.div
            key={index}
            className="flex flex-col space-y-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ amount: 0.2, once: false }}
          >
            <h3 className="font-bold text-base sm:text-lg mb-2 font-sans">{col.title}</h3>
            <div className="flex flex-col space-y-2">
              {col.items.map((item, i) => (
                <div
                  key={i}
                  className="py-2 border-b border-black/20 text-sm sm:text-base uppercase cursor-pointer transition-all hover:pl-2 font-sans"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}