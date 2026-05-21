// HomePage.tsx
import { clientLogos } from "@/cms/homepage";
import { getFeaturedProducts } from "@/cms/products";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { useLocale } from "@/i18n/LocaleContext";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

/* ══════════════════════════════════════
   CONSTANTS
   ══════════════════════════════════════ */
const CMP_BLUE       = "#1B4F9B";
const CMP_BLUE_LIGHT = "#2563EB";
const CMP_BLUE_DARK  = "#0F2D5E";
const EASE           = [0.22, 1, 0.36, 1] as const;

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
   ══════════════════════════════════════ */
function SectionLabel({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={`text-[10px] font-bold tracking-[0.35em] uppercase mb-6 block ${
        light ? "text-blue-300/70" : "text-zinc-500"
      }`}
    >
      {children}
    </span>
  );
}

/* ══════════════════════════════════════
   ISO 9001:2015 LOGO
   ══════════════════════════════════════ */
function ISO9001Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        style={{
          colorScheme: "light",
          backgroundColor: "transparent",
          mixBlendMode: "screen",
          lineHeight: 0,
        }}
      >
        <img
          src="/ISO/ISO-9001.webp"
          alt="ISO 9001:2015 Certified"
          style={{ height: "80px", width: "auto", objectFit: "contain", display: "block" }}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-black text-white leading-none tracking-tight">ISO 9001</span>
        <span className="text-xs font-semibold text-blue-100/80 tracking-wider mt-0.5">2015 CERTIFIED</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   LOGO CAROUSEL
   ══════════════════════════════════════ */
