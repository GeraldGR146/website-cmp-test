import { useLocale } from '@/i18n/LocaleContext';
import type { LocalizedField, TimelineEvent } from '@/types';
import { SmartImage } from '@/components/SmartImage';
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

/* ══════════════════════════════════════
   TYPES
   ═════════════════════════════════════ */
interface TimelineProps { events: TimelineEvent[] }
type IconRenderer = (cls: string) => React.ReactElement;

/* ══════════════════════════════════════
   HELPERS
   ═════════════════════════════════════ */
function loc(field: LocalizedField, locale: string): string {
  return field[locale as keyof LocalizedField] ?? field['en'] ?? '';
}

function getYouTubeId(url: string): string | null {
  return url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )?.[1] ?? null;
}

function getVimeoId(url: string): string | null {
  return url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1] ?? null;
}

function cloudinaryVideo(src: string): string {
  return src.includes('/upload/') ? src.replace('/upload/', '/upload/q_auto,f_auto/') : src;
}

function cloudinaryPoster(src: string): string {
  return src
    .replace('/upload/', '/upload/so_0,q_auto,f_auto/')
    .replace(/\.(mp4|webm|mov|avi)$/i, '.jpg');
}

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  return `${m}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
}

/* ══════════════════════════════════════
   VIEWPORT HOOK
   ═════════════════════════════════════ */
function useInView(
  ref: React.RefObject<Element | null>,
  options: IntersectionObserverInit = {},
) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px', ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, options]);
  return inView;
}

/* ══════════════════════════════════════
   ACCENT PALETTE
   ═════════════════════════════════════ */
const ACCENTS = [
  { name: 'indigo',   border: 'border-indigo-500/50',  glow: 'rgba(99,102,241,0.6)',  hex: '#818cf8', icon: 'from-indigo-400 to-violet-500',  line: 'rgba(129,140,248,0.7)' },
  { name: 'blue',     border: 'border-blue-500/50',    glow: 'rgba(59,130,246,0.6)',  hex: '#3b82f6', icon: 'from-blue-400 to-indigo-500',   line: 'rgba(59,130,246,0.7)'  },
  { name: 'cyan',     border: 'border-cyan-500/50',    glow: 'rgba(34,211,238,0.6)',  hex: '#22d3ee', icon: 'from-cyan-400 to-sky-600',       line: 'rgba(34,211,238,0.7)'  },
  { name: 'blue-dark', border: 'border-blue-600/50',   glow: 'rgba(29,78,216,0.6)',  hex: '#1d4ed8', icon: 'from-blue-500 to-blue-700',     line: 'rgba(29,78,216,0.7)'   },
  { name: 'violet',   border: 'border-violet-500/50',  glow: 'rgba(167,139,250,0.6)', hex: '#a78bfa', icon: 'from-violet-400 to-purple-600',  line: 'rgba(167,139,250,0.7)' },
] as const;

type Accent = (typeof ACCENTS)[number];

/* ══════════════════════════════════════
   ICONS
   ═════════════════════════════════════ */
const ICONS: IconRenderer[] = [
  (cls) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3 21h18M3 10h18M3 6l9-3 9 3M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3" />
    </svg>
  ),
  (cls) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  (cls) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  (cls) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
    </svg>
  ),
  (cls) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
];

/* ══════════════════════════════════════
   SHARED SVG ICONS
   ═════════════════════════════════════ */
const IcoMuted = ({ cls }: { cls: string }) => (
  <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0017.73 18L19 19.27 20.27 18 5.27 3 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);

const IcoUnmuted = ({ cls }: { cls: string }) => (
  <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

const IcoPlay = ({ cls }: { cls: string }) => (
  <svg className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
);

const IcoPause = ({ cls }: { cls: string }) => (
  <svg className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
);

const IcoExpand = ({ cls }: { cls: string }) => (
  <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
  </svg>
);

const IcoClose = ({ cls }: { cls: string }) => (
  <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const IcoRewind = ({ cls }: { cls: string }) => (
  <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
    <text x="12" y="15" textAnchor="middle" fontSize="5.5" fill="white" fontWeight="bold">10</text>
  </svg>
);

const IcoForward = ({ cls }: { cls: string }) => (
  <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" />
    <text x="12" y="15" textAnchor="middle" fontSize="5.5" fill="white" fontWeight="bold">10</text>
  </svg>
);

/* ══════════════════════════════════════
   SHARED: PAUSE OVERLAY
   ═════════════════════════════════════ */
function PauseOverlay({ paused, glow }: { paused: boolean; glow: string }) {
  return (
    <AnimatePresence>
      {paused && (
        <motion.div
          key="po"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <span
            className="flex items-center justify-center w-12 h-12 rounded-full
                       bg-black/65 backdrop-blur-md border border-white/20"
            style={{ boxShadow: `0 0 28px 6px ${glow}` }}
          >
            <IcoPlay cls="w-5 h-5 text-white ml-0.5" />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════
   SHARED: ICON BUTTON
   ═════════════════════════════════════ */
function IconBtn({
  onClick,
  label,
  className = '',
  children,
}: {
  onClick: (e: React.MouseEvent) => void;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`flex items-center justify-center rounded-full transition-colors focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
}

