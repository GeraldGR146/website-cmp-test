import { useLocale } from '@/i18n/LocaleContext';
import type { Product } from '@/types';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { locale, t } = useLocale();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);


  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100/80 shadow-sm 
        hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-2 
        will-change-transform"
      dir= "ltr" 
    >
      {/* Category Badge - Floating */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest 
            text-white bg-[#0B2A59]/80 backdrop-blur-md px-3 py-1.5 rounded-full
            border border-white/20 shadow-lg
            group-hover:bg-[#1a4a8a] transition-all duration-300"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          {t.products.categories[product.category as keyof typeof t.products.categories] || product.category}
        </span>
      </div>

      {/* Image Container */}
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
        {/* Skeleton loader */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-gray-200 border-t-blue-500 animate-spin" />
          </div>
        )}

        {/* Error fallback */}
        {imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-2">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-medium">Image unavailable</span>
          </div>
        )}

        <img
          src={product.image}
          alt={product.name[locale]}
          className={`w-full h-full object-cover transition-all duration-700 ease-out
            group-hover:scale-110 group-hover:rotate-1
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />

        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
          opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2A59]/30 to-transparent 
          opacity-0 group-hover:opacity-100 transition-all duration-700" />

        {/* View Details CTA */}
        {/* <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-6 
          group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150 z-10">
          <button
            className="w-full bg-white/95 backdrop-blur-md text-[#0B2A59] text-sm font-bold py-3 rounded-xl
              hover:bg-white transition-all duration-200 flex items-center justify-center gap-2 
              shadow-xl shadow-black/20 active:scale-[0.98]"
          >
            {t.products.viewDetails}
            <svg
              className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div> */}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Product name */}
        <h3
          className="text-base font-bold text-gray-900 group-hover:text-[#0B2A59] 
            transition-colors duration-300 line-clamp-1 leading-tight"
        >
          {product.name[locale]}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {product.description[locale]}
        </p>
      </div>

      {/* Subtle accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-[#0B2A59] to-blue-500 
        transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}