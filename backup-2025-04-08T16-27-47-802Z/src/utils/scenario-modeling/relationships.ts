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

export const relationships: Record<string, number> = {
  // Financial Relationships
  "revenue.tickets.attendance": 1.0,
  "revenue.tickets.price": 1.0,
  "revenue.food.attendance": 0.8,
  "revenue.retail.attendance": 0.6,
  "cost.labor.attendance": 0.7,
  "cost.maintenance.attendance": 0.4,
  "cost.energy.attendance": 0.5,
  "cost.energy.energyCost": 1.0,
  "cost.energy.ebitda": -0.3,
  "cost.energy.waterConsumption": 0.4,
  "cost.energy.wasteManagement": 0.3,
  
  // Environmental Impact Relationships
  "external.weather.energyCost": 0.2,
  "external.weather.waterConsumption": 0.3,
  "external.weather.attendance": -0.15,
  "external.temperature.energyCost": 0.25,
  "external.temperature.waterConsumption": 0.2,
  "external.temperature.attendance": -0.1,
  "external.rainfall.waterConsumption": 0.4,
  "external.rainfall.attendance": -0.2,
  
  // Sustainability Metrics Relationships
  "sustainability.waterConsumption.energyCost": 0.3,
  "sustainability.waterConsumption.wasteManagement": 0.2,
  "sustainability.wasteManagement.energyCost": 0.25,
  "sustainability.renewableEnergy.energyCost": -0.4,
  "sustainability.renewableEnergy.carbonEmissions": -0.5,
  "sustainability.carbonEmissions.energyCost": 0.35,
  "sustainability.carbonEmissions.wasteManagement": 0.3,
  
  // Circular Economy Relationships
  "circularEconomy.materialRecovery.wasteManagement": -0.3,
  "circularEconomy.materialRecovery.energyCost": -0.2,
  "circularEconomy.recycling.wasteManagement": -0.25,
  "circularEconomy.recycling.energyCost": -0.15,
  "circularEconomy.reuse.wasteManagement": -0.2,
  "circularEconomy.reuse.energyCost": -0.1
}

