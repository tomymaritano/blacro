"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service in production
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // In production, you might want to send this to a logging service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error monitoring service
      // errorMonitoringService.captureException(error, { extra: errorInfo });
    }
  }

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-6">
              <svg 
                className="mx-auto h-16 w-16 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Something went wrong
            </h1>
            
            <p className="text-gray-600 mb-6">
              We apologize for the inconvenience. An unexpected error has occurred.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Try Again
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Go Home
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Error Details (Development Only)
                </summary>
                <div className="mt-2 p-4 bg-gray-50 rounded border text-sm text-gray-700 overflow-auto">
                  <p className="font-semibold">Error:</p>
                  <p className="mb-2">{this.state.error.message}</p>
                  <p className="font-semibold">Stack Trace:</p>
                  <pre className="whitespace-pre-wrap text-xs">
                    {this.state.error.stack}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;