import { useLocale, type Locale } from '@/i18n/LocaleContext';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, type Easing } from 'framer-motion';

export function Header() {
  const { locale, setLocale, t } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop]               = useState(true);
  const [visible, setVisible]               = useState(true);
  const [scrolled, setScrolled]             = useState(false);

  const lastScrollY = useRef(0);

  const isContactPage = location.pathname.includes('/contact');

  const EASE: Easing = [0.25, 0.1, 0.25, 1];
  const DURATION = 0.45;

  // 🧠 Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      setIsAtTop(y < 40);
      setScrolled(y > 80);

      if (y > lastScrollY.current && y > 140) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔒 Lock scroll on mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
  }, [mobileMenuOpen]);

  /*
   * LOGO LOGIC — simplified
   * White logo when:  at top of page (dark hero behind header) on non-contact pages
   * Dark logo when:   scrolled down, or on contact page
   *
   * We always use the WHITE logo so Samsung Internet dark mode
   * double-invert doesn't matter — white stays white regardless.
   * The dark logo is only shown on white backgrounds (scrolled / contact).
   */
  const useWhiteLogo = !isContactPage && isAtTop;

  const navItems = [
    { label: t.nav.home,     path: `/${locale}`          },
    { label: t.nav.about,    path: `/${locale}/about`    },
    { label: t.nav.products, path: `/${locale}/products` },
    { label: t.nav.contact,  path: `/${locale}/contact`  },
  ];

  const isActive = (path: string) => {
    const current = location.pathname;
    if (path === `/${locale}`)
      return current === `/${locale}` || current === `/${locale}/`;
    return current.startsWith(path);
  };

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments.length === 0) {
      navigate(`/${newLocale}`);
      setLocale(newLocale);
      return;
    }
    segments[0] = newLocale;
    navigate(`/${segments.join('/')}`, { replace: true });
    setLocale(newLocale);
  };

  /* ── header background ── */
  const headerBg = isContactPage
    ? 'rgba(255,255,255,1)'
    : isAtTop
    ? 'rgba(255,255,255,0)'
    : 'rgba(255,255,255,0.85)';

  /* ── text / icon color helpers ── */
  const onDark  = !isContactPage && isAtTop;   // white text

  return (
    <>
      {/* ══ HEADER ══ */}
      <motion.header
        initial={false}
        animate={{
          y: visible ? 0 : -90,
          backdropFilter: isAtTop && !isContactPage ? 'blur(0px)' : 'blur(16px)',
          backgroundColor: headerBg,
        }}
        transition={{ duration: DURATION, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-black/5 will-change-transform"
        /*
         * Force the header to always render in a "light" colour-scheme context.
         * This prevents Samsung Internet / Chrome Android dark mode from
         * applying its own invert/recolor filter on the header and its children,
         * which is what was causing the logo to go dark.
         */
        style={{ colorScheme: 'light' }}
      >
        {/* Accent line */}
        <div
          className={`
            bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700
            transition-all duration-500
            ${isContactPage ? 'h-[2px]' : isAtTop ? 'h-0 opacity-0' : 'h-[2px]'}
          `}
        />

        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between ${scrolled ? 'h-16' : 'h-20'}`}>

            {/* ── LOGO ── */}
            <Link to={`/${locale}`} className="flex items-center gap-4">
              <motion.img
                /*
                 * Always serve the correct pre-made file.
                 * NO CSS filter / brightness / invert — that's what Samsung dark
                 * mode was double-inverting. The image itself carries the color.
                 */
                src={useWhiteLogo ? '/logos/Logo_CMP_white.png' : '/logos/Logo_CMP.png'}
                alt="PT Cipta Metalindo Persada"
                animate={{ scale: scrolled ? 0.9 : 1 }}
                transition={{ duration: DURATION, ease: EASE }}
                className="w-32 object-contain"
                /*
                 * Tell the browser: do NOT recolor this image.
                 * forcedColorAdjust is the CSS spec property;
                 * the vendor-prefixed version covers older Samsung Internet.
                 */
                style={{
                  forcedColorAdjust: 'none',
                } as React.CSSProperties}
              />

              <div className="hidden sm:flex flex-col">
                <span
                  className="font-bold tracking-tight transition-colors duration-300"
                  style={{ color: onDark ? '#ffffff' : '#1e3a5f' }}
                >
                  CIPTA METALINDO PERSADA
                </span>
                <span
                  className="text-[10px] uppercase tracking-widest transition-colors duration-300"
                  style={{ color: onDark ? 'rgba(255,255,255,0.7)' : '#2563eb' }}
                >
                  {t.nav.tagline}
                </span>
              </div>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm font-bold uppercase transition-colors duration-300"
                  style={{
                    color: isActive(item.path)
                      ? '#2563eb'
                      : onDark
                      ? 'rgba(255,255,255,0.85)'
                      : '#374151',
                  }}
                >
                  {item.label}
                </Link>
              ))}

              {/* LOCALE SWITCHER */}
              <div
                className="ml-4 flex rounded-lg overflow-hidden border transition-colors duration-300"
                style={{
                  borderColor: onDark ? 'rgba(255,255,255,0.3)' : '#2563eb',
                }}
              >
                {(['en', 'id'] as Locale[]).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className="px-3 py-1 text-xs font-bold transition-colors duration-300"
                    style={{
                      backgroundColor: locale === loc ? '#2563eb'  : 'transparent',
                      color:           locale === loc ? '#ffffff'
                                     : onDark        ? '#ffffff'
                                     :                 '#2563eb',
                    }}
                  >
                    {loc.toUpperCase()}
                  </button>
                ))}
              </div>
            </nav>

            {/* ── MOBILE HAMBURGER ── */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl
                         border transition-colors duration-300"
              style={{
                borderColor: onDark ? 'rgba(255,255,255,0.3)' : '#2563eb',
                color:       onDark ? '#ffffff'               : '#2563eb',
              }}
            >
              {/* Animated hamburger lines */}
              <span className="flex flex-col gap-[5px] w-5">
                <motion.span
                  animate={mobileMenuOpen
                    ? { rotate: 45, y: 7, width: '100%' }
                    : { rotate: 0,  y: 0, width: '100%' }}
                  transition={{ duration: 0.25 }}
                  className="block h-[2px] rounded-full bg-current"
                />
                <motion.span
                  animate={mobileMenuOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block h-[2px] rounded-full bg-current"
                />
                <motion.span
                  animate={mobileMenuOpen
                    ? { rotate: -45, y: -7, width: '100%' }
                    : { rotate: 0,   y: 0,  width: '100%' }}
                  transition={{ duration: 0.25 }}
                  className="block h-[2px] rounded-full bg-current"
                />
              </span>
            </button>

          </div>
        </div>
      </motion.header>

      {/* ══ MOBILE MENU ══ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1,    y: 0   }}
              exit={{    opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: DURATION, ease: EASE }}
              className="fixed top-[80px] left-4 right-4 z-50 rounded-2xl shadow-2xl overflow-hidden"
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                backdropFilter:  'blur(20px)',
                colorScheme:     'light',       /* ← same fix: force light context */
              }}
            >
              <div className="p-6 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl
                               text-sm font-semibold uppercase transition-colors duration-200"
                    style={{
                      color:           isActive(item.path) ? '#2563eb' : '#1e3a5f',
                      backgroundColor: isActive(item.path) ? '#eff6ff' : 'transparent',
                    }}
                  >
                    <span>{item.label}</span>
                    {isActive(item.path) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    )}
                  </Link>
                ))}

                {/* Divider */}
                <div className="h-px bg-blue-100 mx-4 my-2" />

                {/* Locale switcher */}
                <div className="flex gap-2 px-4 pt-2 pb-1">
                  {(['en', 'id'] as Locale[]).map((loc) => (
                    <button
                      key={loc}
                      onClick={() => { switchLocale(loc); setMobileMenuOpen(false); }}
                      className="flex-1 py-2.5 rounded-xl text-sm font-black
                                 uppercase transition-all duration-200"
                      style={{
                        backgroundColor: locale === loc ? '#1B4F9B' : '#f1f5f9',
                        color:           locale === loc ? '#ffffff'  : '#1e3a5f',
                      }}
                    >
                      {loc.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Footer note */}
                <p className="text-center text-[10px] text-blue-300/80 pt-2 pb-1 tracking-widest uppercase">
                  PT Cipta Metalindo Persada
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
