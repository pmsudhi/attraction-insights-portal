"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import {
  CurrencyDollarIcon,
  ChevronDownIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"
import { BarChart, LineChart } from "@/components/ui/charts"

// Define interfaces for the component
interface ExchangeRate {
  currency: string
  rate: number
  change1d: number
  change1w: number
  change1m: number
  change1y: number
  lastUpdated: string
}

interface CurrencyExposure {
  currency: string
  amount: number
  percentage: number
  risk: "low" | "medium" | "high"
  hedging: number
  unhedged: number
}

interface HedgingStrategy {
  id: string
  currency: string
  type: "forward" | "option" | "swap"
  amount: number
  rate: number
  startDate: string
  endDate: string
  status: "active" | "expired" | "pending"
}

// Sample data
const exchangeRates: ExchangeRate[] = [
  {
    currency: "EUR",
    rate: 1.08,
    change1d: -0.2,
    change1w: 0.5,
    change1m: 1.2,
    change1y: 3.5,
    lastUpdated: "2025-03-15 10:30:00",
  },
  {
    currency: "GBP",
    rate: 1.25,
    change1d: -0.1,
    change1w: 0.3,
    change1m: 0.8,
    change1y: 2.5,
    lastUpdated: "2025-03-15 10:30:00",
  },
  {
    currency: "JPY",
    rate: 0.0067,
    change1d: 0.1,
    change1w: -0.2,
    change1m: -0.5,
    change1y: -1.2,
    lastUpdated: "2025-03-15 10:30:00",
  },
  {
    currency: "CNY",
    rate: 0.14,
    change1d: 0.0,
    change1w: 0.1,
    change1m: 0.3,
    change1y: 1.5,
    lastUpdated: "2025-03-15 10:30:00",
  },
  {
    currency: "AUD",
    rate: 0.66,
    change1d: -0.3,
    change1w: 0.4,
    change1m: 0.9,
    change1y: 2.8,
    lastUpdated: "2025-03-15 10:30:00",
  },
]

const currencyExposures: CurrencyExposure[] = [
  {
    currency: "EUR",
    amount: 850000000,
    percentage: 35,
    risk: "medium",
    hedging: 510000000,
    unhedged: 340000000,
  },
  {
    currency: "GBP",
    amount: 620000000,
    percentage: 25,
    risk: "low",
    hedging: 496000000,
    unhedged: 124000000,
  },
  {
    currency: "JPY",
    amount: 580000000,
    percentage: 20,
    risk: "high",
    hedging: 348000000,
    unhedged: 232000000,
  },
  {
    currency: "CNY",
    amount: 420000000,
    percentage: 15,
    risk: "medium",
    hedging: 252000000,
    unhedged: 168000000,
  },
  {
    currency: "AUD",
    amount: 180000000,
    percentage: 5,
    risk: "low",
    hedging: 144000000,
    unhedged: 36000000,
  },
]

const hedgingStrategies: HedgingStrategy[] = [
  {
    id: "hedge-001",
    currency: "EUR",
    type: "forward",
    amount: 300000000,
    rate: 1.12,
    startDate: "2025-03-15",
    endDate: "2025-09-15",
    status: "active",
  },
  {
    id: "hedge-002",
    currency: "GBP",
    type: "option",
    amount: 200000000,
    rate: 1.28,
    startDate: "2025-04-01",
    endDate: "2025-10-01",
    status: "pending",
  },
  {
    id: "hedge-003",
    currency: "JPY",
    type: "swap",
    amount: 250000000,
    rate: 0.0065,
    startDate: "2025-03-01",
    endDate: "2025-09-01",
    status: "active",
  },
  {
    id: "hedge-004",
    currency: "CNY",
    type: "forward",
    amount: 150000000,
    rate: 0.145,
    startDate: "2025-02-15",
    endDate: "2025-08-15",
    status: "expired",
  },
]

