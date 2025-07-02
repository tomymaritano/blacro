"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import CloudinaryTest to avoid SSR issues
const CloudinaryTest = dynamic(() => import('@/components/debug/CloudinaryTest'), {
  ssr: false,
  loading: () => <div className="p-8">Loading debug tools...</div>
});

export default function DebugPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold">Loading debug page...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CloudinaryTest />
    </div>
  );
}