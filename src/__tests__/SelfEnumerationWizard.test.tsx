import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { SelfEnumerationWizard } from '../components/selfEnumeration/SelfEnumerationWizard';
import { LanguageProvider } from '../context/LanguageContext';
import { clearStoredSeId } from '../utils/seIdGenerator';

const renderWizard = (initialStateCode = 'UP') => {
  return render(
    <LanguageProvider>
      <SelfEnumerationWizard initialStateCode={initialStateCode} />
    </LanguageProvider>
  );
};

describe('SelfEnumerationWizard Component & Flow', () => {
  beforeEach(() => {
    clearStoredSeId();
  });

  it('renders Step 1 with Citizen Mobile Verification, State Selector, and Section 15 Legal Consent', () => {
    renderWizard();
    expect(screen.getByText(/Citizen Mobile Verification/i)).toBeInTheDocument();
    expect(screen.getByText(/Section 15 of the Census Act, 1948/i)).toBeInTheDocument();
    expect(screen.getByTestId('btn-step1-next')).toBeInTheDocument();
  });

  it('cascades district options when changing State / UT selection', () => {
    renderWizard();
    const stateSelect = screen.getByLabelText(/State \/ Union Territory/i);
    fireEvent.change(stateSelect, { target: { value: 'MH' } });

    const districtSelect = screen.getByLabelText(/District in/i);
    expect(districtSelect).toHaveValue('Mumbai City');
  });

  it('progresses through all 4 wizard steps and generates official Mock SE ID certificate', async () => {
    renderWizard();

    // Step 1 -> Step 2
    fireEvent.click(screen.getByTestId('btn-step1-next'));
    expect(screen.getByText(/Step 2: Phase I/i)).toBeInTheDocument();

    // Step 2 -> Step 3
    fireEvent.click(screen.getByTestId('btn-step2-next'));
    expect(screen.getByText(/Step 3: Phase II/i)).toBeInTheDocument();

    // Step 3 -> Step 4
    fireEvent.click(screen.getByTestId('btn-step3-next'));
    expect(screen.getByText(/Step 4: Interactive GIS Geolocation Tagging/i)).toBeInTheDocument();

    // Step 4 -> Step 5 (Submit)
    fireEvent.click(screen.getByTestId('btn-step4-submit'));

    // Step 5: Verification of Mock SE ID Pass
    await waitFor(() => {
      expect(screen.getByText(/Your Self-Enumeration ID is generated/i)).toBeInTheDocument();
      expect(screen.getAllByText(/IND-2027-/i).length).toBeGreaterThan(0);
    });
  });
});
