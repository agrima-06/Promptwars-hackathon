import { describe, it, expect } from 'vitest';
import {
  calculatePolicyImpact,
  DEFAULT_SIMULATOR_INPUTS,
  PolicySimulatorInputs,
} from '../utils/policyCalculator';

describe('Policy Calculator & Welfare Budget Simulator', () => {
  it('calculates baseline budget and socio-economic impact metrics accurately', () => {
    const result = calculatePolicyImpact(DEFAULT_SIMULATOR_INPUTS);

    expect(result.totalBudgetCr).toBeGreaterThan(150000);
    expect(result.baseTotalBudgetCr).toBeGreaterThan(150000);
    expect(result.hdiProjection).toBeGreaterThan(0.7);
    expect(result.greenEnergyJobsLakhs).toBeGreaterThan(20);
    expect(result.carbonReductionMT).toBeGreaterThan(100);
    expect(result.schemes).toHaveLength(5);
  });

  it('adjusts PMAY, Jal Jeevan Mission, and PM Surya Ghar budgets dynamically when shifting targets', () => {
    const highSolarInputs: PolicySimulatorInputs = {
      ...DEFAULT_SIMULATOR_INPUTS,
      rooftopSolarTargetPct: 80, // High solar penetration
      puccaHousingTargetPct: 98,
    };

    const baseResult = calculatePolicyImpact(DEFAULT_SIMULATOR_INPUTS);
    const solarResult = calculatePolicyImpact(highSolarInputs);

    // Solar scheme budget should increase with higher target
    const baseSolar = baseResult.schemes.find((s) => s.schemeName.includes('Surya Ghar'));
    const modeledSolar = solarResult.schemes.find((s) => s.schemeName.includes('Surya Ghar'));

    expect(modeledSolar!.modeledBudgetCr).toBeGreaterThan(baseSolar!.modeledBudgetCr);
    expect(solarResult.carbonReductionMT).toBeGreaterThan(baseResult.carbonReductionMT);
    expect(solarResult.greenEnergyJobsLakhs).toBeGreaterThan(baseResult.greenEnergyJobsLakhs);
  });

  it('handles edge cases for 0% and 100% saturation parameters without crashing or returning NaN', () => {
    const zeroInputs: PolicySimulatorInputs = {
      puccaHousingTargetPct: 0,
      tapWaterTargetPct: 0,
      rooftopSolarTargetPct: 0,
      cleanCookingTargetPct: 0,
      digitalLiteracyTargetPct: 0,
      urbanizationPct: 0,
    };

    const maxInputs: PolicySimulatorInputs = {
      puccaHousingTargetPct: 100,
      tapWaterTargetPct: 100,
      rooftopSolarTargetPct: 100,
      cleanCookingTargetPct: 100,
      digitalLiteracyTargetPct: 100,
      urbanizationPct: 100,
    };

    const zeroResult = calculatePolicyImpact(zeroInputs);
    const maxResult = calculatePolicyImpact(maxInputs);

    expect(Number.isNaN(zeroResult.totalBudgetCr)).toBe(false);
    expect(Number.isNaN(zeroResult.hdiProjection)).toBe(false);
    expect(zeroResult.totalBudgetCr).toBeGreaterThan(0);

    expect(Number.isNaN(maxResult.totalBudgetCr)).toBe(false);
    expect(maxResult.hdiProjection).toBeGreaterThan(zeroResult.hdiProjection);
    expect(maxResult.carbonReductionMT).toBeGreaterThan(zeroResult.carbonReductionMT);
  });
});
