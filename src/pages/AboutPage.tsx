// AboutPage.tsx
import { stats, timeline } from '@/cms/about';
import { HeroSection } from '@/components/HeroSection';
import { Timeline } from '@/components/Timeline';
import { useCountUp } from '@/hooks/useScrollAnimation';
import { useLocale } from '@/i18n/LocaleContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef, ReactNode } from 'react';
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
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: '-60px' },
} as const;

const staggerItem = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
} as const;

/* ══════════════════════════════════════
   TEXT HIGHLIGHTER COMPONENT
   ══════════════════════════════════════ */
interface HighlightProps {
  text: string;
  highlights: string[];
  gradientClass?: string;
}

function HighlightedText({
  text,
  highlights,
  gradientClass = 'bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent'
}: HighlightProps) {
  const words = text.split(' ');

  return (
    <>
      {words.map((word, i) => {
        const cleanWord = word.replace(/[.,!?]/g, '');
        const isHighlighted = highlights.includes(cleanWord);
        const punctuation = word.match(/[.,!?]$/)?.[0] || '';

        return (
          <span key={i}>
            <span className={isHighlighted ? gradientClass : ''}>
              {cleanWord}
            </span>
            {punctuation}{' '}
          </span>
        );
      })}
    </>
  );
}

/* ══════════════════════════════════════
   SECTION LABEL
   ══════════════════════════════════════ */
