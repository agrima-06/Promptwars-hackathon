import { POLICY_SCHEMES_CONFIG } from '../data/dashboardData';

export interface PolicySimulatorInputs {
  puccaHousingTargetPct: number; // 60% to 100%
  tapWaterTargetPct: number; // 60% to 100%
  rooftopSolarTargetPct: number; // 10% to 90%
  cleanCookingTargetPct: number; // 70% to 100%
  digitalLiteracyTargetPct: number; // 50% to 100%
  urbanizationPct: number; // 30% to 65%
}

export interface SchemeProjectionResult {
  schemeName: string;
  ministry: string;
  baseBudgetCr: number;
  modeledBudgetCr: number;
  deltaPct: number;
  projectedBeneficiariesMillions: number;
  highlightInsight: string;
}

export interface PolicySimulatorOutput {
  totalBudgetCr: number;
  baseTotalBudgetCr: number;
  budgetDifferenceCr: number;
  hdiProjection: number;
  greenEnergyJobsLakhs: number;
  carbonReductionMT: number;
  schemes: SchemeProjectionResult[];
}

export const DEFAULT_SIMULATOR_INPUTS: PolicySimulatorInputs = {
  puccaHousingTargetPct: 85,
  tapWaterTargetPct: 92,
  rooftopSolarTargetPct: 35,
  cleanCookingTargetPct: 95,
  digitalLiteracyTargetPct: 82,
  urbanizationPct: 38,
};

