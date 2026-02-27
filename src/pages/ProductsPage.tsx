import { useState, useMemo } from 'react';
import { useLocale } from '@/i18n/LocaleContext';
import { HeroSection } from '@/components/HeroSection';
import { ProductTabs } from '@/components/ProductTabs';
import { ProductCard } from '@/components/ProductCard';
import { AnimatedSection } from '@/components/AnimatedSection';
import { getProductsByCategory } from '@/cms/products';
import type { ProductCategory } from '@/types';

type ViewMode = 'grid' | 'list';
const PRODUCTS_PER_PAGE = 6;

export function ProductsPage() {
  const { locale, t } = useLocale();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [animKey, setAnimKey] = useState(0);

  const allProducts = getProductsByCategory(activeCategory);
  const totalPages = Math.max(1, Math.ceil(allProducts.length / PRODUCTS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return allProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [allProducts, currentPage]);

  const handleCategoryChange = (cat: ProductCategory) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    setAnimKey(prev => prev + 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setAnimKey(prev => prev + 1);
    // Scroll to product section
    const el = document.getElementById('products-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const startItem = (currentPage - 1) * PRODUCTS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * PRODUCTS_PER_PAGE, allProducts.length);

  return (
    <div className="page-enter">
      {/* Hero */}
      <HeroSection
        title={t.products.title}
        subtitle={t.products.subtitle}
        backgroundImage="https://res.cloudinary.com/dtny14e7t/image/upload/v1770360393/samples/bike.jpg"
        overlay="blue"
        size="small"
      />

      {/* Products Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          {/* Tabs */}
          <AnimatedSection animation="fade-down" className="mb-8">
            <ProductTabs
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </AnimatedSection>

          {/* Toolbar: view toggle + count */}
          <div className="flex items-center justify-between mb-6" id="products-grid">
            {/* Product count */}
            <p className="text-sm text-gray-500">
              {t.products.showing}{' '}
              <span className="font-semibold text-gray-800">{startItem}–{endItem}</span>{' '}
              {t.products.of}{' '}
              <span className="font-semibold text-gray-800">{allProducts.length}</span>{' '}
              {t.products.productsLabel}
            </p>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => { setViewMode('grid'); setAnimKey(prev => prev + 1); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#0B2A59] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title={t.products.gridView}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className="hidden sm:inline">{t.products.gridView}</span>
              </button>
              <button
                onClick={() => { setViewMode('list'); setAnimKey(prev => prev + 1); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-white text-[#0B2A59] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title={t.products.listView}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span className="hidden sm:inline">{t.products.listView}</span>
              </button>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div key={`grid-${animKey}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product, i) => (
                <div
                  key={product.id}
                  className="anim-fade-up anim-visible"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div key={`list-${animKey}`} className="space-y-4">
              {paginatedProducts.map((product, i) => (
                <div
                  key={product.id}
                  className="anim-fade-up anim-visible"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="group flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl
                    transition-all duration-500 hover:-translate-y-0.5 overflow-hidden">
                    {/* Image */}
                    <div className="sm:w-48 sm:h-48 h-48 shrink-0 overflow-hidden bg-gray-100 relative">
                      <img
                        src={product.image}
                        alt={product.name[locale]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 group-hover:to-[#0B2A59]/10 transition-all duration-500" />
                    </div>
                    {/* Content */}
                    <div className="flex-1 p-4 sm:py-5 sm:pr-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#0B2A59] transition-colors duration-300">
                            {product.name[locale]}
                          </h3>
                          <span className="text-[10px] font-medium uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full shrink-0
                            group-hover:bg-[#0B2A59] group-hover:text-white transition-colors duration-300">
                            {t.products.categories[product.category as keyof typeof t.products.categories] || product.category}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                          {product.description[locale]}
                        </p>
                      </div>
                      <div className="mt-4">
                        <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B2A59] hover:text-[#1e5aad] 
                          group-hover:gap-2.5 transition-all duration-300">
                          {t.products.viewDetails}
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {paginatedProducts.length === 0 && (
            <AnimatedSection animation="scale-up" className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-gray-400 text-sm">{t.products.noProducts}</p>
            </AnimatedSection>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 
                  text-gray-600 hover:border-[#0B2A59] hover:text-[#0B2A59] hover:shadow-md transition-all duration-300
                  disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-600 disabled:hover:shadow-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t.products.prev}
              </button>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-[#0B2A59] text-white shadow-lg shadow-[#0B2A59]/25 scale-110'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next button */}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 
                  text-gray-600 hover:border-[#0B2A59] hover:text-[#0B2A59] hover:shadow-md transition-all duration-300
                  disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-600 disabled:hover:shadow-none"
              >
                {t.products.next}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
