// AboutPage.tsx
import { stats, timeline } from '@/cms/about';
import { HeroSection } from '@/components/HeroSection';
import { Timeline } from '@/components/Timeline';
import { useCountUp } from '@/hooks/useScrollAnimation';
import { useLocale } from '@/i18n/LocaleContext';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/* ══════════════════════════════════════
   TYPES
══════════════════════════════════════ */
type Locale = 'en' | 'id';
interface LocalizedField { en: string; id: string; }

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
function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={`text-[10px] font-bold tracking-[0.35em] uppercase mb-6 block ${light ? 'text-blue-300/70' : 'text-zinc-500'}`}>
      {children}
    </span>
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
   STORY SECTION
══════════════════════════════════════ */
function StorySection({ locale, t }: { locale: Locale; t: any }) {
  const headline = locale === 'en'
    ? ['Capable.', 'Mastery.', 'Performance.']
    : ['Cermat.',  'Mahir.',   'Pasti.'];

  return (
    <section className="relative bg-white border-b border-zinc-100 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: CMP_BLUE }} />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{ backgroundImage: `radial-gradient(circle, #94a3b8 1px, transparent 1px)`, backgroundSize: '28px 28px' }}
      />
      <div className="w-full px-6 sm:px-10 lg:px-20 xl:px-28 py-24 lg:py-32 relative z-10">
        <motion.div {...fadeUp}>
          <SectionLabel>{locale === 'en' ? 'About Us' : 'Tentang Kami'}</SectionLabel>
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-24 items-start">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-zinc-900 leading-[1.05] tracking-tight mb-8">
                {headline.map((word, i) => (
                  <span key={i}><CMPWord>{word}</CMPWord>{i < 2 && <br />}</span>
                ))}
              </h2>
              <div className="w-16 h-[3px] rounded-full mb-8" style={{ backgroundColor: CMP_BLUE }} />
            </div>
            <div className="lg:border-l lg:border-blue-100 lg:pl-14 pt-2">
              <p className="text-lg sm:text-xl leading-relaxed font-medium text-zinc-700">{t.about.companyDesc}</p>
            </div>
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
      className="group relative p-8 lg:p-12 flex flex-col items-start border-l border-white/10 first:border-l-0"
    >
      <div className="flex items-baseline gap-1.5 mb-3">
        <span className="text-5xl lg:text-6xl font-black text-white tabular-nums leading-none tracking-tight">{count}</span>
        <span className="text-2xl lg:text-3xl font-bold text-blue-300/60 group-hover:text-blue-200 transition-colors">{suffix}</span>
      </div>
      <p className="text-sm lg:text-base font-medium text-blue-100/60 leading-snug group-hover:text-blue-100 transition-colors uppercase tracking-wide">
        {(stat.label as LocalizedField)[locale]}
      </p>
      <div className="absolute bottom-0 left-0 h-0.5 bg-white/40 w-0 group-hover:w-full transition-all duration-300" />
    </motion.div>
  );
}

