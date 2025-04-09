"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import {
  ArrowPathIcon,
  ChevronDownIcon,
  UsersIcon,
  ClockIcon,
  CalendarIcon,
  CloudIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline"
import { PieChart, LineChart, BarChart } from "../../components/ui/charts"

// Sample data for attendance forecasting
const attendanceForecast = {
  daily: [
    { date: "2025-04-01", forecast: 12500, actual: 12350, variance: -1.2 },
    { date: "2025-04-02", forecast: 11800, actual: 12100, variance: 2.5 },
    { date: "2025-04-03", forecast: 15200, actual: 15800, variance: 3.9 },
    { date: "2025-04-04", forecast: 18500, actual: 19200, variance: 3.8 },
    { date: "2025-04-05", forecast: 22300, actual: 21800, variance: -2.2 },
    { date: "2025-04-06", forecast: 19800, actual: 20100, variance: 1.5 },
    { date: "2025-04-07", forecast: 10200, actual: 9800, variance: -3.9 },
  ],
  weekly: [
    { week: "Week 1", forecast: 98000, actual: 99500, variance: 1.5 },
    { week: "Week 2", forecast: 105000, actual: 108200, variance: 3.0 },
    { week: "Week 3", forecast: 112000, actual: 110500, variance: -1.3 },
    { week: "Week 4", forecast: 108000, actual: 107200, variance: -0.7 },
  ],
  monthly: [
    { month: "January", forecast: 320000, actual: 315000, variance: -1.6 },
    { month: "February", forecast: 290000, actual: 285000, variance: -1.7 },
    { month: "March", forecast: 380000, actual: 395000, variance: 3.9 },
    { month: "April", forecast: 420000, actual: 428000, variance: 1.9 },
  ],
}

// Sample data for capacity planning
const capacityData = {
  attractions: [
    { name: "Thrill Seeker", capacity: 1200, utilization: 85, waitTime: 45 },
    { name: "Splash Mountain", capacity: 900, utilization: 92, waitTime: 60 },
    { name: "Fantasy Castle", capacity: 1500, utilization: 78, waitTime: 30 },
    { name: "Adventure Land", capacity: 2000, utilization: 65, waitTime: 20 },
    { name: "Space Explorer", capacity: 800, utilization: 95, waitTime: 75 },
  ],
  areas: [
    { name: "Main Street", capacity: 5000, utilization: 82, peakTime: "12:00 PM - 2:00 PM" },
    { name: "Adventure Zone", capacity: 4500, utilization: 75, peakTime: "1:00 PM - 3:00 PM" },
    { name: "Fantasy World", capacity: 6000, utilization: 68, peakTime: "11:00 AM - 1:00 PM" },
    { name: "Future Land", capacity: 3500, utilization: 90, peakTime: "2:00 PM - 4:00 PM" },
    { name: "Water Park", capacity: 2500, utilization: 95, peakTime: "1:00 PM - 5:00 PM" },
  ],
}

// Sample data for queue optimization
const queueOptimizationData = {
  strategies: [
    {
      name: "Virtual Queue Expansion",
      impact: "Reduces wait times by 35%",
      costImpact: "Medium",
      implementationTime: "2-3 months",
      roi: "High",
    },
    {
      name: "Dynamic Pricing",
      impact: "Reduces peak attendance by 15%",
      costImpact: "Low",
      implementationTime: "1 month",
      roi: "High",
    },
    {
      name: "Capacity Reallocation",
      impact: "Improves utilization by 20%",
      costImpact: "Low",
      implementationTime: "Immediate",
      roi: "Medium",
    },
    {
      name: "Express Pass Program",
      impact: "Additional revenue stream, 10% capacity allocation",
      costImpact: "Medium",
      implementationTime: "1-2 months",
      roi: "High",
    },
  ],
}

// Add new types for advanced modeling
interface GuestSegment {
  id: string
  name: string
  description: string
  percentage: number
  spendingProfile: {
    admission: number
    food: number
    retail: number
    experiences: number
  }
  visitPattern: {
    frequency: number
    preferredDays: string[]
    averageStay: number
  }
}

interface WeatherImpact {
  condition: string
  impact: number
  confidence: number
  affectedSegments: string[]
}

interface CapacityModel {
  attractionId: string
  name: string
  theoreticalCapacity: number
  actualCapacity: number
  utilizationRate: number
  waitTime: number
  bottlenecks: string[]
  optimizationSuggestions: string[]
}

// Add sample data for new features
const guestSegments: GuestSegment[] = [
  {
    id: "seg-1",
    name: "Local Families",
    description: "Local residents with children",
    percentage: 35,
    spendingProfile: {
      admission: 85,
      food: 45,
      retail: 30,
      experiences: 20,
    },
    visitPattern: {
      frequency: 4,
      preferredDays: ["Saturday", "Sunday"],
      averageStay: 6,
    },
  },
  {
    id: "seg-2",
    name: "International Tourists",
    description: "International visitors",
    percentage: 25,
    spendingProfile: {
      admission: 95,
      food: 55,
      retail: 75,
      experiences: 40,
    },
    visitPattern: {
      frequency: 1,
      preferredDays: ["Monday", "Tuesday", "Wednesday"],
      averageStay: 8,
    },
  },
  // Add more segments...
]

