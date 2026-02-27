interface HeroSectionProps {
  title: string;
  subtitle?: string;
  cta?: string;
  onCtaClick?: () => void;
  backgroundImage?: string;
  backgroundVideo?: string; // ✅ added
  overlay?: 'dark' | 'blue';
  size?: 'full' | 'medium' | 'small';
}

export function HeroSection({
  title,
  subtitle,
  cta,
  onCtaClick,
  backgroundImage,
  backgroundVideo, // ✅ added
  overlay = 'blue',
  size = 'full',
}: HeroSectionProps) {
  const heightClass =
    size === 'full'
      ? 'min-h-[85vh]'
      : size === 'medium'
      ? 'min-h-[50vh]'
      : 'min-h-[35vh]';

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
      <div
        className={`absolute inset-0 ${
          overlay === 'blue'
            ? 'bg-gradient-to-b from-[#0B2A59]/80 via-[#0B2A59]/70 to-[#0B2A59]/90'
            : 'bg-black/50'
        }`}
      />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Floating particles */}
      {size === 'full' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                bottom: '10%',
                animation: `floatParticle ${6 + i * 2}s ease-in-out ${i * 0.8}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 text-center">
        <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="hero-subtitle mt-6 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {cta && onCtaClick && (
          <button
            onClick={onCtaClick}
            className="hero-cta mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-[#0B2A59] shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
          >
            {cta}
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />

      {/* Scroll indicator */}
      {size === 'full' && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hero-scroll-indicator z-10">
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
            <div
              className="w-1.5 h-3 bg-white/60 rounded-full"
              style={{
                animation: 'heroScrollDot 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes heroZoomOut {
          from { transform: scale(1.15); }
          to { transform: scale(1); }
        }
        @keyframes heroScrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}