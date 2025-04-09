"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "../ui/Card"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { Badge } from "../ui/Badge"
import { LineChart } from "../charts/LineChart"

interface Anomaly {
  id: string
  timestamp: string
  metric: string
  value: number
  expectedValue: number
  deviation: number
  severity: "low" | "medium" | "high"
  status: "new" | "investigating" | "resolved"
  description: string
}

function generateMockAnomalies(metric: string, timeframe: string): Anomaly[] {
  // This is a mock function that would be replaced with actual API calls
  return [
    {
      id: "1",
      metric,
      timestamp: new Date().toISOString(),
      value: 1200,
      expectedValue: 1000,
      deviation: 20,
      severity: "high",
      status: "new",
      description: "Unusual spike in attendance",
    },
    {
      id: "2",
      metric,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      value: 800,
      expectedValue: 1000,
      deviation: -20,
      severity: "medium",
      status: "new",
      description: "Lower than expected attendance",
    },
  ]
}

export function AnomalyDetection() {
  const [selectedMetric, setSelectedMetric] = useState<string>("attendance")
  const [timeframe, setTimeframe] = useState<string>("30d")
  const [anomalies, setAnomalies] = useState<Anomaly[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnomalies = async () => {
      setLoading(true)
      setError(null)
      try {
        const mockAnomalies = generateMockAnomalies(selectedMetric, timeframe)
        setAnomalies(mockAnomalies)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch anomalies")
      } finally {
        setLoading(false)
      }
    }

    fetchAnomalies()
  }, [selectedMetric, timeframe])

  // Transform data for the chart
  const chartData = anomalies.map(anomaly => ({
    x: new Date(anomaly.timestamp).toISOString(),
    y: anomaly.value,
    predicted: anomaly.expectedValue,
    actual: anomaly.value
  }))

  if (error) {
    return (
      <Card>
        <CardContent>
          <div className="flex items-center justify-center p-4 text-red-600">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader title="Anomaly Detection" />
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Anomalies</h3>
                  <div className="space-y-2">
                    {anomalies.map((anomaly) => (
                      <div key={anomaly.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{anomaly.description}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(anomaly.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <Badge
                            className={
                              anomaly.severity === "high"
                                ? "bg-red-100 text-red-800"
                                : anomaly.severity === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {anomaly.severity}
                          </Badge>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm">
                            Value: {anomaly.value} (Expected: {anomaly.expectedValue})
                          </p>
                          <p className="text-sm">
                            Deviation: {anomaly.deviation}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Trend</h3>
                  <LineChart
                    data={chartData}
                    xField="x"
                    yField="y"
                    height={300}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 