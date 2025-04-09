// Common types used across the application

export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
  type: "alert" | "info" | "warning" | "success"
}

export interface Property {
  id: string
  name: string
  location: string
  code: string
  type: string
}

export interface AttendanceData {
  date: string
  value: number
  forecast?: number
  breakEven?: number
}

export interface RevenueData {
  date: string
  value: number
  forecast?: number
}

export interface FinancialMetric {
  id: string
  name: string
  value: number | string
  change?: number
  changeLabel?: string
  trend?: "up" | "down" | "neutral"
  trendColor?: "green" | "red" | "yellow" | "blue" | "gray"
}

export interface ScenarioDriver {
  id: string
  name: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  impact: "high" | "medium" | "low"
}

export interface ScenarioAssumption {
  id: string
  category: string
  description: string
  value: string | number
  unit?: string
  source?: string
  lastUpdated: string
  notes?: string
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
  description?: string
  createdAt: string
  updatedAt: string
  drivers: ScenarioDriver[]
  results: {
    attendance: number
    revenue: number
    ebitda: number
    [key: string]: number
  }
  assumptions: ScenarioAssumption[]
  versions: ScenarioVersion[]
  status: "draft" | "pending_review" | "approved" | "rejected"
  approvedBy?: string
  approvedAt?: string
  rejectedBy?: string
  rejectedAt?: string
  rejectionReason?: string
}

export interface WeatherForecast {
  property: string
  location: string
  date: string
  temperature: number
  condition: string
  impact: "high" | "medium" | "low" | "none"
  attendanceImpact: number
  revenueImpact: number
  energyImpact: number
}

export interface WeatherImpact {
  impact: number
  attendance: number
  revenue: number
}

export interface MonthlyWeatherImpact extends WeatherImpact {
  month: string
}

export interface SeasonalWeatherImpact extends WeatherImpact {
  season: string
}

export interface PropertyWeatherImpact {
  monthly: MonthlyWeatherImpact[]
  seasonal: SeasonalWeatherImpact[]
}

export interface WeatherAdaptationStrategy {
  id: string
  name: string
  description: string
  cost: number
  effectiveness: number
  implementationTime: string
  weatherConditions: string[]
}

export interface StrategicInitiative {
  id: string
  name: string
  owner: string
  progress: number
  status: "on-track" | "at-risk" | "delayed" | "completed"
}

export interface EnergyMetrics {
  totalConsumption: number // MWh
  renewablePercentage: number
  efficiencyScore: number
  costSavings: number // USD
  yearOverYearChange: number
  byAttraction: {
    name: string
    consumption: number
    efficiency: number
  }[]
}

export interface WasteMetrics {
  totalWaste: number // tons
  recyclingRate: number
  landfillDiversion: number
  compostingRate: number
  yearOverYearChange: number
  byCategory: {
    name: string
    amount: number
    recycled: number
  }[]
}

export interface CarbonFootprint {
  totalEmissions: number // tons CO2e
  scope1Emissions: number
  scope2Emissions: number
  scope3Emissions: number
  yearOverYearChange: number
  reductionTarget: number // percentage
  bySource: {
    name: string
    emissions: number
    percentage: number
  }[]
}

export interface ESGInitiative {
  name: string
  status: string
  impact: "High" | "Medium" | "Low"
}

export interface ESGMetrics {
  environmental: {
    score: number
    initiatives: ESGInitiative[]
  }
  social: {
    score: number
    initiatives: ESGInitiative[]
  }
  governance: {
    score: number
    initiatives: ESGInitiative[]
  }
}

export interface SustainabilityGoal {
  name: string
  current: number
  target: number
  unit: string
}

export interface SustainabilityGoals {
  shortTerm: SustainabilityGoal[]
  longTerm: SustainabilityGoal[]
}

export interface WaterConservationMetrics {
  totalUsage: number // in cubic meters
  efficiencyScore: number
  costSavings: number // in USD
  yearOverYearChange: number
  byAttraction: {
    name: string
    usage: number
    efficiency: number
  }[]
  conservationInitiatives: {
    name: string
    status: "Planning" | "In Progress" | "Completed"
    impact: "High" | "Medium" | "Low"
    roi: number // Return on investment percentage
  }[]
}

export interface CircularEconomyMetrics {
  materialRecovery: {
    total: number // tons
    percentage: number
    yearOverYearChange: number
  }
  byMaterial: {
    name: string
    amount: number
    recycled: number
    reused: number
  }[]
  initiatives: {
    name: string
    status: "Planning" | "In Progress" | "Completed"
    impact: "High" | "Medium" | "Low"
    savings: number // in USD
  }[]
}

export interface RenewableEnergyMetrics {
  totalCapacity: number // kW
  currentOutput: number // kW
  percentageOfTotal: number
  installations: {
    name: string
    type: string
    capacity: number
    output: number
    roi: number
    paybackPeriod: number // years
  }[]
}

export interface GuestSustainabilityMetrics {
  awarenessScore: number
  participationRate: number
  initiatives: {
    name: string
    participation: number
    impact: number // CO2e saved
    feedback: number // satisfaction score
  }[]
}

export interface GreenInvestmentMetrics {
  totalInvestment: number
  projects: {
    name: string
    category: string
    investment: number
    paybackPeriod: number
    roi: number
    status: "Planning" | "In Progress" | "Completed"
  }[]
}

