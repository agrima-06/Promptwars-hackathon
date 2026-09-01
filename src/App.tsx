import React, { useState } from 'react';

import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { Header, ActiveTab } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { GenAIChatbot } from './components/concierge/GenAIChatbot';
import { StateTracker } from './components/tracker/StateTracker';
import { SelfEnumerationWizard } from './components/selfEnumeration/SelfEnumerationWizard';
import { MisinformationBuster } from './components/misinformation/MisinformationBuster';
import { InsightsDashboard } from './components/dashboard/InsightsDashboard';
import { PolicySandbox } from './components/simulator/PolicySandbox';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('concierge');
  const [selectedEnumStateCode, setSelectedEnumStateCode] = useState<string>('UP');

  const handleSelectStateForEnum = (stateCode: string) => {
    setSelectedEnumStateCode(stateCode);
    setActiveTab('selfEnum');
  };

  return (
    <div className="app-container">
      {/* Sticky Header with Navigation & Accessibility Bar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Viewport Content */}
      <main className="main-content">
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
