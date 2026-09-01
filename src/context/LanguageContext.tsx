import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, LANGUAGES, TRANSLATIONS, LanguageOption } from '../data/translations';

interface LanguageContextType {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  languages: LanguageOption[];
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

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
