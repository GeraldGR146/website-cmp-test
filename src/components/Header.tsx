import { useLocale, type Locale } from '@/i18n/LocaleContext';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Header() {
  const { locale, setLocale, t } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    const newPath = `/${segments.join('/')}`;

    setLocale(newLocale);
    navigate(newPath, { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-blue-100 shadow-md">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700"></div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <Link
            to={`/${locale}`}
            className="group flex items-center gap-4 flex-shrink-0"
          >
            {/* Clean Logo Box */}
            <div>
              <img
                src="/logos/Logo_CMP.png"
                alt="CMP"
                loading="eager"
                className="w-35 h-35 object-contain transition-transform hover:scale-110 duration-300"
              />
            </div>

            {/* Brand Text */}
            <div className="flex flex-col justify-center min-w-0">
              <span className="text-lg font-bold text-blue-900 tracking-tight leading-none sm:text-xl">
                <span className="inline sm:hidden">CMP</span>
                <span className="hidden sm:inline">CIPTA METALINDO PERSADA</span>
              </span>
              <span className="text-[9px] text-blue-600 uppercase tracking-widest font-semibold mt-0.5 truncate">
                <span className="inline sm:hidden">CIPTA METALINDO PERSADA</span>
                <span className="hidden sm:inline">{t.nav.tagline}</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm font-bold uppercase tracking-wide transition-all duration-300 pb-2 ${
                  isActive(item.path)
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600 border-b-2 border-transparent'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Locale Switcher */}
            <div className="hidden sm:flex items-center gap-0 border-2 border-blue-600 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => switchLocale('en')}
                className={`px-4 py-2 text-xs font-bold uppercase transition-all duration-300 border-r border-blue-600 ${
                  locale === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLocale('id')}
                className={`px-4 py-2 text-xs font-bold uppercase transition-all duration-300 ${
                  locale === 'id'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
              >
                ID
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-11 h-11 border-2 border-blue-600 bg-white flex items-center justify-center hover:bg-blue-50 transition-all duration-300 rounded-lg"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-blue-600 transition-all duration-300 origin-center ${
                    mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-blue-600 transition-opacity duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-blue-600 transition-all duration-300 origin-center ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 border-t border-blue-200 bg-gradient-to-b from-blue-50 to-white ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-6 space-y-0">
            {navItems.map((item, idx) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full px-4 py-3 text-sm font-bold uppercase tracking-wide border-l-2 transition-all duration-300 ${
                  isActive(item.path)
                    ? 'border-blue-600 bg-blue-100 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
                style={{
                  animationDelay: mobileMenuOpen ? `${idx * 75}ms` : '0ms',
                  animation: mobileMenuOpen ? 'slideInLeft 0.4s ease-out forwards' : 'none',
                }}
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t border-blue-200 mt-6 pt-6">
              <div className="flex gap-0">
                <button
                  onClick={() => switchLocale('en')}
                  className={`flex-1 px-4 py-3 text-xs font-bold uppercase tracking-wider border-2 border-blue-600 transition-all duration-300 rounded-l-lg ${
                    locale === 'en'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => switchLocale('id')}
                  className={`flex-1 px-4 py-3 text-xs font-bold uppercase tracking-wider border-2 border-l-0 border-blue-600 transition-all duration-300 rounded-r-lg ${
                    locale === 'id'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  ID
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
}