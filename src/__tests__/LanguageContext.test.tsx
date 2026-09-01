import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../data/translations';

const TestLanguageConsumer: React.FC = () => {
  const { currentLanguage, setLanguage, languages, t } = useLanguage();

  return (
    <div>
      <span data-testid="current-lang">{currentLanguage}</span>
      <span data-testid="portal-title">{t('portalTitle')}</span>
      <div data-testid="lang-list">
        {languages.map((l) => (
          <button
            key={l.code}
            data-testid={`btn-lang-${l.code}`}
            onClick={() => setLanguage(l.code as LanguageCode)}
          >
            {l.name}
          </button>
        ))}
      </div>
    </div>
  );
};

describe('LanguageContext & Multi-lingual Localization', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides all 8 official regional Indian languages', () => {
    render(
      <LanguageProvider>
        <TestLanguageConsumer />
      </LanguageProvider>
    );

    expect(screen.getByTestId('btn-lang-en')).toBeInTheDocument();
    expect(screen.getByTestId('btn-lang-hi')).toBeInTheDocument();
    expect(screen.getByTestId('btn-lang-ta')).toBeInTheDocument();
    expect(screen.getByTestId('btn-lang-te')).toBeInTheDocument();
    expect(screen.getByTestId('btn-lang-bn')).toBeInTheDocument();
    expect(screen.getByTestId('btn-lang-mr')).toBeInTheDocument();
    expect(screen.getByTestId('btn-lang-gu')).toBeInTheDocument();
    expect(screen.getByTestId('btn-lang-kn')).toBeInTheDocument();
  });

  it('switches active language and updates translated text strings', () => {
    render(
      <LanguageProvider>
        <TestLanguageConsumer />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-lang')).toHaveTextContent('en');

    // Switch to Hindi
    fireEvent.click(screen.getByTestId('btn-lang-hi'));
    expect(screen.getByTestId('current-lang')).toHaveTextContent('hi');
    expect(screen.getByTestId('portal-title')).toHaveTextContent('जनगणना 2027: डिजिटल प्रगणना');

    // Switch to Tamil
    fireEvent.click(screen.getByTestId('btn-lang-ta'));
    expect(screen.getByTestId('current-lang')).toHaveTextContent('ta');
    expect(screen.getByTestId('portal-title')).toHaveTextContent('மக்கள் தொகை கணக்கெடுப்பு 2027: டிஜிட்டல் கணக்கீடு');
  });

  it('persists selected language in localStorage and syncs document.documentElement.lang', () => {
    render(
      <LanguageProvider>
        <TestLanguageConsumer />
      </LanguageProvider>
    );

    fireEvent.click(screen.getByTestId('btn-lang-mr'));
    expect(localStorage.getItem('census_lang')).toBe('mr');
    expect(document.documentElement.lang).toBe('mr');
  });
});
