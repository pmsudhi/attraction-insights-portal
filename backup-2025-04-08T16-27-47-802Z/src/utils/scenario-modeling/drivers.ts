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

