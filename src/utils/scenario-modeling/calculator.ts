import { outcomeMetrics } from "./metrics"
import { driverOutcomeRelationships, impactFactors } from "./relationships"

interface OutcomeMetric {
  label: string
  unit: string
  baseline: number
  value?: number
  percentChange?: number
}

type OutcomeMetrics = {
  [key: string]: OutcomeMetric
}

type MetricKey = keyof typeof outcomeMetrics

// Calculate the impact of driver changes on outcomes
export function calculateOutcomes(driverValues: Record<string, number>): OutcomeMetrics {
  try {
    // Create a deep copy of outcomeMetrics with the additional properties
    const outcomes: OutcomeMetrics = Object.entries(outcomeMetrics).reduce((acc, [key, metric]) => {
      if (metric && typeof metric.baseline === 'number') {
        acc[key] = {
          ...metric,
          value: metric.baseline,
          percentChange: 0
        }
      } else {
        console.warn(`Invalid metric configuration for ${key}:`, metric)
      }
      return acc
    }, {} as OutcomeMetrics)
    
    // Apply driver impacts to outcomes
    Object.entries(driverValues).forEach(([driverId, value]) => {
      // Get the affected outcomes for this driver
      const affectedOutcomes = driverOutcomeRelationships[driverId as keyof typeof driverOutcomeRelationships] || []

      affectedOutcomes.forEach((outcomeId) => {
        // Skip if the outcome doesn't exist in our metrics or has no baseline
        if (!outcomes[outcomeId] || typeof outcomes[outcomeId]?.baseline !== 'number') {
          console.warn(`Outcome ${outcomeId} not found in metrics or has invalid baseline`)
          return
        }

        const impactKey = `${driverId}.${outcomeId}` as keyof typeof impactFactors
        const impactFactor = impactFactors[impactKey] || 0
        
        // Calculate the impact on the outcome
        const baseline = outcomes[outcomeId].baseline
        const currentValue = outcomes[outcomeId].value || baseline
        const impact = (value / 100) * impactFactor * baseline
        
        outcomes[outcomeId].value = currentValue + impact
        outcomes[outcomeId].percentChange = ((outcomes[outcomeId].value! / baseline) - 1) * 100
      })
    })

    return outcomes
  } catch (error) {
    console.error('Error calculating outcomes:', error)
    // Return original metrics with initialized values if calculation fails
    return Object.entries(outcomeMetrics).reduce((acc, [key, metric]) => {
      if (metric && typeof metric.baseline === 'number') {
        acc[key] = {
          ...metric,
          value: metric.baseline,
          percentChange: 0
        }
      }
      return acc
    }, {} as OutcomeMetrics)
  }
}

