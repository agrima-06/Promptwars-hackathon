/**
 * @file LanguageContext.tsx
 * @description Global state provider for multi-lingual localization across 8 Indian languages.
 * Synchronizes selected locale with localStorage, HTML lang attribute, and translation dictionaries.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, LANGUAGES, TRANSLATIONS, LanguageOption } from '../data/translations';

export interface LanguageContextType {
  /** Currently active ISO language code */
  currentLanguage: LanguageCode;
  /** Function to update current active language */
  setLanguage: (lang: LanguageCode) => void;
  /** List of all supported language options with native names and flags */
  languages: LanguageOption[];
  /** Translation lookup helper function */
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * LanguageProvider Component - Wraps application to inject multi-lingual context.
 * @param {{ children: React.ReactNode }} props - Provider properties.
 * @returns {React.ReactElement} LanguageContext provider element.
 */
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('census_lang');
    return (saved as LanguageCode) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('census_lang', currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const t = (key: string): string => {
    const dict = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage: setCurrentLanguage,
        languages: LANGUAGES,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
