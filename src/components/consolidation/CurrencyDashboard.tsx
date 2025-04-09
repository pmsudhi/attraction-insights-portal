"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Badge } from "../../components/ui/Badge"
import { ArrowTrendingUpIcon, ChartBarIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline"
import { LineChart } from "@/components/ui/charts"

interface CurrencyOption {
  value: string;
  label: string;
}

interface CurrencyExposure {
  currency: string;
  amount: string;
  symbol: string;
}

type CurrencySymbols = {
  [key: string]: string;
}

// Define currency options for reuse
const CURRENCY_OPTIONS: CurrencyOption[] = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "JPY", label: "JPY - Japanese Yen" },
  { value: "AUD", label: "AUD - Australian Dollar" }
]

// Define currency symbols for display
const CURRENCY_SYMBOLS: CurrencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  AUD: "A$"
}

// Define currency exposure data
const CURRENCY_EXPOSURES: CurrencyExposure[] = [
  { currency: "EUR", amount: "245.6M", symbol: "€" },
  { currency: "GBP", amount: "185.2M", symbol: "£" },
  { currency: "JPY", amount: "28.5B", symbol: "¥" },
  { currency: "AUD", amount: "125.4M", symbol: "A$" }
]

export const CurrencyDashboard: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("EUR")
  const [amount, setAmount] = useState<string>("1000000")
  const [convertedAmount] = useState<string>("1,080,000")

  // Format currency with appropriate symbol
  const formatCurrency = (value: string, currency: string): string => {
    return `${CURRENCY_SYMBOLS[currency]}${value}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Currency Conversion Dashboard</CardTitle>
        <CardDescription>Convert and analyze currency impacts</CardDescription>
        <div className="mt-4">
          <Button variant="outline" size="sm">
            <span className="flex items-center">
              <ChartBarIcon className="h-4 w-4 mr-2" />
              <span>Export Report</span>
            </span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <div className="space-y-4">
              <div>
                <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700 mb-1">
                  From Currency
                </label>
                <select
                  id="fromCurrency"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  {CURRENCY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700 mb-1">
                  To Currency
                </label>
                <select
                  id="toCurrency"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  {CURRENCY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">{CURRENCY_SYMBOLS[fromCurrency as keyof typeof CURRENCY_SYMBOLS]}</span>
                  </div>
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">{fromCurrency}</span>
                  </div>
                </div>
              </div>

              <Button variant="default" className="w-full">
                <span className="flex items-center justify-center">
                  <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                  <span>Convert Currency</span>
                </span>
              </Button>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm font-medium text-gray-700 mb-2">Conversion Result</div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(convertedAmount, toCurrency)} {toCurrency}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Rate: 1 {fromCurrency} = 1.08 {toCurrency}
                </div>
                <div className="text-xs text-gray-500">Last updated: April 4, 2025, 9:15 AM</div>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">Exchange Rate History</h3>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className={fromCurrency === "USD" && toCurrency === "EUR" ? "bg-primary-50" : ""}
                >
                  <span>USD/EUR</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={fromCurrency === "USD" && toCurrency === "GBP" ? "bg-primary-50" : ""}
                >
                  <span>USD/GBP</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={fromCurrency === "USD" && toCurrency === "JPY" ? "bg-primary-50" : ""}
                >
                  <span>USD/JPY</span>
                </Button>
              </div>
            </div>

            <div className="h-64 mb-4">
              <LineChart 
                data={[
                  { label: "Jan", value: 100 },
                  { label: "Feb", value: 120 },
                  { label: "Mar", value: 115 },
                  { label: "Apr", value: 130 }
                ]}
                xField="label"
                yFields={["value"]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">30-Day Trend</span>
                  <div className="flex items-center">
                    <ArrowTrendingUpIcon className="h-4 w-4 text-success-600 mr-1" />
                    <span className="text-sm text-success-600">+0.5%</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">USD has strengthened against EUR over the past 30 days</div>
              </div>

              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">90-Day Forecast</span>
                  <div className="flex items-center">
                    <ArrowTrendingUpIcon className="h-4 w-4 text-success-600 mr-1" />
                    <span className="text-sm text-success-600">+1.2%</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">USD expected to continue strengthening against EUR</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {CURRENCY_EXPOSURES.map((exposure) => (
            <div key={exposure.currency} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{exposure.currency} Exposure</p>
                  <p className="mt-1 text-xl font-semibold text-gray-900">{formatCurrency(exposure.amount, exposure.currency)}</p>
                </div>
                <Badge variant={fromCurrency === exposure.currency ? "default" : "outline"}>
                  {fromCurrency === exposure.currency ? "Selected" : "Select"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}