function LogoCarousel({ logos }: { logos: { name: string; image: string }[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) setWidth(trackRef.current.scrollWidth / 2);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {(["left", "right"] as const).map((side) => (
        <div
          key={side}
          className={`pointer-events-none absolute ${side}-0 top-0 h-full w-40 z-10`}
          style={{
            background: `linear-gradient(to ${side === "left" ? "right" : "left"}, #ffffff, transparent)`,
          }}
        />
      ))}
      <motion.div
        ref={trackRef}
        className="flex items-center gap-16 w-max"
        animate={{ x: [0, -width] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex items-center justify-center w-36 shrink-0 opacity-40 hover:opacity-100 transition-opacity duration-300"
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
    <motion.div {...fadeUp} className="group relative p-8 lg:p-12 flex flex-col items-start">
      <div className={`text-5xl lg:text-6xl font-black tabular-nums leading-none tracking-tight mb-3 ${accent}`}>
        {value}
      </div>
      <p className="text-sm lg:text-base font-medium text-blue-200/60 leading-snug group-hover:text-blue-100 transition-colors">
        {label}
      </p>
      <div className="absolute bottom-0 left-0 h-0.5 bg-blue-400 w-0 group-hover:w-full transition-all duration-300" />
    </motion.div>
  );
}

/* ══════════════════════════════════════
   CAPABILITY ICONS (inline SVGs)
   ══════════════════════════════════════ */
function IconStamping({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="20" y="6" width="24" height="10" rx="1.5" />
      <path d="M32 16v10" strokeWidth="2.5" />
      <path d="M24 26h16l-3 8H27z" strokeWidth="1.5" />
      <rect x="18" y="34" width="28" height="4" rx="1" />
      <path d="M22 38v6c0 1 .5 2 2 2h16c1.5 0 2-1 2-2v-6" />
      <path d="M27 44v2M32 44v2M37 44v2" strokeWidth="1" />
      <rect x="10" y="52" width="44" height="5" rx="1" />
      <path d="M16 16v36" strokeWidth="1.2" strokeDasharray="3 2" />
      <path d="M48 16v36" strokeWidth="1.2" strokeDasharray="3 2" />
      <path d="M8 28h6M8 32h4M8 36h6" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function IconFabrication({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 50l20-20" strokeWidth="2" />
      <circle cx="38" cy="26" r="10" />
      <circle cx="38" cy="26" r="4" />
      <path d="M46 14l2-4 2 4-4-2 4-2z" fill="currentColor" stroke="none" />
      <path d="M52 20l1-3 1 3-3-1.5 3-1.5z" fill="currentColor" stroke="none" />
      <path d="M50 10l1-2 1 2-2-1 2-1z" fill="currentColor" stroke="none" />
      <rect x="10" y="50" width="18" height="4" rx="1" />
      <path d="M24 50l-4-8M28 50l-4-8" strokeWidth="1" />
    </svg>
  );
}

function IconQuality({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 8l18 7v14c0 10-8 18-18 21C22 47 14 39 14 29V15z" strokeWidth="2" />
      <path d="M22 32l7 7 13-13" strokeWidth="2.5" />
      <path d="M32 12v3M26 13.5l1.5 2.5M38 13.5l-1.5 2.5" strokeWidth="1.2" />
    </svg>
  );
}

function IconProduction({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="30" width="48" height="24" rx="1" />
      <path d="M8 30l12-14h24l12 14" />
      <rect x="16" y="14" width="4" height="6" />
      <rect x="44" y="14" width="4" height="6" />
      <path d="M18 14c0-3 4-3 4-6" strokeDasharray="2 2" />
      <path d="M46 14c0-3 4-3 4-6" strokeDasharray="2 2" />
      <rect x="14" y="36" width="8" height="8" rx="0.5" />
      <rect x="28" y="36" width="8" height="8" rx="0.5" />
      <rect x="42" y="36" width="8" height="8" rx="0.5" />
      <rect x="27" y="44" width="10" height="10" rx="0.5" />
      <path d="M8 54h48" strokeWidth="2" />
    </svg>
  );
}

/* ══════════════════════════════════════
   CAPABILITY ITEM (Vertical Stacked Layout)
   ══════════════════════════════════════ */
const CAP_COLORS = [
  { stroke: "#1B4F9B", bg: "bg-blue-50",   border: "border-blue-100"   },
  { stroke: "#0F766E", bg: "bg-teal-50",   border: "border-teal-100"   },
  { stroke: "#B45309", bg: "bg-amber-50",  border: "border-amber-100"  },
  { stroke: "#7C3AED", bg: "bg-violet-50", border: "border-violet-100" },
] as const;

function CapabilityItem({
  icon: Icon,
  title,
  subtitle,
  desc,
  index,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  desc: string;
  index: number;
}) {
  const c = CAP_COLORS[index % CAP_COLORS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
      className={`group flex flex-col gap-5 p-7 rounded-3xl border ${c.border} ${c.bg}
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full`}
    >
      <div
        className="shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl border
                   bg-white shadow-sm group-hover:shadow-md transition-shadow duration-300"
        style={{ borderColor: `${c.stroke}25` }}
      >
        <Icon
          className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
          style={{ color: c.stroke }}
        />
      </div>
      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
        <h3 className="text-xl font-black tracking-tight leading-tight" style={{ color: "#0F172A" }}>
          {title}
        </h3>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] leading-none mt-1" style={{ color: c.stroke }}>
          {subtitle}
        </p>
        <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   PROCESS LINK
   ══════════════════════════════════════ */
function ProcessLink({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/${locale}/about#process`);
    setTimeout(() => {
      const el = document.getElementById("process");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
  };

  return (
    <a
      href={`/${locale}/about#process`}
      onClick={handleClick}
      className="group inline-flex items-center gap-2 text-sm font-semibold
                 text-zinc-600 hover:text-blue-700 border-b border-zinc-300
                 hover:border-blue-500 pb-0.5 transition-colors duration-200 shrink-0 cursor-pointer"
    >
      {children}
      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </a>
  );
}

/* ══════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════ */
export function HomePage() {
  const { t, locale } = useLocale();
  const navigate      = useNavigate();
  const featured      = getFeaturedProducts();

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
          STORY / APPROACH
          ══════════════════════════════════════ */}
      <section className="relative bg-white border-b border-zinc-100 py-24 lg:py-32 overflow-hidden">
        <div className="absolute left-1/2 top-0 w-px h-16 bg-blue-100" />

        <div className="w-full px-6 sm:px-10 lg:px-20 xl:px-28">
          <motion.div {...fadeUp} className="mb-20">
            <SectionLabel>{locale === "en" ? "Our Story" : "Cerita Kami"}</SectionLabel>

            <div className="grid gap-10 lg:gap-16 xl:gap-20 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-zinc-900
                               leading-[1.05] tracking-tight mb-8">
                  {locale === "en" ? (<>Metal built<br />on conviction.</>) : (<>Logam dibangun<br />atas keyakinan.</>)}
                </h2>
                <Link
                  to={`/${locale}/about`}
                  className="group inline-flex items-center gap-2 text-sm font-semibold
                             text-zinc-700 hover:text-blue-700 border-b border-zinc-300
                             hover:border-blue-500 pb-0.5 transition-colors duration-200"
                >
                  {locale === "en" ? "Read our full story" : "Baca cerita lengkap kami"}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="lg:border-l lg:border-blue-100 lg:pl-10 xl:pl-12">
                <p className="text-base sm:text-lg text-zinc-600 leading-[1.75]">
                  {locale === "en"
                    ? "PT Cipta Metalindo Persada has spent 11 years becoming the foundry that manufacturers rely on. We combine engineering expertise, reliable machinery, and a relentless commitment to quality to deliver metal components that power industries forward."
                    : "PT Cipta Metalindo Persada telah menghabiskan 11 tahun menjadi foundry yang diandalkan oleh manufaktur. Kami menggabungkan keahlian teknik, mesin yang andal, dan komitmen tanpa henti terhadap kualitas."}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Three Pillars */}
          <div className="grid gap-5 sm:grid-cols-3 mb-6">
            {[
              {
                title:       t.home.story.engineeringTitle,
                description: t.home.story.engineeringDesc,
                image:       "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
                tag:         locale === "en" ? "Engineering" : "Keahlian",
              },
              {
                title:       t.home.story.machineryTitle,
                description: t.home.story.machineryDesc,
                image:       "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
                tag:         locale === "en" ? "Machinery" : "Mesin",
              },
              {
                title:       t.home.story.qualityTitle,
                description: t.home.story.qualityDesc,
                image:       "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
                tag:         locale === "en" ? "Quality" : "Kualitas",
              },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className="group relative overflow-hidden rounded-2xl h-[460px] bg-zinc-900"
              >
                <img src={pillar.image} alt={pillar.title} className="absolute inset-0 h-full w-full object-cover" />
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to top, ${CMP_BLUE_DARK}f5 0%, ${CMP_BLUE}55 50%, transparent 100%)` }}
                />
                <div className="absolute inset-0 bg-zinc-950/30 group-hover:bg-zinc-950/10 transition-colors duration-500" />

                <div className="absolute top-5 left-5">
                  <span
                    className="inline-block text-white text-[9px] font-mono uppercase tracking-[0.2em]
                                 px-2.5 py-1 border border-white/30 backdrop-blur-sm"
                    style={{ backgroundColor: `${CMP_BLUE}90` }}
                  >
                    {pillar.tag}
                  </span>
                </div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-4">
                    <h3 className="text-2xl font-bold text-white leading-tight">{pillar.title}</h3>
                    <div className="h-[3px] w-10 my-4 transition-all duration-500 group-hover:w-full bg-blue-400" />
                    <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out
                                    group-hover:grid-rows-[1fr] group-hover:opacity-100">
                      <div className="overflow-hidden">
                        <p className="text-blue-100/80 text-sm leading-relaxed line-clamp-3 pt-2">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Wide parallax image */}
          <motion.div
            ref={wideRef}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative overflow-hidden rounded-2xl h-[420px] sm:h-[540px]"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1800&q=80"
              alt="PT Cipta Metalindo Persada"
              style={{ y: wideY }}
              className="h-[115%] w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to right, ${CMP_BLUE_DARK}e0 0%, ${CMP_BLUE}70 40%, transparent 100%)` }}
            />
            <div className="absolute left-10 top-1/2 -translate-y-1/2 max-w-lg">
              <p className="text-[10px] uppercase tracking-[0.35em] text-blue-200/70 font-bold mb-4">
                {locale === "en" ? "Since 2014 · Tangerang, Indonesia" : "Sejak 2014 · Tangerang, Indonesia"}
              </p>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                {locale === "en" ? "A Decade of Quality and Excellence" : "Satu Dekade Kualitas dan Keunggulan"}
              </p>
              <div className="mt-6 h-[3px] w-16 bg-blue-400 rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TRUSTED BY
          ══════════════════════════════════════ */}
      <section className="relative bg-white border-b border-zinc-100 py-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: CMP_BLUE }} />

        <div className="w-full px-6 sm:px-10 lg:px-20 xl:px-28">
          <motion.div {...fadeUp} className="text-center mb-14">
            <SectionLabel>{locale === "en" ? "Trusted By" : "Dipercaya Oleh"}</SectionLabel>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-[1.05]">
              {t.home.trustedBy}
            </h3>
            <div className="mt-5 mx-auto w-14 h-[3px] rounded-full" style={{ backgroundColor: CMP_BLUE }} />
          </motion.div>

          <LogoCarousel logos={clientLogos} />

          <motion.div {...fadeUp} className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link
              to={`/${locale}/about`}
              className="group inline-flex items-center gap-2 text-sm font-semibold
                         text-zinc-600 hover:text-blue-700 border-b border-zinc-300
                         hover:border-blue-500 pb-0.5 transition-colors duration-200"
            >
              {locale === "en" ? "Learn about our company" : "Pelajari perusahaan kami"}
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <span className="hidden sm:block text-zinc-300">·</span>
            <Link
              to={`/${locale}/contact`}
              className="group inline-flex items-center gap-2 text-sm font-semibold
                         text-zinc-600 hover:text-blue-700 border-b border-zinc-300
                         hover:border-blue-500 pb-0.5 transition-colors duration-200"
            >
              {locale === "en" ? "Become a partner" : "Jadilah mitra kami"}
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS
          ══════════════════════════════════════ */}
      <section
        className="relative overflow-hidden border-y border-blue-900/40"
        style={{ background: `linear-gradient(135deg, ${CMP_BLUE_DARK} 0%, ${CMP_BLUE} 60%, ${CMP_BLUE_LIGHT} 100%)` }}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="w-full px-6 sm:px-10 lg:px-20 xl:px-28 relative">
          <div className="pt-12 pb-2">
            <SectionLabel light>CMP at a glance</SectionLabel>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: "11+",  label: t.home.stats.years,    accent: "text-white"    },
              { value: "<100", label: t.home.stats.quality,  accent: "text-blue-200" },
              { value: "20+",  label: t.home.stats.clients,  accent: "text-white"    },
              { value: "200+", label: t.home.stats.products, accent: "text-blue-200" },
            ].map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          <motion.div
            {...fadeUp}
            className="py-8 border-t border-white/10
                       flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <Link
              to={`/${locale}/about`}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-white/20
                         text-sm font-semibold text-white hover:border-white/50 hover:bg-white/10
                         transition-all duration-200 shrink-0"
            >
              {locale === "en" ? "Our Full Story" : "Cerita Lengkap Kami"}
              <ChevronRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CAPABILITIES — Full Bleed Image + Grid
          ══════════════════════════════════════ */}
      <section className="relative bg-zinc-50 border-b border-zinc-200 py-24 lg:py-32 overflow-hidden flex flex-col">
        {/* Dot grid watermark */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, #94a3b8 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        {/* Top accent rule */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: CMP_BLUE }} />

        {/* HEADER (Standard Container Width) */}
        <div className="w-full px-6 sm:px-10 lg:px-20 xl:px-28 relative">
          <motion.div {...fadeUp} className="mb-14 lg:mb-16">
            <SectionLabel>{locale === "en" ? "What We Do" : "Apa Yang Kami Lakukan"}</SectionLabel>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900
                               leading-[1.05] tracking-tight max-w-2xl">
                  {t.home.capabilities.title}
                </h2>
                <p className="mt-4 text-base text-zinc-500 max-w-xl leading-relaxed">
                  {locale === "en"
                    ? "From raw billet to finished component — every step engineered for reliability."
                    : "Dari bahan baku hingga komponen jadi — setiap langkah dirancang untuk keandalan."}
                </p>
              </div>

              <Link
                to={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl shrink-0
                           text-sm font-semibold text-white hover:opacity-90 transition-opacity
                           self-start sm:self-auto shadow-lg shadow-blue-900/25 relative z-10"
                style={{ backgroundColor: CMP_BLUE }}
              >
                {locale === "en" ? "Request a Quote" : "Minta Penawaran"}
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* BODY (Split Layout - Image bleeds left, items align right container edge) */}
        <div className="w-full flex flex-col lg:flex-row items-stretch relative">

          {/* LEFT: Full Width Bleed Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative w-full lg:w-1/2 h-[450px] lg:h-auto min-h-[500px]"
          >
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80"
              alt="Manufacturing capabilities"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

            {/*
              Padding inside matches the left padding of the standard container:
              px-6 sm:px-10 lg:pl-20 xl:pl-28
            */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 lg:pl-20 xl:pl-28 lg:pr-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600/90 backdrop-blur-md border border-white/10 mb-5 shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                  {locale === "en" ? "Guaranteed Quality" : "Kualitas Terjamin"}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight max-w-sm drop-shadow-md">
                {locale === "en"
                  ? "Precision at scale, built for modern industry."
                  : "Presisi dalam skala besar, dibangun untuk industri modern."}
              </h3>
            </div>
          </motion.div>

          {/* RIGHT: 4 Items (2x2 Grid) */}
          <div className="w-full lg:w-1/2 px-6 sm:px-10 lg:pr-20 xl:pr-28 lg:pl-12 xl:pl-16 py-12 lg:py-4 flex flex-col justify-center">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {[
                {
                  Icon:     IconStamping,
                  title:    locale === "en" ? "Metal Stamping"   : "Metal Stamping",
                  subtitle: locale === "en" ? "Progressive · Transfer" : "Progresif · Transfer",
                  desc:     t.home.capabilities.precisionDesc,
                },
                {
                  Icon:     IconFabrication,
                  title:    locale === "en" ? "Metal Fabrication"           : "Fabrikasi Logam",
                  subtitle: locale === "en" ? "Cutting · Welding" : "Potong · Las",
                  desc:     t.home.capabilities.fabricationDesc,
                },
                {
                  Icon:     IconQuality,
                  title:    locale === "en" ? "Quality Assurance"           : "Jaminan Kualitas",
                  subtitle: "ISO 9001:2015 · <100 PPM",
                  desc:     t.home.capabilities.qualityDesc,
                },
                {
                  Icon:     IconProduction,
                  title:    locale === "en" ? "High-Volume"      : "Produksi Massal",
                  subtitle: locale === "en" ? "Scalable Delivery" : "Pengiriman Skalabel",
                  desc:     t.home.capabilities.productionDesc,
                },
              ].map((cap, i) => (
                <CapabilityItem
                  key={i}
                  icon={cap.Icon}
                  title={cap.title}
                  subtitle={cap.subtitle}
                  desc={cap.desc}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER (Standard Container Width) */}
        <div className="w-full px-6 sm:px-10 lg:px-20 xl:px-28 relative">
          <motion.div
            {...fadeUp}
            className="mt-14 lg:mt-16 pt-10 border-t border-zinc-200
                       flex flex-col sm:flex-row items-center justify-between gap-4"
          >

            <ProcessLink locale={locale}>
              {locale === "en" ? "Learn about our process" : "Pelajari proses kami"}
            </ProcessLink>
          </motion.div>
        </div>

      </section>

      {/* ══════════════════════════════════════
          FEATURED PRODUCTS
          ══════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#050d1a" }}>
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: CMP_BLUE }} />
        <div
          className="absolute top-0 left-1/4 w-[900px] h-[500px] pointer-events-none opacity-20"
          style={{ background: `radial-gradient(ellipse at top, ${CMP_BLUE_LIGHT}, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[400px] pointer-events-none opacity-10"
          style={{ background: `radial-gradient(ellipse at bottom, ${CMP_BLUE}, transparent 70%)` }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "52px 52px",
          }}
        />

        <div className="w-full px-6 sm:px-10 lg:px-20 xl:px-28 relative">
          <motion.div
            {...fadeUp}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
          >
            <div>
              <SectionLabel light>{locale === "en" ? "Product Range" : "Pilihan Produk"}</SectionLabel>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white
                             leading-[1.05] tracking-tight">
                {t.home.featuredProducts}
              </h2>
              <p className="mt-5 text-base text-blue-200/50 max-w-xl leading-relaxed">
                {t.home.featuredDesc}
              </p>
            </div>
            <Link
              to={`/${locale}/products`}
              className="group inline-flex items-center gap-2 text-sm font-semibold
                         text-blue-300 hover:text-white transition-colors shrink-0 self-start sm:self-auto"
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

          <motion.div
            {...fadeUp}
            className="mt-14 pt-10 border-t border-blue-900/40
                       flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <p className="text-sm text-blue-200/40 max-w-md leading-relaxed text-center sm:text-left">
              {locale === "en"
                ? "Looking for a specific component or need a custom order?"
                : "Mencari komponen tertentu atau butuh pesanan khusus?"}
            </p>
            <div className="flex gap-3 shrink-0">
              <Link
                to={`/${locale}/products`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-blue-800
                           text-blue-300 text-sm font-semibold hover:border-blue-500 hover:text-white
                           transition-colors"
              >
                {locale === "en" ? "Browse All" : "Semua Produk"}
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                           text-sm font-bold text-white hover:opacity-90 transition-opacity
                           shadow-lg shadow-blue-900/40"
                style={{ backgroundColor: CMP_BLUE }}
              >
                {locale === "en" ? "Custom Order" : "Pesanan Khusus"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
          ══════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${CMP_BLUE_DARK} 0%, ${CMP_BLUE} 55%, ${CMP_BLUE_LIGHT} 100%)` }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulance type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute -right-32 -top-32 w-[600px] h-[600px] rounded-full pointer-events-none opacity-10"
          style={{ background: `radial-gradient(circle, white, transparent 70%)` }}
        />

        <div className="relative w-full px-6 sm:px-10 lg:px-20 xl:px-28 py-20 sm:py-28">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-20 items-center">

            {/* LEFT */}
            <div>
              <span className="text-[10px] font-bold tracking-[0.4em] text-blue-200/60 uppercase block mb-6">
                {locale === "en" ? "Start Your Partnership" : "Mulai Kerja Sama"}
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
                  <>Metal Components Hardened by <br /><span className="text-blue-200">Quality</span></>
              </h2>

              <p className="text-base sm:text-lg text-blue-100/70 leading-relaxed max-w-xl">
                {locale === "en"
                  ? "Reliable metal components, scalable production, and consistent quality — engineered to support your growth."
                  : "Komponen logam andal, produksi skala besar, dan kualitas konsisten — dirancang untuk mendukung pertumbuhan Anda."}
              </p>

              <div className="grid grid-cols-3 gap-8 mt-12 max-w-md">
                {[
                  { v: "11+",  l: locale === "en" ? "Years Experience"   : "Tahun Pengalaman"     },
                  { v: "200+", l: locale === "en" ? "Products Made"       : "Produk Terbuat"       },
                  { v: "<100", l: locale === "en" ? "PPM Defect Rate"     : "Tingkat Defect (PPM)" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-3xl font-black text-white tabular-nums">{s.v}</div>
                    <div className="text-[11px] uppercase tracking-widest text-blue-200/60 mt-1.5 leading-tight">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-4 lg:items-end">
              <Link
                to={`/${locale}/contact`}
                className="group relative inline-flex items-center justify-center gap-2.5
                           bg-white text-blue-900
                           px-9 py-5 text-base font-black rounded-xl
                           hover:bg-blue-50 transition-all duration-300
                           hover:shadow-2xl hover:shadow-black/40
                           hover:scale-[1.02] active:scale-[0.98]
                           overflow-hidden w-full lg:w-auto"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out
                               bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <span className="relative z-10">{locale === "en" ? "Request a Quote" : "Minta Penawaran"}</span>
                <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                to={`/${locale}/products`}
                className="group relative inline-flex items-center justify-center gap-2
                           border-2 border-white/30 text-white
                           px-9 py-[18px] text-base font-semibold rounded-xl
                           hover:border-white/60 hover:bg-white/10
                           transition-all duration-300
                           hover:scale-[1.02] active:scale-[0.98]
                           backdrop-blur-sm w-full lg:w-auto"
              >
                <span className="relative z-10">{locale === "en" ? "Explore Products" : "Lihat Produk"}</span>
                <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <div className="mt-4 pt-4 border-t border-white/10 w-full lg:w-auto">
                <ISO9001Logo />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
