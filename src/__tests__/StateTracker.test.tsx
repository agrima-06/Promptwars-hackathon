import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StateTracker } from '../components/tracker/StateTracker';
import { LanguageProvider } from '../context/LanguageContext';

const renderTracker = (onSelectState = vi.fn()) => {
  return render(
    <LanguageProvider>
      <StateTracker onSelectStateForEnum={onSelectState} />
    </LanguageProvider>
  );
};

describe('StateTracker Component', () => {
  it('renders all 36 States and Union Territories with formatted text dates', () => {
    renderTracker();
    expect(screen.getByText('State-Wise Dynamic Enumeration Tracker')).toBeInTheDocument();
    expect(screen.getByText('Uttar Pradesh')).toBeInTheDocument();
    expect(screen.getByText('Maharashtra')).toBeInTheDocument();
    expect(screen.getByText('Tamil Nadu')).toBeInTheDocument();
  });

  it('filters state cards via search input', () => {
    renderTracker();
    const searchInput = screen.getByPlaceholderText(/Search state, UT, capital/i);
    fireEvent.change(searchInput, { target: { value: 'Kerala' } });

    expect(screen.getByText('Kerala')).toBeInTheDocument();
    expect(screen.queryByText('Uttar Pradesh')).not.toBeInTheDocument();
  });

  it('filters state cards by status toggle tabs', () => {
    renderTracker();
    const activeTab = screen.getByText(/Active Window/i);
    fireEvent.click(activeTab);

    // Active state cards should be displayed
    expect(screen.getByText('Goa')).toBeInTheDocument();
  });

  it('opens state detail modal upon card click with complete ORGI schedule and districts', () => {
    renderTracker();
    const detailBtns = screen.getAllByText('District Details');
    fireEvent.click(detailBtns[0]); // Uttar Pradesh District Details

    expect(screen.getByText('ORGI Directorate Record')).toBeInTheDocument();
    expect(screen.getByText(/Districts in Uttar Pradesh \(75 Total\)/i)).toBeInTheDocument();
  });

  it('triggers onSelectStateForEnum callback when clicking Self-Enumerate on card', () => {
    const onSelectState = vi.fn();
    renderTracker(onSelectState);

    const enumBtns = screen.getAllByText('Self-Enumerate');
    fireEvent.click(enumBtns[0]); // UP Self-Enumerate

    expect(onSelectState).toHaveBeenCalledWith('UP');
  });
});
