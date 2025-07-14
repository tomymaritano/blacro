"use client";

import dynamic from "next/dynamic";

// Lazy load GlobalCursor only on desktop
const GlobalCursor = dynamic(() => import("./GlobalCursor"), {
  ssr: false,
  loading: () => null
});

export default function GlobalCursorWrapper() {
  return <GlobalCursor />;
}