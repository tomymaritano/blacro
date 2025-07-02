"use client";

import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
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

export default function OptimizedImage({
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
}: OptimizedImageProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [useCloudinary, setUseCloudinary] = useState(
    process.env.NODE_ENV === 'production' && 
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  );
  const [imageError, setImageError] = useState(false);

  // Extract image path from src for Cloudinary
  const getCloudinaryPublicId = (imageSrc: string) => {
    // Remove /images/ prefix and file extension
    return imageSrc.replace('/images/', '').replace(/\.[^/.]+$/, '');
  };

  const defaultBlurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7Doi2KdPhBBaiiig=";

  // Use Cloudinary in production if configured
  if (useCloudinary && !imageError) {
    return (
      <CldImage
        src={getCloudinaryPublicId(src)}
        alt={alt}
        width={width || 1200}
        height={height || 800}
        className={className}
        priority={priority}
        loading={loading}
        sizes={sizes}
        fill={fill}
        quality={quality}
        style={style}
        crop="fill"
        gravity="center"
        format="auto"
        onError={() => setImageError(true)}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
      />
    );
  }

  // Fallback to Next.js Image
  return (
    <Image
      src={src}
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
      onError={() => setImageError(true)}
    />
  );
}