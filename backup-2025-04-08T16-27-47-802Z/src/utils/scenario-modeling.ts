import { ScenarioVariable, ScenarioImpact, ScenarioResult, ScenarioComparison } from './scenario-modeling/types';

// Define outcome metrics
export const outcomeMetrics = {
  revenue: {
    label: "Revenue",
    unit: "$",
    baseline: 1000000
  },
  attendance: {
    label: "Attendance",
    unit: "visitors",
    baseline: 10000
  },
  satisfaction: {
    label: "Customer Satisfaction",
    unit: "%",
    baseline: 85
  },
  operationalEfficiency: {
    label: "Operational Efficiency",
    unit: "%",
    baseline: 75
  }
};

// Define driver categories and their specific drivers
export const driverCategories = {
  cost: {
    label: "Cost Drivers",
    drivers: {
      labor: { label: "Labor Costs", defaultValue: 0, unit: "%" },
      maintenance: { label: "Maintenance Costs", defaultValue: 0, unit: "%" },
      energy: { label: "Energy Costs", defaultValue: 0, unit: "%" },
      administrative: { label: "Administrative Costs", defaultValue: 0, unit: "%" },
      marketing: { label: "Marketing Costs", defaultValue: 0, unit: "%" },
      foodBeverage: { label: "F&B Costs", defaultValue: 0, unit: "%" },
      retail: { label: "Retail Costs", defaultValue: 0, unit: "%" },
      entertainment: { label: "Entertainment Costs", defaultValue: 0, unit: "%" },
      technology: { label: "Technology Costs", defaultValue: 0, unit: "%" },
      ipLicensing: { label: "IP Licensing Costs", defaultValue: 0, unit: "%" },
      facility: { label: "Facility Costs", defaultValue: 0, unit: "%" },
    },
  },
  revenue: {
    label: "Revenue Drivers",
    drivers: {
      admission: { label: "Admission Revenue", defaultValue: 0, unit: "%" },
      foodBeverage: { label: "F&B Revenue", defaultValue: 0, unit: "%" },
      retail: { label: "Retail Revenue", defaultValue: 0, unit: "%" },
      media: { label: "Media Revenue", defaultValue: 0, unit: "%" },
      premiumExperience: { label: "Premium Experience Revenue", defaultValue: 0, unit: "%" },
      ancillary: { label: "Ancillary Revenue", defaultValue: 0, unit: "%" },
      event: { label: "Event Revenue", defaultValue: 0, unit: "%" },
      partnership: { label: "Partnership Revenue", defaultValue: 0, unit: "%" },
      accommodation: { label: "Accommodation Revenue", defaultValue: 0, unit: "%" },
      digital: { label: "Digital Revenue", defaultValue: 0, unit: "%" },
    },
  },
  external: {
    label: "External Drivers",
    drivers: {
      weather: { label: "Weather Factors", defaultValue: 0, unit: "impact" },
      economic: { label: "Economic Factors", defaultValue: 0, unit: "impact" },
      competitive: { label: "Competitive Factors", defaultValue: 0, unit: "impact" },
      seasonal: { label: "Seasonal Factors", defaultValue: 0, unit: "impact" },
      regulatory: { label: "Regulatory Factors", defaultValue: 0, unit: "impact" },
      travel: { label: "Travel Factors", defaultValue: 0, unit: "impact" },
      health: { label: "Health Factors", defaultValue: 0, unit: "impact" },
      social: { label: "Social Factors", defaultValue: 0, unit: "impact" },
      technological: { label: "Technological Factors", defaultValue: 0, unit: "impact" },
    },
  },
}

interface MetricDefinition {
  label: string;
  unit: string;
  baseline: number;
  value?: number;
  percentChange?: number;
}

interface Metrics {
  [key: string]: MetricDefinition;
}

interface OutcomeDefinition {
  [key: string]: string[];
}

interface OutcomeValues {
  [key: string]: number;
}

interface DriverImpact {
  [key: string]: {
    value: number;
    percentChange: number;
  };
}

