import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StateTracker } from '../components/tracker/StateTracker';
import { LanguageProvider } from '../context/LanguageContext';

const renderTracker = (onSelectState = vi.fn()) => {
  return render(
    <LanguageProvider>
      <StateTracker onSelectStateForSelfEnum={onSelectState} />
    </LanguageProvider>
  );
};

describe('StateTracker Component', () => {
  it('renders all 36 States and Union Territories with formatted text dates', () => {
    renderTracker();
    expect(screen.getByText('State-Wise Rollout Schedule & Self-Enumeration Windows')).toBeInTheDocument();
    expect(screen.getByText('Uttar Pradesh')).toBeInTheDocument();
    expect(screen.getByText('Maharashtra')).toBeInTheDocument();
    expect(screen.getByText('Tamil Nadu')).toBeInTheDocument();
  });

  it('filters state cards via search input', () => {
    renderTracker();
    const searchInput = screen.getByPlaceholderText(/Search state or UT name/i);
    fireEvent.change(searchInput, { target: { value: 'Kerala' } });

    expect(screen.getByText('Kerala')).toBeInTheDocument();
    expect(screen.queryByText('Uttar Pradesh')).not.toBeInTheDocument();
  });

  it('filters state cards by status toggle tabs', () => {
    renderTracker();
    const activeTab = screen.getByText(/Active Pre-Survey/i);
    fireEvent.click(activeTab);

    // Active state cards should be displayed
    expect(screen.getByText('Goa')).toBeInTheDocument();
  });

  it('opens state detail modal upon card click with complete ORGI schedule and districts', () => {
    renderTracker();
    const upCard = screen.getByText('Uttar Pradesh');
    fireEvent.click(upCard);

    expect(screen.getByText(/Detailed Census 2027 Schedule/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Districts: 75/i)).toBeInTheDocument();
  });

  it('triggers onSelectStateForSelfEnum callback from modal action', () => {
    const onSelectState = vi.fn();
    renderTracker(onSelectState);

    const upCard = screen.getByText('Uttar Pradesh');
    fireEvent.click(upCard);

    const startBtn = screen.getByText(/Launch Self-Enumeration for UP/i);
    fireEvent.click(startBtn);

    expect(onSelectState).toHaveBeenCalledWith('UP');
  });
});
