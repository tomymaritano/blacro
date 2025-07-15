"use client";

import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    } else {
      // Fallback - add class after a short delay
      setTimeout(() => {
        document.documentElement.classList.add('fonts-loaded');
      }, 100);
    }
  }, []);

  return null; // This component renders nothing
}