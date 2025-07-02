"use client";

import Header from "@/components/layout/Header";
import { motion } from "framer-motion";
import ProjectCarouselRow from "@/components/project/carousel/ProjectCardCarouselRow";
import ContactForm from "./ContactForm";
import Link from "next/link";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const HoverLink = ({ href, text }: { href: string; text: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      target="_blank"
      rel="noopener noreferrer"
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
};

export default function ContactClient() {
  return (
    <>
      <section className="grid grid-cols-12 w-full items-start gap-3 lg:gap-3 mt-8 md:mt-12 lg:mt-20 mb-6 md:mb-30">
        <motion.div
          className="col-span-12 lg:col-span-6 flex flex-col"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Header title="Let's Talk" className="!mt-0 !mb-0" />
          
          {/* Subtitle Text */}
          <motion.p 
            className="text-[40px] tracking-wide text-black/80 uppercase py-10 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            style={{ fontFamily: "var(--font-familjen-grotesk), sans-serif" }}
          >
            CADA PROYECTO ES EL PUNTO DE PARTIDA PARA CREAR SOLUCIONES A MEDIDA, CON IDENTIDAD PROPIA.
          </motion.p>

          {/* Social Media Links */}
          <motion.div
            className="flex items-center gap-4 flex-wrap text-[22px] font-regular font-grotesk"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            style={{ fontFamily: "Darker Grotesque, sans-serif" }}
          >
            <HoverLink href="https://instagram.com/blacro.studio" text="INSTAGRAM" />
            <span>|</span>
            <HoverLink href="https://linkedin.com/company/blacro-studio" text="LINKEDIN" />
            <span>|</span>
            <HoverLink href="https://behance.net/blacrostudio" text="BEHANCE" />
          </motion.div>
        </motion.div>

        <motion.div
          className="col-span-12 lg:col-span-6 mt-6 lg:mt-0 flex flex-col items-center lg:items-end w-full"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.1 }}
        >
          <ContactForm />
        </motion.div>
      </section>
      <ProjectCarouselRow />
    </>
  );
}