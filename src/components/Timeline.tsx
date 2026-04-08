import { useLocale } from '@/i18n/LocaleContext';
import type { TimelineEvent } from '@/types';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface TimelineProps {
  events: TimelineEvent[];
}

/* ─── icon paths per milestone ─── */
const ICON_PATHS = [
  'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
  'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m14 0h2M3 15h2m14 0h2M7 7h10v10H7V7z',
];

const ACCENTS = [
  { from: 'from-indigo-600', to: 'to-indigo-800', ring: 'ring-indigo-600/30', text: 'text-indigo-600', border: 'border-indigo-600/20', glow: 'rgba(79,70,229,0.45)' },
  { from: 'from-violet-600', to: 'to-violet-800', ring: 'ring-violet-600/30', text: 'text-violet-600', border: 'border-violet-600/20', glow: 'rgba(124,58,237,0.45)' },
  { from: 'from-sky-600',    to: 'to-sky-800',    ring: 'ring-sky-600/30',    text: 'text-sky-600',    border: 'border-sky-600/20',    glow: 'rgba(2,132,199,0.45)'   },
];

/* ══════════════════════════════════════
    MAGNETIC CURSOR DOT
══════════════════════════════════════ */
function MagneticDot({ year, accent }: { year: string | number; accent: typeof ACCENTS[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy }}
      className="relative z-20 cursor-default select-none"
    >
      <span className={`absolute inset-0 -m-3 rounded-full bg-gradient-to-br ${accent.from} ${accent.to} opacity-20 animate-timeline-ping`} />
      <span className={`absolute inset-0 -m-1.5 rounded-full border ${accent.border} opacity-60`} />
      <div
        className={`relative w-[68px] h-[68px] rounded-full bg-gradient-to-br ${accent.from} ${accent.to}
          flex items-center justify-center border-[4px] border-white
          shadow-[0_0_0_2px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.18)]
          ring-2 ${accent.ring} transition-shadow duration-500
          hover:shadow-[0_0_24px_6px_var(--glow)]`}
        style={{ '--glow': accent.glow } as React.CSSProperties}
      >
        <span className="text-[11px] font-black text-white tracking-widest drop-shadow-sm">
          {year}
        </span>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
    SINGLE TIMELINE CARD
══════════════════════════════════════ */
function TimelineItem({
  event,
  index,
  globalVisible,
}: {
  event: TimelineEvent;
  index: number;
  globalVisible: boolean;
}) {
  const { locale } = useLocale();
  const isEven = index % 2 === 0;
  const accent = ACCENTS[index % ACCENTS.length];
  const iconPath = ICON_PATHS[index % ICON_PATHS.length];

  const itemRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShow(true); obs.disconnect(); } },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const revealed = globalVisible && show;
  const delay = index * 0.08;

  const CardContent = (
    <>
      <div className={`flex items-center gap-3 mb-5 ${isEven ? 'lg:justify-end' : 'justify-start'}`}>
        <motion.div
          whileHover={{ rotate: 8, scale: 1.12 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className={`relative shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br ${accent.from} ${accent.to}
            flex items-center justify-center shadow-lg ${isEven ? 'lg:order-2' : ''}`}
        >
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent" />
          <svg className="relative w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconPath} />
          </svg>
        </motion.div>

        <div className={isEven ? 'lg:text-right' : ''}>
          <span className={`block text-[10px] font-bold tracking-[0.35em] uppercase ${accent.text} opacity-60`}>
            {event.year}
          </span>
          <h3 className="text-[1.05rem] font-extrabold text-gray-900 leading-snug group-hover/card:text-current transition-colors duration-300">
            {event.title[locale]}
          </h3>
        </div>
      </div>

      <p className={`text-sm text-gray-500 leading-relaxed ${isEven ? 'lg:text-right' : ''}`}>
        {event.description[locale]}
      </p>

      <motion.div
        className={`absolute bottom-0 ${isEven ? 'lg:right-0 right-0 rounded-br-3xl rounded-bl-3xl lg:rounded-bl-none' : 'left-0 rounded-bl-3xl rounded-br-3xl lg:rounded-br-none'}
          h-[3px] bg-gradient-to-r ${accent.from} ${accent.to}`}
        initial={{ width: '0%' }}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );

  return (
    <div
      ref={itemRef}
      className={`group/item relative flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
    >
      <div className={`hidden lg:block lg:w-[calc(50%-48px)] ${isEven ? 'pr-8' : 'pl-8'}`}>
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          initial={{ opacity: 0, x: isEven ? 40 : -40, y: 12 }}
          animate={revealed ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
          className={`group/card relative overflow-hidden rounded-3xl p-7
            bg-white/80 backdrop-blur-xl
            border border-white/70
            shadow-[0_2px_24px_rgba(0,0,0,0.06)]
            hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)]
            hover:-translate-y-2 transition-all duration-500`}
        >
          <span className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/30 blur-2xl" />
          {CardContent}
        </motion.div>
      </div>

      <div className="absolute left-4 lg:static lg:w-24 lg:flex lg:justify-center z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={revealed ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.55, delay, type: 'spring', stiffness: 200 }}
        >
          <MagneticDot year={event.year} accent={accent} />
        </motion.div>
      </div>

      <motion.div
        className="lg:hidden pl-20 w-full"
        initial={{ opacity: 0, y: 24 }}
        animate={revealed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative overflow-hidden rounded-2xl bg-white/85 backdrop-blur-lg border border-white/60 p-5
            shadow-[0_2px_16px_rgba(0,0,0,0.07)]"
        >
          {CardContent}
        </div>
      </motion.div>

      <div className="hidden lg:block lg:w-[calc(50%-48px)]" />
    </div>
  );
}

/* ══════════════════════════════════════
    SCROLL-DRIVEN VERTICAL TRACK
══════════════════════════════════════ */
// FIX: Changed RefObject type to allow null to match component implementation
function VerticalTrack({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    // FIX: Assert the ref as non-null to satisfy Framer Motion internal types
    target: containerRef as React.RefObject<HTMLDivElement>,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const glowOpacity = useTransform(scaleY, [0, 0.3, 1], [0, 1, 0.6]);

  return (
    <div className="absolute left-[31px] lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-[3px] overflow-visible">
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-200/40 via-gray-300/60 to-gray-200/40" />
      <motion.div
        className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-indigo-500 via-violet-600 to-sky-500 origin-top"
        style={{ scaleY, height: '100%' }}
      >
        <motion.span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white"
          style={{
            opacity: glowOpacity,
            boxShadow: '0 0 0 3px white, 0 0 16px 4px rgba(99,102,241,0.7)',
          }}
        />
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════
    FLOATING AMBIENT PARTICLES
══════════════════════════════════════ */
function Particles({ count = 20 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left:     `${Math.random() * 100}%`,
        top:      `${Math.random() * 100}%`,
        size:     2 + Math.random() * 3,
        delay:    Math.random() * 8,
        duration: 5 + Math.random() * 7,
        opacity:  0.06 + Math.random() * 0.1,
        color:    ['bg-indigo-500', 'bg-violet-500', 'bg-sky-500'][i % 3],
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full ${p.color} animate-timeline-float`}
          style={{
            left:               p.left,
            top:                p.top,
            width:              p.size,
            height:             p.size,
            opacity:            p.opacity,
            animationDelay:    `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════
    SECTION HEADER
══════════════════════════════════════ */
function TimelineHeader({ locale }: { locale: string }) {
  return (
    <motion.div
      className="text-center mb-20 lg:mb-28"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="text-xs uppercase tracking-[0.45em] text-indigo-600/70 mb-4 font-semibold">
        ✦ {locale === 'en' ? 'Our Journey' : 'Perjalanan Kami'}
      </p>

      <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
        {locale === 'en' ? (
          <>
            Decades of{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 bg-clip-text text-transparent">
                Precision
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                <path d="M0 6 Q25 1 50 5 Q75 9 100 5 Q125 1 150 5 Q175 9 200 5" stroke="url(#sq)" strokeWidth="2.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="sq" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366f1" />
                    <stop offset="0.5" stopColor="#7c3aed" />
                    <stop offset="1"   stopColor="#0ea5e9" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </>
        ) : (
          <>
            Dekade{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 bg-clip-text text-transparent">
              Presisi
            </span>
          </>
        )}
      </h2>

      <p className="mt-6 text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
        {locale === 'en'
          ? 'Every milestone is a testament to craftsmanship, innovation, and an unwavering commitment to quality.'
          : 'Setiap tonggak pencapaian adalah bukti keahlian, inovasi, dan komitmen teguh terhadap kualitas.'}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════
    ROOT EXPORT
══════════════════════════════════════ */
export function Timeline({ events }: TimelineProps) {
  const { locale } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setIsVisible(true),
      { threshold: 0.01 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(99,102,241,0.06) 0%, transparent 70%)' }}
      />

      <Particles />

      <div className="relative max-w-[1100px] mx-auto px-6">
        <TimelineHeader locale={locale} />

        <div ref={containerRef} className="relative">
          <VerticalTrack containerRef={containerRef} />

          <div className="space-y-16 lg:space-y-24">
            {events.map((event, i) => (
              <TimelineItem key={i} event={event} index={i} globalVisible={isVisible} />
            ))}
          </div>

          <motion.div
            className="absolute left-[21px] lg:left-1/2 lg:-translate-x-1/2 -bottom-3 z-20
              w-5 h-5 rounded-full bg-gradient-to-br from-indigo-600 to-sky-500
              border-[3px] border-white shadow-lg ring-2 ring-indigo-600/20"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: events.length * 0.1 + 0.5, type: 'spring', stiffness: 180 }}
          />
        </div>
      </div>

      <style>{`
        @keyframes timeline-float {
          0%,100% { transform:translateY(0) scale(1); }
          50%      { transform:translateY(-16px) scale(1.25); opacity:0.04; }
        }
        .animate-timeline-float { animation:timeline-float var(--dur,6s) ease-in-out infinite; }

        @keyframes timeline-ping {
          0%  { transform:scale(1);   opacity:0.45; }
          80% { transform:scale(1.9); opacity:0;    }
          100%{ transform:scale(1.9); opacity:0;    }
        }
        .animate-timeline-ping { animation:timeline-ping 2.8s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>
    </section>
  );
}