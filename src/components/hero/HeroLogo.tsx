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
    const unsubscribe = scrollY.on("change", (latest) => setInNavbar(latest > 100));
    return unsubscribe;
  }, [isHome, scrollY]);

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
        className={styles.logo}
        style={{ width: "100%", height: "auto" }}
        unoptimized
      />
    </div>
  );
}