/* ══════════════════════════════════════
   MEDIA PLACEHOLDER
   ═════════════════════════════════════ */
function MediaPlaceholder({
  accent,
  iconFallback,
  label,
}: {
  accent: Accent;
  iconFallback: IconRenderer;
  label: string;
}) {
  return (
    <div className="mx-3.5 rounded-xl overflow-hidden aspect-video shrink-0 relative">
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${accent.glow}12, transparent 70%), #0c0c14`,
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right,#fff 1px,transparent 1px),' +
              'linear-gradient(to bottom,#fff 1px,transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <span className="relative z-10" style={{ opacity: 0.18 }}>
          {iconFallback('w-12 h-12 text-white')}
        </span>
        <span
          className="relative z-10 text-[10px] font-semibold tracking-[0.2em] uppercase"
          style={{ color: accent.hex, opacity: 0.35 }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MEDIA IMAGE
   Delegates to SmartImage — auto-detects
   portrait / landscape / square
   ═════════════════════════════════════ */
function MediaImage({
  src,
  accent,
  label,
  iconFallback,
}: {
  src: string;
  accent: Accent;
  hov: boolean;
  label: string;
  iconFallback: IconRenderer;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return <MediaPlaceholder accent={accent} iconFallback={iconFallback} label={label} />;
  }

  return (
    <SmartImage
      src={src}
      alt={label}
      className="mx-3.5"
      aspectRatio="aspect-video"
      rounded="rounded-xl"
      glowColor={accent.glow}
      onError={() => setErrored(true)}
    />
  );
}

/* ══════════════════════════════════════
   NATIVE VIDEO PLAYER
   Cloudinary / Local — autoplay · muted
   loop · IntersectionObserver · fullscreen
   ═════════════════════════════════════ */
function NativeVideoPlayer({
  src,
  poster,
  accent,
  hov,
  label,
  onError,
  fallbackImage,
  iconFallback,
}: {
  src: string;
  poster?: string;
  accent: Accent;
  hov: boolean;
  label: string;
  onError?: () => void;
  fallbackImage?: string;
  iconFallback: IconRenderer;
}) {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const fsVideoRef  = useRef<HTMLVideoElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hideTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [muted,        setMuted]        = useState(true);
  const [paused,       setPaused]       = useState(false);
  const [visible,      setVisible]      = useState(false);
  const [loaded,       setLoaded]       = useState(false);
  const [videoErrored, setVideoErrored] = useState(false);
  const [fullscreen,   setFullscreen]   = useState(false);
  const [fsPaused,     setFsPaused]     = useState(false);
  const [fsMuted,      setFsMuted]      = useState(false);
  const [fsProgress,   setFsProgress]   = useState(0);
  const [fsDuration,   setFsDuration]   = useState(0);
  const [fsCurrentT,   setFsCurrentT]   = useState(0);
  const [fsVolume,     setFsVolume]     = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [scrubbing,    setScrubbing]    = useState(false);

  /* ── IntersectionObserver ── */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Inline autoplay / pause ── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    visible && !paused && !fullscreen ? v.play().catch(() => {}) : v.pause();
  }, [visible, paused, fullscreen]);

  /* ── Sync inline muted ── */
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = muted;
  }, [muted]);

  /* ── Fullscreen video sync ── */
  useEffect(() => {
    const v = fsVideoRef.current;
    if (!v || !fullscreen) return;
    const inline = videoRef.current;
    if (inline) v.currentTime = inline.currentTime;
    v.muted  = fsMuted;
    v.volume = fsVolume;
    v.play().catch(() => {});
    setFsPaused(false);

    const onTime = () => {
      setFsCurrentT(v.currentTime);
      setFsProgress(v.duration ? v.currentTime / v.duration : 0);
    };
    const onMeta = () => setFsDuration(v.duration);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onMeta);
    if (v.duration) setFsDuration(v.duration);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('loadedmetadata', onMeta);
    };
  }, [fullscreen]);

  /* ── Auto-hide controls ── */
  const resetHide = () => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 3000);
  };
  useEffect(() => {
    if (fullscreen) resetHide();
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [fullscreen]);

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = fullscreen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [fullscreen]);

  /* ── Keyboard shortcuts ── */
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      const v = fsVideoRef.current;
      if (!v) return;
      resetHide();
      switch (e.key) {
        case ' ': case 'k': e.preventDefault(); toggleFsPlay(); break;
        case 'ArrowRight': v.currentTime = Math.min(v.currentTime + 10, v.duration); break;
        case 'ArrowLeft':  v.currentTime = Math.max(v.currentTime - 10, 0); break;
        case 'ArrowUp':
          e.preventDefault();
          setFsVolume(vol => { const n = Math.min(vol + 0.1, 1); v.volume = n; return n; });
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFsVolume(vol => { const n = Math.max(vol - 0.1, 0); v.volume = n; return n; });
          break;
        case 'm': setFsMuted(m => { v.muted = !m; return !m; }); break;
        case 'Escape': setFullscreen(false); break;
        case 'f': toggleNativeFs(); break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fullscreen]);

  const toggleInlinePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.paused ? (v.play().catch(() => {}), setPaused(false)) : (v.pause(), setPaused(true));
  };

  const toggleFsPlay = () => {
    const v = fsVideoRef.current;
    if (!v) return;
    v.paused ? (v.play().catch(() => {}), setFsPaused(false)) : (v.pause(), setFsPaused(true));
  };

  const seekTo = (ratio: number) => {
    const v = fsVideoRef.current;
    if (!v || !v.duration) return;
    v.currentTime = ratio * v.duration;
    setFsProgress(ratio);
  };

  const handleProgressPointer = (e: React.MouseEvent<HTMLDivElement>, force = false) => {
    if (!force && !scrubbing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    seekTo(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
  };

  const toggleNativeFs = () => {
    const el = fsVideoRef.current;
    if (!el) return;
    document.fullscreenElement
      ? document.exitFullscreen().catch(() => {})
      : el.requestFullscreen().catch(() => {});
  };

  const handleVideoError = () => {
    setVideoErrored(true);
    onError?.();
  };

  /* ── Fallback chain ── */
  if (videoErrored) {
    return fallbackImage
      ? <MediaImage src={fallbackImage} accent={accent} hov={hov} label={label} iconFallback={iconFallback} />
      : <MediaPlaceholder accent={accent} iconFallback={iconFallback} label={label} />;
  }

  return (
    <>
      {/* ── Inline player ── */}
      <div
        ref={wrapRef}
        onClick={toggleInlinePlay}
        className="mx-3.5 rounded-xl overflow-hidden aspect-video shrink-0
                   relative bg-black cursor-pointer select-none"
        aria-label={label}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted loop playsInline
          preload="metadata"
          onCanPlay={() => setLoaded(true)}
          onError={handleVideoError}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* loading shimmer */}
        <AnimatePresence>
          {!loaded && (
            <motion.div
              key="shimmer"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-10 bg-slate-900"
              style={{
                backgroundImage:
                  'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.04) 50%,transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.6s infinite',
              }}
            />
          )}
        </AnimatePresence>

        {/* out-of-view dimmer */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none z-[5]"
          animate={{ opacity: visible ? 0 : 0.55 }}
          transition={{ duration: 0.6 }}
        />

        {/* hover tint */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[6]"
          animate={{ opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{ background: `linear-gradient(135deg,${accent.glow}18,transparent 60%)` }}
        />

        {/* pause overlay */}
        <div className="absolute inset-0 z-[7] pointer-events-none">
          <PauseOverlay paused={paused} glow={accent.glow} />
        </div>

        {/* inline control bar */}
        <motion.div
          className="absolute bottom-0 inset-x-0 z-[8] flex items-center gap-2 px-2.5 pb-2.5 pt-8"
          animate={{ opacity: hov ? 1 : 0, y: hov ? 0 : 6 }}
          transition={{ duration: 0.22 }}
          style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.7),transparent)' }}
          onClick={e => e.stopPropagation()}
        >
          <IconBtn
            onClick={() => setMuted(m => !m)}
            label={muted ? 'Unmute' : 'Mute'}
            className="w-7 h-7 bg-black/60 backdrop-blur-md border border-white/15 hover:border-white/50"
          >
            {muted
              ? <IcoMuted cls="w-3 h-3 text-white/80" />
              : <IcoUnmuted cls="w-3 h-3 text-white/80" />}
          </IconBtn>

          <IconBtn
            onClick={() => setFullscreen(true)}
            label="Open fullscreen"
            className="ml-auto w-7 h-7 bg-black/60 backdrop-blur-md border border-white/15 hover:border-white/50"
          >
            <IcoExpand cls="w-3 h-3 text-white/80" />
          </IconBtn>
        </motion.div>
      </div>

      {/* ── Fullscreen modal ── */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            key="fs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
            onMouseMove={resetHide}
            onClick={resetHide}
          >
            <video
              ref={fsVideoRef}
              src={src}
              poster={poster}
              loop playsInline
              className="w-full h-full object-contain"
            />

            <motion.div
              className="absolute inset-0 flex flex-col justify-between pointer-events-none"
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* top bar */}
              <div
                className="pointer-events-auto flex items-center justify-between px-5 pt-4 pb-10"
                style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.8),transparent)' }}
              >
                <p className="text-white font-semibold text-sm tracking-wide truncate pr-4">
                  {label}
                </p>
                <IconBtn
                  onClick={() => setFullscreen(false)}
                  label="Close"
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 shrink-0"
                >
                  <IcoClose cls="w-4 h-4 text-white" />
                </IconBtn>
              </div>

              {/* bottom controls */}
              <div
                className="pointer-events-auto px-5 pb-6 pt-12 flex flex-col gap-3"
                style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.88),transparent)' }}
              >
                {/* progress bar */}
                <div
                  ref={progressRef}
                  className="relative h-1.5 rounded-full bg-white/20 cursor-pointer group/bar"
                  onClick={e => handleProgressPointer(e, true)}
                  onMouseDown={() => setScrubbing(true)}
                  onMouseMove={e => handleProgressPointer(e)}
                  onMouseUp={() => setScrubbing(false)}
                  onMouseLeave={() => setScrubbing(false)}
                >
                  <div className="absolute inset-0 rounded-full bg-white/10" />
                  <div
                    className="absolute left-0 top-0 h-full rounded-full transition-none"
                    style={{
                      width: `${fsProgress * 100}%`,
                      background: `linear-gradient(to right,${accent.hex},${accent.hex}bb)`,
                    }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4
                               rounded-full bg-white opacity-0 group-hover/bar:opacity-100
                               transition-opacity shadow-lg"
                    style={{ left: `${fsProgress * 100}%`, boxShadow: `0 0 10px 2px ${accent.glow}` }}
                  />
                </div>

                {/* controls row */}
                <div className="flex items-center gap-2">
                  <IconBtn
                    onClick={() => { const v = fsVideoRef.current; if (v) v.currentTime = Math.max(0, v.currentTime - 10); }}
                    label="Rewind 10s"
                    className="w-9 h-9 hover:bg-white/10"
                  >
                    <IcoRewind cls="w-5 h-5 text-white" />
                  </IconBtn>

                  <IconBtn
                    onClick={toggleFsPlay}
                    label={fsPaused ? 'Play' : 'Pause'}
                    className="w-11 h-11 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20"
                  >
                    {fsPaused
                      ? <IcoPlay cls="w-5 h-5 text-white ml-0.5" />
                      : <IcoPause cls="w-5 h-5 text-white" />}
                  </IconBtn>

                  <IconBtn
                    onClick={() => { const v = fsVideoRef.current; if (v) v.currentTime = Math.min(v.duration, v.currentTime + 10); }}
                    label="Forward 10s"
                    className="w-9 h-9 hover:bg-white/10"
                  >
                    <IcoForward cls="w-5 h-5 text-white" />
                  </IconBtn>

                  <span className="text-white/60 text-xs tabular-nums ml-1 shrink-0">
                    {fmtTime(fsCurrentT)} / {fmtTime(fsDuration)}
                  </span>

                  <div className="flex-1" />

                  {/* volume */}
                  <div className="flex items-center gap-2">
                    <IconBtn
                      onClick={() => setFsMuted(m => {
                        const next = !m;
                        if (fsVideoRef.current) fsVideoRef.current.muted = next;
                        return next;
                      })}
                      label={fsMuted ? 'Unmute' : 'Mute'}
                      className="w-8 h-8 hover:bg-white/10"
                    >
                      {fsMuted || fsVolume === 0
                        ? <IcoMuted cls="w-4 h-4 text-white/80" />
                        : <IcoUnmuted cls="w-4 h-4 text-white/80" />}
                    </IconBtn>

                    <div
                      className="w-20 h-1.5 rounded-full bg-white/20 cursor-pointer relative group/vol"
                      onClick={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const vol = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                        setFsVolume(vol);
                        if (fsVideoRef.current) {
                          fsVideoRef.current.volume = vol;
                          fsVideoRef.current.muted  = vol === 0;
                        }
                        if (vol > 0) setFsMuted(false);
                      }}
                    >
                      <div
                        className="absolute left-0 top-0 h-full rounded-full bg-white/80"
                        style={{ width: `${(fsMuted ? 0 : fsVolume) * 100}%` }}
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3
                                   rounded-full bg-white opacity-0 group-hover/vol:opacity-100 transition-opacity"
                        style={{ left: `${(fsMuted ? 0 : fsVolume) * 100}%` }}
                      />
                    </div>
                  </div>

                  <IconBtn
                    onClick={toggleNativeFs}
                    label="Toggle native fullscreen"
                    className="w-8 h-8 hover:bg-white/10"
                  >
                    <IcoExpand cls="w-4 h-4 text-white/80" />
                  </IconBtn>
                </div>

                <p className="text-white/20 text-[10px] text-center tracking-widest uppercase select-none">
                  Space · ← → seek · ↑↓ volume · M mute · F fullscreen · Esc close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ══════════════════════════════════════
   EMBED PLAYER  (YouTube / Vimeo)
   ═════════════════════════════════════ */
