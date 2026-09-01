import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { speakText, stopSpeaking } from '../utils/speechUtils';

export type FontScale = 'sm' | 'md' | 'lg' | 'xl';
export type ThemeMode = 'light' | 'dark';
export type ContrastMode = 'normal' | 'high';

interface AccessibilityContextType {
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  contrast: ContrastMode;
  toggleContrast: () => void;
  isAudioReading: boolean;
  readAloud: (text: string) => void;
  stopAudio: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentLanguage } = useLanguage();

  const [fontScale, setFontScale] = useState<FontScale>(() => {
    return (localStorage.getItem('census_font_scale') as FontScale) || 'md';
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('census_theme') as ThemeMode) || 'light';
  });

  const [contrast, setContrast] = useState<ContrastMode>(() => {
    return (localStorage.getItem('census_contrast') as ContrastMode) || 'normal';
  });

  const [isAudioReading, setIsAudioReading] = useState(false);

  useEffect(() => {
    localStorage.setItem('census_font_scale', fontScale);
    document.body.className = `font-scale-${fontScale}`;
  }, [fontScale]);

  useEffect(() => {
    localStorage.setItem('census_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('census_contrast', contrast);
    document.documentElement.setAttribute('data-contrast', contrast);
  }, [contrast]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleContrast = () => {
    setContrast((prev) => (prev === 'normal' ? 'high' : 'normal'));
  };

  const fontScaleSteps: FontScale[] = ['sm', 'md', 'lg', 'xl'];

  const increaseFontSize = () => {
    const currentIndex = fontScaleSteps.indexOf(fontScale);
    if (currentIndex < fontScaleSteps.length - 1) {
      setFontScale(fontScaleSteps[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const currentIndex = fontScaleSteps.indexOf(fontScale);
    if (currentIndex > 0) {
      setFontScale(fontScaleSteps[currentIndex - 1]);
    }
  };

  const resetFontSize = () => {
    setFontScale('md');
  };

  const readAloud = (text: string) => {
    setIsAudioReading(true);
    speakText(text, currentLanguage);
  };

  const stopAudio = () => {
    setIsAudioReading(false);
    stopSpeaking();
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontScale,
        setFontScale,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        theme,
        toggleTheme,
        contrast,
        toggleContrast,
        isAudioReading,
        readAloud,
        stopAudio,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