export const calculatePolicyImpact = (inputs: PolicySimulatorInputs): PolicySimulatorOutput => {
  const totalHouseholdsMillions = 335; // National households projected for 2027

  // 1. PMAY Impact
  // Higher pucca target means converting remaining kutcha/semi-pucca
  const kutchaRemainingPct = Math.max(0, 100 - inputs.puccaHousingTargetPct);
  const pmayBeneficiariesM = (kutchaRemainingPct / 100) * totalHouseholdsMillions * 0.45;
  const pmayMultiplier = 1 + (inputs.puccaHousingTargetPct - 81.5) * 0.035;
  const pmayBudget = Math.round(POLICY_SCHEMES_CONFIG[0].baseBudgetCr * Math.max(0.7, pmayMultiplier));

  // 2. Jal Jeevan Mission Impact
  const jjmGapPct = Math.max(0, 100 - inputs.tapWaterTargetPct);
  const jjmBeneficiariesM = (jjmGapPct / 100) * totalHouseholdsMillions * 0.65;
  const jjmMultiplier = 1 + (inputs.tapWaterTargetPct - 84.8) * 0.042;
  const jjmBudget = Math.round(POLICY_SCHEMES_CONFIG[1].baseBudgetCr * Math.max(0.75, jjmMultiplier));

  // 3. PM Surya Ghar Solar Impact
  const solarBeneficiariesM = (inputs.rooftopSolarTargetPct / 100) * totalHouseholdsMillions * 0.38;
  const solarMultiplier = 1 + (inputs.rooftopSolarTargetPct - 26.4) * 0.055;
  const solarBudget = Math.round(POLICY_SCHEMES_CONFIG[2].baseBudgetCr * Math.max(0.6, solarMultiplier));

  // 4. PM Ujjwala / Clean Fuel
  const ujjwalaMultiplier = 1 + (inputs.cleanCookingTargetPct - 89.2) * 0.028;
  const ujjwalaBudget = Math.round(POLICY_SCHEMES_CONFIG[3].baseBudgetCr * Math.max(0.8, ujjwalaMultiplier));

  // 5. Digital India Skill Hubs
  const digitalMultiplier = 1 + (inputs.digitalLiteracyTargetPct - 74.2) * 0.045;
  const digitalBudget = Math.round(POLICY_SCHEMES_CONFIG[4].baseBudgetCr * Math.max(0.7, digitalMultiplier));

  const baseTotalBudgetCr = POLICY_SCHEMES_CONFIG.reduce((acc, s) => acc + s.baseBudgetCr, 0);
  const modeledBudgets = [pmayBudget, jjmBudget, solarBudget, ujjwalaBudget, digitalBudget];
  const totalBudgetCr = modeledBudgets.reduce((acc, b) => acc + b, 0);

  // HDI Composite Formula Projection (0.644 base Indian 2021 index to ~0.760 target)
  const hdiScore = +(
    0.665 +
    (inputs.puccaHousingTargetPct / 100) * 0.035 +
    (inputs.tapWaterTargetPct / 100) * 0.025 +
    (inputs.cleanCookingTargetPct / 100) * 0.020 +
    (inputs.digitalLiteracyTargetPct / 100) * 0.035 +
    (inputs.urbanizationPct / 100) * 0.020
  ).toFixed(3);

  // Green Energy & Rural Jobs
  const greenEnergyJobsLakhs = +(
    12.4 +
    (inputs.rooftopSolarTargetPct / 10) * 2.8 +
    (inputs.urbanizationPct / 10) * 1.5
  ).toFixed(1);

  // Carbon Emission Avoidance in Million Tonnes (Solar + Clean Cooking transition)
  const carbonReductionMT = +(
    45.2 +
    (inputs.rooftopSolarTargetPct * 1.65) +
    (inputs.cleanCookingTargetPct * 0.45)
  ).toFixed(1);

  const schemes: SchemeProjectionResult[] = [
    {
      schemeName: POLICY_SCHEMES_CONFIG[0].schemeName,
      ministry: POLICY_SCHEMES_CONFIG[0].ministry,
      baseBudgetCr: POLICY_SCHEMES_CONFIG[0].baseBudgetCr,
      modeledBudgetCr: pmayBudget,
      deltaPct: +(((pmayBudget - POLICY_SCHEMES_CONFIG[0].baseBudgetCr) / POLICY_SCHEMES_CONFIG[0].baseBudgetCr) * 100).toFixed(1),
      projectedBeneficiariesMillions: +pmayBeneficiariesM.toFixed(1),
      highlightInsight: `Targets transition of ${pmayBeneficiariesM.toFixed(1)}M families into disaster-resilient concrete housing.`,
    },
    {
      schemeName: POLICY_SCHEMES_CONFIG[1].schemeName,
      ministry: POLICY_SCHEMES_CONFIG[1].ministry,
      baseBudgetCr: POLICY_SCHEMES_CONFIG[1].baseBudgetCr,
      modeledBudgetCr: jjmBudget,
      deltaPct: +(((jjmBudget - POLICY_SCHEMES_CONFIG[1].baseBudgetCr) / POLICY_SCHEMES_CONFIG[1].baseBudgetCr) * 100).toFixed(1),
      projectedBeneficiariesMillions: +jjmBeneficiariesM.toFixed(1),
      highlightInsight: `Covers ${inputs.tapWaterTargetPct}% of all rural & peri-urban habitations with 55 LPCD potable water.`,
    },
    {
      schemeName: POLICY_SCHEMES_CONFIG[2].schemeName,
      ministry: POLICY_SCHEMES_CONFIG[2].ministry,
      baseBudgetCr: POLICY_SCHEMES_CONFIG[2].baseBudgetCr,
      modeledBudgetCr: solarBudget,
      deltaPct: +(((solarBudget - POLICY_SCHEMES_CONFIG[2].baseBudgetCr) / POLICY_SCHEMES_CONFIG[2].baseBudgetCr) * 100).toFixed(1),
      projectedBeneficiariesMillions: +solarBeneficiariesM.toFixed(1),
      highlightInsight: `Powers ${solarBeneficiariesM.toFixed(1)}M roofs with up to 300 units of free zero-emission electricity.`,
    },
    {
      schemeName: POLICY_SCHEMES_CONFIG[3].schemeName,
      ministry: POLICY_SCHEMES_CONFIG[3].ministry,
      baseBudgetCr: POLICY_SCHEMES_CONFIG[3].baseBudgetCr,
      modeledBudgetCr: ujjwalaBudget,
      deltaPct: +(((ujjwalaBudget - POLICY_SCHEMES_CONFIG[3].baseBudgetCr) / POLICY_SCHEMES_CONFIG[3].baseBudgetCr) * 100).toFixed(1),
      projectedBeneficiariesMillions: 28.5,
      highlightInsight: `Eliminates indoor kitchen smoke pollution for women and children across tribal & rural belts.`,
    },
    {
      schemeName: POLICY_SCHEMES_CONFIG[4].schemeName,
      ministry: POLICY_SCHEMES_CONFIG[4].ministry,
      baseBudgetCr: POLICY_SCHEMES_CONFIG[4].baseBudgetCr,
      modeledBudgetCr: digitalBudget,
      deltaPct: +(((digitalBudget - POLICY_SCHEMES_CONFIG[4].baseBudgetCr) / POLICY_SCHEMES_CONFIG[4].baseBudgetCr) * 100).toFixed(1),
      projectedBeneficiariesMillions: 55.0,
      highlightInsight: `Establishes 50,000 new Gram Panchayat Digital Seva Kendras for AI & digital financial literacy.`,
    },
  ];

  return {
    totalBudgetCr,
    baseTotalBudgetCr,
    budgetDifferenceCr: totalBudgetCr - baseTotalBudgetCr,
    hdiProjection: hdiScore,
    greenEnergyJobsLakhs,
    carbonReductionMT,
    schemes,
  };
};