export const metrics: Metrics = {
  attendance: { label: 'Attendance', unit: 'visitors', baseline: 1000 },
  revenue: { label: 'Revenue', unit: 'USD', baseline: 50000 },
  perCapita: { label: 'Per Capita Spending', unit: 'USD', baseline: 50 },
  operatingDays: { label: 'Operating Days', unit: 'days', baseline: 365 },
  laborCost: { label: 'Labor Cost', unit: 'USD', baseline: 20000 },
  energyCost: { label: 'Energy Cost', unit: 'USD', baseline: 5000 },
  maintenanceCost: { label: 'Maintenance Cost', unit: 'USD', baseline: 3000 },
  marketingCost: { label: 'Marketing Cost', unit: 'USD', baseline: 10000 },
};

export const outcomes: OutcomeDefinition = {
  'cost.labor': ['ebitda', 'laborCost'],
  'cost.energy': ['ebitda', 'energyCost'],
  'cost.maintenance': ['ebitda', 'maintenanceCost'],
  'cost.marketing': ['ebitda', 'marketingCost'],
  'external.weather': ['attendance', 'energyCost'],
};

// Define the impact relationships between drivers and outcomes
export const driverOutcomeRelationships = {
  // Cost Drivers
  "cost.labor": ["ebitda", "laborCost"],
  "cost.energy": ["ebitda", "energyCost"],
  "cost.maintenance": ["ebitda", "maintenanceCost"],
  "cost.marketing": ["ebitda", "marketingCost", "attendance", "revenue"],
  "cost.administrative": ["ebitda"],
  "cost.foodBeverage": ["ebitda", "perCapita"],
  "cost.retail": ["ebitda", "perCapita"],
  "cost.entertainment": ["ebitda", "attendance"],
  "cost.technology": ["ebitda", "perCapita"],
  "cost.ipLicensing": ["ebitda", "attendance"],
  "cost.facility": ["ebitda"],

  // Revenue Drivers
  "revenue.admission": ["revenue", "perCapita", "ebitda"],
  "revenue.foodBeverage": ["revenue", "perCapita", "ebitda"],
  "revenue.retail": ["revenue", "perCapita", "ebitda"],
  "revenue.media": ["revenue", "perCapita", "ebitda"],
  "revenue.premiumExperience": ["revenue", "perCapita", "ebitda"],
  "revenue.ancillary": ["revenue", "perCapita", "ebitda"],
  "revenue.event": ["revenue", "attendance", "ebitda"],
  "revenue.partnership": ["revenue", "ebitda"],
  "revenue.accommodation": ["revenue", "ebitda"],
  "revenue.digital": ["revenue", "perCapita", "ebitda"],

  // External Drivers
  "external.weather": ["attendance", "revenue", "operatingDays", "ebitda", "energyCost"],
  "external.economic": ["attendance", "revenue", "perCapita", "ebitda"],
  "external.competitive": ["attendance", "revenue", "perCapita"],
  "external.seasonal": ["attendance", "revenue", "operatingDays"],
  "external.regulatory": ["ebitda", "laborCost", "operatingDays"],
  "external.travel": ["attendance", "revenue"],
  "external.health": ["attendance", "revenue", "operatingDays"],
  "external.social": ["attendance", "revenue", "perCapita"],
  "external.technological": ["perCapita", "revenue", "ebitda"],
}

// Impact factors - how much each driver affects each outcome
export const impactFactors = {
  "cost.labor.ebitda": -0.8,
  "cost.labor.laborCost": 1.0,
  "cost.energy.ebitda": -0.3,
  "cost.energy.energyCost": 1.0,
  "cost.maintenance.ebitda": -0.4,
  "cost.maintenance.maintenanceCost": 1.0,
  "cost.marketing.ebitda": -0.2,
  "cost.marketing.marketingCost": 1.0,
  "cost.marketing.attendance": 0.5,
  "cost.marketing.revenue": 0.4,
  // ... more impact factors would be defined here

  "revenue.admission.revenue": 0.45,
  "revenue.admission.perCapita": 0.6,
  "revenue.admission.ebitda": 0.5,
  "revenue.foodBeverage.revenue": 0.25,
  "revenue.foodBeverage.perCapita": 0.3,
  "revenue.foodBeverage.ebitda": 0.2,
  // ... more impact factors would be defined here

  "external.weather.attendance": -0.3,
  "external.weather.revenue": -0.25,
  "external.weather.operatingDays": -0.15,
  "external.weather.ebitda": -0.35,
  "external.weather.energyCost": 0.2,
  // ... more impact factors would be defined here
}

