// AboutPage.tsx
import { stats, timeline } from '@/cms/about';
import { HeroSection } from '@/components/HeroSection';
import { Timeline } from '@/components/Timeline';
import { useCountUp } from '@/hooks/useScrollAnimation';
import { useLocale } from '@/i18n/LocaleContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ══════════════════════════════════════
   SHARED MOTION VARIANTS
══════════════════════════════════════ */
const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
} as const;

const staggerWrap = {
  initial:     {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport:    { once: true, margin: '-60px' },
} as const;

const staggerItem = {
  initial:    { opacity: 0, y: 22 },
  whileInView:{ opacity: 1, y: 0  },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
} as const;

/* ══════════════════════════════════════
   SECTION LABEL
══════════════════════════════════════ */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.4em] text-indigo-600/70 mb-3 sm:mb-4 font-semibold">
      ✦ {children}
    </p>
  );
}

/* ══════════════════════════════════════
   STAT CARD
══════════════════════════════════════ */
function Stat({ stat, index }: { stat: typeof stats[number]; index: number }) {
  const { locale } = useLocale();
  const numeric = parseInt(stat.value.replace(/[^0-9]/g, ''), 10);
  const suffix  = stat.value.replace(/[0-9]/g, '');
  const { ref, count } = useCountUp(numeric, 2000);

  const accents = [
    'from-indigo-600 to-violet-600',
    'from-violet-600 to-fuchsia-600',
    'from-sky-600 to-indigo-600',
    'from-indigo-600 to-cyan-600',
  ];
  const accent = accents[index % accents.length];

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      /* 
        Mobile S (320px): reduced padding, smaller radius
        The top colour bar + blur orb stay but scale down naturally
      */
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10
        bg-white/5 backdrop-blur-md px-4 py-7 sm:p-8 text-center"
    >
      {/* top accent bar */}
      <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${accent}`} />
      {/* soft glow orb */}
      <div className="absolute -top-8 left-1/2 h-20 w-20 sm:h-24 sm:w-24 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

      {/* number */}
      <div className={`text-4xl xs:text-5xl sm:text-6xl font-black tabular-nums
        bg-gradient-to-r ${accent} bg-clip-text text-transparent`}>
        {count}{suffix}
      </div>

      {/* label */}
      <div className="mt-3 sm:mt-4 text-[9px] xs:text-[10px] sm:text-[11px]
        uppercase tracking-[0.3em] sm:tracking-[0.35em] text-slate-300 leading-snug">
        {stat.label[locale]}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   STORY SECTION
══════════════════════════════════════ */
function StorySection({ locale, t }: { locale: string; t: any }) {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32 bg-slate-950 text-white overflow-hidden">
      {/* ambient gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.12),transparent_30%)]" />
      {/* grid texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 sm:gap-14 lg:gap-16 items-start"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerWrap}
        >
          {/* left — headline + body */}
          <motion.div variants={staggerItem}>
            <SectionLabel>{locale === 'en' ? 'Who We Are' : 'Siapa Kami'}</SectionLabel>

            {/*
              Mobile S: 2rem keeps the headline from wrapping into 6+ lines
              xs (375px): 2.4rem
              sm (640px): 3.25rem
              lg+: 3.75rem
            */}
            <h1 className="text-[2rem] xs:text-[2.4rem] sm:text-[3.25rem] lg:text-6xl
              font-black leading-[1.06] max-w-2xl">
              {locale === 'en'
                ? 'Built through decades of precision.'
                : 'Dibangun melalui dekade presisi.'}
            </h1>

            <p className="mt-6 sm:mt-8 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {t.about.companyDesc}
            </p>
          </motion.div>

          {/* right — glass card */}
          <motion.div variants={staggerItem} className="relative">
            <div className="rounded-[1.5rem] sm:rounded-[2rem] border border-white/10
              bg-white/5 backdrop-blur-xl p-6 sm:p-8
              shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed">
                {t.about.companyDesc2}
              </p>

              {/* 2×2 keyword grid */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  locale === 'en' ? 'Precision First'  : 'Presisi Utama',
                  locale === 'en' ? 'Built to Endure'  : 'Dibangun untuk Bertahan',
                  locale === 'en' ? 'Trusted Process'  : 'Proses Terpercaya',
                  locale === 'en' ? 'Industry Ready'   : 'Siap Industri',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5
                      px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-slate-200 leading-snug"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* decorative orbs — hidden on mobile to avoid paint cost */}
            <div className="hidden sm:block absolute -z-10 -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="hidden sm:block absolute -z-10 -left-8 -bottom-8 h-32 w-32 rounded-full bg-sky-500/20 blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   STATS SECTION
══════════════════════════════════════ */
function StatsSection({ locale }: { locale: string }) {
  return (
    <section className="relative bg-slate-950 py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* header */}
        <motion.div className="text-center mb-12 sm:mb-16" {...fadeUp}>
          {/* <SectionLabel>{locale === 'en' ? 'At a Glance' : 'Sekilas'}</SectionLabel>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black text-white">
            {locale === 'en'
              ? 'Numbers that reflect trust.'
              : 'Angka yang mencerminkan kepercayaan.'}
          </h2> */}
        </motion.div>

        {/*
          Mobile S: 2 columns — 4 cols at md+
          Tighter gap on mobile so cards don't feel cramped
        */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 lg:gap-6"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerWrap}
        >
          {stats.map((s, i) => <Stat key={i} stat={s} index={i} />)}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   MISSION SECTION
══════════════════════════════════════ */
function MissionSection({ locale, t }: { locale: string; t: any }) {
  const items = useMemo(() => [
    { text: t.about.mission1, image: 'https://images.unsplash.com/photo-1581093458791-9d42c52f2c77?w=800&q=80' },
    { text: t.about.mission2, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80' },
    { text: t.about.mission3, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80' },
    { text: t.about.mission4, image: 'https://images.unsplash.com/photo-1581093458791-9d42c52f2c77?w=800&q=80' },
  ], [t]);

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* header */}
        <motion.div className="text-center mb-12 sm:mb-16 lg:mb-20" {...fadeUp}>
          <SectionLabel>{locale === 'en' ? 'Mission Statement' : 'Pernyataan Misi'}</SectionLabel>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black text-slate-900">
            {t.about.missionTitle}
          </h2>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {locale === 'en'
              ? 'The principles that guide every product, every process, and every partnership.'
              : 'Prinsip yang membimbing setiap produk, proses, dan kemitraan.'}
          </p>
        </motion.div>

        {/*
          Mobile S: single column — cards are tall enough to read text comfortably
          sm: 2 columns
          lg: 4 columns
        */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerWrap}
        >
          {items.map((m, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              /*
                Mobile S: h-64 — enough for the image + text without cutting off
                sm+: h-80
              */
              className="group relative h-64 sm:h-80 rounded-[1.5rem] sm:rounded-[2rem]
                overflow-hidden shadow-[0_10px_40px_rgba(15,23,42,0.08)]"
            >
              <img
                src={m.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover
                  group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/55 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-transparent
                opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* index badge */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5
                w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl
                bg-white/15 backdrop-blur-md border border-white/20
                text-white flex items-center justify-center
                text-xs sm:text-sm font-bold">
                0{i + 1}
              </div>

              {/* text — line-clamp on mobile so it never overflows */}
              <div className="absolute bottom-0 p-4 sm:p-6">
                <p className="text-white text-sm sm:text-base leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {m.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   VISION SECTION
══════════════════════════════════════ */
function VisionSection({ locale, t }: { locale: string; t: any }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  /*
    All useTransform calls at top level — no conditional hook calls
  */
  const s1 = useTransform(scrollYProgress, [0,    0.1,  0.22], [0, 1, 0]);
  const s2 = useTransform(scrollYProgress, [0.22, 0.31, 0.44], [0, 1, 0]);
  const s3 = useTransform(scrollYProgress, [0.44, 0.55, 0.72], [0, 1, 0]);
  const s4 = useTransform(scrollYProgress, [0.72, 0.82, 1.0 ], [0, 1, 0]);

  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  /*
    Mobile: reduce total section height so the 4-slide journey
    doesn't require excessive scrolling on small screens.
  */
  return (
    <section ref={ref} className="relative h-[260vh] sm:h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1600&q=80"
          style={{ scale: scaleBg }}
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/70 to-slate-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.35)_65%,rgba(15,23,42,0.7)_100%)]" />

        <div className="absolute inset-0 flex items-center justify-center text-center px-5 sm:px-10">

          {/* slide 1 */}
          <motion.h2
            style={{ opacity: s1 }}
            className="absolute text-[1.85rem] xs:text-[2.2rem] sm:text-5xl lg:text-6xl
              font-black text-white max-w-xs sm:max-w-2xl lg:max-w-4xl leading-tight"
          >
            Manufacturing is not about speed.
              
          </motion.h2>

          {/* slide 2 */}
          <motion.h2
            style={{ opacity: s2 }}
            className="absolute text-[1.85rem] xs:text-[2.2rem] sm:text-5xl lg:text-6xl
              font-black text-white max-w-xs sm:max-w-2xl leading-tight"
          >
            It is about Delivering Qualities and Defining Values.
          </motion.h2>

          {/* slide 3 — vision */}
          <motion.div
            style={{ opacity: s3 }}
            className="absolute max-w-xs sm:max-w-2xl lg:max-w-3xl px-2"
          >
            <p className="text-[10px] sm:text-xs tracking-[0.4em] text-indigo-300 mb-4 sm:mb-6 uppercase">
              ✦ {locale === 'en' ? 'Vision' : 'Visi'}
            </p>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight">
              {t.about.visionTitle}
            </h2>
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-slate-200 italic leading-relaxed">
              "{t.about.visionDesc}"
            </p>
          </motion.div>

          {/* slide 4 */}
          <motion.h2
            style={{ opacity: s4 }}
            className="absolute text-[2.2rem] xs:text-[2.8rem] sm:text-6xl lg:text-7xl
              font-black text-white whitespace-pre-line leading-[0.95] px-4"
          >
            Engineering Practiice Built to last
          </motion.h2>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   PROCESS SECTION
══════════════════════════════════════ */
function ProcessSection({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const steps = [
    {
      title:    locale === 'en' ? 'Material Selection'  : 'Pemilihan Material',
      subtitle: locale === 'en' ? 'The right foundation for every build.' : 'Fondasi yang tepat untuk setiap produksi.',
      image:    'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1600&q=80',
    },
    {
      title:    locale === 'en' ? 'Precision Machining' : 'Proses Presisi',
      subtitle: locale === 'en' ? 'Accuracy shaped through controlled execution.' : 'Akurasi dibentuk melalui eksekusi yang terkontrol.',
      image:    'https://images.unsplash.com/photo-1581091870627-3a7b6c1c7b9c?w=1600&q=80',
    },
    {
      title:    locale === 'en' ? 'Quality Control'     : 'Kontrol Kualitas',
      subtitle: locale === 'en' ? 'Every detail checked. Every standard respected.' : 'Setiap detail diperiksa. Setiap standar dijaga.',
      image:    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80',
    },
    {
      title:    locale === 'en' ? 'Delivery'            : 'Pengiriman',
      subtitle: locale === 'en' ? 'Reliable completion from factory to client.' : 'Penyelesaian yang andal dari pabrik ke klien.',
      image:    'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1600&q=80',
    },
  ];

  /*
    All transforms declared unconditionally at top level.
    GPT used a helper that called useTransform inside a map — that
    violates React's rules of hooks. We unroll it explicitly.
  */
  const op0 = useTransform(scrollYProgress, [0.00, 0.12, 0.25], [0, 1, 0]);
  const op1 = useTransform(scrollYProgress, [0.25, 0.37, 0.50], [0, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.50, 0.62, 0.75], [0, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.75, 0.87, 1.00], [0, 1, 0]);
  const opacities = [op0, op1, op2, op3];

  const sc0 = useTransform(scrollYProgress, [0.00, 0.25], [1, 1.08]);
  const sc1 = useTransform(scrollYProgress, [0.25, 0.50], [1, 1.08]);
  const sc2 = useTransform(scrollYProgress, [0.50, 0.75], [1, 1.08]);
  const sc3 = useTransform(scrollYProgress, [0.75, 1.00], [1, 1.08]);
  const scales = [sc0, sc1, sc2, sc3];

  const y0 = useTransform(scrollYProgress, [0.00, 0.25], [50, 0]);
  const y1 = useTransform(scrollYProgress, [0.25, 0.50], [50, 0]);
  const y2 = useTransform(scrollYProgress, [0.50, 0.75], [50, 0]);
  const y3 = useTransform(scrollYProgress, [0.75, 1.00], [50, 0]);
  const yOffsets = [y0, y1, y2, y3];

  return (
    /* Slightly shorter on mobile — still works, less scrolling */
    <section ref={ref} className="relative h-[350vh] sm:h-[380vh] lg:h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* background images */}
        {steps.map((step, i) => (
          <motion.img
            key={i}
            src={step.image}
            alt=""
            style={{ opacity: opacities[i], scale: scales[i] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}

        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/80" />

        {/* eyebrow — top centre */}
        <div className="absolute top-8 sm:top-10 left-1/2 -translate-x-1/2 text-center px-4">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-indigo-300 whitespace-nowrap">
            ✦ {locale === 'en' ? 'Our Process' : 'Proses Kami'}
          </p>
        </div>

        {/* step content — centred */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-5 sm:px-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              style={{ opacity: opacities[i], y: yOffsets[i] }}
              className="absolute max-w-[calc(100vw-40px)] sm:max-w-2xl lg:max-w-4xl"
            >
              {/* step counter */}
              <div className="mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-[0.35em] text-indigo-300">
                0{i + 1}
              </div>

              {/* title — scales down for Mobile S */}
              <h2 className="text-[2rem] xs:text-[2.5rem] sm:text-5xl lg:text-6xl
                font-black text-white leading-tight">
                {step.title}
              </h2>

              {/* subtitle */}
              <p className="mt-3 sm:mt-5 text-sm xs:text-base sm:text-lg text-slate-200 max-w-xs sm:max-w-2xl mx-auto leading-relaxed">
                {step.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   CTA SECTION
══════════════════════════════════════ */
function CTASection({ locale }: { locale: string }) {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_40%)]" />

      <motion.div
        className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center"
        {...fadeUp}
      >
        <SectionLabel>{locale === 'en' ? 'Start a Conversation' : 'Mulai Percakapan'}</SectionLabel>

        <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl
          font-black mb-4 sm:mb-6 text-slate-900 leading-tight">
          {locale === 'en'
            ? "Let's Build Something That Lasts"
            : 'Mari Bangun Sesuatu yang Bertahan Lama'}
        </h2>

        <p className="text-sm sm:text-base lg:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
          {locale === 'en'
            ? 'From custom fabrication to long-term production partnerships, we build with precision, reliability, and intent.'
            : 'Dari fabrikasi kustom hingga kemitraan produksi jangka panjang, kami membangun dengan presisi, keandalan, dan tujuan.'}
        </p>

        {/* 
          Full-width on mobile S so it's easy to tap,
          auto-width on sm+ 
        */}
        <Link
          to={`/${locale}/contact`}
          className="group inline-flex items-center justify-center gap-3
            w-full sm:w-auto
            rounded-xl sm:rounded-2xl bg-indigo-600
            px-7 sm:px-8 py-4 font-semibold text-white text-sm sm:text-base
            shadow-[0_10px_30px_rgba(79,70,229,0.28)]
            transition hover:bg-indigo-700 hover:shadow-[0_14px_40px_rgba(79,70,229,0.38)]"
        >
          {locale === 'en' ? 'Start Project' : 'Mulai Proyek'}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════ */
export function AboutPage() {
  const { locale, t } = useLocale();

  return (
    <div className="bg-white">
      <HeroSection
        title={t.about.heroTitle}
        subtitle={t.about.heroSubtitle}
        backgroundVideo="https://res.cloudinary.com/dtny14e7t/video/upload/samples/dance-2.mp4"
      />

      <StorySection  locale={locale} t={t} />
      <StatsSection  locale={locale} />
      <MissionSection locale={locale} t={t} />
      <VisionSection  locale={locale} t={t} />
      <ProcessSection locale={locale} />

      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Timeline events={timeline} />
        </div>
      </section>

      <CTASection locale={locale} />
    </div>
  );
}