function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-[10px] sm:text-xs uppercase tracking-[0.4em] mb-3 sm:mb-4 font-bold ${
        light ? 'text-indigo-300/80' : 'text-indigo-600/70'
      }`}
    >
      ⚙️ {children}
    </p>
  );
}

/* ══════════════════════════════════════
   STAT CARD
   ══════════════════════════════════════ */
const STAT_ACCENTS = [
  { grad: 'from-indigo-500 to-violet-600', glow: 'rgba(99,102,241,0.35)' },
  { grad: 'from-violet-500 to-fuchsia-600', glow: 'rgba(139,92,246,0.35)' },
  { grad: 'from-sky-500 to-indigo-600', glow: 'rgba(14,165,233,0.35)' },
  { grad: 'from-indigo-500 to-cyan-500', glow: 'rgba(6,182,212,0.35)' },
];

function Stat({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  const { locale } = useLocale();
  const numeric = parseInt(stat.value.replace(/[^0-9]/g, ''), 10);
  const suffix = stat.value.replace(/[0-9]/g, '');
  const { ref, count } = useCountUp(numeric, 2000);
  const { grad, glow } = STAT_ACCENTS[index % STAT_ACCENTS.length];

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10
                 bg-white/5 backdrop-blur-md px-4 py-8 sm:p-9 text-center
                 transition-all duration-500 hover:-translate-y-1"
      style={{ '--glow': glow } as React.CSSProperties}
    >
      {/* top bar */}
      <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${grad}`} />

      {/* ambient orb */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full blur-3xl opacity-0
                   group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: glow }}
      />

      {/* shimmer sweep */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r
                       from-transparent via-white/5 to-transparent group-hover:translate-x-full
                       transition-transform duration-700" />

      {/* text */}
      <div className={`text-5xl xs:text-6xl sm:text-7xl font-black tabular-nums
                      bg-gradient-to-br ${grad} bg-clip-text text-transparent drop-shadow
                      inline-flex items-baseline gap-1`}>
        <span>{count}</span>
        <span className="ml-1">{suffix}</span>
      </div>

      <div className="mt-4 text-[9px] xs:text-[10px] sm:text-[11px]
                      uppercase tracking-[0.35em] text-slate-400 leading-snug">
        {stat.label[locale]}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   STORY SECTION (full-bleed, seamless top)
   ══════════════════════════════════════ */
function StorySection({ locale, t }: { locale: string; t: any }) {
  return (
    <section className="relative pt-24 pb-0 sm:pt-32 sm:pb-0 lg:pt-40 bg-slate-950 text-white overflow-hidden">
      {/* layered ambients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(99,102,241,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_100%,rgba(56,189,248,0.14),transparent_50%)]" />

      {/* grid */}
      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:52px_52px]" />

      {/* content container */}
      <div className="relative w-full px-5 sm:px-10 lg:px-20 xl:px-28">
        <motion.div
          className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 xl:gap-28 items-start"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerWrap}
        >
          {/* left */}
          <motion.div variants={staggerItem}>
            <SectionLabel light>{locale === 'en' ? 'Who We Are' : 'Siapa Kami'}</SectionLabel>

            <h1 className="text-[2.2rem] xs:text-[2.8rem] sm:text-5xl lg:text-6xl xl:text-7xl
                           font-black leading-[1.04] tracking-tight max-w-3xl">
              {locale === 'en'
                ? 'Built through decade of precision'
                : 'Dibangun melalui dekade presisi'}
            </h1>

            <p className="mt-7 sm:mt-9 text-base sm:text-lg xl:text-xl text-slate-300
                          leading-relaxed max-w-2xl">
              {t.about.companyDesc}
            </p>

            {/* inline keyword pills */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {(locale === 'en'
                ? ['Quality First', 'Engineered to Last', 'Trusted Process', 'Industry Ready']
                : ['Kualitas Utama', 'Dibangun untuk Bertahan', 'Proses Terpercaya', 'Siap Industri']
              ).map((kw) => (
                <motion.span
                  key={kw}
                  variants={staggerItem}
                  className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5
                             backdrop-blur text-xs font-semibold text-slate-300 tracking-wide"
                >
                  {kw}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* right glass card */}
          <motion.div variants={staggerItem} className="relative">
            {/* decorative blobs */}
            <div className="absolute -z-10 -right-10 -top-10 w-40 h-40 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute -z-10 -left-10 -bottom-10 w-40 h-40 rounded-full bg-sky-500/20 blur-3xl" />

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                            p-8 sm:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <p className="text-base sm:text-lg xl:text-xl text-slate-300 leading-relaxed">
                {t.about.companyDesc2}
              </p>

              {/* mini stat strip */}
              <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-5">
                {[
                  { n: '40+', label: locale === 'en' ? 'Years Active' : 'Tahun Aktif' },
                  { n: '200+', label: locale === 'en' ? 'Products Made' : 'Produk Dibuat' },
                ].map(({ n, label }) => (
                  <div key={label}>
                    <div className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-violet-400
                                    bg-clip-text text-transparent tabular-nums">{n}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   STATS SECTION (full-bleed, seamless merge)
   ══════════════════════════════════════ */
function StatsSection({ locale }: { locale: string }) {
  return (
    <section className="relative bg-slate-950 pt-24 pb-24 sm:pt-32 sm:pb-32 overflow-hidden">
      {/* gradient overlay for seamless blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950" />

      {/* subtle radial accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
                      bg-indigo-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px]
                      bg-violet-500/5 rounded-full blur-3xl" />

      <div className="relative w-full px-5 sm:px-10 lg:px-20 xl:px-28">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
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
   MISSION SECTION (full-bleed light)
   ══════════════════════════════════════ */
function MissionSection({ locale, t }: { locale: string; t: any }) {
  const items = useMemo(
    () => [
      { text: t.about.mission1, image: 'https://images.unsplash.com/photo-1581093458791-9d42c52f2c77?w=900&q=80' },
      { text: t.about.mission2, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80' },
      { text: t.about.mission3, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80' },
      { text: t.about.mission4, image: 'https://images.unsplash.com/photo-1581093458791-9d42c52f2c77?w=900&q=80' },
    ],
    [t],
  );

  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-gradient-to-br from-slate-50 via-white to-indigo-50/50 overflow-hidden">
      {/* seamless top transition */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-slate-950/5 to-transparent" />

      {/* subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(circle,#6366f1_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative w-full px-5 sm:px-10 lg:px-20 xl:px-28">
        {/* header */}
        <motion.div className="mb-14 sm:mb-20" {...fadeUp}>
          <SectionLabel>{locale === 'en' ? 'Mission Statement' : 'Pernyataan Misi'}</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900
                           leading-tight max-w-2xl">
              {t.about.missionTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-sm leading-relaxed lg:text-right shrink-0">
              {locale === 'en'
                ? 'The principles that guide every product, every process, and every partnership.'
                : 'Prinsip yang membimbing setiap produk, proses, dan kemitraan.'}
            </p>
          </div>
        </motion.div>

        {/* card grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerWrap}
        >
          {items.map((m, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="group relative h-72 sm:h-96 rounded-3xl overflow-hidden
                         shadow-[0_8px_40px_rgba(15,23,42,0.1)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.18)]
                         transition-shadow duration-500"
            >
              <img
                src={m.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover
                           group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/15 via-transparent to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* index badge */}
              <div className="absolute top-5 left-5 w-9 h-9 rounded-2xl
                              bg-white/15 backdrop-blur border border-white/20
                              text-white flex items-center justify-center text-xs font-bold">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* text */}
              <div className="absolute bottom-0 p-6">
                <p className="text-white text-sm sm:text-base leading-relaxed line-clamp-4 sm:line-clamp-none">
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
   VISION SECTION (full-bleed scroll)
   ══════════════════════════════════════ */
function VisionSection({ locale, t }: { locale: string; t: any }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const s1 = useTransform(scrollYProgress, [0, 0.10, 0.22], [0, 1, 0]);
  const s2 = useTransform(scrollYProgress, [0.22, 0.32, 0.44], [0, 1, 0]);
  const s3 = useTransform(scrollYProgress, [0.44, 0.56, 0.72], [0, 1, 0]);
  const s4 = useTransform(scrollYProgress, [0.72, 0.82, 1.00], [0, 1, 0]);

  const y1 = useTransform(scrollYProgress, [0, 0.22], [30, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.44], [30, 0]);
  const y3 = useTransform(scrollYProgress, [0.44, 0.72], [30, 0]);
  const y4 = useTransform(scrollYProgress, [0.72, 1.00], [30, 0]);

  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const slides = [
    {
      opacity: s1,
      y: y1,
      content: (
        <h2 className="text-[2rem] xs:text-[2.6rem] sm:text-5xl lg:text-7xl font-black text-white max-w-xs sm:max-w-3xl leading-[1.02] tracking-tight">
          <HighlightedText
            text="Manufacturing is not about speed."
            highlights={['not', 'speed']}
          />
        </h2>
      )
    },
    {
      opacity: s2,
      y: y2,
      content: (
        <h2 className="text-[2rem] xs:text-[2.6rem] sm:text-5xl lg:text-7xl font-black text-white max-w-xs sm:max-w-3xl leading-[1.02] tracking-tight">
          <HighlightedText
            text="It is about delivering quality and defining values."
            highlights={['delivering', 'quality', 'defining', 'values']}
          />
        </h2>
      )
    },
    {
      opacity: s3,
      y: y3,
      content: (
        <div className="max-w-xs sm:max-w-2xl lg:max-w-3xl">
          <p className="text-[10px] sm:text-xs tracking-[0.45em] text-indigo-300 mb-5 sm:mb-7 uppercase font-bold">
            ⚙️ {locale === 'en' ? 'Vision' : 'Visi'}
          </p>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-5 sm:mb-7 leading-tight">
            {t.about.visionTitle}
          </h2>
          <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-slate-200 italic leading-relaxed">
            "{t.about.visionDesc}"
          </p>
        </div>
      )
    },
    {
      opacity: s4,
      y: y4,
      content: (
        <h2 className="text-[2.4rem] xs:text-[3rem] sm:text-6xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight">
          <span className="block">Engineering</span>
          <span className="block">Practice</span>
          <span className="block">
          <HighlightedText
            text="Built to last"
            highlights={['Built', 'to', 'last']}
          />
          </span>
        </h2>
      )
    },
  ];

  return (
    <section ref={ref} className="relative h-[280vh] sm:h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1800&q=80"
          style={{ scale: scaleBg }}
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/65 to-slate-950/95" />

        {/* progress bar */}
        <motion.div
          className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 z-10"
          style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
        />

        <div className="absolute inset-0 flex items-center justify-center text-center px-6 sm:px-16">
          {slides.map(({ opacity, y, content }, i) => (
            <motion.div
              key={i}
              style={{ opacity, y }}
              className="absolute"
            >
              {content}
            </motion.div>
          ))}
        </div>

        {/* scroll cue */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase text-slate-400">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   PROCESS SECTION (full-bleed scroll)
   ══════════════════════════════════════ */
function ProcessSection({ locale }: { locale: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const steps = [
    {
      title: locale === 'en' ? 'Material Selection' : 'Pemilihan Material',
      subtitle: locale === 'en' ? 'The right foundation for every build.' : 'Fondasi yang tepat untuk setiap produksi.',
      image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1800&q=80'
    },
    {
      title: locale === 'en' ? 'Precision Machining' : 'Proses Presisi',
      subtitle: locale === 'en' ? 'Accuracy shaped through controlled execution.' : 'Akurasi dibentuk melalui eksekusi yang terkontrol.',
      image: 'https://images.unsplash.com/photo-1581091870627-3a7b6c1c7b9c?w=1800&q=80'
    },
    {
      title: locale === 'en' ? 'Quality Control' : 'Kontrol Kualitas',
      subtitle: locale === 'en' ? 'Every detail checked. Every standard respected.' : 'Setiap detail diperiksa. Setiap standar dijaga.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800&q=80'
    },
    {
      title: locale === 'en' ? 'Delivery' : 'Pengiriman',
      subtitle: locale === 'en' ? 'Reliable completion from factory to client.' : 'Penyelesaian yang andal dari pabrik ke klien.',
      image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1800&q=80'
    },
  ];

  const op0 = useTransform(scrollYProgress, [0.00, 0.12, 0.25], [0, 1, 0]);
  const op1 = useTransform(scrollYProgress, [0.25, 0.37, 0.50], [0, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.50, 0.62, 0.75], [0, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.75, 0.87, 1.00], [0, 1, 0]);
  const opacities = [op0, op1, op2, op3];

  const sc0 = useTransform(scrollYProgress, [0.00, 0.25], [1.0, 1.07]);
  const sc1 = useTransform(scrollYProgress, [0.25, 0.50], [1.0, 1.07]);
  const sc2 = useTransform(scrollYProgress, [0.50, 0.75], [1.0, 1.07]);
  const sc3 = useTransform(scrollYProgress, [0.75, 1.00], [1.0, 1.07]);
  const scales = [sc0, sc1, sc2, sc3];

  const y0 = useTransform(scrollYProgress, [0.00, 0.25], [48, 0]);
  const y1 = useTransform(scrollYProgress, [0.25, 0.50], [48, 0]);
  const y2 = useTransform(scrollYProgress, [0.50, 0.75], [48, 0]);
  const y3 = useTransform(scrollYProgress, [0.75, 1.00], [48, 0]);
  const yOffsets = [y0, y1, y2, y3];

  return (
    <section ref={ref} className="relative h-[380vh] sm:h-[420vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-transparent to-slate-950/85" />

        {/* eyebrow */}
        <div className="absolute top-8 sm:top-10 inset-x-0 text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.45em] text-indigo-300 font-bold">
            ⚙️ {locale === 'en' ? 'Our Process' : 'Proses Kami'}
          </p>
        </div>

        {/* step counter rail — right side on desktop */}
        <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              style={{ opacity: opacities[i] }}
              className="text-right"
            >
              <span className="text-[10px] font-bold tracking-widest text-slate-400 block mb-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <motion.div
                className="h-px bg-white ml-auto"
                style={{ width: useTransform(opacities[i], [0, 1], ['8px', '28px']) }}
              />
            </motion.div>
          ))}
        </div>

        {/* content */}
        <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-20 text-center">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              style={{ opacity: opacities[i], y: yOffsets[i] }}
              className="absolute max-w-xs sm:max-w-2xl lg:max-w-4xl"
            >
              <div className="mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-[0.4em] text-indigo-300 font-bold">
                Step {String(i + 1).padStart(2, '0')}
              </div>
              <h2 className="text-[2.2rem] xs:text-[2.8rem] sm:text-5xl lg:text-7xl
                             font-black text-white leading-[1.02] tracking-tight">
                {step.title}
              </h2>
              <p className="mt-4 sm:mt-6 text-sm xs:text-base sm:text-lg lg:text-xl
                            text-slate-300 max-w-xs sm:max-w-xl mx-auto leading-relaxed">
                {step.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

        {/* bottom progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full bg-white transition-all duration-300"
              style={{
                opacity: useTransform(opacities[i], [0, 1], [0.25, 1]),
                width:   useTransform(opacities[i], [0, 1], [6, 24]),
                height:  6,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   TIMELINE SECTION (full-bleed)
   ══════════════════════════════════════ */
function TimelineSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* subtle top border gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent" />
      <Timeline events={timeline} />
    </section>
  );
}

/* ══════════════════════════════════════
   CTA SECTION (full-bleed)
   ══════════════════════════════════════ */
function CTASection({ locale }: { locale: string }) {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-slate-950">
      {/* ambients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,rgba(99,102,241,0.18),transparent_65%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[480, 680, 880].map((s) => (
          <div
            key={s}
            className="absolute rounded-full border border-white/5"
            style={{ width: s, height: s }}
          />
        ))}
      </div>

      <motion.div
        className="relative w-full px-5 sm:px-10 lg:px-20 text-center"
        {...fadeUp}
      >
        <SectionLabel light>
          {locale === 'en' ? 'Start Your Partnership' : 'Mulai Kerja Sama'}
        </SectionLabel>

        <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl
                       font-black mb-5 sm:mb-7 text-white leading-tight max-w-4xl mx-auto">
          {locale === 'en'
            ? 'Precision Manufacturing, Built to Scale.'
            : 'Manufaktur Presisi untuk Skala Besar.'}
        </h2>

        <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-slate-400
                      max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12">
          {locale === 'en'
            ? 'Explore our products or connect with our team to develop reliable, high-quality manufacturing solutions.'
            : 'Jelajahi produk kami atau hubungi tim kami untuk mengembangkan solusi manufaktur yang andal.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={`/${locale}/products`}
            className="group inline-flex items-center justify-center gap-3
                       w-full sm:w-auto rounded-2xl bg-indigo-600
                       px-8 py-4 sm:py-5 font-bold text-white text-sm sm:text-base
                       shadow-[0_12px_40px_rgba(99,102,241,0.35)]
                       hover:bg-indigo-500 hover:shadow-[0_16px_50px_rgba(99,102,241,0.5)]
                       transition-all duration-300"
          >
            {locale === 'en' ? 'Explore Products' : 'Lihat Produk'}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>

          <Link
            to={`/${locale}/contact`}
            className="inline-flex items-center justify-center
                       w-full sm:w-auto rounded-2xl border border-white/15
                       px-8 py-4 sm:py-5 font-semibold text-slate-300 text-sm sm:text-base
                       hover:bg-white/5 hover:border-white/25 hover:text-white
                       transition-all duration-300"
          >
            {locale === 'en' ? 'Contact Us' : 'Hubungi Kami'}
          </Link>
        </div>
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
    <div className="bg-slate-950">
      <HeroSection
        title={t.about.heroTitle}
        subtitle={t.about.heroSubtitle}
        backgroundVideo="https://res.cloudinary.com/dtny14e7t/video/upload/samples/dance-2.mp4"
      />

      <StorySection   locale={locale} t={t} />
      <StatsSection   locale={locale} />
      <MissionSection locale={locale} t={t} />
      <VisionSection  locale={locale} t={t} />
      <ProcessSection locale={locale} />
      <TimelineSection />
      <CTASection     locale={locale} />
    </div>
  );
}
