"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import {
  BuildingLibraryIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  ScaleIcon,
  DocumentTextIcon,
  AdjustmentsHorizontalIcon,
  DocumentMagnifyingGlassIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowsRightLeftIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline"
import { PieChart, LineChart, BarChart } from "@/components/ui/charts"
import { ConsolidationEliminations } from "./ConsolidationEliminations"

// Define interfaces for the component
interface Property {
  id: string
  name: string
  location: string
  type: string
  revenue: number
  expenses: number
  profit: number
  margin: number
  growth: number
  status: "operating" | "under-construction" | "planned"
}

interface Segment {
  name: string
  revenue: number
  expenses: number
  profit: number
  margin: number
  growth: number
  properties: number
}

interface IntercompanyTransaction {
  id: string
  fromProperty: string
  toProperty: string
  amount: number
  type: string
  status: "pending" | "completed" | "cancelled"
  date: string
}

// Sample data
const properties: Property[] = [
  {
    id: "prop-001",
    name: "Magic Kingdom",
    location: "Orlando, FL",
    type: "Theme Park",
    revenue: 850000000,
    expenses: 510000000,
    profit: 340000000,
    margin: 40,
    growth: 5.2,
    status: "operating",
  },
  {
    id: "prop-002",
    name: "Epcot",
    location: "Orlando, FL",
    type: "Theme Park",
    revenue: 720000000,
    expenses: 432000000,
    profit: 288000000,
    margin: 40,
    growth: 4.8,
    status: "operating",
  },
  {
    id: "prop-003",
    name: "Disneyland",
    location: "Anaheim, CA",
    type: "Theme Park",
    revenue: 680000000,
    expenses: 408000000,
    profit: 272000000,
    margin: 40,
    growth: 4.5,
    status: "operating",
  },
  {
    id: "prop-004",
    name: "Disneyland Paris",
    location: "Paris, France",
    type: "Theme Park",
    revenue: 620000000,
    expenses: 372000000,
    profit: 248000000,
    margin: 40,
    growth: 4.2,
    status: "operating",
  },
  {
    id: "prop-005",
    name: "Tokyo Disneyland",
    location: "Tokyo, Japan",
    type: "Theme Park",
    revenue: 580000000,
    expenses: 348000000,
    profit: 232000000,
    margin: 40,
    growth: 3.8,
    status: "operating",
  },
]

const segments: Segment[] = [
  {
    name: "Theme Parks",
    revenue: 3450000000,
    expenses: 2070000000,
    profit: 1380000000,
    margin: 40,
    growth: 4.5,
    properties: 5,
  },
  {
    name: "Hotels",
    revenue: 2800000000,
    expenses: 1680000000,
    profit: 1120000000,
    margin: 40,
    growth: 4.2,
    properties: 8,
  },
  {
    name: "Retail",
    revenue: 1950000000,
    expenses: 1170000000,
    profit: 780000000,
    margin: 40,
    growth: 3.8,
    properties: 12,
  },
  {
    name: "Food & Beverage",
    revenue: 1800000000,
    expenses: 1080000000,
    profit: 720000000,
    margin: 40,
    growth: 3.5,
    properties: 15,
  },
]

const intercompanyTransactions: IntercompanyTransaction[] = [
  {
    id: "trans-1",
    fromProperty: "Magic Kingdom",
    toProperty: "Epcot",
    amount: 25000000,
    type: "Service Fee",
    status: "completed",
    date: "2025-03-15",
  },
  {
    id: "trans-2",
    fromProperty: "Disneyland",
    toProperty: "Disneyland Paris",
    amount: 18000000,
    type: "Management Fee",
    status: "pending",
    date: "2025-03-20",
  },
  {
    id: "trans-3",
    fromProperty: "Tokyo Disneyland",
    toProperty: "Magic Kingdom",
    amount: 15000000,
    type: "Royalty",
    status: "completed",
    date: "2025-03-10",
  },
  {
    id: "trans-4",
    fromProperty: "Epcot",
    toProperty: "Disneyland",
    amount: 12000000,
    type: "Service Fee",
    status: "cancelled",
    date: "2025-03-05",
  },
]