export const MultiCurrencyManagement = () => {
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

  // Calculate total exposure
  const totalExposure = currencyExposures.reduce((sum, exposure) => sum + exposure.amount, 0)
  const totalHedged = currencyExposures.reduce((sum, exposure) => sum + exposure.hedging, 0)
  const totalUnhedged = currencyExposures.reduce((sum, exposure) => sum + exposure.unhedged, 0)
  const hedgingRatio = (totalHedged / totalExposure) * 100

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 mb-4">
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <span className="flex items-center">
              <ChevronDownIcon className="h-4 w-4 mr-2" />
              {selectedPeriod}
            </span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Currency Exposure</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{formatCurrency(totalExposure)}</p>
                <p className="mt-1 text-xs text-success-600">+5.2% YOY</p>
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
                <p className="text-sm font-medium text-gray-500">Active Hedging Strategies</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {hedgingStrategies.filter((strategy) => strategy.status === "active").length}
                </p>
                <p className="mt-1 text-xs text-success-600">+2 new this quarter</p>
              </div>
              <div className="p-2 bg-primary-50 rounded-md">
                <ShieldCheckIcon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Hedging Cost</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">0.8%</p>
                <p className="mt-1 text-xs text-success-600">-0.2% YOY</p>
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
                <p className="text-sm font-medium text-gray-500">Risk Score</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">Medium</p>
                <p className="mt-1 text-xs text-success-600">-1 level YOY</p>
              </div>
              <div className="p-2 bg-primary-50 rounded-md">
                <ExclamationTriangleIcon className="h-6 w-6 text-primary-600" />
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
            activeTab === "exposure"
              ? "border-b-2 border-primary-500 text-primary-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("exposure")}
        >
          Exposure
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "hedging"
              ? "border-b-2 border-primary-500 text-primary-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("hedging")}
        >
          Hedging
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
        <CardTitle>Exchange Rates</CardTitle>
        <CardDescription>Current rates and changes</CardDescription>
        <div className="mt-4">
                <Button variant="outline" size="sm">
            <span className="flex items-center">
              <CurrencyDollarIcon className="h-4 w-4 mr-2" />
              Update Rates
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
                        Currency
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Rate (USD)
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        1D Change
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        1W Change
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        1M Change
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        1Y Change
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Last Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {exchangeRates.map((rate) => (
                      <tr key={rate.currency}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{rate.currency}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{rate.rate.toFixed(4)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span
                              className={`text-sm ${
                                rate.change1d >= 0 ? "text-success-600" : "text-danger-600"
                              }`}
                            >
                              {formatPercentage(rate.change1d)}
                            </span>
                            {rate.change1d >= 0 ? (
                              <ArrowTrendingUpIcon className="h-4 w-4 text-success-600 ml-1" />
                            ) : (
                              <ArrowTrendingDownIcon className="h-4 w-4 text-danger-600 ml-1" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span
                              className={`text-sm ${
                                rate.change1w >= 0 ? "text-success-600" : "text-danger-600"
                              }`}
                            >
                              {formatPercentage(rate.change1w)}
                            </span>
                            {rate.change1w >= 0 ? (
                              <ArrowTrendingUpIcon className="h-4 w-4 text-success-600 ml-1" />
                            ) : (
                              <ArrowTrendingDownIcon className="h-4 w-4 text-danger-600 ml-1" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span
                              className={`text-sm ${
                                rate.change1m >= 0 ? "text-success-600" : "text-danger-600"
                              }`}
                            >
                              {formatPercentage(rate.change1m)}
                            </span>
                            {rate.change1m >= 0 ? (
                              <ArrowTrendingUpIcon className="h-4 w-4 text-success-600 ml-1" />
                            ) : (
                              <ArrowTrendingDownIcon className="h-4 w-4 text-danger-600 ml-1" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span
                              className={`text-sm ${
                                rate.change1y >= 0 ? "text-success-600" : "text-danger-600"
                              }`}
                            >
                              {formatPercentage(rate.change1y)}
                            </span>
                            {rate.change1y >= 0 ? (
                              <ArrowTrendingUpIcon className="h-4 w-4 text-success-600 ml-1" />
                            ) : (
                              <ArrowTrendingDownIcon className="h-4 w-4 text-danger-600 ml-1" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{rate.lastUpdated}</div>
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
        <CardTitle>Exchange Rate Trends</CardTitle>
        <CardDescription>Historical rate movements</CardDescription>
        <div className="mt-4">
                <Button variant="outline" size="sm">
            <span className="flex items-center">
              <ChartBarIcon className="h-4 w-4 mr-2" />
              Rate Analysis
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
                        label: "EUR/USD",
                        data: [1.05, 1.06, 1.07, 1.08, 1.09, 1.08],
                        borderColor: "rgba(59, 130, 246, 1)",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        fill: true,
                      },
                      {
                        label: "GBP/USD",
                        data: [1.22, 1.23, 1.24, 1.25, 1.26, 1.25],
                        borderColor: "rgba(16, 185, 129, 1)",
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        fill: true,
                      },
                      {
                        label: "JPY/USD",
                        data: [0.0068, 0.0067, 0.0066, 0.0067, 0.0068, 0.0067],
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
                      },
                    },
                  }}
                  ariaLabel="Exchange Rate Trends"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "exposure" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
        <CardTitle>Currency Exposure Analysis</CardTitle>
        <CardDescription>Breakdown by currency</CardDescription>
        <div className="mt-4">
                <Button variant="outline" size="sm">
            <span className="flex items-center">
              <ChartBarIcon className="h-4 w-4 mr-2" />
              Exposure Report
            </span>
          </Button>
              </div>
      </CardHeader>
            <CardContent>
              <div className="h-80">
                <BarChart
                  data={{
                    labels: currencyExposures.map((exposure) => exposure.currency),
                    datasets: [
                      {
                        label: "Total Exposure",
                        data: currencyExposures.map((exposure) => exposure.amount),
                        backgroundColor: "rgba(59, 130, 246, 0.8)",
                      },
                      {
                        label: "Hedged",
                        data: currencyExposures.map((exposure) => exposure.hedging),
                        backgroundColor: "rgba(16, 185, 129, 0.8)",
                      },
                      {
                        label: "Unhedged",
                        data: currencyExposures.map((exposure) => exposure.unhedged),
                        backgroundColor: "rgba(245, 158, 11, 0.8)",
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
                  ariaLabel="Currency Exposure Analysis"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
        <CardTitle>Exposure Details</CardTitle>
        <CardDescription>Detailed breakdown by currency</CardDescription>
        <div className="mt-4">
                <Button variant="outline" size="sm">
            <span className="flex items-center">
              <ShieldCheckIcon className="h-4 w-4 mr-2" />
              Risk Assessment
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
                        Currency
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total Exposure
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Percentage
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Risk Level
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Hedged Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Unhedged Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currencyExposures.map((exposure) => (
                      <tr key={exposure.currency}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{exposure.currency}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(exposure.amount)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatPercentage(exposure.percentage)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={
                              exposure.risk === "low"
                                ? "success"
                                : exposure.risk === "medium"
                                ? "warning"
                                : "danger"
                            }
                            rounded
                          >
                            {exposure.risk.charAt(0).toUpperCase() + exposure.risk.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(exposure.hedging)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(exposure.unhedged)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "hedging" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
        <CardTitle>Hedging Strategies</CardTitle>
        <CardDescription>Active and pending hedging positions</CardDescription>
        <div className="mt-4">
                <Button variant="outline" size="sm">
            <span className="flex items-center">
              <ShieldCheckIcon className="h-4 w-4 mr-2" />
              New Strategy
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
                        Currency
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
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Rate
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Start Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        End Date
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
                    {hedgingStrategies.map((strategy) => (
                      <tr key={strategy.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{strategy.currency}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {strategy.type.charAt(0).toUpperCase() + strategy.type.slice(1)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(strategy.amount)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{strategy.rate.toFixed(4)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{strategy.startDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{strategy.endDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={
                              strategy.status === "active"
                                ? "success"
                                : strategy.status === "pending"
                                ? "warning"
                                : "secondary"
                            }
                            rounded
                          >
                            {strategy.status.charAt(0).toUpperCase() + strategy.status.slice(1)}
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
        <CardTitle>Hedging Coverage</CardTitle>
        <CardDescription>Overall hedging effectiveness</CardDescription>
        <div className="mt-4">
                <Button variant="outline" size="sm">
            <span className="flex items-center">
              <ChartBarIcon className="h-4 w-4 mr-2" />
              Coverage Analysis
            </span>
          </Button>
              </div>
      </CardHeader>
            <CardContent>
              <div className="h-80">
                <BarChart
                  data={{
                    labels: ["Total Exposure", "Hedged", "Unhedged"],
                    datasets: [
                      {
                        data: [totalExposure, totalHedged, totalUnhedged],
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
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => formatCurrency(value as number),
                        },
                      },
                    },
                  }}
                  ariaLabel="Hedging Coverage"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

