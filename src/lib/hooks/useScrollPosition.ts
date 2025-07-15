/**
 * Shared scroll position hook for performance optimization
 * Consolidates multiple scroll listeners into a single optimized handler
 */
"use client";

import { useEffect, useState, useCallback } from "react";

interface ScrollState {
  scrollY: number;
  isScrolled: boolean;
  isNavbarScrolled: boolean;
}

let scrollState: ScrollState = {
  scrollY: 0,
  isScrolled: false,
  isNavbarScrolled: false
};

const listeners: Set<(state: ScrollState) => void> = new Set();

// Single scroll handler for all components
const handleScroll = (() => {
  let ticking = false;
  
  return () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        scrollState = {
          scrollY,
          isScrolled: scrollY > 100,
          isNavbarScrolled: scrollY > 10
        };
        
        listeners.forEach(listener => listener(scrollState));
        ticking = false;
      });
      ticking = true;
    }
  };
})();

/**
 * Hook to get scroll position for FloatingLogo
 * @returns boolean indicating if logo should be in navbar position
 */
export function useFloatingLogoScroll(): boolean {
  const [isScrolled, setIsScrolled] = useState(false);
  
  const updateState = useCallback((state: ScrollState) => {
    setIsScrolled(state.isScrolled);
  }, []);
  
  useEffect(() => {
    listeners.add(updateState);
    
    // Add scroll listener only if it's the first subscriber
    if (listeners.size === 1) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    return () => {
      listeners.delete(updateState);
      
      // Remove scroll listener if no more subscribers
      if (listeners.size === 0) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [updateState]);
  
  return isScrolled;
}

/**
 * Hook to get scroll position for Navbar
 * @returns boolean indicating if navbar should show background
 */
export function useNavbarScroll(): boolean {
  const [isScrolled, setIsScrolled] = useState(false);
  
  const updateState = useCallback((state: ScrollState) => {
    setIsScrolled(state.isNavbarScrolled);
  }, []);
  
  useEffect(() => {
    listeners.add(updateState);
    
    // Add scroll listener only if it's the first subscriber
    if (listeners.size === 1) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    return () => {
      listeners.delete(updateState);
      
      // Remove scroll listener if no more subscribers
      if (listeners.size === 0) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [updateState]);
  
  return isScrolled;
}