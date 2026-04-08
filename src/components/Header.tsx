import { useLocale, type Locale } from '@/i18n/LocaleContext';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, type Easing } from 'framer-motion';

export function Header() {
  const { locale, setLocale, t } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const lastScrollY = useRef(0);

  const isContactPage = location.pathname.includes('/contact');

  // ✅ FIXED EASING (Type-safe)
  const EASE: Easing = [0.25, 0.1, 0.25, 1];
  const DURATION = 0.45;

  // 🌙 Detect dark mode
  useEffect(() => {
    const checkDark = () => {
      const isDark =
        document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      setIsDarkMode(isDark);
    };

    checkDark();

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', checkDark);

    return () => media.removeEventListener('change', checkDark);
  }, []);

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

  // 🎯 Logo logic
  const useWhiteLogo =
    !isContactPage && (isAtTop || isDarkMode);

  const navItems = [
    { label: t.nav.home, path: `/${locale}` },
    { label: t.nav.about, path: `/${locale}/about` },
    { label: t.nav.products, path: `/${locale}/products` },
    { label: t.nav.contact, path: `/${locale}/contact` },
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

  // 🎯 Header background logic (FIXED for contact page)
  const headerBg = isContactPage
    ? 'rgba(255,255,255,1)'
    : isAtTop
    ? 'rgba(255,255,255,0)'
    : 'rgba(255,255,255,0.75)';

  const headerDarkBg = isContactPage
    ? 'rgba(11,31,58,1)'
    : 'rgba(11,31,58,0.8)';

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={false}
        animate={{
          y: visible ? 0 : -90,
          backdropFilter:
            isAtTop && !isContactPage ? 'blur(0px)' : 'blur(16px)',
          backgroundColor: isDarkMode ? headerDarkBg : headerBg,
        }}
        transition={{ duration: DURATION, ease: EASE }}
        className="
          fixed top-0 left-0 right-0 z-50
          border-b border-black/5 dark:border-white/10
          will-change-transform
        "
      >
        {/* Accent line */}
        <div
          className={`
            bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700
            transition-all duration-500
            ${
              isContactPage
                ? 'h-[2px]'
                : isAtTop
                ? 'h-0 opacity-0'
                : 'h-[2px]'
            }
          `}
        />

        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between ${
              scrolled ? 'h-16' : 'h-20'
            }`}
          >
            {/* LOGO */}
            <Link to={`/${locale}`} className="flex items-center gap-4">
              <motion.img
                src={
                  useWhiteLogo
                    ? '/logos/Logo_CMP_white.png'
                    : '/logos/Logo_CMP.png'
                }
                animate={{
                  scale: scrolled ? 0.9 : 1,
                }}
                transition={{ duration: DURATION, ease: EASE }}
                className="w-32"
              />

              <div className="hidden sm:flex flex-col">
                <span
                  className={`
                    font-bold tracking-tight
                    ${
                      isContactPage
                        ? 'text-blue-900 dark:text-white'
                        : isAtTop
                        ? 'text-white'
                        : 'text-blue-900 dark:text-white'
                    }
                  `}
                >
                  CIPTA METALINDO PERSADA
                </span>

                <span
                  className={`
                    text-[10px] uppercase tracking-widest
                    ${
                      isContactPage
                        ? 'text-blue-600 dark:text-white/60'
                        : isAtTop
                        ? 'text-white/70'
                        : 'text-blue-600 dark:text-white/60'
                    }
                  `}
                >
                  {t.nav.tagline}
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    text-sm font-bold uppercase transition-all duration-300
                    ${
                      isActive(item.path)
                        ? 'text-blue-600 dark:text-blue-400'
                        : isContactPage
                        ? 'text-gray-700 dark:text-white/70 hover:text-blue-600'
                        : isAtTop
                        ? 'text-white/80 hover:text-white'
                        : 'text-gray-700 dark:text-white/70 hover:text-blue-600'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}

              {/* LOCALE SWITCHER */}
              <div
                className={`
                  ml-4 flex rounded-lg overflow-hidden border
                  ${
                    isContactPage
                      ? 'border-blue-600 dark:border-white/20'
                      : isAtTop
                      ? 'border-white/30'
                      : 'border-blue-600 dark:border-white/20'
                  }
                `}
              >
                <button
                  onClick={() => switchLocale('en')}
                  className={`px-3 py-1 text-xs font-bold ${
                    locale === 'en'
                      ? 'bg-blue-600 text-white'
                      : isContactPage
                      ? 'text-blue-600 dark:text-white'
                      : isAtTop
                      ? 'text-white'
                      : 'text-blue-600 dark:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => switchLocale('id')}
                  className={`px-3 py-1 text-xs font-bold ${
                    locale === 'id'
                      ? 'bg-blue-600 text-white'
                      : isContactPage
                      ? 'text-blue-600 dark:text-white'
                      : isAtTop
                      ? 'text-white'
                      : 'text-blue-600 dark:text-white'
                  }`}
                >
                  ID
                </button>
              </div>
            </nav>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`
                lg:hidden w-10 h-10 flex items-center justify-center rounded-xl
                transition-all duration-300
                ${
                  isContactPage
                    ? 'border border-blue-600 text-blue-600 dark:text-white'
                    : isAtTop
                    ? 'border border-white/30 text-white'
                    : 'border border-blue-600 text-blue-600 dark:text-white'
                }
              `}
            >
              ☰
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: DURATION, ease: EASE }}
              className="fixed top-[80px] left-4 right-4 z-50 rounded-2xl bg-white/90 dark:bg-[#0B1F3A]/90 backdrop-blur-xl shadow-2xl"
            >
              <div className="p-6 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-semibold uppercase text-gray-800 dark:text-white hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="pt-4 flex gap-2">
                  <button
                    onClick={() => switchLocale('en')}
                    className={`flex-1 py-2 rounded ${
                      locale === 'en'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-white/10'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => switchLocale('id')}
                    className={`flex-1 py-2 rounded ${
                      locale === 'id'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-white/10'
                    }`}
                  >
                    ID
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
