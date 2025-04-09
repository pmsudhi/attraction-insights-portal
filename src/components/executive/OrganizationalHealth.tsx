import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import {
  UserGroupIcon,
  HeartIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline"
import { LineChart } from "../ui/charts"

interface HealthMetric {
  id: string
  name: string
  value: number
  unit: string
  trend: number
  target: number
  status: "on-track" | "at-risk" | "behind"
  category: string
  description: string
}

const healthMetrics: HealthMetric[] = [
  {
    id: "engagement",
    name: "Employee Engagement",
    value: 82,
    unit: "%",
    trend: 5.2,
    target: 80,
    status: "on-track",
    category: "Workforce",
    description: "Employee satisfaction and engagement scores",
  },
  {
    id: "satisfaction",
    name: "Guest Satisfaction",
    value: 88,
    unit: "%",
    trend: 2.8,
    target: 85,
    status: "on-track",
    category: "Experience",
    description: "Overall guest satisfaction and NPS scores",
  },
  {
    id: "safety",
    name: "Safety Incident Rate",
    value: 0.8,
    unit: "per 1000",
    trend: -0.3,
    target: 1.0,
    status: "on-track",
    category: "Safety",
    description: "Reportable safety incidents per 1000 visitors",
  },
  {
    id: "compliance",
    name: "Regulatory Compliance",
    value: 98,
    unit: "%",
    trend: 1.5,
    target: 95,
    status: "on-track",
    category: "Compliance",
    description: "Regulatory compliance and audit scores",
  },
  {
    id: "environmental",
    name: "Environmental Impact",
    value: 75,
    unit: "%",
    trend: 8.5,
    target: 70,
    status: "on-track",
    category: "Sustainability",
    description: "Environmental sustainability and carbon reduction",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "on-track":
      return "default"
    case "at-risk":
      return "secondary"
    case "behind":
      return "destructive"
    default:
      return "default"
  }
}

const formatNumber = (value: number) => {
  return value.toFixed(1)
}

const formatPercentage = (value: number) => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}pp`
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "on-track":
      return <ChartBarIcon className="h-5 w-5 text-green-500" />
    case "at-risk":
      return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
    case "behind":
      return <ArrowTrendingDownIcon className="h-5 w-5 text-red-500" />
    default:
      return null
  }
}

export const OrganizationalHealth = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {healthMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900">{metric.name}</p>
                    <Badge variant={getStatusColor(metric.status)}>{metric.status}</Badge>
                  </div>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                  <div className="flex items-center mt-2">
                    <p className="text-2xl font-semibold text-gray-900">
                      {metric.unit === "USD" ? `$${formatNumber(metric.value)}M` : `${formatNumber(metric.value)}${metric.unit}`}
                    </p>
                    <span className={`ml-2 text-sm ${metric.trend >= 0 ? "text-success-600" : "text-danger-600"}`}>
                      {formatPercentage(metric.trend)}
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-primary-50 rounded-md">
                  {metric.id === "engagement" && <UserGroupIcon className="h-6 w-6 text-primary-600" />}
                  {metric.id === "satisfaction" && <HeartIcon className="h-6 w-6 text-primary-600" />}
                  {metric.id === "safety" && <ShieldCheckIcon className="h-6 w-6 text-primary-600" />}
                  {metric.id === "compliance" && <ExclamationTriangleIcon className="h-6 w-6 text-primary-600" />}
                  {metric.id === "environmental" && <ChartBarIcon className="h-6 w-6 text-primary-600" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organizational Health Trends</CardTitle>
          <CardDescription>Historical performance and trend analysis</CardDescription>
          <div className="mt-4">
            <Button variant="outline" size="sm">
              <ChartBarIcon className="h-4 w-4" />
              Health Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <LineChart
              data={[
                { label: "Q1", value: 85 },
                { label: "Q2", value: 88 },
                { label: "Q3", value: 92 },
                { label: "Q4", value: 90 }
              ]}
              xField="label"
              yFields={["value"]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 