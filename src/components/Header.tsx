import { useState, useEffect } from 'react';
import { useLocale } from '@/i18n/LocaleContext';
import { CloudinaryImage } from '@/components/CloudinaryImage';
import type { Locale } from '@/i18n';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { locale, setLocale, t } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', label: t.nav.home },
    { key: 'about', label: t.nav.about },
    { key: 'products', label: t.nav.products },
    { key: 'contact', label: t.nav.contact },
  ];

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'id' : 'en' as Locale);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 header-slide-down ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md overflow-hidden">
              <CloudinaryImage
                src= "Logo_CMP"
                alt="CMP"
                crop="scale"
                objectFit='contain'
                loading="eager"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#0B2A59] leading-tight tracking-wide">CMP</span>
              <span className="text-[9px] text-gray-500 leading-tight hidden sm:block">CIPTA METALINDO PERSADA</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  currentPage === item.key
                    ? 'text-[#0B2A59]'
                    : 'text-gray-600 hover:text-[#0B2A59]'
                }`}
              >
                {item.label}
                {/* Active indicator */}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#0B2A59] rounded-full transition-all duration-300 ${
                  currentPage === item.key ? 'w-6' : 'w-0'
                }`} />
              </button>
            ))}
            <div className="ml-3 h-6 w-px bg-gray-200" />
            {/* Locale switcher — shows CURRENT language */}
            <button
              onClick={toggleLocale}
              className="ml-3 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 
                hover:border-[#0B2A59] hover:text-[#0B2A59] hover:shadow-md transition-all duration-300 hover:scale-105 group/locale"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="flex items-center gap-1">
                <span className="font-bold text-[#0B2A59]">{t.locale.switchLabel}</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-400 group-hover/locale:text-gray-600 transition-colors">
                  {locale === 'en' ? 'ID' : 'EN'}
                </span>
              </span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''
              }`} />
              <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0 scale-0' : ''
              }`} />
              <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''
              }`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${
          mobileMenuOpen ? 'max-h-80 opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="border-t border-gray-100 pt-2">
            {navItems.map((item, i) => (
              <button
                key={item.key}
                onClick={() => {
                  onNavigate(item.key);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                  currentPage === item.key
                    ? 'text-[#0B2A59] bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${i * 50}ms` : '0ms' }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={toggleLocale}
              className="mt-2 ml-4 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="font-bold text-[#0B2A59]">{t.locale.current}</span>
              <span className="text-gray-400">→</span>
              <span className="text-gray-500">{locale === 'en' ? 'Indonesia' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}