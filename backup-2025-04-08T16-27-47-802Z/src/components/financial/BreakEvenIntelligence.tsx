import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { LineChart } from "@/components/ui/charts"
import {
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  BuildingLibraryIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  CloudIcon,
  SunIcon,
  BoltIcon,
  BellIcon,
} from "@heroicons/react/24/outline"
import { SpecialEventBreakEven } from "./SpecialEventBreakEven"

interface BreakEvenMetric {
  id: string
  name: string
  value: number
  unit: string
  trend: number
  description: string
  icon: React.ComponentType<{ className?: string }>
}

interface HistoricalProfitability {
  date: string
  revenue: number
  costs: number
  profit: number
  margin: number
}

interface AttractionAvailability {
  id: string
  name: string
  availability: number
  impact: number
  maintenance: {
    scheduled: number
    unscheduled: number
  }
}

interface HourlyCost {
  hour: string
  labor: number
  utilities: number
  maintenance: number
  total: number
}

interface WeatherData {
  date: string
  temperature: number
  condition: "sunny" | "cloudy" | "rainy" | "stormy"
  windSpeed: number
  impact: number
  breakEvenAdjustment: number
}

interface DayPartBreakEven {
  period: string
  breakEvenAttendance: number
  breakEvenRevenue: number
  averageAttendance: number
  averageRevenue: number
  weatherImpact: number
  specialEvents: boolean
}

interface RealTimeBreakEven {
  date: string
  projectedAttendance: number
  breakEvenAttendance: number
  projectedRevenue: number
  breakEvenRevenue: number
  variance: number
  status: "above" | "below" | "at"
  alerts: {
    type: "warning" | "critical" | "success"
    message: string
    threshold: number
  }[]
  forecast: {
    confidence: number
    factors: {
      name: string
      impact: number
    }[]
  }
}

interface OperatingHourOptimization {
  hour: string
  projectedAttendance: number
  breakEvenAttendance: number
  revenue: number
  costs: number
  profit: number
  recommendation: "extend" | "reduce" | "maintain"
  confidence: number
}

interface DiscountImpact {
  discount: number
  breakEvenAttendance: number
  breakEvenRevenue: number
  projectedAttendance: number
  projectedRevenue: number
  profitImpact: number
  recommendation: "recommended" | "not-recommended"
  confidence: number
}

interface ShoulderSeasonOptimization {
  season: string
  startDate: string
  endDate: string
  breakEvenAttendance: number
  breakEvenRevenue: number
  projectedAttendance: number
  projectedRevenue: number
  strategies: {
    name: string
    impact: number
    cost: number
    roi: number
    recommendation: "recommended" | "not-recommended"
  }[]
  weatherImpact: number
  historicalPerformance: {
    year: number
    attendance: number
    revenue: number
    profit: number
  }[]
}

const breakEvenMetrics: BreakEvenMetric[] = [
  {
    id: "attendance",
    name: "Break-Even Attendance",
    value: 8245,
    unit: "guests",
    trend: 2.5,
    description: "Daily average across all properties",
    icon: UsersIcon,
  },
  {
    id: "revenue",
    name: "Break-Even Revenue",
    value: 634215,
    unit: "USD",
    trend: 3.2,
    description: "Daily average across all properties",
    icon: CurrencyDollarIcon,
  },
  {
    id: "days",
    name: "Days Above Break-Even",
    value: 284,
    unit: "days",
    trend: 5.8,
    description: "Out of 365 operating days (77.8%)",
    icon: CalendarIcon,
  },
  {
    id: "coverage",
    name: "Fixed Cost Coverage",
    value: 92.4,
    unit: "%",
    trend: 1.2,
    description: "Annual fixed costs covered by revenue",
    icon: BuildingLibraryIcon,
  },
]

