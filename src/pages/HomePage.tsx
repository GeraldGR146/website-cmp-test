import { useEffect, useRef, useState } from 'react';
import { useLocale } from '@/i18n/LocaleContext';
import { HeroSection } from '@/components/HeroSection';
import { ProductCard } from '@/components/ProductCard';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { getFeaturedProducts } from '@/cms/products';
import { clientLogos } from '@/cms/homepage';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

function LogoCarousel() {
  const { t } = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      if (!isPaused) {
        scrollPos += speed;
        // Reset when we've scrolled past the first set
        const singleSetWidth = el.scrollWidth / 3;
        if (scrollPos >= singleSetWidth) {
          scrollPos = 0;
        }
        el.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section className="py-12 bg-gray-50 border-b border-gray-100 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <AnimatedSection animation="fade-down">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8">
            {t.home.trustedBy}
          </p>
        </AnimatedSection>
      </div>

      <div
        ref={scrollRef}
        className="overflow-hidden whitespace-nowrap"
        // onMouseEnter={() => setIsPaused(true)}
        // onMouseLeave={() => setIsPaused(false)}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="inline-flex gap-10 px-10 items-center">
          {duplicatedLogos.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="inline-flex items-center justify-center h-20 w-40 px-6 py-4 rounded-xl bg-white border border-gray-100 
                shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-[#0B2A59]/20
                transition-all duration-300 cursor-pointer shrink-0 group"
            >
              <img
                src={client.image}
                alt={client.name}
                className="h-10 w-auto max-w-[120px] object-contain grayscale opacity-50 
                  group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        div[style*="scrollbar-width"] {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        div[style*="scrollbar-width"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLocale();
  const featured = getFeaturedProducts();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <div className="page-enter">
      {/* Hero Section — CTA now says "Learn More" and goes to About */}
      <HeroSection
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        cta={t.hero.cta}
        onCtaClick={() => onNavigate('about')}
        backgroundImage="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
        overlay="blue"
        size="full"
      />

      {/* Client Logos Carousel */}
      <LogoCarousel />

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {t.home.featuredProducts}
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              {t.home.featuredDesc}
            </p>
          </AnimatedSection>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 9).map((product, i) => (
              <div
                key={product.id}
                className={`anim-fade-up ${gridVisible ? 'anim-visible' : ''}`}
                style={{ transitionDelay: gridVisible ? `${i * 80}ms` : '0ms' }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <AnimatedSection animation="fade-up" delay={400} className="mt-12 text-center">
            <button
              onClick={() => onNavigate('products')}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0B2A59] px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:bg-[#0d3470] transition-all hover:-translate-y-0.5 hover:scale-105 duration-300"
            >
              {t.home.viewAll}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}