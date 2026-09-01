import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, PhoneCall, HelpCircle, Lock, Award, Heart } from 'lucide-react';
import { ActiveTab } from './Header';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();

  return (
    <footer
      style={{
        background: 'var(--navy-900)',
        color: '#e2e8f0',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '3rem 1.5rem 1.5rem',
        marginTop: 'auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Brand & Mandate */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <img src="/favicon.svg" alt="Emblem" style={{ width: '38px', height: '38px' }} />
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>CENSUS 2027 • डिजिटल प्रगणना</h3>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Office of the Registrar General & Census Commissioner, India</p>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.6' }}>
            {t('motto')}. India's historic 16th National Census and 1st fully digital enumeration using GIS spatial mapping and mobile self-service.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
            <span className="status-badge status-active" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
              <Lock size={12} /> Section 15 Protected
            </span>
            <span className="status-badge status-verified" style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' }}>
              <Award size={12} /> GenAI Powered
            </span>
          </div>
        </div>

        {/* Quick Portals */}
        <div>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--saffron-500)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Portals & Tools
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
            <li>
              <button
                onClick={() => setActiveTab('selfEnum')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
              >
                ➔ {t('navSelfEnum')} (Generate SE ID)
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('tracker')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
              >
                ➔ {t('navTracker')} (36 States & UTs)
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('misinfo')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
              >
                ➔ {t('navMisinfo')} (Fact Checks)
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('simulator')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
              >
                ➔ {t('navSimulator')} (Budget Modeler)
              </button>
            </li>
          </ul>
        </div>

        {/* Confidentiality & Legal Notice */}
        <div>
          <h4 style={{ fontSize: '0.95rem', color: '#38bdf8', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Privacy & Statutory Protection
          </h4>
          <p style={{ fontSize: '0.825rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '0.75rem' }}>
            <strong style={{ color: '#ffffff' }}>Census Act, 1948 (Section 15):</strong> All individual census answers are legally confidential. They cannot be shared with tax authorities, police, or produced as evidence in any court of law.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.85rem' }}>
            <ShieldCheck size={16} /> <span>End-to-End Encrypted Data Architecture</span>
          </div>
        </div>

        {/* Citizen Helpline */}
        <div>
          <h4 style={{ fontSize: '0.95rem', color: '#f59e0b', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            24/7 Citizen Support
          </h4>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <PhoneCall size={20} color="var(--saffron-500)" />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>National Toll-Free Helpline</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>1800-11-2027</div>
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Operates 24/7 in 22 Official Scheduled Languages of India.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div
        style={{
          maxWidth: '1380px',
          margin: '1.25rem auto 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.78rem',
          color: '#64748b',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <div>
          © 2026-2027 Office of the Registrar General & Census Commissioner, India (ORGI). Built for Prompt Wars Hackathon.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          Crafted with <Heart size={13} color="#f43f5e" fill="#f43f5e" /> for Digital India
        </div>
      </div>
    </footer>
  );
};
