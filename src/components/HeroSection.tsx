import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  overlay?: "dark" | "blue";
  size?: "full" | "medium" | "small";
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
  size = "full",
}: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const heightClass =
    size === "full"
      ? "h-screen min-h-[700px]"
      : size === "medium"
      ? "h-[70vh] min-h-[500px]"
      : "h-[50vh] min-h-[360px]";

  const titleWords = title.split(" ");

  return (
    <section
      ref={containerRef}
      className={`relative ${heightClass} w-full overflow-hidden`}
    >
      {/* ── BACKGROUND: full bleed, no flat overlay ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        {backgroundVideo ? (
          <>
            <video
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${
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
            {!videoLoaded && backgroundImage && (
              <img
                src={backgroundImage}
                className="absolute inset-0 w-full h-full object-cover"
                alt=""
              />
            )}
          </>
        ) : backgroundImage ? (
          <img
            src={backgroundImage}
            onLoad={() => setImageLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            alt=""
          />
        ) : (
          <div className="absolute inset-0 bg-[#071a36]" />
        )}
      </motion.div>

      {/* ── SELECTIVE SCRIMS — not a blanket overlay ── */}
      {/* Bottom: bleed into white page */}
      <div
        className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none z-[1]"
        style={{ background: "linear-gradient(to top, #ffffff 0%, transparent 100%)" }}
      />
      {/* Top-left corner darken so navbar/badge is readable */}
      <div
        className="absolute top-0 left-0 right-0 h-36 pointer-events-none z-[1]"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 100%)" }}
      />
      {/* Left edge dark wedge — gives headline readability on any image */}
      <div
        className="absolute inset-y-0 left-0 w-[65%] pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(4,15,35,0.72) 0%, rgba(4,15,35,0.35) 55%, transparent 100%)",
        }}
      />

      {/* ── CONTENT ── */}
      <motion.div
        style={{ y: contentY, opacity: heroOpacity }}
        className="relative z-10 h-full flex flex-col justify-end"
      >
        <div className="px-8 md:px-14 lg:px-20 pb-24 max-w-[1440px] mx-auto w-full">

          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 inline-flex items-center"
            >
              <div className="flex items-center gap-2 rounded-full bg-white/12 backdrop-blur-md border border-white/18 px-4 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-[10.5px] font-bold uppercase tracking-[0.24em] text-white/80">
                  {badge}
                </span>
              </div>
            </motion.div>
          )}

          {/* ── HEADLINE ── */}
          <h1
            className="font-black leading-[0.88] tracking-[-0.03em] text-white max-w-4xl"
            style={{
              fontSize: "clamp(3.2rem, 7.5vw, 7rem)",
              textShadow: "0 4px 48px rgba(0,0,0,0.22), 0 1px 4px rgba(0,0,0,0.3)",
            }}
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 64, skewY: 2 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{
                  duration: 1.05,
                  delay: 0.3 + i * 0.075,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.2em] last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* ── SUBTITLE + CTA ── */}
          <div className="mt-7 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-14">

            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="text-white/65 text-[1.05rem] leading-relaxed max-w-xs font-light"
                style={{ textShadow: "0 1px 16px rgba(0,0,0,0.5)" }}
              >
                {subtitle}
              </motion.p>
            )}

            {(cta || secondaryCta) && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 sm:ml-auto shrink-0"
              >
                {cta && (
                  <button
                    onClick={onCtaClick}
                    className="group relative overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#0B2A59] shadow-[0_8px_40px_rgba(0,0,0,0.28)] hover:shadow-[0_12px_56px_rgba(0,0,0,0.38)] hover:scale-[1.04] active:scale-[0.97] transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-2.5">
                      {cta}
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#0B2A59]/6 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                  </button>
                )}

                {secondaryCta && (
                  <button
                    onClick={onSecondaryClick}
                    className="
                        group relative overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold text-white
                        bg-white/10 backdrop-blur-md border border-white/25
                        shadow-[0_8px_32px_rgba(0,0,0,0.15)] 
                        hover:shadow-[0_12px_44px_rgba(0,0,0,0.25)] 
                        hover:scale-[1.04] hover:bg-white/20 hover:border-white/40
                        active:scale-[0.97] transition-all duration-300
                      "
                  >
                    {secondaryCta}
                  </button>
                )}
              </motion.div>
            )}
          </div>

        </div>
      </motion.div>
    </section>
  );
}