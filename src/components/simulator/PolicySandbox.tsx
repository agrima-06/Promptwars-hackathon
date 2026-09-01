/**
 * @file PolicySandbox.tsx
 * @description Interactive Demographic & Flagship Welfare Budget Allocation Sandbox.
 * Enables policymakers and citizens to dynamically model how shifts in census parameters
 * (pucca housing, piped tap water, PM Surya Ghar solar, clean cooking fuel, and digital skills)
 * trigger budgetary allocations across central flagship schemes for Data-Driven Policy Making.
 */

import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  PolicySimulatorInputs,
  DEFAULT_SIMULATOR_INPUTS,
  calculatePolicyImpact,
} from '../../utils/policyCalculator';
import {
  Sliders,
  Sparkles,
  TrendingUp,
  RotateCcw,
  IndianRupee,
  Home,
  Droplets,
  Sun,
  Flame,
  Wifi,
  Briefcase,
  Leaf,
  Award,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

/**
 * PolicySandbox Component - Real-time policy simulator with interactive levers and budget modelers.
 * @returns {React.ReactElement} Rendered PolicySandbox interface.
 */
export const PolicySandbox: React.FC = () => {
  const { t } = useLanguage();
  const [inputs, setInputs] = useState<PolicySimulatorInputs>(DEFAULT_SIMULATOR_INPUTS);

  const results = useMemo(() => calculatePolicyImpact(inputs), [inputs]);

  const updateInput = (key: keyof PolicySimulatorInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (presetName: string) => {
    switch (presetName) {
      case 'green_solar':
        setInputs({
          puccaHousingTargetPct: 88,
          tapWaterTargetPct: 95,
          rooftopSolarTargetPct: 75,
          cleanCookingTargetPct: 98,
          digitalLiteracyTargetPct: 85,
          urbanizationPct: 42,
        });
        break;
      case 'saturation_pmay':
        setInputs({
          puccaHousingTargetPct: 98,
          tapWaterTargetPct: 100,
          rooftopSolarTargetPct: 45,
          cleanCookingTargetPct: 100,
          digitalLiteracyTargetPct: 90,
          urbanizationPct: 40,
        });
        break;
      case 'digital_first':
        setInputs({
          puccaHousingTargetPct: 85,
          tapWaterTargetPct: 90,
          rooftopSolarTargetPct: 50,
          cleanCookingTargetPct: 92,
          digitalLiteracyTargetPct: 98,
          urbanizationPct: 48,
        });
        break;
      default:
        setInputs(DEFAULT_SIMULATOR_INPUTS);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Banner */}
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
            <Sliders size={26} color="var(--saffron-500)" />
            <h2 style={{ fontSize: '1.5rem', color: '#ffffff' }}>Policy Simulator & Welfare Budget Sandbox</h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', maxWidth: '720px' }}>
            {t('policySimDesc')} Dynamically model how shifting census parameters triggers budgetary allocations across major central flagship schemes.
          </p>
        </div>

        {/* Preset Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-outline"
            style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
            onClick={() => applyPreset('green_solar')}
          >
            ☀️ Solar India
          </button>
          <button
            className="btn btn-outline"
            style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
            onClick={() => applyPreset('saturation_pmay')}
          >
            🏠 100% Saturation
          </button>
          <button
            className="btn btn-outline"
            style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
            onClick={() => applyPreset('digital_first')}
          >
            🌐 Digital Bharat
          </button>
          <button
            className="btn btn-outline"
            style={{ fontSize: '0.78rem', padding: '0.4rem 0.6rem', color: '#f59e0b', borderColor: 'rgba(245,158,11,0.5)' }}
            onClick={() => applyPreset('reset')}
            title="Reset to default baseline"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Main Grid: Controls vs Projected Impact */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem' }}>
        {/* Controls Column */}
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sliders size={18} color="var(--saffron-500)" />
            <span>Demographic & Infrastructure Levers</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Adjust the targets below to see the modeled welfare fiscal requirements:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {/* Slider 1: Pucca Housing */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Home size={15} color="#10b981" /> Pucca Concrete Housing Target:
                </span>
                <strong style={{ color: '#10b981', fontSize: '1rem' }}>{inputs.puccaHousingTargetPct}%</strong>
              </div>
              <input
                type="range"
                min="60"
                max="100"
                value={inputs.puccaHousingTargetPct}
                onChange={(e) => updateInput('puccaHousingTargetPct', Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: '#10b981' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <span>60% (Base Min)</span>
                <span>81.5% (2027 Proj)</span>
                <span>100% (Universal)</span>
              </div>
            </div>

            {/* Slider 2: Tap Water */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Droplets size={15} color="#06b6d4" /> Treated Tap Water (Jal Jeevan):
                </span>
                <strong style={{ color: '#06b6d4', fontSize: '1rem' }}>{inputs.tapWaterTargetPct}%</strong>
              </div>
              <input
                type="range"
                min="60"
                max="100"
                value={inputs.tapWaterTargetPct}
                onChange={(e) => updateInput('tapWaterTargetPct', Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: '#06b6d4' }}
              />
            </div>

            {/* Slider 3: Rooftop Solar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sun size={15} color="#f59e0b" /> Rooftop Solar (PM Surya Ghar):
                </span>
                <strong style={{ color: '#f59e0b', fontSize: '1rem' }}>{inputs.rooftopSolarTargetPct}%</strong>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={inputs.rooftopSolarTargetPct}
                onChange={(e) => updateInput('rooftopSolarTargetPct', Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: '#f59e0b' }}
              />
            </div>

            {/* Slider 4: Clean Cooking */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Flame size={15} color="#f43f5e" /> Clean LPG / PNG Cooking Fuel:
                </span>
                <strong style={{ color: '#f43f5e', fontSize: '1rem' }}>{inputs.cleanCookingTargetPct}%</strong>
              </div>
              <input
                type="range"
                min="70"
                max="100"
                value={inputs.cleanCookingTargetPct}
                onChange={(e) => updateInput('cleanCookingTargetPct', Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: '#f43f5e' }}
              />
            </div>

            {/* Slider 5: Digital Literacy */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Wifi size={15} color="#8b5cf6" /> Rural Digital & UPI Literacy:
                </span>
                <strong style={{ color: '#8b5cf6', fontSize: '1rem' }}>{inputs.digitalLiteracyTargetPct}%</strong>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={inputs.digitalLiteracyTargetPct}
                onChange={(e) => updateInput('digitalLiteracyTargetPct', Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: '#8b5cf6' }}
              />
            </div>
          </div>
        </div>

        {/* Projected Impact & HDI Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Total Budget Card */}
          <div
            className="glass-card"
            style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.08) 100%)',
              border: '1px solid #10b981',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              MODELED CENTRAL SCHEMES OUTLAY
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)', margin: '0.25rem 0' }}>
              ₹ {results.totalBudgetCr.toLocaleString('en-IN')} Cr
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
              {results.budgetDifferenceCr >= 0 ? (
                <span style={{ color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                  <ArrowUpRight size={16} /> +₹ {results.budgetDifferenceCr.toLocaleString('en-IN')} Cr (+
                  {((results.budgetDifferenceCr / results.baseTotalBudgetCr) * 100).toFixed(1)}%)
                </span>
              ) : (
                <span style={{ color: '#f59e0b', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                  <ArrowDownRight size={16} /> -₹ {Math.abs(results.budgetDifferenceCr).toLocaleString('en-IN')} Cr
                </span>
              )}
              <span style={{ color: 'var(--text-muted)' }}>vs Base FY Outlay</span>
            </div>
          </div>

          {/* HDI & Macro Metrics Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.25rem' }}>
                <Award size={18} color="var(--saffron-500)" />
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Projected HDI</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--saffron-600)' }}>
                {results.hdiProjection}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.25rem' }}>
                <Briefcase size={18} color="#0284c7" />
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Green Jobs</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0284c7' }}>
                +{results.greenEnergyJobsLakhs} L
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.25rem' }}>
                <Leaf size={18} color="#10b981" />
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CO₂ Avoidance</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#10b981' }}>
                {results.carbonReductionMT} MT
              </div>
            </div>
          </div>

          {/* Breakdown by Scheme */}
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Scheme-Wise Modeled Budget Allocations
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {results.schemes.map((scheme, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-tertiary)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.825rem',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700 }}>{scheme.schemeName}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{scheme.highlightInsight}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '0.5rem' }}>
                    <div style={{ fontWeight: 800 }}>₹ {scheme.modeledBudgetCr.toLocaleString('en-IN')} Cr</div>
                    <div style={{ fontSize: '0.7rem', color: scheme.deltaPct >= 0 ? '#10b981' : '#f59e0b' }}>
                      {scheme.deltaPct >= 0 ? `+${scheme.deltaPct}%` : `${scheme.deltaPct}%`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
