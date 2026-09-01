import { describe, it, expect } from 'vitest';
import { generateConciergeResponse } from '../utils/aiConciergeEngine';

describe('AI Concierge Statutory Engine', () => {
  it('cites Section 15 of Census Act 1948 for privacy queries', () => {
    const response = generateConciergeResponse('Is my data confidential from income tax and courts?');
    expect(response.message).toContain('Section 15 of the Census Act, 1948');
    expect(response.message).toContain('confidential');
    expect(response.category).toBe('Legal & Privacy');
    expect(response.section15Protected).toBe(true);
  });

  it('provides state rollout dates and formatted text dates for state queries', () => {
    const response = generateConciergeResponse('When does self-enumeration start in Maharashtra?');
    expect(response.message).toContain('Maharashtra');
    expect(response.message).toContain('15 Apr 2026 to 30 Apr 2026');
    expect(response.category).toBe('State Schedules');
  });

  it('answers Phase 1 houselisting and amenities questions', () => {
    const response = generateConciergeResponse('What questions are asked in Phase 1 houselisting?');
    expect(response.message).toContain('Phase I (Houselisting & Housing Amenities)');
    expect(response.message).toContain('31 parameters');
    expect(response.category).toBe('Phase I / Phase II Scope');
  });

  it('answers Mock SE ID generation queries', () => {
    const response = generateConciergeResponse('How do I get my Mock SE ID?');
    expect(response.message).toContain('Self-Enumeration ID (SE ID)');
    expect(response.suggestedAction?.tab).toBe('selfEnum');
  });

  it('answers caste matrix and demographic questions for Phase 2', () => {
    const response = generateConciergeResponse('Will caste questions be asked in Census 2027?');
    expect(response.message).toContain('Phase II (Population Enumeration)');
    expect(response.message).toContain('SC');
    expect(response.message).toContain('ST');
  });
});
