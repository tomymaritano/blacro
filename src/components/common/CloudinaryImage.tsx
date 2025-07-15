"use client";

import { CldImage } from 'next-cloudinary';
import { useState, useEffect } from 'react';

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
  // Detect mobile device for optimized settings
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Extract image path from src for Cloudinary
  const getCloudinaryPublicId = (imageSrc: string) => {
    // Remove /images/ prefix and file extension
    const pathWithoutImages = imageSrc.replace('/images/', '').replace(/\.[^/.]+$/, '');
    
    // Return the path for blacro folder in Cloudinary
    return `blacro/${pathWithoutImages}`;
  };

  const cloudinaryId = getCloudinaryPublicId(src);

  // Mobile-optimized quality and sizes
  const optimizedQuality = isMobile ? "auto:eco" : quality; // Even more aggressive compression for mobile
  const optimizedSizes = sizes || (isMobile 
    ? "(max-width: 640px) 100vw, (max-width: 768px) 90vw, 50vw"
    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
  );

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
  // More aggressive loading for mobile
  const loadingProps = priority 
    ? { priority: true, fetchPriority: "high" as const }
    : { loading: loading, fetchPriority: "low" as const };

  return (
    <CldImage
      src={cloudinaryId}
      alt={alt}
      {...imageProps}
      {...loadingProps}
      className={className}
      quality={optimizedQuality}
      // Use object syntax to apply transformations to source image (prevents two-stage cropping)
      crop={{
        type: crop,
        source: true,
        gravity: crop === "limit" ? undefined : gravity
      }}
      style={style}
      // Use auto format for optimal delivery, but preserve GIF animation
      format={src.toLowerCase().includes('.gif') ? 'gif' : 'auto'}
      // Enhance image quality  
      dpr="auto"
      // Remove flags - handled by format auto
    />
  );
}