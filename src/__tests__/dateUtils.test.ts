import { describe, it, expect } from 'vitest';
import { formatCensusDate, formatCensusDateRange } from '../utils/dateUtils';

describe('Census Date Formatting Utilities', () => {
  it('formats numeric dates to clean readable text dates', () => {
    expect(formatCensusDate('2026-04-15')).toBe('15 Apr 2026');
    expect(formatCensusDate('2026-04-30')).toBe('30 Apr 2026');
    expect(formatCensusDate('2026-09-01')).toBe('01 Sep 2026');
  });

  it('formats compact dates when requested', () => {
    expect(formatCensusDate('2026-04-15', true)).toBe('15Apr26');
    expect(formatCensusDate('2026-10-01', true)).toBe('01Oct26');
  });

  it('formats date ranges cleanly', () => {
    expect(formatCensusDateRange('2026-04-15', '2026-04-30')).toBe('15 Apr 2026 to 30 Apr 2026');
    expect(formatCensusDateRange('2026-04-15', '2026-04-30', true)).toBe('15Apr26 - 30Apr26');
  });

  it('gracefully handles missing or invalid inputs', () => {
    expect(formatCensusDate('')).toBe('');
    expect(formatCensusDate('invalid')).toBe('invalid');
  });
});
