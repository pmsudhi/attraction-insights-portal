import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import {
  ExclamationTriangleIcon,
  ChartBarIcon,
  ShieldExclamationIcon,
  BoltIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline"
import { LineChart } from "../ui/charts"

interface RiskMetric {
  id: string
  name: string
  value: number
  trend: number
  severity: "low" | "medium" | "high"
  category: string
  description: string
}

const riskMetrics: RiskMetric[] = [
  {
    id: "market",
    name: "Market Risk Index",
    value: 65,
    trend: -5,
    severity: "medium",
    category: "Market Conditions",
    description: "Overall market risk assessment based on economic indicators",
  },
  {
    id: "competitive",
    name: "Competitive Threat Level",
    value: 72,
    trend: 8,
    severity: "high",
    category: "Competition",
    description: "Assessment of competitive landscape and market share threats",
  },
  {
    id: "disruption",
    name: "Disruption Potential",
    value: 45,
    trend: -12,
    severity: "low",
    category: "Innovation",
    description: "Risk of technological or business model disruption",
  },
  {
    id: "continuity",
    name: "Business Continuity Risk",
    value: 38,
    trend: -15,
    severity: "low",
    category: "Operations",
    description: "Assessment of operational resilience and recovery capabilities",
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "low":
      return "secondary"
    case "medium":
      return "outline"
    case "high":
      return "destructive"
    default:
      return "default"
  }
}

const formatNumber = (value: number) => {
  return value.toFixed(0)
}

const formatPercentage = (value: number) => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}pp`
}

export const StrategicRiskManagement = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
        {riskMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900">{metric.name}</p>
                    <Badge variant={getSeverityColor(metric.severity)}>{metric.severity}</Badge>
                  </div>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                  <div className="flex items-center mt-2">
                    <p className="text-2xl font-semibold text-gray-900">{formatNumber(metric.value)}</p>
                    <span className={`ml-2 text-sm ${metric.trend >= 0 ? "text-danger-600" : "text-success-600"}`}>
                      {formatPercentage(metric.trend)}
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-primary-50 rounded-md">
                  {metric.id === "market" && <ChartBarIcon className="h-6 w-6 text-primary-600" />}
                  {metric.id === "competitive" && <ShieldExclamationIcon className="h-6 w-6 text-primary-600" />}
                  {metric.id === "disruption" && <BoltIcon className="h-6 w-6 text-primary-600" />}
                  {metric.id === "continuity" && <ArrowPathIcon className="h-6 w-6 text-primary-600" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Trend Analysis</CardTitle>
          <CardDescription>Historical risk metrics and trend analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <LineChart
              data={[
                { date: "Q1", value: 65 },
                { date: "Q2", value: 68 },
                { date: "Q3", value: 72 },
                { date: "Q4", value: 70 }
              ]}
              xField="date"
              yFields={["value"]}
              labels={["Risk Index"]}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm">
              <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
              Risk Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 