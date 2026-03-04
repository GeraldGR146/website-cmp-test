import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleContext';
import { HeroSection } from '@/components/HeroSection';
import { ProductCard } from '@/components/ProductCard';
import { getFeaturedProducts } from '@/cms/products';
import { clientLogos } from '@/cms/homepage';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export function HomePage() {
  const { t, locale } = useLocale();
  const navigate = useNavigate();
  const featured = getFeaturedProducts();

  const learnMoreText = locale === 'en' ? 'Learn More' : 'Pelajari Selengkapnya';

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection
          title={t.hero.title}
          subtitle={t.hero.subtitle}
          cta={learnMoreText}
          onCtaClick={() => navigate(`/${locale}/about`)}
          backgroundImage="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
          overlay="blue"
          size="full"
        />
      </motion.div>

      {/* Client Logos Carousel */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-12"
          >
            {t.home.trustedBy}
          </motion.p>
          
          <div className="relative flex overflow-x-hidden">
            <motion.div 
              className="flex gap-20 items-center whitespace-nowrap"
              animate={{ x: [0, -1000] }}
              transition={{ 
                repeat: Infinity, 
                duration: 30, 
                ease: "linear" 
              }}
            >
              {[...clientLogos, ...clientLogos, ...clientLogos].map((client, idx) => (
                <div
                  key={`${client.name}-${idx}`}
                  className="flex items-center justify-center grayscale opacity-40 hover:opacity-100 transition-all duration-300 w-32 shrink-0"
                >
                  <img
                    src={client.image}
                    alt={client.name}
                    className="h-14 md:h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black text-gray-900 tracking-tight"
            >
              {t.home.featuredProducts}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg"
            >
              {t.home.featuredDesc}
            </motion.p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featured.slice(0, 9).map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center"
          >
            <Link
              to={`/${locale}/products`}
              className="inline-flex items-center gap-3 rounded-2xl bg-[#0B2A59] px-10 py-4 text-lg font-bold text-white shadow-xl hover:shadow-2xl hover:bg-[#0d3470] transition-all transform hover:-translate-y-1"
            >
              {t.home.viewAll}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quality Banner */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-[#0B2A59] rounded-[40px] p-12 lg:p-24 overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-8">
                  Precision Engineering for Industrial Excellence
                </h2>
                <div className="flex gap-4">
                  <div className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold border border-white/20">
                    ISO 9001:2015
                  </div>
                  <div className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-bold border border-white/20">
                    Industry 4.0
                  </div>
                </div>
              </div>
              <div className="text-blue-100 text-lg leading-relaxed">
                Our manufacturing process combines decades of expertise with cutting-edge technology to deliver components that exceed global standards. From automotive parts to household solutions, we are your partner in quality.
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}