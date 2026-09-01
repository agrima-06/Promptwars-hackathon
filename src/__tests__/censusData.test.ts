import { describe, it, expect } from 'vitest';
import { PHASE_1_QUESTIONS, PHASE_2_QUESTIONS } from '../data/censusQuestions';
import { STATES_DATA } from '../data/statesData';
import { RUMORS_DATABASE } from '../data/rumorsData';

describe('Census 2027 ORGI Datasets & Integrity', () => {
  it('validates that all 31 Houselisting parameters exist with proper categorization in censusQuestions.ts', () => {
    expect(PHASE_1_QUESTIONS).toHaveLength(31);

    const sectionNames = new Set(PHASE_1_QUESTIONS.map((q) => q.section));
    expect(sectionNames.size).toBeGreaterThan(5);

    // Verify critical ORGI 2027 parameters
    const questionIds = PHASE_1_QUESTIONS.map((q) => q.id);
    expect(questionIds).toContain('wall_roof_material');
    expect(questionIds).toContain('drinking_water_source');
    expect(questionIds).toContain('solar_lighting_system');
    expect(questionIds).toContain('cooking_fuel_primary');
    expect(questionIds).toContain('latrine_access_type');
    expect(questionIds).toContain('internet_broadband_access');
    expect(questionIds).toContain('cereal_consumed_primary');

    // Each question must have valid structure
    PHASE_1_QUESTIONS.forEach((q) => {
      expect(q.id).toBeTruthy();
      expect(q.title).toBeTruthy();
      expect(q.phase).toBe(1);
      expect(q.questionNumber).toBeGreaterThan(0);
    });

    // Verify Phase 2 questions structure
    expect(PHASE_2_QUESTIONS.length).toBeGreaterThan(0);
  });

  it('validates that all 36 States & Union Territories are populated with authentic district arrays in statesData.ts', () => {
    expect(STATES_DATA).toHaveLength(36);

    const stateCodes = new Set(STATES_DATA.map((s) => s.code));
    expect(stateCodes.size).toBe(36);

    // Verify presence of key states & UTs
    expect(stateCodes.has('UP')).toBe(true);
    expect(stateCodes.has('MH')).toBe(true);
    expect(stateCodes.has('DL')).toBe(true);
    expect(stateCodes.has('TN')).toBe(true);
    expect(stateCodes.has('KL')).toBe(true);
    expect(stateCodes.has('JK')).toBe(true);
    expect(stateCodes.has('LA')).toBe(true);

    // Every State/UT must have authentic district lists, pre-survey window, and coordinates
    STATES_DATA.forEach((state) => {
      expect(state.name).toBeTruthy();
      expect(state.districtsCount).toBeGreaterThan(0);
      expect(state.districtsList.length).toBeGreaterThan(0);
      expect(state.preSurveyWindow.start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(state.preSurveyWindow.end).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(state.coordinates.lat).toBeTypeOf('number');
      expect(state.coordinates.lng).toBeTypeOf('number');
    });
  });

  it('validates that rumor buster items are correctly classified across Verified, Rumor, Misleading, and Phishing categories in rumorsData.ts', () => {
    expect(RUMORS_DATABASE.length).toBeGreaterThanOrEqual(10);

    const verdicts = new Set(RUMORS_DATABASE.map((r) => r.verdict));
    expect(verdicts.has('TRUE')).toBe(true);
    expect(verdicts.has('FALSE')).toBe(true);
    expect(verdicts.has('SCAM_ALERT')).toBe(true);
    expect(verdicts.has('MISLEADING')).toBe(true);

    // Check that every item has legal citations and truth scores
    RUMORS_DATABASE.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.rumorClaim).toBeTruthy();
      expect(item.legalCitation).toBeTruthy();
      expect(item.truthScore).toBeGreaterThanOrEqual(0);
      expect(item.truthScore).toBeLessThanOrEqual(100);
      expect(item.tags.length).toBeGreaterThan(0);
    });
  });
});
