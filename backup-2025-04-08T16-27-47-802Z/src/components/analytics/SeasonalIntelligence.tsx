"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { BarChart } from "../../components/ui/charts"
import { formatNumber, formatPercent } from "../../utils/formatters"
import { Badge } from "../../components/ui/Badge"

interface SeasonalPerformance {
  season: string
  year: number
  attendance: number
  revenue: number
  averageSpend: number
  peakDays: number
  comparison: {
    attendance: number
    revenue: number
    averageSpend: number
  }
}

interface OperatingCalendar {
  month: string
  recommendedDays: number
  peakDays: number
  offPeakDays: number
  specialEvents: number
  optimalHours: {
    weekday: string
    open: string
    close: string
  }[]
}

interface InventoryPlan {
  category: string
  currentStock: number
  recommendedStock: number
  seasonalFactor: number
  leadTime: number
  reorderPoint: number
  recommendations: string[]
}

// Sample data for operating calendar
const operatingData: OperatingCalendar[] = [
  {
    month: "June",
    recommendedDays: 30,
    peakDays: 15,
    offPeakDays: 10,
    specialEvents: 5,
    optimalHours: [
      {
        weekday: "Monday",
        open: "10:00",
        close: "20:00"
      },
      {
        weekday: "Saturday",
        open: "09:00",
        close: "22:00"
      }
    ]
  }
]

// Sample data for inventory planning
const inventoryData: InventoryPlan[] = [
  {
    category: "Food & Beverage",
    currentStock: 1000,
    recommendedStock: 1200,
    seasonalFactor: 1.2,
    leadTime: 3,
    reorderPoint: 300,
    recommendations: [
      "Increase stock by 20% for peak season",
      "Order 2 weeks before season start",
      "Monitor perishable items closely"
    ]
  },
  {
    category: "Merchandise",
    currentStock: 500,
    recommendedStock: 800,
    seasonalFactor: 1.6,
    leadTime: 5,
    reorderPoint: 200,
    recommendations: [
      "Double stock for summer season",
      "Order 3 weeks before season start",
      "Focus on seasonal items"
    ]
  }
]

// Sample data for seasonal performance
const seasonalPerformanceData: SeasonalPerformance[] = [
  {
    season: "Summer",
    year: 2023,
    attendance: 150000,
    revenue: 4500000,
    averageSpend: 30,
    peakDays: 45,
    comparison: {
      attendance: 0.15,
      revenue: 0.12,
      averageSpend: -0.05
    }
  },
  {
    season: "Fall",
    year: 2023,
    attendance: 90000,
    revenue: 2700000,
    averageSpend: 30,
    peakDays: 25,
    comparison: {
      attendance: -0.08,
      revenue: -0.10,
      averageSpend: -0.02
    }
  }
]

export function SeasonalIntelligence() {
  const [activeTab, setActiveTab] = useState<string>("performance")

  const performanceData = seasonalPerformanceData.map(season => ({
    name: season.season,
    revenue: season.revenue / 1000 // Convert to thousands
  }))

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Seasonal Intelligence</CardTitle>
          <CardDescription>
            Analyze and optimize seasonal performance patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="calendar">Operating Calendar</TabsTrigger>
              <TabsTrigger value="inventory">Inventory Planning</TabsTrigger>
            </TabsList>
            <TabsContent value="performance">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {seasonalPerformanceData.map((season: SeasonalPerformance) => (
                    <Card key={season.season}>
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <h3 className="font-medium">{season.season} {season.year}</h3>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-sm text-gray-500">Attendance</p>
                              <p className="font-medium">{formatNumber(season.attendance)}</p>
                              <Badge
                                className={
                                  season.comparison.attendance > 0
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {formatPercent(season.comparison.attendance)}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Revenue</p>
                              <p className="font-medium">{formatNumber(season.revenue)}</p>
                              <Badge
                                className={
                                  season.comparison.revenue > 0
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {formatPercent(season.comparison.revenue)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="h-80">
                  <BarChart
                    data={performanceData}
                    xField="name"
                    yFields={["revenue"]}
                    colors={["#10b981"]}
                    labels={["Revenue (K)"]}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="calendar">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {operatingData.map((month) => (
                    <Card key={month.month}>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium">{month.month} Operating Schedule</h3>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                              <div>
                                <p className="text-sm text-gray-500">Peak Days</p>
                                <p className="font-medium">{month.peakDays}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Off-Peak Days</p>
                                <p className="font-medium">{month.offPeakDays}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Special Events</p>
                                <p className="font-medium">{month.specialEvents}</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Optimal Hours</h4>
                            <div className="space-y-2">
                              {month.optimalHours.map((hours) => (
                                <div key={hours.weekday} className="flex justify-between text-sm">
                                  <span>{hours.weekday}</span>
                                  <span>{hours.open} - {hours.close}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="inventory">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inventoryData.map((item) => (
                    <Card key={item.category}>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium">{item.category}</h3>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                              <div>
                                <p className="text-sm text-gray-500">Current Stock</p>
                                <p className="font-medium">{formatNumber(item.currentStock)}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Recommended</p>
                                <p className="font-medium">{formatNumber(item.recommendedStock)}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Seasonal Factor</p>
                                <p className="font-medium">{formatPercent(item.seasonalFactor)}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Lead Time (days)</p>
                                <p className="font-medium">{item.leadTime}</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                            <ul className="space-y-1">
                              {item.recommendations.map((rec, index) => (
                                <li key={index} className="text-sm text-gray-600">• {rec}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 