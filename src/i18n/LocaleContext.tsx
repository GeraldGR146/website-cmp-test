import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import { useLocation } from 'react-router-dom';
import { type Locale, type Translations, getTranslations } from './index';

export type { Locale };

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const location = useLocation();

  // Detect locale from URL pathname
  const detectLocaleFromPath = (): Locale => {
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments[0] === 'id') return 'id';
    return 'en'; // default
  };

  const [locale, setLocaleState] = useState<Locale>(detectLocaleFromPath);

  // Sync locale whenever URL changes
  useEffect(() => {
    setLocaleState(detectLocaleFromPath());
  }, [location.pathname]);

  const setLocale = useCallback((newLocale: Locale) => {
    localStorage.setItem('cmp-locale', newLocale);
    setLocaleState(newLocale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = getTranslations(locale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}