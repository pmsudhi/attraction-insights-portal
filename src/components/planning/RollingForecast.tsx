"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import {
  ArrowPathIcon,
  ChevronDownIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"
import DriverImpactVisualization from "../scenarios/DriverImpactVisualization"
import { LineChart } from "../../components/ui/charts"

// Add new types for advanced forecasting
interface ForecastMetric {
  id: string
  name: string
  current: number
  previous: number
  forecast: number
  variance: number
  trend: "up" | "down" | "stable"
  confidence: number
  factors: {
    name: string
    impact: number
    description: string
  }[]
}

interface ForecastAlert {
  id: string
  type: "warning" | "success" | "primary" | "secondary" | "danger" | "gray"
  message: string
  impact: string
  recommendation: string
  affectedMetrics: string[]
}

interface ForecastTrend {
  id: string
  name: string
  description: string
  strength: number
  direction: "positive" | "negative" | "neutral"
  supportingData: string[]
}

// Add sample data for new features
const forecastMetrics: ForecastMetric[] = [
  {
    id: "metric-1",
    name: "Attendance",
    current: 15000,
    previous: 14500,
    forecast: 16000,
    variance: 0.067,
    trend: "up",
    confidence: 0.85,
    factors: [
      {
        name: "Weather",
        impact: 0.15,
        description: "Favorable weather conditions expected",
      },
      {
        name: "Marketing",
        impact: 0.10,
        description: "New campaign launch",
      },
    ],
  },
  {
    id: "metric-2",
    name: "Revenue",
    current: 250000,
    previous: 240000,
    forecast: 275000,
    variance: 0.104,
    trend: "up",
    confidence: 0.90,
    factors: [
      {
        name: "Pricing",
        impact: 0.05,
        description: "Seasonal price adjustments",
      },
      {
        name: "Product Mix",
        impact: 0.08,
        description: "New premium experiences",
      },
    ],
  },
]

const forecastAlerts: ForecastAlert[] = [
  {
    id: "alert-1",
    type: "warning",
    message: "Potential capacity constraint detected",
    impact: "May affect guest experience and revenue",
    recommendation: "Consider implementing virtual queue system",
    affectedMetrics: ["Attendance", "Revenue"],
  },
  {
    id: "alert-2",
    type: "primary",
    message: "New marketing campaign impact",
    impact: "Expected 15% increase in local visitors",
    recommendation: "Prepare for higher weekday attendance",
    affectedMetrics: ["Attendance"],
  },
]

const forecastTrends: ForecastTrend[] = [
  {
    id: "trend-1",
    name: "Premium Experience Demand",
    description: "Growing demand for VIP and exclusive experiences",
    strength: 0.85,
    direction: "positive",
    supportingData: [
      "20% increase in premium package bookings",
      "Higher satisfaction scores for VIP experiences",
    ],
  },
  {
    id: "trend-2",
    name: "Digital Engagement",
    description: "Increased mobile app usage and digital interactions",
    strength: 0.75,
    direction: "positive",
    supportingData: [
      "30% growth in mobile app downloads",
      "45% increase in digital ticket purchases",
    ],
  },
]

export default function RollingForecast() {
  const [selectedMetric, setSelectedMetric] = useState<ForecastMetric | null>(null)
  const [selectedAlert, setSelectedAlert] = useState<ForecastAlert | null>(null)
  const [selectedTrend, setSelectedTrend] = useState<ForecastTrend | null>(null)
  const [forecastPeriod, setForecastPeriod] = useState<"daily" | "weekly" | "monthly">("daily")

  return (
    <div className="space-y-6">
      {/* Key Metrics Forecast */}
      <Card>
        <CardHeader>
        <CardTitle>Key Metrics Forecast</CardTitle>
        <CardDescription>Real-time forecasting with automated updates</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Metrics Overview</h3>
              <div className="space-y-4">
                {forecastMetrics.map((metric) => (
                  <div
                    key={metric.id}
                    className={`p-4 rounded-lg border ${
                      selectedMetric?.id === metric.id ? "border-primary-500" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedMetric(metric)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{metric.name}</h4>
                        <p className="text-xs text-gray-500">
                          Variance: {(metric.variance * 100).toFixed(1)}%
                        </p>
                      </div>
                      <Badge variant={metric.trend === "up" ? "success" : "warning"}>
                        {metric.confidence * 100}% confidence
                      </Badge>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-xs font-medium text-gray-500">Current</h5>
                        <p className="text-sm font-medium">{metric.current.toLocaleString()}</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-gray-500">Previous</h5>
                        <p className="text-sm font-medium">{metric.previous.toLocaleString()}</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-gray-500">Forecast</h5>
                        <p className="text-sm font-medium">{metric.forecast.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h5 className="text-xs font-medium text-gray-500">Impact Factors</h5>
                      <div className="mt-1 space-y-2">
                        {metric.factors.map((factor, index) => (
                          <div key={index} className="flex justify-between text-xs">
                            <span>{factor.name}</span>
                            <span className="text-gray-500">{factor.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Forecast Trend</h3>
              <div className="h-80">
                <LineChart 
                  data={[
                    { label: "Jan", value: 100 },
                    { label: "Feb", value: 120 },
                    { label: "Mar", value: 115 },
                    { label: "Apr", value: 130 }
                  ]}
                  xField="label"
                  yFields={["value"]}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Alerts */}
      <Card>
        <CardHeader>
        <CardTitle>Forecast Alerts</CardTitle>
        <CardDescription>Automated alerts and recommendations</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forecastAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${
                  selectedAlert?.id === alert.id ? "border-primary-500" : "border-gray-200"
                }`}
                onClick={() => setSelectedAlert(alert)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{alert.message}</h4>
                    <p className="text-xs text-gray-500">{alert.impact}</p>
                  </div>
                  <Badge variant={alert.type}>{alert.type}</Badge>
                </div>
                <div className="mt-3">
                  <h5 className="text-xs font-medium text-gray-500">Recommendation</h5>
                  <p className="text-sm mt-1">{alert.recommendation}</p>
                </div>
                <div className="mt-3">
                  <h5 className="text-xs font-medium text-gray-500">Affected Metrics</h5>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {alert.affectedMetrics.map((metric) => (
                      <Badge key={metric} variant="gray" size="sm">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emerging Trends */}
      <Card>
        <CardHeader>
        <CardTitle>Emerging Trends</CardTitle>
        <CardDescription>Identify and analyze key trends</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forecastTrends.map((trend) => (
              <div
                key={trend.id}
                className={`p-4 rounded-lg border ${
                  selectedTrend?.id === trend.id ? "border-primary-500" : "border-gray-200"
                }`}
                onClick={() => setSelectedTrend(trend)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{trend.name}</h4>
                    <p className="text-xs text-gray-500">{trend.description}</p>
                  </div>
                  <Badge variant={trend.direction === "positive" ? "success" : "warning"}>
                    {trend.strength * 100}% strength
                  </Badge>
                </div>
                <div className="mt-3">
                  <h5 className="text-xs font-medium text-gray-500">Supporting Data</h5>
                  <ul className="mt-1 space-y-1">
                    {trend.supportingData.map((data, index) => (
                      <li key={index} className="text-xs text-gray-500">
                        • {data}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