const weatherImpacts: WeatherImpact[] = [
  {
    condition: "Sunny",
    impact: 1.15,
    confidence: 0.95,
    affectedSegments: ["Local Families", "International Tourists"],
  },
  {
    condition: "Rainy",
    impact: 0.85,
    confidence: 0.90,
    affectedSegments: ["Local Families"],
  },
  // Add more weather impacts...
]

const capacityModels: CapacityModel[] = [
  {
    attractionId: "attr-1",
    name: "Thrill Seeker",
    theoreticalCapacity: 1200,
    actualCapacity: 1000,
    utilizationRate: 85,
    waitTime: 45,
    bottlenecks: ["Loading area", "Safety checks"],
    optimizationSuggestions: [
      "Implement virtual queue",
      "Optimize loading procedures",
      "Add express lane",
    ],
  },
  // Add more capacity models...
]

export default function AttendanceModeling() {
  const [forecastPeriod, setForecastPeriod] = useState<"daily" | "weekly" | "monthly">("daily")
  const [selectedProperty, setSelectedProperty] = useState("All Properties")
  const [selectedSegment, setSelectedSegment] = useState<GuestSegment | null>(null)
  const [selectedWeather, setSelectedWeather] = useState<WeatherImpact | null>(null)
  const [selectedCapacity, setSelectedCapacity] = useState<CapacityModel | null>(null)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Attendance Forecast"
          subtitle="Forecast attendance based on historical data and external factors"
        />
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <Button variant="outline" size="sm">
              <span className="flex items-center">
                <ChevronDownIcon className="h-4 w-4 mr-2" />
                {selectedProperty}
              </span>
            </Button>
            <Button variant="outline" size="sm">
              <span className="flex items-center">
                <ArrowPathIcon className="h-4 w-4 mr-2" />
                Refresh
              </span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Forecast Accuracy</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">97.8%</p>
                    <p className="mt-1 text-xs text-success-600">+1.2pp from last month</p>
                  </div>
                  <div className="p-2 bg-primary-50 rounded-md">
                    <UsersIcon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Average Wait Time</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">42 min</p>
                    <p className="mt-1 text-xs text-danger-600">+5 min from target</p>
                  </div>
                  <div className="p-2 bg-primary-50 rounded-md">
                    <ClockIcon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Peak Day Forecast</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">Jul 4</p>
                    <p className="mt-1 text-xs text-gray-500">32,500 guests</p>
                  </div>
                  <div className="p-2 bg-primary-50 rounded-md">
                    <CalendarIcon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Weather Impact</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">-8.5%</p>
                    <p className="mt-1 text-xs text-gray-500">On rainy days</p>
                  </div>
                  <div className="p-2 bg-primary-50 rounded-md">
                    <CloudIcon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="h-80 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center mb-6">
            <p className="text-gray-500">Attendance forecast chart will be displayed here</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {forecastPeriod === "daily" ? "Date" : forecastPeriod === "weekly" ? "Week" : "Month"}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Forecast
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actual
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Variance
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceForecast[forecastPeriod].map((item) => (
                  <tr key={`${forecastPeriod}-${item.date || item.week || item.month}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {forecastPeriod === "daily" ? item.date : forecastPeriod === "weekly" ? item.week : item.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.forecast.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.actual.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-sm ${
                          item.variance > 0
                            ? "text-success-600"
                            : item.variance < 0
                              ? "text-danger-600"
                              : "text-gray-500"
                        }`}
                      >
                        {item.variance > 0 ? "+" : ""}
                        {item.variance}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
        <CardTitle>Capacity Planning</CardTitle>
        <CardDescription>Optimize capacity allocation and utilization</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Attraction Capacity</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Attraction
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Capacity/hr
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Utilization
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Wait Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {capacityData.attractions.map((attraction) => (
                      <tr key={attraction.name}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {attraction.name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{attraction.capacity}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div
                                className={`h-2.5 rounded-full ${
                                  attraction.utilization > 90
                                    ? "bg-danger-600"
                                    : attraction.utilization > 75
                                      ? "bg-warning-600"
                                      : "bg-success-600"
                                }`}
                                style={{ width: `${attraction.utilization}%` }}
                               />
                            </div>
                            <span className="text-sm text-gray-500">{attraction.utilization}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{attraction.waitTime} min</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Area Capacity</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Area
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Capacity
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Utilization
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Peak Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {capacityData.areas.map((area) => (
                      <tr key={area.name}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{area.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{area.capacity}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div
                                className={`h-2.5 rounded-full ${
                                  area.utilization > 90
                                    ? "bg-danger-600"
                                    : area.utilization > 75
                                      ? "bg-warning-600"
                                      : "bg-success-600"
                                }`}
                                style={{ width: `${area.utilization}%` }}
                               />
                            </div>
                            <span className="text-sm text-gray-500">{area.utilization}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{area.peakTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
        <CardTitle>Queue & Wait Time Optimization</CardTitle>
        <CardDescription>Strategies to reduce wait times and improve guest experience</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Optimization Strategies</h3>
              <div className="space-y-3">
                {queueOptimizationData.strategies.map((strategy) => (
                  <div key={strategy.name} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">{strategy.name}</span>
                      <Badge
                        variant={strategy.roi === "High" ? "default" : strategy.roi === "Medium" ? "secondary" : "outline"}
                      >
                        {strategy.roi} ROI
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{strategy.impact}</div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Cost Impact: {strategy.costImpact}</span>
                      <span>Implementation: {strategy.implementationTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Wait Time Analysis</h3>
              <div className="h-64 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Wait time analysis chart will be displayed here</p>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Revenue Impact</h3>
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary-50 rounded-md mr-3">
                      <CurrencyDollarIcon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Estimated Revenue Impact</p>
                      <p className="text-xs text-gray-500">
                        Reducing average wait time by 10 minutes increases per capita spending by $4.25
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-medium text-success-600">+$1.2M annual revenue opportunity</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guest Segmentation Analysis */}
      <Card>
        <CardHeader>
        <CardTitle>Guest Segmentation Analysis</CardTitle>
        <CardDescription>Analyze guest segments and their behavior patterns</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Guest Segments</h3>
              <div className="space-y-4">
                {guestSegments.map((segment) => (
                  <div
                    key={segment.id}
                    className={`p-4 rounded-lg border ${
                      selectedSegment?.id === segment.id ? "border-primary-500" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedSegment(segment)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{segment.name}</h4>
                        <p className="text-xs text-gray-500">{segment.description}</p>
                      </div>
                      <Badge variant="default">{segment.percentage}%</Badge>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium text-gray-500">Spending Profile</h5>
                        <div className="mt-1 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Admission</span>
                            <span>${segment.spendingProfile.admission}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Food</span>
                            <span>${segment.spendingProfile.food}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Retail</span>
                            <span>${segment.spendingProfile.retail}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Experiences</span>
                            <span>${segment.spendingProfile.experiences}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-gray-500">Visit Pattern</h5>
                        <div className="mt-1 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Frequency</span>
                            <span>{segment.visitPattern.frequency}x/year</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Avg. Stay</span>
                            <span>{segment.visitPattern.averageStay}h</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Segment Distribution</h3>
              <div className="h-80">
                <PieChart
                  data={guestSegments.map(segment => ({
                    label: segment.name,
                    value: segment.percentage
                  }))}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Impact Analysis */}
      <Card>
        <CardHeader>
        <CardTitle>Weather Impact Analysis</CardTitle>
        <CardDescription>Analyze how weather conditions affect attendance</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Weather Conditions</h3>
              <div className="space-y-4">
                {weatherImpacts.map((impact) => (
                  <div
                    key={impact.condition}
                    className={`p-4 rounded-lg border ${
                      selectedWeather?.condition === impact.condition ? "border-primary-500" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedWeather(impact)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{impact.condition}</h4>
                        <p className="text-xs text-gray-500">
                          Impact: {(impact.impact * 100 - 100).toFixed(1)}%
                        </p>
                      </div>
                      <Badge variant={impact.impact > 1 ? "default" : "secondary"}>
                        {impact.confidence * 100}% confidence
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <h5 className="text-xs font-medium text-gray-500">Affected Segments</h5>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {impact.affectedSegments.map((segment) => (
                          <Badge key={segment} variant="default">
                            {segment}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Weather Impact Trend</h3>
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

      {/* Capacity Modeling */}
      <Card>
        <CardHeader>
        <CardTitle>Capacity Modeling</CardTitle>
        <CardDescription>Analyze and optimize attraction capacity</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Attractions</h3>
              <div className="space-y-4">
                {capacityModels.map((model) => (
                  <div
                    key={model.attractionId}
                    className={`p-4 rounded-lg border ${
                      selectedCapacity?.attractionId === model.attractionId ? "border-primary-500" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedCapacity(model)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{model.name}</h4>
                        <p className="text-xs text-gray-500">
                          Utilization: {model.utilizationRate}%
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {model.waitTime} min wait
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <h5 className="text-xs font-medium text-gray-500">Capacity</h5>
                      <div className="mt-1 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Theoretical</span>
                          <span>{model.theoreticalCapacity}/hour</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Actual</span>
                          <span>{model.actualCapacity}/hour</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h5 className="text-xs font-medium text-gray-500">Bottlenecks</h5>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {model.bottlenecks.map((bottleneck) => (
                          <Badge key={bottleneck} variant="secondary">
                            {bottleneck}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3">
                      <h5 className="text-xs font-medium text-gray-500">Optimization Suggestions</h5>
                      <ul className="mt-1 space-y-1">
                        {model.optimizationSuggestions.map((suggestion, index) => (
                          <li key={index} className="text-xs text-gray-500">
                            • {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Capacity Utilization Trend</h3>
              <div className="h-80">
                <BarChart
                  data={capacityModels.map(model => ({
                    name: model.name,
                    utilization: model.utilizationRate,
                    waitTime: model.waitTime
                  }))}
                  xField="name"
                  yFields={["utilization", "waitTime"]}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

