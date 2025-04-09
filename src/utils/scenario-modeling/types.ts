// Scenario type definition
export interface ScenarioAssumption {
  id: string
  title: string
  description: string
  createdAt: string
}

export interface ScenarioVersion {
  id: string
  version: number
  createdAt: string
  createdBy: string
  changes: string
  scenario: Scenario
}

export interface Scenario {
  id: string
  name: string
  description: string
  lastUpdated: string
  type: "baseline" | "optimistic" | "conservative" | "weather" | "custom"
  scope: "all" | "specific"
  driverValues: Record<string, number>
  outcomes: Record<string, any>
  assumptions: ScenarioAssumption[]
  versions: ScenarioVersion[]
  status: "draft" | "pending_review" | "approved" | "rejected"
  approvedBy?: string
  approvedAt?: string
  rejectedBy?: string
  rejectedAt?: string
  rejectionReason?: string
}

export interface ScenarioVariable {
  id: string;
  name: string;
  type: 'number' | 'percentage' | 'boolean' | 'string';
  value: number | boolean | string;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
}

export interface ScenarioImpact {
  metric: string;
  value: number;
  unit: string;
  direction: 'increase' | 'decrease';
}

export interface ScenarioResult {
  id: string;
  name: string;
  variables: Record<string, ScenarioVariable>;
  impacts: ScenarioImpact[];
  timestamp: string;
  version: number;
}

export interface ScenarioComparison {
  baseline: ScenarioResult;
  comparison: ScenarioResult;
  differences: Record<string, {
    absolute: number;
    percentage: number;
  }>;
}

