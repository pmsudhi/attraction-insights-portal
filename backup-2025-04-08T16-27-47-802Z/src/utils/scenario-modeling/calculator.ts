import { outcomeMetrics } from "./metrics"
import { driverOutcomeRelationships, impactFactors } from "./relationships"

// Calculate the impact of driver changes on outcomes
export function calculateOutcomes(driverValues: Record<string, number>) {
  const outcomes = { ...outcomeMetrics }

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

