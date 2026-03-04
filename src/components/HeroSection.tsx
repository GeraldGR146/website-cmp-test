interface HeroSectionProps {
  title: string;
  subtitle?: string;
  cta?: string;
  onCtaClick?: () => void;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: 'dark' | 'blue';
  size?: 'full' | 'medium' | 'small';
}
export function HeroSection({
  title,
  subtitle,
  cta,
  onCtaClick,
  backgroundImage,
  backgroundVideo,
  overlay = 'blue',
  size = 'full',
}: HeroSectionProps) {
  const heightClass = size === 'full' ? 'min-h-[85vh]' : size === 'medium' ? 'min-h-[50vh]' : 'min-h-[35vh]';

  return (
    <section className={`relative ${heightClass} flex items-center justify-center overflow-hidden`}>
      {/* Background */}
      {backgroundVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover scale-105"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : backgroundImage ? (
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ animation: 'heroZoomOut 20s ease-out forwards' }}
          loading="eager"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2A59] via-[#0d3470] to-[#0B2A59]" />
      )}

      {/* Overlay */}
      <div className={`absolute inset-0 ${
        overlay === 'blue'
          ? 'bg-gradient-to-b from-[#0B2A59]/80 via-[#0B2A59]/70 to-[#0B2A59]/90'
          : 'bg-black/50'
      }`} />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {cta && onCtaClick && (
          <button
            onClick={onCtaClick}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-[#0B2A59] shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {cta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        )}
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
