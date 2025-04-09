"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "../ui/Card"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { CameraIcon, UserGroupIcon, ClockIcon, ChartBarIcon } from "@heroicons/react/24/outline"
import LineChart from "../charts/LineChart"

interface QueueData {
  attraction: string
  currentWait: number
  predictedWait: number
  status: "low" | "medium" | "high" | "critical"
  lastUpdated: string
}

interface CrowdData {
  location: string
  density: number
  capacity: number
  status: "low" | "medium" | "high" | "critical"
}

interface DensityHistory {
  timestamp: string
  predicted: number
  actual: number
}

export const ComputerVision = () => {
  const [selectedView, setSelectedView] = useState<"queues" | "crowds">("queues")
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(null)

  // Mock queue data
  const queueData: QueueData[] = [
    {
      attraction: "Mega Coaster",
      currentWait: 45,
      predictedWait: 50,
      status: "high",
      lastUpdated: "2 minutes ago"
    },
    {
      attraction: "Water Adventure",
      currentWait: 30,
      predictedWait: 35,
      status: "medium",
      lastUpdated: "1 minute ago"
    },
    {
      attraction: "4D Theater",
      currentWait: 15,
      predictedWait: 20,
      status: "low",
      lastUpdated: "3 minutes ago"
    },
    {
      attraction: "Virtual Reality Experience",
      currentWait: 60,
      predictedWait: 65,
      status: "critical",
      lastUpdated: "Just now"
    },
    {
      attraction: "Family Coaster",
      currentWait: 25,
      predictedWait: 30,
      status: "medium",
      lastUpdated: "2 minutes ago"
    }
  ]

  // Mock crowd density data
  const crowdData: CrowdData[] = [
    {
      location: "Main Entrance",
      density: 75,
      capacity: 100,
      status: "medium"
    },
    {
      location: "Food Court",
      density: 90,
      capacity: 100,
      status: "high"
    },
    {
      location: "Entertainment Plaza",
      density: 60,
      capacity: 100,
      status: "medium"
    },
    {
      location: "Kids Zone",
      density: 40,
      capacity: 100,
      status: "low"
    },
    {
      location: "Gift Shop",
      density: 85,
      capacity: 100,
      status: "high"
    }
  ]

  // Mock density history data
  const densityHistory: DensityHistory[] = [
    { timestamp: "2024-04-04T10:00:00", predicted: 65, actual: 62 },
    { timestamp: "2024-04-04T11:00:00", predicted: 75, actual: 78 },
    { timestamp: "2024-04-04T12:00:00", predicted: 85, actual: 82 },
    { timestamp: "2024-04-04T13:00:00", predicted: 80, actual: 85 },
    { timestamp: "2024-04-04T14:00:00", predicted: 70, actual: 68 },
    { timestamp: "2024-04-04T15:00:00", predicted: 75, actual: 0 }
  ]

  // Convert density history to LineChart format
  const chartData = densityHistory.map(item => ({
    date: item.timestamp,
    predicted: item.predicted,
    actual: item.actual
  }))

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "low":
        return "success"
      case "medium":
        return "warning"
      case "high":
        return "danger"
      case "critical":
        return "danger"
      default:
        return "secondary"
    }
  }

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "low":
        return "Low"
      case "medium":
        return "Medium"
      case "high":
        return "High"
      case "critical":
        return "Critical"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader
        title="Computer Vision Applications"
        subtitle="Queue management and crowd density monitoring"
        action={
          <div className="flex space-x-2">
            <Button
              variant={selectedView === "queues" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setSelectedView("queues")}
            >
              Queues
            </Button>
            <Button
              variant={selectedView === "crowds" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setSelectedView("crowds")}
            >
              Crowds
            </Button>
          </div>
        }
      />
      <CardContent>
        <div className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                  <CameraIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Active Cameras</h3>
                  <p className="mt-1 text-2xl font-semibold text-primary-600">24</p>
                  <p className="mt-1 text-xs text-gray-500">Covering all major areas</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                  <UserGroupIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Current Visitors</h3>
                  <p className="mt-1 text-2xl font-semibold text-primary-600">8,450</p>
                  <p className="mt-1 text-xs text-gray-500">+12% from yesterday</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                  <ClockIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Avg. Queue Time</h3>
                  <p className="mt-1 text-2xl font-semibold text-primary-600">35 min</p>
                  <p className="mt-1 text-xs text-gray-500">-5 min from last hour</p>
                </div>
              </div>
            </div>
          </div>

          {/* Queue Management */}
          {selectedView === "queues" && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Queue Status</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attraction
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Wait
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Predicted Wait
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Updated
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {queueData.map((queue) => (
                      <tr key={queue.attraction} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{queue.attraction}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{queue.currentWait} minutes</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{queue.predictedWait} minutes</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={getStatusVariant(queue.status)} size="sm">
                            {getStatusText(queue.status)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{queue.lastUpdated}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setSelectedAttraction(queue.attraction)}
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Crowd Density */}
          {selectedView === "crowds" && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Crowd Density</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {crowdData.map((crowd) => (
                  <div
                    key={crowd.location}
                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{crowd.location}</h4>
                        <p className="mt-1 text-xs text-gray-500">
                          {crowd.density}% capacity
                        </p>
                      </div>
                      <Badge variant={getStatusVariant(crowd.status)} size="sm">
                        {getStatusText(crowd.status)}
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            crowd.status === "low"
                              ? "bg-success-500"
                              : crowd.status === "medium"
                              ? "bg-warning-500"
                              : "bg-danger-500"
                          }`}
                          style={{ width: `${crowd.density}%` }}
                         />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Density Trend</h3>
                <div className="h-80">
                  <LineChart
                    data={chartData}
                    xField="date"
                    yFields={["predicted", "actual"]}
                    title="Crowd Density Trend"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Selected Attraction Details */}
          {selectedAttraction && (
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900">
                  Details for {selectedAttraction}
                </h3>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedAttraction(null)}
                >
                  Close
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-medium text-gray-500 mb-2">Queue Length History</h4>
                  <div className="h-40 bg-white p-2 rounded border border-gray-200">
                    <p className="text-sm text-gray-500 text-center">Queue length history chart will be displayed here</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-500 mb-2">Staff Recommendations</h4>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-success-500 mt-1.5 mr-2" />
                        <span>Consider opening an additional queue line in 15 minutes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-warning-500 mt-1.5 mr-2" />
                        <span>Alert maintenance team about potential bottleneck at turnstile #3</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-primary-500 mt-1.5 mr-2" />
                        <span>Update digital signage to show accurate wait times</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 