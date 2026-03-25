import {
  motion,
  Variants,
  useMotionValue,
  useInView,
  animate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useLocale } from "@/i18n/LocaleContext";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/cms/products";
import { clientLogos } from "@/cms/homepage";
import React, { useEffect, useRef, useState } from "react";
import {
  Cog6ToothIcon,
  WrenchScrewdriverIcon,
  CheckBadgeIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

/* ─────────────── ANIMATION VARIANTS ─────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─────────────── STAT COUNTER ─────────────── */

function StatNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = React.useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 2.2,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(Math.floor(v)),
      });
      return controls.stop;
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─────────────── STORY BLOCK (scroll-driven) ─────────────── */

function StoryBlock({
  index,
  title,
  text,
  tag,
}: {
  index: number;
  title: string;
  text: string;
  tag: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      animate={isInView ? "visible" : "hidden"}
      initial="hidden"
      variants={fadeUp}
      className="relative pl-8 border-l-2 border-slate-200 group"
    >
      {/* Index dot */}
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-[#0B2A59] bg-white group-[.is-active]:bg-[#0B2A59] transition-colors duration-500" />

      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0B2A59]/50 mb-3 block">
        {String(index + 1).padStart(2, "0")} — {tag}
      </span>

      <h3 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-4">
        {title}
      </h3>

      <p className="text-slate-500 leading-[1.85] text-lg max-w-lg">{text}</p>
    </motion.div>
  );
}

/* ─────────────── CAPABILITY CARD ─────────────── */

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
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="relative group bg-white border border-slate-100 rounded-3xl p-8 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
    >
      {/* Hover bg wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B2A59]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

      {/* Corner number */}
      <span className="absolute top-7 right-7 text-[11px] font-bold text-slate-200 tracking-widest">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="w-12 h-12 rounded-2xl bg-[#0B2A59]/8 flex items-center justify-center mb-6 group-hover:bg-[#0B2A59]/12 transition-colors duration-300">
        <Icon className="w-6 h-6 text-[#0B2A59]" />
      </div>

      <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ─────────────── HOME PAGE ─────────────── */

