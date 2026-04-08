import { useState } from "react";

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
  size?: "large" | "medium" | "small";
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
  size = "large",
}: HeroSectionProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const heightClass =
    size === "large"
      ? "h-[640px]"
      : size === "medium"
      ? "h-[520px]"
      : "h-[420px]";

  return (
    <section className={`relative w-full ${heightClass} overflow-hidden`}>
      
      {/* 🔥 Background Layer (always visible immediately) */}
      <div className="absolute inset-0 w-full h-full bg-slate-900">

        {/* IMAGE (always rendered, no opacity 0) */}
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt=""
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* VIDEO (only fades in AFTER ready, never hides image first) */}
        {backgroundVideo && (
          <video
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoLoaded(true)}
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="max-w-2xl">

            {/* Badge */}
            {badge && (
              <div className="mb-4">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-white/70 border border-white/20 px-3 py-1 rounded-full">
                  {badge}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-white font-bold tracking-tight leading-tight text-3xl sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="mt-4 text-white/70 text-base leading-relaxed max-w-md">
                {subtitle}
              </p>
            )}

            {/* Actions */}
            {(cta || secondaryCta) && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {cta && (
                  <button
                    onClick={onCtaClick}
                    className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    {cta}
                  </button>
                )}

                {secondaryCta && (
                  <button
                    onClick={onSecondaryClick}
                    className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    {secondaryCta}
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}