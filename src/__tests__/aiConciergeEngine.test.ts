import { describe, it, expect } from 'vitest';
import { generateConciergeResponse } from '../utils/aiConciergeEngine';

describe('AI Concierge Statutory Engine', () => {
  it('cites Section 15 of Census Act 1948 for privacy queries', () => {
    const response = generateConciergeResponse('Is my data confidential from income tax and courts?');
    expect(response.text).toContain('Section 15 of the Census Act, 1948');
    expect(response.text).toContain('Tax');
    expect(response.phaseContext).toBe('Legal');
  });

  it('provides state rollout dates and formatted text dates for state queries', () => {
    const response = generateConciergeResponse('What is the schedule for Maharashtra state?');
    expect(response.text).toContain('Maharashtra');
    expect(response.text).toContain('01 May 2026');
    expect(response.phaseContext).toBe('General');
  });

  it('answers Phase 1 houselisting and amenities questions', () => {
    const response = generateConciergeResponse('What are the 31 questions in Phase 1?');
    expect(response.text).toContain('Phase I');
    expect(response.text).toContain('31 Official Houselisting Parameters');
    expect(response.phaseContext).toBe('Phase 1');
  });

  it('answers Mock SE ID generation queries', () => {
    const response = generateConciergeResponse('How to generate my SE ID?');
    expect(response.text).toContain('Self-Enumeration ID (SE ID)');
    expect(response.suggestedQuestions?.length).toBeGreaterThan(0);
  });

  it('answers caste matrix and demographic questions for Phase 2', () => {
    const response = generateConciergeResponse('Will caste questions be asked in Phase 2?');
    expect(response.text).toContain('Phase II');
    expect(response.phaseContext).toBe('Phase 2');
  });
});
