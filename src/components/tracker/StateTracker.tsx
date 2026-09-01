import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { STATES_DATA, StateCensusData } from '../../data/statesData';
import {
  MapPin,
  Calendar,
  Clock,
  Search,
  Phone,
  UserCheck,
  ShieldCheck,
  ChevronRight,
  Droplets,
  Sun,
  Home,
  BookOpen,
} from 'lucide-react';

interface StateTrackerProps {
  onSelectStateForEnum?: (stateCode: string) => void;
}

export const StateTracker: React.FC<StateTrackerProps> = ({ onSelectStateForEnum }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'active' | 'upcoming'>('all');
  const [activeModalState, setActiveModalState] = useState<StateCensusData | null>(null);

  const filteredStates = STATES_DATA.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.capital.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatusFilter === 'all' ? true : st.status === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  const activeCount = STATES_DATA.filter((s) => s.status === 'active').length;
  const upcomingCount = STATES_DATA.filter((s) => s.status === 'upcoming').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner & KPI Counters */}
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
            <MapPin size={24} color="var(--saffron-500)" />
            <h2 style={{ fontSize: '1.5rem', color: '#ffffff' }}>State-Wise Dynamic Enumeration Tracker</h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', maxWidth: '680px' }}>
            Track the 15-day pre-survey digital self-enumeration window and official Phase I & Phase II survey fieldwork dates across India's 36 States & Union Territories.
          </p>
        </div>

        {/* Live Counters */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div
            style={{
              background: 'rgba(19, 136, 8, 0.18)',
              border: '1px solid rgba(19, 136, 8, 0.45)',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4ade80' }}>{activeCount} States & UTs</div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>15-Day Self-Enum Window Open</div>
          </div>

          <div
            style={{
              background: 'rgba(245, 158, 11, 0.18)',
              border: '1px solid rgba(245, 158, 11, 0.45)',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fbbf24' }}>{upcomingCount} States & UTs</div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Upcoming Phase Schedule</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
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
        {/* Search Field */}
        <div
          style={{
            position: 'relative',
            flex: '1 1 300px',
            maxWidth: '500px',
          }}
        >
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search state, UT, capital or state code (e.g. UP, MH, CG, Delhi)..."
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.5rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '0.875rem',
            }}
          />
        </div>

        {/* Status Filters */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`btn ${selectedStatusFilter === 'all' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
            onClick={() => setSelectedStatusFilter('all')}
          >
            All 36 States & UTs
          </button>
          <button
            className={`btn ${selectedStatusFilter === 'active' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
            onClick={() => setSelectedStatusFilter('active')}
          >
            <span className="live-dot" /> Active Window ({activeCount})
          </button>
          <button
            className={`btn ${selectedStatusFilter === 'upcoming' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
            onClick={() => setSelectedStatusFilter('upcoming')}
          >
            Upcoming ({upcomingCount})
          </button>
        </div>
      </div>

      {/* 3x3 State Grid Cards Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {filteredStates.map((st) => {
          const isActive = st.status === 'active';
          return (
            <div
              key={st.id}
              className="glass-card"
              style={{
                padding: '1.4rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: `4px solid ${isActive ? '#138808' : '#f59e0b'}`,
              }}
            >
              <div>
                {/* State Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <h3 style={{ fontSize: '1.15rem' }}>{st.name}</h3>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.1rem 0.35rem',
                          background: 'var(--bg-tertiary)',
                          borderRadius: '4px',
                          fontWeight: 700,
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {st.code}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Capital: {st.capital} • {st.districtsCount} Districts
                    </span>
                  </div>

                  {isActive ? (
                    <span className="status-badge status-active">
                      <span className="live-dot" /> Self-Enum Open
                    </span>
                  ) : (
                    <span className="status-badge status-upcoming">Upcoming</span>
                  )}
                </div>

                {/* Schedules */}
                <div
                  style={{
                    background: 'var(--bg-tertiary)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={13} color="var(--saffron-500)" /> 15-Day Pre-Survey:
                    </span>
                    <strong style={{ color: isActive ? '#0d6506' : 'var(--text-primary)' }}>
                      {st.selfEnumWindowStart} to {st.selfEnumWindowEnd}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={13} color="#3b82f6" /> Phase I Fieldwork:
                    </span>
                    <span>{st.phase1Start} to {st.phase1End}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={13} color="#8b5cf6" /> Phase II Census:
                    </span>
                    <span>{st.phase2Start} to {st.phase2End}</span>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.78rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Droplets size={13} color="#0284c7" />
                    <span>Jal Jeevan: <strong>{st.jalJeevanCoveragePct}%</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Sun size={13} color="#d97706" />
                    <span>Solar: <strong>{st.pmSuryaGharSolarPct}%</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Home size={13} color="#138808" />
                    <span>Pucca: <strong>{st.puccaHousingPct}%</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <BookOpen size={13} color="#7c3aed" />
                    <span>Literacy: <strong>{st.literacyRatePct}%</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn btn-outline"
                  style={{ flex: 1, padding: '0.45rem', fontSize: '0.8rem' }}
                  onClick={() => setActiveModalState(st)}
                >
                  District Details
                </button>

                <button
                  className={`btn ${isActive ? 'btn-primary' : 'btn-navy'}`}
                  style={{ flex: 1, padding: '0.45rem', fontSize: '0.8rem' }}
                  onClick={() => onSelectStateForEnum && onSelectStateForEnum(st.code)}
                >
                  <span>Self-Enumerate</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* State Detail Modal */}
      {activeModalState && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={() => setActiveModalState(null)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '620px',
              width: '100%',
              padding: '2rem',
              background: 'var(--bg-secondary)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <span className="status-badge status-active" style={{ marginBottom: '0.4rem' }}>
                  ORGI Directorate Record
                </span>
                <h2 style={{ fontSize: '1.6rem' }}>{activeModalState.name} ({activeModalState.code})</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Capital: {activeModalState.capital} • Entity: {activeModalState.type}
                </p>
              </div>

              <button
                onClick={() => setActiveModalState(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            {/* Metric Overview Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Projected Population</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{activeModalState.projectedPopulationMillions} M</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>~{activeModalState.projectedHouseholdsMillions} M Households</div>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Digital Literacy Penetration</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0284c7' }}>{activeModalState.digitalLiteracyPct}%</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Overall Literacy: {activeModalState.literacyRatePct}%</div>
              </div>
            </div>

            {/* Districts List Chips */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                Districts in {activeModalState.name} ({activeModalState.districtsCount} Total):
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', maxHeight: '120px', overflowY: 'auto' }}>
                {activeModalState.districtsList.map((dist, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.5rem',
                      background: 'var(--bg-tertiary)',
                      borderRadius: '4px',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {dist}
                  </span>
                ))}
              </div>
            </div>

            {/* Officer & Helpline Details */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <UserCheck size={16} color="var(--saffron-500)" />
                <span>Nodal Officer: <strong>{activeModalState.nodalOfficer}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="#138808" />
                <span>State Census Control Room: <strong>{activeModalState.activeHelpline}</strong></span>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                className="btn btn-outline"
                style={{ flex: 1 }}
                onClick={() => setActiveModalState(null)}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                style={{ flex: 2 }}
                onClick={() => {
                  if (onSelectStateForEnum) onSelectStateForEnum(activeModalState.code);
                  setActiveModalState(null);
                }}
              >
                <span>Proceed to Self-Enumeration</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
