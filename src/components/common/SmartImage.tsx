"use client";

import Image from 'next/image';
import { useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  sizes?: string;
  fill?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  style?: React.CSSProperties;
}

export default function SmartImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  loading = "lazy",
  sizes,
  fill = false,
  quality = 80,
  placeholder = "blur",
  blurDataURL,
  style,
}: SmartImageProps) {
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const defaultBlurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7Doi2KdPhBBaiiig=";

  // Get optimized image sources with fallbacks
  const getOptimizedSources = (imageSrc: string) => {
    const basePath = imageSrc.replace('/images/', '');
    const pathWithoutExt = basePath.replace(/\.[^/.]+$/, '');
    
    return {
      avif: `/images-optimized/avif/${pathWithoutExt}.avif`,
      webp: `/images-optimized/webp/${pathWithoutExt}.webp`,
      optimized: `/images-optimized/${basePath}`,
      original: imageSrc
    };
  };

  const sources = getOptimizedSources(src);

  const handleError = () => {
    // Fallback chain: avif -> webp -> optimized -> original
    if (currentSrc === sources.avif) {
      setCurrentSrc(sources.webp);
    } else if (currentSrc === sources.webp) {
      setCurrentSrc(sources.optimized);
    } else if (currentSrc === sources.optimized) {
      setCurrentSrc(sources.original);
    } else {
      setImageError(true);
    }
  };

  // Determine the best source based on browser support
  const getBestSource = () => {
    // For now, use AVIF first (modern browsers)
    // In production, you could add browser detection
    return sources.avif;
  };

  const finalSrc = imageError ? sources.original : (currentSrc || getBestSource());

  return (
    <>
      {/* Use HTML picture element for better format support */}
      <picture>
        <source srcSet={sources.avif} type="image/avif" />
        <source srcSet={sources.webp} type="image/webp" />
        <Image
          src={finalSrc}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
          loading={loading}
          sizes={sizes}
          fill={fill}
          quality={quality}
          style={style}
          placeholder={placeholder}
          blurDataURL={blurDataURL || defaultBlurDataURL}
          onError={handleError}
        />
      </picture>
    </>
  );
}