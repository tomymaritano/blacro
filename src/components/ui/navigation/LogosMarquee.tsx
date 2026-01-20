"use client";

import Image from "next/image";
import { logos } from "@/data/logos";
import { useEffect, useRef, useState } from "react";

export default function LogosMarquee() {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Intersection observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const shouldAnimate = isVisible && !prefersReducedMotion;

  return (
    <div 
      ref={containerRef}
      className="relative w-full py-30 max-w-6xl mx-auto overflow-hidden flex items-center"
    >
      {/* Gradientes laterales */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10"></div>

      {/* Track que se mueve */}
      <div className={`flex space-x-16 items-center ${shouldAnimate ? 'animate-marquee-left' : ''}`}>
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="flex-shrink-0 w-28 h-20 flex items-center justify-center">
            <Image
              src={logo}
              alt={`Logo ${i}`}
              width={112}
              height={128}
              className="object-contain opacity-70 hover:opacity-100 transition w-full h-full"
              style={{ width: "auto", height: "auto" }}
              priority={i < logos.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
}