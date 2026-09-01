/**
 * @file InsightsDashboard.tsx
 * @description Smart Data Insights & Macro Trends Dashboard for Census 2027.
 * Visualizes India's socio-economic leap across housing materials, Jal Jeevan tap water,
 * clean energy, and digital inclusion (2011 to 2027) enabling Data-Driven Policy Making.
 */

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

/**
 * InsightsDashboard Component - Renders national KPI cards, housing curves, and state rankings.
 * @returns {React.ReactElement} Rendered InsightsDashboard interface.
 */
export const InsightsDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [sectorFilter, setSectorFilter] = useState<'all' | 'urban' | 'rural'>('all');
  const [selectedStateCode, setSelectedStateCode] = useState<string>('ALL');

  const selectedState = STATES_DATA.find((s) => s.code === selectedStateCode);

  // Dynamic sector multipliers
  const getSectorValue = (
    nationalVal: string | number,
    urbanVal: string | number,
    ruralVal: string | number,
    stateBase?: number
  ) => {
    if (stateBase !== undefined) {
      if (sectorFilter === 'urban') return (stateBase * 1.08 > 100 ? 100 : +(stateBase * 1.08).toFixed(1));
      if (sectorFilter === 'rural') return +(stateBase * 0.91).toFixed(1);
      return stateBase;
    }
    if (sectorFilter === 'urban') return urbanVal;
    if (sectorFilter === 'rural') return ruralVal;
    return nationalVal;
  };

  // Dynamically filtered KPIs
  const kpis = [
    {
      title: sectorFilter === 'urban'
        ? 'Projected Urban Population (2027)'
        : sectorFilter === 'rural'
        ? 'Projected Rural Population (2027)'
        : 'Projected National Population (2027)',
      value: selectedState
        ? `${sectorFilter === 'urban' ? (selectedState.projectedPopulationMillions * 0.38).toFixed(1) : sectorFilter === 'rural' ? (selectedState.projectedPopulationMillions * 0.62).toFixed(1) : selectedState.projectedPopulationMillions} M`
        : sectorFilter === 'urban'
        ? '548.0 M'
        : sectorFilter === 'rural'
        ? '894.0 M'
        : NATIONAL_METRICS.totalProjectedPopulation,
      subtext: sectorFilter === 'urban' ? '38% of National Aggregate' : sectorFilter === 'rural' ? '62% of National Aggregate' : '+16.8% since 2011 Census',
      icon: Users,
      color: '#3b82f6',
    },
    {
      title: sectorFilter === 'urban'
        ? 'Urban Geotagged Census Houses'
        : sectorFilter === 'rural'
        ? 'Rural Geotagged Census Houses'
        : 'Total Census Houses / Units',
      value: selectedState
        ? `${sectorFilter === 'urban' ? (selectedState.projectedHouseholdsMillions * 0.4).toFixed(1) : sectorFilter === 'rural' ? (selectedState.projectedHouseholdsMillions * 0.6).toFixed(1) : selectedState.projectedHouseholdsMillions} M`
        : sectorFilter === 'urban'
        ? '135.0 M'
        : sectorFilter === 'rural'
        ? '200.0 M'
        : NATIONAL_METRICS.totalCensusHouses,
      subtext: 'Digitally Geotagged Structures',
      icon: Building,
      color: '#8b5cf6',
    },
    {
      title: 'Treated Tap Water (Jal Jeevan)',
      value: `${getSectorValue(
        NATIONAL_METRICS.jalJeevanCoverage.replace('%', ''),
        '94.2',
        '79.4',
        selectedState?.jalJeevanCoveragePct
      )}%`,
      subtext: sectorFilter === 'urban' ? 'Urban Municipal Network' : 'Har Ghar Jal Rural Coverage',
      icon: Droplets,
      color: '#06b6d4',
    },
    {
      title: 'Rooftop Solar (PM Surya Ghar)',
      value: `${getSectorValue(
        NATIONAL_METRICS.solarRooftopSuryaGhar.replace('%', ''),
        '34.6',
        '21.2',
        selectedState?.pmSuryaGharSolarPct
      )}%`,
      subtext: 'Grid-Connected Solar Rooftops',
      icon: Sun,
      color: '#f59e0b',
    },
    {
      title: 'Pucca Disaster-Resilient Houses',
      value: `${getSectorValue(
        NATIONAL_METRICS.puccaHousingRate.replace('%', ''),
        '94.8',
        '78.4',
        selectedState?.puccaHousingPct
      )}%`,
      subtext: 'PMAY-Urban / PMAY-Gramin Transformation',
      icon: Home,
      color: '#10b981',
    },
    {
      title: 'Digital & Financial Literacy',
      value: `${getSectorValue(
        NATIONAL_METRICS.digitalLiteracyRate.replace('%', ''),
        '86.5',
        '58.2',
        selectedState?.digitalLiteracyPct
      )}%`,
      subtext: 'UPI & Mobile Banking Enabled',
      icon: Wifi,
      color: '#ec4899',
    },
  ];

  // Dynamic Housing breakdown
  const housingTrends = [
    {
      category: 'Pucca (Concrete/Brick/Stone)',
      percentage2011: sectorFilter === 'urban' ? 78.5 : sectorFilter === 'rural' ? 44.8 : 54.6,
      projected2027: sectorFilter === 'urban' ? 94.8 : sectorFilter === 'rural' ? 78.4 : 84.6,
      color: '#10b981',
    },
    {
      category: 'Semi-Pucca (Timber/GI Sheet)',
      percentage2011: sectorFilter === 'urban' ? 17.2 : sectorFilter === 'rural' ? 36.1 : 30.1,
      projected2027: sectorFilter === 'urban' ? 4.6 : sectorFilter === 'rural' ? 16.8 : 12.2,
      color: '#f59e0b',
    },
    {
      category: 'Kutcha / Mud Dwellings',
      percentage2011: sectorFilter === 'urban' ? 4.3 : sectorFilter === 'rural' ? 19.1 : 15.3,
      projected2027: sectorFilter === 'urban' ? 0.6 : sectorFilter === 'rural' ? 4.8 : 3.2,
      color: '#ef4444',
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
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <select
            value={selectedStateCode}
            onChange={(e) => setSelectedStateCode(e.target.value)}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="ALL" style={{ background: '#0f172a', color: '#fff' }}>All India (National Average)</option>
            {STATES_DATA.map((s) => (
              <option key={s.code} value={s.code} style={{ background: '#0f172a', color: '#fff' }}>
                {s.name} ({s.code})
              </option>
            ))}
          </select>

          {/* Functional Sector Filter Toggles */}
          <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.12)', borderRadius: 'var(--radius-sm)', padding: '0.2rem', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            {(['all', 'urban', 'rural'] as const).map((sec) => {
              const isSelected = sectorFilter === sec;
              return (
                <button
                  key={sec}
                  onClick={() => setSectorFilter(sec)}
                  style={{
                    border: 'none',
                    background: isSelected ? 'var(--saffron-500)' : 'transparent',
                    color: isSelected ? '#071931' : '#ffffff',
                    padding: '0.45rem 0.95rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 800 : 600,
                    textTransform: 'capitalize',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {sec === 'all' ? 'All India' : sec}
                </button>
              );
            })}
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
              <h3 style={{ fontSize: '1.15rem' }}>
                Housing Structure Transformation ({sectorFilter.toUpperCase()})
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Shift from Kutcha/Mud dwellings to Pucca Concrete (2011 vs 2027 Projected)
              </p>
            </div>
            <span className="status-badge status-active">PMAY Impact</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {housingTrends.map((item, idx) => (
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
                      transition: 'width 0.6s ease',
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
            {NATIONAL_PROGRESS_TIMELINE.map((step, idx) => {
              const tap = sectorFilter === 'urban' ? Math.min(100, +(step.tapWaterPct * 1.15).toFixed(1)) : sectorFilter === 'rural' ? +(step.tapWaterPct * 0.92).toFixed(1) : step.tapWaterPct;
              const lpg = sectorFilter === 'urban' ? Math.min(100, +(step.lpgCookingPct * 1.12).toFixed(1)) : sectorFilter === 'rural' ? +(step.lpgCookingPct * 0.88).toFixed(1) : step.lpgCookingPct;
              const solar = sectorFilter === 'urban' ? Math.min(100, +(step.rooftopSolarPct * 1.3).toFixed(1)) : sectorFilter === 'rural' ? +(step.rooftopSolarPct * 0.8).toFixed(1) : step.rooftopSolarPct;
              const net = sectorFilter === 'urban' ? Math.min(100, +(step.internetAccessPct * 1.15).toFixed(1)) : sectorFilter === 'rural' ? +(step.internetAccessPct * 0.82).toFixed(1) : step.internetAccessPct;

              return (
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
                    <span title="Tap Water">🚰 Tap: <strong>{tap}%</strong></span>
                    <span title="LPG Cooking">🔥 LPG: <strong>{lpg}%</strong></span>
                    <span title="Rooftop Solar">☀️ Solar: <strong>{solar}%</strong></span>
                    <span title="Internet">🌐 Net: <strong>{net}%</strong></span>
                  </div>
                </div>
              );
            })}
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
