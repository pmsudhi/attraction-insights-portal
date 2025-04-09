import React, { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle,
  CardDescription
} from "../ui/Card"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/Tabs"
import { Badge } from "@/components/ui/Badge"
import { 
  LineChart, 
  BarChart 
} from "@/components/ui/charts"
import { 
  BuildingStorefrontIcon,
  QueueListIcon,
  UserGroupIcon,
  CalendarIcon,
  BellAlertIcon,
  ChartBarIcon,
  SunIcon,
  CloudIcon
} from "@heroicons/react/24/outline"

interface AttractionWeatherImpact {
  name: string
  type: "indoor" | "outdoor"
  weatherCondition: string
  attendanceImpact: number
  revenueImpact: number
  capacityUtilization: number
  recommendations: string[]
}

interface QueueManagement {
  location: string
  currentWaitTime: number
  projectedWaitTime: number
  weatherImpact: number
  recommendations: string[]
}

interface ShowSchedule {
  name: string
  currentSchedule: string
  recommendedSchedule: string
  weatherCondition: string
  impact: number
  rationale: string
}

interface WeatherAlert {
  type: "heat" | "cold" | "rain" | "storm"
  severity: "low" | "medium" | "high"
  message: string
  actions: string[]
  affectedAreas: string[]
}

// Sample data for attraction weather impact
const attractionData: AttractionWeatherImpact[] = [
  {
    name: "Thrill Mountain",
    type: "outdoor",
    weatherCondition: "Rain",
    attendanceImpact: -0.35,
    revenueImpact: -0.25,
    capacityUtilization: 0.45,
    recommendations: [
      "Implement covered queue areas",
      "Add weather protection for control panels",
      "Increase staff for weather-related guest assistance"
    ]
  },
  {
    name: "Adventure Theater",
    type: "indoor",
    weatherCondition: "Rain",
    attendanceImpact: 0.25,
    revenueImpact: 0.15,
    capacityUtilization: 0.85,
    recommendations: [
      "Increase show frequency during inclement weather",
      "Add overflow seating areas",
      "Promote as weather-safe activity"
    ]
  }
]

// Sample data for queue management
const queueData: QueueManagement[] = [
  {
    location: "Main Entrance",
    currentWaitTime: 15,
    projectedWaitTime: 25,
    weatherImpact: 0.4,
    recommendations: [
      "Open additional entry points",
      "Increase guest services staff",
      "Implement virtual queue system"
    ]
  },
  {
    location: "Food Court",
    currentWaitTime: 20,
    projectedWaitTime: 30,
    weatherImpact: 0.3,
    recommendations: [
      "Add mobile ordering stations",
      "Increase kitchen staff",
      "Implement express service lines"
    ]
  }
]

// Sample data for show schedules
const showData: ShowSchedule[] = [
  {
    name: "Parade",
    currentSchedule: "2:00 PM, 4:00 PM, 6:00 PM",
    recommendedSchedule: "3:00 PM, 5:00 PM",
    weatherCondition: "Rain",
    impact: -0.4,
    rationale: "Reduce frequency due to expected rain and lower attendance"
  },
  {
    name: "Character Meet & Greet",
    currentSchedule: "Every 30 minutes",
    recommendedSchedule: "Every 20 minutes",
    weatherCondition: "Rain",
    impact: 0.2,
    rationale: "Increase frequency for indoor activities during rain"
  }
]

// Sample data for weather alerts
const alertData: WeatherAlert[] = [
  {
    type: "heat",
    severity: "high",
    message: "Extreme heat warning: Temperature expected to reach 95°F",
    actions: [
      "Activate cooling stations",
      "Increase water availability",
      "Adjust outdoor show schedules"
    ],
    affectedAreas: ["Outdoor attractions", "Queue lines", "Food service areas"]
  },
  {
    type: "rain",
    severity: "medium",
    message: "Heavy rain expected: 2-3 inches forecast",
    actions: [
      "Deploy additional covered walkways",
      "Increase indoor capacity",
      "Adjust staffing for indoor areas"
    ],
    affectedAreas: ["Outdoor attractions", "Queue lines", "Transportation"]
  }
]

