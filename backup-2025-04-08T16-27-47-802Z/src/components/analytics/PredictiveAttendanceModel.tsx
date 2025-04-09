"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "../ui/Card"
import { Button } from "../ui/Button"
import { ChartBarIcon, CalendarIcon, ChartPieIcon } from "@heroicons/react/24/outline"
import { LineChart } from "../charts/LineChart"
import { Badge } from "../ui/Badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AttendancePrediction {
  date: string
  predicted: number
  actual: number | null
  confidence: number
  factors: {
    weather: number
    events: number
    pricing: number
    seasonality: number
  }
}

export const PredictiveAttendanceModel = () => {
  const [timeframe, setTimeframe] = useState("7d")
  const [selectedFactors, setSelectedFactors] = useState<string[]>(["weather", "events", "pricing", "seasonality"])

  // Mock data - In production, this would come from ML model predictions
  const predictions: AttendancePrediction[] = [
    {
      date: "2024-04-01",
      predicted: 25000,
      actual: 24500,
      confidence: 0.95,
      factors: {
        weather: 0.8,
        events: 0.6,
        pricing: 0.7,
        seasonality: 0.9
      }
    },
    {
      date: "2024-04-02",
      predicted: 28000,
      actual: 27500,
      confidence: 0.92,
      factors: {
        weather: 0.9,
        events: 0.7,
        pricing: 0.8,
        seasonality: 0.85
      }
    },
    {
      date: "2024-04-03",
      predicted: 22000,
      actual: null,
      confidence: 0.88,
      factors: {
        weather: 0.7,
        events: 0.5,
        pricing: 0.6,
        seasonality: 0.8
      }
    }
  ]

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value)
    // In a real application, this would trigger a new prediction request
  }

  const handleFactorToggle = (factor: string) => {
    setSelectedFactors(prev => {
      if (prev.includes(factor)) {
        return prev.filter(f => f !== factor)
      }
      return [...prev, factor]
    })
    // In a real application, this would update the model's factor weights
  }

  // Transform predictions data for the chart
  const chartData = predictions.map(prediction => ({
    x: prediction.date,
    y: prediction.predicted,
    type: "predicted"
  }))

  const actualData = predictions
    .filter(prediction => prediction.actual !== null)
    .map(prediction => ({
      x: prediction.date,
      y: prediction.actual!,
      type: "actual"
    }))

  return (
    <Card>
      <CardHeader
        title="Predictive Attendance Modeling"
        subtitle="AI-powered attendance predictions with >95% accuracy"
        action={
          <div className="flex items-center space-x-2">
            <Select 
              value={timeframe} 
              onValueChange={handleTimeframeChange}
              aria-label="Select prediction timeframe"
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="14d">14 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              Refresh Predictions
            </Button>
          </div>
        }
      />
      <CardContent>
        <div className="space-y-6">
          {/* Model Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                  <ChartBarIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Model Accuracy</h3>
                  <p className="mt-1 text-2xl font-semibold text-primary-600">95.8%</p>
                  <p className="mt-1 text-xs text-gray-500">Based on last 30 days</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                  <CalendarIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Forecast Horizon</h3>
                  <p className="mt-1 text-2xl font-semibold text-primary-600">30 Days</p>
                  <p className="mt-1 text-xs text-gray-500">Rolling predictions</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-primary-100 rounded-md">
                  <ChartPieIcon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Key Factors</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {Object.keys(predictions[0].factors).map((factor) => (
                      <Badge
                        key={factor}
                        className={`cursor-pointer ${
                          selectedFactors.includes(factor)
                            ? "bg-primary-100 text-primary-800 border-primary-200"
                            : "bg-gray-100 text-gray-800 border-gray-200"
                        }`}
                        onClick={() => handleFactorToggle(factor)}
                      >
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prediction Chart */}
          <div className="h-80">
            <LineChart
  data={}
  xField="x"
  yField="y"
            />
          </div>

          {/* Factor Importance */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Factor Importance</h3>
            <div className="space-y-2">
              {Object.entries(predictions[0].factors)
                .filter(([factor]) => selectedFactors.includes(factor))
                .map(([factor, importance]) => (
                  <div key={factor} className="flex items-center">
                    <div className="w-24 text-sm text-gray-600 capitalize">{factor}</div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-primary-600 rounded-full"
                        style={{ width: `${importance * 100}%` }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm text-gray-600">
                      {Math.round(importance * 100)}%
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 