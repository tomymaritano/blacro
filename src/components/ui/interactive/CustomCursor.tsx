"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [shouldShowCursor, setShouldShowCursor] = useState(false);
  const elementsRef = useRef<Element[]>([]);
  
  // Memoized event handlers to prevent recreation on every render
  const move = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);
  
  const enter = useCallback(() => setActive(true), []);
  const leave = useCallback(() => setActive(false), []);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;
    
    // Check for reduced motion preference and touch devices
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    
    // Don't show custom cursor if user prefers reduced motion, is on touch device, or has coarse pointer
    if (prefersReducedMotion || isTouchDevice || hasCoarsePointer) {
      setShouldShowCursor(false);
      return;
    }
    
    setShouldShowCursor(true);
    
    // Store original cursor style to restore later
    const originalCursor = document.documentElement.style.cursor;
    
    // Add mouse move listener
    window.addEventListener("mousemove", move, { passive: true });

    // Hide default cursor only if custom cursor should be shown
    document.documentElement.style.cursor = "none";

    // Debounced observer to prevent excessive DOM queries
    let observerTimeout: NodeJS.Timeout;
    const observer = new MutationObserver(() => {
      clearTimeout(observerTimeout);
      observerTimeout = setTimeout(() => {
        // Remove old listeners
        elementsRef.current.forEach((el) => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        });
        
        // Get current elements and add listeners (limit scope to reduce performance impact)
        const elements = Array.from(document.querySelectorAll(".group"));
        elements.forEach((el) => {
          el.addEventListener("mouseenter", enter, { passive: true });
          el.addEventListener("mouseleave", leave, { passive: true });
        });
        
        elementsRef.current = elements;
      }, 100); // Debounce by 100ms
    });

    // Start observing with limited scope
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });

    // Initial setup
    const initialElements = Array.from(document.querySelectorAll(".group"));
    initialElements.forEach((el) => {
      el.addEventListener("mouseenter", enter, { passive: true });
      el.addEventListener("mouseleave", leave, { passive: true });
    });
    elementsRef.current = initialElements;

    // Cleanup function
    return () => {
      clearTimeout(observerTimeout);
      window.removeEventListener("mousemove", move);
      document.documentElement.style.cursor = originalCursor || "auto";
      
      // Remove all element listeners
      elementsRef.current.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      
      // Disconnect observer
      observer.disconnect();
      
      // Clear refs
      elementsRef.current = [];
    };
  }, [move, enter, leave]);

  // Don't render anything if custom cursor shouldn't be shown
  if (!shouldShowCursor) {
    return null;
  }

  return (
    <motion.div
      animate={{ x: pos.x - 24, y: pos.y - 24, opacity: active ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="pointer-events-none fixed top-0 left-0 z-[999] w-12 h-12"
      aria-hidden="true"
      role="presentation"
    >
      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6"
          style={{ transform: "rotate(-45deg)" }}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5 12h7V5l7 7-7 7v-7H5z" />
        </svg>
      </div>
    </motion.div>
  );
}