export default function WeatherImpactDetails() {
  const [activeTab, setActiveTab] = useState<string>("attractions")

  // Prepare data for charts
  const attractionChartData = attractionData.map(attraction => ({
    name: attraction.name,
    attendanceImpact: attraction.attendanceImpact * 100,
    revenueImpact: attraction.revenueImpact * 100,
    capacityUtilization: attraction.capacityUtilization * 100
  }))

  const queueChartData = queueData.map(queue => ({
    location: queue.location,
    currentWait: queue.currentWaitTime,
    projectedWait: queue.projectedWaitTime
  }))

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="attractions">
            <BuildingStorefrontIcon className="h-4 w-4 mr-2" />
            Attractions
          </TabsTrigger>
          <TabsTrigger value="queues">
            <QueueListIcon className="h-4 w-4 mr-2" />
            Queue Management
          </TabsTrigger>
          <TabsTrigger value="shows">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Show Schedule
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <BellAlertIcon className="h-4 w-4 mr-2" />
            Weather Alerts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attractions" className="space-y-4">
          <Card>
            <CardHeader>
        <CardTitle>Attraction Weather Impact</CardTitle>
        <CardDescription>Analysis of weather impact on different attraction types</CardDescription>
      </CardHeader>
            <CardContent>
              <div className="h-[300px] mb-6">
                <BarChart
                  data={attractionChartData}
                  xField="name"
                  yFields={["attendanceImpact", "revenueImpact", "capacityUtilization"]}
                  colors={["#3b82f6", "#10b981", "#f59e0b"]}
                  labels={["Attendance Impact", "Revenue Impact", "Capacity Utilization"]}
                />
              </div>
              <div className="space-y-4">
                {attractionData.map((attraction, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{attraction.name}</h3>
                          <p className="text-sm text-gray-500">
                            Type: {attraction.type.charAt(0).toUpperCase() + attraction.type.slice(1)}
                          </p>
                        </div>
                        <Badge className={`
                          ${attraction.type === "outdoor" ? "bg-blue-100 text-blue-800" : 
                            "bg-green-100 text-green-800"}
                        `}>
                          {attraction.type.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Attendance Impact</p>
                          <p className="font-medium">{formatPercent(attraction.attendanceImpact)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Revenue Impact</p>
                          <p className="font-medium">{formatPercent(attraction.revenueImpact)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Capacity Utilization</p>
                          <p className="font-medium">{formatPercent(attraction.capacityUtilization)}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Recommendations:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {attraction.recommendations.map((rec, i) => (
                            <li key={i}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queues" className="space-y-4">
          <Card>
            <CardHeader>
        <CardTitle>Queue Management</CardTitle>
        <CardDescription>Weather impact on queue times and guest flow</CardDescription>
      </CardHeader>
            <CardContent>
              <div className="h-[300px] mb-6">
                <BarChart
                  data={queueChartData}
                  xField="location"
                  yFields={["currentWait", "projectedWait"]}
                  colors={["#3b82f6", "#10b981"]}
                  labels={["Current Wait Time", "Projected Wait Time"]}
                />
              </div>
              <div className="space-y-4">
                {queueData.map((queue, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{queue.location}</h3>
                          <p className="text-sm text-gray-500">
                            Weather Impact: {formatPercent(queue.weatherImpact)}
                          </p>
                        </div>
                        <Badge className={`
                          ${queue.weatherImpact > 0.3 ? "bg-red-100 text-red-800" : 
                            queue.weatherImpact > 0.1 ? "bg-yellow-100 text-yellow-800" : 
                            "bg-green-100 text-green-800"}
                        `}>
                          {queue.weatherImpact > 0.3 ? "HIGH IMPACT" : 
                           queue.weatherImpact > 0.1 ? "MEDIUM IMPACT" : 
                           "LOW IMPACT"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Current Wait Time</p>
                          <p className="font-medium">{queue.currentWaitTime} minutes</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Projected Wait Time</p>
                          <p className="font-medium">{queue.projectedWaitTime} minutes</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Recommendations:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {queue.recommendations.map((rec, i) => (
                            <li key={i}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shows" className="space-y-4">
          <Card>
            <CardHeader>
        <CardTitle>Show Schedule Adjustments</CardTitle>
        <CardDescription>Weather-based show schedule recommendations</CardDescription>
      </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {showData.map((show, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{show.name}</h3>
                          <p className="text-sm text-gray-500">
                            Weather Condition: {show.weatherCondition}
                          </p>
                        </div>
                        <Badge className={`
                          ${show.impact < -0.3 ? "bg-red-100 text-red-800" : 
                            show.impact < -0.1 ? "bg-yellow-100 text-yellow-800" : 
                            "bg-green-100 text-green-800"}
                        `}>
                          Impact: {formatPercent(show.impact)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Current Schedule</p>
                          <p className="font-medium">{show.currentSchedule}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Recommended Schedule</p>
                          <p className="font-medium">{show.recommendedSchedule}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Rationale:</p>
                        <p className="text-sm text-gray-600">{show.rationale}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
        <CardTitle>Weather Alerts</CardTitle>
        <CardDescription>Active weather alerts and recommended actions</CardDescription>
      </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertData.map((alert, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">
                            {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert
                          </h3>
                          <p className="text-sm text-gray-500">{alert.message}</p>
                        </div>
                        <Badge className={`
                          ${alert.severity === "high" ? "bg-red-100 text-red-800" : 
                            alert.severity === "medium" ? "bg-yellow-100 text-yellow-800" : 
                            "bg-green-100 text-green-800"}
                        `}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Recommended Actions:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {alert.actions.map((action, i) => (
                              <li key={i}>{action}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Affected Areas:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {alert.affectedAreas.map((area, i) => (
                              <li key={i}>{area}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper function to format percentages
function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`
} 