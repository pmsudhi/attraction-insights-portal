import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import {
  ShieldCheckIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  CloudIcon,
  ArrowsPointingOutIcon,
  DevicePhoneMobileIcon,
  QueueListIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline"
import { LineChart, BarChart } from "../ui/charts"
import { ChartData } from "@/types"

// Sample data for safety and risk management
const safetyMetrics = [
  {
    id: "incidents",
    name: "Safety Incidents",
    value: 12,
    trend: -25,
    target: 15,
    status: "on-track",
    category: "Safety",
    description: "Total reportable incidents this quarter",
  },
  {
    id: "response",
    name: "Response Time",
    value: 4.2,
    unit: "min",
    trend: -15,
    target: 5,
    status: "on-track",
    category: "Safety",
    description: "Average emergency response time",
  },
  {
    id: "training",
    name: "Training Completion",
    value: 98,
    unit: "%",
    trend: 2,
    target: 95,
    status: "on-track",
    category: "Safety",
    description: "Safety training completion rate",
  },
]

// Sample data for operational resilience
const resilienceMetrics = [
  {
    id: "uptime",
    name: "System Uptime",
    value: 99.9,
    unit: "%",
    trend: 0.2,
    target: 99.5,
    status: "on-track",
    category: "Resilience",
    description: "Critical system availability",
  },
  {
    id: "recovery",
    name: "Recovery Time",
    value: 45,
    unit: "min",
    trend: -20,
    target: 60,
    status: "on-track",
    category: "Resilience",
    description: "Average incident recovery time",
  },
  {
    id: "backup",
    name: "Backup Success",
    value: 100,
    unit: "%",
    trend: 0,
    target: 99.9,
    status: "on-track",
    category: "Resilience",
    description: "Data backup success rate",
  },
]

// Sample data for process improvement
const processMetrics = [
  {
    id: "efficiency",
    name: "Process Efficiency",
    value: 87,
    unit: "%",
    trend: 5,
    target: 85,
    status: "on-track",
    category: "Process",
    description: "Overall process efficiency score",
  },
  {
    id: "automation",
    name: "Automation Rate",
    value: 65,
    unit: "%",
    trend: 8,
    target: 70,
    status: "at-risk",
    category: "Process",
    description: "Process automation coverage",
  },
  {
    id: "defects",
    name: "Defect Rate",
    value: 0.8,
    unit: "%",
    trend: -20,
    target: 1.0,
    status: "on-track",
    category: "Process",
    description: "Process defect rate",
  },
]

// Sample data for maintenance effectiveness
const maintenanceMetrics = [
  {
    id: "preventive",
    name: "Preventive Maintenance",
    value: 92,
    unit: "%",
    trend: 3,
    target: 90,
    status: "on-track",
    category: "Maintenance",
    description: "Preventive maintenance completion rate",
  },
  {
    id: "downtime",
    name: "Unplanned Downtime",
    value: 1.2,
    unit: "%",
    trend: -15,
    target: 1.5,
    status: "on-track",
    category: "Maintenance",
    description: "Equipment unplanned downtime",
  },
  {
    id: "cost",
    name: "Maintenance Cost",
    value: 85,
    unit: "%",
    trend: -5,
    target: 90,
    status: "on-track",
    category: "Maintenance",
    description: "Maintenance cost vs. budget",
  },
]

// Sample data for guest flow
const guestFlowData = {
  hourly: [
    { hour: "9:00", count: 1200 },
    { hour: "10:00", count: 2500 },
    { hour: "11:00", count: 3800 },
    { hour: "12:00", count: 4200 },
    { hour: "13:00", count: 4500 },
    { hour: "14:00", count: 4800 },
    { hour: "15:00", count: 4200 },
    { hour: "16:00", count: 3500 },
    { hour: "17:00", count: 2800 },
    { hour: "18:00", count: 2000 },
  ],
  bottlenecks: [
    { location: "Main Entrance", waitTime: 15, impact: "high" },
    { location: "Food Court", waitTime: 12, impact: "medium" },
    { location: "Restrooms", waitTime: 8, impact: "low" },
  ],
}

// Sample data for weather response
const weatherResponseData = {
  protocols: [
    {
      name: "Light Rain Protocol",
      effectiveness: 95,
      responseTime: 5,
      impact: "low",
    },
    {
      name: "Heavy Rain Protocol",
      effectiveness: 88,
      responseTime: 8,
      impact: "medium",
    },
    {
      name: "Storm Protocol",
      effectiveness: 92,
      responseTime: 10,
      impact: "high",
    },
  ],
  incidents: [
    { date: "2024-01", count: 3, severity: "low" },
    { date: "2024-02", count: 5, severity: "medium" },
    { date: "2024-03", count: 2, severity: "low" },
  ],
}

// Sample data for capacity balancing
const capacityData = {
  attractions: [
    { name: "Roller Coaster A", utilization: 85, waitTime: 25, satisfaction: 4.5 },
    { name: "Water Ride B", utilization: 92, waitTime: 35, satisfaction: 4.2 },
    { name: "Dark Ride C", utilization: 78, waitTime: 15, satisfaction: 4.8 },
  ],
  recommendations: [
    { attraction: "Roller Coaster A", action: "Add Express Lane", impact: "high" },
    { attraction: "Water Ride B", action: "Increase Capacity", impact: "medium" },
    { attraction: "Dark Ride C", action: "Optimize Loading", impact: "low" },
  ],
}

// Sample data for mobile app impact
const mobileAppData = {
  metrics: [
    { name: "App Downloads", value: 25000, trend: 15 },
    { name: "Active Users", value: 18000, trend: 20 },
    { name: "Digital Tickets", value: 65, unit: "%", trend: 10 },
    { name: "Mobile Orders", value: 45, unit: "%", trend: 25 },
  ],
  features: [
    { name: "Virtual Queue", adoption: 75, satisfaction: 4.6 },
    { name: "Mobile Ordering", adoption: 60, satisfaction: 4.4 },
    { name: "Digital Maps", adoption: 85, satisfaction: 4.7 },
  ],
}

// Sample data for virtual queue
const virtualQueueData = {
  metrics: [
    { name: "Adoption Rate", value: 75, unit: "%", trend: 15 },
    { name: "Wait Time Reduction", value: 45, unit: "%", trend: 20 },
    { name: "Guest Satisfaction", value: 4.6, trend: 0.3 },
  ],
  usage: [
    { time: "10:00", count: 1200 },
    { time: "11:00", count: 1800 },
    { time: "12:00", count: 2200 },
    { time: "13:00", count: 2500 },
    { time: "14:00", count: 2300 },
  ],
}

// Sample data for special events
const specialEventData = {
  events: [
    {
      name: "Summer Festival",
      attendance: 15000,
      revenue: 450000,
      satisfaction: 4.7,
      operationalImpact: "medium",
    },
    {
      name: "Halloween Event",
      attendance: 12000,
      revenue: 380000,
      satisfaction: 4.8,
      operationalImpact: "high",
    },
    {
      name: "Winter Wonderland",
      attendance: 10000,
      revenue: 320000,
      satisfaction: 4.6,
      operationalImpact: "low",
    },
  ],
  metrics: [
    { name: "Staff Utilization", value: 92, unit: "%", trend: 5 },
    { name: "Resource Efficiency", value: 88, unit: "%", trend: 8 },
    { name: "Cost per Guest", value: 25, unit: "USD", trend: -10 },
  ],
}

// Enhanced safety and risk management data
const riskAssessmentData = {
  categories: [
    {
      name: "Operational Risk",
      level: "medium",
      score: 65,
      trends: [
        { date: "2024-01", value: 70 },
        { date: "2024-02", value: 68 },
        { date: "2024-03", value: 65 },
      ],
    },
    {
      name: "Safety Risk",
      level: "low",
      score: 30,
      trends: [
        { date: "2024-01", value: 35 },
        { date: "2024-02", value: 32 },
        { date: "2024-03", value: 30 },
      ],
    },
    {
      name: "Environmental Risk",
      level: "high",
      score: 75,
      trends: [
        { date: "2024-01", value: 72 },
        { date: "2024-02", value: 74 },
        { date: "2024-03", value: 75 },
      ],
    },
  ],
  incidents: [
    {
      id: "INC-001",
      type: "Safety",
      severity: "medium",
      location: "Main Entrance",
      date: "2024-03-15",
      status: "resolved",
      responseTime: 8,
      resolutionTime: 45,
    },
    {
      id: "INC-002",
      type: "Operational",
      severity: "low",
      location: "Food Court",
      date: "2024-03-14",
      status: "resolved",
      responseTime: 5,
      resolutionTime: 30,
    },
    {
      id: "INC-003",
      type: "Environmental",
      severity: "high",
      location: "Water Park",
      date: "2024-03-13",
      status: "resolved",
      responseTime: 12,
      resolutionTime: 60,
    },
  ],
}

// Enhanced operational resilience data
const enhancedResilienceData = {
  weatherImpact: {
    current: {
      condition: "Light Rain",
      impact: "low",
      affectedAreas: ["Outdoor Rides", "Food Court"],
      mitigationStatus: "active",
    },
    forecast: [
      { date: "2024-03-16", condition: "Clear", impact: "none" },
      { date: "2024-03-17", condition: "Heavy Rain", impact: "high" },
      { date: "2024-03-18", condition: "Light Rain", impact: "low" },
    ],
    historicalImpact: [
      { month: "Jan", incidents: 3, downtime: 120 },
      { month: "Feb", incidents: 5, downtime: 180 },
      { month: "Mar", incidents: 2, downtime: 90 },
    ],
  },
  businessContinuity: {
    metrics: [
      {
        name: "Recovery Time Objective",
        value: 4,
        unit: "hours",
        status: "on-track",
      },
      {
        name: "Recovery Point Objective",
        value: 1,
        unit: "hour",
        status: "on-track",
      },
      {
        name: "Business Impact Analysis Score",
        value: 85,
        unit: "%",
        status: "on-track",
      },
    ],
    contingencyPlans: [
      {
        name: "Power Outage Response",
        effectiveness: 92,
        lastTested: "2024-02-15",
        status: "active",
      },
      {
        name: "Severe Weather Protocol",
        effectiveness: 88,
        lastTested: "2024-03-01",
        status: "active",
      },
      {
        name: "System Failure Recovery",
        effectiveness: 95,
        lastTested: "2024-01-20",
        status: "active",
      },
    ],
  },
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "on-track":
      return "success"
    case "at-risk":
      return "warning"
    case "behind":
      return "danger"
    default:
      return "gray"
  }
}

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value)
}