const historicalData: HistoricalProfitability[] = [
  { date: "2023-Q1", revenue: 25000000, costs: 18000000, profit: 7000000, margin: 28.0 },
  { date: "2023-Q2", revenue: 32000000, costs: 22000000, profit: 10000000, margin: 31.3 },
  { date: "2023-Q3", revenue: 38000000, costs: 26000000, profit: 12000000, margin: 31.6 },
  { date: "2023-Q4", revenue: 42000000, costs: 29000000, profit: 13000000, margin: 31.0 },
]

const attractionAvailability: AttractionAvailability[] = [
  {
    id: "thrill-seeker",
    name: "Thrill Seeker",
    availability: 95.2,
    impact: 850000,
    maintenance: {
      scheduled: 120,
      unscheduled: 45,
    },
  },
  {
    id: "splash-mountain",
    name: "Splash Mountain",
    availability: 92.8,
    impact: 620000,
    maintenance: {
      scheduled: 96,
      unscheduled: 72,
    },
  },
  {
    id: "fantasy-castle",
    name: "Fantasy Castle",
    availability: 98.1,
    impact: 450000,
    maintenance: {
      scheduled: 48,
      unscheduled: 24,
    },
  },
]

const hourlyCosts: HourlyCost[] = [
  { hour: "9:00", labor: 2500, utilities: 1200, maintenance: 800, total: 4500 },
  { hour: "10:00", labor: 2800, utilities: 1500, maintenance: 900, total: 5200 },
  { hour: "11:00", labor: 3200, utilities: 1800, maintenance: 1000, total: 6000 },
  { hour: "12:00", labor: 3800, utilities: 2200, maintenance: 1200, total: 7200 },
  { hour: "13:00", labor: 4200, utilities: 2500, maintenance: 1400, total: 8100 },
  { hour: "14:00", labor: 4500, utilities: 2800, maintenance: 1500, total: 8800 },
  { hour: "15:00", labor: 4200, utilities: 2500, maintenance: 1400, total: 8100 },
  { hour: "16:00", labor: 3800, utilities: 2200, maintenance: 1200, total: 7200 },
  { hour: "17:00", labor: 3200, utilities: 1800, maintenance: 1000, total: 6000 },
  { hour: "18:00", labor: 2800, utilities: 1500, maintenance: 900, total: 5200 },
]

const weatherData: WeatherData[] = [
  {
    date: "2024-03-01",
    temperature: 75,
    condition: "sunny",
    windSpeed: 5,
    impact: 1.15,
    breakEvenAdjustment: -0.12,
  },
  {
    date: "2024-03-02",
    temperature: 68,
    condition: "cloudy",
    windSpeed: 8,
    impact: 0.95,
    breakEvenAdjustment: 0.05,
  },
  {
    date: "2024-03-03",
    temperature: 72,
    condition: "rainy",
    windSpeed: 12,
    impact: 0.85,
    breakEvenAdjustment: 0.18,
  },
  // Add more weather data...
]

const dayPartBreakEven: DayPartBreakEven[] = [
  {
    period: "Morning (9:00-12:00)",
    breakEvenAttendance: 2150,
    breakEvenRevenue: 158550,
    averageAttendance: 2800,
    averageRevenue: 205800,
    weatherImpact: 0.95,
    specialEvents: false,
  },
  {
    period: "Afternoon (12:00-15:00)",
    breakEvenAttendance: 3100,
    breakEvenRevenue: 228450,
    averageAttendance: 4200,
    averageRevenue: 309000,
    weatherImpact: 1.05,
    specialEvents: false,
  },
  {
    period: "Evening (15:00-18:00)",
    breakEvenAttendance: 2995,
    breakEvenRevenue: 220215,
    averageAttendance: 3800,
    averageRevenue: 279500,
    weatherImpact: 1.02,
    specialEvents: true,
  },
]

