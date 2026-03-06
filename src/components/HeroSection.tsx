interface HeroSectionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  cta?: string;
  secondaryCta?: string;
  onCtaClick?: () => void;
  onSecondaryClick?: () => void;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: 'dark' | 'blue';
  size?: 'full' | 'medium' | 'small';
}

export function HeroSection({
  title,
  subtitle,
  badge,
  cta,
  secondaryCta,
  onCtaClick,
  onSecondaryClick,
  backgroundImage,
  backgroundVideo,
  overlay = 'blue',
  size = 'full',
}: HeroSectionProps) {

  const heightClass =
    size === 'full'
      ? 'min-h-[90vh]'
      : size === 'medium'
      ? 'min-h-[60vh]'
      : 'min-h-[45vh]';

  return (
    <section className={`relative ${heightClass} flex items-center justify-center overflow-hidden`}>

      {/* BACKGROUND */}
      {backgroundVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover scale-105"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : backgroundImage ? (
        <img
          src={backgroundImage}
          className="absolute inset-0 w-full h-full object-cover scale-105"
          loading="eager"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2A59] via-[#0f3d82] to-[#071a36]" />
      )}

      {/* OVERLAY */}
      <div
        className={`absolute inset-0 ${
          overlay === 'blue'
            ? 'bg-gradient-to-b from-[#0B2A59]/85 via-[#0B2A59]/70 to-[#0B2A59]/95'
            : 'bg-black/60'
        }`}
      />

      {/* GRID PATTERN */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      {/* GLOW GRADIENT ACCENT */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-500/20 blur-[160px] rounded-full" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center">

        {/* BADGE */}
        {badge && (
          <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-5 py-2 text-sm text-blue-100 shadow-lg">
            {badge}
          </div>
        )}

        {/* HEADLINE */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          {title}
        </h1>

        {/* SUBTITLE */}
        {subtitle && (
          <p className="mt-6 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* CTA BUTTONS */}
        {(cta || secondaryCta) && (
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

            {cta && (
              <button
                onClick={onCtaClick}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-[#0B2A59] shadow-lg hover:shadow-2xl hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                {cta}

                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            )}

            {secondaryCta && (
              <button
                onClick={onSecondaryClick}
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/5 backdrop-blur-md px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                {secondaryCta}
              </button>
            )}

          </div>
        )}

      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
        </svg>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent" />

    </section>
  );
}