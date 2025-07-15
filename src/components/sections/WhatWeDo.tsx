"use client";

import { motion } from "framer-motion";

export default function WhatWeDoSection() {
  const columns = [
    {
      title: "MARKETING & ESTRATEGIA",
      items: ["CAMPAÑAS", "BRAND STORYTELLING", "CONSULTORIA DE MARCA", "ESTRATEGIA DE CONTENIDOS"],
    },
    {
      title: "BRANDING Y DISEÑO",
      items: ["BRANDING E IDENTIDAD VISUAL", "PRODUCTO & PACKAGING", "DISEÑO WEB & REDES", "DIRECCIÓN DE ARTE"]},
    {
      title: "EXPERIENCIAS",
      items: ["SERVICE DESIGN", "BRAND EXPERIENCE", "EVENTOS", "ACTIVACIONES DE MARCA"],
    },
  ];

  return (
    <section className="w-full px-4 sm:px-8 py-12 text-foreground flex flex-col items-center space-y-8">
      <h2 className="text-xs uppercase border border-foreground rounded-full px-4 py-1 tracking-wide font-familjen">
        What we do
      </h2>

      <p className="text-center max-w-3xl text-base sm:text-lg leading-relaxed tracking-wide font-familjen">
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
            <h3 className="font-bold text-base sm:text-lg mb-2 font-familjen">{col.title}</h3>
            <div className="flex flex-col space-y-2">
              {col.items.map((item, i) => (
                <div
                  key={i}
                  className="py-2 border-b border-foreground/20 text-sm sm:text-base uppercase cursor-pointer transition-all hover:pl-2 font-familjen"
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