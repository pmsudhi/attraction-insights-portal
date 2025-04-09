import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ScaleIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline"
import { LineChart } from "../ui/charts"

interface FinancialMetric {
  id: string
  name: string
  value: number
  unit: string
  trend: number
  target: number
  status: "on-track" | "at-risk" | "behind"
}

const financialMetrics: FinancialMetric[] = [
  {
    id: "profitability",
    name: "Long-term Profitability",
    value: 32.4,
    unit: "%",
    trend: 2.8,
    target: 30,
    status: "on-track",
  },
  {
    id: "cash-flow",
    name: "Cash Flow Sustainability",
    value: 85,
    unit: "%",
    trend: 5.2,
    target: 80,
    status: "on-track",
  },
  {
    id: "investment",
    name: "Investment Performance",
    value: 18.5,
    unit: "%",
    trend: 2.1,
    target: 15,
    status: "on-track",
  },
  {
    id: "debt",
    name: "Debt Structure Health",
    value: 2.4,
    unit: "x",
    trend: -0.3,
    target: 3.0,
    status: "on-track",
  },
  {
    id: "dividend",
    name: "Dividend Sustainability",
    value: 45,
    unit: "%",
    trend: 3.5,
    target: 40,
    status: "on-track",
  },
]

const formatNumber = (value: number) => {
  return value.toFixed(1)
}

const formatPercentage = (value: number) => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}pp`
}

const chartData = [
  {
    date: "2019",
    predicted: 0,
    actual: 28.5,
  },
  {
    date: "2020",
    predicted: 0,
    actual: 29.2,
  },
  {
    date: "2021",
    predicted: 0,
    actual: 30.1,
  },
  {
    date: "2022",
    predicted: 0,
    actual: 31.5,
  },
  {
    date: "2023",
    predicted: 0,
    actual: 32.4,
  },
  {
    date: "2024",
    predicted: 33.2,
    actual: null,
  },
]

export const FinancialSustainability = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {financialMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{metric.name}</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">
                    {metric.unit === "USD" ? `$${formatNumber(metric.value)}M` : `${formatNumber(metric.value)}${metric.unit}`}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className={`text-xs ${metric.trend >= 0 ? "text-success-600" : "text-danger-600"}`}>
                      {formatPercentage(metric.trend)}
                    </span>
                    {metric.trend >= 0 ? (
                      <ArrowTrendingUpIcon className="h-4 w-4 text-success-600 ml-1" />
                    ) : (
                      <ArrowTrendingDownIcon className="h-4 w-4 text-danger-600 ml-1" />
                    )}
                  </div>
                </div>
                <div className="p-2 bg-primary-50 rounded-md">
                  {metric.id === "profitability" && <ChartBarIcon className="h-6 w-6 text-primary-600" />}
                  {metric.id === "cash-flow" && <CurrencyDollarIcon className="h-6 w-6 text-primary-600" />}
                  {metric.id === "investment" && <ArrowTrendingUpIcon className="h-6 w-6 text-primary-600" />}
                  {metric.id === "debt" && <ScaleIcon className="h-6 w-6 text-primary-600" />}
                  {metric.id === "dividend" && <BanknotesIcon className="h-6 w-6 text-primary-600" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Long-term Financial Trends</CardTitle>
          <CardDescription>5-year historical performance and projections</CardDescription>
          <div className="mt-4">
            <Button variant="outline" size="sm">
              <ChartBarIcon className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <LineChart
              data={chartData}
              xField="date"
              yFields={["actual", "predicted"]}
              title="Financial Performance Trends"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 