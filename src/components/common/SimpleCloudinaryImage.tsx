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
    
    // Map specific main images to available ones in Cloudinary
    const imageMap: { [key: string]: string } = {
      'myrica/myricacover': 'test/myricacover',
      'unicoin/campaign-01': 'test/campaign-01',
      'londonfashionweek/london-fashion-week-01': 'test/london-fashion-week-01',
      'unicoin/thenextgenofcrypto/unicoin-nextgen-01': 'test/campaign-01', // fallback
      'unicoin/unicoineverywhere/unicoin-everywhere-01': 'test/campaign-01', // fallback
    };
    
    // Use mapped image if available, otherwise try blacro-portfolio path
    const cloudinaryId = imageMap[pathWithoutImages] || `blacro-portfolio/${pathWithoutImages}`;
    
    // Return the full Cloudinary URL
    return `https://res.cloudinary.com/dm9driroe/image/upload/v1/${cloudinaryId}`;
  };

  // Only use Cloudinary if NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set
  const useCloudinary = !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
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
        loading={loading}
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
      loading={loading}
      sizes={sizes}
      fill={fill}
      style={style}
      onError={() => {
        console.error('Image failed to load:', imageSrc);
        setImageError(true);
      }}
      onLoad={() => {
        if (useCloudinary) {
          console.log('Cloudinary image loaded successfully:', imageSrc);
        }
      }}
    />
  );
}