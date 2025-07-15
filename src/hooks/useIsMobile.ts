"use client";

import { useState, useEffect, useLayoutEffect } from 'react';

export function useIsMobile(breakpoint: number = 768): boolean {
  // Initialize with undefined to prevent hydration mismatches
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use useLayoutEffect to set initial value immediately after mount
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Set initial value
    setIsMobile(mediaQuery.matches);
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [breakpoint]);

  // Return false during SSR to prevent hydration mismatch
  // Return actual value after hydration
  return isClient && isMobile !== undefined ? isMobile : false;
}