// AboutPage.tsx
import { stats, timeline } from '@/cms/about';
import { HeroSection } from '@/components/HeroSection';
import { Timeline } from '@/components/Timeline';
import { useCountUp } from '@/hooks/useScrollAnimation';
import { useLocale } from '@/i18n/LocaleContext';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useMemo, useRef } from 'react';

/* ══════════════════════════════════════
   TYPES
   ══════════════════════════════════════ */
type Locale = 'en' | 'id';

interface LocalizedField {
  en: string;
  id: string;
}

/* ══════════════════════════════════════
   MOTION VARIANTS
   ══════════════════════════════════════ */
const fadeUp = {
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
} as const;

const staggerWrap = {
  initial:     {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport:    { once: true, margin: '-60px' },
} as const;

const staggerItem = {
  initial:    { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;
const CMP_BLUE = '#1B4F9B';

/* ══════════════════════════════════════
   SHARED COMPONENTS
   ══════════════════════════════════════ */

/** Highlights specific words with a gradient */
function HighlightedText({
  text,
  highlights,
  gradientClass = 'bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent',
}: {
  text: string;
  highlights: string[];
  gradientClass?: string;
}) {
  return (
    <>
      {text.split(' ').map((word, i) => {
        const clean       = word.replace(/[.,!?]$/g, '');
        const punctuation = word.match(/[.,!?]$/)?.[0] ?? '';
        return (
          <span key={i}>
            <span className={highlights.includes(clean) ? gradientClass : ''}>
              {clean}
            </span>
            {punctuation}{' '}
          </span>
        );
      })}
    </>
  );
}

/** Renders the first letter in CMP blue, rest in current color */
function CMPWord({ children }: { children: string }) {
  return (
    <span>
      <span style={{ color: CMP_BLUE }}>{children[0]}</span>
      {children.slice(1)}
    </span>
  );
}

/* ══════════════════════════════════════
   STORY SECTION
   ══════════════════════════════════════ */
function StorySection({ locale, t }: { locale: Locale; t: any }) {
  const headline = locale === 'en'
    ? ['Capable.', 'Mastery.', 'Performance.']
    : ['Cermat.',  'Mahir.',   'Pasti.'];

  return (
    <section className="relative bg-white border-b border-zinc-200">
      <div className="max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-32">
        <motion.div {...fadeUp}>

          <span className="text-[10px] font-bold tracking-[0.35em] text-zinc-500 uppercase mb-6 block">
            {locale === 'en' ? 'About Us' : 'Tentang Kami'}
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 leading-[1.05] tracking-tight mb-10">
            {headline.map((word, i) => (
              <span key={i}>
                <CMPWord>{word}</CMPWord>
                {i < 2 && <br />}
              </span>
            ))}
          </h2>

          <div className="space-y-6">
            <p className="text-lg sm:text-xl leading-relaxed font-medium text-zinc-800">
              {t.about.companyDesc}
            </p>
            <p className="text-base leading-relaxed text-zinc-600">
              {t.about.companyDesc2}
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   STATS SECTION
   ══════════════════════════════════════ */
function StatCard({ stat, locale }: { stat: typeof stats[number]; locale: Locale }) {
  const raw    = parseInt(stat.value.replace(/\D/g, ''), 10);
  const suffix = stat.value.replace(/\d/g, '');
  const { ref, count } = useCountUp(raw, 2000);

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className="group relative p-8 lg:p-10 flex flex-col items-start"
    >
      <div className="flex items-baseline gap-1.5 mb-3">
        <span className="text-4xl lg:text-5xl font-black text-white tabular-nums leading-none tracking-tight">
          {count}
        </span>
        <span className="text-xl lg:text-2xl font-bold text-zinc-500 group-hover:text-indigo-400 transition-colors">
          {suffix}
        </span>
      </div>

      <p className="text-sm lg:text-base font-medium text-zinc-400 leading-snug group-hover:text-zinc-200 transition-colors">
        {(stat.label as LocalizedField)[locale]}
      </p>

      {/* Hover underline */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-indigo-500 w-0 group-hover:w-full transition-all duration-300" />
    </motion.div>
  );
}

function StatsSection({ locale }: { locale: Locale }) {
  return (
    <section className="relative bg-zinc-900 border-y border-zinc-800">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-800"
          {...staggerWrap}
        >
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} locale={locale} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   MISSION SECTION
   ══════════════════════════════════════ */
function MissionSection({ locale, t }: { locale: Locale; t: any }) {
  const panels = useMemo(() => [
    { title: locale === 'en' ? 'Quality'    : 'Kualitas',     text: t.about.mission1, image: 'https://images.unsplash.com/photo-1581093458791-9d42c52f2c77?w=900&q=80' },
    { title: locale === 'en' ? 'Innovation' : 'Inovasi',      text: t.about.mission2, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80' },
    { title: locale === 'en' ? 'Safety'     : 'Keselamatan',  text: t.about.mission3, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80' },
    { title: locale === 'en' ? 'Integrity'  : 'Integritas',   text: t.about.mission4, image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80' },
  ], [t, locale]);

  return (
    <section className="relative overflow-hidden">
      <div className="flex flex-col sm:flex-row w-full min-h-[600px] sm:h-[680px] lg:h-[760px]">

        {/* Left label panel */}
        <div className="relative sm:w-[20%] lg:w-[17%] shrink-0 min-h-[180px] sm:min-h-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80"
            alt="Factory"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/60 to-zinc-950/85" />
          <div className="absolute bottom-8 left-6 sm:bottom-10 sm:left-8">
            <div className="w-6 h-[2px] bg-white/40 mb-4" />
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-tight">
              {locale === 'en' ? 'Mission' : 'Misi'}
            </p>
          </div>
        </div>

        {/* Expandable panels */}
        {panels.map((panel, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
            className="relative flex-1 min-h-[260px] sm:min-h-0 overflow-hidden
                       border-l border-white/10 group cursor-default
                       hover:flex-[1.4] transition-all duration-700"
            style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
          >
            <img
              src={panel.image}
              alt={panel.title}
              className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-zinc-950/55 group-hover:bg-zinc-950/45 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/30 to-transparent" />

            {/* Vertical title */}
            <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-14 flex items-start pt-8 justify-center z-10">
              <span
                className="text-sm sm:text-base font-black text-white uppercase tracking-widest leading-none"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                {panel.title}
              </span>
            </div>

            <div className="absolute top-8 left-14 bottom-8 w-px bg-white/15 z-10" />

            <div className="absolute bottom-0 left-14 right-0 p-5 sm:p-6 lg:p-8 z-10">
              <div className="w-6 h-[2px] bg-white/40 mb-3" />
              <p className="text-white/85 text-sm sm:text-base leading-snug font-medium">
                {panel.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   VISION SECTION
   ══════════════════════════════════════ */
function VisionSection({ locale, t }: { locale: Locale; t: any }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Build opacity / y transforms for 4 slides from a single helper
  const makeSlide = (inStart: number, peak: number, outEnd: number) => ({
    opacity: useTransform(scrollYProgress, [inStart, peak, outEnd], [0, 1, 0]),
    y:       useTransform(scrollYProgress, [inStart, peak],         [30, 0]),
  });

  const slides = [
    {
      ...makeSlide(0.00, 0.10, 0.22),
      content: (
        <h2 className="text-[2rem] sm:text-5xl lg:text-7xl font-black text-white max-w-3xl leading-[1.02] tracking-tight">
          <HighlightedText text="Manufacturing is not about speed." highlights={['not', 'speed']} />
        </h2>
      ),
    },
    {
      ...makeSlide(0.22, 0.32, 0.44),
      content: (
        <h2 className="text-[2rem] sm:text-5xl lg:text-7xl font-black text-white max-w-3xl leading-[1.02] tracking-tight">
          <HighlightedText
            text="It is about delivering quality and defining values."
            highlights={['delivering', 'quality', 'defining', 'values']}
          />
        </h2>
      ),
    },
    {
      ...makeSlide(0.44, 0.56, 0.72),
      content: (
        <div className="max-w-2xl lg:max-w-3xl">
          <p className="text-[10px] sm:text-xs tracking-[0.45em] text-indigo-300 mb-5 sm:mb-7 uppercase font-bold">
            {locale === 'en' ? 'Vision' : 'Visi'}
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white mb-5 sm:mb-7 leading-tight">
            {t.about.visionTitle}
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-slate-200 italic leading-relaxed">
            "{t.about.visionDesc}"
          </p>
        </div>
      ),
    },
    {
      ...makeSlide(0.72, 0.82, 1.00),
      content: (
        <h2 className="text-[2.4rem] sm:text-6xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight">
          <span className="block">Engineering</span>
          <span className="block">Practice</span>
          <span className="block">
            <HighlightedText text="Built to last" highlights={['Built', 'to', 'last']} />
          </span>
        </h2>
      ),
    },
  ];

  return (
    <section ref={ref} className="relative h-[280vh] sm:h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1800&q=80"
          style={{ scale: useTransform(scrollYProgress, [0, 1], [1, 1.1]) }}
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/65 to-slate-950/95" />

        {/* Scroll progress bar */}
        <motion.div
          className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-500 z-10"
          style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
        />

        {/* Slides */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 sm:px-16">
          {slides.map(({ opacity, y, content }, i) => (
            <motion.div key={i} style={{ opacity, y }} className="absolute">
              {content}
            </motion.div>
          ))}
        </div>

        {/* Scroll hint */}
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
   PROCESS SECTION
   ══════════════════════════════════════ */
function ProcessSection({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const steps = useMemo(() => [
    {
      title:    locale === 'en' ? 'Material Selection' : 'Pemilihan Material',
      subtitle: locale === 'en' ? 'The right foundation for every build.'          : 'Fondasi yang tepat untuk setiap produksi.',
      image:    'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1800&q=80',
    },
    {
      title:    locale === 'en' ? 'Precision Machining' : 'Proses Presisi',
      subtitle: locale === 'en' ? 'Accuracy shaped through controlled execution.'  : 'Akurasi dibentuk melalui eksekusi yang terkontrol.',
      image:    'https://images.unsplash.com/photo-1581091870627-3a7b6c1c7b9c?w=1800&q=80',
    },
    {
      title:    locale === 'en' ? 'Quality Control' : 'Kontrol Kualitas',
      subtitle: locale === 'en' ? 'Every detail checked. Every standard respected.' : 'Setiap detail diperiksa. Setiap standar dijaga.',
      image:    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800&q=80',
    },
    {
      title:    locale === 'en' ? 'Delivery' : 'Pengiriman',
      subtitle: locale === 'en' ? 'Reliable completion from factory to client.'    : 'Penyelesaian yang andal dari pabrik ke klien.',
      image:    'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1800&q=80',
    },
  ], [locale]);

  // Build per-step motion values from segment boundaries
  const segments = steps.map((_, i) => {
    const seg  = 1 / steps.length;
    const s    = i * seg;
    const mid  = s + seg * 0.5;
    const e    = s + seg;
    return {
      opacity: useTransform(scrollYProgress, [s, s + seg * 0.48, e], [0, 1, 0]),
      scale:   useTransform(scrollYProgress, [s, e], [1.0, 1.07]),
      y:       useTransform(scrollYProgress, [s, mid], [48, 0]),
    };
  });

  return (
    <section ref={ref} className="relative h-[380vh] sm:h-[420vh]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background images */}
        {steps.map((step, i) => (
          <motion.img
            key={i}
            src={step.image}
            alt=""
            style={{ opacity: segments[i].opacity, scale: segments[i].scale }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}

        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-transparent to-slate-950/85" />

        {/* Section label */}
        <div className="absolute top-8 sm:top-10 inset-x-0 text-center pointer-events-none">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.45em] text-indigo-300 font-bold">
            {locale === 'en' ? 'Our Process' : 'Proses Kami'}
          </p>
        </div>

        {/* Step indicators (desktop) */}
        <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3">
          {steps.map((_, i) => (
            <motion.div key={i} style={{ opacity: segments[i].opacity }} className="text-right">
              <span className="text-[10px] font-bold tracking-widest text-slate-400 block mb-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <motion.div
                className="h-px bg-white ml-auto"
                style={{ width: useTransform(segments[i].opacity, [0, 1], ['8px', '28px']) }}
              />
            </motion.div>
          ))}
        </div>

        {/* Slide content */}
        <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-20 text-center">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              style={{ opacity: segments[i].opacity, y: segments[i].y }}
              className="absolute max-w-xs sm:max-w-2xl lg:max-w-4xl"
            >
              <p className="mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-[0.4em] text-indigo-300 font-bold">
                Step {String(i + 1).padStart(2, '0')}
              </p>
              <h2 className="text-[2.2rem] sm:text-5xl lg:text-7xl font-black text-white leading-[1.02] tracking-tight">
                {step.title}
              </h2>
              <p className="mt-4 sm:mt-6 text-sm sm:text-lg lg:text-xl text-slate-300 max-w-xl mx-auto leading-relaxed">
                {step.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full bg-white"
              style={{
                opacity: useTransform(segments[i].opacity, [0, 1], [0.25, 1]),
                width:   useTransform(segments[i].opacity, [0, 1], [6, 24]),
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
   TIMELINE SECTION
   ══════════════════════════════════════ */
function TimelineSection() {
  return (
    <section className="relative bg-white overflow-hidden border-t border-zinc-100">
      <Timeline events={timeline} />
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
    </div>
  );
}
