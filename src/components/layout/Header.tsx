import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import {
  MessageSquare,
  MapPin,
  FileCheck2,
  ShieldCheck,
  BarChart3,
  Sliders,
  Globe,
  Sun,
  Moon,
  Volume2,
  VolumeX,
} from 'lucide-react';

export type ActiveTab =
  | 'concierge'
  | 'tracker'
  | 'selfEnum'
  | 'misinfo'
  | 'dashboard'
  | 'simulator';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { currentLanguage, setLanguage, languages, t } = useLanguage();
  const {
    theme,
    toggleTheme,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    isAudioReading,
    stopAudio,
    readAloud,
  } = useAccessibility();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const handleAudioToggle = () => {
    if (isAudioReading) {
      stopAudio();
    } else {
      const summaryText = `${t('portalTitle')}. Government of India. Ministry of Home Affairs. Office of Registrar General India.`;
      readAloud(summaryText);
    }
  };

  const navItems = [
    { id: 'concierge' as ActiveTab, label: t('navConcierge'), icon: MessageSquare },
    { id: 'tracker' as ActiveTab, label: t('navTracker'), icon: MapPin },
    { id: 'selfEnum' as ActiveTab, label: t('navSelfEnum'), icon: FileCheck2 },
    { id: 'misinfo' as ActiveTab, label: t('navMisinfo'), icon: ShieldCheck },
    { id: 'dashboard' as ActiveTab, label: t('navDashboard'), icon: BarChart3 },
    { id: 'simulator' as ActiveTab, label: t('navSimulator'), icon: Sliders },
  ];

  return (
    <header className="header-main tricolor-border-top">
      {/* Top Gov Ribbon */}
      <div className="top-gov-ribbon">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontWeight: 700, color: 'var(--saffron-500)' }}>भारत सरकार | GOI</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span>Ministry of Home Affairs (MHA) & ORGI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span className="live-dot" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#38bdf8' }}>
              Phase I Digital Window Live
            </span>
          </div>
          <span style={{ opacity: 0.5 }}>•</span>
          <span style={{ fontSize: '0.75rem' }}>Toll Free: 1800-11-2027</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="header-container">
        {/* Brand Logo & Emblem with 2-Line Subtitle */}
        <div
          className="brand-badge"
          style={{ cursor: 'pointer' }}
          onClick={() => setActiveTab('concierge')}
        >
          <img src="/favicon.svg" alt="Census 2027 Emblem" className="emblem-icon" />
          <div className="brand-text">
            <h1>
              <span>CENSUS</span>
              <span style={{ color: 'var(--saffron-500)' }}>2027</span>
              <span
                style={{
                  fontSize: '0.65rem',
                  padding: '0.15rem 0.45rem',
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: '#0284c7',
                  borderRadius: '4px',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  fontWeight: 700,
                  marginLeft: '0.25rem',
                }}
              >
                DIGITAL
              </span>
            </h1>
            <p style={{ lineHeight: '1.25', margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>Government of India •</span>
              <br />
              <span>Ministry of Home Affairs • ORGI</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-tabs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                aria-label={item.label}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Controls: Language, Audio, Font Scale, Theme */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Language Switcher Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-outline"
              style={{
                padding: '0.45rem 0.75rem',
                fontSize: '0.825rem',
                borderRadius: 'var(--radius-sm)',
              }}
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              title="Change Language"
            >
              <Globe size={15} color="var(--saffron-500)" />
              <span style={{ fontWeight: 700 }}>
                {languages.find((l) => l.code === currentLanguage)?.nativeName || 'English'}
              </span>
            </button>

            {langDropdownOpen && (
              <div
                className="glass-card"
                style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  zIndex: 100,
                  width: '200px',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    padding: '0.25rem 0.5rem',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  Select Language (भाषा)
                </div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.45rem 0.6rem',
                      borderRadius: '6px',
                      border: 'none',
                      background: currentLanguage === l.code ? 'var(--bg-tertiary)' : 'transparent',
                      color: currentLanguage === l.code ? 'var(--saffron-500)' : 'var(--text-primary)',
                      fontWeight: currentLanguage === l.code ? 700 : 500,
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                    }}
                  >
                    <span>{l.nativeName}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{l.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Voice Reader Button */}
          <button
            className={`btn btn-outline ${isAudioReading ? 'mic-active' : ''}`}
            style={{ padding: '0.45rem', borderRadius: 'var(--radius-sm)' }}
            onClick={handleAudioToggle}
            title={isAudioReading ? 'Stop Audio Reader' : 'Listen with Audio Reader'}
          >
            {isAudioReading ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Font Scaler */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <button
              onClick={decreaseFontSize}
              style={{
                border: 'none',
                background: 'transparent',
                padding: '0.35rem 0.5rem',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
              title="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={resetFontSize}
              style={{
                border: 'none',
                background: 'transparent',
                padding: '0.35rem 0.4rem',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                fontWeight: 800,
                fontSize: '0.8rem',
              }}
              title="Reset Font Size"
            >
              A
            </button>
            <button
              onClick={increaseFontSize}
              style={{
                border: 'none',
                background: 'transparent',
                padding: '0.35rem 0.5rem',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.85rem',
              }}
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* Dark / Light Theme Toggle */}
          <button
            className="btn btn-outline"
            style={{ padding: '0.45rem', borderRadius: 'var(--radius-sm)' }}
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
};