export function HomePage() {
  const { t, locale } = useLocale();
  const navigate = useNavigate();
  const featured = getFeaturedProducts();
  const learnMoreText = locale === "en" ? "Explore Our Work" : "Lihat Selengkapnya";

  /* Logo marquee */
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  useEffect(() => {
    if (trackRef.current) setTrackWidth(trackRef.current.scrollWidth / 3);
  }, []);

  /* Sticky image parallax for storytelling section */
  const storyRef = useRef(null);
  const { scrollYProgress: storyScroll } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(storyScroll, [0, 1], [1.08, 1]);
  const imageY = useTransform(storyScroll, [0, 1], ["0%", "8%"]);

  const stats = [
    { value: 28, suffix: "+", label: t.home.stats.years, unit: "yrs" },
    { value: 500, suffix: "+", label: t.home.stats.clients, unit: "clients" },
    { value: 200, suffix: "+", label: t.home.stats.products, unit: "SKUs" },
    { value: 9001, suffix: "", label: t.home.stats.certified, unit: "ISO" },
  ];

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

  const storyBlocks = [
    {
      tag: "Engineering",
      title: t.home.story.engineeringTitle,
      text: t.home.story.engineeringDesc,
    },
    {
      tag: "Machinery",
      title: t.home.story.machineryTitle,
      text: t.home.story.machineryDesc,
    },
    {
      tag: "Quality",
      title: t.home.story.qualityTitle,
      text: t.home.story.qualityDesc,
    },
  ];

  return (
    <div className="overflow-hidden bg-white">

      {/* ══════════════════ HERO ══════════════════ */}
      <HeroSection
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        badge="ISO 9001 Certified Manufacturer"
        cta={t.hero.cta}
        secondaryCta={locale === "en" ? "View Products" : "Lihat Produk"}
        onCtaClick={() => navigate(`/${locale}/about`)}
        onSecondaryClick={() => navigate(`/${locale}/products`)}
        backgroundImage="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80"
        overlay="blue"
        size="full"
      />

      {/* ══════════════════ MARQUEE LOGOS ══════════════════ */}
      <section className="py-20 bg-white overflow-hidden border-b border-slate-100">
        <div className="mx-auto max-w-[1280px] px-6 mb-10">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center text-[11px] font-bold uppercase tracking-[0.35em] text-slate-400"
          >
            {t.home.trustedBy}
          </motion.p>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10" />

          <motion.div
            ref={trackRef}
            className="flex gap-16 items-center w-max"
            animate={{ x: [0, -trackWidth] }}
            transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
          >
            {[...clientLogos, ...clientLogos, ...clientLogos].map((client, idx) => (
              <div
                key={`${client.name}-${idx}`}
                className="flex items-center justify-center grayscale hover:grayscale-0 opacity-35 hover:opacity-90 transition-all duration-400 w-36 shrink-0"
              >
                <img
                  src={client.image}
                  alt={client.name}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ STATS ══════════════════ */}
      <section className="py-24 bg-[#0B2A59] relative overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-[120px] -translate-y-1/2 translate-x-1/3" />

        <div className="relative mx-auto max-w-[1200px] px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-3xl overflow-hidden"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col items-center justify-center py-14 px-8 text-center bg-[#0B2A59] relative group hover:bg-white/5 transition-colors duration-500"
              >
                <div className="text-5xl lg:text-6xl font-black text-white tracking-tight tabular-nums">
                  <StatNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-3 text-[11px] font-bold uppercase tracking-[0.25em] text-blue-300/70">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ STORYTELLING ══════════════════ */}
      <section ref={storyRef} className="py-32 lg:py-40 bg-white">
        <div className="mx-auto max-w-[1280px] px-6">

          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-20 max-w-xl"
          >
            <motion.span
              variants={fadeUp}
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0B2A59] block mb-4"
            >
              Our Approach
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight"
            >
              Built to perform.<br />
              <span className="text-slate-400">Engineered to last.</span>
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Sticky image with parallax */}
            <div className="lg:sticky top-28 h-fit order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-2xl">
                <motion.img
                  src="https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1200"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ scale: imageScale, y: imageY }}
                />
                {/* Overlay label card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Active Production Facility
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 mt-1">
                    Tangerang, Banten — Est. 1995
                  </p>
                </div>
              </div>
            </div>

            {/* Story blocks */}
            <div className="order-1 lg:order-2 space-y-16 pt-4">
              {storyBlocks.map((block, i) => (
                <StoryBlock
                  key={i}
                  index={i}
                  tag={block.tag}
                  title={block.title}
                  text={block.text}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════ CAPABILITIES ══════════════════ */}
      <section className="py-28 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-[1280px] px-6">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0B2A59] block mb-4"
            >
              What We Do
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-black text-slate-900"
            >
              {t.home.capabilities.title}
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {capabilities.map((cap, i) => (
              <CapabilityCard key={i} index={i} {...cap} />
            ))}
          </motion.div>

        </div>
      </section>

      {/* ══════════════════ FEATURED PRODUCTS ══════════════════ */}
      <section className="py-32 bg-white">
        <div className="mx-auto max-w-[1280px] px-6">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
          >
            <div>
              <motion.span
                variants={fadeUp}
                className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0B2A59] block mb-3"
              >
                Product Range
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="text-4xl lg:text-5xl font-black text-slate-900"
              >
                {t.home.featuredProducts}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-3 text-slate-500 text-lg max-w-lg"
              >
                {t.home.featuredDesc}
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="shrink-0">
              <Link
                to={`/${locale}/products`}
                className="group inline-flex items-center gap-2 text-sm font-bold text-[#0B2A59] hover:gap-3 transition-all duration-300"
              >
                {t.home.viewAll}
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {featured.slice(0, 9).map((product) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 text-center"
          >
            <Link
              to={`/${locale}/products`}
              className="inline-flex items-center gap-3 rounded-full bg-[#0B2A59] px-10 py-4 text-sm font-bold text-white shadow-lg hover:shadow-[#0B2A59]/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {t.home.viewAll}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════ CTA BANNER ══════════════════ */}
      <section className="relative overflow-hidden bg-[#0B2A59] py-28">
        {/* Decorative bg shapes */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-500/15 blur-[80px]" />
          <div className="absolute -top-24 -left-24 w-[400px] h-[400px] rounded-full bg-blue-300/10 blur-[80px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[700px] px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-300/70 block mb-5"
            >
              Get in Touch
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-black text-white leading-tight"
            >
              {t.home.cta.title}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-blue-200/70 text-lg leading-relaxed"
            >
              {t.home.cta.desc}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10">
              <Link
                to={`/${locale}/contact`}
                className="group inline-flex items-center gap-3 rounded-full bg-white text-[#0B2A59] px-10 py-4 text-sm font-bold shadow-xl hover:shadow-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {t.home.cta.button}
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}