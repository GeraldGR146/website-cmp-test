/**
 * CloudinaryImage Component
 *
 * A reusable image component that automatically optimizes images
 * through Cloudinary. Supports:
 * - Automatic format (WebP/AVIF)
 * - Automatic quality optimization
 * - Responsive srcSet generation
 * - Lazy loading with blur placeholder
 * - Fallback for non-Cloudinary URLs
 *
 * @example
 * <CloudinaryImage
 *   src="products/exhaust-bracket"
 *   alt="Exhaust Bracket"
 *   width={400}
 *   height={400}
 *   crop="fill"
 * />
 */

import { useState } from 'react';
import {
  getOptimizedImageUrl,
  getResponsiveSrcSet,
  type CloudinaryOptions,
} from '@/lib/cloudinary';
import { cn } from '@/utils/cn';

interface CloudinaryImageProps extends Omit<CloudinaryOptions, 'format' | 'quality'> {
  /** Cloudinary public ID or full image URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Additional CSS classes */
  className?: string;
  /** Loading strategy */
  loading?: 'lazy' | 'eager';
  /** Whether to generate responsive srcSet */
  responsive?: boolean;
  /** Custom sizes attribute for responsive images */
  sizes?: string;
  /** Object-fit CSS property */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  /** Fallback image URL on error */
  fallback?: string;
}

export function CloudinaryImage({
  src,
  alt,
  className,
  loading = 'lazy',
  responsive = false,
  sizes,
  objectFit = 'cover',
  fallback,
  width,
  height,
  crop = 'fill',
  gravity = 'auto',
  dpr,
  custom,
}: CloudinaryImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const optimizedSrc = hasError && fallback
    ? fallback
    : getOptimizedImageUrl(src, { width, height, crop, gravity, dpr, custom });

  const srcSet = responsive && !src.startsWith('http')
    ? getResponsiveSrcSet(src, undefined, { crop, gravity })
    : undefined;

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={loading}
      width={width}
      height={height}
      onError={() => setHasError(true)}
      onLoad={() => setIsLoaded(true)}
      className={cn(
        'transition-opacity duration-300',
        isLoaded ? 'opacity-100' : 'opacity-0',
        objectFit === 'cover' && 'object-cover',
        objectFit === 'contain' && 'object-contain',
        objectFit === 'fill' && 'object-fill',
        className,
      )}
    />
  );
}