// Calculate the impact of driver changes on outcomes
export function calculateOutcomes(driverValues: Record<string, number>) {
  const outcomes = { ...metrics }

  // Initialize outcome values with baseline
  Object.keys(outcomes).forEach((key) => {
    outcomes[key].value = outcomes[key].baseline
    outcomes[key].percentChange = 0
  })

  // Apply driver impacts to outcomes
  Object.entries(driverValues).forEach(([driverId, value]) => {
    const affectedOutcomes = driverOutcomeRelationships[driverId] || []

    affectedOutcomes.forEach((outcomeId) => {
      const impactKey = `${driverId}.${outcomeId}`
      const impactFactor = impactFactors[impactKey] || 0

      // Calculate the impact on the outcome
      const impact = (value / 100) * impactFactor * outcomes[outcomeId].baseline
      outcomes[outcomeId].value += impact
      outcomes[outcomeId].percentChange = (outcomes[outcomeId].value / outcomes[outcomeId].baseline - 1) * 100
    })
  })

  return outcomes
}

// Scenario type definition
export interface Scenario {
  id: string
  name: string
  description: string
  lastUpdated: string
  type: "baseline" | "optimistic" | "conservative" | "weather" | "custom"
  scope: "all" | "specific"
  driverValues: Record<string, number>
  outcomes: Record<string, any>
}

// Sample scenarios
export const sampleScenarios: Scenario[] = [
  {
    id: "baseline-2025",
    name: "Baseline 2025",
    description: "Standard projection for 2025 season",
    lastUpdated: "Apr 2, 2025",
    type: "baseline",
    scope: "all",
    driverValues: {},
    outcomes: {
      attendance: { value: 3.2, percentChange: 0 },
      revenue: { value: 245.8, percentChange: 0 },
      perCapita: { value: 76.81, percentChange: 0 },
      operatingDays: { value: 365, percentChange: 0 },
      ebitda: { value: 98.3, percentChange: 0 },
    },
  },
  {
    id: "optimistic-growth",
    name: "Optimistic Growth",
    description: "Projection with favorable conditions",
    lastUpdated: "Apr 1, 2025",
    type: "optimistic",
    scope: "all",
    driverValues: {
      "revenue.admission": 8.5,
      "revenue.foodBeverage": 3.8,
      "revenue.retail": 2.5,
      "revenue.premiumExperience": 15.0,
      "external.economic": 5.0,
      "external.seasonal": 3.0,
    },
    outcomes: {
      attendance: { value: 3.5, percentChange: 9.4 },
      revenue: { value: 275.2, percentChange: 12.0 },
      perCapita: { value: 78.63, percentChange: 2.4 },
      operatingDays: { value: 365, percentChange: 0 },
      ebitda: { value: 115.6, percentChange: 17.6 },
    },
  },
  {
    id: "conservative-outlook",
    name: "Conservative Outlook",
    description: "Projection with cautious assumptions",
    lastUpdated: "Mar 28, 2025",
    type: "conservative",
    scope: "all",
    driverValues: {
      "revenue.admission": -5.0,
      "revenue.foodBeverage": -2.0,
      "external.economic": -3.0,
      "external.competitive": 4.0,
      "cost.labor": 3.2,
      "cost.energy": 2.8,
    },
    outcomes: {
      attendance: { value: 2.9, percentChange: -9.4 },
      revenue: { value: 220.1, percentChange: -10.5 },
      perCapita: { value: 75.9, percentChange: -1.2 },
      operatingDays: { value: 350, percentChange: -4.1 },
      ebitda: { value: 82.5, percentChange: -16.1 },
    },
  },
  {
    id: "weather-impact",
    name: "Weather Impact Analysis",
    description: "Projection with adverse weather conditions",
    lastUpdated: "Mar 25, 2025",
    type: "weather",
    scope: "all",
    driverValues: {
      "external.weather": 8.0,
      "cost.energy": 5.0,
    },
    outcomes: {
      attendance: { value: 2.8, percentChange: -12.5 },
      revenue: { value: 212.4, percentChange: -13.6 },
      perCapita: { value: 75.86, percentChange: -1.2 },
      operatingDays: { value: 345, percentChange: -5.5 },
      ebitda: { value: 76.4, percentChange: -22.3 },
    },
  },
]

