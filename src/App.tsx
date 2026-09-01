import React, { useState, useEffect } from 'react';

import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { Header, ActiveTab } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { GenAIChatbot } from './components/concierge/GenAIChatbot';
import { StateTracker } from './components/tracker/StateTracker';
import { SelfEnumerationWizard } from './components/selfEnumeration/SelfEnumerationWizard';
import { MisinformationBuster } from './components/misinformation/MisinformationBuster';
import { InsightsDashboard } from './components/dashboard/InsightsDashboard';
import { PolicySandbox } from './components/simulator/PolicySandbox';

const VALID_TABS: ActiveTab[] = [
  'concierge',
  'tracker',
  'selfEnum',
  'misinfo',
  'dashboard',
  'simulator',
];

const MainApp: React.FC = () => {
  // Initialize from URL hash or localStorage with fallback to 'concierge'
  const [activeTab, setActiveTabState] = useState<ActiveTab>(() => {
    const hash = window.location.hash.replace('#', '') as ActiveTab;
    if (VALID_TABS.includes(hash)) return hash;
    const stored = localStorage.getItem('census_2027_active_tab') as ActiveTab;
    if (VALID_TABS.includes(stored)) return stored;
    return 'concierge';
  });

  const [selectedEnumStateCode, setSelectedEnumStateCode] = useState<string>('UP');

  // Handle active tab change with URL hash & localStorage persistence
  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
    window.location.hash = tab;
    localStorage.setItem('census_2027_active_tab', tab);
    // Smooth scroll to top of viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync when user clicks browser Back / Forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ActiveTab;
      if (VALID_TABS.includes(hash)) {
        setActiveTabState(hash);
        localStorage.setItem('census_2027_active_tab', hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Ensure top positioning on initial page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const handleSelectStateForEnum = (stateCode: string) => {
    setSelectedEnumStateCode(stateCode);
    setActiveTab('selfEnum');
  };

  return (
    <div className="app-container">
      {/* Sticky Header with Navigation & Accessibility Bar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Viewport Content */}
      <main className="main-content" id="main-content-section">
        {activeTab === 'concierge' && (
          <GenAIChatbot
            onNavigateToSelfEnum={() => setActiveTab('selfEnum')}
            onNavigateToTracker={(code) => {
              if (code) setSelectedEnumStateCode(code);
              setActiveTab('tracker');
            }}
          />
        )}

        {activeTab === 'tracker' && (
          <StateTracker onSelectStateForEnum={handleSelectStateForEnum} />
        )}

        {activeTab === 'selfEnum' && (
          <SelfEnumerationWizard
            initialStateCode={selectedEnumStateCode}
            onDone={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'misinfo' && <MisinformationBuster />}

        {activeTab === 'dashboard' && <InsightsDashboard />}

        {activeTab === 'simulator' && <PolicySandbox />}
      </main>

      {/* Official Mock Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <MainApp />
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

export default App;
