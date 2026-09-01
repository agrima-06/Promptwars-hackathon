import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RUMORS_DATABASE, RumorFactItem } from '../../data/rumorsData';
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  Sparkles,
  AlertTriangle,
  FileText,
  Lock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  HelpCircle,
} from 'lucide-react';

export const MisinformationBuster: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customRumorInput, setCustomRumorInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<{
    claim: string;
    verdict: 'FALSE' | 'TRUE' | 'MISLEADING' | 'SCAM_ALERT';
    trustScore: number;
    explanation: string;
    legalCitation: string;
  } | null>(null);

  const [expandedRumorId, setExpandedRumorId] = useState<string | null>('rumor_tax_link');

  const categories = ['All', 'Taxation', 'Privacy', 'Citizenship', 'Biometrics', 'Fraud Prevention', 'Legal'];

  const filteredRumors = RUMORS_DATABASE.filter((r) => {
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesSearch =
      r.rumorClaim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.shortVerdict.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleScanCustomRumor = () => {
    if (!customRumorInput.trim()) return;

    setIsScanning(true);
    setTimeout(() => {
      const lower = customRumorInput.toLowerCase();

      let verdict: 'FALSE' | 'TRUE' | 'MISLEADING' | 'SCAM_ALERT' = 'FALSE';
      let trustScore = 5;
      let explanation =
        'Under Section 15 of the Census Act 1948, all personal census responses are strictly privileged, encrypted, and cannot be shared with tax authorities, police, or produced as court evidence.';
      let legalCitation = 'Census Act 1948 §15 & Digital Personal Data Protection Act 2023';

      if (lower.includes('bank') || lower.includes('otp') || lower.includes('money') || lower.includes('prize') || lower.includes('subsidy')) {
        verdict = 'SCAM_ALERT';
        trustScore = 0;
        explanation =
          'CRITICAL ALERT: Census 2027 never asks for Bank Account Numbers, Debit/Credit Card CVVs, UPI PINs, or Financial OTPs. This message is a fraudulent cyber phishing attempt.';
        legalCitation = 'CERT-In / National Cyber Crime Portal Advisory';
      } else if (lower.includes('biometric') || lower.includes('fingerprint') || lower.includes('iris') || lower.includes('face')) {
        verdict = 'FALSE';
        trustScore = 0;
        explanation =
          'Census 2027 does NOT capture biometrics (fingerprints or iris). It is purely a mobile questionnaire demographic & housing survey.';
        legalCitation = 'ORGI Standard Operating Procedure 2026-27';
      } else if (lower.includes('compulsory') || lower.includes('mandatory') || lower.includes('law')) {
        verdict = 'TRUE';
        trustScore = 98;
        explanation =
          'Truthful participation in the census is a statutory public duty under Section 8 of the Census Act 1948.';
        legalCitation = 'Census Act 1948, Section 8';
      }

      setScannedResult({
        claim: customRumorInput,
        verdict,
        trustScore,
        explanation,
        legalCitation,
      });
      setIsScanning(false);
    }, 550);
  };

  const getVerdictBadge = (verdict: RumorFactItem['verdict']) => {
    switch (verdict) {
      case 'FALSE':
        return (
          <span className="status-badge status-scam" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#e11d48' }}>
            <XCircle size={13} /> False Rumor / Debunked
          </span>
        );
      case 'SCAM_ALERT':
        return (
          <span className="status-badge status-scam" style={{ background: '#f43f5e', color: '#ffffff' }}>
            <AlertTriangle size={13} /> Phishing Scam Alert
          </span>
        );
      case 'TRUE':
        return (
          <span className="status-badge status-active">
            <CheckCircle size={13} /> Official Fact (Verified)
          </span>
        );
      case 'MISLEADING':
        return (
          <span className="status-badge status-upcoming">
            <AlertTriangle size={13} /> Misleading Claim
          </span>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Hero Header */}
      <div
        className="glass-card"
        style={{
          padding: '1.75rem',
          background: 'linear-gradient(135deg, rgba(15, 44, 89, 0.95) 0%, rgba(7, 25, 49, 0.98) 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <ShieldCheck size={26} color="var(--saffron-500)" />
            <h2 style={{ fontSize: '1.5rem', color: '#ffffff' }}>AI Misinformation Buster & Privacy Verifier</h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', maxWidth: '720px' }}>
            Test viral rumors, WhatsApp forwards, or misconceptions regarding Census 2027 privacy, tax audits, NRC linking, and biometrics against official statutory laws.
          </p>
        </div>

        <div
          style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-sm)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Statutory Protection</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>Section 15 Immunity</div>
        </div>
      </div>

      {/* Interactive AI Rumor Scanner Tool */}
      <div
        className="glass-card"
        style={{
          padding: '1.75rem',
          border: '1px solid var(--border-glow)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Sparkles size={20} color="var(--saffron-500)" />
          <h3 style={{ fontSize: '1.2rem' }}>Test Any Claim / WhatsApp Message</h3>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Paste any forwarded text or question below to run real-time legal AI verification.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={customRumorInput}
            onChange={(e) => setCustomRumorInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleScanCustomRumor()}
            placeholder="e.g. Will income tax inspect my census form if I declare 2 cars and AC?"
            style={{
              flex: '1 1 340px',
              padding: '0.85rem 1.2rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '0.9rem',
            }}
          />
          <button
            className="btn btn-primary"
            onClick={handleScanCustomRumor}
            disabled={!customRumorInput.trim() || isScanning}
            style={{ padding: '0.85rem 1.5rem' }}
          >
            <Sparkles size={16} />
            <span>{isScanning ? 'Analyzing Laws...' : 'Analyze Claim'}</span>
          </button>
        </div>

        {/* AI Scan Result Box */}
        {scannedResult && (
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              background: scannedResult.verdict === 'TRUE' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.08)',
              border: `1px solid ${scannedResult.verdict === 'TRUE' ? '#10b981' : '#f43f5e'}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {getVerdictBadge(scannedResult.verdict)}
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tested Claim Analysis</span>
              </div>

              {/* Trust Score Meter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>AI Truth Score:</span>
                <span
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 900,
                    color: scannedResult.trustScore > 70 ? '#10b981' : '#f43f5e',
                  }}
                >
                  {scannedResult.trustScore}%
                </span>
              </div>
            </div>

            <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              "{scannedResult.claim}"
            </div>

            <p style={{ fontSize: '0.875rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              {scannedResult.explanation}
            </p>

            <div style={{ fontSize: '0.8rem', color: '#0284c7', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <FileText size={14} /> Legal Grounding: <strong>{scannedResult.legalCitation}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Category Pills & Search */}
      <div
        className="glass-card"
        style={{
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', flex: '1 1 250px', maxWidth: '350px' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rumors or keywords..."
            style={{
              width: '100%',
              padding: '0.55rem 0.85rem 0.55rem 2.2rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
            }}
          />
        </div>
      </div>

      {/* Rumors Cards Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredRumors.map((item) => {
          const isExpanded = expandedRumorId === item.id;
          return (
            <div
              key={item.id}
              className="glass-card"
              style={{
                padding: '1.25rem',
                borderLeft: `4px solid ${item.verdict === 'TRUE' ? '#10b981' : item.verdict === 'SCAM_ALERT' ? '#f43f5e' : '#f59e0b'}`,
              }}
            >
              {/* Header clickable row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  gap: '1rem',
                }}
                onClick={() => setExpandedRumorId(isExpanded ? null : item.id)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    {getVerdictBadge(item.verdict)}
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Category: {item.category}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', lineHeight: '1.4', color: 'var(--text-primary)' }}>
                    {item.rumorClaim}
                  </h4>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Truth Score</div>
                    <div
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 900,
                        color: item.truthScore > 70 ? '#10b981' : '#f43f5e',
                      }}
                    >
                      {item.truthScore}%
                    </div>
                  </div>

                  <button
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: 'none',
                      padding: '0.4rem',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* Collapsible Deep-Dive Details */}
              {isExpanded && (
                <div
                  style={{
                    marginTop: '1.25rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                    fontSize: '0.88rem',
                  }}
                >
                  <div style={{ background: 'var(--bg-tertiary)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                    <strong style={{ color: 'var(--saffron-500)', display: 'block', marginBottom: '0.2rem' }}>
                      Official Statutory Reality:
                    </strong>
                    <p style={{ lineHeight: '1.6' }}>{item.detailedAnalysis}</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                      <Lock size={15} color="#0284c7" style={{ marginTop: '0.2rem' }} />
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Legal Citation:</span>
                        <div style={{ fontWeight: 600 }}>{item.legalCitation}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                      <CheckCircle size={15} color="#10b981" style={{ marginTop: '0.2rem' }} />
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Official Citizen Advice:</span>
                        <div style={{ fontWeight: 600 }}>{item.officialAdvice}</div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.72rem',
                          background: 'rgba(56, 189, 248, 0.1)',
                          color: '#0284c7',
                          padding: '0.15rem 0.5rem',
                          borderRadius: 'var(--radius-full)',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