export function calculateScenarioImpact(
  variables: Record<string, ScenarioVariable>,
  baselineMetrics: Record<string, number>
): ScenarioImpact[] {
  const impacts: ScenarioImpact[] = [];

  Object.entries(variables).forEach(([key, variable]) => {
    if (typeof variable.value === 'number' && baselineMetrics[key]) {
      const difference = variable.value - baselineMetrics[key];
      const percentage = (difference / baselineMetrics[key]) * 100;

      impacts.push({
        metric: key,
        value: Math.abs(difference),
        unit: variable.type === 'percentage' ? '%' : 'units',
        direction: difference > 0 ? 'increase' : 'decrease',
      });
    }
  });

  return impacts;
}

export function compareScenarios(
  baseline: ScenarioResult,
  comparison: ScenarioResult
): ScenarioComparison {
  const differences: Record<string, { absolute: number; percentage: number }> = {};

  baseline.impacts.forEach((baselineImpact) => {
    const comparisonImpact = comparison.impacts.find(
      (imp) => imp.metric === baselineImpact.metric
    );

    if (comparisonImpact) {
      const absolute = comparisonImpact.value - baselineImpact.value;
      const percentage = (absolute / baselineImpact.value) * 100;

      differences[baselineImpact.metric] = {
        absolute,
        percentage,
      };
    }
  });

  return {
    baseline,
    comparison,
    differences,
  };
}

export function validateScenarioVariables(
  variables: Record<string, ScenarioVariable>
): string[] {
  const errors: string[] = [];

  Object.entries(variables).forEach(([key, variable]) => {
    if (variable.type === 'number' || variable.type === 'percentage') {
      if (typeof variable.value !== 'number') {
        errors.push(`${key} must be a number`);
      } else if (variable.min !== undefined && variable.value < variable.min) {
        errors.push(`${key} must be greater than or equal to ${variable.min}`);
      } else if (variable.max !== undefined && variable.value > variable.max) {
        errors.push(`${key} must be less than or equal to ${variable.max}`);
      }
    } else if (variable.type === 'boolean' && typeof variable.value !== 'boolean') {
      errors.push(`${key} must be a boolean`);
    } else if (variable.type === 'string' && typeof variable.value !== 'string') {
      errors.push(`${key} must be a string`);
    }
  });

  return errors;
}

export function calculateOutcomeImpacts(
  variableId: string,
  value: number,
  baselineValue: number
): OutcomeValues {
  const impacts: OutcomeValues = {};
  const outcomeMetrics = outcomes[variableId as keyof typeof outcomes];

  if (!outcomeMetrics) {
    return impacts;
  }

  outcomeMetrics.forEach((metricId: string) => {
    const metric = metrics[metricId as keyof typeof metrics];
    if (metric && typeof metric.baseline === 'number') {
      const difference = value - baselineValue;
      const percentage = (difference / baselineValue) * 100;
      impacts[`${variableId}.${metricId}`] = percentage;
    }
  });

  return impacts;
}

export function calculateDriverImpacts(
  driverValues: Record<string, number>
): DriverImpact {
  const impacts: DriverImpact = {};

  Object.entries(driverValues).forEach(([driverId, value]) => {
    const metric = metrics[driverId as keyof typeof metrics];
    if (metric && typeof metric.baseline === 'number') {
      const difference = value - metric.baseline;
      const percentChange = (difference / metric.baseline) * 100;

      impacts[driverId] = {
        value: difference,
        percentChange,
      };
    }
  });

  return impacts;
}

