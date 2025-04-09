import React, { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/Card"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/Tabs"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/Select"
import { Badge } from "@/components/ui/Badge"
import { 
  LineChart, 
  BarChart 
} from "@/components/ui/charts"
import { 
  formatCurrency, 
  formatPercent, 
  formatDate 
} from "@/utils/formatters"
import { 
  weatherData, 
  historicalWeatherImpact, 
  weatherAdaptationStrategies,
  WeatherDataPoint,
  PropertyWeatherData,
  PropertyHistoricalImpact,
  WeatherAdaptationStrategy
} from "@/utils/weather-data"
import { 
  CloudIcon, 
  SunIcon, 
  CloudIcon as CloudRainIcon, 
  BoltIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  BeakerIcon, 
  CurrencyDollarIcon 
} from "@heroicons/react/24/outline"

interface WeatherData {
  date: string;
  condition: string;
  temperature: number;
  attendanceImpact: number;
  revenueImpact: number;
  energyImpact: number;
}

interface HistoricalData {
  monthly: Array<{
    month: string;
    attendanceImpact: number;
    revenueImpact: number;
    energyImpact: number;
  }>;
  seasonal: Array<{
    season: string;
    attendanceImpact: number;
    revenueImpact: number;
    energyImpact: number;
  }>;
}

// Helper function to get weather icon based on condition
const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase()
  if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
    return <SunIcon className="h-6 w-6 text-yellow-500" />
  } else if (conditionLower.includes("cloud")) {
    return <CloudIcon className="h-6 w-6 text-gray-400" />
  } else if (conditionLower.includes("rain")) {
    return <CloudRainIcon className="h-6 w-6 text-blue-500" />
  } else if (conditionLower.includes("storm") || conditionLower.includes("thunder")) {
    return <BoltIcon className="h-6 w-6 text-purple-500" />
  } else {
    return <CloudIcon className="h-6 w-6 text-gray-400" />
  }
}

// Helper function to get impact badge color
const getImpactBadgeColor = (impact: string) => {
  switch (impact) {
    case "high":
      return "bg-red-100 text-red-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "low":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-green-100 text-green-800"
  }
}

export default function WeatherImpactAnalysis() {
  const [selectedProperty, setSelectedProperty] = useState<string>("Adventure Park")
  const [activeTab, setActiveTab] = useState<string>("forecast")

  // Get property options from weather data
  const propertyOptions = Object.keys(weatherData)

  // Get weather forecast data for selected property
  const forecastData = weatherData[selectedProperty] || []

  // Get historical impact data for selected property
  const historicalData = historicalWeatherImpact[selectedProperty] || {
    monthly: [],
    seasonal: []
  }

  // Calculate average impact metrics
  const calculateAverageImpact = () => {
    if (forecastData.length === 0) return { attendance: 0, revenue: 0, energy: 0 }
    
    const totalAttendance = forecastData.reduce((sum: number, day: WeatherDataPoint) => sum + day.attendanceImpact, 0)
    const totalRevenue = forecastData.reduce((sum: number, day: WeatherDataPoint) => sum + day.revenueImpact, 0)
    const totalEnergy = forecastData.reduce((sum: number, day: WeatherDataPoint) => sum + day.energyImpact, 0)
    
    return {
      attendance: totalAttendance / forecastData.length,
      revenue: totalRevenue / forecastData.length,
      energy: totalEnergy / forecastData.length
    }
  }

  const averageImpact = calculateAverageImpact()

  // Prepare data for charts
  const temperatureData = forecastData.map(day => ({
    date: formatDate(new Date(day.date)),
    temperature: day.temperature
  }))

  const impactData = forecastData.map(day => ({
    date: formatDate(new Date(day.date)),
    attendance: day.attendanceImpact,
    revenue: day.revenueImpact,
    energy: day.energyImpact
  }))

  const monthlyImpactData = historicalData.monthly.map(month => ({
    month: month.month,
    attendance: month.attendanceImpact,
    revenue: month.revenueImpact,
    energy: month.energyImpact
  }))

  const seasonalImpactData = historicalData.seasonal.map(season => ({
    season: season.season,
    attendance: season.attendanceImpact,
    revenue: season.revenueImpact,
    energy: season.energyImpact
  }))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader title="Weather Impact Analysis">
          <div className="flex items-center space-x-4">
            <Select
              value={selectedProperty}
              onValueChange={setSelectedProperty}
            >
              <SelectTrigger>
                <SelectValue>Select Property</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {propertyOptions.map((property) => (
                  <SelectItem key={property} value={property}>
                    {property}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
              <TabsTrigger value="historical">Historical</TabsTrigger>
              <TabsTrigger value="strategies">Adaptation Strategies</TabsTrigger>
            </TabsList>
            <TabsContent value="forecast">
              <Card>
                <CardHeader title="Weather Forecast Impact">
                  <div className="grid grid-cols-3 gap-4">
                    {forecastData.map((day) => (
                      <Card key={day.date}>
                        <CardHeader title={formatDate(new Date(day.date))}>
                          {getWeatherIcon(day.condition)}
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Temperature:</span>
                              <span>{day.temperature}°F</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Attendance Impact:</span>
                              <Badge className={getImpactBadgeColor(day.attendanceImpact > 0 ? "high" : "low")}>
                                {formatPercent(day.attendanceImpact)}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Revenue Impact:</span>
                              <Badge className={getImpactBadgeColor(day.revenueImpact > 0 ? "high" : "low")}>
                                {formatPercent(day.revenueImpact)}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </TabsContent>
            <TabsContent value="historical">
              <Card>
                <CardHeader title="Historical Weather Impact">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Monthly Impact</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {historicalData.monthly.map((month) => (
                          <Card key={month.month}>
                            <CardHeader title={month.month}>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span>Attendance:</span>
                                  <Badge className={getImpactBadgeColor(month.attendanceImpact > 0 ? "high" : "low")}>
                                    {formatPercent(month.attendanceImpact)}
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span>Revenue:</span>
                                  <Badge className={getImpactBadgeColor(month.revenueImpact > 0 ? "high" : "low")}>
                                    {formatPercent(month.revenueImpact)}
                                  </Badge>
                                </div>
                              </div>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Seasonal Impact</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {historicalData.seasonal.map((season) => (
                          <Card key={season.season}>
                            <CardHeader title={season.season}>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span>Attendance:</span>
                                  <Badge className={getImpactBadgeColor(season.attendanceImpact > 0 ? "high" : "low")}>
                                    {formatPercent(season.attendanceImpact)}
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span>Revenue:</span>
                                  <Badge className={getImpactBadgeColor(season.revenueImpact > 0 ? "high" : "low")}>
                                    {formatPercent(season.revenueImpact)}
                                  </Badge>
                                </div>
                              </div>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </TabsContent>
            <TabsContent value="strategies">
              <Card>
                <CardHeader title="Weather Adaptation Strategies">
                  <div className="grid grid-cols-2 gap-4">
                    {weatherAdaptationStrategies.map((strategy) => (
                      <Card key={strategy.id}>
                        <CardHeader title={strategy.name}>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">{strategy.description}</p>
                            <div className="flex justify-between">
                              <span>Cost:</span>
                              <span>{formatCurrency(strategy.cost)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Effectiveness:</span>
                              <Badge className={getImpactBadgeColor(strategy.effectiveness > 0.7 ? "high" : "medium")}>
                                {formatPercent(strategy.effectiveness)}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 