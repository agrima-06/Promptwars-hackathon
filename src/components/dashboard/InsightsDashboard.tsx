import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  NATIONAL_METRICS,
  HOUSING_STRUCTURE_TRENDS,
  NATIONAL_PROGRESS_TIMELINE,
} from '../../data/dashboardData';
import { STATES_DATA } from '../../data/statesData';
import {
  BarChart3,
  TrendingUp,
  Home,
  Droplets,
  Sun,
  Flame,
  Wifi,
  Users,
  Building,
  ArrowUpRight,
  Filter,
} from 'lucide-react';

export const InsightsDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [sectorFilter, setSectorFilter] = useState<'all' | 'urban' | 'rural'>('all');
  const [selectedStateCode, setSelectedStateCode] = useState<string>('ALL');

  const selectedState = STATES_DATA.find((s) => s.code === selectedStateCode);

  const kpis = [
    {
      title: 'Projected National Population (2027)',
      value: selectedState ? `${selectedState.projectedPopulationMillions} M` : NATIONAL_METRICS.totalProjectedPopulation,
      subtext: selectedState ? `State: ${selectedState.name}` : '+16.8% since 2011 Census',
      icon: Users,
      color: '#3b82f6',
    },
    {
      title: 'Total Census Houses / Units',
      value: selectedState ? `${selectedState.projectedHouseholdsMillions} M` : NATIONAL_METRICS.totalCensusHouses,
      subtext: 'Digitally Geotagged Structures',
      icon: Building,
      color: '#8b5cf6',
    },
    {
      title: 'Treated Tap Water (Jal Jeevan)',
      value: selectedState ? `${selectedState.jalJeevanCoveragePct}%` : NATIONAL_METRICS.jalJeevanCoverage,
      subtext: 'From 30.8% in 2011 baseline',
      icon: Droplets,
      color: '#06b6d4',
    },
    {
      title: 'Rooftop Solar (PM Surya Ghar)',
      value: selectedState ? `${selectedState.pmSuryaGharSolarPct}%` : NATIONAL_METRICS.solarRooftopSuryaGhar,
      subtext: 'Free Zero-Emission Electricity',
      icon: Sun,
      color: '#f59e0b',
    },
    {
      title: 'Pucca Disaster-Resilient Houses',
      value: selectedState ? `${selectedState.puccaHousingPct}%` : NATIONAL_METRICS.puccaHousingRate,
      subtext: 'PMAY Housing Transformation',
      icon: Home,
      color: '#10b981',
    },
    {
      title: 'Digital & Financial Literacy',
      value: selectedState ? `${selectedState.digitalLiteracyPct}%` : NATIONAL_METRICS.digitalLiteracyRate,
      subtext: 'UPI & Mobile Banking Enabled',
      icon: Wifi,
      color: '#ec4899',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
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
          gap: '1.25rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <BarChart3 size={26} color="var(--saffron-500)" />
            <h2 style={{ fontSize: '1.5rem', color: '#ffffff' }}>Smart Data Insights & Macro Trends Dashboard</h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', maxWidth: '720px' }}>
            Visualizing India's monumental socio-economic leap across housing materials, Jal Jeevan tap water, clean energy, and digital inclusion (2011 to 2027).
          </p>
        </div>

        {/* State and Sector Filter Selector */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <select
            value={selectedStateCode}
            onChange={(e) => setSelectedStateCode(e.target.value)}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          >
            <option value="ALL" style={{ background: '#0f172a', color: '#fff' }}>All India (National Average)</option>
            {STATES_DATA.map((s) => (
              <option key={s.code} value={s.code} style={{ background: '#0f172a', color: '#fff' }}>
                {s.name} ({s.code})
              </option>
            ))}
          </select>

          <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.1)', borderRadius: 'var(--radius-sm)', padding: '0.2rem' }}>
            {(['all', 'urban', 'rural'] as const).map((sec) => (
              <button
                key={sec}
                onClick={() => setSectorFilter(sec)}
                style={{
                  border: 'none',
                  background: sectorFilter === sec ? 'var(--saffron-500)' : 'transparent',
                  color: '#ffffff',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                }}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
        }}
      >
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                borderLeft: `4px solid ${kpi.color}`,
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-sm)',
                  background: `${kpi.color}20`,
                  color: kpi.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{kpi.title}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)', margin: '0.2rem 0' }}>
                  {kpi.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <TrendingUp size={12} />
                  <span>{kpi.subtext}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Chart 1: Housing Transformation (2011 vs 2027) */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Housing Structure Transformation</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Shift from Kutcha/Mud dwellings to Pucca Concrete (2011 vs 2027 Projected)
              </p>
            </div>
            <span className="status-badge status-active">PMAY Impact</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {HOUSING_STRUCTURE_TRENDS.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <strong>{item.category}</strong>
                  <span style={{ color: item.color, fontWeight: 700 }}>
                    {item.percentage2011}% (2011) ➔ {item.projected2027}% (2027)
                  </span>
                </div>

                {/* Progress Bar comparison */}
                <div
                  style={{
                    height: '14px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${item.projected2027}%`,
                      background: item.color,
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.8s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: 16-Year Timeline Leap (2011 - 2027) */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Core Amenity Penetration Curve</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Progress over Census reference intervals (%)
              </p>
            </div>
            <span className="status-badge status-verified">Jal Jeevan • Solar • Fiber</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {NATIONAL_PROGRESS_TIMELINE.map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-tertiary)',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.85rem',
                }}
              >
                <strong style={{ width: '80px', color: 'var(--saffron-500)' }}>{step.year}</strong>
                <div style={{ display: 'flex', gap: '1.25rem', flex: 1, justifyContent: 'space-around' }}>
                  <span title="Tap Water">🚰 Tap: <strong>{step.tapWaterPct}%</strong></span>
                  <span title="LPG Cooking">🔥 LPG: <strong>{step.lpgCookingPct}%</strong></span>
                  <span title="Rooftop Solar">☀️ Solar: <strong>{step.rooftopSolarPct}%</strong></span>
                  <span title="Internet">🌐 Net: <strong>{step.internetAccessPct}%</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* State Benchmark Ranking Table */}
      <div className="glass-card" style={{ padding: '1.75rem', overflowX: 'auto' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>State-Wise Digital Census Readiness Index</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Comparative state rankings across infrastructure, clean water, solar adoption, and projected households.
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '0.75rem 0.5rem' }}>State / UT</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Projected Pop</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Jal Jeevan Tap %</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>PM Surya Ghar %</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Pucca Housing %</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Digital Literacy %</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>15-Day Window</th>
            </tr>
          </thead>
          <tbody>
            {STATES_DATA.slice(0, 10).map((st) => (
              <tr key={st.code} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>
                  {st.name} <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({st.code})</span>
                </td>
                <td style={{ padding: '0.75rem 0.5rem' }}>{st.projectedPopulationMillions} M</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#0284c7', fontWeight: 600 }}>{st.jalJeevanCoveragePct}%</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#d97706', fontWeight: 600 }}>{st.pmSuryaGharSolarPct}%</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#059669', fontWeight: 600 }}>{st.puccaHousingPct}%</td>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{st.digitalLiteracyPct}%</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>
                  {st.status === 'active' ? (
                    <span className="status-badge status-active">Active</span>
                  ) : (
                    <span className="status-badge status-upcoming">Upcoming</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
