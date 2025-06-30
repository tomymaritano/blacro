"use client";

import React from "react";
import ErrorBoundary from "./ErrorBoundary";

interface FormErrorBoundaryProps {
  children: React.ReactNode;
}

const FormErrorFallback = () => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
    <div className="mb-4">
      <svg 
        className="mx-auto h-12 w-12 text-red-400" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z" 
        />
      </svg>
    </div>
    
    <h3 className="text-lg font-medium text-red-800 mb-2">
      Form Error
    </h3>
    
    <p className="text-red-600 mb-4">
      There was an error with the form. Please refresh the page and try again.
    </p>
    
    <button
      onClick={() => window.location.reload()}
      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
    >
      Refresh Page
    </button>
  </div>
);

export default function FormErrorBoundary({ children }: FormErrorBoundaryProps) {
  return (
    <ErrorBoundary fallback={<FormErrorFallback />}>
      {children}
    </ErrorBoundary>
  );
}