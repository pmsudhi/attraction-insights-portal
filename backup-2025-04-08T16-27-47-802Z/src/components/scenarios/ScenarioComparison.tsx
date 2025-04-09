import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { ArrowPathIcon } from "@heroicons/react/24/outline"
import { outcomeMetrics, type Scenario } from "../../utils/scenario-modeling"

interface ScenarioComparisonProps {
  scenarios: Scenario[]
  baselineScenario: Scenario
}

export const ScenarioComparison = ({ scenarios, baselineScenario }: ScenarioComparisonProps) => {
  // Get all unique outcome keys from all scenarios
  const outcomeKeys = Object.keys(outcomeMetrics)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scenario Comparison</CardTitle>
        <CardDescription>Compare key metrics across scenarios</CardDescription>
        <div className="mt-4">
          <Button variant="outline" size="sm">
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Metric
                </th>
                {scenarios.map((scenario) => (
                  <th
                    key={scenario.id}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {scenario.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {outcomeKeys.map((key) => (
                <tr key={key}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {outcomeMetrics[key].label}
                  </td>

                  {scenarios.map((scenario) => {
                    const outcome = scenario.outcomes[key]
                    const value = outcome?.value
                    const percentChange = outcome?.percentChange || 0
                    const isBaseline = scenario.id === baselineScenario.id

                    return (
                      <td key={`${scenario.id}-${key}`} className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={
                            isBaseline
                              ? "text-gray-500"
                              : percentChange > 0
                                ? "text-success-600"
                                : percentChange < 0
                                  ? "text-danger-600"
                                  : "text-gray-500"
                          }
                        >
                          {outcomeMetrics[key].unit === "$" ? "$" : ""}
                          {typeof value === "number"
                            ? value.toLocaleString("en-US", { maximumFractionDigits: 2 })
                            : value}
                          {outcomeMetrics[key].unit === "$M"
                            ? "M"
                            : outcomeMetrics[key].unit === "M"
                              ? "M"
                              : outcomeMetrics[key].unit === "days"
                                ? ""
                                : ""}

                          {!isBaseline && percentChange !== 0 && (
                            <span className="ml-1">
                              ({percentChange > 0 ? "+" : ""}
                              {percentChange.toFixed(1)}%)
                            </span>
                          )}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default ScenarioComparison;

