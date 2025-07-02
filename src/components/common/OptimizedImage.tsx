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
    !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME // Use Cloudinary if configured (dev and prod)
  );
  const [imageError, setImageError] = useState(false);

  // Extract image path from src for Cloudinary
  const getCloudinaryPublicId = (imageSrc: string) => {
    // Remove /images/ prefix and file extension, then prepend folder structure
    const pathWithoutImages = imageSrc.replace('/images/', '').replace(/\.[^/.]+$/, '');
    
    // Map specific main images to available ones in Cloudinary
    const imageMap: { [key: string]: string } = {
      'myrica/myricacover': 'test/myricacover',
      'unicoin/campaign-01': 'test/campaign-01',
      'londonfashionweek/london-fashion-week-01': 'test/london-fashion-week-01',
      'unicoin/thenextgenofcrypto/unicoin-nextgen-01': 'test/campaign-01', // fallback
      'unicoin/unicoineverywhere/unicoin-everywhere-01': 'test/campaign-01', // fallback
    };
    
    // Use mapped image if available, otherwise use the blacro-portfolio path
    if (imageMap[pathWithoutImages]) {
      return imageMap[pathWithoutImages];
    }
    
    return `blacro-portfolio/${pathWithoutImages}`;
  };

  const defaultBlurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7Doi2KdPhBBaiiig=";

  // Use Cloudinary in production if configured
  if (useCloudinary && !imageError) {
    const cloudinaryId = getCloudinaryPublicId(src);
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Using Cloudinary for:', src, '→', cloudinaryId);
    }
    
    return (
      <CldImage
        src={cloudinaryId}
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
        onError={(error) => {
          console.error('Cloudinary image failed to load:', cloudinaryId, error);
          setImageError(true);
        }}
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