import en from './en.json';
import id from './id.json';

export type Locale = 'en' | 'id';

const translations: Record<Locale, typeof en> = { en, id };

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.en;
}

export type Translations = typeof en;
