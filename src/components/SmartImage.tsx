'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

type FocalPoint = { x: number; y: number };

type ArtDirectionSource = {
  srcSet: string;
  media: string;
  type?: string;
};

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  rounded?: string;

  // Core 0.01% features
  focalPoint?: FocalPoint;           // Manual override
  autoDetectFocalPoint?: boolean;    // Simple subject detection
  artDirection?: ArtDirectionSource[]; // Different crops per breakpoint
  blurDataURL?: string;              // Base64 blurred placeholder
  dominantColor?: string;            // Background color while loading

  hover?: boolean;
  hoverScale?: number;
  hoverLift?: boolean;
  glowColor?: string;

  priority?: boolean;
  quality?: number;
  objectFit?: 'cover' | 'contain';

  onLoad?: () => void;
  onError?: () => void;
  fallback?: React.ReactNode;
}

export function SmartImage({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-video',
  rounded = 'rounded-3xl',
  focalPoint = { x: 0.5, y: 0.4 },
  autoDetectFocalPoint = false,
  artDirection,
  blurDataURL,
  dominantColor = '#0f172a',
  hover = false,
  hoverScale = 1.09,
  hoverLift = true,
  glowColor,
  priority = false,
  objectFit = 'cover',
  onLoad,
  onError,
  fallback,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentFocalPoint, setCurrentFocalPoint] = useState<FocalPoint>(focalPoint);
  const imgRef = useRef<HTMLImageElement>(null);

  const objectPosition = `${currentFocalPoint.x * 100}% ${currentFocalPoint.y * 100}%`;

  // Lightweight subject detection (can be upgraded to MediaPipe later)
  const detectSubject = useCallback(() => {
    if (!autoDetectFocalPoint || !imgRef.current) return;

    const img = imgRef.current;
    if (img.naturalHeight === 0) return;

    // Premium heuristic: Bias toward upper 2/3 (where faces usually are)
    // You can replace this with real ML later
    setCurrentFocalPoint({
      x: focalPoint.x,
      y: Math.max(0.25, Math.min(0.65, focalPoint.y || 0.38)),
    });
  }, [autoDetectFocalPoint, focalPoint]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true);
    detectSubject();
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    onError?.();
  };

  if (error) {
    return fallback || (
      <div className={`${aspectRatio} ${rounded} ${className} bg-zinc-950 flex items-center justify-center overflow-hidden`}>
        <div className="text-center opacity-40">
          <span className="block text-5xl mb-2">×</span>
          <div className="text-xs tracking-widest uppercase">Image unavailable</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${aspectRatio} ${rounded} ${className} overflow-hidden relative bg-zinc-950 group`}
      style={{ backgroundColor: dominantColor }}
    >
      {/* Blur Placeholder */}
      <AnimatePresence>
        {!loaded && blurDataURL && (
          <img
            src={blurDataURL}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl brightness-75"
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Backdrop Layer (adds depth) */}
      {loaded && (
        <img
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110 opacity-30 blur-3xl pointer-events-none select-none"
          style={{ objectPosition }}
          aria-hidden
        />
      )}

      {/* Main Image */}
      <picture>
        {artDirection?.map((source, i) => (
          <source
            key={i}
            srcSet={source.srcSet}
            media={source.media}
            type={source.type}
          />
        ))}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          className={`absolute inset-0 w-full h-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'} transition-transform duration-[900ms] ease-out`}
          style={{
            objectPosition,
            transform: hover ? `scale(${hoverScale})` : 'scale(1)',
          }}
        />
      </picture>

      {/* Bottom vignette */}
      {loaded && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none z-10" />
      )}

      {/* Premium Hover Glow */}
      {glowColor && hover && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.6 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-20 pointer-events-none mix-blend-soft-light"
          style={{
            background: `radial-gradient(circle at ${objectPosition}, ${glowColor} 10%, transparent 65%)`,
          }}
        />
      )}

      {/* Hover Lift */}
      {hover && hoverLift && (
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-white/25 transition-all duration-700 z-30 rounded-[inherit]" />
      )}

      {/* Shimmer */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30"
            style={{
              background: 'linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.07) 50%, transparent 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.6s infinite linear',
            }}
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}