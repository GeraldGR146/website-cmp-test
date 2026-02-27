import { useEffect, useRef, useState } from 'react';
import { useLocale } from '@/i18n/LocaleContext';
import type { TimelineEvent } from '@/types';

interface TimelineProps {
  events: TimelineEvent[];
}

function TimelineItem({ event, index, isVisible }: { event: TimelineEvent; index: number; isVisible: boolean }) {
  const { locale } = useLocale();
  const isEven = index % 2 === 0;

  // Icons for each milestone
  const icons = [
    // Founded - building
    <path key="0" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
    // Contract - document
    <path key="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    // ISO - badge/shield
    <path key="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    // Factory expansion - cog
    <path key="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
    // Export - globe
    <path key="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    // Industry 4.0 - chip
    <path key="5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m14 0h2M3 15h2m14 0h2M7 7h10v10H7V7z" />,
  ];

  return (
    <div className={`relative flex items-start gap-0 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      {/* Card side */}
      <div className={`hidden lg:block lg:w-[calc(50%-32px)] ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
        <div
          className={`${isEven ? 'timeline-card' : 'timeline-card-right'} ${isVisible ? 'anim-visible' : ''} 
            bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500 
            hover:-translate-y-1 group cursor-default`}
          style={{ transitionDelay: `${index * 200 + 300}ms` }}
        >
          <div className={`flex items-center gap-3 mb-3 ${isEven ? 'justify-end' : 'justify-start'}`}>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B2A59] to-[#1e5aad] flex items-center justify-center
              shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 ${isEven ? 'order-2' : ''}`}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {icons[index] || icons[0]}
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0B2A59] transition-colors">
              {event.title[locale]}
            </h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {event.description[locale]}
          </p>
        </div>
      </div>

      {/* Center dot & year */}
      <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 flex flex-col items-center z-20">
        <div
          className={`timeline-dot ${isVisible ? 'anim-visible' : ''} relative`}
          style={{ transitionDelay: `${index * 200 + 100}ms` }}
        >
          {/* Outer glow ring */}
          <div className="absolute inset-0 w-16 h-16 -m-4 rounded-full bg-[#0B2A59]/5 group-hover:bg-[#0B2A59]/10 transition-colors" />
          {/* Year badge */}
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#0B2A59] to-[#1e5aad] flex items-center justify-center shadow-lg
            border-4 border-white ring-2 ring-[#0B2A59]/20 hover:ring-[#0B2A59]/40 hover:scale-110 transition-all duration-300">
            <span className="text-xs font-bold text-white tracking-wider">{event.year}</span>
          </div>
        </div>
      </div>

      {/* Mobile card (visible on small screens) */}
      <div className="lg:hidden pl-24 w-full">
        <div
          className={`timeline-card ${isVisible ? 'anim-visible' : ''} 
            bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition-all duration-500 group`}
          style={{ transitionDelay: `${index * 200 + 300}ms` }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0B2A59] to-[#1e5aad] flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {icons[index] || icons[0]}
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#0B2A59] uppercase tracking-wider">{event.year}</span>
              <h3 className="text-sm font-bold text-gray-900">{event.title[locale]}</h3>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {event.description[locale]}
          </p>
        </div>
      </div>

      {/* Empty side for desktop */}
      <div className="hidden lg:block lg:w-[calc(50%-32px)]" />
    </div>
  );
}

export function Timeline({ events }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Animate the vertical line based on scroll position within the timeline
  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const elTop = rect.top;
      const elH = rect.height;

      // Progress: 0 when top of timeline hits bottom of viewport, 1 when bottom of timeline passes middle
      const progress = Math.max(0, Math.min(1, (windowH - elTop) / (elH + windowH * 0.3)));
      setLineProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <div ref={containerRef} className="relative py-4">
      {/* Vertical line - desktop center, mobile left */}
      <div className="absolute left-[31px] lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-[3px] bg-gray-100 rounded-full overflow-hidden">
        <div
          className="w-full bg-gradient-to-b from-[#0B2A59] via-[#1e5aad] to-[#0B2A59] rounded-full transition-none"
          style={{ height: `${lineProgress * 100}%` }}
        />
      </div>

      {/* Events */}
      <div className="space-y-12 lg:space-y-16">
        {events.map((event, index) => (
          <TimelineItem
            key={index}
            event={event}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>

      {/* End dot */}
      <div className="absolute left-[23px] lg:left-1/2 lg:-translate-x-1/2 bottom-0">
        <div className={`w-4 h-4 rounded-full bg-gradient-to-br from-[#0B2A59] to-[#1e5aad] border-2 border-white shadow-md
          timeline-dot ${isVisible ? 'anim-visible' : ''}`}
          style={{ transitionDelay: `${events.length * 200 + 400}ms` }}
        />
      </div>
    </div>
  );
}
