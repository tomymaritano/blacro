"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import AnimatedLink from "../ui/AnimatedLink";
import ButtonTalk from "../ui/ButtonTalk";
import FloatingLogo from "../Hero/HeroLogo"; // solo home
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <nav
      className={`fixed top-0 left-0 sm:py-3 font-semibold w-full backdrop-blur-md z-50 transition font-familjen ${scrolled ? "bg-white/60 shadow-md" : "bg-white/5"}`}
    >
      <div className="grid grid-cols-12 items-center h-16 px-4 sm:px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <div className="col-span-2 flex items-center h-full">
          {isHome ? (
            <FloatingLogo />
          ) : (
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="logo"
                width={100}
                height={60}
                className="object-contain"
              />
            </Link>
          )}
        </div>

        {/* Desktop links */}
        <div className="col-span-10 hidden md:flex items-center justify-end space-x-8 text-black text-[22px] h-full">
          <AnimatedLink href="/portfolio">Portfolio</AnimatedLink>
          <AnimatedLink href="/about">About</AnimatedLink>
          <ButtonTalk href="/contact" />
        </div>

        {/* Mobile toggle */}
        <motion.button
          className="col-span-10 flex justify-end md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence initial={false} mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <X size={28} className="text-black" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={28} className="text-black" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-screen bg-[#FFFDF9] backdrop-blur-3xl flex flex-col items-center justify-center space-y-8 text-black text-3xl font-grotesk z-50"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Logo */}
            <Link href="/" onClick={() => setIsOpen(false)} className="absolute top-6 left-6 flex items-center h-16">
              <Image src="/logo.svg" alt="logo" width={100} height={60} />
            </Link>

            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
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
                  <AnimatedLink href={item.href} onClick={() => setIsOpen(false)}>
                    {item.label}
                  </AnimatedLink>
                </motion.div>
              ))}

              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="mt-12"
              >
                <ButtonTalk href="/contact" mobile onClick={() => setIsOpen(false)} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;