const realTimeData: RealTimeBreakEven[] = [
  {
    date: "2024-03-20",
    projectedAttendance: 8500,
    breakEvenAttendance: 8245,
    projectedRevenue: 645000,
    breakEvenRevenue: 634215,
    variance: 3.1,
    status: "above",
    alerts: [
      {
        type: "success",
        message: "Projected to exceed break-even by 3.1%",
        threshold: 0
      }
    ],
    forecast: {
      confidence: 0.85,
      factors: [
        { name: "Weather", impact: 1.15 },
        { name: "Special Event", impact: 1.25 },
        { name: "Historical Trend", impact: 1.05 }
      ]
    }
  },
  {
    date: "2024-03-21",
    projectedAttendance: 8100,
    breakEvenAttendance: 8245,
    projectedRevenue: 615000,
    breakEvenRevenue: 634215,
    variance: -1.8,
    status: "below",
    alerts: [
      {
        type: "warning",
        message: "Projected to be 1.8% below break-even",
        threshold: -2
      }
    ],
    forecast: {
      confidence: 0.82,
      factors: [
        { name: "Weather", impact: 0.95 },
        { name: "Historical Trend", impact: 1.02 }
      ]
    }
  },
  {
    date: "2024-03-22",
    projectedAttendance: 8300,
    breakEvenAttendance: 8245,
    projectedRevenue: 630000,
    breakEvenRevenue: 634215,
    variance: -0.7,
    status: "at",
    alerts: [
      {
        type: "warning",
        message: "Close to break-even threshold",
        threshold: -1
      }
    ],
    forecast: {
      confidence: 0.88,
      factors: [
        { name: "Weather", impact: 1.05 },
        { name: "Historical Trend", impact: 1.03 }
      ]
    }
  }
]

const operatingHourData: OperatingHourOptimization[] = [
  {
    hour: "9:00",
    projectedAttendance: 1200,
    breakEvenAttendance: 1500,
    revenue: 48000,
    costs: 4500,
    profit: 43500,
    recommendation: "maintain",
    confidence: 0.85
  },
  {
    hour: "10:00",
    projectedAttendance: 1800,
    breakEvenAttendance: 1500,
    revenue: 72000,
    costs: 5200,
    profit: 66800,
    recommendation: "extend",
    confidence: 0.92
  },
  {
    hour: "11:00",
    projectedAttendance: 2200,
    breakEvenAttendance: 1500,
    revenue: 88000,
    costs: 6000,
    profit: 82000,
    recommendation: "extend",
    confidence: 0.95
  },
  {
    hour: "12:00",
    projectedAttendance: 2500,
    breakEvenAttendance: 1500,
    revenue: 100000,
    costs: 7200,
    profit: 92800,
    recommendation: "extend",
    confidence: 0.98
  },
  {
    hour: "13:00",
    projectedAttendance: 2300,
    breakEvenAttendance: 1500,
    revenue: 92000,
    costs: 8100,
    profit: 83900,
    recommendation: "extend",
    confidence: 0.96
  },
  {
    hour: "14:00",
    projectedAttendance: 2100,
    breakEvenAttendance: 1500,
    revenue: 84000,
    costs: 8800,
    profit: 75200,
    recommendation: "extend",
    confidence: 0.94
  },
  {
    hour: "15:00",
    projectedAttendance: 1900,
    breakEvenAttendance: 1500,
    revenue: 76000,
    costs: 8100,
    profit: 67900,
    recommendation: "extend",
    confidence: 0.91
  },
  {
    hour: "16:00",
    projectedAttendance: 1600,
    breakEvenAttendance: 1500,
    revenue: 64000,
    costs: 7200,
    profit: 56800,
    recommendation: "maintain",
    confidence: 0.88
  },
  {
    hour: "17:00",
    projectedAttendance: 1300,
    breakEvenAttendance: 1500,
    revenue: 52000,
    costs: 6000,
    profit: 46000,
    recommendation: "reduce",
    confidence: 0.82
  },
  {
    hour: "18:00",
    projectedAttendance: 1100,
    breakEvenAttendance: 1500,
    revenue: 44000,
    costs: 5200,
    profit: 38800,
    recommendation: "reduce",
    confidence: 0.78
  }
]

