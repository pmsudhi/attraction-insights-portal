import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { LineChart } from "../ui/charts"
import { 
  GlobeAltIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  BuildingOfficeIcon
} from "@heroicons/react/24/outline"

interface CurrencyPosition {
  currency: string
  rate: number
  change: number
  exposure: number
  hedgedAmount: number
  unhedgedAmount: number
  riskLevel: "low" | "medium" | "high"
}

interface PropertyPerformance {
  id: string
  name: string
  region: string
  revenue: number
  revenueGrowth: number
  profitability: number
  profitabilityGrowth: number
  occupancy: number
  status: "exceeding" | "meeting" | "below"
}

interface ConsolidatedMetric {
  metric: string
  value: number
  change: number
  trend: "up" | "down" | "stable"
  contribution: number
}

export const GlobalOperations = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState("12m")

  // Mock data for currency positions
  const currencyPositions: CurrencyPosition[] = [
    {
      currency: "EUR",
      rate: 1.08,
      change: 0.02,
      exposure: 25000000,
      hedgedAmount: 20000000,
      unhedgedAmount: 5000000,
      riskLevel: "low"
    },
    {
      currency: "GBP",
      rate: 1.25,
      change: -0.01,
      exposure: 18000000,
      hedgedAmount: 15000000,
      unhedgedAmount: 3000000,
      riskLevel: "medium"
    },
    {
      currency: "JPY",
      rate: 110.5,
      change: 0.5,
      exposure: 12000000,
      hedgedAmount: 8000000,
      unhedgedAmount: 4000000,
      riskLevel: "high"
    }
  ]

  // Mock data for property performance
  const propertyPerformance: PropertyPerformance[] = [
    {
      id: "P001",
      name: "Magic Kingdom",
      region: "North America",
      revenue: 850000000,
      revenueGrowth: 8.5,
      profitability: 32.5,
      profitabilityGrowth: 2.1,
      occupancy: 92,
      status: "exceeding"
    },
    {
      id: "P002",
      name: "Disneyland Paris",
      region: "Europe",
      revenue: 620000000,
      revenueGrowth: 6.2,
      profitability: 28.8,
      profitabilityGrowth: 1.5,
      occupancy: 88,
      status: "meeting"
    },
    {
      id: "P003",
      name: "Tokyo Disneyland",
      region: "Asia Pacific",
      revenue: 720000000,
      revenueGrowth: 7.8,
      profitability: 30.2,
      profitabilityGrowth: 1.8,
      occupancy: 90,
      status: "exceeding"
    }
  ]

  // Mock data for consolidated metrics
  const consolidatedMetrics: ConsolidatedMetric[] = [
    {
      metric: "Total Revenue",
      value: 2190000000,
      change: 7.5,
      trend: "up",
      contribution: 100
    },
    {
      metric: "Operating Profit",
      value: 915000000,
      change: 8.2,
      trend: "up",
      contribution: 41.8
    },
    {
      metric: "EBITDA Margin",
      value: 32.5,
      change: 1.2,
      trend: "up",
      contribution: 32.5
    }
  ]

  // Mock chart data for currency trends
  const chartData = [
    { date: "2023-04", predicted: 1.08, actual: 1.07 },
    { date: "2023-05", predicted: 1.09, actual: 1.08 },
    { date: "2023-06", predicted: 1.10, actual: 1.09 },
    { date: "2023-07", predicted: 1.11, actual: 1.10 },
    { date: "2023-08", predicted: 1.12, actual: 1.11 },
    { date: "2023-09", predicted: 1.13, actual: 1.12 }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Operations Center</CardTitle>
        <CardDescription>Multi-currency management and consolidated financial intelligence</CardDescription>
        <div className="mt-4">
          <Button variant="outline" size="sm">
            Update Models
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Consolidated Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {consolidatedMetrics.map((metric) => (
              <div key={metric.metric} className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                    <ChartBarIcon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">{metric.metric}</h3>
                    <p className="mt-1 text-2xl font-semibold text-primary-600">
                      {metric.metric.includes("Margin") ? `${metric.value}%` : `$${(metric.value / 1000000).toFixed(1)}M`}
                    </p>
                    <div className="mt-1 flex items-center">
                      <Badge
                        variant={metric.trend === "up" ? "success" : metric.trend === "down" ? "danger" : "warning"}
                        size="sm"
                      >
                        {metric.change > 0 ? "+" : ""}{metric.change}%
                      </Badge>
                      <span className="ml-2 text-xs text-gray-500">
                        {metric.contribution}% contribution
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Currency Management */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Currency Positions</h3>
            <div className="space-y-4">
              {currencyPositions.map((position) => (
                <div
                  key={position.currency}
                  className={`p-4 rounded-lg border ${
                    selectedCurrency === position.currency
                      ? "bg-primary-50 border-primary-200"
                      : "bg-white border-gray-200"
                  }`}
                  onClick={() => setSelectedCurrency(position.currency)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{position.currency}/USD</h4>
                      <div className="mt-1 flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          Rate: {position.rate}
                        </span>
                        <span className="text-sm text-gray-500">
                          Change: {position.change > 0 ? "+" : ""}{position.change}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Exposure</div>
                        <div className="text-sm font-medium text-gray-900">
                          ${(position.exposure / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      <Badge
                        variant={
                          position.riskLevel === "low"
                            ? "success"
                            : position.riskLevel === "medium"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {position.riskLevel} risk
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Property Performance */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Property Performance</h3>
            <div className="space-y-4">
              {propertyPerformance.map((property) => (
                <div key={property.id} className="p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{property.name}</h4>
                      <div className="mt-1 flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          Region: {property.region}
                        </span>
                        <span className="text-sm text-gray-500">
                          Occupancy: {property.occupancy}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Revenue Growth</div>
                        <div className="text-sm font-medium text-gray-900">
                          +{property.revenueGrowth}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Profitability</div>
                        <div className="text-sm font-medium text-gray-900">
                          {property.profitability}%
                        </div>
                      </div>
                      <Badge
                        variant={
                          property.status === "exceeding"
                            ? "success"
                            : property.status === "meeting"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {property.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Currency Trend Chart */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Currency Trends</h3>
            <div className="h-80">
              <LineChart
                data={chartData}
                xField="date"
                yFields={["predicted", "actual"]}
                title="EUR/USD Exchange Rate Trend"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 