'use client';

import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/translations';

export function useTranslations() {
  const { language } = useLanguage();

  const getLanguageKey = (): keyof typeof translations => {
    switch(language) {
        case 'Spanish': return 'es';
        case 'French': return 'fr';
        case 'German': return 'de';
        case 'Hindi': return 'hi';
        case 'Mandarin': return 'zh';
        case 'English':
        default:
            return 'en';
    }
  }

  return translations[getLanguageKey()];
}
