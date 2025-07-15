"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lazy load GlobalCursor only when needed
const GlobalCursor = dynamic(() => import("./GlobalCursor"), {
  ssr: false,
  loading: () => null
});

export default function GlobalCursorWrapper() {
  const [shouldLoadCursor, setShouldLoadCursor] = useState(false);

  useEffect(() => {
    // Only load cursor on desktop devices (non-touch, large screens)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isDesktop = window.innerWidth >= 1024;
    
    if (!isTouchDevice && isDesktop) {
      setShouldLoadCursor(true);
    }
  }, []);

  // Don't render anything on mobile/tablet devices
  if (!shouldLoadCursor) {
    return null;
  }

  return <GlobalCursor />;
}