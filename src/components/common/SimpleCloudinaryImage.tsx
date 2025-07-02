"use client";

import Image from 'next/image';
import { useState } from 'react';

interface SimpleCloudinaryImageProps {
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
}

export default function SimpleCloudinaryImage({
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
}: SimpleCloudinaryImageProps) {
  const [imageError, setImageError] = useState(false);

  // Extract image path from src for Cloudinary
  const getCloudinaryUrl = (imageSrc: string) => {
    // Remove /images/ prefix and file extension
    const pathWithoutImages = imageSrc.replace('/images/', '').replace(/\.[^/.]+$/, '');
    
    // All images are now uploaded to blacro-portfolio folder in Cloudinary
    const cloudinaryId = `blacro-portfolio/${pathWithoutImages}`;
    
    // Return the full Cloudinary URL
    return `https://res.cloudinary.com/dm9driroe/image/upload/v1/${cloudinaryId}`;
  };

  // Always use Cloudinary for now
  const useCloudinary = true;
  
  const imageSrc = useCloudinary ? getCloudinaryUrl(src) : src;

  if (imageError && useCloudinary) {
    // Fallback to original src if Cloudinary fails
    console.log(`Cloudinary image failed, falling back to: ${src}`);
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        loading={priority ? undefined : loading}
        sizes={sizes}
        fill={fill}
        style={style}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      loading={priority ? undefined : loading}
      sizes={sizes}
      fill={fill}
      style={style}
      onError={() => {
        console.error('Image failed to load:', imageSrc);
        setImageError(true);
      }}
      onLoad={() => {
        // Image loaded successfully
      }}
    />
  );
}