const discountImpactData: DiscountImpact[] = [
  {
    discount: 0,
    breakEvenAttendance: 8245,
    breakEvenRevenue: 634215,
    projectedAttendance: 8500,
    projectedRevenue: 645000,
    profitImpact: 0,
    recommendation: "recommended",
    confidence: 0.95
  },
  {
    discount: 5,
    breakEvenAttendance: 8680,
    breakEvenRevenue: 634215,
    projectedAttendance: 8925,
    projectedRevenue: 612750,
    profitImpact: -5.0,
    recommendation: "not-recommended",
    confidence: 0.92
  },
  {
    discount: 10,
    breakEvenAttendance: 9160,
    breakEvenRevenue: 634215,
    projectedAttendance: 9350,
    projectedRevenue: 580500,
    profitImpact: -10.0,
    recommendation: "not-recommended",
    confidence: 0.90
  },
  {
    discount: 15,
    breakEvenAttendance: 9700,
    breakEvenRevenue: 634215,
    projectedAttendance: 9775,
    projectedRevenue: 548250,
    profitImpact: -15.0,
    recommendation: "not-recommended",
    confidence: 0.88
  },
  {
    discount: 20,
    breakEvenAttendance: 10310,
    breakEvenRevenue: 634215,
    projectedAttendance: 10200,
    projectedRevenue: 516000,
    profitImpact: -20.0,
    recommendation: "not-recommended",
    confidence: 0.85
  }
]

const shoulderSeasonData: ShoulderSeasonOptimization[] = [
  {
    season: "Spring Shoulder",
    startDate: "2024-03-01",
    endDate: "2024-05-31",
    breakEvenAttendance: 8245,
    breakEvenRevenue: 634215,
    projectedAttendance: 8100,
    projectedRevenue: 615000,
    strategies: [
      {
        name: "Extended Operating Hours",
        impact: 0.15,
        cost: 25000,
        roi: 2.8,
        recommendation: "recommended"
      },
      {
        name: "Special Event Programming",
        impact: 0.25,
        cost: 75000,
        roi: 3.2,
        recommendation: "recommended"
      },
      {
        name: "Targeted Marketing Campaign",
        impact: 0.10,
        cost: 50000,
        roi: 1.8,
        recommendation: "not-recommended"
      }
    ],
    weatherImpact: 0.95,
    historicalPerformance: [
      { year: 2021, attendance: 7800, revenue: 585000, profit: 125000 },
      { year: 2022, attendance: 7950, revenue: 596250, profit: 135000 },
      { year: 2023, attendance: 8100, revenue: 607500, profit: 145000 }
    ]
  },
  {
    season: "Fall Shoulder",
    startDate: "2024-09-01",
    endDate: "2024-11-30",
    breakEvenAttendance: 8245,
    breakEvenRevenue: 634215,
    projectedAttendance: 8300,
    projectedRevenue: 622500,
    strategies: [
      {
        name: "Holiday Theme Enhancement",
        impact: 0.20,
        cost: 60000,
        roi: 2.5,
        recommendation: "recommended"
      },
      {
        name: "Local Partnership Program",
        impact: 0.15,
        cost: 45000,
        roi: 2.2,
        recommendation: "recommended"
      },
      {
        name: "Seasonal Food Festival",
        impact: 0.30,
        cost: 90000,
        roi: 3.5,
        recommendation: "recommended"
      }
    ],
    weatherImpact: 1.05,
    historicalPerformance: [
      { year: 2021, attendance: 8000, revenue: 600000, profit: 130000 },
      { year: 2022, attendance: 8150, revenue: 611250, profit: 140000 },
      { year: 2023, attendance: 8300, revenue: 622500, profit: 150000 }
    ]
  }
]

// Update the chart data format
const chartData = [
  { x: "Jan", y: 100 },
  { x: "Feb", y: 120 },
  { x: "Mar", y: 150 },
  { x: "Apr", y: 180 },
  { x: "May", y: 200 },
  { x: "Jun", y: 220 }
]

