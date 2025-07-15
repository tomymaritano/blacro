"use client";

import { CldImage } from 'next-cloudinary';
import { useIsMobile } from '@/hooks';
import { getCloudinaryPublicId, getOptimizedSizes, getOptimizedQuality } from '@/lib/utils';
import { useState, useCallback } from 'react';

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  quality?: number | string;
  crop?: "fill" | "scale" | "crop" | "fill_pad" | "fit" | "limit" | "mfit" | "mpad" | "pad" | "thumb";
  gravity?: string;
}

export default function CloudinaryImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  loading = "lazy",
  sizes,
  fill = false,
  style,
  quality = "auto:best",
  crop = "fill",
  gravity = "auto",
}: CloudinaryImageProps) {
  // Use shared mobile detection hook
  const isMobile = useIsMobile();
  
  // State for error handling and loading
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use utility functions for Cloudinary processing
  const cloudinaryId = getCloudinaryPublicId(src);
  const optimizedQuality = getOptimizedQuality(isMobile, quality);
  const optimizedSizes = sizes || getOptimizedSizes(isMobile);

  // Error handling
  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
  }, []);

  // Loading handling
  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Fallback image component
  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center text-gray-500 text-sm ${className}`}
        style={style}
      >
        <div className="text-center">
          <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-1">Image failed to load</p>
        </div>
      </div>
    );
  }

  // Conditional props based on fill usage
  const imageProps = fill 
    ? {
        fill: true,
        sizes: optimizedSizes
      }
    : {
        width: width || (isMobile ? 640 : 1345),
        height: height || (isMobile ? 480 : 542),
        sizes: optimizedSizes
      };

  // Handle priority vs loading conflict - priority takes precedence
  const loadingProps = priority 
    ? { priority: true }
    : { loading: loading };

  return (
    <div className={fill ? "relative w-full h-full" : "relative"}>
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${fill ? 'w-full h-full' : ''} ${className}`} />
      )}
      <CldImage
        src={cloudinaryId}
        alt={alt}
        {...imageProps}
        {...loadingProps}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        quality={optimizedQuality}
        crop={{
          type: crop,
          source: true,
          gravity: crop === "limit" ? undefined : gravity
        }}
        style={style}
        format={src.toLowerCase().includes('.gif') ? 'gif' : 'auto'}
        dpr="auto"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}