export interface FoodWasteMetrics {
  totalWaste: number // tons
  byOutlet: {
    name: string
    waste: number
    reduction: number
    costSavings: number
  }[]
  reductionStrategies: {
    name: string
    effectiveness: number
    costSavings: number
    status: "Planning" | "In Progress" | "Completed"
  }[]
}

export interface SustainableTransportMetrics {
  guestTransport: {
    mode: string
    percentage: number
    emissions: number
    efficiency: number
  }[]
  employeeTransport: {
    mode: string
    percentage: number
    emissions: number
    efficiency: number
  }[]
  initiatives: {
    name: string
    impact: number
    status: "Planning" | "In Progress" | "Completed"
  }[]
}

export interface BiodiversityMetrics {
  habitats: {
    name: string
    area: number
    species: number
    conservationStatus: string
  }[]
  initiatives: {
    name: string
    impact: number
    status: "Planning" | "In Progress" | "Completed"
  }[]
}

export interface PlasticReductionMetrics {
  totalUsage: number // tons
  byCategory: {
    name: string
    usage: number
    reduction: number
    alternatives: string[]
  }[]
  initiatives: {
    name: string
    reduction: number
    costImpact: number
    status: "Planning" | "In Progress" | "Completed"
  }[]
}

export interface CommunityImpactMetrics {
  socialInitiatives: {
    name: string
    beneficiaries: number
    impact: number
    status: "Planning" | "In Progress" | "Completed"
  }[]
  economicImpact: {
    category: string
    value: number
    beneficiaries: number
  }[]
}

export interface ClimateRiskMetrics {
  risks: {
    category: string
    likelihood: number
    impact: number
    mitigation: string
    status: "Addressed" | "In Progress" | "To Be Addressed"
  }[]
  adaptationStrategies: {
    name: string
    effectiveness: number
    cost: number
    status: "Implemented" | "Planned" | "Under Review"
  }[]
}

export interface SustainabilityCommunicationMetrics {
  awareness: {
    channel: string
    reach: number
    effectiveness: number
  }[]
  engagement: {
    initiative: string
    participation: number
    feedback: number
  }[]
}

export interface WeatherBasedEnergyMetrics {
  patterns: {
    condition: string
    consumption: number
    efficiency: number
    recommendations: string[]
  }[]
  optimizationStrategies: {
    condition: string
    strategy: string
    potentialSavings: number
    implementationCost: number
  }[]
}

export interface SustainabilityData {
  energyMetrics: EnergyMetrics
  wasteMetrics: WasteMetrics
  carbonFootprint: CarbonFootprint
  esgMetrics: ESGMetrics
  sustainabilityGoals: SustainabilityGoals
  waterConservation: WaterConservationMetrics
  circularEconomy: CircularEconomyMetrics
  renewableEnergy: RenewableEnergyMetrics
  guestSustainability: GuestSustainabilityMetrics
  greenInvestment: GreenInvestmentMetrics
  foodWaste: FoodWasteMetrics
  sustainableTransport: SustainableTransportMetrics
  biodiversity: BiodiversityMetrics
  plasticReduction: PlasticReductionMetrics
  communityImpact: CommunityImpactMetrics
  climateRisk: ClimateRiskMetrics
  sustainabilityCommunication: SustainabilityCommunicationMetrics
  weatherBasedEnergy: WeatherBasedEnergyMetrics
}

// Seasonal data types
export interface MonthlyData {
  month: string
  attendance: number
  revenue: number
  operatingDays: number
  peakDays: number
}

export interface SeasonalData {
  season: string
  attendance: number
  revenue: number
  operatingDays: number
  peakDays: number
}

export interface PeakPeriod {
  name: string
  startDate: string
  endDate: string
  expectedAttendance: number
}

export interface OperatingHours {
  month: string
  weekday: string
  weekend: string
}

export interface PropertySeasonalData {
  monthly: MonthlyData[]
  seasonal: SeasonalData[]
  peakPeriods: PeakPeriod[]
  operatingHours: OperatingHours[]
}

export interface SeasonalOptimizationStrategy {
  id: string
  name: string
  description: string
  cost: number
  effectiveness: number
  implementationTime: string
  seasonalApplicability: string[]
}

export interface RegulatoryRequirement {
  id: string
  name: string
  category: "Environmental" | "Safety" | "Labor" | "Financial" | "Data"
  jurisdiction: string
  status: "Compliant" | "Non-Compliant" | "In Progress" | "Not Applicable"
  dueDate: string
  lastReviewDate: string
  nextReviewDate: string
  documentation: {
    name: string
    status: "Complete" | "In Progress" | "Missing"
    lastUpdated: string
  }[]
  notes: string
}

export interface ComplianceMetrics {
  overallScore: number
  byCategory: {
    category: string
    score: number
    requirements: number
    compliant: number
    nonCompliant: number
    inProgress: number
  }[]
  recentUpdates: {
    requirement: string
    date: string
    change: string
  }[]
}

export interface StakeholderReport {
  id: string
  name: string
  type: "ESG" | "Financial" | "Sustainability" | "Compliance"
  audience: "Investors" | "Regulators" | "Employees" | "Community" | "Customers"
  frequency: "Annual" | "Quarterly" | "Monthly"
  lastPublished: string
  nextDue: string
  status: "Draft" | "In Review" | "Published" | "Overdue"
  metrics: {
    category: string
    metrics: string[]
  }[]
  template: string
}

