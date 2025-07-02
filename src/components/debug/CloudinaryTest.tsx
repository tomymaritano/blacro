"use client";

import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';

export default function CloudinaryTest() {
  const [logs, setLogs] = useState<string[]>([]);
  
  const addLog = (message: string) => {
    console.log(message);
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Cloudinary Debug Test</h1>
      
      {/* Environment Check */}
      <div className="bg-blue-50 p-4 rounded">
        <h2 className="font-semibold mb-2">Environment Check:</h2>
        <p>Cloud Name: {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'NOT SET'}</p>
        <p>Node ENV: {process.env.NODE_ENV}</p>
      </div>
      
      {/* Simple CldImage Test */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-4">1. Basic CldImage Test (test/myricacover)</h3>
        <div className="w-full h-64 bg-gray-100 relative mb-4">
          <CldImage
            src="test/myricacover"
            alt="Test Myrica Cover"
            width={400}
            height={200}
            className="object-cover"
            onError={(error) => {
              addLog(`❌ CldImage ERROR: ${error?.type || 'Unknown error'}`);
            }}
            onLoad={() => {
              addLog('✅ CldImage LOADED successfully: test/myricacover');
            }}
          />
        </div>
      </div>
      
      {/* Direct URL Test */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-4">2. Direct URL Test</h3>
        <div className="w-full h-64 bg-gray-100 relative mb-4">
          <Image
            src="https://res.cloudinary.com/dm9driroe/image/upload/v1/test/myricacover"
            alt="Direct URL Test"
            width={400}
            height={200}
            className="object-cover"
            onError={(error) => {
              addLog(`❌ Direct URL ERROR: ${error?.type || 'Unknown error'}`);
            }}
            onLoad={() => {
              addLog('✅ Direct URL LOADED successfully');
            }}
          />
        </div>
        <p className="text-sm text-gray-600">
          URL: https://res.cloudinary.com/dm9driroe/image/upload/v1/test/myricacover
        </p>
      </div>
      
      {/* Logs */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-4">Debug Logs:</h3>
        <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-64 overflow-y-auto">
          {logs.length === 0 ? (
            <p>No logs yet...</p>
          ) : (
            logs.map((log, i) => (
              <div key={i}>{log}</div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}