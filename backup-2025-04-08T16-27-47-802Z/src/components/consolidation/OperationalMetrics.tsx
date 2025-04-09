import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import {
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline"
import { BarChart, LineChart } from "@/components/ui/charts"

// Define interfaces for operational metrics
interface OperationalMetric {
  id: string
  name: string
  value: number
  unit: string
  trend: number
  target: number
  status: "on-track" | "at-risk" | "behind"
  category: "attendance" | "revenue" | "efficiency" | "satisfaction"
}

interface PropertyOperationalData {
  propertyId: string
  propertyName: string
  metrics: {
    attendance: {
      total: number
      growth: number
      perOperatingDay: number
    }
    revenue: {
      total: number
      growth: number
      perCapita: number
    }
    efficiency: {
      laborEfficiency: number
      energyEfficiency: number
      maintenanceEfficiency: number
    }
    satisfaction: {
      guestSatisfaction: number
      employeeSatisfaction: number
      netPromoterScore: number
    }
  }
}

// Sample data
const operationalMetrics: OperationalMetric[] = [
  {
    id: "attendance",
    name: "Total Attendance",
    value: 12500000,
    unit: "guests",
    trend: 5.2,
    target: 13000000,
    status: "on-track",
    category: "attendance",
  },
  {
    id: "revenue",
    name: "Total Revenue",
    value: 850000000,
    unit: "USD",
    trend: 4.8,
    target: 900000000,
    status: "on-track",
    category: "revenue",
  },
  {
    id: "efficiency",
    name: "Labor Efficiency",
    value: 42.5,
    unit: "USD/hour",
    trend: 3.2,
    target: 45.0,
    status: "at-risk",
    category: "efficiency",
  },
  {
    id: "satisfaction",
    name: "Guest Satisfaction",
    value: 92.5,
    unit: "%",
    trend: 1.5,
    target: 95.0,
    status: "on-track",
    category: "satisfaction",
  },
]

const propertyOperationalData: PropertyOperationalData[] = [
  {
    propertyId: "prop-001",
    propertyName: "Magic Kingdom",
    metrics: {
      attendance: {
        total: 2500000,
        growth: 5.5,
        perOperatingDay: 6849,
      },
      revenue: {
        total: 850000000,
        growth: 4.8,
        perCapita: 340,
      },
      efficiency: {
        laborEfficiency: 42.5,
        energyEfficiency: 0.85,
        maintenanceEfficiency: 0.92,
      },
      satisfaction: {
        guestSatisfaction: 92.5,
        employeeSatisfaction: 88.5,
        netPromoterScore: 65,
      },
    },
  },
  // Add more properties as needed
]

export const OperationalMetrics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("FY 2025")
  const [activeTab, setActiveTab] = useState("overview")

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`
  }

  // Format number
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 mb-4">
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            {selectedPeriod}
          </Button>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <span className="flex items-center">
              <ChartBarIcon className="h-4 w-4 mr-2" />
              Export Report
            </span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {operationalMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{metric.name}</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">
                    {metric.unit === "USD" ? formatCurrency(metric.value) : formatNumber(metric.value)}
                  </p>
                  <div className="flex items-center mt-1">
                    <span
                      className={`text-xs ${
                        metric.trend >= 0 ? "text-success-600" : "text-danger-600"
                      }`}
                    >
                      {formatPercentage(metric.trend)}
                    </span>
                    {metric.trend >= 0 ? (
                      <ArrowTrendingUpIcon className="h-4 w-4 text-success-600 ml-1" />
                    ) : (
                      <ArrowTrendingDownIcon className="h-4 w-4 text-danger-600 ml-1" />
                    )}
                  </div>
                </div>
                <div className="p-2 bg-primary-50 rounded-md">
                  {metric.category === "attendance" && <UserGroupIcon className="h-6 w-6 text-primary-600" />}
                  {metric.category === "revenue" && <CurrencyDollarIcon className="h-6 w-6 text-primary-600" />}
                  {metric.category === "efficiency" && <ChartBarIcon className="h-6 w-6 text-primary-600" />}
                  {metric.category === "satisfaction" && <BuildingOfficeIcon className="h-6 w-6 text-primary-600" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Operational Performance Trends</CardTitle>
          <CardDescription>Key metrics performance over time</CardDescription>
          <div className="mt-4">
            <Button variant="outline" size="sm">
              <span className="flex items-center">
                <ChartBarIcon className="h-4 w-4 mr-2" />
                Detailed Analysis
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <LineChart
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                  {
                    label: "Attendance",
                    data: [1800000, 1950000, 2100000, 2250000, 2400000, 2500000],
                    borderColor: "rgba(59, 130, 246, 1)",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    fill: true,
                  },
                  {
                    label: "Revenue",
                    data: [120000000, 130000000, 140000000, 150000000, 160000000, 170000000],
                    borderColor: "rgba(16, 185, 129, 1)",
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    fill: true,
                  },
                  {
                    label: "Efficiency",
                    data: [38.5, 39.2, 40.1, 41.2, 42.0, 42.5],
                    borderColor: "rgba(245, 158, 11, 1)",
                    backgroundColor: "rgba(245, 158, 11, 0.1)",
                    fill: true,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    ticks: {
                      callback: (value) => {
                        if (value >= 1000000) {
                          return formatCurrency(value as number)
                        }
                        return value
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Property Performance Comparison</CardTitle>
          <CardDescription>Operational metrics across properties</CardDescription>
          <div className="mt-4">
            <Button variant="outline" size="sm">
              <span className="flex items-center">
                <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                Property Report
              </span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Property
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Attendance
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Revenue
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Efficiency
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Satisfaction
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {propertyOperationalData.map((property) => (
                  <tr key={property.propertyId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{property.propertyName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatNumber(property.metrics.attendance.total)}</div>
                      <div className="text-xs text-success-600">
                        {formatPercentage(property.metrics.attendance.growth)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(property.metrics.revenue.total)}</div>
                      <div className="text-xs text-success-600">
                        {formatPercentage(property.metrics.revenue.growth)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatCurrency(property.metrics.efficiency.laborEfficiency)}/hr
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatPercentage(property.metrics.satisfaction.guestSatisfaction)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 