export const BreakEvenIntelligence = () => {
  const [selectedDate, setSelectedDate] = React.useState<string>(realTimeData[0].date)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {breakEvenMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{metric.name}</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">
                    {metric.unit === "USD"
                      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(metric.value)
                      : metric.unit === "%"
                      ? `${metric.value}%`
                      : new Intl.NumberFormat("en-US").format(metric.value)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{metric.description}</p>
                </div>
                <div className="p-2 bg-primary-50 rounded-md">
                  <metric.icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
        <CardTitle>Real-Time Break-Even Tracking</CardTitle>
        <CardDescription>Daily forecast updates and break-even monitoring</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              {realTimeData.map((data) => (
                <Button
                  key={data.date}
                  variant={selectedDate === data.date ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDate(data.date)}
                >
                  {new Date(data.date).toLocaleDateString()}
                </Button>
              ))}
            </div>

            {realTimeData
              .filter((data) => data.date === selectedDate)
              .map((data) => (
                <div key={data.date} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <UsersIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-500">Attendance</span>
                        </div>
                        <Badge
                          variant={data.status === "above" ? "success" : data.status === "below" ? "danger" : "warning"}
                          rounded
                        >
                          {data.variance > 0 ? "+" : ""}{data.variance}%
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <div className="text-2xl font-semibold text-gray-900">
                          {data.projectedAttendance.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          Break-even: {data.breakEvenAttendance.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-500">Revenue</span>
                        </div>
                        <Badge
                          variant={data.status === "above" ? "success" : data.status === "below" ? "danger" : "warning"}
                          rounded
                        >
                          {((data.projectedRevenue - data.breakEvenRevenue) / data.breakEvenRevenue * 100).toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <div className="text-2xl font-semibold text-gray-900">
                          {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(data.projectedRevenue)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Break-even: {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(data.breakEvenRevenue)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Forecast Factors</h4>
                    <div className="space-y-2">
                      {data.forecast.factors.map((factor) => (
                        <div key={factor.name} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{factor.name}</span>
                          <Badge
                            variant={factor.impact > 1 ? "success" : "warning"}
                            rounded
                          >
                            {(factor.impact - 1) * 100}% impact
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Forecast Confidence</span>
                        <span className="text-sm font-medium text-gray-900">{data.forecast.confidence * 100}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {data.alerts.map((alert, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-3 rounded-lg ${
                          alert.type === "success"
                            ? "bg-success-50 text-success-700"
                            : alert.type === "warning"
                            ? "bg-warning-50 text-warning-700"
                            : "bg-danger-50 text-danger-700"
                        }`}
                      >
                        <BellIcon className="h-5 w-5 mr-2" />
                        <span className="text-sm font-medium">{alert.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
        <CardTitle>Weather Impact on Break-Even</CardTitle>
        <CardDescription>Visualization of weather conditions affecting break-even points</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-80">
              <LineChart
                data={chartData}
                xField="x"
                yField="y"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {weatherData.map((weather) => (
                <div key={weather.date} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {weather.condition === "sunny" ? (
                        <SunIcon className="h-6 w-6 text-yellow-500" />
                      ) : weather.condition === "cloudy" ? (
                        <CloudIcon className="h-6 w-6 text-gray-500" />
                      ) : weather.condition === "rainy" ? (
                        <CloudIcon className="h-6 w-6 text-blue-500" />
                      ) : (
                        <BoltIcon className="h-6 w-6 text-purple-500" />
                      )}
                      <div className="ml-2">
                        <p className="text-sm font-medium">{weather.date}</p>
                        <p className="text-xs text-gray-500">{weather.temperature}°F</p>
                      </div>
                    </div>
                    <Badge variant={weather.breakEvenAdjustment > 0 ? "warning" : "success"}>
                      {weather.breakEvenAdjustment > 0 ? "+" : ""}
                      {(weather.breakEvenAdjustment * 100).toFixed(1)}% BE
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
        <CardTitle>Day-Part Break-Even Analysis</CardTitle>
        <CardDescription>Break-even points by time period with weather and special event impacts</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time Period
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Break-Even Attendance
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Break-Even Revenue
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Weather Impact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Special Events
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dayPartBreakEven.map((period) => (
                    <tr key={period.period}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{period.period}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Intl.NumberFormat("en-US").format(period.breakEvenAttendance)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Avg: {new Intl.NumberFormat("en-US").format(period.averageAttendance)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(period.breakEvenRevenue)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Avg: {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(period.averageRevenue)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={period.weatherImpact > 1 ? "success" : "warning"}>
                          {(period.weatherImpact * 100 - 100).toFixed(1)}%
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {period.specialEvents ? (
                          <Badge variant="default">Yes</Badge>
                        ) : (
                          <Badge variant="secondary">No</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
        <CardTitle>Special Event Break-Even Analysis</CardTitle>
        <CardDescription>Break-even analysis for special events and holidays</CardDescription>
      </CardHeader>
        <CardContent>
          <SpecialEventBreakEven />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
        <CardTitle>Historical Profitability Trend</CardTitle>
        <CardDescription>Quarterly revenue, costs, and profit margin</CardDescription>
      </CardHeader>
          <CardContent>
            <div className="h-80">
              <LineChart
                data={{
                  labels: historicalData.map((d) => d.date),
                  datasets: [
                    {
                      label: "Revenue",
                      data: historicalData.map((d) => d.revenue),
                      borderColor: "#3B82F6",
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      fill: true,
                      yAxisID: "y",
                    },
                    {
                      label: "Costs",
                      data: historicalData.map((d) => d.costs),
                      borderColor: "#EF4444",
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      fill: true,
                      yAxisID: "y",
                    },
                    {
                      label: "Profit Margin",
                      data: historicalData.map((d) => d.margin),
                      borderColor: "#10B981",
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      fill: true,
                      yAxisID: "y1",
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      type: "linear",
                      display: true,
                      position: "left",
                      title: {
                        display: true,
                        text: "Amount (USD)",
                      },
                    },
                    y1: {
                      type: "linear",
                      display: true,
                      position: "right",
                      title: {
                        display: true,
                        text: "Margin (%)",
                      },
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                  },
                }}
                ariaLabel="Historical profitability trend"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
        <CardTitle>Attraction Availability Impact</CardTitle>
        <CardDescription>Impact of downtime on revenue</CardDescription>
      </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attraction
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Availability
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue Impact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Maintenance Hours
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attractionAvailability.map((attraction) => (
                    <tr key={attraction.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-primary-100 rounded-md flex items-center justify-center">
                            <WrenchScrewdriverIcon className="h-5 w-5 text-primary-600" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{attraction.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900">{attraction.availability}%</div>
                          <Badge
                            variant={attraction.availability >= 95 ? "success" : attraction.availability >= 90 ? "warning" : "danger"}
                            rounded
                          >
                            {attraction.availability >= 95 ? "Excellent" : attraction.availability >= 90 ? "Good" : "Poor"}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(attraction.impact)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {attraction.maintenance.scheduled + attraction.maintenance.unscheduled} hrs
                          <span className="text-xs text-gray-500 ml-1">
                            ({attraction.maintenance.scheduled} scheduled, {attraction.maintenance.unscheduled} unscheduled)
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
        <CardTitle>Hourly Operating Costs</CardTitle>
        <CardDescription>Breakdown of costs by hour</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="h-80">
            <LineChart
              data={{
                labels: hourlyCosts.map((c) => c.hour),
                datasets: [
                  {
                    label: "Labor",
                    data: hourlyCosts.map((c) => c.labor),
                    borderColor: "#3B82F6",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    fill: true,
                  },
                  {
                    label: "Utilities",
                    data: hourlyCosts.map((c) => c.utilities),
                    borderColor: "#10B981",
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    fill: true,
                  },
                  {
                    label: "Maintenance",
                    data: hourlyCosts.map((c) => c.maintenance),
                    borderColor: "#F59E0B",
                    backgroundColor: "rgba(245, 158, 11, 0.1)",
                    fill: true,
                  },
                  {
                    label: "Total",
                    data: hourlyCosts.map((c) => c.total),
                    borderColor: "#6366F1",
                    backgroundColor: "rgba(99, 102, 241, 0.1)",
                    fill: true,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: "Cost (USD)",
                    },
                  },
                },
              }}
              ariaLabel="Hourly operating costs breakdown"
            />
          </div>
        </CardContent>
      </Card>

      {/* Operating Hour Optimization */}
      <Card>
        <CardHeader>
        <CardTitle>Operating Hour Optimization</CardTitle>
        <CardDescription>Break-even analysis by hour with recommendations</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hour
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Projected Attendance
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Break-Even Attendance
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Costs
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Profit
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recommendation
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {operatingHourData.map((hour) => (
                    <tr key={hour.hour}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {hour.hour}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {hour.projectedAttendance.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {hour.breakEvenAttendance.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(hour.revenue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(hour.costs)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(hour.profit)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant={
                            hour.recommendation === "extend"
                              ? "success"
                              : hour.recommendation === "reduce"
                              ? "danger"
                              : "warning"
                          }
                          rounded
                        >
                          {hour.recommendation.charAt(0).toUpperCase() + hour.recommendation.slice(1)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Discount Impact Analysis */}
      <Card>
        <CardHeader>
        <CardTitle>Discount Impact Analysis</CardTitle>
        <CardDescription>Impact of different discount levels on break-even points</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Break-Even Attendance
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Break-Even Revenue
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Projected Attendance
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Projected Revenue
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Profit Impact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recommendation
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {discountImpactData.map((discount) => (
                    <tr key={discount.discount}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {discount.discount}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {discount.breakEvenAttendance.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(discount.breakEvenRevenue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {discount.projectedAttendance.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(discount.projectedRevenue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {discount.profitImpact}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant={discount.recommendation === "recommended" ? "success" : "danger"}
                          rounded
                        >
                          {discount.recommendation === "recommended" ? "Recommended" : "Not Recommended"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shoulder Season Optimization */}
      <Card>
        <CardHeader>
        <CardTitle>Shoulder Season Break-Even Optimization</CardTitle>
        <CardDescription>Analysis and strategies for shoulder season performance</CardDescription>
      </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {shoulderSeasonData.map((season) => (
              <div key={season.season} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{season.season}</h3>
                  <Badge variant="secondary" rounded>
                    {new Date(season.startDate).toLocaleDateString()} - {new Date(season.endDate).toLocaleDateString()}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-500">Break-Even Attendance</div>
                    <div className="mt-1 text-2xl font-semibold text-gray-900">
                      {season.breakEvenAttendance.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-500">Projected Attendance</div>
                    <div className="mt-1 text-2xl font-semibold text-gray-900">
                      {season.projectedAttendance.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-500">Break-Even Revenue</div>
                    <div className="mt-1 text-2xl font-semibold text-gray-900">
                      {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(season.breakEvenRevenue)}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-500">Projected Revenue</div>
                    <div className="mt-1 text-2xl font-semibold text-gray-900">
                      {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(season.projectedRevenue)}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Optimization Strategies</h4>
                  <div className="space-y-3">
                    {season.strategies.map((strategy) => (
                      <div key={strategy.name} className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{strategy.name}</div>
                          <div className="text-sm text-gray-500">
                            Impact: {strategy.impact * 100}% | Cost: {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(strategy.cost)} | ROI: {strategy.roi}x
                          </div>
                        </div>
                        <Badge
                          variant={strategy.recommendation === "recommended" ? "success" : "danger"}
                          rounded
                        >
                          {strategy.recommendation === "recommended" ? "Recommended" : "Not Recommended"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Historical Performance</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Year
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Attendance
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Revenue
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Profit
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {season.historicalPerformance.map((performance) => (
                          <tr key={performance.year}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {performance.year}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {performance.attendance.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(performance.revenue)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(performance.profit)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

