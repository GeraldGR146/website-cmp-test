// HomePage.tsx
import { clientLogos } from "@/cms/homepage";
import { getFeaturedProducts } from "@/cms/products";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { useLocale } from "@/i18n/LocaleContext";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CheckBadgeIcon,
  Cog6ToothIcon,
  CubeIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

/* ══════════════════════════════════════
   CONSTANTS
   ══════════════════════════════════════ */
const CMP_BLUE = "#1B4F9B";
const EASE     = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: "-60px" },
  transition:  { duration: 0.75, ease: EASE },
} as const;

/* ══════════════════════════════════════
   SHARED: CHEVRON
   ══════════════════════════════════════ */
function ChevronRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

/* ══════════════════════════════════════
   SHARED: SECTION LABEL
   Mirrors AboutPage's "About Us" / "Tentang Kami" label style
   ══════════════════════════════════════ */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-bold tracking-[0.35em] text-zinc-500 uppercase mb-6 block">
      {children}
    </span>
  );
}

/* ══════════════════════════════════════
   LOGO CAROUSEL
   ══════════════════════════════════════ */
function LogoCarousel({ logos }: { logos: { name: string; image: string }[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth]   = useState(0);

  useEffect(() => {
    if (trackRef.current) setWidth(trackRef.current.scrollWidth / 2);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {(["left", "right"] as const).map((side) => (
        <div
          key={side}
          className={`pointer-events-none absolute ${side}-0 top-0 h-full w-32 z-10`}
          style={{
            background: `linear-gradient(to ${side === "left" ? "right" : "left"}, #ffffff, transparent)`,
          }}
        />
      ))}
      <motion.div
        ref={trackRef}
        className="flex items-center gap-12 w-max"
        animate={{ x: [0, -width] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex items-center justify-center w-32 shrink-0 opacity-40 hover:opacity-100 transition-opacity duration-300"
          >
            <img
              src={logo.image}
              alt={logo.name}
              className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════
   STAT CARD
   Matches AboutPage StatsSection exactly:
   zinc-900 bg, left-aligned, indigo hover underline
   ══════════════════════════════════════ */
function StatCard({
  value,
  label,
  accent = "text-white",
}: {
  value: string;
  label: string;
  accent?: string;
}) {
  return (
    <motion.div
      {...fadeUp}
      className="group relative p-8 lg:p-10 flex flex-col items-start"
    >
      <div className={`text-4xl lg:text-5xl font-black tabular-nums leading-none tracking-tight mb-3 ${accent}`}>
        {value}
      </div>
      <p className="text-sm lg:text-base font-medium text-zinc-400 leading-snug group-hover:text-zinc-200 transition-colors">
        {label}
      </p>
      <div className="absolute bottom-0 left-0 h-0.5 bg-indigo-500 w-0 group-hover:w-full transition-all duration-300" />
    </motion.div>
  );
}

/* ══════════════════════════════════════
   CAPABILITY CARD
   Accent palette updated to match AboutPage's indigo/violet/sky/zinc
   ══════════════════════════════════════ */
const CAP_ACCENTS = [
  { bg: "bg-indigo-600", hover: "hover:border-indigo-300", text: "text-indigo-600" },
  { bg: "bg-sky-600",    hover: "hover:border-sky-300",    text: "text-sky-600"    },
  { bg: "bg-violet-600", hover: "hover:border-violet-300", text: "text-violet-600" },
  { bg: "bg-zinc-700",   hover: "hover:border-zinc-400",   text: "text-zinc-600"   },
] as const;

function CapabilityCard({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  index: number;
}) {
  const a = CAP_ACCENTS[index % CAP_ACCENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className={`group relative border border-zinc-200 rounded-2xl p-7 bg-white
                  ${a.hover} hover:shadow-lg transition-all duration-300 flex flex-col gap-4`}
    >
      <span className="absolute top-5 right-6 text-6xl font-black text-zinc-100 select-none leading-none pointer-events-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className={`relative w-10 h-10 flex items-center justify-center rounded-xl
                       ${a.bg} text-white shrink-0 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-5 h-5" />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-bold text-zinc-900 leading-snug">{title}</h3>
        <p className="text-sm text-zinc-600 leading-relaxed">{desc}</p>
      </div>

      <div className={`absolute bottom-0 inset-x-7 h-[2px] rounded-full bg-current
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${a.text}`} />
    </motion.div>
  );
}

/* ══════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════ */
export function HomePage() {
  const { t, locale } = useLocale();
  const navigate      = useNavigate();
  const featured      = getFeaturedProducts();

  const capabilities = [
    { icon: Cog6ToothIcon,         title: t.home.capabilities.precisionTitle,   desc: t.home.capabilities.precisionDesc   },
    { icon: WrenchScrewdriverIcon, title: t.home.capabilities.fabricationTitle, desc: t.home.capabilities.fabricationDesc },
    { icon: CheckBadgeIcon,        title: t.home.capabilities.qualityTitle,     desc: t.home.capabilities.qualityDesc     },
    { icon: CubeIcon,              title: t.home.capabilities.productionTitle,  desc: t.home.capabilities.productionDesc  },
  ];

  /* Parallax for wide story image */
  const wideRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wideRef, offset: ["start end", "end start"] });
  const wideY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div className="bg-slate-950">

      {/* ══════════════════════════════════════
          HERO
          ══════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════
          TRUSTED BY
          bg-white + border-b — mirrors StorySection
          ══════════════════════════════════════ */}
      <section className="relative bg-white border-b border-zinc-200 py-20 overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-16">

          <motion.div {...fadeUp} className="text-center mb-12">
            <SectionLabel>{locale === "en" ? "Trusted By" : "Dipercaya Oleh"}</SectionLabel>
            <h3 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight leading-[1.05]">
              {t.home.trustedBy}
            </h3>
            {/* Thin rule — keeps the editorial feel without amber ornaments */}
            <div className="mt-5 mx-auto w-12 h-[2px]" style={{ backgroundColor: CMP_BLUE }} />
          </motion.div>

          <LogoCarousel logos={clientLogos} />

          <motion.div
            {...fadeUp}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              to={`/${locale}/about`}
              className="group inline-flex items-center gap-2 text-sm font-semibold
                         text-zinc-600 hover:text-zinc-900 border-b border-zinc-300
                         hover:border-zinc-700 pb-0.5 transition-colors duration-200"
            >
              {locale === "en" ? "Learn about our company" : "Pelajari perusahaan kami"}
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <span className="hidden sm:block text-zinc-300">·</span>
            <Link
              to={`/${locale}/contact`}
              className="group inline-flex items-center gap-2 text-sm font-semibold
                         text-zinc-600 hover:text-zinc-900 border-b border-zinc-300
                         hover:border-zinc-700 pb-0.5 transition-colors duration-200"
            >
              {locale === "en" ? "Become a partner" : "Jadilah mitra kami"}
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS
          bg-zinc-900 — identical to AboutPage StatsSection
          ══════════════════════════════════════ */}
      <section className="relative bg-zinc-900 border-y border-zinc-800 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">

          {/* Label row */}
          <div className="px-8 lg:px-10 pt-10">
            <SectionLabel>{locale === "en" ? "By The Numbers" : "Dalam Angka"}</SectionLabel>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-800">
            {[
              { value: "11+",  label: t.home.stats.years,   accent: "text-white"      },
              { value: "<100", label: t.home.stats.quality, accent: "text-indigo-400" },
              { value: "20+",  label: t.home.stats.clients, accent: "text-white"      },
              { value: "200+", label: t.home.stats.products,accent: "text-indigo-400" },
            ].map((s) => <StatCard key={s.label} {...s} />)}
          </div>

          {/* Footer row */}
          <motion.div
            {...fadeUp}
            className="px-8 lg:px-10 py-8 border-t border-zinc-800
                       flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <p className="text-sm text-zinc-500 max-w-md leading-relaxed">
              {locale === "en"
                ? "Numbers that reflect 11 years of consistent quality and excellence in metal manufacturing."
                : "Angka yang mencerminkan 11 tahun kualitas konsisten dan keunggulan dalam manufaktur metal."}
            </p>
            <Link
              to={`/${locale}/about`}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-zinc-700
                         text-sm font-semibold text-zinc-300 hover:text-white hover:border-zinc-500
                         hover:bg-white/5 transition-all duration-200 shrink-0"
            >
              {locale === "en" ? "Our Full Story" : "Cerita Lengkap Kami"}
              <ChevronRight />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          CAPABILITIES
          bg-white — mirrors StorySection, subtle grid watermark kept
          ══════════════════════════════════════ */}
      <section className="relative bg-white border-b border-zinc-200 py-24 lg:py-32 overflow-hidden">
        {/* Blueprint grid watermark — toned down to match About's aesthetic */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Corner marks */}
        {[
          "top-8 left-8 border-t-2 border-l-2",
          "top-8 right-8 border-t-2 border-r-2",
          "bottom-8 left-8 border-b-2 border-l-2",
          "bottom-8 right-8 border-b-2 border-r-2",
        ].map((cls) => (
          <div key={cls} className={`absolute w-8 h-8 border-zinc-200 ${cls}`} />
        ))}

        <div className="max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-16 relative">
          <motion.div {...fadeUp} className="mb-16">
            <SectionLabel>{locale === "en" ? "What We Do" : "Apa Yang Kami Lakukan"}</SectionLabel>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              {/* Headline matches AboutPage h2 scale */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900
                             leading-[1.05] tracking-tight max-w-lg">
                {t.home.capabilities.title}
              </h2>

              <Link
                to={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl shrink-0
                           text-sm font-semibold text-white hover:opacity-90 transition-opacity
                           self-start sm:self-auto"
                style={{ backgroundColor: CMP_BLUE }}
              >
                {locale === "en" ? "Request a Quote" : "Minta Penawaran"}
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {capabilities.map((cap, i) => (
              <CapabilityCard key={i} {...cap} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STORY / APPROACH
          bg-white — same as StorySection
          ══════════════════════════════════════ */}
      <section className="relative bg-white border-b border-zinc-200 py-24 lg:py-32 overflow-hidden">
        {/* Thin top rule — matches AboutPage section dividers */}
        <div className="absolute left-1/2 top-0 w-px h-16 bg-zinc-200" />

        <div className="max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-16">

          {/* Headline + lede — matches StorySection layout */}
          <motion.div {...fadeUp} className="mb-20">
            <SectionLabel>{locale === "en" ? "Our Story" : "Cerita Kami"}</SectionLabel>

            <div className="grid gap-10 lg:gap-20 lg:grid-cols-[1fr_1.25fr] items-start">
              <div>
                {/* h2 with CMP-blue first letter — mirrors Capable./Cermat. pattern */}
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900
                               leading-[1.05] tracking-tight mb-8">
                  {locale === "en" ? (
                    <>
                      <span style={{ color: CMP_BLUE }}>M</span>etal built<br />
                      on conviction.
                    </>
                  ) : (
                    <>
                      <span style={{ color: CMP_BLUE }}>L</span>ogam dibangun<br />
                      atas keyakinan.
                    </>
                  )}
                </h2>
                <Link
                  to={`/${locale}/about`}
                  className="group inline-flex items-center gap-2 text-sm font-semibold
                             text-zinc-700 hover:text-zinc-900 border-b border-zinc-300
                             hover:border-zinc-700 pb-0.5 transition-colors duration-200"
                >
                  {locale === "en" ? "Read our full story" : "Baca cerita lengkap kami"}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="lg:border-l lg:border-zinc-200 lg:pl-12 pt-2">
                <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
                  {locale === "en"
                    ? "PT Cipta Metalindo Persada has spent 11 years becoming the foundry that manufacturers rely on. We combine engineering expertise, reliable machinery, and a relentless commitment to quality to deliver metal components that power industries forward."
                    : "PT Cipta Metalindo Persada telah menghabiskan 11 tahun menjadi foundry yang diandalkan oleh manufaktur. Kami menggabungkan keahlian teknik, mesin yang andal, dan komitmen tanpa henti terhadap kualitas."}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Three Pillars — structure kept, CMP blue accent line */}
          <div className="grid gap-6 sm:grid-cols-3 mb-6">
            {[
              {
                title:       t.home.story.engineeringTitle,
                description: t.home.story.engineeringDesc,
                image:       "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
                tag:         locale === "en" ? "Engineering" : "Keahlian",
              },
              {
                title:       t.home.story.machineryTitle,
                description: t.home.story.machineryDesc,
                image:       "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80",
                tag:         locale === "en" ? "Machinery" : "Mesin",
              },
              {
                title:       t.home.story.qualityTitle,
                description: t.home.story.qualityDesc,
                image:       "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
                tag:         locale === "en" ? "Quality" : "Kualitas",
              },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className="group relative overflow-hidden rounded-2xl h-[420px] bg-zinc-900"
              >
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/40 to-transparent
                                group-hover:via-zinc-950/60 transition-colors duration-500" />

                {/* Tag — matches MissionSection panel tag style */}
                <div className="absolute top-5 left-5">
                  <span className="inline-block bg-white/10 backdrop-blur-sm text-white
                                   text-[9px] font-mono uppercase tracking-[0.2em]
                                   px-2.5 py-1 border border-white/20">
                    // {pillar.tag}
                  </span>
                </div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-4">
                    <h3 className="text-2xl font-bold text-white leading-tight">{pillar.title}</h3>

                    {/* CMP blue accent line */}
                    <div
                      className="h-[3px] w-10 my-4 transition-all duration-500 group-hover:w-full"
                      style={{ backgroundColor: CMP_BLUE }}
                    />

                    <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out
                                    group-hover:grid-rows-[1fr] group-hover:opacity-100">
                      <div className="overflow-hidden">
                        <p className="text-white/70 text-sm leading-relaxed line-clamp-3 pt-2">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Wide image with subtle parallax */}
          <motion.div
            ref={wideRef}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative overflow-hidden rounded-2xl h-96 sm:h-[500px]"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1400&q=80"
              alt="PT Cipta Metalindo Persada"
              style={{ y: wideY }}
              className="h-[115%] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/30 to-transparent" />

            <div className="absolute left-8 top-1/2 -translate-y-1/2 max-w-sm">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/60 font-bold mb-3">
                {locale === "en" ? "Since 2014 · Tangerang, Indonesia" : "Sejak 2014 · Tangerang, Indonesia"}
              </p>
              <p className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                {locale === "en"
                  ? "A Decade of Quality and Excellence"
                  : "Satu Dekade Kualitas dan Keunggulan"}
              </p>
            </div>

            {/* ISO badge — CMP blue replaces amber */}
            <div
              className="absolute right-8 bottom-8 px-5 py-3 text-sm font-bold rounded-xl shadow-xl text-white"
              style={{ backgroundColor: CMP_BLUE }}
            >
              ISO 9001 ✓
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURED PRODUCTS
          slate-950 — matches AboutPage root dark
          ══════════════════════════════════════ */}
      <section className="relative bg-slate-950 py-24 lg:py-32 overflow-hidden">
        {/* CMP blue top rule — matches VisionSection progress bar style */}
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: CMP_BLUE }} />

        {/* Radial glow — blue tinted to match CMP brand */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none opacity-15"
          style={{ background: `radial-gradient(ellipse at top, ${CMP_BLUE}, transparent 70%)` }}
        />

        {/* Subtle noise texture — kept from original */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        <div className="max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-16 relative">
          <motion.div
            {...fadeUp}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
          >
            <div>
              <SectionLabel>{locale === "en" ? "Product Range" : "Pilihan Produk"}</SectionLabel>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white
                             leading-[1.05] tracking-tight">
                {t.home.featuredProducts}
              </h2>
              <p className="mt-4 text-base text-zinc-400 max-w-md leading-relaxed">
                {t.home.featuredDesc}
              </p>
            </div>
            <Link
              to={`/${locale}/products`}
              className="group inline-flex items-center gap-2 text-sm font-semibold
                         text-zinc-300 hover:text-white transition-colors shrink-0 self-start sm:self-auto"
            >
              {t.home.viewAll}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bottom CTA row */}
          <motion.div
            {...fadeUp}
            className="mt-12 pt-10 border-t border-zinc-800
                       flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <p className="text-sm text-zinc-500 max-w-md leading-relaxed text-center sm:text-left">
              {locale === "en"
                ? "Looking for a specific component or need a custom order?"
                : "Mencari komponen tertentu atau butuh pesanan khusus?"}
            </p>
            <div className="flex gap-3 shrink-0">
              <Link
                to={`/${locale}/products`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-700
                           text-zinc-300 text-sm font-semibold hover:border-zinc-500 hover:text-white
                           transition-colors"
              >
                {locale === "en" ? "Browse All" : "Semua Produk"}
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                           text-sm font-bold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: CMP_BLUE }}
              >
                {locale === "en" ? "Custom Order" : "Pesanan Khusus"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ CTA — Refined Brand Version ══════════════ */}
      <section className="relative overflow-hidden bg-slate-950 border-t border-zinc-800">

        {/* Soft radial CMP blue glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(ellipse at 70% 40%, ${CMP_BLUE}, transparent 70%)`,
          }}
        />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT SIDE */}
            <div>

              <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase block mb-6">
                {locale === "en" ? "Start Your Partnership" : "Mulai Kerja Sama"}
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                {locale === "en"
                  ? <>Precision Manufacturing<br /><span style={{ color: CMP_BLUE }}>Built to Last.</span></>
                  : <>Manufaktur Presisi<br /><span style={{ color: CMP_BLUE }}>Dibangun untuk Bertahan.</span></>}
              </h2>

              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-md">
                {locale === "en"
                  ? "Reliable metal components, scalable production, and consistent quality — engineered to support your growth."
                  : "Komponen logam andal, produksi skala besar, dan kualitas konsisten — dirancang untuk mendukung pertumbuhan Anda."}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-10 max-w-sm">
                {[
                  { v: "11+", l: locale === "en" ? "Years Experience" : "Tahun Pengalaman" },
                  { v: "200+", l: locale === "en" ? "Products Made" : "Produk Terbuat" },
                  { v: "<100", l: locale === "en" ? "PPM Defect Rate" : "Tingkat Defect (PPM)" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl font-black text-white">{s.v}</div>
                    <div className="text-[11px] uppercase tracking-widest text-zinc-500 mt-1 leading-tight">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-6">

              <Link
                to={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2
                          bg-[#1B4F9B] text-white
                          px-7 py-4 text-sm font-bold rounded-xl
                          hover:opacity-90 transition-all duration-200
                          hover:shadow-lg hover:shadow-blue-900/40"
              >
                {locale === "en" ? "Request a Quote" : "Minta Penawaran"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                to={`/${locale}/products`}
                className="inline-flex items-center justify-center gap-2
                          border border-zinc-700 text-zinc-300
                          px-7 py-4 text-sm font-semibold rounded-xl
                          hover:border-zinc-500 hover:text-white
                          hover:bg-white/5 transition-all duration-200"
              >
                {locale === "en" ? "Explore Products" : "Lihat Produk"}
              </Link>

              {/* Subtle trust line */}
              <p className="text-xs text-zinc-600 mt-2">
                {locale === "en"
                  ? "ISO 9001 Certified · Serving Industries Since 2014"
                  : "Sertifikasi ISO 9001 · Melayani Industri Sejak 2014"}
              </p>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
