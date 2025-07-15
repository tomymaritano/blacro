/**
 * Utilities for Cloudinary image processing
 */

/**
 * Extract image path from src for Cloudinary
 * @param imageSrc - The source image path
 * @returns The Cloudinary public ID
 */
export function getCloudinaryPublicId(imageSrc: string): string {
  // Handle both cases: with or without /images/ prefix
  let cleanPath = imageSrc;
  
  // Remove /images/ prefix if present
  if (imageSrc.startsWith('/images/')) {
    cleanPath = imageSrc.replace('/images/', '');
  }
  
  // Remove file extension if present
  cleanPath = cleanPath.replace(/\.[^/.]+$/, '');
  
  // Return the path for blacro folder in Cloudinary
  return `blacro/${cleanPath}`;
}

/**
 * Generate responsive sizes string for different screen sizes
 * @param isMobile - Whether the device is mobile
 * @returns Optimized sizes string
 */
export function getOptimizedSizes(isMobile: boolean): string {
  return isMobile 
    ? "(max-width: 640px) 100vw, (max-width: 768px) 90vw, 50vw"
    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw";
}

/**
 * Get optimized quality setting based on device type
 * @param isMobile - Whether the device is mobile
 * @param defaultQuality - Default quality setting
 * @returns Optimized quality string
 */
export function getOptimizedQuality(isMobile: boolean, defaultQuality: string | number = "auto:best"): string | number {
  return isMobile ? "auto:eco" : defaultQuality;
}