"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import AnimatedLink from "../common/AnimatedLink";
import ButtonTalk from "../ui/buttons/ButtonTalk";
import FloatingLogo from "../hero/HeroLogo";
import MobileToggle from "./MobileToggle";
import { usePathname } from "next/navigation";

// Lazy load mobile menu
const MobileMenu = dynamic(() => import("./MobileMenu"), {
  ssr: false,
  loading: () => null,
});

/**
 * Navbar - Main navigation component with responsive design and scroll effects
 * 
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Scroll-based background blur and styling
 * - Conditional logo display (floating on home, static elsewhere)
 * - Smooth animations with Framer Motion
 * - Mobile fullscreen menu with staggered animations
 * - Keyboard navigation support
 * 
 * @component
 * @returns {React.JSX.Element} The rendered navigation component
 * 
 * @example
 * ```tsx
 * <Navbar />
 * ```
 * 
 * Styling:
 * - Uses Tailwind CSS for responsive design
 * - Fixed positioning with backdrop blur
 * - Dynamic background opacity based on scroll
 * - Mobile-first approach with md: breakpoints
 */
const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Optimized scroll handler with better throttling
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);


  return (
    <nav
      className={`fixed top-0 left-0 sm:py-3  w-full backdrop-blur-md z-50 transition font-grotesk ${scrolled ? "bg-white/60 shadow-md" : "bg-white/5"}`}
    >
      <div className="grid grid-cols-12 items-center h-16 px-4 sm:px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <div className="col-span-2 flex items-center h-full">
          {isHome ? (
            <FloatingLogo />
          ) : (
            <Link href="/" aria-label="Go to homepage" className="flex items-center">
              <Image
                src="https://res.cloudinary.com/dm9driroe/image/upload/v2/blacro/logos/blacrologo"
                alt="Blacro logo"
                width={100}
                height={40}
                className="object-contain w-[50px] sm:w-[70px] md:w-[100px]"
                style={{ height: "auto" }}
                priority
                unoptimized
              />
            </Link>
          )}
        </div>

        {/* Desktop links */}
        <div className="col-span-10 hidden md:flex uppercase items-center font-grotesk font-semibold justify-end space-x-8 text-foreground text-[22px] h-full" style={{ fontFamily: 'var(--font-darker-grotesque), sans-serif' }}>
          <AnimatedLink href="/portfolio">Projects</AnimatedLink>
          <AnimatedLink href="/about" className="mr-24">About</AnimatedLink>
          <ButtonTalk href="/contact" />
        </div>

        {/* Mobile toggle */}
        <MobileToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* Mobile menu - lazy loaded */}
      <AnimatePresence>
        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;