export const MultiPropertyConsolidation = () => {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState("FY 2025")
  const [selectedCurrency, setSelectedCurrency] = useState("USD")
  const [showEliminations, setShowEliminations] = useState(false)
  const [consolidationLevel, setConsolidationLevel] = useState("enterprise")
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate consolidated metrics
  const totalProperties = properties.length
  const consolidatedRevenue = properties.reduce((sum, property) => sum + property.revenue, 0)
  const consolidatedProfit = properties.reduce((sum, property) => sum + property.profit, 0)
  const averageMargin =
    properties.reduce((sum, property) => sum + property.margin, 0) / properties.length
  const averageGrowth =
    properties.reduce((sum, property) => sum + property.growth, 0) / properties.length

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: selectedCurrency,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 mb-4">
        <div className="flex items-center space-x-3">
          <Button
            variant={consolidationLevel === "enterprise" ? "default" : "outline"}
            size="sm"
            onClick={() => setConsolidationLevel("enterprise")}
          >
            <span className="flex items-center">
              <BuildingLibraryIcon className="h-4 w-4 mr-2" />
              Enterprise View
            </span>
          </Button>
          <Button
            variant={consolidationLevel === "region" ? "default" : "outline"}
            size="sm"
            onClick={() => setConsolidationLevel("region")}
          >
            <span className="flex items-center">
              <GlobeAltIcon className="h-4 w-4 mr-2" />
              Regional View
            </span>
          </Button>
          <Button
            variant={consolidationLevel === "property" ? "default" : "outline"}
            size="sm"
            onClick={() => setConsolidationLevel("property")}
          >
            <span className="flex items-center">
              <BuildingOfficeIcon className="h-4 w-4 mr-2" />
              Property View
            </span>
          </Button>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <span className="flex items-center">
              <ChevronDownIcon className="h-4 w-4 mr-2" />
              {selectedPeriod}
            </span>
          </Button>
          <Button variant="outline" size="sm">
            <span className="flex items-center">
              <ChevronDownIcon className="h-4 w-4 mr-2" />
              {selectedCurrency}
            </span>
          </Button>
          <Button
            variant={showEliminations ? "default" : "outline"}
            size="sm"
            onClick={() => setShowEliminations(!showEliminations)}
          >
            <span className="flex items-center">
              {showEliminations ? "Hide Eliminations" : "Show Eliminations"}
            </span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Properties</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{totalProperties}</p>
                <p className="mt-1 text-xs text-success-600">+2 new this year</p>
              </div>
              <div className="p-2 bg-primary-50 rounded-md">
                <BuildingLibraryIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Consolidated Revenue</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{formatCurrency(consolidatedRevenue)}</p>
                <p className="mt-1 text-xs text-success-600">+4.5% YOY</p>
              </div>
              <div className="p-2 bg-primary-50 rounded-md">
                <CurrencyDollarIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Consolidated Profit</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{formatCurrency(consolidatedProfit)}</p>
                <p className="mt-1 text-xs text-success-600">+4.5% YOY</p>
              </div>
              <div className="p-2 bg-primary-50 rounded-md">
                <ChartBarIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Margin</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{formatPercentage(averageMargin)}</p>
                <p className="mt-1 text-xs text-success-600">+0.5% YOY</p>
              </div>
              <div className="p-2 bg-primary-50 rounded-md">
                <ScaleIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex border-b border-gray-200">
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "overview"
              ? "border-b-2 border-primary-500 text-primary-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "segments"
              ? "border-b-2 border-primary-500 text-primary-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("segments")}
        >
          Segment Reporting
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "benchmarking"
              ? "border-b-2 border-primary-500 text-primary-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("benchmarking")}
        >
          Property Benchmarking
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "intercompany"
              ? "border-b-2 border-primary-500 text-primary-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("intercompany")}
        >
          Intercompany Transactions
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Consolidated Financial Performance</CardTitle>
              <CardDescription>Financial metrics across all properties</CardDescription>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  <span className="flex items-center">
                    <ArrowPathIcon className="h-4 w-4 mr-2" />
                    Refresh
                  </span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <BarChart
                  data={{
                    labels: ["Q1", "Q2", "Q3", "Q4"],
                    datasets: [
                      {
                        label: "Revenue",
                        data: [2800000000, 3200000000, 3400000000, 3600000000],
                        backgroundColor: "rgba(59, 130, 246, 0.8)",
                      },
                      {
                        label: "Profit",
                        data: [700000000, 800000000, 850000000, 900000000],
                        backgroundColor: "rgba(16, 185, 129, 0.8)",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => formatCurrency(value as number),
                        },
                      },
                    },
                  }}
                  ariaLabel="Consolidated Financial Performance"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Performance</CardTitle>
              <CardDescription>Financial metrics by region</CardDescription>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  <span className="flex items-center">
                    <GlobeAltIcon className="h-4 w-4 mr-2" />
                    View Details
                  </span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <PieChart
                  data={{
                    labels: ["North America", "Europe", "Asia"],
                    datasets: [
                      {
                        data: [2750000000, 1040000000, 2050000000],
                        backgroundColor: [
                          "rgba(59, 130, 246, 0.8)",
                          "rgba(16, 185, 129, 0.8)",
                          "rgba(245, 158, 11, 0.8)",
                        ],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "right",
                      },
                    },
                  }}
                  ariaLabel="Regional Performance"
                />
              </div>
            </CardContent>
          </Card>

          {showEliminations && <ConsolidationEliminations />}
        </div>
      )}

      {activeTab === "segments" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Segment Performance</CardTitle>
              <CardDescription>Financial metrics by business segment</CardDescription>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  <span className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-2" />
                    Segment Details
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
                        Segment
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
                        Expenses
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Profit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Margin
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Growth
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Properties
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {segments.map((segment) => (
                      <tr key={segment.name}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{segment.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(segment.revenue)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(segment.expenses)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(segment.profit)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatPercentage(segment.margin)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatPercentage(segment.growth)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{segment.properties}</div>
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
              <CardTitle>Segment Growth Trends</CardTitle>
              <CardDescription>Year-over-year growth by segment</CardDescription>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  <span className="flex items-center">
                    <ArrowTrendingUpIcon className="h-4 w-4 mr-2" />
                    Growth Analysis
                  </span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <LineChart
                  data={{
                    labels: ["Q1", "Q2", "Q3", "Q4"],
                    datasets: [
                      {
                        label: "Theme Parks",
                        data: [5.2, 6.8, 7.5, 8.2],
                        borderColor: "rgba(59, 130, 246, 1)",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        fill: true,
                      },
                      {
                        label: "Resorts",
                        data: [4.8, 5.5, 6.2, 6.8],
                        borderColor: "rgba(16, 185, 129, 1)",
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        fill: true,
                      },
                      {
                        label: "Entertainment",
                        data: [4.2, 4.8, 5.3, 5.8],
                        borderColor: "rgba(245, 158, 11, 1)",
                        backgroundColor: "rgba(245, 158, 11, 0.1)",
                        fill: true,
                      },
                      {
                        label: "Retail",
                        data: [3.5, 3.8, 4.2, 4.5],
                        borderColor: "rgba(139, 92, 246, 1)",
                        backgroundColor: "rgba(139, 92, 246, 0.1)",
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => `${value}%`,
                        },
                      },
                    },
                  }}
                  ariaLabel="Segment Growth Trends"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "benchmarking" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Benchmarking</CardTitle>
              <CardDescription>Compare performance across properties</CardDescription>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  <span className="flex items-center">
                    <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                    Benchmark Report
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
                        Location
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
                        Expenses
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Profit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Margin
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Growth
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {properties.map((property) => (
                      <tr key={property.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{property.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{property.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(property.revenue)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(property.expenses)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(property.profit)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatPercentage(property.margin)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatPercentage(property.growth)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={
                              property.status === "operating"
                                ? "success"
                                : property.status === "under-construction"
                                ? "warning"
                                : "secondary"
                            }
                            rounded
                          >
                            {property.status === "operating"
                              ? "Operating"
                              : property.status === "under-construction"
                              ? "Under Construction"
                              : "Planned"}
                          </Badge>
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
              <CardTitle>Property Performance Comparison</CardTitle>
              <CardDescription>Key metrics comparison across properties</CardDescription>
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
                <BarChart
                  data={{
                    labels: properties.slice(0, 5).map((prop) => prop.name),
                    datasets: [
                      {
                        label: "Margin",
                        data: properties.slice(0, 5).map((prop) => prop.margin),
                        backgroundColor: "rgba(59, 130, 246, 0.8)",
                      },
                      {
                        label: "Growth",
                        data: properties.slice(0, 5).map((prop) => prop.growth),
                        backgroundColor: "rgba(16, 185, 129, 0.8)",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => `${value}%`,
                        },
                      },
                    },
                  }}
                  ariaLabel="Property Performance Comparison"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "intercompany" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Intercompany Transactions</CardTitle>
              <CardDescription>Transactions between properties</CardDescription>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  <span className="flex items-center">
                    <ArrowsRightLeftIcon className="h-4 w-4 mr-2" />
                    New Transaction
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
                        From
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        To
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {intercompanyTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{transaction.fromProperty}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{transaction.toProperty}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: selectedCurrency,
                              maximumFractionDigits: 0,
                            }).format(transaction.amount)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{transaction.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{transaction.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={
                              transaction.status === "completed"
                                ? "success"
                                : transaction.status === "pending"
                                ? "warning"
                                : "secondary"
                            }
                            rounded
                          >
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
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
              <CardTitle>Intercompany Transaction Trends</CardTitle>
              <CardDescription>Transaction volume and value over time</CardDescription>
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  <span className="flex items-center">
                    <DocumentChartBarIcon className="h-4 w-4 mr-2" />
                    Transaction Report
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
                        label: "Transaction Volume",
                        data: [12, 15, 18, 14, 16, 20],
                        borderColor: "rgba(59, 130, 246, 1)",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        fill: true,
                      },
                      {
                        label: "Transaction Value (USD)",
                        data: [120000000, 150000000, 180000000, 140000000, 160000000, 200000000],
                        borderColor: "rgba(16, 185, 129, 1)",
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
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
                  ariaLabel="Intercompany Transaction Trends"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

