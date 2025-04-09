// Define outcome metrics that will be affected by drivers
export const outcomeMetrics = {
  // Financial Metrics
  revenue: { label: "Total Revenue", unit: "$M", baseline: 245.8 },
  ebitda: { label: "EBITDA", unit: "$M", baseline: 98.3 },
  perCapita: { label: "Per Capita Spending", unit: "$", baseline: 76.81 },
  
  // Operational Metrics
  attendance: { label: "Total Attendance", unit: "M", baseline: 3.2 },
  operatingDays: { label: "Operating Days", unit: "days", baseline: 365 },
  
  // Cost Metrics
  laborCost: { label: "Labor Cost", unit: "$M", baseline: 82.5 },
  energyCost: { label: "Energy Cost", unit: "$M", baseline: 18.6 },
  maintenanceCost: { label: "Maintenance Cost", unit: "$M", baseline: 24.3 },
  marketingCost: { label: "Marketing Cost", unit: "$M", baseline: 15.8 },
  
  // Customer Metrics
  satisfaction: { label: "Customer Satisfaction", unit: "%", baseline: 85 },
  operationalEfficiency: { label: "Operational Efficiency", unit: "%", baseline: 75 }
}

export interface MetricDefinition {
  label: string
  unit: string
  baseline: number
  category: "financial" | "operational" | "cost" | "environmental" | "external" | "sustainability"
}

export const metrics: Record<string, MetricDefinition> = {
  // Financial Metrics
  revenue: {
    label: "Revenue",
    unit: "$M",
    baseline: 125.4,
    category: "financial"
  },
  ebitda: {
    label: "EBITDA",
    unit: "$M",
    baseline: 42.8,
    category: "financial"
  },
  attendance: {
    label: "Attendance",
    unit: "K",
    baseline: 850,
    category: "operational"
  },
  energyCost: {
    label: "Energy Cost",
    unit: "$M",
    baseline: 18.6,
    category: "cost"
  },
  
  // Environmental Impact Metrics
  waterConsumption: {
    label: "Water Consumption",
    unit: "M³",
    baseline: 125000,
    category: "environmental"
  },
  wasteManagement: {
    label: "Waste Management",
    unit: "tons",
    baseline: 850,
    category: "environmental"
  },
  carbonEmissions: {
    label: "Carbon Emissions",
    unit: "tons CO2e",
    baseline: 12500,
    category: "environmental"
  },
  renewableEnergy: {
    label: "Renewable Energy",
    unit: "%",
    baseline: 45,
    category: "environmental"
  },
  
  // Weather Impact Metrics
  temperature: {
    label: "Temperature",
    unit: "°C",
    baseline: 25,
    category: "external"
  },
  rainfall: {
    label: "Rainfall",
    unit: "mm",
    baseline: 75,
    category: "external"
  },
  weather: {
    label: "Weather Index",
    unit: "index",
    baseline: 100,
    category: "external"
  },
  
  // Circular Economy Metrics
  materialRecovery: {
    label: "Material Recovery",
    unit: "tons",
    baseline: 1250,
    category: "sustainability"
  },
  recycling: {
    label: "Recycling Rate",
    unit: "%",
    baseline: 68,
    category: "sustainability"
  },
  reuse: {
    label: "Reuse Rate",
    unit: "%",
    baseline: 45,
    category: "sustainability"
  }
}

