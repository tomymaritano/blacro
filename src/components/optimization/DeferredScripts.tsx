"use client";

import { useEffect } from 'react';

export default function DeferredScripts() {
  useEffect(() => {
    // Defer non-critical operations
    const timer = setTimeout(() => {
      // Mark page as fully loaded
      if (typeof window !== 'undefined') {
        document.documentElement.classList.add('page-loaded');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}