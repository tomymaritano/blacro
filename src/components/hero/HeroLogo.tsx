"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import styles from "./FloatingLogo.module.css";

export default function FloatingLogo() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [inNavbar, setInNavbar] = useState(!isHome);

  // Optimized scroll handler with better performance
  const throttledScrollHandler = useCallback(() => {
    let ticking = false;
    
    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setInNavbar(scrollY > 100);
          ticking = false;
        });
        ticking = true;
      }
    };
  }, []);

  useEffect(() => {
    if (!isHome) return;
    
    const handleScroll = throttledScrollHandler();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHome, throttledScrollHandler]);

  const isScrolled = isHome ? inNavbar : true;

  return (
    <div className={`${styles.logo} ${isScrolled ? styles.logoScrolled : ""}`}>
      <Image
        src="https://res.cloudinary.com/dm9driroe/image/upload/v2/blacro/logos/blacrologo"
        width={400}
        height={100}
        alt="logo"
        priority
        sizes="(max-width: 480px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 320px, 500px"
        style={{ width: "100%", height: "auto" }}
        unoptimized
      />
    </div>
  );
}