/**
 * Cloudinary Image Optimization Helper
 *
 * Provides utilities for generating optimized Cloudinary image URLs
 * with automatic format detection, quality optimization, and responsive sizing.
 *
 * Usage:
 *   import { getCloudinaryUrl, getResponsiveSrcSet } from '@/lib/cloudinary';
 *
 *   <img
 *     src={getCloudinaryUrl('products/exhaust-bracket', { width: 400 })}
 *     srcSet={getResponsiveSrcSet('products/exhaust-bracket')}
 *     alt="Product"
 *   />
 *
 * Environment:
 *   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
 */

// ========================================
// Configuration
// ========================================

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

// ========================================
// Types
// ========================================

export interface CloudinaryOptions {
  /** Width in pixels */
  width?: number;
  /** Height in pixels */
  height?: number;
  /** Crop mode */
  crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'crop' | 'pad';
  /** Image quality (1-100 or 'auto') */
  quality?: number | 'auto';
  /** Image format ('auto' for automatic) */
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  /** Gravity for cropping */
  gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west';
  /** Device pixel ratio */
  dpr?: number | 'auto';
  /** Custom transformations string */
  custom?: string;
}

// ========================================
// URL Builder
// ========================================

/**
 * Build a Cloudinary transformation string from options.
 */
function buildTransformations(options: CloudinaryOptions): string {
  const transforms: string[] = [];

  // Always use auto format and quality by default
  transforms.push(`f_${options.format || 'auto'}`);
  transforms.push(`q_${options.quality || 'auto'}`);

  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.crop) transforms.push(`c_${options.crop}`);
  if (options.gravity) transforms.push(`g_${options.gravity}`);
  if (options.dpr) transforms.push(`dpr_${options.dpr}`);
  if (options.custom) transforms.push(options.custom);

  return transforms.join(',');
}

/**
 * Generate an optimized Cloudinary URL for a given public ID.
 *
 * @param publicId - The Cloudinary public ID (e.g., 'products/exhaust-bracket')
 * @param options - Transformation options
 * @returns Full Cloudinary URL
 *
 * @example
 * getCloudinaryUrl('products/bracket', { width: 400, height: 400, crop: 'fill' })
 * // => https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_400,h_400,c_fill/products/bracket
 */
export function getCloudinaryUrl(publicId: string, options: CloudinaryOptions = {}): string {
  const transformations = buildTransformations(options);
  return `${BASE_URL}/${transformations}/${publicId}`;
}

/**
 * Generate a responsive srcSet string for a Cloudinary image.
 *
 * @param publicId - The Cloudinary public ID
 * @param widths - Array of widths to generate (defaults to common breakpoints)
 * @param options - Additional transformation options
 * @returns srcSet string for use in <img> tags
 *
 * @example
 * <img srcSet={getResponsiveSrcSet('hero/factory')} sizes="100vw" />
 */
export function getResponsiveSrcSet(
  publicId: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920],
  options: Omit<CloudinaryOptions, 'width'> = {}
): string {
  return widths
    .map((w) => `${getCloudinaryUrl(publicId, { ...options, width: w })} ${w}w`)
    .join(', ');
}

/**
 * Generate a blurred placeholder URL for lazy loading.
 *
 * @param publicId - The Cloudinary public ID
 * @returns Low-quality blurred placeholder URL
 */
export function getBlurPlaceholder(publicId: string): string {
  return getCloudinaryUrl(publicId, {
    width: 30,
    quality: 30,
    format: 'auto',
    custom: 'e_blur:1000',
  });
}

/**
 * Check if a URL is already a Cloudinary URL.
 */
export function isCloudinaryUrl(url: string): boolean {
  return url.includes('res.cloudinary.com');
}

/**
 * Get optimized image URL - works with both Cloudinary public IDs
 * and regular URLs (returns URL unchanged if not Cloudinary).
 */
export function getOptimizedImageUrl(
  imageSource: string,
  options: CloudinaryOptions = {}
): string {
  // If it's already a full URL (not a Cloudinary public ID), return as-is
  if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
    return imageSource;
  }

  // Otherwise, treat as Cloudinary public ID
  return getCloudinaryUrl(imageSource, options);
}