function EmbedPlayer({
  type,
  src,
  poster,
  accent,
  hov,
  label,
  fallbackImage,
  iconFallback,
}: {
  type: 'youtube' | 'vimeo';
  src: string;
  poster?: string;
  accent: Accent;
  hov: boolean;
  label: string;
  fallbackImage?: string;
  iconFallback: IconRenderer;
}) {
  const [playing, setPlaying] = useState(false);

  const ytId     = type === 'youtube' ? getYouTubeId(src) : null;
  const vmId     = type === 'vimeo'   ? getVimeoId(src)   : null;
  const id       = ytId ?? vmId;
  const embedSrc = ytId
    ? `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`
    : vmId
    ? `https://player.vimeo.com/video/${vmId}?autoplay=1&title=0&byline=0&portrait=0`
    : null;
  const thumbSrc = poster ?? (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : undefined);

  if (!id || !embedSrc) {
    return fallbackImage
      ? <MediaImage src={fallbackImage} accent={accent} hov={hov} label={label} iconFallback={iconFallback} />
      : <MediaPlaceholder accent={accent} iconFallback={iconFallback} label={label} />;
  }

  return (
    <div className="mx-3.5 rounded-xl overflow-hidden aspect-video shrink-0 relative bg-black">
      <AnimatePresence mode="wait">
        {!playing ? (
          <motion.button
            key="thumb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full group/play"
            aria-label={`Play ${label}`}
          >
            {thumbSrc ? (
              <motion.img
                src={thumbSrc}
                alt={label}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ scale: hov ? 1.04 : 1 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              />
            ) : (
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#1a1a2e,#0f0f1a)' }} />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <motion.div
              className="absolute inset-0"
              animate={{ opacity: hov ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              style={{ background: `radial-gradient(ellipse at 50% 60%,${accent.glow}35,transparent 68%)` }}
            />

            <span className="absolute inset-0 flex items-center justify-center">
              <motion.span
                animate={{
                  scale: hov ? 1.08 : 1,
                  boxShadow: hov
                    ? `0 0 0 8px ${accent.glow}25, 0 0 40px 10px ${accent.glow}`
                    : `0 0 0 0px ${accent.glow}00`,
                }}
                transition={{ duration: 0.35 }}
                className="flex items-center justify-center w-14 h-14 rounded-full
                           border-2 border-white/80 bg-black/55 backdrop-blur-sm"
              >
                <IcoPlay cls="w-6 h-6 text-white ml-1" />
              </motion.span>
            </span>

            <motion.span
              animate={{ opacity: hov ? 1 : 0, y: hov ? 0 : 4 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2
                         text-[10px] font-semibold tracking-[0.18em] uppercase text-white/55"
            >
              Tap to play
            </motion.span>
          </motion.button>
        ) : (
          <motion.iframe
            key="iframe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full"
            src={embedSrc}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════
   MEDIA BLOCK
   Fallback chain: Video → Image → Placeholder
   ═════════════════════════════════════ */
function MediaBlock({
  event,
  accent,
  hov,
  label,
  iconFallback,
}: {
  event: TimelineEvent;
  accent: Accent;
  hov: boolean;
  label: string;
  iconFallback: IconRenderer;
}) {
  const { video, image } = event;

  if (video?.type === 'youtube' || video?.type === 'vimeo') {
    return (
      <EmbedPlayer
        type={video.type}
        src={video.src}
        poster={video.poster}
        accent={accent}
        hov={hov}
        label={label}
        fallbackImage={image}
        iconFallback={iconFallback}
      />
    );
  }

  if (video?.type === 'cloudinary' || video?.type === 'local') {
    const resolvedSrc    = video.type === 'cloudinary' ? cloudinaryVideo(video.src) : video.src;
    const resolvedPoster = video.type === 'cloudinary'
      ? (video.poster ?? cloudinaryPoster(video.src))
      : video.poster;

    return (
      <NativeVideoPlayer
        src={resolvedSrc}
        poster={resolvedPoster}
        accent={accent}
        hov={hov}
        label={label}
        fallbackImage={image}
        iconFallback={iconFallback}
      />
    );
  }

  if (image) {
    return (
      <MediaImage
        src={image}
        accent={accent}
        hov={hov}
        label={label}
        iconFallback={iconFallback}
      />
    );
  }

  return <MediaPlaceholder accent={accent} iconFallback={iconFallback} label={label} />;
}

/* ══════════════════════════════════════
   VERTICAL TRACK
   ═════════════════════════════════════ */
function VerticalTrack({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef as React.RefObject<HTMLDivElement>,
    offset: ['start center', 'end center'],
  });
  const scaleY     = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const travelY    = useTransform(scaleY, [0, 1], ['0%', '100%']);
  const orbOpacity = useTransform(scaleY, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px overflow-visible pointer-events-none z-10">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom,transparent 0%,rgba(255,255,255,0.07) 8%,rgba(255,255,255,0.07) 92%,transparent 100%)' }}
      />
      <motion.div
        className="absolute top-0 left-0 w-full origin-top"
        style={{
          scaleY,
          height: '100%',
          background: 'linear-gradient(to bottom,#818cf8 0%,#a78bfa 50%,#22d3ee 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom,black 0%,black 88%,transparent 100%)',
          maskImage:       'linear-gradient(to bottom,black 0%,black 88%,transparent 100%)',
        }}
      >
        <motion.span
          className="absolute left-1/2 -translate-x-1/2 w-[3px] rounded-full"
          style={{
            top: travelY, opacity: orbOpacity, height: 88,
            background: 'linear-gradient(to bottom,transparent,rgba(255,255,255,0.9),transparent)',
            boxShadow: '0 0 18px 6px rgba(255,255,255,0.25)',
          }}
        />
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════
   TIMELINE NODE
   ═════════════════════════════════════ */
function TimelineNode({ accent, inView, isMobile = false }: {
  accent: Accent; inView: boolean; isMobile?: boolean;
}) {
  return (
    <motion.div
      className={`relative z-20 shrink-0 flex items-center ${isMobile ? 'mr-4' : ''}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
    >
      {!isMobile && <span className="w-5 h-px" style={{ background: accent.line }} />}
      <motion.span
        className={`${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'} rotate-45 border relative flex items-center justify-center`}
        style={{ borderColor: accent.hex }}
        animate={inView
          ? { boxShadow: [`0 0 0px 0px ${accent.glow}`,`0 0 22px 9px ${accent.glow}`,`0 0 0px 0px ${accent.glow}`] }
          : { boxShadow: 'none' }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="absolute inset-[2px]" style={{ background: accent.hex, opacity: 0.9 }} />
      </motion.span>
      {!isMobile && <span className="w-5 h-px" style={{ background: accent.line }} />}
    </motion.div>
  );
}

/* ══════════════════════════════════════
   EVENT CARD
   ═════════════════════════════════════ */
function EventCard({ event, index, accent, isEven, inView }: {
  event: TimelineEvent;
  index: number;
  accent: Accent;
  isEven: boolean;
  inView: boolean;
}) {
  const { locale } = useLocale();
  const [hov, setHov] = useState(false);
  const Icon = ICONS[index % ICONS.length];

  const hidden  = { opacity: 0, x: isEven ? 56 : -56, filter: 'blur(10px)', scale: 0.96 };
  const visible = { opacity: 1, x: 0,                 filter: 'blur(0px)',  scale: 1    };

  return (
    <motion.article
      initial={hidden}
      animate={inView ? visible : hidden}
      transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -5, scale: 1.008 }}
      className={`relative flex flex-col overflow-hidden rounded-2xl border ${accent.border}
                  backdrop-blur-xl transition-shadow duration-500 group`}
      style={{
        background: 'linear-gradient(155deg,rgba(26,26,42,0.97) 0%,rgba(12,12,20,0.99) 100%)',
        boxShadow: hov
          ? `0 32px 72px -16px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.10), 0 0 55px -12px ${accent.glow}`
          : `0 8px 32px -8px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)`,
      }}
    >
      {/* top shimmer */}
      <span
        className="pointer-events-none absolute top-0 inset-x-0 h-px z-20"
        style={{ background: `linear-gradient(to right,transparent 5%,${accent.hex}cc 50%,transparent 95%)` }}
      />
      {/* corner glow */}
      <span
        className="pointer-events-none absolute top-0 left-0 w-40 h-40 opacity-[0.15]"
        style={{ background: `radial-gradient(circle at 0% 0%,${accent.hex},transparent 68%)` }}
      />
      {/* hover bloom */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.45 }}
        style={{ background: `radial-gradient(ellipse at 50% -10%,${accent.glow}22,transparent 62%)` }}
      />
      {/* left spine */}
      <span
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
        style={{
          background: `linear-gradient(to bottom,transparent 0%,${accent.hex} 18%,${accent.hex} 82%,transparent 100%)`,
          boxShadow: `2px 0 14px 0 ${accent.glow}`,
        }}
      />

      {/* header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-2.5">
          <motion.span
            className="w-2 h-2 rounded-full shrink-0"
            animate={inView
              ? { boxShadow: [`0 0 0px 0px ${accent.glow}`,`0 0 10px 4px ${accent.glow}`,`0 0 0px 0px ${accent.glow}`] }
              : { boxShadow: 'none' }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            style={{ background: accent.hex }}
          />
          <span
            className="text-[11px] font-black tracking-[0.28em] uppercase tabular-nums"
            style={{ color: accent.hex }}
          >
            {event.year}
          </span>
        </div>
        <motion.span
          whileHover={{ rotate: 14, scale: 1.18 }}
          transition={{ type: 'spring', stiffness: 380, damping: 18 }}
          className={`relative flex items-center justify-center w-10 h-10 rounded-xl
                      bg-gradient-to-br ${accent.icon} shrink-0`}
          style={{ boxShadow: `0 6px 22px -4px ${accent.glow}` }}
        >
          <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent" />
          {Icon('relative w-[18px] h-[18px] text-white drop-shadow')}
        </motion.span>
      </div>

      {/* media */}
      <MediaBlock
        event={event}
        accent={accent}
        hov={hov}
        label={loc(event.title, locale)}
        iconFallback={Icon}
      />

      {/* text */}
      <div className="flex flex-col gap-2.5 px-5 pt-4 pb-5">
        <h3 className="text-[17px] font-bold text-white tracking-tight leading-snug">
          {loc(event.title, locale)}
        </h3>
        <p className="text-[13px] text-slate-300/90 leading-relaxed">
          {loc(event.description, locale)}
        </p>
      </div>

      {/* bottom line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-full"
        style={{ background: `linear-gradient(to right,${accent.hex},${accent.hex}44)` }}
        initial={{ width: '0%' }}
        animate={{ width: hov ? '100%' : '0%' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.article>
  );
}

/* ══════════════════════════════════════
   DESKTOP ITEM
   ═════════════════════════════════════ */
function TimelineItemDesktop({ event, index }: { event: TimelineEvent; index: number }) {
  const isEven  = index % 2 === 0;
  const accent  = ACCENTS[index % ACCENTS.length];
  const itemRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(itemRef, { threshold: 0.15 });

  return (
    <div ref={itemRef} className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`w-[calc(50%-24px)] ${isEven ? 'pr-8' : 'pl-8'}`}>
        <EventCard event={event} index={index} accent={accent} isEven={isEven} inView={inView} />
      </div>
      <div className="w-6 flex justify-center z-20 shrink-0">
        <TimelineNode accent={accent} inView={inView} />
      </div>
      <div className="w-[calc(50%-24px)]" />
    </div>
  );
}

/* ══════════════════════════════════════
   MOBILE ITEM
   ═════════════════════════════════════ */
function TimelineItemMobile({ event, index }: {
  event: TimelineEvent; index: number; isLast: boolean;
}) {
  const accent  = ACCENTS[index % ACCENTS.length];
  const itemRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(itemRef, { threshold: 0.15 });

  return (
    <div ref={itemRef} className="relative flex items-start pl-6">
      {/* vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-px flex flex-col items-center">
        <div className="w-px h-6 bg-white/10" />
        <div className="flex-1 w-px relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="absolute top-0 left-0 w-full"
            initial={{ height: '0%' }}
            animate={inView ? { height: '100%' } : { height: '0%' }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            style={{ background: `linear-gradient(to bottom,${accent.hex}80,transparent)` }}
          />
        </div>
      </div>

      {/* node */}
      <div className="absolute left-0 top-[18px] -translate-x-1/2 z-10">
        <TimelineNode accent={accent} inView={inView} isMobile />
      </div>

      {/* card */}
      <div className="flex-1 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
        >
          <EventCard event={event} index={index} accent={accent} isEven={true} inView={inView} />
        </motion.div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   PARTICLES
   ═════════════════════════════════════ */
function Particles({ count = 22 }: { count?: number }) {
  const ps = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      l:   `${Math.random() * 100}%`,
      t:   `${Math.random() * 100}%`,
      s:   0.8 + Math.random() * 2.2,
      dur: 9 + Math.random() * 13,
      o:   0.03 + Math.random() * 0.07,
      c:   ['#818cf8','#a78bfa','#22d3ee','#fb7185','#34d399'][i % 5],
    })),
  [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {ps.map(p => (
        <span
          key={p.id}
          className="absolute rounded-full animate-tl-float"
          style={{
            left: p.l, top: p.t,
            width: p.s, height: p.s,
            opacity: p.o, background: p.c,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════
   HEADER
   ═════════════════════════════════════ */
function TimelineHeader({ locale }: { locale: string }) {
  const pills = [
    { en: 'Quality',    id: 'Kualitas' },
    { en: 'Innovation', id: 'Inovasi'  },
    { en: 'Precision',  id: 'Presisi'  },
  ];
  const pillColors = [
    'border-indigo-500/30 bg-indigo-500/10 text-indigo-300',
    'border-violet-500/30 bg-violet-500/10 text-violet-300',
    'border-cyan-500/30   bg-cyan-500/10   text-cyan-300',
  ];

  return (
    <motion.div
      className="text-center mb-16 lg:mb-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em]
                   mb-5 font-bold text-slate-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span className="w-6 h-px bg-slate-600 rounded-full" />
        {locale === 'en' ? 'Our Journey' : 'Perjalanan Kami'}
        <span className="w-6 h-px bg-slate-600 rounded-full" />
      </motion.div>

      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white tracking-tight">
        {locale === 'en' ? 'Decade of' : 'Satu Dekade'}{' '}
        <span className="relative inline-block">
          <span
            className="relative z-10 bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg,#818cf8,#a78bfa,#22d3ee)' }}
          >
            {locale === 'en' ? 'Innovation' : 'Inovasi'}
          </span>
          <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" fill="none" preserveAspectRatio="none">
            <motion.path
              d="M0 7 Q25 2 50 6 Q75 10 100 6 Q125 2 150 6 Q175 10 200 6"
              stroke="url(#tl-ul-g)" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="tl-ul-g" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818cf8" />
                <stop offset="1" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </h2>

      <motion.p
        className="mt-7 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        {locale === 'en'
          ? 'From a small workshop in Tangerang to a fully-certified manufacturing facility — every milestone shaped who we are.'
          : 'Dari bengkel kecil di Tangerang hingga fasilitas manufaktur bersertifikat — setiap tonggak membentuk siapa kami.'}
      </motion.p>

      <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
        {pills.map((tag, i) => (
          <motion.span
            key={tag.en}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className={`text-[11px] font-bold tracking-[0.2em] uppercase
                        px-3.5 py-1 rounded-full border ${pillColors[i]}`}
          >
            {locale === 'en' ? tag.en : tag.id}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   ROOT
   ═════════════════════════════════════ */
export function Timeline({ events }: TimelineProps) {
  const { locale }   = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-slate-950">
      {/* ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px]
                        bg-indigo-900/25 rounded-full blur-[140px] opacity-70" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px]
                        bg-violet-900/20 rounded-full blur-[140px] opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[300px] bg-cyan-900/10 rounded-full blur-[120px]" />
      </div>

      {/* grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(to right,#fff 1px,transparent 1px),' +
            'linear-gradient(to bottom,#fff 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <Particles />

      <div className="relative w-full px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <TimelineHeader locale={locale} />

        {/* mobile */}
        <div className="block lg:hidden">
          <div className="relative pl-6 pb-12">
            {events.map((ev, i) => (
              <TimelineItemMobile
                key={i} event={ev} index={i} isLast={i === events.length - 1}
              />
            ))}
          </div>
        </div>

        {/* desktop */}
        <div ref={containerRef} className="relative hidden lg:block pb-20">
          <VerticalTrack containerRef={containerRef} />
          <div className="space-y-16 xl:space-y-24">
            {events.map((ev, i) => (
              <TimelineItemDesktop key={i} event={ev} index={i} />
            ))}
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-px w-px h-56
                          bg-gradient-to-b from-transparent to-slate-950
                          pointer-events-none z-10" />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes tl-float {
          0%,100% { transform: translateY(0) scale(1);       opacity: 0.05; }
          50%     { transform: translateY(-18px) scale(1.4); opacity: 0.10; }
        }
        .animate-tl-float { animation: tl-float var(--dur,10s) ease-in-out infinite; }
      `}</style>
    </section>
  );
}
