import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useLocale } from '@/i18n/LocaleContext';
import type { TimelineEvent } from '@/types';

interface TimelineProps {
  events: TimelineEvent[];
}

/* ─── icon paths per milestone ─── */
const ICON_PATHS = [
  // Founded – building
  'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  // Contract – document
  'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  // ISO – shield
  'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  // Factory – cog
  'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
  // Export – globe
  'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  // Industry 4.0 – chip
  'M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m14 0h2M3 15h2m14 0h2M7 7h10v10H7V7z',
];

/* ─── floating particles behind the line ─── */
function Particles({ count = 24 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 6,
        opacity: 0.08 + Math.random() * 0.15,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-[#0B2A59] animate-timeline-float"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── single timeline node ─── */
function TimelineItem({
  event,
  index,
  isVisible,
  total,
}: {
  event: TimelineEvent;
  index: number;
  isVisible: boolean;
  total: number;
}) {
  const { locale } = useLocale();
  const isEven = index % 2 === 0;
  const itemRef = useRef<HTMLDivElement>(null);
  const [itemVisible, setItemVisible] = useState(false);

  /* per‑item intersection observer for staggered reveal */
  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setItemVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -60px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const show = isVisible && itemVisible;
  const iconPath = ICON_PATHS[index % ICON_PATHS.length];

  /* connector arrow classes */
  const arrowBase =
    'hidden lg:block absolute top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-white border border-gray-100 z-10';

  return (
    <div
      ref={itemRef}
      className={`group/item relative flex items-center gap-0 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
    >
      {/* ── CARD (desktop) ── */}
      <div className={`hidden lg:block lg:w-[calc(50%-40px)] ${isEven ? 'text-right pr-6' : 'text-left pl-6'}`}>
        <div
          className={`relative bg-white/80 backdrop-blur-lg rounded-3xl border border-white/60 p-7
            shadow-[0_4px_30px_rgba(11,42,89,0.06)] hover:shadow-[0_8px_50px_rgba(11,42,89,0.14)]
            transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
            hover:-translate-y-1.5
            ${show ? 'opacity-100 translate-x-0' : isEven ? 'opacity-0 translate-x-12' : 'opacity-0 -translate-x-12'}`}
          style={{ transitionDelay: show ? '0.15s' : '0s' }}
        >
          {/* tiny arrow pointing toward the centre line */}
          <span
            className={`${arrowBase} ${isEven ? '-right-[7px] border-t-0 border-l-0' : '-left-[7px] border-b-0 border-r-0'}`}
          />

          <div className={`flex items-center gap-4 mb-4 ${isEven ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`relative shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0B2A59] to-[#1e5aad]
                flex items-center justify-center shadow-lg
                group-hover/item:shadow-[#0B2A59]/30 group-hover/item:scale-110
                transition-all duration-500 ${isEven ? 'order-2' : ''}`}
            >
              {/* subtle inner shimmer */}
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent" />
              <svg className="relative w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconPath} />
              </svg>
            </div>
            <div className={isEven ? 'text-right' : ''}>
              <span className="block text-[11px] font-semibold tracking-widest text-[#0B2A59]/50 uppercase">
                {event.year}
              </span>
              <h3 className="text-lg font-extrabold text-gray-900 leading-snug group-hover/item:text-[#0B2A59] transition-colors duration-300">
                {event.title[locale]}
              </h3>
            </div>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">{event.description[locale]}</p>

          {/* decorative corner accent */}
          <span
            className={`pointer-events-none absolute bottom-0 ${isEven ? 'left-0 rounded-bl-3xl' : 'right-0 rounded-br-3xl'}
              w-20 h-1 bg-gradient-to-r from-[#0B2A59] to-[#1e5aad] opacity-0 group-hover/item:opacity-100
              transition-opacity duration-500`}
          />
        </div>
      </div>

      {/* ── CENTRE NODE ── */}
      <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 z-20 flex items-center justify-center">
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
            ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          style={{ transitionDelay: show ? '0s' : '0s' }}
        >
          {/* pulsing ring */}
          <span className="absolute inset-0 -m-2 rounded-full bg-[#0B2A59]/10 animate-timeline-ping" />
          {/* outer glow */}
          <span className="absolute inset-0 -m-1 rounded-full bg-[#0B2A59]/5" />
          {/* main badge */}
          <div
            className="relative w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#0B2A59] via-[#163f7e] to-[#1e5aad]
              flex items-center justify-center shadow-xl border-[5px] border-white
              ring-2 ring-[#0B2A59]/20 hover:ring-[#0B2A59]/50 hover:scale-110
              transition-all duration-500 cursor-default select-none"
          >
            <span className="text-[11px] font-black text-white tracking-widest drop-shadow">{event.year}</span>
          </div>
        </div>
      </div>

      {/* ── CARD (mobile) ── */}
      <div className="lg:hidden pl-24 w-full">
        <div
          className={`bg-white/80 backdrop-blur-lg rounded-2xl border border-white/60 p-5
            shadow-[0_2px_20px_rgba(11,42,89,0.06)] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
            ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: show ? '0.15s' : '0s' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-[#0B2A59] to-[#1e5aad] flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconPath} />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#0B2A59]/50 uppercase tracking-wider">{event.year}</span>
              <h3 className="text-sm font-bold text-gray-900">{event.title[locale]}</h3>
            </div>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">{event.description[locale]}</p>
        </div>
      </div>

      {/* spacer for opposite side */}
      <div className="hidden lg:block lg:w-[calc(50%-40px)]" />
    </div>
  );
}

/* ─── main timeline ─── */
export function Timeline({ events }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);

  /* reveal once */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.02 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* scroll‑driven line progress */
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { top, height } = el.getBoundingClientRect();
    const wh = window.innerHeight;
    setLineProgress(Math.max(0, Math.min(1, (wh - top) / (height + wh * 0.25))));
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isVisible, handleScroll]);

  return (
    <div ref={containerRef} className="relative py-8 lg:py-12">
      {/* ambient particles */}
      <Particles />

      {/* ── vertical track ── */}
      <div className="absolute left-[31px] lg:left-1/2 lg:-translate-x-[1.5px] top-0 bottom-0 w-[3px]">
        {/* background track */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-100 via-gray-200/60 to-gray-100" />
        {/* progress fill */}
        <div
          className="relative w-full rounded-full bg-gradient-to-b from-[#0B2A59] via-[#1e5aad] to-[#0B2A59] origin-top"
          style={{ height: `${lineProgress * 100}%`, transition: 'height 0.08s linear' }}
        >
          {/* glowing tip */}
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_3px_rgba(30,90,173,0.55)]" />
        </div>
      </div>

      {/* ── events ── */}
      <div className="space-y-14 lg:space-y-20">
        {events.map((event, i) => (
          <TimelineItem key={i} event={event} index={i} isVisible={isVisible} total={events.length} />
        ))}
      </div>

      {/* ── end cap ── */}
      <div className="absolute left-[21px] lg:left-1/2 lg:-translate-x-1/2 -bottom-2 z-20">
        <div
          className={`w-5 h-5 rounded-full bg-gradient-to-br from-[#0B2A59] to-[#1e5aad]
            border-[3px] border-white shadow-lg ring-2 ring-[#0B2A59]/20
            transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
          style={{ transitionDelay: `${events.length * 0.18 + 0.6}s` }}
        />
      </div>

      {/* ─── required keyframes (injected once via <style>) ─── */}
      <style>{`
        @keyframes timeline-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: var(--tw-opacity, 0.12); }
          50%      { transform: translateY(-18px) scale(1.3); opacity: calc(var(--tw-opacity, 0.12) * 0.5); }
        }
        .animate-timeline-float { animation: timeline-float var(--duration, 5s) ease-in-out infinite; }

        @keyframes timeline-ping {
          0%   { transform: scale(1);   opacity: 0.5; }
          75%  { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .animate-timeline-ping { animation: timeline-ping 2.5s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>
    </div>
  );
}