"use client";

import { CldImage } from 'next-cloudinary';

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
  // Extract image path from src for Cloudinary
  const getCloudinaryPublicId = (imageSrc: string) => {
    // Remove /images/ prefix and file extension
    const pathWithoutImages = imageSrc.replace('/images/', '').replace(/\.[^/.]+$/, '');
    
    // Return the path for blacro-portfolio folder in Cloudinary
    return `blacro-portfolio/${pathWithoutImages}`;
  };

  const cloudinaryId = getCloudinaryPublicId(src);

  // Conditional props based on fill usage
  const imageProps = fill 
    ? {
        fill: true,
        sizes: sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
      }
    : {
        width: width || 1345,
        height: height || 542,
        sizes: sizes
      };

  // Handle priority vs loading conflict - priority takes precedence
  const loadingProps = priority 
    ? { priority: true }
    : { loading: loading };

  return (
    <CldImage
      src={cloudinaryId}
      alt={alt}
      {...imageProps}
      {...loadingProps}
      className={className}
      quality={quality}
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