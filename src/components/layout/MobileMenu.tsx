"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AnimatedLink from "../common/AnimatedLink";
import ButtonTalk from "../ui/buttons/ButtonTalk";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-screen bg-[#FFFDF9] font-darker font-semibold backdrop-blur-3xl flex flex-col items-center justify-center space-y-8 text-black text-3xl font-grotesk z-50"
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: "0%" }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ fontFamily: "Darker Grotesque, sans-serif" }}
    >
      {/* Logo */}
      <Link 
        href="/" 
        onClick={onClose} 
        className="absolute top-6 left-6 flex items-center h-16" 
        aria-label="Go to homepage"
      >
        <Image 
          src="/logo.svg" 
          alt="Blacro logo" 
          width={100} 
          height={60} 
          sizes="100px" 
          style={{ width: "auto", height: "auto" }} 
        />
      </Link>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 hover:scale-110 transition"
        aria-label="Close"
      >
        <X size={28} className="text-black" />
      </button>

      {/* Links */}
      <motion.div
        className="flex flex-col items-center"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {[
          { href: "/portfolio", label: "Projects" },
          { href: "/about", label: "About" },
        ].map((item) => (
          <motion.div
            key={item.href}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="mb-8"
          >
            <AnimatedLink href={item.href} onClick={onClose}>
              {item.label}
            </AnimatedLink>
          </motion.div>
        ))}

        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="mt-12"
        >
          <ButtonTalk href="/contact" mobile onClick={onClose} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}