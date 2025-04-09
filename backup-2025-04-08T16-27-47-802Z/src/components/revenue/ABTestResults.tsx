import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { BarChart } from "../../components/ui/charts"
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline"

interface ABTestResult {
  id: string
  promotionId: string
  testName: string
  variantA: {
    name: string
    impressions: number
    clicks: number
    conversions: number
    revenue: number
    conversionRate: number
  }
  variantB: {
    name: string
    impressions: number
    clicks: number
    conversions: number
    revenue: number
    conversionRate: number
  }
  winner: "A" | "B" | "none"
  confidenceLevel: number
  startDate: string
  endDate: string
  insights: string[]
}

const abTestResults: ABTestResult[] = [
  {
    id: "email-subject-1",
    promotionId: "spring-break",
    testName: "Email Subject Line Test",
    variantA: {
      name: "Spring Break Special: 20% Off Family Packages",
      impressions: 50000,
      clicks: 5000,
      conversions: 500,
      revenue: 25000,
      conversionRate: 10,
    },
    variantB: {
      name: "Family Fun Awaits: Save 20% This Spring Break",
      impressions: 50000,
      clicks: 6000,
      conversions: 650,
      revenue: 32500,
      conversionRate: 13,
    },
    winner: "B",
    confidenceLevel: 95,
    startDate: "2023-03-01",
    endDate: "2023-03-15",
    insights: [
      "Variant B showed 30% higher click-through rate",
      "More emotional appeal in variant B resonated better with families",
      "Clear value proposition in both variants, but B's wording was more engaging",
    ],
  },
  {
    id: "landing-page-1",
    promotionId: "family-weekend",
    testName: "Landing Page Layout Test",
    variantA: {
      name: "Single Column Layout",
      impressions: 25000,
      clicks: 2500,
      conversions: 250,
      revenue: 12500,
      conversionRate: 10,
    },
    variantB: {
      name: "Grid Layout with Social Proof",
      impressions: 25000,
      clicks: 3000,
      conversions: 350,
      revenue: 17500,
      conversionRate: 14,
    },
    winner: "B",
    confidenceLevel: 99,
    startDate: "2023-03-10",
    endDate: "2023-03-25",
    insights: [
      "Grid layout improved visual hierarchy and scannability",
      "Social proof elements increased trust and conversion rate",
      "Mobile responsiveness was better in variant B",
    ],
  },
]

export const ABTestResults = () => {
  const getWinnerColor = (winner: "A" | "B" | "none") => {
    if (winner === "none") return "secondary"
    return winner === "A" ? "primary" : "success"
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "success"
    if (confidence >= 90) return "warning"
    return "danger"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>A/B Test Results</CardTitle>
        <CardDescription>Analyze and compare test variants</CardDescription>
        <div className="mt-4">
          <Button variant="default" size="sm">
            New Test
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {abTestResults.map((test) => (
            <div key={test.id} className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{test.testName}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(test.startDate).toLocaleDateString()} -{" "}
                    {new Date(test.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getWinnerColor(test.winner)} rounded>
                    Winner: Variant {test.winner}
                  </Badge>
                  <Badge variant={getConfidenceColor(test.confidenceLevel)} rounded>
                    {test.confidenceLevel}% Confidence
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Variant A</h5>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{test.variantA.name}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Conversion Rate</p>
                        <p className="text-lg font-medium text-gray-900">{test.variantA.conversionRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Revenue</p>
                        <p className="text-lg font-medium text-gray-900">
                          {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                            test.variantA.revenue
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Variant B</h5>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{test.variantB.name}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Conversion Rate</p>
                        <p className="text-lg font-medium text-gray-900">{test.variantB.conversionRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Revenue</p>
                        <p className="text-lg font-medium text-gray-900">
                          {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                            test.variantB.revenue
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-4">Conversion Rate Comparison</h5>
                  <BarChart
                    data={{
                      labels: ["Variant A", "Variant B"],
                      datasets: [
                        {
                          label: "Conversion Rate",
                          data: [test.variantA.conversionRate, test.variantB.conversionRate],
                        },
                      ],
                    }}
                  />
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-4">Revenue Comparison</h5>
                  <BarChart
                    data={{
                      labels: ["Variant A", "Variant B"],
                      datasets: [
                        {
                          label: "Revenue",
                          data: [test.variantA.revenue, test.variantB.revenue],
                        },
                      ],
                    }}
                  />
                </div>
              </div>

              <div className="mt-6">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Key Insights</h5>
                <ul className="space-y-2">
                  {test.insights.map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {test.winner === "B" ? (
                          <ArrowUpIcon className="h-4 w-4 text-success-500" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 text-danger-500" />
                        )}
                      </div>
                      <p className="ml-2 text-sm text-gray-600">{insight}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 