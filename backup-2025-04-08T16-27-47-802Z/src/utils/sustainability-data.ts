import { SustainabilityData } from "../types"

// Mock data for sustainability metrics
export const sustainabilityData: SustainabilityData = {
  energyMetrics: {
    totalConsumption: 12500, // MWh
    renewablePercentage: 45,
    efficiencyScore: 82.5,
    costSavings: 850000, // USD
    yearOverYearChange: -2.3,
    byAttraction: [
      {
        name: "Adventure Park",
        consumption: 1250,
        efficiency: 88.5
      },
      {
        name: "Water Park",
        consumption: 2150,
        efficiency: 75.2
      },
      {
        name: "Theme Park",
        consumption: 3250,
        efficiency: 82.1
      },
      {
        name: "Entertainment District",
        consumption: 1850,
        efficiency: 85.8
      }
    ],
  },
  wasteMetrics: {
    totalWaste: 850, // tons
    recyclingRate: 68,
    landfillDiversion: 78.5,
    compostingRate: 45,
    yearOverYearChange: 5.2,
    byCategory: [
      {
        name: "General Waste",
        amount: 1250,
        recycled: 65.8
      },
      {
        name: "Food Waste",
        amount: 850,
        recycled: 92.5
      },
      {
        name: "Construction",
        amount: 450,
        recycled: 88.2
      },
      {
        name: "Hazardous",
        amount: 150,
        recycled: 95.5
      }
    ],
  },
  carbonFootprint: {
    totalEmissions: 12500, // tons CO2e
    scope1Emissions: 3200,
    scope2Emissions: 7800,
    scope3Emissions: 1500,
    yearOverYearChange: -8.5,
    reductionTarget: 15, // percentage
    bySource: [
      {
        name: "Electricity",
        emissions: 12500,
        percentage: 45
      },
      {
        name: "Transportation",
        emissions: 8500,
        percentage: 30
      },
      {
        name: "Waste",
        emissions: 4200,
        percentage: 15
      },
      {
        name: "Other",
        emissions: 2800,
        percentage: 10
      }
    ],
  },
  esgMetrics: {
    environmental: {
      score: 85,
      initiatives: [
        {
          name: "Renewable Energy Transition",
          status: "In Progress",
          impact: "High"
        },
        {
          name: "Water Conservation",
          status: "Completed",
          impact: "High"
        },
        {
          name: "Waste Reduction",
          status: "In Progress",
          impact: "Medium"
        }
      ],
    },
    social: {
      score: 92,
      initiatives: [
        {
          name: "Community Engagement",
          status: "Completed",
          impact: "High"
        },
        {
          name: "Employee Development",
          status: "In Progress",
          impact: "High"
        },
        {
          name: "Health & Safety",
          status: "Completed",
          impact: "High"
        }
      ],
    },
    governance: {
      score: 88,
      initiatives: [
        {
          name: "Board Diversity",
          status: "In Progress",
          impact: "High"
        },
        {
          name: "Ethics Training",
          status: "Completed",
          impact: "Medium"
        },
        {
          name: "Risk Management",
          status: "In Progress",
          impact: "High"
        }
      ],
    },
  },
  sustainabilityGoals: {
    shortTerm: [
      {
        name: "Energy Efficiency",
        current: 82.5,
        target: 85,
        unit: "%"
      },
      {
        name: "Waste Diversion",
        current: 78.5,
        target: 80,
        unit: "%"
      },
      {
        name: "Carbon Reduction",
        current: 8.5,
        target: 10,
        unit: "%"
      }
    ],
    longTerm: [
      {
        name: "Net Zero Energy",
        current: 15,
        target: 100,
        unit: "%"
      },
      {
        name: "Zero Waste",
        current: 78.5,
        target: 100,
        unit: "%"
      },
      {
        name: "Carbon Neutral",
        current: 8.5,
        target: 100,
        unit: "%"
      }
    ],
  },
  waterConservation: {
    totalUsage: 125000, // cubic meters
    efficiencyScore: 78.5,
    costSavings: 450000, // USD
    yearOverYearChange: -5.2,
    byAttraction: [
      {
        name: "Adventure Park",
        usage: 25000,
        efficiency: 82.5
      },
      {
        name: "Water Park",
        usage: 45000,
        efficiency: 75.8
      },
      {
        name: "Theme Park",
        usage: 35000,
        efficiency: 80.2
      },
      {
        name: "Entertainment District",
        usage: 20000,
        efficiency: 85.5
      }
    ],
    conservationInitiatives: [
      {
        name: "Smart Irrigation Systems",
        status: "Completed",
        impact: "High",
        roi: 125
      },
      {
        name: "Water Recycling Program",
        status: "In Progress",
        impact: "High",
        roi: 85
      },
      {
        name: "Leak Detection System",
        status: "In Progress",
        impact: "Medium",
        roi: 65
      }
    ]
  },
  circularEconomy: {
    materialRecovery: {
      total: 1250, // tons
      percentage: 72.5,
      yearOverYearChange: 8.2
    },
    byMaterial: [
      {
        name: "Plastics",
        amount: 450,
        recycled: 85,
        reused: 15
      },
      {
        name: "Paper",
        amount: 350,
        recycled: 92,
        reused: 8
      },
      {
        name: "Metals",
        amount: 250,
        recycled: 88,
        reused: 12
      },
      {
        name: "Glass",
        amount: 200,
        recycled: 90,
        reused: 10
      }
    ],
    initiatives: [
      {
        name: "Single-Use Plastic Elimination",
        status: "In Progress",
        impact: "High",
        savings: 85000
      },
      {
        name: "Material Recovery Facility",
        status: "Completed",
        impact: "High",
        savings: 125000
      },
      {
        name: "Supplier Packaging Program",
        status: "In Progress",
        impact: "Medium",
        savings: 45000
      }
    ]
  },
  renewableEnergy: {
    totalCapacity: 5000, // kW
    currentOutput: 4200,
    percentageOfTotal: 35,
    installations: [
      {
        name: "Solar Farm",
        type: "Solar PV",
        capacity: 3000,
        output: 2500,
        roi: 12.5,
        paybackPeriod: 8
      },
      {
        name: "Wind Turbines",
        type: "Wind",
        capacity: 1500,
        output: 1200,
        roi: 15.2,
        paybackPeriod: 7
      },
      {
        name: "Biomass Plant",
        type: "Biomass",
        capacity: 500,
        output: 500,
        roi: 10.8,
        paybackPeriod: 9
      }
    ]
  },
  guestSustainability: {
    awarenessScore: 75,
    participationRate: 68,
    initiatives: [
      {
        name: "Green Guest Program",
        participation: 45,
        impact: 250, // tons CO2e
        feedback: 4.2
      },
      {
        name: "Sustainable Dining",
        participation: 82,
        impact: 180,
        feedback: 4.5
      },
      {
        name: "Eco-Friendly Activities",
        participation: 65,
        impact: 120,
        feedback: 4.3
      }
    ]
  },
  greenInvestment: {
    totalInvestment: 2500000,
    projects: [
      {
        name: "Solar Panel Installation",
        category: "Renewable Energy",
        investment: 1000000,
        paybackPeriod: 8,
        roi: 12.5,
        status: "Completed"
      },
      {
        name: "Water Recycling System",
        category: "Water Conservation",
        investment: 500000,
        paybackPeriod: 5,
        roi: 15.2,
        status: "In Progress"
      },
      {
        name: "LED Lighting Upgrade",
        category: "Energy Efficiency",
        investment: 300000,
        paybackPeriod: 3,
        roi: 18.5,
        status: "Completed"
      }
    ]
  },
  foodWaste: {
    totalWaste: 125, // tons
    byOutlet: [
      {
        name: "Main Restaurant",
        waste: 45,
        reduction: 15,
        costSavings: 25000
      },
      {
        name: "Fast Food Court",
        waste: 35,
        reduction: 12,
        costSavings: 18000
      },
      {
        name: "Cafes",
        waste: 25,
        reduction: 8,
        costSavings: 12000
      }
    ],
    reductionStrategies: [
      {
        name: "Portion Control",
        effectiveness: 85,
        costSavings: 15000,
        status: "Active"
      },
      {
        name: "Food Donation Program",
        effectiveness: 75,
        costSavings: 10000,
        status: "Active"
      },
      {
        name: "Composting System",
        effectiveness: 90,
        costSavings: 20000,
        status: "Planning"
      }
    ]
  },
  sustainableTransport: {
    guestTransport: [
      {
        mode: "Public Transit",
        percentage: 35,
        emissions: 150,
        efficiency: 85
      },
      {
        mode: "Bicycle",
        percentage: 15,
        emissions: 0,
        efficiency: 100
      },
      {
        mode: "Electric Shuttle",
        percentage: 25,
        emissions: 50,
        efficiency: 90
      }
    ],
    employeeTransport: [
      {
        mode: "Carpool",
        percentage: 40,
        emissions: 80,
        efficiency: 75
      },
      {
        mode: "Public Transit",
        percentage: 30,
        emissions: 60,
        efficiency: 85
      },
      {
        mode: "Bicycle",
        percentage: 20,
        emissions: 0,
        efficiency: 100
      }
    ],
    initiatives: [
      {
        name: "Electric Vehicle Fleet",
        impact: 250,
        status: "In Progress"
      },
      {
        name: "Bike Share Program",
        impact: 150,
        status: "Completed"
      },
      {
        name: "Shuttle Service",
        impact: 200,
        status: "Completed"
      }
    ]
  },
  biodiversity: {
    habitats: [
      {
        name: "Wetland Area",
        area: 25,
        species: 45,
        conservationStatus: "Protected"
      },
      {
        name: "Forest Reserve",
        area: 15,
        species: 35,
        conservationStatus: "Protected"
      },
      {
        name: "Wildlife Corridor",
        area: 10,
        species: 25,
        conservationStatus: "Restoration"
      }
    ],
    initiatives: [
      {
        name: "Species Monitoring",
        impact: 85,
        status: "Completed"
      },
      {
        name: "Habitat Restoration",
        impact: 75,
        status: "In Progress"
      },
      {
        name: "Education Program",
        impact: 65,
        status: "Completed"
      }
    ]
  },
  plasticReduction: {
    totalUsage: 85, // tons
    byCategory: [
      {
        name: "Food Packaging",
        usage: 35,
        reduction: 25,
        alternatives: ["Compostable", "Reusable", "Bamboo"]
      },
      {
        name: "Beverage Containers",
        usage: 25,
        reduction: 30,
        alternatives: ["Reusable Cups", "Aluminum", "Glass"]
      },
      {
        name: "Retail Items",
        usage: 15,
        reduction: 20,
        alternatives: ["Paper", "Cloth", "Metal"]
      }
    ],
    initiatives: [
      {
        name: "Reusable Cup Program",
        reduction: 35,
        costImpact: 25000,
        status: "Completed"
      },
      {
        name: "Bulk Dispensers",
        reduction: 25,
        costImpact: 15000,
        status: "In Progress"
      },
      {
        name: "Compostable Packaging",
        reduction: 30,
        costImpact: 20000,
        status: "Completed"
      }
    ]
  },
  communityImpact: {
    socialInitiatives: [
      {
        name: "Education Program",
        beneficiaries: 5000,
        impact: 85,
        status: "Completed"
      },
      {
        name: "Local Employment",
        beneficiaries: 250,
        impact: 90,
        status: "Completed"
      },
      {
        name: "Community Events",
        beneficiaries: 10000,
        impact: 75,
        status: "Completed"
      }
    ],
    economicImpact: [
      {
        category: "Local Business",
        value: 2500000,
        beneficiaries: 50
      },
      {
        category: "Employment",
        value: 1500000,
        beneficiaries: 250
      },
      {
        category: "Tourism",
        value: 5000000,
        beneficiaries: 100
      }
    ]
  },
  climateRisk: {
    risks: [
      {
        category: "Extreme Weather",
        likelihood: 75,
        impact: 85,
        mitigation: "Enhanced drainage systems",
        status: "In Progress"
      },
      {
        category: "Heat Stress",
        likelihood: 80,
        impact: 70,
        mitigation: "Cooling stations",
        status: "Addressed"
      },
      {
        category: "Water Scarcity",
        likelihood: 60,
        impact: 90,
        mitigation: "Water recycling",
        status: "In Progress"
      }
    ],
    adaptationStrategies: [
      {
        name: "Flood Protection",
        effectiveness: 85,
        cost: 500000,
        status: "Implemented"
      },
      {
        name: "Heat Management",
        effectiveness: 75,
        cost: 300000,
        status: "Planned"
      },
      {
        name: "Water Conservation",
        effectiveness: 80,
        cost: 400000,
        status: "Implemented"
      }
    ]
  },
  sustainabilityCommunication: {
    awareness: [
      {
        channel: "Social Media",
        reach: 75000,
        effectiveness: 85
      },
      {
        channel: "On-site Signage",
        reach: 50000,
        effectiveness: 75
      },
      {
        channel: "Mobile App",
        reach: 45000,
        effectiveness: 80
      }
    ],
    engagement: [
      {
        initiative: "Green Guest Program",
        participation: 45,
        feedback: 4.2
      },
      {
        initiative: "Sustainability Tours",
        participation: 35,
        feedback: 4.5
      },
      {
        initiative: "Eco Challenges",
        participation: 55,
        feedback: 4.3
      }
    ]
  },
  weatherBasedEnergy: {
    patterns: [
      {
        condition: "Hot",
        consumption: 850,
        efficiency: 75,
        recommendations: [
          "Optimize HVAC settings",
          "Increase natural ventilation",
          "Use energy-efficient cooling"
        ]
      },
      {
        condition: "Cold",
        consumption: 750,
        efficiency: 80,
        recommendations: [
          "Improve insulation",
          "Use heat recovery systems",
          "Optimize heating schedules"
        ]
      },
      {
        condition: "Mild",
        consumption: 600,
        efficiency: 90,
        recommendations: [
          "Maximize natural ventilation",
          "Use passive cooling/heating",
          "Optimize equipment schedules"
        ]
      }
    ],
    optimizationStrategies: [
      {
        condition: "Hot",
        strategy: "Smart HVAC Control",
        potentialSavings: 150000,
        implementationCost: 75000
      },
      {
        condition: "Cold",
        strategy: "Heat Recovery",
        potentialSavings: 100000,
        implementationCost: 50000
      },
      {
        condition: "Mild",
        strategy: "Natural Ventilation",
        potentialSavings: 75000,
        implementationCost: 25000
      }
    ]
  }
} 