function StatsSection({ locale }: { locale: Locale }) {
  return (
    <section
      className="relative overflow-hidden border-y border-blue-900/40"
      style={{ background: `linear-gradient(135deg, ${CMP_BLUE_DARK} 0%, ${CMP_BLUE} 60%, ${CMP_BLUE_LIGHT} 100%)` }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="absolute -right-40 -top-40 w-[700px] h-[700px] rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, white, transparent 70%)' }}
      />
      <div className="w-full px-6 sm:px-10 lg:px-20 xl:px-28 relative">
        <motion.div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10" {...staggerWrap}>
          {stats.map((stat, i) => <StatCard key={i} stat={stat} locale={locale} />)}
        </motion.div>
        <div className="py-6 flex justify-center lg:justify-end">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-2.5 rounded-lg backdrop-blur-sm shadow-xl">
            <img src="/ISO/ISO-9001.webp" alt="ISO 9001:2015 Certified" className="h-[36px] w-auto object-contain drop-shadow-md" />
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col">
              <span className="font-bold text-sm text-white leading-none tracking-wide">ISO 9001</span>
              <span className="font-mono text-[9px] text-blue-200/80 tracking-widest mt-1">2015 CERTIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   MISSION SECTION
══════════════════════════════════════ */
export function MissionSection({ locale, t }: { locale: Locale; t: any }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const panels = useMemo(() => [
    { title: locale === 'en' ? 'Quality'   : 'Kualitas',    text: t.about.mission1, image: 'https://images.unsplash.com/photo-1581093458791-9d42c52f2c77?w=900&q=80' },
    { title: locale === 'en' ? 'Teamwork'  : 'Kerja Sama',  text: t.about.mission2, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80' },
    { title: locale === 'en' ? 'Safety'    : 'Keselamatan', text: t.about.mission3, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80' },
    { title: locale === 'en' ? 'Integrity' : 'Integritas',  text: t.about.mission4, image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80' },
  ], [t, locale]);

  const missionStatement = locale === 'en'
    ? 'Building a trusted automotive and metal component manufacturing industry by delivering high-quality products and becoming a strategic partner for local and global industrial growth.'
    : 'Membangun industri komponen otomotif dan metal yang terpercaya dengan menghadirkan produk berkualitas tinggi serta menjadi mitra strategis bagi perkembangan industri lokal dan global.';

  return (
    <section className="relative overflow-hidden bg-slate-950">

      {/* ══════════ MOBILE ══════════ */}
      <div className="lg:hidden">

        {/* Hero intro card */}
        <div className="relative overflow-hidden min-h-[380px] flex flex-col justify-end">
          <img
            src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80"
            alt="Factory"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-transparent" />
          <div className="absolute top-5 left-5 w-4 h-4 border-t border-l border-blue-400/40" />
          <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-blue-400/40" />

          <div className="relative z-10 p-8 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <p className="font-mono text-[10px] tracking-[0.38em] text-blue-300/70 mb-4 uppercase">Core Values</p>
              <h2 className="text-5xl font-black text-white uppercase tracking-tight leading-[0.95] mb-5">
                {locale === 'en' ? <>Our<br />Mission</> : <>Misi<br />Kami</>}
              </h2>
              <div className="w-12 h-[2px] bg-blue-500 mb-6" />
              <p className="text-blue-100/75 text-sm leading-relaxed font-medium max-w-xs">{missionStatement}</p>
            </motion.div>
          </div>
        </div>

        {/* 2×2 Button Grid */}
        <div className="grid grid-cols-2 border-t border-white/5">
          {panels.map((panel, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative flex flex-col items-start px-5 py-5 text-left transition-all duration-300 border-b border-white/5
                ${i % 2 === 1 ? 'border-l border-white/5' : ''}
                ${activeIndex === i ? 'bg-blue-600/15' : 'bg-transparent hover:bg-white/5'}
              `}
            >
              {activeIndex === i && (
                <motion.div
                  layoutId="mission-btn-indicator"
                  className="absolute inset-0 border-b-2 border-blue-500 bg-blue-600/10"
                  transition={{ duration: 0.3, ease: EASE }}
                />
              )}
              <span className={`relative z-10 text-xs font-black uppercase tracking-[0.15em] transition-colors duration-300 ${activeIndex === i ? 'text-white' : 'text-white/50'}`}>
                {panel.title}
              </span>
            </button>
          ))}
        </div>

        {/* Active panel content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {/* Image strip */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={panels[activeIndex].image}
                alt={panels[activeIndex].title}
                className="w-full h-full object-cover scale-105"
              />
            </div>

            {/* Text */}
            <div className="px-7 py-7 border-b border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-9 bg-blue-500 rounded-full" />
                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                  {panels[activeIndex].title}
                </h3>
              </div>
              <p className="text-blue-100/75 text-[15px] leading-relaxed">{panels[activeIndex].text}</p>

              {/* Dot progress */}
              <div className="flex gap-2 mt-7">
                {panels.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`transition-all duration-300 rounded-full ${i === activeIndex ? 'w-8 h-1.5 bg-blue-500' : 'w-1.5 h-1.5 bg-white/20'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ══════════ DESKTOP ══════════ */}
      <div className="hidden lg:flex w-full min-h-[600px] h-[760px]">
        {/* Left label panel */}
        <div className="relative w-[25%] max-w-[420px] shrink-0 flex flex-col justify-between p-12 border-r border-white/10 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80" alt="Factory" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(2,6,23,0.55) 0%, rgba(15,23,42,0.45) 50%, rgba(2,6,23,0.75) 100%)' }} />
          <div className="relative z-10">
            <SectionLabel light>Core Values</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight leading-[1.05]">
              {locale === 'en' ? 'Our Mission' : 'Misi Kami'}
            </h2>
            <div className="w-12 h-[3px] mt-6 bg-blue-400 rounded-full" />
          </div>
          <div className="relative z-10">
            <p className="text-blue-100/90 text-base lg:text-lg leading-relaxed font-medium">{missionStatement}</p>
          </div>
        </div>

        {/* Expandable panels */}
        <div className="flex flex-1">
          {panels.map((panel, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                tabIndex={0}
                className={`group relative flex-1 overflow-hidden cursor-pointer border-l border-white/10 outline-none transition-all duration-700 focus-visible:ring-4 focus-visible:ring-blue-500 ${isActive ? 'grow-[2.5]' : 'grow-[1]'}`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                <img src={panel.image} alt={panel.title} className={`absolute inset-0 w-full h-full object-cover origin-center transition-transform duration-1000 ease-out ${isActive ? 'scale-105' : 'scale-100'}`} />
                <div className={`absolute inset-0 transition-colors duration-700 ${isActive ? 'bg-slate-900/20' : 'bg-slate-950/80'}`} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #020617 0%, transparent 70%)' }} />
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <span className={`font-mono text-xs font-bold tracking-widest transition-colors duration-500 ${isActive ? 'text-blue-300' : 'text-white/40'}`}>
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2 drop-shadow-md">{panel.title}</h3>
                    <div className={`overflow-hidden transition-all duration-700 ease-out border-l-2 pl-4 ${isActive ? 'max-h-[150px] opacity-100 translate-y-0 border-blue-500' : 'max-h-0 opacity-0 translate-y-4 border-transparent'}`}>
                      <p className="text-blue-50/80 text-sm leading-relaxed max-w-sm pt-2">{panel.text}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   VISION SECTION
══════════════════════════════════════ */
function VisionSection({ locale, t }: { locale: Locale; t: any }) {
  // Desktop scroll ref
  const desktopRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: desktopRef, offset: ['start start', 'end end'] });

  const visionBlocks = useMemo(() => [
    {
      number:  '01',
      image:   'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=80',
      eyebrow: locale === 'en' ? 'Industrial Philosophy' : 'Filosofi Industri',
      title:   locale === 'en'
        ? (<>Manufacturing<br />is not about <span className="text-blue-400">speed</span>.</>)
        : (<>Manufaktur<br />bukan soal <span className="text-blue-400">kecepatan</span>.</>),
      align: 'left' as const,
    },
    {
      number:  '02',
      image:   'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1400&q=80',
      eyebrow: locale === 'en' ? 'Quality Standard' : 'Standar Kualitas',
      title:   locale === 'en'
        ? (<>It is about<br />delivering <span className="text-blue-400">quality</span>.</>)
        : (<>Melainkan tentang<br />menghadirkan <span className="text-blue-400">kualitas</span>.</>),
      align: 'right' as const,
    },
    {
      number:      '03',
      image:       'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1400&q=80',
      eyebrow:     locale === 'en' ? 'Company Vision' : 'Visi Perusahaan',
      title:       <>{t.about.visionTitle}</>,
      description: t.about.visionDesc,
      align:       'left' as const,
    },
    {
      number:  '04',
      image:   'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=80',
      eyebrow: locale === 'en' ? 'Engineering Practice' : 'Praktik Rekayasa',
      title:   locale === 'en'
        ? (<>Engineering<br />practice <span className="text-blue-400">built to last.</span></>)
        : (<>Rekayasa<br />dirancang <span className="text-blue-400">untuk bertahan.</span></>),
      align: 'right' as const,
    },
  ], [locale, t]);

  /* Desktop scroll-driven slides */
  const makeSlide = (inStart: number, visibleStart: number, visibleEnd: number, outEnd: number) => ({
    opacity: useTransform(scrollYProgress, [inStart, visibleStart, visibleEnd, outEnd], [0, 1, 1, 0]),
    scale:   useTransform(scrollYProgress, [inStart, visibleStart], [0.96, 1]),
    y:       useTransform(scrollYProgress, [inStart, visibleStart, outEnd], [50, 0, -40]),
  });

  const slides = [
    makeSlide(0.00, 0.08, 0.20, 0.32),
    makeSlide(0.24, 0.34, 0.46, 0.58),
    makeSlide(0.50, 0.60, 0.72, 0.84),
    makeSlide(0.76, 0.86, 0.96, 1.00),
  ];

  const navItems = visionBlocks.map((b, i) => ({
    label:    b.number,
    title:    (locale === 'en' ? ['Manufacturing', 'Quality', 'Vision', 'Engineering'] : ['Manufaktur', 'Kualitas', 'Visi', 'Rekayasa'])[i],
    progress: [0.08, 0.34, 0.62, 0.90][i],
  }));

  const scrollDesktopToProgress = (p: number) => {
    if (!desktopRef.current) return;
    const top  = desktopRef.current.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);
    const span = desktopRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * p, behavior: 'smooth' });
  };

  return (
    <>
      {/* ══════════ MOBILE — snap scroll ══════════ */}
      <div
        className="lg:hidden"
        style={{ height: '100svh', overflowY: 'scroll', scrollSnapType: 'y mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        {visionBlocks.map((block, i) => {
          const reverse = block.align === 'right';
          return (
            <div
              key={block.number}
              style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
              className="relative flex flex-col justify-end overflow-hidden"
              // each panel fills exactly the snap container
              // we use h-full to fill the 100svh container slot
              // but since the container scrolls, each child must also be 100svh
            >
              {/* give each slide full viewport height */}
              <div className="relative flex flex-col justify-end overflow-hidden" style={{ height: '100svh' }}>
                {/* Background */}
                <div className="absolute inset-0">
                  <img src={block.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-[#020617]/25" />
                <div className={`absolute inset-0 ${reverse ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#020617]/65 to-transparent`} />
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
                />
                {i === 0 && <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-transparent" />}

                {/* Corner markers */}
                <div className="absolute top-5 left-5 w-4 h-4 border-t border-l border-blue-400/35" />
                <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-blue-400/35" />
                <div className="absolute bottom-5 left-5 w-4 h-4 border-b border-l border-blue-400/35" />
                <div className="absolute bottom-5 right-5 w-4 h-4 border-b border-r border-blue-400/35" />

                {/* Ghost number */}
                <div className={`absolute top-12 ${reverse ? 'right-2' : 'left-2'} font-black text-[9rem] leading-none tracking-[-0.12em] text-white/[0.04] select-none pointer-events-none`}>
                  {block.number}
                </div>

                {/* Eyebrow */}
                <div className={`absolute top-12 ${reverse ? 'right-6 text-right' : 'left-6'}`}>
                  <p className="font-mono text-[10px] tracking-[0.38em] text-blue-300/60 uppercase">
                    {block.eyebrow}
                  </p>
                </div>

                {/* Slide index dots */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 flex gap-2">
                  {visionBlocks.map((_, di) => (
                    <div
                      key={di}
                      className={`rounded-full transition-all duration-300 ${di === i ? 'w-6 h-1.5 bg-blue-500' : 'w-1.5 h-1.5 bg-white/20'}`}
                    />
                  ))}
                </div>

                {/* Main content */}
                <div className={`relative z-10 px-6 pb-16 pt-28 ${reverse ? 'text-right' : 'text-left'}`}>
                  {block.number === '03' ? (
                    <div className="bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_80px_rgba(0,0,0,0.5)] relative overflow-hidden text-left">
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" />
                      <p className="font-mono text-[10px] tracking-[0.32em] text-blue-300/70 mb-4 uppercase">{block.eyebrow}</p>
                      <h2 className="text-3xl font-black text-white tracking-[-0.04em] leading-[0.95] mb-4">{block.title}</h2>
                      <div className="w-10 h-[2px] bg-blue-500 mb-4" />
                      <p className="text-blue-100/80 text-sm leading-relaxed font-medium">{block.description}</p>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-[3.4rem] leading-[0.85] tracking-[-0.07em] font-black uppercase text-white mb-6">
                        {block.title}
                      </h2>
                      <div className={`h-[2px] w-16 bg-blue-500 ${reverse ? 'ml-auto' : ''}`} />
                    </div>
                  )}
                </div>

                {/* Bottom divider */}
                <div className="absolute bottom-0 left-6 right-6 flex items-center gap-3 pb-1">
                  <div className="flex-1 h-px bg-white/8" />
                  <span className="font-mono text-[10px] tracking-[0.35em] text-blue-300/40">{block.number} / 0{visionBlocks.length}</span>
                  <div className="flex-1 h-px bg-white/8" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ══════════ DESKTOP — snap scroll ══════════ */}
      <section
        ref={desktopRef}
        className="hidden lg:block relative bg-slate-950"
        style={{ height: `${visionBlocks.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.img
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1800&q=80"
            alt=""
            style={{ scale: useTransform(scrollYProgress, [0, 1], [1, 1.08]) }}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(2,6,23,0.78) 0%, rgba(2,6,23,0.86) 50%, rgba(2,6,23,0.96) 100%)' }} />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          <div className="absolute top-8 left-8 w-5 h-5 border-t border-l border-blue-400/30" />
          <div className="absolute top-8 right-8 w-5 h-5 border-t border-r border-blue-400/30" />
          <div className="absolute bottom-8 left-8 w-5 h-5 border-b border-l border-blue-400/30" />
          <div className="absolute bottom-8 right-8 w-5 h-5 border-b border-r border-blue-400/30" />

          {/* Right nav */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-5">
            {navItems.map((item, i) => (
              <button
                key={i}
                onClick={() => scrollDesktopToProgress(item.progress)}
                className="group flex items-center gap-4 text-left transition-all duration-300 hover:-translate-x-1.5"
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute right-full mr-3 w-0 group-hover:w-8 h-px bg-blue-400 transition-all duration-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20 border border-white/40 group-hover:bg-blue-500 group-hover:border-blue-400 transition-all duration-300" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-[0.28em] text-white/35 group-hover:text-blue-300 transition-colors duration-300">{item.label}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-white/0 group-hover:text-white/70 transition-all duration-300">{item.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-20">
            <motion.div className="h-full bg-blue-500" style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }} />
          </div>

          {/* Slides */}
          <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-12">
            {slides.map(({ opacity, scale, y }, i) => {
              const block = visionBlocks[i];
              return (
                <motion.div
                  key={i}
                  style={{ opacity, scale, y }}
                  className="absolute will-change-transform w-full max-w-5xl px-8"
                >
                  {i === 2 ? (
                    <div className="max-w-3xl mx-auto bg-slate-950/80 backdrop-blur-xl p-8 sm:p-12 border border-white/10 rounded-[2rem] shadow-[0_20px_100px_rgba(0,0,0,0.5)] relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" />
                      <p className="font-mono text-[11px] tracking-[0.3em] text-blue-300/70 mb-6 uppercase">{block.eyebrow}</p>
                      <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 tracking-[-0.04em] leading-[0.95]">{block.title}</h2>
                      <p className="text-base sm:text-lg text-blue-100/80 leading-relaxed font-medium">{block.description}</p>
                    </div>
                  ) : (
                    <div className={`flex ${block.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                      <div className="px-8 sm:px-12 py-8 rounded-[2rem] bg-black/25 backdrop-blur-md border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.45)] max-w-3xl">
                        <p className="font-mono text-[11px] tracking-[0.3em] text-blue-300/70 mb-6 uppercase">{block.eyebrow}</p>
                        <h2 className="text-[2.3rem] sm:text-5xl lg:text-7xl font-black text-white leading-[0.92] tracking-[-0.04em]">{block.title}</h2>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════
   PROCESS SECTION
══════════════════════════════════════ */
function ProcessSection({ locale }: { locale: Locale }) {
  const desktopRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: desktopRef, offset: ['start start', 'end end'] });

  const steps = useMemo(() => [
    {
      number:   '01',
      title:    locale === 'en' ? 'Material Sourcing'      : 'Sumber Material',
      subtitle: locale === 'en'
        ? 'Premium-grade metals selected for consistency, durability, and industrial reliability.'
        : 'Logam premium yang dipilih untuk konsistensi, daya tahan, dan keandalan industri.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80',
      tag:   locale === 'en' ? 'Raw Input'       : 'Bahan Baku',
    },
    {
      number:   '02',
      title:    locale === 'en' ? 'Stamping & Fabrication' : 'Stamping & Fabrikasi',
      subtitle: locale === 'en'
        ? 'Precision forming, welding, and fabrication executed with engineering accuracy.'
        : 'Pembentukan presisi, pengelasan, dan fabrikasi dengan akurasi engineering.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80',
      tag:   locale === 'en' ? 'Forming'         : 'Pembentukan',
    },
    {
      number:   '03',
      title:    locale === 'en' ? 'Rigorous Inspection'    : 'Inspeksi Ketat',
      subtitle: locale === 'en'
        ? 'Every component is verified for structural integrity and dimensional tolerance.'
        : 'Setiap komponen diverifikasi untuk integritas struktural dan toleransi dimensi.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&q=80',
      tag:   locale === 'en' ? 'Quality Control' : 'Kontrol Kualitas',
    },
    {
      number:   '04',
      title:    locale === 'en' ? 'Project Completion'     : 'Penyelesaian Proyek',
      subtitle: locale === 'en'
        ? 'Finished components delivered with consistency, readiness, and manufacturing confidence.'
        : 'Komponen selesai dikirim dengan konsistensi, kesiapan, dan kualitas manufaktur.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80',
      tag:   locale === 'en' ? 'Delivery'        : 'Pengiriman',
    },
  ], [locale]);

  const seg = 1 / steps.length;
  const segments = steps.map((_, i) => {
    const start        = i * seg;
    const visibleStart = start + seg * 0.12;
    const visibleEnd   = start + seg * 0.62;
    const end          = start + seg;
    return {
      opacity: useTransform(scrollYProgress, [start, visibleStart, visibleEnd, end], [0, 1, 1, 0]),
      scale:   useTransform(scrollYProgress, [start, end], [1, 1.06]),
      y:       useTransform(scrollYProgress, [start, visibleStart, end], [60, 0, -50]),
    };
  });

  const scrollDesktopToStep = (p: number) => {
    if (!desktopRef.current) return;
    const top  = desktopRef.current.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);
    const span = desktopRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * p, behavior: 'smooth' });
  };

  return (
    <>
      {/* ══════════ MOBILE — snap scroll ══════════ */}
      <div
        className="lg:hidden"
        style={{ height: '100svh', overflowY: 'scroll', scrollSnapType: 'y mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        {/* Header slide */}
        <div style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', height: '100svh' }} className="relative flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[#020617]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.12),transparent_65%)]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`,
              backgroundSize: '36px 36px',
            }}
          />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-transparent" />
          <div className="absolute top-5 left-5 w-4 h-4 border-t border-l border-blue-400/35" />
          <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-blue-400/35" />
          <div className="absolute bottom-5 left-5 w-4 h-4 border-b border-l border-blue-400/35" />
          <div className="absolute bottom-5 right-5 w-4 h-4 border-b border-r border-blue-400/35" />

          <div className="relative z-10 px-8">
            <p className="font-mono text-[10px] tracking-[0.4em] text-blue-300/65 uppercase mb-6">
              {locale === 'en' ? 'Engineering Workflow' : 'Alur Rekayasa'}
            </p>
            <h2 className="text-[3.8rem] leading-[0.82] tracking-[-0.09em] font-black uppercase text-white">
              {locale === 'en'
                ? (<>Precision<br />manufacturing<br /><span className="text-blue-400">system.</span></>)
                : (<>Sistem<br />manufaktur<br /><span className="text-blue-400">presisi.</span></>)
              }
            </h2>
            <div className="mt-7 w-20 h-[2px] bg-blue-500" />
            {/* Step pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {steps.map((step) => (
                <div key={step.number} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-blue-300/60">{step.number}</span>
                  <span className="text-[11px] text-white/50 uppercase tracking-[0.15em]">{step.tag}</span>
                </div>
              ))}
            </div>
            {/* Scroll cue */}
            <div className="mt-12 flex items-center gap-3">
              <div className="flex flex-col gap-1">
                <div className="w-5 h-px bg-blue-500/60" />
                <div className="w-3 h-px bg-blue-500/30" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                {locale === 'en' ? 'Scroll to explore' : 'Gulir untuk jelajahi'}
              </p>
            </div>
          </div>
        </div>

        {/* Step slides */}
        {steps.map((step, i) => (
          <div
            key={step.number}
            style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', height: '100svh' }}
            className="relative flex flex-col justify-end overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0">
              <img src={step.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/75 to-[#020617]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/80 to-[#020617]/20" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />

            {/* Corner markers */}
            <div className="absolute top-5 left-5 w-4 h-4 border-t border-l border-blue-400/30" />
            <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-blue-400/30" />
            <div className="absolute bottom-5 left-5 w-4 h-4 border-b border-l border-blue-400/30" />
            <div className="absolute bottom-5 right-5 w-4 h-4 border-b border-r border-blue-400/30" />

            {/* Ghost number */}
            <div className="absolute bottom-8 right-2 font-black text-[7rem] leading-none tracking-[-0.1em] text-white/[0.04] select-none pointer-events-none">
              {step.number}
            </div>

            {/* Slide dots */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {steps.map((_, di) => (
                <div
                  key={di}
                  className={`rounded-full transition-all duration-300 ${di === i ? 'w-6 h-1.5 bg-blue-500' : 'w-1.5 h-1.5 bg-white/20'}`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 px-6 pb-14 pt-24">
              {/* Stage badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm mb-6">
                <span className="font-mono text-[10px] tracking-[0.28em] text-blue-300">{step.number}</span>
                <div className="w-5 h-px bg-blue-500/60" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                  {locale === 'en' ? 'Production Stage' : 'Tahapan Produksi'}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-[2.8rem] leading-[0.88] tracking-[-0.06em] font-black text-white uppercase mb-5">
                {step.title}
              </h2>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-[2px] w-12 bg-blue-500 rounded-full" />
                <div className="h-[2px] flex-1 bg-white/8 rounded-full" />
              </div>

              {/* Subtitle */}
              <p className="text-blue-100/75 text-[15px] leading-relaxed max-w-sm">{step.subtitle}</p>

              {/* Meta row */}
              <div className="mt-7 flex items-center gap-5">
                <div>
                  <p className="font-mono text-[8px] tracking-[0.28em] text-white/25 uppercase">Status</p>
                  <p className="mt-1 text-[11px] text-white/65 font-medium">{locale === 'en' ? 'Active' : 'Aktif'}</p>
                </div>
                <div className="w-px h-7 bg-white/10" />
                <div>
                  <p className="font-mono text-[8px] tracking-[0.28em] text-white/25 uppercase">Tolerance</p>
                  <p className="mt-1 text-[11px] text-white/65 font-medium">{locale === 'en' ? 'Verified' : 'Terverifikasi'}</p>
                </div>
                <div className="w-px h-7 bg-white/10" />
                <div>
                  <p className="font-mono text-[8px] tracking-[0.28em] text-white/25 uppercase">Stage</p>
                  <p className="mt-1 text-[11px] font-mono text-blue-300/80">{step.number}/{steps.length}</p>
                </div>
              </div>
            </div>

            {/* Bottom rule */}
            <div className="relative z-10 px-6 pb-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/8" />
              <span className="font-mono text-[9px] tracking-[0.35em] text-blue-300/35">{step.number} / 0{steps.length}</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
          </div>
        ))}
      </div>

      {/* ══════════ DESKTOP — sticky scroll ══════════ */}
      <section
        id="process"
        ref={desktopRef}
        className="hidden lg:block relative bg-slate-950"
        style={{ height: `${steps.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {steps.map((step, i) => (
            <motion.img
              key={i}
              src={step.image}
              alt=""
              style={{ opacity: segments[i].opacity, scale: segments[i].scale }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ))}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(2,6,23,0.72) 0%, rgba(2,6,23,0.84) 55%, rgba(2,6,23,0.96) 100%)' }} />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          <div className="absolute top-8 left-8 w-5 h-5 border-t border-l border-blue-400/30" />
          <div className="absolute top-8 right-8 w-5 h-5 border-t border-r border-blue-400/30" />
          <div className="absolute bottom-8 left-8 w-5 h-5 border-b border-l border-blue-400/30" />
          <div className="absolute bottom-8 right-8 w-5 h-5 border-b border-r border-blue-400/30" />

          {/* Left progress rail */}
          <div className="absolute left-8 top-0 bottom-0 flex items-center z-20">
            <div className="relative w-px h-[70vh] bg-white/10">
              <motion.div className="absolute top-0 left-0 w-full bg-blue-500" style={{ height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }} />
            </div>
          </div>

          {/* Heading */}
          <div className="absolute top-8 sm:top-10 inset-x-0 text-center z-20">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.45em] text-blue-300/80 font-bold">
              {locale === 'en' ? 'Manufacturing Process' : 'Proses Manufaktur'}
            </p>
            <div className="mt-3 mx-auto w-10 h-[2px] rounded-full bg-blue-500" />
          </div>

          {/* Right nav */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-5">
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => scrollDesktopToStep((i + 0.15) / steps.length)}
                className="group flex items-center gap-4 text-left transition-all duration-300 hover:-translate-x-1.5"
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute right-full mr-3 w-0 group-hover:w-8 h-px bg-blue-400 transition-all duration-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20 border border-white/40 group-hover:bg-blue-500 group-hover:border-blue-400 transition-all duration-300" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-[0.28em] text-white/35 group-hover:text-blue-300 transition-colors duration-300">{step.number}</span>
                  <span className="text-xs uppercase tracking-[0.16em] text-white/0 group-hover:text-white/70 transition-all duration-300">{step.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Content slides */}
          <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-12 lg:px-24 z-20">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                style={{ opacity: segments[i].opacity, y: segments[i].y }}
                className="absolute w-full max-w-6xl"
              >
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-md mb-8">
                    <span className="font-mono text-xs tracking-[0.3em] text-blue-300">{step.number}</span>
                    <div className="w-8 h-px bg-blue-500" />
                    <span className="text-xs uppercase tracking-[0.18em] text-white/60">
                      {locale === 'en' ? 'Production Stage' : 'Tahapan Produksi'}
                    </span>
                  </div>
                  <div className="rounded-[2rem] border border-white/10 bg-black/20 backdrop-blur-lg p-8 sm:p-12 shadow-[0_20px_100px_rgba(0,0,0,0.45)]">
                    <h2 className="text-[2.5rem] sm:text-5xl lg:text-7xl font-black text-white leading-[0.92] tracking-[-0.05em]">{step.title}</h2>
                    <div className="my-8 h-[3px] w-16 rounded-full bg-blue-500" />
                    <p className="text-base sm:text-lg lg:text-xl text-blue-100/75 leading-relaxed max-w-2xl">{step.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-30">
            <motion.div className="h-full bg-blue-500" style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }} />
          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════
   TIMELINE SECTION
══════════════════════════════════════ */
function TimelineSection() {
  return (
    <section className="relative bg-zinc-50 overflow-hidden border-t border-zinc-200">
      <Timeline events={timeline} />
    </section>
  );
}

/* ══════════════════════════════════════
   PAGE ROOT
══════════════════════════════════════ */
export function AboutPage() {
  const { locale, t } = useLocale();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id    = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <div className="bg-slate-950 selection:bg-blue-500/30">
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
