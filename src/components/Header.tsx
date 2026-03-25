import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLocale, type Locale } from '@/i18n/LocaleContext';

export function Header() {
  const { locale, setLocale, t } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

    // Replace first segment (locale)
    segments[0] = newLocale;

    const newPath = `/${segments.join('/')}`;

    setLocale(newLocale);
    navigate(newPath, { replace: true });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 header-slide-down ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={`/${locale}`} className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffffff]">
              <img
                src="/logos/Logo_CMP.png"
                alt="CMP"
                loading="eager"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#0B2A59] leading-tight tracking-wide">
                CMP
              </span>
              <span className="text-[9px] text-gray-500 leading-tight tracking-wide">
                CIPTA METALINDO PERSADA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-[#0B2A59]'
                    : 'text-gray-600 hover:text-[#0B2A59]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#0B2A59] rounded-full transition-all duration-300 ${
                    isActive(item.path) ? 'w-6' : 'w-0'
                  }`}
                />
              </Link>
            ))}

            <div className="ml-3 h-6 w-px bg-gray-200" />

            {/* Locale switcher */}
            <div className="ml-3 flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => switchLocale('en')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-300 ${
                  locale === 'en'
                    ? 'bg-[#0B2A59] text-white shadow-sm'
                    : 'text-gray-500 hover:text-[#0B2A59]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLocale('id')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-300 ${
                  locale === 'id'
                    ? 'bg-[#0B2A59] text-white shadow-sm'
                    : 'text-gray-500 hover:text-[#0B2A59]'
                }`}
              >
                ID
              </button>
            </div>
          </nav>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() =>
                switchLocale(locale === 'en' ? 'id' : 'en')
              }
              className="px-3 py-1.5 rounded-lg bg-gray-100 text-xs font-bold text-[#0B2A59]"
            >
              {locale === 'en' ? 'EN' : 'ID'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                    mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0 scale-0' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                    mobileMenuOpen
                      ? '-rotate-45 -translate-y-[9px]'
                      : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${
            mobileMenuOpen
              ? 'max-h-80 opacity-100 pb-4'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-100 pt-2">
            {navItems.map((item, i) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-[#0B2A59] bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                style={{
                  transitionDelay: mobileMenuOpen
                    ? `${i * 50}ms`
                    : '0ms',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}