const formatPercentage = (value: number) => {
  return `${value >= 0 ? "+" : ""}${value}%`
}

export const COOOperationalExcellenceHub = () => {
  return (
    <div className="space-y-6">
      {/* Enhanced Safety and Risk Management */}
      <Card>
        <CardHeader>
        <CardTitle>Safety and Risk Management</CardTitle>
        <CardDescription>Comprehensive safety metrics, risk assessment, and incident tracking</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Basic Safety Metrics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {safetyMetrics.map((metric) => (
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
                            {metric.unit ? `${formatNumber(metric.value)}${metric.unit}` : formatNumber(metric.value)}
                          </p>
                          <span className={`ml-2 text-sm ${metric.trend >= 0 ? "text-success-600" : "text-danger-600"}`}>
                            {formatPercentage(metric.trend)}
                          </span>
                        </div>
                      </div>
                      <div className="p-2 bg-primary-50 rounded-md">
                        <ShieldCheckIcon className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Risk Assessment Visualization */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Risk Assessment</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    {riskAssessmentData.categories.map((category) => (
                      <div key={category.name} className="p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{category.name}</span>
                          <Badge
                            variant={
                              category.level === "high"
                                ? "danger"
                                : category.level === "medium"
                                ? "warning"
                                : "success"
                            }
                          >
                            Score: {category.score}
                          </Badge>
                        </div>
                        <div className="h-32 mt-2">
                          <LineChart
                            data={{
                              labels: category.trends.map((t) => t.date),
                              datasets: [
                                {
                                  label: "Risk Score",
                                  data: category.trends.map((t) => t.value),
                                },
                              ],
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Incidents</h4>
                  <div className="space-y-3">
                    {riskAssessmentData.incidents.map((incident) => (
                      <div key={incident.id} className="p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{incident.type} Incident</p>
                            <p className="text-xs text-gray-500">{incident.location} - {incident.date}</p>
                          </div>
                          <Badge
                            variant={
                              incident.severity === "high"
                                ? "danger"
                                : incident.severity === "medium"
                                ? "warning"
                                : "success"
                            }
                          >
                            {incident.severity}
                          </Badge>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Response: {incident.responseTime}min | Resolution: {incident.resolutionTime}min
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Operational Resilience */}
      <Card>
        <CardHeader>
        <CardTitle>Operational Resilience</CardTitle>
        <CardDescription>Weather impact modeling, business continuity, and contingency planning</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Weather Impact Analysis */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Weather Impact Analysis</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">Current Weather Impact</span>
                      <Badge
                        variant={
                          enhancedResilienceData.weatherImpact.current.impact === "high"
                            ? "danger"
                            : enhancedResilienceData.weatherImpact.current.impact === "medium"
                            ? "warning"
                            : "success"
                        }
                      >
                        {enhancedResilienceData.weatherImpact.current.condition}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>Affected Areas: {enhancedResilienceData.weatherImpact.current.affectedAreas.join(", ")}</p>
                      <p>Mitigation Status: {enhancedResilienceData.weatherImpact.current.mitigationStatus}</p>
                    </div>
                  </div>
                  <div className="h-64 mt-4">
                    <BarChart
                      data={{
                        labels: enhancedResilienceData.weatherImpact.historicalImpact.map((h) => h.month),
                        datasets: [
                          {
                            label: "Weather Incidents",
                            data: enhancedResilienceData.weatherImpact.historicalImpact.map((h) => h.incidents),
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Weather Forecast</h4>
                  <div className="space-y-3">
                    {enhancedResilienceData.weatherImpact.forecast.map((forecast) => (
                      <div key={forecast.date} className="p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{forecast.date}</p>
                            <p className="text-sm text-gray-500">{forecast.condition}</p>
                          </div>
                          <Badge
                            variant={
                              forecast.impact === "high"
                                ? "danger"
                                : forecast.impact === "medium"
                                ? "warning"
                                : "success"
                            }
                          >
                            {forecast.impact} impact
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Business Continuity */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Business Continuity</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Continuity Metrics</h4>
                  <div className="space-y-3">
                    {enhancedResilienceData.businessContinuity.metrics.map((metric) => (
                      <div key={metric.name} className="p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{metric.name}</span>
                          <Badge variant={getStatusColor(metric.status)}>
                            {metric.value}{metric.unit}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Contingency Plans</h4>
                  <div className="space-y-3">
                    {enhancedResilienceData.businessContinuity.contingencyPlans.map((plan) => (
                      <div key={plan.name} className="p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{plan.name}</p>
                            <p className="text-xs text-gray-500">Last Tested: {plan.lastTested}</p>
                          </div>
                          <Badge
                            variant={
                              plan.effectiveness >= 90
                                ? "success"
                                : plan.effectiveness >= 80
                                ? "warning"
                                : "danger"
                            }
                          >
                            {plan.effectiveness}% effective
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Process Improvement */}
      <Card>
        <CardHeader>
        <CardTitle>Process Improvement</CardTitle>
        <CardDescription>Process efficiency and automation metrics</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {processMetrics.map((metric) => (
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
                          {metric.unit ? `${formatNumber(metric.value)}${metric.unit}` : formatNumber(metric.value)}
                        </p>
                        <span className={`ml-2 text-sm ${metric.trend >= 0 ? "text-success-600" : "text-danger-600"}`}>
                          {formatPercentage(metric.trend)}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 bg-primary-50 rounded-md">
                      <WrenchScrewdriverIcon className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Effectiveness */}
      <Card>
        <CardHeader>
        <CardTitle>Maintenance Effectiveness</CardTitle>
        <CardDescription>Equipment reliability and maintenance metrics</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {maintenanceMetrics.map((metric) => (
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
                          {metric.unit ? `${formatNumber(metric.value)}${metric.unit}` : formatNumber(metric.value)}
                        </p>
                        <span className={`ml-2 text-sm ${metric.trend >= 0 ? "text-success-600" : "text-danger-600"}`}>
                          {formatPercentage(metric.trend)}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 bg-primary-50 rounded-md">
                      <WrenchScrewdriverIcon className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Guest Flow Visualization */}
      <Card>
        <CardHeader>
        <CardTitle>Guest Flow Analysis</CardTitle>
        <CardDescription>Real-time guest flow and bottleneck identification</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Hourly Guest Flow</h3>
              <div className="h-64">
                <LineChart
                  data={{
                    labels: guestFlowData.hourly.map((h) => h.hour),
                    datasets: [
                      {
                        label: "Guest Count",
                        data: guestFlowData.hourly.map((h) => h.count),
                      },
                    ],
                  }}
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Bottleneck Analysis</h3>
              <div className="space-y-4">
                {guestFlowData.bottlenecks.map((bottleneck) => (
                  <div key={bottleneck.location} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">{bottleneck.location}</span>
                      <Badge
                        variant={
                          bottleneck.impact === "high"
                            ? "danger"
                            : bottleneck.impact === "medium"
                            ? "warning"
                            : "success"
                        }
                      >
                        {bottleneck.waitTime} min wait
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Response Protocol */}
      <Card>
        <CardHeader>
        <CardTitle>Weather Response Protocol</CardTitle>
        <CardDescription>Weather response effectiveness and incident tracking</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Protocol Effectiveness</h3>
              <div className="space-y-4">
                {weatherResponseData.protocols.map((protocol) => (
                  <div key={protocol.name} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">{protocol.name}</span>
                      <Badge
                        variant={
                          protocol.effectiveness >= 90
                            ? "success"
                            : protocol.effectiveness >= 80
                            ? "warning"
                            : "danger"
                        }
                      >
                        {protocol.effectiveness}% effective
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Response Time: {protocol.responseTime} minutes
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Weather Incidents</h3>
              <div className="h-64">
                <BarChart
                  data={{
                    labels: weatherResponseData.incidents.map((i) => i.date),
                    datasets: [
                      {
                        label: "Incidents",
                        data: weatherResponseData.incidents.map((i) => i.count),
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Capacity Balancing */}
      <Card>
        <CardHeader>
        <CardTitle>Capacity Balancing</CardTitle>
        <CardDescription>Attraction utilization and optimization recommendations</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Attraction Utilization</h3>
              <div className="space-y-4">
                {capacityData.attractions.map((attraction) => (
                  <div key={attraction.name} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">{attraction.name}</span>
                      <Badge
                        variant={
                          attraction.utilization >= 90
                            ? "danger"
                            : attraction.utilization >= 80
                            ? "warning"
                            : "success"
                        }
                      >
                        {attraction.utilization}% utilized
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Wait Time: {attraction.waitTime} min | Satisfaction: {attraction.satisfaction}/5
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Optimization Recommendations</h3>
              <div className="space-y-4">
                {capacityData.recommendations.map((rec) => (
                  <div key={rec.attraction} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">{rec.attraction}</span>
                      <Badge
                        variant={
                          rec.impact === "high"
                            ? "danger"
                            : rec.impact === "medium"
                            ? "warning"
                            : "success"
                        }
                      >
                        {rec.action}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile App Impact */}
      <Card>
        <CardHeader>
        <CardTitle>Mobile App Impact</CardTitle>
        <CardDescription>Mobile app utilization and feature effectiveness</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mobileAppData.metrics.map((metric) => (
                  <div key={metric.name} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">{metric.name}</span>
                      <span className="text-sm text-gray-900">
                        {metric.unit ? `${formatNumber(metric.value)}${metric.unit}` : formatNumber(metric.value)}
                      </span>
                    </div>
                    <div className="text-xs text-success-600 mt-1">
                      {formatPercentage(metric.trend)} vs last period
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Feature Adoption</h3>
              <div className="space-y-4">
                {mobileAppData.features.map((feature) => (
                  <div key={feature.name} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">{feature.name}</span>
                      <Badge variant="default">{feature.adoption}% adopted</Badge>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Satisfaction: {feature.satisfaction}/5
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Virtual Queue Implementation */}
      <Card>
        <CardHeader>
        <CardTitle>Virtual Queue Implementation</CardTitle>
        <CardDescription>Virtual queue effectiveness and guest satisfaction</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                {virtualQueueData.metrics.map((metric) => (
                  <div key={metric.name} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">{metric.name}</span>
                      <span className="text-sm text-gray-900">
                        {metric.unit ? `${formatNumber(metric.value)}${metric.unit}` : formatNumber(metric.value)}
                      </span>
                    </div>
                    <div className="text-xs text-success-600 mt-1">
                      {formatPercentage(metric.trend)} vs last period
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Usage Pattern</h3>
              <div className="h-64">
                <LineChart
                  data={{
                    labels: virtualQueueData.usage.map((u) => u.time),
                    datasets: [
                      {
                        label: "Virtual Queue Users",
                        data: virtualQueueData.usage.map((u) => u.count),
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Special Event Impact */}
      <Card>
        <CardHeader>
        <CardTitle>Special Event Impact</CardTitle>
        <CardDescription>Operational impact and performance metrics for special events</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Event Performance</h3>
              <div className="space-y-4">
                {specialEventData.events.map((event) => (
                  <div key={event.name} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">{event.name}</span>
                      <Badge
                        variant={
                          event.operationalImpact === "high"
                            ? "danger"
                            : event.operationalImpact === "medium"
                            ? "warning"
                            : "success"
                        }
                      >
                        {event.operationalImpact} impact
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Attendance: {formatNumber(event.attendance)} | Revenue: ${formatNumber(event.revenue)} |
                      Satisfaction: {event.satisfaction}/5
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Operational Metrics</h3>
              <div className="space-y-4">
                {specialEventData.metrics.map((metric) => (
                  <div key={metric.name} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">{metric.name}</span>
                      <span className="text-sm text-gray-900">
                        {metric.unit ? `${formatNumber(metric.value)}${metric.unit}` : formatNumber(metric.value)}
                      </span>
                    </div>
                    <div className="text-xs text-success-600 mt-1">
                      {formatPercentage(metric.trend)} vs last period
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 