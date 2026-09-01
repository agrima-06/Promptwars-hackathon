import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '../components/layout/Header';
import { LanguageProvider } from '../context/LanguageContext';
import { AccessibilityProvider } from '../context/AccessibilityContext';

const renderHeader = (activeTab = 'concierge', setActiveTab = vi.fn()) => {
  return render(
    <LanguageProvider>
      <AccessibilityProvider>
        <Header activeTab={activeTab as any} setActiveTab={setActiveTab} />
      </AccessibilityProvider>
    </LanguageProvider>
  );
};

describe('Header & Navigation Component', () => {
  it('renders JanData branding and official three-line stacked subtitle', () => {
    renderHeader();
    expect(screen.getByText('JanData')).toBeInTheDocument();
    expect(screen.getByText('Government of India')).toBeInTheDocument();
    expect(screen.getByText('Ministry of Home Affairs')).toBeInTheDocument();
  });

  it('renders all primary navigation tabs', () => {
    renderHeader();
    expect(screen.getByText('AI Concierge')).toBeInTheDocument();
    expect(screen.getByText('State Tracker')).toBeInTheDocument();
    expect(screen.getByText('Self-Enumeration')).toBeInTheDocument();
    expect(screen.getByText('Rumor Buster')).toBeInTheDocument();
    expect(screen.getByText('Data Insights')).toBeInTheDocument();
    expect(screen.getByText('Policy Sandbox')).toBeInTheDocument();
  });

  it('triggers setActiveTab callback when clicking navigation items', () => {
    const setActiveTab = vi.fn();
    renderHeader('concierge', setActiveTab);

    fireEvent.click(screen.getByText('State Tracker'));
    expect(setActiveTab).toHaveBeenCalledWith('tracker');

    fireEvent.click(screen.getByText('Self-Enumeration'));
    expect(setActiveTab).toHaveBeenCalledWith('selfEnum');
  });

  it('opens language switcher dropdown and allows changing language', () => {
    renderHeader();
    const langBtn = screen.getByTitle('Change Language');
    fireEvent.click(langBtn);

    expect(screen.getByText('Select Language (भाषा)')).toBeInTheDocument();
    expect(screen.getByText('हिन्दी (Hindi)')).toBeInTheDocument();

    fireEvent.click(screen.getByText('हिन्दी (Hindi)'));
    // Header should now reflect Hindi strings
    expect(screen.getByText('संवाद AI')).toBeInTheDocument();
  });
});
