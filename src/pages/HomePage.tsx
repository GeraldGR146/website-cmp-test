import { clientLogos } from "@/cms/homepage";
import { getFeaturedProducts } from "@/cms/products";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { useLocale } from "@/i18n/LocaleContext";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  CheckBadgeIcon,
  Cog6ToothIcon,
  CubeIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

function LogoCarousel({ logos }: { logos: { name: string; image: string }[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      setWidth(trackRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Edge fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-linear-to-r from-slate-50 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-linear-to-l from-slate-50 to-transparent z-10" />

      <motion.div
        ref={trackRef}
        className="flex items-center gap-12 w-max"
        animate={{ x: [0, -width] }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex items-center justify-center w-32 shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          >
            <img
              src={logo.image}
              alt={logo.name}
              className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="group text-center">
      <div className="text-5xl sm:text-4xl font-black text-white leading-none group-hover:text-indigo-200 transition-colors">
        {value}
      </div>
      <div className="mt-4 text-xs uppercase tracking-[0.35em] text-indigo-300 font-semibold group-hover:text-indigo-100 transition-colors">
        {label}
      </div>
    </div>
  );
}

function CapabilityCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="group relative border border-indigo-200 rounded-2xl p-8 bg-white hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-[0_20px_60px_-24px_rgba(79,70,229,0.2)] transition-all duration-300">
      <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-5 bg-indigo-600 transition-opacity duration-300" />
      <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-indigo-700 text-white mb-6 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="text-lg font-semibold text-slate-900 mb-3">
        {title}
      </h3>

      <p className="text-sm text-slate-600 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

/* ───────────── MAIN PAGE ───────────── */

export function HomePage() {
  const { t, locale } = useLocale();
  const navigate = useNavigate();
  const featured = getFeaturedProducts();

  const capabilities = [
    {
      icon: Cog6ToothIcon,
      title: t.home.capabilities.precisionTitle,
      desc: t.home.capabilities.precisionDesc,
    },
    {
      icon: WrenchScrewdriverIcon,
      title: t.home.capabilities.fabricationTitle,
      desc: t.home.capabilities.fabricationDesc,
    },
    {
      icon: CheckBadgeIcon,
      title: t.home.capabilities.qualityTitle,
      desc: t.home.capabilities.qualityDesc,
    },
    {
      icon: CubeIcon,
      title: t.home.capabilities.productionTitle,
      desc: t.home.capabilities.productionDesc,
    },
  ];

  return (
    <div className="bg-linear-to-br from-slate-50 via-white to-blue-50 min-h-screen">

      {/* ───────────── HERO ───────────── */}
      <HeroSection
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        badge="ISO 9001 Certified Manufacturer"
        cta={t.hero.cta}
        secondaryCta={locale === "en" ? "View Products" : "Lihat Produk"}
        onCtaClick={() => navigate(`/${locale}/about`)}
        onSecondaryClick={() => navigate(`/${locale}/products`)}
        backgroundImage="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
        size="large"
      />

      {/* ───────────── TRUST + CAROUSEL ───────────── */}
      <section className="relative bg-linear-to-br from-white via-blue-50 to-indigo-50 border-b border-indigo-100 overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.1) 0%, transparent 50%)`,
        }} />
        <div className="max-w-[1200px] mx-auto px-6 py-16 relative">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-600 mb-3">
              {locale === 'en' ? '⚙️ Trusted By' : '⚙️ Dipercaya Oleh'}
            </p>
            <h3 className="text-2xl font-bold text-slate-900">
              {t.home.trustedBy}
            </h3>
          </div>

          <LogoCarousel logos={clientLogos} />
        </div>
      </section>

      {/* ───────────── STATS ───────────── */}
      <section className="bg-linear-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="max-w-[1200px] mx-auto px-6 py-20 grid grid-cols-2 md:grid-cols-4 gap-6 relative">
          <Stat value="11+" label={t.home.stats.years} />
          <Stat value="<100" label={t.home.stats.quality} />
          <Stat value="500+" label={t.home.stats.clients} />
          <Stat value="200+" label={t.home.stats.products} />
        </div>
      </section>

      {/* ───────────── CAPABILITIES ───────────── */}
      <section className="relative bg-linear-to-br from-slate-100 via-white to-blue-50 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `linear-gradient(135deg, rgba(99,102,241,0.08) 0%, transparent 50%)`,
        }} />
        <div className="max-w-[1200px] mx-auto px-6 relative">
          <div className="max-w-2xl mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-600 mb-3">
              {locale === 'en' ? '⚙️ What We Do' : '⚙️ Apa Yang Kami Lakukan'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              {t.home.capabilities.title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <CapabilityCard key={i} {...cap} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── APPROACH ───────────── */}
      <section className="relative bg-white py-32 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Headline + Company Story */}
          <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] items-center mb-24">
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
                {locale === 'en' ? 'Metal built on conviction' : 'Logam dibangun atas keyakinan'}
              </h1>
            </div>
            <div>
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                {locale === 'en'
                  ? 'PT Cipta Metalindo Persada has spent 11 years becoming the foundry that manufacturers rely on. We combine engineering expertise, reliable machinery, and a relentless commitment to quality to deliver metal components that power industries forward.'
                  : 'PT Cipta Metalindo Persada telah menghabiskan 11 tahun menjadi foundry yang diandalkan oleh manufaktur. Kami menggabungkan keahlian teknik, mesin yang andal, dan komitmen tanpa henti terhadap kualitas untuk menghasilkan komponen logam yang mendorong industri maju.'}
              </p>
            </div>
          </div>

          {/* Three Pillars - No Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-20">
            {[
              {
                title: t.home.story.engineeringTitle,
                description: t.home.story.engineeringDesc,
                image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
              },
              {
                title: t.home.story.machineryTitle,
                description: t.home.story.machineryDesc,
                image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
              },
              {
                title: t.home.story.qualityTitle,
                description: t.home.story.qualityDesc,
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
              },
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl h-96"
              >
                {/* Image Background */}
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  loading="eager"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/50 to-transparent" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-7 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-100 leading-relaxed text-sm sm:text-base">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Large Horizontal Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl h-96 sm:h-[480px] lg:h-[540px] shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1400&q=80"
              alt="PT Cipta Metalindo Persada"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/30 to-transparent" />
            <div className="absolute left-6 bottom-6 rounded-2xl bg-white/98 px-6 py-4 shadow-xl backdrop-blur-md sm:left-8 sm:bottom-8 sm:px-8 sm:py-5">
              <p className="text-xs uppercase tracking-widest text-slate-600 font-semibold">
                {locale === 'en' ? 'Since 2014' : 'Sejak 2014'}
              </p>
              <p className="text-base font-semibold text-slate-900 mt-1">
                {locale === 'en' ? 'Tangerang, Indonesia' : 'Tangerang, Indonesia'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────── FEATURED PRODUCTS ───────────── */}
      <section className="relative bg-linear-to-br from-slate-900 via-slate-800 to-indigo-900 py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(79,70,229,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.2) 0%, transparent 50%)`,
        }} />
        <div className="max-w-[1200px] mx-auto px-6 relative">
          <div className="flex flex-col sm:flex-row justify-between gap-6 mb-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-300 mb-3">
                {locale === "en" ? "⚙️ Product Range" : "⚙️ Pilihan Produk"}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {t.home.featuredProducts}
              </h2>
              <p className="mt-2 text-indigo-100 max-w-md text-base leading-relaxed">
                {t.home.featuredDesc}
              </p>
            </div>

            <div className="flex items-end">
              <Link
                to={`/${locale}/products`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-indigo-200 group transition-colors"
              >
                {t.home.viewAll}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="relative bg-linear-to-br from-[#0B2A59] to-indigo-800 text-white py-24 overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        {/* Content */}
        <div className="max-w-2xl mx-auto px-6 text-center relative">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-200 mb-4">
            {locale === "en" ? "⚙️ Start Your Partnership" : "⚙️ Mulai Kerja Sama"}
          </p>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            {locale === "en"
              ? "Precision Manufacturing You Can Rely On"
              : "Solusi Manufaktur Presisi yang Dapat Anda Andalkan"}
          </h2>

          <p className="mt-4 text-lg text-indigo-100 leading-relaxed">
            {locale === "en"
              ? "From high-quality components to scalable production, we support your business with reliable manufacturing solutions."
              : "Dari komponen berkualitas tinggi hingga produksi skala besar, kami mendukung bisnis Anda dengan solusi manufaktur yang andal."}
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

            {/* Primary Button - Products */}
            <Link
              to={`/${locale}/products`}
              className="inline-flex items-center justify-center gap-3 bg-white text-indigo-700 px-8 py-4 text-base font-semibold rounded-2xl hover:bg-indigo-50 transition-all duration-300 hover:shadow-2xl hover:scale-105 transform w-full sm:w-auto"
            >
              {locale === "en" ? "Explore Products" : "Lihat Produk"}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Secondary Button - Contact */}
            <Link
              to={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-3 border border-white/30 text-white px-8 py-4 text-base font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
            >
              {locale === "en" ? "Contact Us" : "Hubungi Kami"}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
