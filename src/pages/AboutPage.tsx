// AboutPage.tsx
import { stats, timeline } from '@/cms/about';
import { HeroSection } from '@/components/HeroSection';
import { Timeline } from '@/components/Timeline';
import { useCountUp } from '@/hooks/useScrollAnimation';
import { useLocale } from '@/i18n/LocaleContext';
import { motion, useScroll, useTransform } from 'framer-motion';
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
   CONSTANTS
   ══════════════════════════════════════ */
const CMP_BLUE       = '#1B4F9B';
const CMP_BLUE_LIGHT = '#2563EB';
const CMP_BLUE_DARK  = '#0F2D5E';
const EASE           = [0.22, 1, 0.36, 1] as const;

/* ══════════════════════════════════════
   MOTION VARIANTS
   ══════════════════════════════════════ */
const fadeUp = {
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.75, ease: EASE },
} as const;

const staggerWrap = {
  initial:     {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport:    { once: true, margin: '-60px' },
} as const;

const staggerItem = {
  initial:     { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  transition:  { duration: 0.65, ease: EASE },
} as const;

/* ══════════════════════════════════════
   SHARED COMPONENTS
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
        light ? 'text-blue-300/70' : 'text-zinc-500'
      }`}
    >
      {children}
    </span>
  );
}

function HighlightedText({
  text,
  highlights,
  gradientClass = 'bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent',
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

function CMPWord({ children }: { children: string }) {
  return (
    <span>
      <span style={{ color: CMP_BLUE }}>{children[0]}</span>
      {children.slice(1)}
    </span>
  );
}

/* ══════════════════════════════════════
   STORY SECTION — full bleed white
   ══════════════════════════════════════ */
function StorySection({ locale, t }: { locale: Locale; t: any }) {
  const headline = locale === 'en'
    ? ['Capable.', 'Mastery.', 'Performance.']
    : ['Cermat.',  'Mahir.',   'Pasti.'];

  return (
    <section className="relative bg-white border-b border-zinc-100">
      {/* CMP blue top accent */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: CMP_BLUE }} />

      <div className="w-full px-6 sm:px-10 lg:px-20 xl:px-28 py-24 lg:py-32">
        <motion.div {...fadeUp}>
          <SectionLabel>{locale === 'en' ? 'About Us' : 'Tentang Kami'}</SectionLabel>

          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-24 items-start">
            {/* Left: headline */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-zinc-900
                             leading-[1.05] tracking-tight mb-10">
                {headline.map((word, i) => (
                  <span key={i}>
                    <CMPWord>{word}</CMPWord>
                    {i < 2 && <br />}
                  </span>
                ))}
              </h2>

              {/* Blue accent rule */}
              <div className="w-16 h-[3px] rounded-full mb-8" style={{ backgroundColor: CMP_BLUE }} />
            </div>

            {/* Right: body copy */}
            <div className="lg:border-l lg:border-blue-100 lg:pl-14 pt-2">
              <p className="text-lg sm:text-xl leading-relaxed font-medium text-zinc-700">
                {t.about.companyDesc}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   STATS SECTION — CMP blue gradient
   ══════════════════════════════════════ */
function StatCard({ stat, locale }: { stat: typeof stats[number]; locale: Locale }) {
  const raw    = parseInt(stat.value.replace(/\D/g, ''), 10);
  const suffix = stat.value.replace(/\d/g, '');
  const { ref, count } = useCountUp(raw, 2000);

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className="group relative p-8 lg:p-12 flex flex-col items-start"
    >
      <div className="flex items-baseline gap-1.5 mb-3">
        <span className="text-5xl lg:text-6xl font-black text-white tabular-nums leading-none tracking-tight">
          {count}
        </span>
        <span className="text-2xl lg:text-3xl font-bold text-blue-300/60
                         group-hover:text-blue-200 transition-colors">
          {suffix}
        </span>
      </div>

      <p className="text-sm lg:text-base font-medium text-blue-100/50 leading-snug
                   group-hover:text-blue-100 transition-colors">
        {(stat.label as LocalizedField)[locale]}
      </p>

      {/* Hover underline — white instead of indigo */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-white/40 w-0 group-hover:w-full transition-all duration-300" />
    </motion.div>
  );
}


/* ══════════════════════════════════════
   STATS SECTION — CMP blue gradient
   ══════════════════════════════════════ */
function StatsSection({ locale }: { locale: Locale }) {
  return (
    <section
      className="relative overflow-hidden border-y border-blue-900/40"
      style={{
        background: `linear-gradient(135deg, ${CMP_BLUE_DARK} 0%, ${CMP_BLUE} 60%, ${CMP_BLUE_LIGHT} 100%)`,
      }}
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial highlight */}
      <div
        className="absolute -right-40 -top-40 w-[700px] h-[700px] rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, white, transparent 70%)' }}
      />

      <div className="w-full px-6 sm:px-10 lg:px-20 xl:px-28 relative">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10"
          {...staggerWrap}
        >
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} locale={locale} />
          ))}
        </motion.div>

        {/* Footer row — ISO badge centered, no text */}
        <div className="py-5 border-t border-white/10 flex items-center justify-center">
          <div
            className="flex items-center gap-3 px-6 py-3 rounded-xl border border-white/10"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          >
            <img
              src="/ISO/ISO-9001.webp"
              alt="ISO 9001:2015 Certified"
              style={{
                height: '40px',
                width: 'auto',
                objectFit: 'contain',
                forcedColorAdjust: 'none',
              } as React.CSSProperties}
            />
            <div className="w-px h-8 bg-white/15" />
            <div className="flex flex-col">
              <span className="text-sm font-black text-white leading-none tracking-tight">
                ISO 9001
              </span>
              <span className="text-[10px] font-semibold text-blue-100/60 tracking-wider mt-0.5">
                2015 CERTIFIED
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   MISSION SECTION — full bleed
   ══════════════════════════════════════ */
function MissionSection({ locale, t }: { locale: Locale; t: any }) {
  const panels = useMemo(() => [
    { title: locale === 'en' ? 'Quality'    : 'Kualitas',    text: t.about.mission1, image: 'https://images.unsplash.com/photo-1581093458791-9d42c52f2c77?w=900&q=80' },
    { title: locale === 'en' ? 'Innovation' : 'Inovasi',     text: t.about.mission2, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80' },
    { title: locale === 'en' ? 'Safety'     : 'Keselamatan', text: t.about.mission3, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80' },
    { title: locale === 'en' ? 'Integrity'  : 'Integritas',  text: t.about.mission4, image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80' },
  ], [t, locale]);

  const missionStatement = locale === 'en'
    ? 'We are committed to delivering excellence through quality, innovation, safety, and integrity in every project we undertake.'
    : 'Kami berkomitmen untuk memberikan keunggulan melalui kualitas, inovasi, keselamatan, dan integritas dalam setiap proyek yang kami kerjakan.';

  return (
    <section className="relative overflow-hidden">
      <div className="flex flex-col sm:flex-row w-full min-h-[600px] sm:h-[680px] lg:h-[760px]">

        {/* Left label panel */}
        <div className="relative sm:w-[20%] lg:w-[17%] shrink-0 min-h-[200px] sm:min-h-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80"
            alt="Factory"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Blue-tinted gradient overlay instead of plain zinc */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${CMP_BLUE_DARK}80 0%, ${CMP_BLUE}90 50%, ${CMP_BLUE_DARK}f0 100%)`,
            }}
          />

          {/* Top: Mission title */}
          <div className="absolute top-8 left-6 sm:top-10 sm:left-8 z-10">
            <div className="w-6 h-[2px] mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }} />
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-tight">
              {locale === 'en' ? 'Our Mission' : 'Misi Kami'}
            </p>
          </div>

          {/* Bottom: Mission statement */}
          <div className="absolute bottom-8 left-6 right-6 sm:bottom-10 sm:left-8 sm:right-8 z-10">
            <div className="w-6 h-[2px] mb-3 bg-blue-300/50" />
            <p className="text-blue-100/80 text-xs sm:text-sm leading-snug font-medium">
              {missionStatement}
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
              className="absolute inset-0 w-full h-full object-cover scale-100
                         group-hover:scale-105 transition-transform duration-700"
            />
            {/* Blue-tinted overlays */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{ backgroundColor: `${CMP_BLUE_DARK}80` }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, ${CMP_BLUE_DARK}f5 0%, ${CMP_BLUE}40 50%, transparent 100%)`,
              }}
            />

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
              <div className="w-6 h-[2px] bg-blue-400/60 mb-3" />
              <p className="text-blue-50/90 text-sm sm:text-base leading-snug font-medium">
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
   VISION SECTION — blue progress bar
   ══════════════════════════════════════ */
function VisionSection({ locale, t }: { locale: Locale; t: any }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const makeSlide = (inStart: number, peak: number, outEnd: number) => ({
    opacity: useTransform(scrollYProgress, [inStart, peak, outEnd], [0, 1, 0]),
    y:       useTransform(scrollYProgress, [inStart, peak],         [30, 0]),
  });

  const slides = [
    {
      ...makeSlide(0.00, 0.10, 0.22),
      content: (
        <h2 className="text-[2rem] sm:text-5xl lg:text-7xl font-black text-white max-w-3xl leading-[1.02] tracking-tight">
          <HighlightedText
            text="Manufacturing is not about speed."
            highlights={['not', 'speed']}
            gradientClass="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent"
          />
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
            gradientClass="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent"
          />
        </h2>
      ),
    },
    {
      ...makeSlide(0.44, 0.56, 0.72),
      content: (
        <div className="max-w-2xl lg:max-w-3xl">
          <p className="text-[10px] sm:text-xs tracking-[0.45em] text-blue-300 mb-5 sm:mb-7 uppercase font-bold">
            {locale === 'en' ? 'Vision' : 'Visi'}
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white mb-5 sm:mb-7 leading-tight">
            {t.about.visionTitle}
          </h2>
          <div className="w-12 h-[3px] rounded-full mx-auto mb-6 bg-blue-400" />
          <p className="text-sm sm:text-lg lg:text-xl text-blue-100/80 italic leading-relaxed">
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
            <HighlightedText
              text="Built to last"
              highlights={['Built', 'to', 'last']}
              gradientClass="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent"
            />
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
        {/* Blue-tinted dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${CMP_BLUE_DARK}60 0%, ${CMP_BLUE_DARK}90 50%, ${CMP_BLUE_DARK}f0 100%)`,
          }}
        />

        {/* CMP Blue progress bar */}
        <motion.div
          className="absolute top-0 left-0 h-[3px] z-10"
          style={{
            width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
            background: `linear-gradient(to right, ${CMP_BLUE_DARK}, ${CMP_BLUE}, ${CMP_BLUE_LIGHT})`,
          }}
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
          <span className="text-[9px] tracking-[0.4em] uppercase text-blue-300/50">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8"
            style={{ background: `linear-gradient(to bottom, ${CMP_BLUE_LIGHT}, transparent)` }}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   PROCESS SECTION — blue accents
   ══════════════════════════════════════ */
function ProcessSection({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const steps = useMemo(() => [
    {
      title:    locale === 'en' ? 'Material Selection' : 'Pemilihan Material',
      subtitle: locale === 'en' ? 'The right foundation for every build.'           : 'Fondasi yang tepat untuk setiap produksi.',
      image:    'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1800&q=80',
    },
    {
      title:    locale === 'en' ? 'Precision Machining' : 'Proses Presisi',
      subtitle: locale === 'en' ? 'Accuracy shaped through controlled execution.'   : 'Akurasi dibentuk melalui eksekusi yang terkontrol.',
      image:    'https://images.unsplash.com/photo-1581091870627-3a7b6c1c7b9c?w=1800&q=80',
    },
    {
      title:    locale === 'en' ? 'Quality Control' : 'Kontrol Kualitas',
      subtitle: locale === 'en' ? 'Every detail checked. Every standard respected.' : 'Setiap detail diperiksa. Setiap standar dijaga.',
      image:    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800&q=80',
    },
    {
      title:    locale === 'en' ? 'Delivery' : 'Pengiriman',
      subtitle: locale === 'en' ? 'Reliable completion from factory to client.'     : 'Penyelesaian yang andal dari pabrik ke klien.',
      image:    'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1800&q=80',
    },
  ], [locale]);

  const segments = steps.map((_, i) => {
    const seg = 1 / steps.length;
    const s   = i * seg;
    const mid = s + seg * 0.5;
    const e   = s + seg;
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

        {/* Blue-tinted overlays */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `${CMP_BLUE_DARK}80` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, ${CMP_BLUE_DARK}cc 100%)`,
          }}
        />

        {/* Section label */}
        <div className="absolute top-8 sm:top-10 inset-x-0 text-center pointer-events-none">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.45em] text-blue-300/70 font-bold">
            {locale === 'en' ? 'Our Process' : 'Proses Kami'}
          </p>
          {/* CMP Blue underline accent */}
          <div className="mt-2 mx-auto w-8 h-[2px] rounded-full" style={{ backgroundColor: CMP_BLUE }} />
        </div>

        {/* Step indicators (desktop) */}
        <div className="absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-4">
          {steps.map((_, i) => (
            <motion.div key={i} style={{ opacity: segments[i].opacity }} className="text-right">
              <span className="text-[10px] font-bold tracking-widest text-blue-200/50 block mb-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <motion.div
                className="h-px ml-auto"
                style={{
                  backgroundColor: CMP_BLUE_LIGHT,
                  width: useTransform(segments[i].opacity, [0, 1], ['8px', '28px']),
                }}
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
              <p className="mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-[0.4em] text-blue-300/80 font-bold">
                Step {String(i + 1).padStart(2, '0')}
              </p>
              <h2 className="text-[2.2rem] sm:text-5xl lg:text-7xl font-black text-white
                             leading-[1.02] tracking-tight">
                {step.title}
              </h2>
              {/* Blue accent rule under title */}
              <div
                className="mx-auto my-5 h-[3px] w-12 rounded-full"
                style={{ backgroundColor: CMP_BLUE_LIGHT }}
              />
              <p className="text-sm sm:text-lg lg:text-xl text-blue-100/70 max-w-xl mx-auto leading-relaxed">
                {step.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dot indicators — blue tinted */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full"
              style={{
                backgroundColor: CMP_BLUE_LIGHT,
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
    <section className="relative bg-white overflow-hidden border-t border-blue-100">
      {/* CMP blue top accent */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: CMP_BLUE }} />
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
