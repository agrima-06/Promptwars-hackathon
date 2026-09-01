export interface NationalMetricSummary {
  totalProjectedPopulation: string;
  totalCensusHouses: string;
  digitalSelfEnumTarget: string;
  jalJeevanCoverage: string;
  cleanCookingUjjwala: string;
  solarRooftopSuryaGhar: string;
  puccaHousingRate: string;
  digitalLiteracyRate: string;
}

export const NATIONAL_METRICS: NationalMetricSummary = {
  totalProjectedPopulation: '1.442 Billion',
  totalCensusHouses: '335 Million',
  digitalSelfEnumTarget: '65.0%',
  jalJeevanCoverage: '84.8%',
  cleanCookingUjjwala: '89.2%',
  solarRooftopSuryaGhar: '26.4%',
  puccaHousingRate: '81.5%',
  digitalLiteracyRate: '74.2%',
};

export interface HousingTypeDistribution {
  category: string;
  percentage2011: number;
  projected2027: number;
  color: string;
}

export const HOUSING_STRUCTURE_TRENDS: HousingTypeDistribution[] = [
  { category: 'Pucca (RCC Concrete / Stone)', percentage2011: 53.0, projected2027: 81.5, color: '#10B981' },
  { category: 'Semi-Pucca (Tiled / Timber)', percentage2011: 30.0, projected2027: 13.8, color: '#3B82F6' },
  { category: 'Kutcha (Traditional / Mud)', percentage2011: 17.0, projected2027: 4.7, color: '#F59E0B' },
];

export interface CleanEnergyWaterTrend {
  year: string;
  tapWaterPct: number;
  lpgCookingPct: number;
  rooftopSolarPct: number;
  internetAccessPct: number;
}

export const NATIONAL_PROGRESS_TIMELINE: CleanEnergyWaterTrend[] = [
  { year: '2011', tapWaterPct: 30.8, lpgCookingPct: 28.5, rooftopSolarPct: 0.8, internetAccessPct: 3.1 },
  { year: '2016', tapWaterPct: 42.0, lpgCookingPct: 48.0, rooftopSolarPct: 2.5, internetAccessPct: 18.5 },
  { year: '2021', tapWaterPct: 62.5, lpgCookingPct: 74.0, rooftopSolarPct: 9.8, internetAccessPct: 47.0 },
  { year: '2025', tapWaterPct: 78.4, lpgCookingPct: 85.2, rooftopSolarPct: 19.5, internetAccessPct: 68.0 },
  { year: '2027 (Est)', tapWaterPct: 88.5, lpgCookingPct: 92.0, rooftopSolarPct: 32.0, internetAccessPct: 79.5 },
];

export interface SchemeAllocationModel {
  schemeName: string;
  ministry: string;
  baseBudgetCr: number; // in ₹ Crores
  targetMetric: string;
  allocationFactor: number; // sensitivity multiplier
  unitCostPerBeneficiary: number; // in ₹
}

export const POLICY_SCHEMES_CONFIG: SchemeAllocationModel[] = [
  {
    schemeName: 'Pradhan Mantri Awas Yojana (PMAY-G & U)',
    ministry: 'Ministry of Housing & Rural Development',
    baseBudgetCr: 80671,
    targetMetric: 'Kutcha to Pucca Conversion Need',
    allocationFactor: 1.85,
    unitCostPerBeneficiary: 130000,
  },
  {
    schemeName: 'Jal Jeevan Mission (Har Ghar Jal)',
    ministry: 'Ministry of Jal Shakti',
    baseBudgetCr: 70163,
    targetMetric: 'Treated Tap Water Gap',
    allocationFactor: 1.45,
    unitCostPerBeneficiary: 22000,
  },
  {
    schemeName: 'PM Surya Ghar: Muft Bijli Yojana',
    ministry: 'Ministry of New & Renewable Energy',
    baseBudgetCr: 75021,
    targetMetric: 'Rooftop Solar Penetration',
    allocationFactor: 2.10,
    unitCostPerBeneficiary: 78000,
  },
  {
    schemeName: 'PM Ujjwala Yojana & PNG Expansion',
    ministry: 'Ministry of Petroleum & Natural Gas',
    baseBudgetCr: 12500,
    targetMetric: 'Clean Cooking Fuel Access',
    allocationFactor: 0.95,
    unitCostPerBeneficiary: 3200,
  },
  {
    schemeName: 'Digital India & BharatNet Skill Hubs',
    ministry: 'Ministry of Electronics & IT',
    baseBudgetCr: 18900,
    targetMetric: 'Rural Digital Literacy Gap',
    allocationFactor: 1.30,
    unitCostPerBeneficiary: 4500,
  },
];
