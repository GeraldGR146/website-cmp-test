import { motion, Variants, useMotionValue, useInView, animate } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useLocale } from "@/i18n/LocaleContext";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/cms/products";
import { clientLogos } from "@/cms/homepage";
import React, { useEffect, useRef, useState} from "react"
import {
  Cog6ToothIcon,
  WrenchScrewdriverIcon,
  CheckBadgeIcon,
  CubeIcon
} from "@heroicons/react/24/outline";

/* ---------------- ANIMATION SYSTEM ---------------- */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};



function StatNumber({ value }: { value: number }) {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const isInView = useInView(ref, { once: true })

  const [display, setDisplay] = React.useState(0)

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplay(Math.floor(latest))
        }
      })

      return controls.stop
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {display}
    </span>
  )
}
/* ---------------- PAGE ---------------- */

export function HomePage() {
  const { t, locale } = useLocale();
  const navigate = useNavigate();
  const featured = getFeaturedProducts();

  const learnMoreText = locale === "en" ? "Learn More" : "Lihat Detail";

  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      setWidth(trackRef.current.scrollWidth / 2);
    }
  }, []);



  return (
    <div className="overflow-hidden">

      {/* HERO */}

      <HeroSection
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        cta={learnMoreText}
        onCtaClick={() => navigate(`/${locale}/about`)}
        backgroundImage="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
        overlay="blue"
        size="full"
      />

      {/* CLIENT LOGOS */}

      <section className="py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-6">

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-14"
          >
            {t.home.trustedBy}
          </motion.p>

          <div className="relative overflow-hidden">

            <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10" />

            <motion.div
              ref={trackRef}
              className="flex gap-20 items-center w-max"
              animate={{ x: [0, -width] }}
              transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
            >
              {[...clientLogos, ...clientLogos, ...clientLogos].map((client, idx) => (
                <div
                  key={`${client.name}-${idx}`}
                  className="flex items-center justify-center grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300 w-36 shrink-0"
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

      {/* STATS */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-[1100px] px-6">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200"
          >

            {[
              { id: "years", value: 11, suffix: "+", label: t.home.stats.years },
              { id: "clients", value: 50, suffix: "+", label: t.home.stats.clients },
              { id: "products", value: 200, suffix: "+", label: t.home.stats.products },
              { id: "iso", value: 9001, suffix: "", label: t.home.stats.certified }
            ].map((stat) => (
              <motion.div
                key={stat.id}
                variants={fadeUp}
                className="flex flex-col items-center justify-center py-10 px-6 text-center"
              >

                {/* Animated Number */}
                <div className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                  <StatNumber value={stat.value} />
                  {stat.suffix}
                </div>

                {/* Label */}
                <div className="text-xs md:text-sm uppercase tracking-widest text-slate-500 mt-2">
                  {stat.label}
                </div>

              </motion.div>
            ))}

          </motion.div>

        </div>
      </section>

      {/* SCROLL STORYTELLING SECTION */}

      <section className="bg-gradient-to-br from-slate-50 to-white py-32">
        <div className="mx-auto max-w-[1200px] px-6 grid lg:grid-cols-2 gap-20">

          {/* Sticky image */}

          <div className="lg:sticky top-32 h-fit">
            <img
              src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1200"
              className="rounded-2xl shadow-xl"
            />
          </div>

          {/* Story blocks */}

          <div className="space-y-28">

            {[
              {
                title: t.home.story.engineeringTitle,
                text: t.home.story.engineeringDesc
              },
              {
                title: t.home.story.machineryTitle,
                text: t.home.story.machineryDesc
              },
              {
                title: t.home.story.qualityTitle,
                text: t.home.story.qualityDesc
              }
            ].map((item) => (

              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >

                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-lg">
                  {item.text}
                </p>

              </motion.div>

            ))}

          </div>

        </div>
      </section>

      {/* CAPABILITIES */}

      <section className="py-28 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              {t.home.capabilities.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

            {[
              {
                icon: Cog6ToothIcon,
                title: t.home.capabilities.precisionTitle,
                desc: t.home.capabilities.precisionDesc
              },
              {
                icon: WrenchScrewdriverIcon,
                title: t.home.capabilities.fabricationTitle,
                desc: t.home.capabilities.fabricationDesc
              },
              {
                icon: CheckBadgeIcon,
                title: t.home.capabilities.qualityTitle,
                desc: t.home.capabilities.qualityDesc
              },
              {
                icon: CubeIcon,
                title: t.home.capabilities.productionTitle,
                desc: t.home.capabilities.productionDesc
              }
            ].map((item) => {

              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-10 bg-slate-50 rounded-2xl hover:shadow-xl transition"
                >

                  <Icon className="w-10 h-10 text-[#0B2A59] mb-4" />

                  <h3 className="font-semibold text-lg text-gray-900">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-3">
                    {item.desc}
                  </p>

                </motion.div>
              );

            })}

          </div>

        </div>
      </section>

      {/* FEATURED PRODUCTS */}

      <section className="py-28 bg-slate-50">
        <div className="mx-auto max-w-[1200px] px-6">

          <div className="text-center mb-20">

            <h2 className="text-4xl font-black text-gray-900">
              {t.home.featuredProducts}
            </h2>

            <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg">
              {t.home.featuredDesc}
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {featured.slice(0, 9).map((product) => (

              <motion.div
                key={product.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>

            ))}

          </div>

          <div className="mt-20 text-center">

            <Link
              to={`/${locale}/products`}
              className="inline-flex items-center gap-3 rounded-xl bg-[#0B2A59] px-10 py-4 text-lg font-bold text-white shadow-xl hover:bg-[#0d3470] transition"
            >
              {t.home.viewAll}
            </Link>

          </div>

        </div>
      </section>

      {/* CTA */}

      <section className="py-24 bg-[#0B2A59] text-white text-center">

        <div className="max-w-3xl mx-auto px-6">

          <h2 className="text-4xl font-bold">
            {t.home.cta.title}
          </h2>

          <p className="text-blue-100 mt-4">
            {t.home.cta.desc}
          </p>

          <Link
            to={`/${locale}/contact`}
            className="inline-block mt-8 bg-white text-[#0B2A59] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            {t.home.cta.button}
          </Link>

        </div>

      </section>

    </div>
  );
}