import { useLocale } from '@/i18n/LocaleContext';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { locale, t } = useLocale();

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        <img
          src={product.image}
          alt={product.name[locale]}
          className="w-full h-full object-cover product-card-image"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A59]/90 via-[#0B2A59]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* View Details button on hover */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
          <button className="w-full bg-white/95 backdrop-blur-sm text-[#0B2A59] text-sm font-semibold py-2.5 rounded-xl
            hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg">
            {t.products.viewDetails}
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#0B2A59] transition-colors duration-300 line-clamp-1">
              {product.name[locale]}
            </h3>
            <p className="mt-1 text-xs text-gray-500 line-clamp-2">
              {product.description[locale]}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <span className="text-[10px] font-medium uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full
            group-hover:bg-[#0B2A59] group-hover:text-white transition-colors duration-300">
            {t.products.categories[product.category as keyof typeof t.products.categories] || product.category}
          </span>
        </div>
      </div>
    </div>
  );
}
