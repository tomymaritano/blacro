"use client";

import { useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./FloatingLogo.module.css";

export default function FloatingLogo() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [inNavbar, setInNavbar] = useState(!isHome);

  useEffect(() => {
    if (!isHome) return;
    return scrollY.onChange((latest) => setInNavbar(latest > 100));
  }, [isHome, scrollY]);

  // En otras páginas que no sean home, siempre es como scrolleado
  const isScrolled = isHome ? inNavbar : true;

  return (
    <div className={`${styles.logo} ${isScrolled ? styles.logoScrolled : ""}`}>
      <Image
        src="/logo-scroll.svg"
        width={400}             // NUMÉRICO
        height={100}            // NUMÉRICO
        alt="logo"
        priority
        sizes="(max-width: 480px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 320px, 500px"
        className={styles.logo} // usa el CSS para el width responsivo
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}