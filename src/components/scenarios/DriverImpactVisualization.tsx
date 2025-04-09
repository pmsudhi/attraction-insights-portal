"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { driverCategories, driverOutcomeRelationships, impactFactors } from "../../utils/scenario-modeling"

interface DriverImpactVisualizationProps {
  data: Record<string, number>
}

type OutcomeId = 'ebitda' | 'revenue' | 'attendance' | 'laborCost' | 'energyCost' | 'maintenanceCost' | 'marketingCost' | 'perCapita' | 'operatingDays';

export const DriverImpactVisualization = ({ data }: DriverImpactVisualizationProps) => {
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null)
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null)

  // Get all driver keys
  const allDrivers: { id: string; label: string; category: string }[] = []
  Object.entries(driverCategories).forEach(([categoryKey, category]) => {
    Object.entries(category.drivers).forEach(([driverKey, driver]) => {
      allDrivers.push({
        id: `${categoryKey}.${driverKey}`,
        label: driver.label,
        category: category.label,
      })
    })
  })

  // Get all outcome keys
  const outcomeLabels: Record<OutcomeId, string> = {
    'ebitda': 'EBITDA',
    'revenue': 'Total Revenue',
    'attendance': 'Total Attendance',
    'laborCost': 'Labor Cost',
    'energyCost': 'Energy Cost',
    'maintenanceCost': 'Maintenance Cost',
    'marketingCost': 'Marketing Cost',
    'perCapita': 'Per Capita Spending',
    'operatingDays': 'Operating Days'
  }

  const allOutcomes = [...new Set(Object.keys(impactFactors).map(key => key.split('.').pop() as OutcomeId))].map(outcomeId => ({
    id: outcomeId,
    label: outcomeLabels[outcomeId] || outcomeId
  }))

  // Get relationships for visualization
  const getRelationships = () => {
    if (selectedDriver) {
      // Show all outcomes affected by this driver
      return Object.entries(driverOutcomeRelationships)
        .filter(([driverId]) => driverId === selectedDriver)
        .flatMap(([driverId, outcomes]) =>
          outcomes.map((outcomeId) => ({
            from: driverId,
            to: outcomeId,
            fromLabel: allDrivers.find((d) => d.id === driverId)?.label || driverId,
            toLabel: outcomeLabels[outcomeId as OutcomeId] || outcomeId,
          })),
        )
    } else if (selectedOutcome) {
      // Show all drivers that affect this outcome
      return Object.entries(driverOutcomeRelationships)
        .filter(([_, outcomes]) => outcomes.includes(selectedOutcome))
        .map(([driverId]) => ({
          from: driverId,
          to: selectedOutcome,
          fromLabel: allDrivers.find((d) => d.id === driverId)?.label || driverId,
          toLabel: outcomeLabels[selectedOutcome as OutcomeId] || selectedOutcome,
        }))
    }

    // Default: show a few key relationships
    return [
      {
        from: "revenue.admission",
        to: "revenue",
        fromLabel: "Admission Revenue",
        toLabel: "Total Revenue",
      },
      {
        from: "external.weather",
        to: "attendance",
        fromLabel: "Weather Factors",
        toLabel: "Total Attendance",
      },
      {
        from: "cost.labor",
        to: "ebitda",
        fromLabel: "Labor Costs",
        toLabel: "EBITDA",
      },
    ]
  }

  const relationships = getRelationships()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver Impact Visualization</CardTitle>
        <CardDescription>Explore how drivers affect outcomes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Select a Driver</h3>
              <select
                value={selectedDriver || ""}
                onChange={(e) => {
                  setSelectedDriver(e.target.value || null)
                  setSelectedOutcome(null)
                }}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                aria-label="Select a driver"
              >
                <option value="">-- Select a driver --</option>
                {Object.entries(driverCategories).map(([categoryKey, category]) => (
                  <optgroup key={categoryKey} label={category.label}>
                    {Object.entries(category.drivers).map(([driverKey, driver]) => (
                      <option key={`${categoryKey}.${driverKey}`} value={`${categoryKey}.${driverKey}`}>
                        {driver.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Select an Outcome</h3>
              <select
                value={selectedOutcome || ""}
                onChange={(e) => {
                  setSelectedOutcome(e.target.value || null)
                  setSelectedDriver(null)
                }}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                aria-label="Select an outcome"
              >
                <option value="">-- Select an outcome --</option>
                {allOutcomes.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedDriver(null)
                  setSelectedOutcome(null)
                }}
              >
                Reset Selection
              </Button>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 h-80 flex items-center justify-center">
              {relationships.length > 0 ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="text-center mb-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {selectedDriver
                        ? `Impact of ${allDrivers.find((d) => d.id === selectedDriver)?.label}`
                        : selectedOutcome
                          ? `Drivers affecting ${outcomeLabels[selectedOutcome as OutcomeId] || selectedOutcome}`
                          : "Key Driver-Outcome Relationships"}
                    </h3>
                  </div>

                  <div className="flex flex-col items-center space-y-6 w-full">
                    {relationships.map((rel, index) => (
                      <div key={index} className="flex items-center w-full max-w-md">
                        <div className="w-2/5 p-2 bg-primary-100 text-primary-800 rounded-md text-sm text-center">
                          {rel.fromLabel}
                        </div>
                        <div className="w-1/5 flex justify-center">
                          <svg
                            width="40"
                            height="24"
                            viewBox="0 0 40 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M39.0607 13.0607C39.6464 12.4749 39.6464 11.5251 39.0607 10.9393L29.5147 1.3934C28.9289 0.807611 27.9792 0.807611 27.3934 1.3934C26.8076 1.97919 26.8076 2.92893 27.3934 3.51472L35.8787 12L27.3934 20.4853C26.8076 21.0711 26.8076 22.0208 27.3934 22.6066C27.9792 23.1924 28.9289 23.1924 29.5147 22.6066L39.0607 13.0607ZM0 13.5H38V10.5H0V13.5Z"
                              fill="#6B7280"
                            />
                          </svg>
                        </div>
                        <div className="w-2/5 p-2 bg-success-100 text-success-800 rounded-md text-sm text-center">
                          {rel.toLabel}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No relationships to display. Please select a driver or outcome.</p>
              )}
            </div>

            <div className="mt-4 text-sm text-gray-500">
              <p>
                This visualization shows how different drivers impact various outcomes in your business model. Select a
                specific driver or outcome to explore relationships.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DriverImpactVisualization;

